# Human Presentation Design Psychology and Attention-Retention Playbook

This reference provides the foundational cognitive neuroscience, perceptual psychology, and tactical layout mechanics that distinguish human agency craftsmanship from generic AI slide generation.

---

## 1. Cognitive and Perceptual Frameworks Governing Slide Comprehension

Audiences do not read slides sequentially from top to bottom; their visual cortex triages slides pre-attentively in under one second.

### 1.1 The Sub-Second Perceptual Triage (MLC Neuro Design Framework)
* **0.00 – 0.25 seconds (Recognition):** The visual cortex parses luminance contrast, spatial hierarchy, color temperature, and element grouping. If the slide signals visual chaos or crowded box borders, cognitive fatigue sets in immediately.
* **0.25 – 0.75 seconds (Emotion):** An affective valence judgment activates (Antonio Damasio’s somatic-marker hypothesis). The viewer unconsciously decides whether the presentation feels credible, premium, or amateurish.
* **1.0+ seconds (Analysis):** Working memory allocates voluntary effort to reading headlines and decoding numerical data. This reading trajectory is completely pre-steered by whatever captured the eye during the first 250 milliseconds.

### 1.2 Attention Constraints & Thresholds
* **Nancy Duarte's Glance Test:** The core takeaway of any slide must be discernible in **$\le 3$ seconds**.
* **The 10-Second Rule for Analytical Decks:** An executive should comprehend the governing thesis and primary evidence of a complex data exhibit within **10 seconds**.
* **Attention Allocation Realities:**
  * In live rooms: ~60% of attention goes to the speaker, ~30% to slides, with >40% competing distraction overlap.
  * In virtual meetings: ~10% to the speaker, ~20% to slides, ~70% to background multitasking.
  * Attention dips occur cyclically every **7 to 10 minutes**; unanchored content experiences up to **70% memory decay within 24 hours**.

---

## 2. Gaze Routing: Eye-Tracking & Gestalt Perceptual Laws

### 2.1 Eye-Tracking Scanning Patterns
* **F-Shaped Scanning (Text-Heavy / Analytical Layouts):** Eye tracking (Nielsen Norman Group) proves viewers read horizontal bars across the top, shorter scans midway down, and skim vertically along the left margin. Viewers read roughly **20% of words** on a slide and exhibit **banner blindness** toward decorative header ribbons and chrome.
* **Z-Pattern & Gutenberg Diagram (Sparse / Visual Layouts):** On visual slides, gaze sweeps from top-left (Primary Optical Area) $\rightarrow$ top-right $\rightarrow$ bottom-left $\rightarrow$ bottom-right (Terminal Area). The bottom-left and top-right are fallow zones unless pulled by a high-contrast visual anchor.

### 2.2 Gestalt Laws Applied to Slides (Eliminating Box Cards)
* **Figure/Ground Segregation:** Requires sharp luminance contrast ($\ge 4.5:1$) and clear negative-space margins.
* **Enclosure & Connectedness without Box Cards:** Grouping is achieved through **1px subtle hairlines (`#CBD5E1`), background surface tints, or pure spatial alignment**—never through floating rounded rectangle cards (`LAY-05`).
* **Proximity & Similarity:** Spatially clustering related data points and matching a chart series hue to a key phrase in the action title binds them instantaneously without legend hunting.
* **Closure & Good Form (Prägnanz):** Clean, incomplete contours allow the brain to complete shapes effortlessly, reducing saccades and fixations.

---

## 3. Cognitive Load Theory (CLT) & Multimedia Learning (CTML)

| Cognitive Principle | Empirical Finding / Mechanism | Concrete PowerPoint Execution Rule |
| :--- | :--- | :--- |
| **Split-Attention Effect**<br>*(Chandler & Sweller 1992; Ginns 2006)* | Spatially separating mutually dependent text and visuals forces mental search. Controlled trials show a **0.05 performance drop per 100px of separation**. | **Ban detached chart legends.** Use inline series labels (`showValue: true` or end-of-curve tags) directly on curves or bars (`VIS-09`). Place diagram callouts directly adjacent to the feature they describe. |
| **Mayer's Coherence Principle**<br>*(Mayer 2009/2021)* | Excluding irrelevant decorative graphics, fluff, and decorative shapes yields an **effect size of 0.86** across 19 empirical tests. | **Delete every decorative 3D sphere, SVG wave, and decorative accent line** whose removal loses zero meaning (`VIS-01`, `LAY-01`). |
| **Mayer's Redundancy & Modality**<br>*(Mayer & Moreno 2003)* | Presenting verbatim paragraphs on screen while narrating them overloads the phonological loop. Concise visuals + spoken narration beats redundant text + speech. | **Cap text-only bullet slides at $\le 20\%$ of the deck** (`STR-05`). Restrict on-screen copy to telegraphic keywords and action titles; move verbatim narration into OOXML `notesSlide` (`STR-08`). |
| **Picture Superiority & Dual Coding**<br>*(Paivio 1971; Standing 1973)* | Images encode across both visual and verbal memory channels: 24-hr recall is 32% for words only, **76% for word-picture pairs**; Standing recorded 83% recognition across 10,000 photos vs 14% for words. | **Pair abstract concepts with concrete visual exhibits:** publication-grade schematics, authentic field photography, or native OOXML charts. |
| **Assertion-Evidence Model**<br>*(Alley et al.; CMU Guide)* | Replacing noun-phrase headers ("Market Overview") with full-sentence assertion titles + visual evidence **boosts audience retention by up to 32%**. | **Write every slide title as an Action Title / Assertion Header** (`STR-03`) supported below by one primary chart, diagram, or photo exhibit. |

---

## 4. Tactical Component Deployment & Spatial Placement

Human designers deploy five spatial placement tactics that AI generators rarely execute autonomously:

### 4.1 Asymmetric Tension & Rule of Thirds
* Replace AI's static centered symmetry (`LAY-09`) with an **asymmetric 35/65 split** or **2/3 Exhibit + 1/3 Interpretation split**.
* Place a hero photographic cutout or primary data chart on one third-intersection while giving the opposing two-thirds generous breathing room for left-aligned takeaway copy.

### 4.2 Deliberate Negative Space Framing (Kanso, Shizen, Shibumi)
* Treat empty space as an active compositional lens rather than wasted canvas. Elements isolated by generous whitespace capture **$2\times\text{–}3\times$ more visual attention** than elements packed into dense grids.
* Preserve $\ge 0.5''$ outer slide margins, internal container padding, and clear breathing room around titles. Maintain an overall executive **whitespace ratio between 35% and 60%**.

### 4.3 Reflexive Face Attention & Gaze Cueing
* Human faces capture visual fixations within the first second **83% of the time** (2.7× more fixations than any other element).
* Gaze direction triggers reflexive bottom-up attention, accelerating viewer target acquisition by **20–40 ms**. When a model looks at the message, viewers dwell on the message **32% longer**.
* **PowerPoint Execution:** Position portrait cutouts on the left facing right toward the headline or metric. Never allow a portrait to look off the slide edge.

### 4.4 Directional Leading Lines & Architectural Slicing
* Use 45° diagonal canvas slices, structural dividers, or mascot pointer gestures to guide saccadic scanning paths. Optimized visual routing delivers up to a **62% improvement in visual clarity**.

### 4.5 Z-Axis Depth Layering Without Drop-Shadow Slop
* Replace AI's muddy drop shadows (`box-shadow: 0 0 20px rgba(...)`) with physical 3-layer Z-axis stacking:
  * **Layer 1 (Back):** Subtle solid geometric color block or architectural photo background.
  * **Layer 2 (Middle):** Oversized display typography (e.g. 64pt–88pt title).
  * **Layer 3 (Front):** Transparent background-removed photographic cutout physically overlapping the typography.

---

## 5. Theatrical Color "Lighting" & Spotlighting Mechanics

Color is not decorative wallpaper; it is theatrical stage lighting that illuminates one core argument while dimming supporting context into neutral shadow.

### 5.1 Pre-Attentive Attributes & The Isolation Effect (Hedwig von Restorff)
* A single distinct item inside a homogeneous group captures involuntary attention and lodges in long-term memory.
* **The 60–30–10 Rule:**
  * **60–70%:** Quiet neutral ground (`bg_60`).
  * **20–30%:** Structural primary brand color (`primary_30`).
  * **5–10%:** Reserved high-contrast spotlight accent (`accent_10`).
* **Reverse Von Restorff Penalty:** Highlighting too many competing points destroys distinctiveness and reduces recall. Reserve the accent hue strictly for the focal insight, winning data series, or primary CTA.

### 5.2 Three Advanced Lighting Maneuvers
1. **Selective Desaturation:** In data charts and tables, mute all baseline series, comparisons, and rows into neutral gray (`#B5BDC8` / `#9AA3AF`), lighting *only* the target cohort or inflection point in `accent1`.
2. **Color-Matched Cross-Component Linking:** Tint a key phrase in the action title in the exact same focal hue as the highlighted chart bar or table cell, creating an instantaneous Gestalt similarity link.
3. **Photographic Spotlighting:** Subtract a circle from a 60–80% translucent dark overlay (PowerPoint `Merge Shapes → Subtract`) to cast a literal spotlight pool over a key subject on a busy background.

---

## 6. Highlighting Tactics Beyond Typography

1. **Extreme Scale Contrast:** Pair monumental hero metrics (**88–140pt Bold**) with crisp 14–16pt supporting context ($\ge 4:1$ ratio). Adhere to Slidor’s inverse leading law: tighten line spacing (0.8–0.9×) on large display headings, open line spacing (1.2–1.5×) on body copy.
2. **Cross-Slide Pattern Interrupts:** Combat the 7–10 minute attention decay curve by inserting a deliberate visual shift every 3–4 analytical slides (e.g., a full-bleed scrimmed photograph, an inverted-polarity pull quote, or a stark single-number monument).
3. **Native Image Masking & Halo Sandwiches:** Use `Crop to Shape` and `Merge Shapes → Intersect` to frame photos inside 1:1 circles, arcs, or diamonds.
4. **Functional Morph Transitions:** Use PowerPoint’s native **Morph transition** with matched `!!` Selection Pane object names to create smooth spatial zoom continuity across diagrams and zooming charts.
5. **Recurring Narrative Mascots & Micro-Motifs:** Anchor the presentation with a consistent visual host (e.g. an architectural arc, a precision crosshair, or a narrative mascot) to establish persistent mnemonic recall.

---

## 7. Multi-Slide Pacing Cadence (Anchor → Dense → Breathing)

To prevent audience cognitive exhaustion, decks must follow Nancy Duarte’s **Narrative Contrast Oscillation** and the three-stage pacing wave:

```
[Slide 1: Anchor / Cover] 
  → [Slide 2-3: Dense Evidence / Exhibit] 
  → [Slide 4: Breathing / Pattern Interrupt] 
  → [Slide 5: Core Thesis Anchor] 
  → [Slide 6-7: Dense Analysis & Compare] 
  → [Slide 8: Breathing / Quote Reset] 
  → [Slide 9-11: Dense Financial Impact] 
  → [Slide 12: Decision / Minimal Closing]
```

* **Anchor Slides (Emotional Peaks):** Covers, chapter breaks, single-metric hero slides (1 big number + 1 sentence).
* **Dense Evidence Slides (Maximum 2 Consecutive):** High-rigor data exhibits, multi-panel schematics, comparative tables (whitespace $\ge 35\%$).
* **Breathing Slides (Mental Resets):** Full-bleed photography, inverted-polarity quotes, or sparse 2-column conceptual models inserted every 3–4 slides to clear working memory.

---

## 8. The Eight Creative Composition & Art Direction Archetypes (Zero-Repetition Mandate)

> **The Zero-Repetition Mandate:** An agent must NEVER repeat the same compositional layout on consecutive slides. A 10-slide presentation must deploy at least 5 distinct compositional archetypes matching the physical and emotional nature of the content:

| Archetype ID | Composition Name | Visual Blueprint & Layout Structure | When to Deploy |
| :--- | :--- | :--- | :--- |
| **ARC-01** | **The Full-Bleed Atmospheric Scrim** | 100% canvas photography; 40–60% dark gradient scrim; large cinematic assertion header in quotation marks; text lives inside the photographic environment. | Breathers, emotional pauses, maritime/nature takeovers, chapter openers. |
| **ARC-02** | **The Horizontal Letterbox Panorama** | Top 55–65% wide continuous panoramic letterbox; bottom 35–45% pure whitespace with 2–3 editorial columns or data points. | Bridges, horizons, transit corridors, factory floors, wide landscape vistas. |
| **ARC-03** | **The Vertical Full-Height Edge Bleed** | Full-height photo slice (width 40–45%, height 100%) bleeding top-to-bottom on the right; opposing side features generous whitespace, elevation markers, and assertion text. | Sheer monoliths, skyscrapers, vertical towers, rocket stacks, mobile UI cutouts. |
| **ARC-04** | **The Gaze-Cued Portrait Split** | Subject portrait (human, wildlife, or product face) on the left looking right; right 60% contains the assertion title and core insight. Exploits pre-attentive gaze-following reflex. | Leadership quotes, customer profiles, wildlife monographs, keynote speaker intros. |
| **ARC-05** | **The Container-Free Step Chain** | Zero box cards. Horizontal progression (`01`, `02`, `03`, `04`) separated by pure column gutters and 0.75pt hairlines. Large numeral prefixes with bold titles and 2 lines of micro-copy. | Sequential manufacturing, clinical trial phases, customer onboarding journeys. |
| **ARC-06** | **The Dual-Image Macro/Micro Contrast** | 1 large establishing environment photo (60% width) + 1 small macro detail vignette (30% width) positioned on an asymmetric grid. | Terroir and ingredients, architecture and detail joints, hardware and circuit die. |
| **ARC-07** | **The Typographic Monument & Void** | Massive negative space ($\ge 65\%$ whitespace); monumental metric (72–120pt Bold) anchored by a single-sentence punchline. Zero bullet points. | Landmark statistics, financial valuations, physical scale records (e.g. 880 Meters). |
| **ARC-08** | **The Asymmetrical 70/30 Exhibit Split** | 70% width high-density native chart, schematic, or matrix; 30% high-contrast sidebar providing executive takeaways, takeaways, and decision criteria. | Boardroom exhibits, multi-monsoon seasonal logistics, clinical efficacy comparison. |

