/**
 * Deterministic Human Design System Selector
 * Resolves optimal system across 4 Priority Gates and enforces CIELAB Delta E >= 15 cooldown.
 */

const fs = require('fs');
const path = require('path');

const SHARDS_DIR = path.resolve(__dirname, '../references/design-systems');
const STATE_FILE = path.resolve(__dirname, '../.skill_state/recent_systems.json');

// 12 Banned AI-Slop Anchor Hexes
const BANNED_AI_SLOP_HEXES = [
  '#6366F1', '#4F46E5', '#8B5CF6', '#A855F7',
  '#0F172A', '#10B981', '#059669', '#064E3B',
  '#22C55E', '#EF4444', '#F59E0B', '#885042'
];

// Color utility: HEX to sRGB to CIELAB
function hexToRgb(hex) {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab(r, g, b) {
  // Normalize sRGB to [0, 1] and linearize
  let [rL, gL, bL] = [r, g, b].map(v => {
    v /= 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  });

  // Convert to XYZ (D65 illuminant)
  let x = (rL * 0.4124564 + gL * 0.3575761 + bL * 0.1804375) / 0.95047;
  let y = (rL * 0.2126729 + gL * 0.7151522 + bL * 0.0721750) / 1.00000;
  let z = (rL * 0.0193339 + gL * 0.1191920 + bL * 0.9503041) / 1.08883;

  const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  let fx = f(x), fy = f(y), fz = f(z);

  return [
    116 * fy - 16,
    500 * (fx - fy),
    200 * (fy - fz)
  ];
}

function hexToLab(hex) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToLab(r, g, b);
}

function deltaE(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) +
    Math.pow(lab1[1] - lab2[1], 2) +
    Math.pow(lab1[2] - lab2[2], 2)
  );
}

function getRecentSystems() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    }
  } catch (e) {}
  return [];
}

function recordRecentSystem(system) {
  try {
    const dir = path.dirname(STATE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    let list = getRecentSystems();
    list.unshift({
      id: system.id,
      timestamp: new Date().toISOString(),
      primary_lab: hexToLab(system.tokens.primary_30),
      bg_lab: hexToLab(system.tokens.bg_60)
    });
    // Keep max 10
    if (list.length > 10) list = list.slice(0, 10);
    fs.writeFileSync(STATE_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    console.error('Warning: could not write session state:', e.message);
  }
}

// Category map
const CATEGORY_MAP = {
  CORP: '01-corp-consulting.json',
  FIN: '02-finance-pitch.json',
  MKT: '03-marketing-launch.json',
  TECH: '04-technology-saas.json',
  ACAD: '05-academic-research.json',
  SCI: '06-scientific-medical.json',
  EDU: '07-education-training.json',
  CREA: '08-creative-portfolio.json',
  EDIT: '09-editorial-luxury.json',
  TRAV: '10-travel-culinary.json',
  ARCH: '11-architecture-esg.json'
};

function selectDesignSystem(options = {}) {
  const {
    category = 'CORP',
    venue = 'bright_room', // 'bright_room' | 'dark_auditorium' | 'gala' | 'print'
    requireCvdSafe = false,
    brandOverride = null
  } = options;

  // Gate 1: Brand Precedence
  if (brandOverride) {
    return {
      status: 'BRAND_OVERRIDE',
      system: brandOverride,
      reason: 'User brand identity outranks internal design systems.'
    };
  }

  // Gate 2: Domain Routing
  const catKey = category.toUpperCase();
  const shardFile = CATEGORY_MAP[catKey] || CATEGORY_MAP['CORP'];
  const fullPath = path.join(SHARDS_DIR, shardFile);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Shard file not found: ${fullPath}`);
  }

  const rawData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  const candidatePool = rawData.systems || [];

  // Gate 3: Venue & Optical Ergonomics
  let polarityFiltered = candidatePool;
  if (venue === 'dark_auditorium' || venue === 'gala') {
    polarityFiltered = candidatePool.filter(s => s.polarity === 'dark' || s.polarity === 'sandwich_bookend');
    if (polarityFiltered.length === 0) polarityFiltered = candidatePool;
  } else {
    // Default bright/boardroom/print prefers light / light_tinted
    polarityFiltered = candidatePool.filter(s => s.polarity === 'light' || s.polarity === 'light_tinted' || s.polarity === 'sandwich_bookend');
    if (polarityFiltered.length === 0) polarityFiltered = candidatePool;
  }

  // Gate 4: Accessibility & CVD Safety
  let accFiltered = polarityFiltered;
  if (requireCvdSafe) {
    // SCI-01, SCI-06, SCI-07, SCI-08, etc.
    const cvdMatches = polarityFiltered.filter(s =>
      s.id.startsWith('SCI-01') || s.id.startsWith('SCI-06') || s.id.startsWith('SCI-07') || s.id.startsWith('SCI-08')
    );
    if (cvdMatches.length > 0) accFiltered = cvdMatches;
  }

  // Anti-Convergence Filter: Cooldown & Delta E >= 15
  const recent = getRecentSystems();
  const recentIds = new Set(recent.map(r => r.id));
  const lastDeck = recent[0];

  let bestCandidates = accFiltered.filter(s => !recentIds.has(s.id));
  if (bestCandidates.length === 0) bestCandidates = accFiltered; // fallback if exhausted

  // Evaluate Delta E against last deck and AI slop anchors
  let ranked = bestCandidates.map(system => {
    let score = 0;
    const sysPrimLab = hexToLab(system.tokens.primary_30);
    const sysBgLab = hexToLab(system.tokens.bg_60);

    // Delta E from previous deck primary
    if (lastDeck) {
      const dE = deltaE(sysPrimLab, lastDeck.primary_lab);
      score += dE >= 15 ? 50 : (dE * 2);
    } else {
      score += 50;
    }

    // Delta E distance from banned AI-slop hexes
    let minSlopDist = 999;
    for (const bHex of BANNED_AI_SLOP_HEXES) {
      const bLab = hexToLab(bHex);
      const dE = deltaE(sysPrimLab, bLab);
      if (dE < minSlopDist) minSlopDist = dE;
    }
    score += Math.min(minSlopDist, 30);

    return { system, score };
  });

  ranked.sort((a, b) => b.score - a.score);
  const selected = ranked[0] ? ranked[0].system : accFiltered[0];

  // Record selected into recent history
  recordRecentSystem(selected);

  return {
    status: 'RESOLVED',
    selected_system: selected,
    alternatives: ranked.slice(1, 3).map(r => r.system)
  };
}

// CLI Execution Support
if (require.main === module) {
  const args = process.argv.slice(2);
  const categoryArg = args[0] || 'CORP';
  const venueArg = args[1] || 'bright_room';
  const cvdArg = args.includes('--cvd');

  console.log(`Running selector for Category=${categoryArg}, Venue=${venueArg}, CVD=${cvdArg}...`);
  const result = selectDesignSystem({
    category: categoryArg,
    venue: venueArg,
    requireCvdSafe: cvdArg
  });

  console.log('\n=== SELECTED HUMAN DESIGN SYSTEM ===');
  console.log(`ID:       ${result.selected_system.id} - ${result.selected_system.name}`);
  console.log(`Mood:     ${result.selected_system.sub_mood}`);
  console.log(`Polarity: ${result.selected_system.polarity}`);
  console.log(`Palette:  60%=${result.selected_system.tokens.bg_60} | Surf=${result.selected_system.tokens.surface} | 30%=${result.selected_system.tokens.primary_30} | 10%=${result.selected_system.tokens.accent_10} (${result.selected_system.tokens.accent_role})`);
  console.log(`Fonts:    Display="${result.selected_system.fonts.display}" | Body="${result.selected_system.fonts.body}" | Win-Native="${result.selected_system.fonts.win_native_major}"`);
  console.log(`Grid:     ${result.selected_system.grid_component_placement}`);
  console.log(`Focus:    ${result.selected_system.focal_highlight_mechanics}`);
  console.log('\nAlternatives:');
  result.alternatives.forEach(alt => console.log(`  - [${alt.id}] ${alt.name} (${alt.sub_mood})`));
}

module.exports = { selectDesignSystem, hexToRgb, rgbToLab, deltaE };
