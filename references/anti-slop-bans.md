# Complete AI Presentation Slop Catalog (Master Registry — 66 Rules)

This document contains the complete, mechanically checkable catalog of 66 AI Slop patterns identified across major presentation and LLM tools (Claude, ChatGPT, Gemini, Microsoft Copilot, Gamma, Canva, and python-pptx). Every rule is marked with its Hallmark Three-Tier Quality Gate:

* **AVOIDABLE — HARD BAN (Floor):** Strict never-ship prohibitions. Automated linters must fail the build if detected.
* **AVOIDABLE — REFLEX OVERRIDE (Reflex):** Default habits that models apply automatically. Usage is blocked unless explicitly mandated by official brand guidelines.
* **AVOIDABLE — FINISH / POLISH (Finish):** Linguistic, micro-spacing, and formatting defects stripped during the final craft pass.

---

## 1. Typography and Font AI Slops (TYP-01 – TYP-12)

| Rule ID | AI Slop Pattern | Detection Signal | Affected Tools | Status & Tier | Mandatory Native Solution |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TYP-01** | Unchosen Default Web/System Fonts | Inter, Roboto, Arial, Open Sans, Lato, Poppins, Geist, system-ui appearing without brand mandate | Universal (Claude, ChatGPT, Gemini, Gamma, v0) | **AVOIDABLE — REFLEX OVERRIDE** | Deliberately chosen Display + Body pairing configured via `theme1.xml` or custom theme tokens. |
| **TYP-02** | Unchosen Office Default Fonts & Escape Defaults | Defaulting to PowerPoint built-in font (Calibri / Aptos) or reflexive escape fonts (Space Grotesk, Instrument Serif, Fraunces) without user mandate | Universal (PowerPoint, Claude, Copilot, Python-PPTX) | **AVOIDABLE — HARD GATE / REFLEX** | **Avoid unchosen default fonts.** Using Calibri or Aptos is acceptable *only* if the user explicitly approves it. Otherwise, actively explore and present deliberate font pairings with options. |
| **TYP-03** | Italic Serif Flourish at End of Titles | Styling only the last 1–2 words of a sans-serif title in italic serif (Claude signature tell) | Claude (Signature Tell), Web Builders | **AVOIDABLE — HARD BAN** | Enforce a single consistent font family, weight, and color rule across every slide heading. Restrict italics strictly to parameters/emphasis. |
| **TYP-04** | Flat Type Hierarchy (Single Weight/Ratio) | Size ratio between title and body text below 1.25×; no weight contrast | ChatGPT, Gemini, Gamma, Generic Makers | **AVOIDABLE — HARD BAN** | Enforce clear scale: Title 36–44pt Bold, Section Header 20–24pt Bold, Body 14–16pt Regular, Captions 10–12pt Muted. |
| **TYP-05** | Title Case Everything & Long ALL-CAPS | Every button, chart label, and subheading in Title Case; ALL-CAPS text exceeding 4+ words | Universal (ChatGPT, Claude, Gemini) | **AVOIDABLE — FINISH / POLISH** | Use natural Sentence case for action titles and body text; add capitalization checking. |
| **TYP-06** | Monospace-as-Aesthetic / Decorative Text | Monospace (Consolas, JetBrains Mono) for non-code headings; text shadows or WordArt | Claude, Gemini Canvas, Tech Pitch Decks | **AVOIDABLE — REFLEX OVERRIDE** | Restrict monospace strictly to code, data tables, and tabular numerals. Eliminate text shadows and WordArt completely. |
| **TYP-07** | Unembedded Web Font Substitution Trap | .pptx built with HTML/Google Fonts silently falling back to Calibri/Arial, causing text overflow | Gemini Canvas, Gamma, Tome, Canva, html2pptx | **AVOIDABLE — HARD BAN** | Use cross-platform safe Office fonts or embed fonts via `<p:embeddedFontLst>` + run `detect_font.py`. |
| **TYP-08** | Excessively Small or Impractical Font Sizes | Slide body text < 14pt, captions < 10–12pt, or micro-text crammed inside SmartArt | ChatGPT, Copilot, Designer, python-pptx | **AVOIDABLE — HARD BAN** | Hard linter floor: all body text ≥ 14pt (absolute floor of 10–12pt for footnotes/citations only). |
| **TYP-09** | Excessive Line Length (> 75–80ch) | Full-width prose exceeding 80 characters per line, or abnormally narrow word-by-word wrapping | Gemini, ChatGPT, python-pptx | **AVOIDABLE — REFLEX OVERRIDE** | Constrain line length to 65–75ch; pre-calculate box width using 2D character capacity formula. |
| **TYP-10** | Manually Typed Literal Bullet Characters | Literal `•`, `-`, `–` inside `<a:t>` combined with native `<a:buChar>`, rendering double bullets (`• •`) | ChatGPT, Claude (pptxgenjs), Markdown Imports | **AVOIDABLE — HARD BAN** | Always use native OOXML bullet properties (`<a:pPr>`) and strip all literal bullet glyphs. |
| **TYP-11** | Unicode Math Approximations | Writing formulas as plain text with Unicode subscripts (₀, ₁, ∑, ∈), breaking font fallback | Universal (Technical / Academic Decks) | **AVOIDABLE — REFLEX OVERRIDE** | Use native PowerPoint OMML (`a14:m`) or high-DPI (600 DPI) vector/PNG LaTeX rendering pipeline. |
| **TYP-12** | Hardcoded Font Names Instead of Tokens | Hardcoding explicit font names on every text run instead of `<a:latin typeface="+mj-lt"/>` | python-pptx, PptxGenJS, HTML Converters | **AVOIDABLE — HARD BAN** | Define `<a:majorFont>` and `<a:minorFont>` in `theme1.xml` and reference `+mj-lt` (headings) and `+mn-lt` (body). |

---

## 2. Color Palettes and Status Slops (CLR-01 – CLR-11)

| Rule ID | AI Slop Pattern | Detection Signal | Affected Tools | Status & Tier | Mandatory Native Solution |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CLR-01** | First-Wave Purple / Indigo Gradients | `#6366F1`, `#4F46E5`, `#8B5CF6`, `#A855F7`, linear-gradient(#667eea, #764ba2), `#0F172A` | Universal (ChatGPT, Gemini Canvas, Gamma, v0) | **AVOIDABLE — REFLEX OVERRIDE** | Choose a content-informed brand palette based on real human reference research. |
| **CLR-02** | Dark Green / Emerald Fallback Cascade | Reflexively jumping to `#10B981`, `#059669`, `#064E3B` immediately after purple is banned | Claude, ChatGPT, Gemini, Cursor | **AVOIDABLE — REFLEX OVERRIDE** | Define explicit positive palette tokens: `BG`, `PRIMARY`, `ACCENT`, `TEXT`, `MUTED`. |
| **CLR-03** | Overused Semantic RAG Traffic-Light Colors | Saturated green (`#22C55E`), red (`#EF4444`), yellow (`#F59E0B`) on every status card/badge | Universal (especially Gemini, ChatGPT, Copilot) | **AVOIDABLE — REFLEX OVERRIDE** | Use muted neutral cards with clear text labels; use colorblind-safe Blue + Orange for binary contrast; highlight only the single exception. |
| **CLR-04** | Second-Wave "Tasteful Slop" | Warm cream `#F7F6F3` + Terracotta `#B85042` / Sage green (Claude 2025/2026 watermark) | Claude (Signature Tell), Anti-slop overcorrections | **AVOIDABLE — REFLEX OVERRIDE** | Select theme intentionally based on presentation category, subject, and physical venue (dark hall vs bright room). |
| **CLR-05** | Permanent Dark Mode + Neon Glow | Neon cyan/purple glow (`box-shadow: 0 0 20px rgba(139,92,246,0.5)`) on near-black backgrounds | Gemini Canvas, v0, Cursor, Claude Design | **AVOIDABLE — REFLEX OVERRIDE** | Justify dark vs. light mode intentionally; strip glowing drop shadows entirely. |
| **CLR-06** | Gradient-Clipped Text & 3-Stop Gradients | Applying gradient fills to headings, metric numbers, or 3-stop multi-hue ribbons | Gemini Canvas, Claude Design, Gamma | **AVOIDABLE — HARD BAN** | Use single solid, high-contrast colors for headings and numbers; establish hierarchy via scale and weight. |
| **CLR-07** | Timid Evenly-Weighted / Rainbow Palette | Equal visual weight to every color, or adding new accents on each slide creating a 6-color mess | Gemini, ChatGPT, Canva, Gamma | **AVOIDABLE — HARD BAN** | Lock the 60–70% Background (neutral) / 20–30% Primary / 5–10% Single Sharp Accent rule deck-wide. |
| **CLR-08** | Pure Black/White & Low Contrast | Text-to-background contrast < 4.5:1 (failing WCAG AA); untinted harsh `#000000` / `#FFFFFF` | Universal | **AVOIDABLE — HARD BAN** | Verify WCAG AA ≥ 4.5:1; use ink (`#111`–`#1E293B`) and paper tones (`#FAFAFC`) subtly tinted to subject. |
| **CLR-09** | Mid-Deck Theme Drift | Starting deck in dark theme and abruptly switching to light theme mid-deck | Gemini (Documented Flaw), Multi-turn Edits | **AVOIDABLE — HARD BAN** | Single consistent substrate across entire deck, or deliberate Sandwich Structure (Dark Cover/Closing + Light Body). |
| **CLR-10** | Hardcoded OOXML `srgbClr` | Hardcoding `<a:srgbClr val="..."/>` on shapes instead of `<a:schemeClr val="accent1"/>` | python-pptx, PptxGenJS, HTML Converters | **AVOIDABLE — HARD BAN** | Bind all shapes, text, and charts to `theme1.xml` `schemeClr` tokens (`bg1`, `dk1`, `accent1`). |
| **CLR-11** | PptxGenJS `#` Hex Prefix Corruption | Passing `"#FF0000"` or 8-digit alpha hex strings in PptxGenJS, silently corrupting the PPTX | Claude / ChatGPT (PptxGenJS scripts) | **AVOIDABLE — HARD BAN** | Use 6-digit hex without `#` (`"FF0000"`); specify opacity via native transparency properties. |

---

## 3. Component Placement, Shapes, & Layout Geometry (LAY-01 – LAY-16)

| Rule ID | AI Slop Pattern | Detection Signal | Affected Tools | Status & Tier | Mandatory Native Solution |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LAY-01** | Colored Accent Lines Under Titles | Thin colored bar (`height <= 0.1"`) placed directly beneath slide title (the "delve" of design) | Universal (Anthropic, ChatGPT, Gemini) | **AVOIDABLE — HARD BAN** | Separate titles from content using pure whitespace ($\ge 0.35''\text{–}0.5''$) or scale contrast. No decorative divider lines. |
| **LAY-02** | Card Side-Stripes / Accent Edge Bars | Colored stripe $\ge 2\text{px}$ along the left edge of cards, callouts, or list blocks | Claude, ChatGPT, Gemini | **AVOIDABLE — HARD BAN** | Remove edge bars; use subtle background tints, 1px full borders, numbered lead-ins, or container-free whitespace grouping. |
| **LAY-03** | Uppercase Tracked Eyebrow Mini-Pills | Small ALL-CAPS wide-tracked pill tags (`DATA`, `INSIGHT`, `v2.0`) placed above every heading | Claude, Gemini Canvas | **AVOIDABLE — HARD BAN** | Eliminate eyebrow labels unless conveying new information absent from title; lock genuine tags in Slide Master. |
| **LAY-04** | 3-Column Feature Card Grids Repeated | Three equal-width icon + h3 + p cards (`repeat(3, 1fr)`) repeated across 3+ consecutive slides | Universal | **AVOIDABLE — HARD BAN** | Ban repeating identical layout on 3 consecutive slides; enforce anchor $\rightarrow$ dense $\rightarrow$ breathing cadence. |
| **LAY-05** | Unnecessary Shapes & Nested Card-in-Card | Placing boxes inside boxes; dropping geometric cards solely to fill empty space | Universal (especially Gemini) | **AVOIDABLE — HARD BAN** | Container-free grouping (1px hairlines, full-width row lists, alignment + whitespace); cap accent cards at 2 max per slide. |
| **LAY-06** | App-Style KPI Stat Tiles (Hero-Metric) | 4–6 equally weighted KPI stat cards in a row presenting no argument and tempting hallucinated stats | Claude, ChatGPT, Gemini | **AVOIDABLE — REFLEX OVERRIDE** | Limit each data slide to one core argument, supported by a native editable chart or single contextualized metric. |
| **LAY-07** | "Rounded Everything" & Static Pill Containers | `border-radius >= 16px` on 60%+ of elements; pill shapes for non-clickable static text | Gemini Canvas, Gamma | **AVOIDABLE — REFLEX OVERRIDE** | Keep `ROUNDED_RECTANGLE` corner radii subtle; use stable rectangular badges (height $\ge 0.34''\text{–}0.40''$). |
| **LAY-08** | Drop Shadow Overuse & Glassmorphism | Identical drop shadows on 50%+ of containers; frosted glass blur effects | Gemini Canvas, Claude Design | **AVOIDABLE — REFLEX OVERRIDE** | Create depth via flat surface contrast; if native shadows used, ensure offset $\ge 0$ and subtle opacity. |
| **LAY-09** | Centered Body Text & Over-Even Symmetry | `text-align: center` body bullets spanning full width; artificially symmetrical layout | Universal | **AVOIDABLE — REFLEX OVERRIDE** | Body text strictly left-aligned; create visual tension using asymmetric grids (e.g., 35/65 or 55/45 splits). |
| **LAY-10** | Template Chrome Overpowering Content | Repeating bottom tag rows, black ribbons, middle dots (`·`), arrow links (`→`), fake browser chrome | Claude Design, Gemini Canvas | **AVOIDABLE — HARD BAN** | Strip all non-semantic chrome so content remains the primary focal point. |
| **LAY-11** | Text Overflow & Box/Edge Clipping | Text spilling outside bounding boxes or clipping past slide edges | python-pptx, PptxGenJS | **AVOIDABLE — HARD BAN** | Pre-calculate text box capacity; lock `<a:noAutofit>`; verify via Win32COM `BoundHeight`; tighten copy or split slides. |
| **LAY-12** | Element Overlaps & Text Trapped Under Images | Colliding text boxes, lines striking through text, or text hidden beneath images | python-pptx, PptxGenJS | **AVOIDABLE — HARD BAN** | Enforce bounding-box intersection checks ($\text{Area}(B_i \cap B_j) = 0$) and Z-order validation. |
| **LAY-13** | Margin Violations & Cramped Gutters | Elements placed $< 0.5''$ from slide edges; sibling cards spaced $< 0.3''$ apart | Universal | **AVOIDABLE — HARD BAN** | Hard constraints: $x \ge 0.5''$, $y \ge 0.5''$, $y+h \le SH - 0.5''$, sibling gutter $g \ge 0.3''$. |
| **LAY-14** | Broken Whitespace Ratio | Whitespace ratio $< 25\%$ (excessive crowding) or $> 75\%$ (empty slide) | ChatGPT (crowded), Gemini | **AVOIDABLE — REFLEX OVERRIDE** | Maintain executive whitespace between 35%–60%; content height spanning $\ge 75\%$ of content zone. |
| **LAY-15** | Near-Miss "Uncanny Valley" Alignment Drift | Shape misaligned by $0.05''\text{–}0.20''$ relative to gridline established by peer shapes | python-pptx, Claude, ChatGPT | **AVOIDABLE — FINISH / POLISH** | Run implicit grid clustering linter to snap near-miss edges to the master gridline. |
| **LAY-16** | Loose Text Boxes & Unremoved Placeholders | Bypassing Slide Master placeholders; leaving behind `[TODO]` or unused slots | Copilot templates, python-pptx | **AVOIDABLE — HARD BAN** | Follow 16:9 fixed-stage print-matter principle; route content strictly into master placeholders; delete unused slots. |

---

## 4. Unsolicited Structural Slides & Narrative Slop (STR-01 – STR-09)

| Rule ID | AI Slop Pattern | Detection Signal | Affected Tools | Status & Tier | Mandatory Native Solution |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **STR-01** | Unsolicited Roadmaps, Timelines, & Agendas | Inventing "Q1–Q4 Roadmap", "Phase 1–3 Timeline", or rigid sequence when not requested | Universal (especially ChatGPT, Gamma, Gemini) | **AVOIDABLE — REFLEX OVERRIDE** | **Explicit Opt-In Rule:** Strictly prohibit generating Roadmap/Timeline slides unless user's source data contains real dates, milestones, and owners. |
| **STR-02** | Verbose "Thank You" Slides & Forced Fluff | Replacing clean "Thank You" with walls of fluff (*"Looking forward to your journey"*, unsolicited takeaways) | Universal (especially ChatGPT, Gemini, Gamma) | **AVOIDABLE — HARD BAN** | Permit only two Closing Modes: **(A) Minimal Closing** (clean "Thank You" + candidate/contact info); or **(B) Decision Closing** (one crisp takeaway + one CTA). |
| **STR-03** | Descriptive Topic Labels | Noun-phrase headings with no conclusion (*"Market Overview"*, *"Q3 Results"*, *"Key Features"*) | ChatGPT, Gemini, Claude, Copilot | **AVOIDABLE — REFLEX OVERRIDE** | Write every slide heading as an **Action Title / Assertion Header** stating the takeaway (e.g., *"Cost-to-serve is 30% higher in West"*). |
| **STR-04** | Missing Governing Thought & MECE Spine | Assigning equal weight to every slide; burying recommendation until the end; disconnected facts | Copilot, Gamma, Canva, ChatGPT | **AVOIDABLE — REFLEX OVERRIDE** | Draft a single-sentence Governing Thought supported by 3–5 MECE pillars and secure user approval upfront. |
| **STR-05** | Bullet-Point Monoculture & Report Density | 80%+ of slides consisting of full-sentence bullet lists; cramming multiple distinct ideas | ChatGPT, Gemini, Copilot | **AVOIDABLE — REFLEX OVERRIDE** | Cap text-only slides at $\le 20\%$ of deck; enforce 1 idea per slide; use telegraphic keywords (max 4–6 bullets). |
| **STR-06** | Fabricated Statistics & Unsourced Claims | Inventing TAM/growth figures absent from source docs; plotting charts from qualitative text | Universal (Perceptis, XLSlides, ChatGPT, Claude) | **AVOIDABLE — HARD BAN** | Enforce "No chart without real numbers" rule; attach bottom-of-slide source citations; mark missing data as `[To be clarified]`. |
| **STR-07** | Fake Social Proof & 10x Hype | Made-up quotes (*"This changed everything"*), fake logo walls, unverified "10x faster" claims | Claude Design, Gemini Canvas | **AVOIDABLE — HARD BAN** | Strictly ban any testimonial, logo wall, or multiplier claim not present in verified source data. |
| **STR-08** | Reasoning Leaks & Notes Placed on Slide | Internal prompt annotations rendered on slides (*"Option A"*, *"Template 2"*); speaker notes in slide body | Universal (Claude, ChatGPT, NotebookLM) | **AVOIDABLE — HARD BAN** | Filter internal metadata via regex; route all speaker notes strictly to OOXML `notesSlide` (`slide.addNotes`). |
| **STR-09** | Destructive Revisions (Rebuilding Whole Deck) | Regenerating entire slide layout, stripping ~78% of words when asked to revise a single heading | Copilot, Presentations.ai, ChatGPT | **AVOIDABLE — HARD BAN** | Replace full-file rewrites with atomic JSON patching or Win32COM targeted shape-level editing. |
| **STR-10** | AI Generator File Metadata & Watermark Leaks | PPTX document properties (`docProps/core.xml`) listing "Claude", "Gemini", "ChatGPT", "python-pptx", or "PptxGenJS" as author/creator | Universal | **AVOIDABLE — HARD BAN** | Mask and replace all metadata under the User's name, institution, and clean project title. Strip all generator tool strings from OOXML core properties. |

---

## 5. Linguistic, Copywriting, & Text Formatting Slops (CPY-01 – CPY-08)

| Rule ID | AI Slop Pattern | Detection Signal | Affected Tools | Status & Tier | Mandatory Native Solution |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CPY-01** | Excessive AI Buzzword Density (> 2%) | *delve, tapestry, leverage, seamless, pivotal, vibrant, streamline, supercharge, empower, game-changing, revolutionary, next-gen, cutting-edge, transform, unlock, unleash, robust, scalable, holistic, groundbreaking, synergies, paradigm shift, world-class, state-of-the-art* | Universal | **AVOIDABLE — HARD BAN** | Hard blocklist in linter; replace with concrete verbs, nouns, and hard numerical metrics. |
| **CPY-02** | Inflated Copulas Avoiding Simple is/has | *serves as, stands as, boasts, features, exhibits, represents a shift, is a testament to* | Universal (especially ChatGPT) | **AVOIDABLE — FINISH / POLISH** | Use direct, concise *is, are, has*, or concrete active verbs. |
| **CPY-03** | Negative Parallelisms & Rule-of-Three | *"It's not just X, it's Y"*, *"No X. No Y. Just Z."*, and hollow triplets (*"Build, ship, scale"*) | Universal (especially ChatGPT) | **AVOIDABLE — FINISH / POLISH** | State claim directly in a single assertion; list only the exact number of items supported by evidence. |
| **CPY-04** | Tacked-On -ing Participles & Grandiose Stakes | Trailing *"...highlighting / underscoring / showcasing / fostering..."*; *"marks a pivotal moment"* | Universal | **AVOIDABLE — REFLEX OVERRIDE** | Cut hollow trailing participatory clauses; let actual numbers and facts demonstrate the impact. |
| **CPY-05** | Bold-First Bullets, Emojis, & Raw Markdown | Opening every bullet with `**Label:** ...`; using 🚀, 💡, ✨ emojis; leaking raw `**` or `##` onto slides | ChatGPT & Claude (Very High) | **AVOIDABLE — HARD BAN** | Completely ban emojis; strip all raw markdown syntax; vary lead-in structures across bullet lists. |
| **CPY-06** | Em-Dash (—) Overuse & Staccato Cadence | 2+ em-dashes per paragraph; choppy artificial fragments (*"It broke. Fast. Silently."*) | ChatGPT, Claude | **AVOIDABLE — FINISH / POLISH** | Cap em-dashes at 0–1 per slide; ban artificial staccato cadence in favor of natural sentence flow. |
| **CPY-07** | Filler Openers & Weasel Attributions | *"In today's fast-paced world"*, *"It's worth noting"*, *"Furthermore"*, *"Moreover"*, *"Experts say"* | ChatGPT (Very High), Gemini | **AVOIDABLE — REFLEX OVERRIDE** | Delete filler openers; replace "Experts say" with specific author/institution and publication year. |
| **CPY-08** | Vague CTAs & Dirty Tracking URLs | *"Get Started"*, *"Learn More"*, *"Unlock the Future"*; URLs containing `utm_source=` or broken DOIs | Universal | **AVOIDABLE — FINISH / POLISH** | Write action-specific CTAs (e.g., *"Approve Q3 budget — $45K"*); include only clean, verified source URLs. |

---

## 6. Images, Icons, Charts, & Diagrams (VIS-01 – VIS-10)

| Rule ID | AI Slop Pattern | Detection Signal | Affected Tools | Status & Tier | Mandatory Native Solution |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **VIS-01** | Glossy 3D Spheres & Meaningless SVG Waves | Floating 3D spheres, glowing orbs, or abstract wavy lines whose removal loses zero information | Gamma, Canva, Gemini Canvas, Claude Design | **AVOIDABLE — HARD BAN** | Delete decorative 3D/SVG shapes that convey zero information; replace with real screenshots or data visuals. |
| **VIS-02** | "Better Images of AI" Visual Stereotypes | Glowing blue brains, white humanoid robots, robotic hands, cascading Matrix code | ChatGPT Image, Gemini Imagen, Canva, Gamma | **AVOIDABLE — REFLEX OVERRIDE** | Use imagery depicting real physical/human applications of technology or genuine architecture/UI. |
| **VIS-03** | Image Direction Failure (Generic Backdrops) | Removing the slide title allows the photo to fit any unrelated topic; repetitive background photos | Gamma, Canva, Gemini | **AVOIDABLE — REFLEX OVERRIDE** | Tie every visual directly to the slide's empirical evidence; otherwise rely on whitespace and typography. |
| **VIS-04** | Full-Bleed Images with Unscrimmed Text | Text placed directly over photography without contrast overlay; distorted aspect ratios | python-pptx, PptxGenJS, Canva | **AVOIDABLE — HARD BAN** | Apply 60–80% dark overlay scrim behind text over images; always insert images using aspect-ratio-locked math. |
| **VIS-05** | Cliché Icons, Sparkles (✨), & Mixed Sets | Lightbulb for ideas, gear for process, sparkle ✨; 3+ tinted tiles; mixing filled and outlined icons | Universal (especially Claude, Gemini, Gamma) | **AVOIDABLE — REFLEX OVERRIDE** | Ban emojis-as-icons and sparkles; enforce one single icon family and uniform stroke-width deck-wide. |
| **VIS-06** | AI-Generated Artifacts & Waxy Skin | Yellow/amber cast, teal-orange grading, waxy skin, melted glasses/fingers, garbled text | OpenAI Image Models, Midjourney, Imagen | **AVOIDABLE — REFLEX OVERRIDE** | Prioritize authentic photography / CC-licensed sources or engineered 2D vector technical diagrams. |
| **VIS-07** | Full-Slide T2I Rasterization | Entire slide saved as a flat PNG picture (`<p:pic>`); text and numbers uneditable; huge file bloat | Image-first pipelines (baoyu, Alai) | **AVOIDABLE — HARD BAN** | Always generate text, shapes, and tables as native editable OOXML objects (`<p:sp>`, `<a:tbl>`). |
| **VIS-08** | Static Screenshot Charts & Faked Shapes | Clicking chart opens Picture Format instead of Excel; bar chart faked out of 20 loose rectangles | Gamma, Gemini Slides, Canva, Claude HTML | **AVOIDABLE — HARD BAN** | Always build native OOXML `<c:chart>` (`AddChart2` / `add_chart`) backed by embedded Excel data. |
| **VIS-09** | Chart Junk & Misleading Scales | 3D charts, gradient-filled bars, truncated axes hiding variance, unnecessary single-series legends | Universal | **AVOIDABLE — HARD BAN** | Use 2D flat charts, direct data labels (`showValue: true`), quiet gridlines, single-series legends removed. |
| **VIS-10** | HTML/SVG/Mermaid Flaws & Theme Clashes | Overlapping arrows/labels in AI SVGs; default blue/black Mermaid styling clashing with deck palette | Gemini Canvas, Claude SVG | **AVOIDABLE — HARD BAN** | 5-layer diagram routing (Graphviz for architecture, Mermaid for sequence, Native Shapes for callouts, Generative briefs for schematics) + palette injection. |

---

## 7. Universal Cross-Model Audit Mandate

Regardless of the underlying AI model executing this skill (Gemini, Claude, GPT-4o/5, Copilot, etc.), **every agent must audit against all model-specific slop patterns**:

* **Gemini Models (e.g. Gemini 3.x / Flash / Pro):**
  * MUST explicitly check for and remove Claude's signature tells (`TYP-03` italic serif title endings, `CLR-04` warm cream + terracotta slop, `CPY-05` bold-first compulsive counting lists).
  * MUST check for and remove ChatGPT's signature tells (`STR-02` quietly ignoring negative constraints by adding "Looking forward to your journey" or "Key Takeaways", `CPY-07` "In today's fast-paced world", listicle bloat).
  * MUST enforce its own guardrails (avoid the HTML/Tailwind canvas trap; avoid mid-deck dark/light drift `CLR-09`; never export static image charts `VIS-08`).

* **Claude Models (e.g. Claude Opus / Sonnet):**
  * MUST explicitly check for and remove Gemini tells (`CLR-09` mid-deck theme flip, `VIS-08` static screenshot charts, HTML/Canvas code leaks).
  * MUST check for and remove ChatGPT tells (`CPY-07` filler openers, `VIS-06` yellow cast).
  * MUST enforce its own guardrails (strip `TYP-03` Instrument Serif flourish, avoid `CLR-04` cream/terracotta default, enforce `TYP-04` scale).

* **OpenAI / ChatGPT Models (e.g. GPT-4o / GPT-5):**
  * MUST strictly obey negative constraints (never append unrequested conclusions/takeaways `STR-02`).
  * MUST check for and remove Claude and Gemini slop tells.

**The Golden Rule:** *No model gets a pass on another model's signature slop. Every generated slide must clear all 66 checkpoints.*

