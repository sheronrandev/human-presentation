# Human Presentation: Anti-Slop Master Skill

An open-source presentation architecture and agentic skill that eliminates generic AI slide patterns in favor of human editorial craftsmanship, cognitive neuroscience, and native Office Open XML (OOXML) precision.

---

## The Philosophy: Beyond AI Presentation Slop

Most automated presentation generators suffer from **Distributional Convergence** and template repetition. When models generate slides without strict constraints, they reflexively produce:
* Floating rounded rectangle cards and nested card-in-card shapes.
* First-wave purple/indigo gradients and emerald fallbacks.
* Passive topic headers instead of argumentative assertion titles.
* Cramped single-line text formatting without optical rhythm.
* Repetitive 2-column or 3-column split layouts across consecutive slides.

**Human Presentation** enforces strict architectural rules, cognitive gaze routing, and native PowerPoint compilation to produce decks that resemble curated human monographs and publication-grade reports.

---

## Core Capabilities

### 1. 165-System Canonical Design Library
Contains 165 curated design systems partitioned across 11 distinct domain registries:
* **CORP**: Corporate Business, Strategy & Management Consulting (McKinsey, BCG, Bain, IBM Carbon).
* **FIN**: Finance, Banking, Private Equity & Investor Pitch (Wall Street, Financial Times).
* **MKT**: Marketing, Consumer Goods, Branding & DTC Product Launch.
* **TECH**: High-Tech, SaaS, Developer Keynotes & Hardware Engineering.
* **ACAD**: Academic Defense, Peer-Reviewed Monographs & Higher Education.
* **SCI**: Scientific, Medical Clinical Trials & Bio-Technology (Strictly CVD-Safe).
* **EDU**: Education, Courseware, K-12 & Interactive Training.
* **CREA**: Creative Studios, Avant-Garde Portfolios & Exhibition Monographs.
* **EDIT**: Editorial Lookbooks, Luxury Fashion, Fine Jewelry & Watchmaking.
* **TRAV**: Travel, Hospitality, Culinary Guides & Regional Monograms.
* **ARCH**: Architecture, Sustainable Urbanism & Non-Profit ESG.

Every system adheres to an explicit 12-key machine-readable schema specifying color tokens, font scales, grids, margins, layout pools, and mathematical contrast roles.

### 2. The 66-Rule Cross-Model Slop Registry
A comprehensive enforcement catalog targeting:
* **Typography (TYP-01 to TYP-12):** Bans unchosen default fonts, requires 1.5 line spacing, and checks character metrics.
* **Color Palettes (CLR-01 to CLR-11):** Enforces CIELAB $\Delta E \ge 15$ separation from 12 banned AI gradient anchors and mathematical WCAG 2.1 contrast ratios.
* **Component Placement (LAY-01 to LAY-16):** Eliminates title accent divider lines, card edge stripes, and nested containers.
* **Structure & Tone (STR-01 to CPY-08):** Eliminates unsolicited roadmap slides, closing fluff, banned buzzwords, and AI metadata leaks.

### 3. The 8 Creative Art Direction Archetypes (Zero-Repetition Mandate)
Bans the repetitive split-screen formula. Forces agents to select from 8 distinct layout archetypes:
1. **The Full-Bleed Atmospheric Scrim:** 100% canvas photography with subtle gradient scrim and cinematic title integration.
2. **The Horizontal Letterbox Panorama:** Wide panoramic imagery occupying the top 60% with multi-column analytical insights below.
3. **The Vertical Full-Height Edge Bleed:** Right-hand vertical image slice with elevation callouts on the left.
4. **The Gaze-Cued Portrait Split:** Subject portrait positioned on the left gazing directly toward headline insights on the right.
5. **The Container-Free Step Chain:** Sequential process flow with numeral lead-ins and zero box card containers.
6. **The Dual-Image Macro/Micro Contrast:** Wide environment context paired with a close-up macro detail crop.
7. **The Typographic Monument & Void:** Monumental metric (72–120pt) set in generous negative whitespace ($\ge 65\%$).
8. **The Asymmetrical 70/30 Exhibit Split:** Dominant technical data exhibit paired with an executive takeaway sidebar.

---

## Tooling & Automation Suite (`scripts/`)

| Script | Purpose |
| :--- | :--- |
| `select_design_system.js` | 4-Gate design system selector with session cooldown and CIELAB $\Delta E \ge 15$ anti-convergence tracking. |
| `compile_theme_xml.js` | Generates compliant DrawingML `theme1.xml` files mapping palette tokens to native Office slots. |
| `embed_fonts_ooxml.js` | Enforces the 4 OOXML font embedding schema constraints in `ppt/presentation.xml`. |
| `build_native_deck.js` | Template-first PowerPoint builder compiling native shapes, text, and `<c:chart>` elements. |
| `render_qa.js` | Hardware-accelerated Win32COM pipeline exporting slides to $1920\times1080$ PNG for automated QA. |
| `lint_slop.js` | Universal mechanical linter calculating mathematical WCAG 2.1 contrast and checking 66 slop rules. |
| `ingest_design_systems.js` | 4-Gate ingestion engine for scaling design system libraries with duplicate hash checking. |

---

## Quickstart & CLI Usage

```powershell
# 1. Deterministic Design System Selection
node scripts/select_design_system.js ACAD

# 2. Compile Native Theme XML
node scripts/compile_theme_xml.js ACAD-02 theme1.xml

# 3. Build Native Deck via PowerShell COM
node scripts/build_native_deck.js --generate-starter --domain CORP --title "Institutional Governance" --user "Author"
node scripts/build_native_deck.js --build --deck starter_deck.json --system CORP-01 --output-ps1 build.ps1
powershell -ExecutionPolicy Bypass -File build.ps1

# 4. Mechanical Anti-Slop Audit
node scripts/lint_slop.js starter_deck.json

# 5. Render 1920x1080 QA Slide Images
node scripts/render_qa.js --pptx deck.pptx --out-dir renders
```

---

## License

This project is licensed under the [MIT License](LICENSE).
