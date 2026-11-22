# Diagram Prompt Engineering Reference Guide

This reference provides the tested formulas, structure, and prompt archetypes for generating publication-grade, textbook-quality diagrams and schematics via AI image generation.

---

## 1. The Core Prompt Engineering Formula

Every prompt for an engineering schematic, technical diagram, or scientific visual must follow this 4-part structure:

```
[Style & Medium Directive] 
+ [Geometric Layout & Component Placements] 
+ [Wiring, Flows & Annotated Labels] 
+ [Negative Constraints & Slop Blockers]
```

---

## 2. Master Blueprint Rules

1. **Pure White Background:** Always mandate a solid, pure white background (`#FFFFFF`). This ensures the diagram blends seamlessly into light-themed slides without visible rectangular boundaries or dark halos.
2. **2D Vector Drafting Style:** Never request "realistic", "photorealistic", "3D render", or "cinematic". Always request *"Clean 2D vector technical schematic / publication-grade engineering textbook illustration"*.
3. **Line Weight & Contrast:** Mandate *"Crisp black and dark charcoal lines (1.5pt stroke weight), high contrast, professional draftsmanship conforming to IEEE/IEC schematic standards"*.
4. **Accents & Annotations:** Allow at most one clean accent color (e.g., deep cobalt blue or forest green) for current arrows, voltage probe labels, or state highlights.
5. **No Decorative Clutter:** Explicitly forbid shadows, glowing wires, glossy skeuomorphism, and artistic lens flares.

---

## 3. Battle-Tested Archetype Prompts

### Archetype A: D.C. Series Circuit Schematic
```text
A publication-grade, clean textbook 2D schematic diagram of a DC series circuit with two resistors, vector style on a pure solid white background (#FFFFFF). 
On the left, a standard DC battery source symbol with long and short parallel plates, clearly labeled 'Vs = 12 V' with '+' on top and '-' on the bottom. 
A crisp black wire line connects from the positive terminal, running horizontally across the top through two standard zigzag resistor symbols in series: the first resistor labeled 'R1 = 220 Ω' with a blue double-ended arrow below it showing 'V1 = 4.80 V', and the second resistor labeled 'R2 = 330 Ω' with a blue double-ended arrow showing 'V2 = 7.20 V'. 
A horizontal arrow above the top wire indicates current flow, labeled 'IT = 21.82 mA'. 
The wire turns down on the right and returns along the bottom to the negative battery terminal. 
High contrast, dark slate and black lines, perfectly crisp typography, IEEE standard electronics drafting aesthetic. 
NO 3D effects, NO gradients, NO drop shadows, NO skeuomorphism, NO photorealism, NO blurry artifacts, NO background texture.
```

### Archetype B: Sinusoidal A.C. Waveform Graph
```text
A clean academic textbook 2D coordinate graph of a single cycle of a sinusoidal alternating current (A.C.) voltage waveform on a pure solid white background (#FFFFFF). 
The horizontal time axis (t) is drawn as a dark solid black line with a rightward arrow. 
The vertical voltage axis (V) has an upward arrow and is labeled 'Voltage (V)'. 
A smooth, perfectly symmetrical sine wave is plotted in crisp navy blue (#1E3A8A). 
Key annotations: 
1. Positive peak point at the crest labeled 'Vpeak = +325.27 V'. 
2. Negative peak point at the trough labeled '-Vpeak = -325.27 V'. 
3. Horizontal dashed gray line at the RMS level labeled 'VRMS = 230 V (0.707 × Vpeak)'. 
4. A vertical double-ended dimension arrow spanning the full height from trough to crest labeled 'Vp-p = 650.54 V'. 
5. A horizontal double-ended dimension arrow spanning one complete cycle from t = 0 to 360 degrees labeled 'Period T = 20 ms (f = 50 Hz)'. 
Textbook scientific diagram quality, ultra-sharp vector lines, legible sans-serif mathematical labels. 
NO 3D, NO neon glow, NO dark background, NO decorative gradients.
```

### Archetype C: Inverting Operational Amplifier Circuit
```text
A clean publication-grade 2D electronic schematic diagram of an inverting operational amplifier (Op-Amp) circuit on a pure solid white background (#FFFFFF). 
Center features a standard triangular op-amp symbol pointing right: inverting input marked with '-' on the top-left, non-inverting input marked with '+' on the bottom-left, and output pin 'Vout' extending from the right vertex. 
The non-inverting (+) input connects directly to a ground symbol (0 V reference). 
The inverting (-) input connects through an input resistor 'Rin = 10 kΩ' to an input voltage terminal labeled 'Vin = +0.4 V'. 
A feedback loop connects from the inverting input pin (-), loops over the top through a feedback resistor 'Rf = 50 kΩ', and connects directly to the output wire Vout. 
Output wire is labeled 'Vout = -2.0 V (Av = -5, Inverted 180°)'. 
Node at the inverting pin is annotated with a dashed callout: 'Virtual Ground (0.00 V)'. 
Crisp black wire lines, high-contrast schematic symbols, clear technical typography. 
NO 3D render, NO glossy plastic, NO breadboard textures, NO shadows.
```

### Archetype D: Synchronous D Flip-Flop & Timing Diagram
```text
A clean textbook 2D digital logic diagram featuring a positive-edge-triggered D Flip-Flop and its synchronous timing waveform on a pure solid white background (#FFFFFF). 
Left side: Standard rectangular logic IC block labeled 'D Flip-Flop' with inputs 'D' (data) and a dynamic clock indicator triangle 'CLK' on the left side, and complementary outputs 'Q' and 'Q_bar' on the right side. 
Right side: A clear 3-channel digital timing diagram with horizontal time axes: 
Channel 1 shows a periodic square clock signal 'CLK' with small upward arrows at each rising edge. 
Channel 2 shows the digital data input 'D' transitioning between 0 and 1. 
Channel 3 shows the output 'Q' updating strictly at the clock rising edges (↑) and latching constant state in between. 
Crisp vector lines, dark slate signal traces, clear logic state labels (0 and 1). 
NO 3D effects, NO circuit board photo, NO blurry shadows, NO colorful glows.
```

### Archetype E: Embedded System 6-Layer Architecture Stack
```text
A clean, elegant 2D engineering architecture diagram showing the 6-layer hardware-to-software stack of an embedded microcontroller system on a pure solid white background (#FFFFFF). 
Drawn as a vertical layered hierarchy from bottom to top: 
Layer 1 (Bottom): 'Physical Electronics & Sensors (Transistors, Diodes, RLC Circuits, 5V DC Supply)' in steel blue. 
Layer 2: 'Digital Logic & Registers (Flip-Flops, Logic Gates, Latches)' in slate. 
Layer 3: 'Microcontroller Core & ALU (CPU, Program Counter, Timers, Interrupts)' in navy. 
Layer 4: 'Firmware & Device Drivers (Register Manipulation, GPIO Hardware Abstraction Layer)' in dark teal. 
Layer 5: 'Operating System / RTOS Kernel (Task Scheduling, Memory Management)' in charcoal. 
Layer 6 (Top): 'High-Level Application Software (Control Algorithms, User Logic, State Machines)' in deep blue. 
Clean horizontal layer bars with subtle 1px dividers, crisp typography, upward bidirectional data arrows indicating hardware-software interaction. 
NO 3D isometric tilt, NO glassmorphism, NO dark background, NO decorative clip art.
```

---

## 4. Aspect-Ratio Locked Canvas Insertion

When inserting the generated diagram into a slide via PowerShell or Python COM:

```powershell
# Bounding box constraints
$pad = 6.0
$availW = $boxWidth - ($pad * 2.0)
$availH = $boxHeight - ($pad * 2.0)

# Load image to read true dimensions
$img = [System.Drawing.Image]::FromFile($imgPath)
$origW = [float]$img.Width
$origH = [float]$img.Height
$img.Dispose()

# Compute uniform scale factor (Aspect-Ratio Lock)
$scale = [Math]::Min($availW / $origW, $availH / $origH)
$fitW = [Math]::Round($origW * $scale)
$fitH = [Math]::Round($origH * $scale)

# Center precisely within bounding box
$fitLeft = [Math]::Round($boxLeft + $pad + (($availW - $fitW) / 2.0))
$fitTop  = [Math]::Round($boxTop  + $pad + (($availH - $fitH) / 2.0))

# Insert picture without enclosing shape border
$slide.Shapes.AddPicture($imgPath, $false, $true, $fitLeft, $fitTop, $fitW, $fitH)
```
