# Human Reference Discovery & Research Guide

This reference defines the protocol for grounding presentation design in real-world human craftsmanship. Rather than relying on AI default reflexes, the agent conducts targeted research to discover authentic color palettes, typography systems, layout structures, and visual motifs from published human presentations.

---

## 1. Web & Media Platform Research Protocol

Before selecting colors, typography, or layout styles, the agent conducts a search using web search and media discovery across platforms such as Google Images, YouTube presentation breakdowns, Pinterest, Behance, and SlideShare.

### Search Formula
```
[Category] + [Subject] + [Design Domain] + ("presentation slides" OR "pitch deck" OR "editorial design")
```

### Examples by Category and Subject:
1. **Category: Academic | Subject: Computer Systems / Electronics**
   * *Search:* `"computer engineering lecture presentation slides" OR "ACM IEEE conference presentation typography clean"`
   * *Platform Target:* Academic conference slides, MIT/Stanford lecture slides, IEEE presentations.
   * *Observed Human Traits:* Crisp off-white backgrounds (`#FAFAFC`), deep navy headers (`#1E3A8A`), high-contrast dark charcoal text, zero box cards, clear circuit schematics, subtle 1px dividers, 1.5 line spacing.
2. **Category: Business / Strategy | Subject: Supply Chain & Logistics**
   * *Search:* `"supply chain executive presentation slides design" site:pinterest.com OR "logistics deck case study behance"`
   * *Platform Target:* Pinterest corporate prototypes, Behance editorial decks, McKinsey/Bain style exhibits.
   * *Observed Human Traits:* Cool slate and steel blue with industrial safety accents (warm amber or forest green), 3-column borderless metric lists, clean horizontal flowcharts, dense tabular summaries.
3. **Category: Healthcare / Biotech | Subject: Clinical Trials / Pharmacology**
   * *Search:* `"biotechnology conference slide deck design behance" OR "medical scientific presentation clean"`
   * *Observed Human Traits:* Sterile surgical teal and deep slate, generous whitespace (>45%), authentic clinical microscopy or vector pathway schematics, quiet muted legends.
4. **Category: Startup Pitch | Subject: Developer Infrastructure / B2B SaaS**
   * *Search:* `"developer tooling pitch deck series A" OR "YC successful pitch deck minimal typography"`
   * *Observed Human Traits:* Ink black typography, single vivid brand accent (e.g. electric indigo or burnt orange) used on <5% of the slide, massive assertion headers, zero decorative geometric shapes.

---

## 2. Extraction of Design Dimensions

From the discovered human references, the agent extracts six key dimensions:

1. **Color Palette Tokens (The 60–30–10 Rule):**
   * `BG` (60–70%): Canvas neutral (e.g., `#FAFAFC` academic off-white, or `#0F172A` deep auditorium substrate).
   * `PRIMARY` (20–30%): Deep brand / headline color (e.g., `#1E3A8A` navy, `#1E293B` slate).
   * `ACCENT` (5–10%): High-contrast pop for final calculated values, key metrics, or single exceptions.
   * `TEXT_DARK`: Crisp body color ensuring WCAG AA contrast $\ge 4.5:1$.
   * `MUTED`: Secondary metadata, captions, eyebrows (`#64748B`).
2. **Typography & Font Pairings:**
   * Display/Heading Font (e.g., Segoe UI Bold, Georgia, Cambria, Trebuchet MS).
   * Body Font (e.g., Segoe UI Regular, Calibri, Arial).
   * Strict scale ratio $\ge 1.25\times$.
3. **Component Placing & Layout Cadence:**
   * Asymmetric 50/50 splits (text on left, diagram on right).
   * Borderless multi-column lists separated by whitespace and subtle 1px hairlines.
   * Alternating visual cadence: Anchor Slide $\rightarrow$ Dense Analysis $\rightarrow$ Breathing Visual.
4. **Spacing & Whitespace Discipline:**
   * **1.5 Line Spacing** for paragraphs, bullet points, and multi-quadrant descriptions.
   * **1.25–1.30 Line Spacing** for multi-step arithmetic derivations to prevent canvas clipping.
   * Minimum $0.5''$ slide margin and $0.3''$ sibling gutter.
5. **Highlights & Emphasis:**
   * Bold for leading category labels (`• Architecture:`, `• Total Resistance:`).
   * Italics for variables, formulas, and parameters (*Vin*, *Rin*, *Av*).
   * Underline for final answers and governing equations (`<u>550 Ω</u>`).
6. **Transitions & Visual Motifs:**
   * Simple, professional transitions (e.g., subtle Morph or Wipe, duration 0.3s–0.5s; never 3D bounce or spin).

---

## 3. Mandatory User Options Checkpoint (Presenting Choices)

If multiple viable palettes, font pairings, or design directions exist, the agent **MUST** present them to the user with references before proceeding:

### Option Presentation Template:
```markdown
### Design Direction Options Based on [Category: Subject] Research:

* **Option 1: [Direction Name] (Recommended)**
  * **Reference:** [e.g., Stanford EE & IEEE Conference Standards]
  * **Palette:** Canvas `#FAFAFC`, Header `#1E3A8A` (Deep Navy), Accent `#0F766E` (Emerald), Text `#1E293B`.
  * **Typography:** Segoe UI Display + Segoe UI Body (Clean modern academic engineering).
  * **Mood:** Scholarly, authoritative, low visual fatigue.

* **Option 2: [Direction Name]**
  * **Reference:** [e.g., McKinsey Editorial Exhibit / Financial Times Design System]
  * **Palette:** Canvas `#FDFBF7` (Warm Paper), Header `#1B2A4A`, Accent `#B45309` (Amber), Text `#222222`.
  * **Typography:** Georgia (Headings) + Calibri (Body).
  * **Mood:** Traditional academic publishing, high gravitas.

Which option do you prefer, or would you like to tweak specific colors/fonts?
```

---

## 4. Speaker Script User Checkpoint & Customization

Before drafting presentation content, the agent must determine the user's speaker script requirements:

1. **Need Check:** Does the user want a synchronized speaker script?
   * *If the user already requested a script in their prompt:* Confirm receipt and present tone/level options.
   * *If unmentioned:* Ask explicitly: *"Would you like a matching speaker script for this presentation?"*
   * *If user states NO:* Skip script generation entirely and proceed strictly with slide generation.
2. **Customization Parameters (when script is requested):**
   * **Tone:**
     * *Academic / Defense:* Scholarly, rigorous, formal proof walkthrough, candidate sign-off.
     * *Executive / Boardroom:* Direct, outcome-first, strategic, action-oriented.
     * *Conversational / Educational:* Engaging, teaching-oriented, explanatory analogies.
     * *Pitch / Conference:* High energy, narrative hook, problem-solution-impact.
   * **Spoken English Level:**
     * *Plain Spoken English (Recommended):* Simple, active sentences, clear pronunciation phonetics for technical terms, conversational transitions (*"Notice that...", "First, we calculate..."*).
     * *Formal Academic:* Highly technical terminology, explicit theorem naming, rigorous passive voice where appropriate.
     * *Simplified English:* Short sentence structures optimized for non-native English speakers.
3. **Script Synchronization:**
   * Every script entry must include:
     * `[TIMING: MM:SS - MM:SS]` matching slide duration.
     * `[VISUAL CUE: ...]` directing physical presenter action (pointing to diagrams, advancing steps).
   * Dual delivery: Embedded directly in PowerPoint `NotesPage` AND compiled into a standalone rehearsal document.

---

## 5. Visual Sourcing & Creativity Checkpoint

Presentations should not be sterile text-only skeletons. The agent must consult the user on how they want visual moments and imagery brought to life:

```markdown
### Visual & Creativity Sourcing Choice:

To make the presentation feel alive, engaging, and tailored to your needs, how would you like visual assets sourced?

* **Option A: AI Image Generation (Engineered Prompts) [Recommended for Technical/Schematics]**
  * Generate crisp 2D vector schematics, circuits, waveform graphs, or architecture stacks on pure white backgrounds (`#FFFFFF`).
* **Option B: Web Search & Media Scraping [Recommended for Case Studies / Real Products]**
  * Search and download authentic, high-resolution photography, real hardware/software UI screenshots, or CC-licensed figures.
* **Option C: Pure Typographic / Minimalist**
  * Focus exclusively on editorial typography, whitespace, and native editable data charts with zero illustrative images.

Which visual approach would you prefer for this deck?
```

---

## 6. Human Document Metadata Specification (Anti-Watermarking)

To ensure the generated presentation presents as authentic human craftsmanship and carries zero AI watermarks, the file metadata must be configured:

1. **Required Metadata Fields:**
   * **Title:** Clean, official title of the presentation (never include internal flags like "draft_v1_generated" or prompt excerpts).
   * **Author / Creator:** User's full name or student name (e.g. `Sheron Randewa`).
   * **Last Modified By:** User's name.
   * **Company / Organization:** User's university, institute, or enterprise (e.g. `Java Institute for Advanced Technology`).
   * **Subject / Category:** Official course unit or business category (e.g. `HF2V 04: Electronics for Software Engineering I`).
2. **Strict Sanitization:**
   * Purge all default library watermarks from OOXML `docProps/core.xml` and `docProps/app.xml`:
     * Strictly ban strings: `"python-pptx"`, `"PptxGenJS"`, `"Claude"`, `"ChatGPT"`, `"Gemini"`, `"OpenAI"`, `"Anthropic"`.
     * Set Application property to `"Microsoft Macintosh PowerPoint"` or `"Microsoft Office PowerPoint"`.
