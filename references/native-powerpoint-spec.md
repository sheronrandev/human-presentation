# Native Windows PowerPoint Architecture & COM Automation Guide

This reference details the exact Windows file paths, Office Open XML (OOXML) structures, Win32COM / PowerShell COM automation APIs, and mechanical safeguards for generating deterministic, publication-grade presentations.

---

## 1. Windows Office Installation Paths & Native Theme Locations

| Component | Architecture | Exact Windows File System Path | Role / Usage |
| :--- | :--- | :--- | :--- |
| **PowerPoint Executable** | 64-bit | `C:\Program Files\Microsoft Office\root\Office16\POWERPNT.EXE` | Authentic Windows font rasterizer & COM server |
| **PowerPoint Executable** | 32-bit | `C:\Program Files (x86)\Microsoft Office\root\Office16\POWERPNT.EXE` | Legacy 32-bit fallback |
| **Built-in Office Themes** | Native | `C:\Program Files\Microsoft Office\root\Document Themes 16\` | Directory of native `.thmx` themes (Default: `Office Theme.thmx`) |
| **User Custom Themes** | Custom | `%APPDATA%\Microsoft\Templates\Document Themes\` | Location for loading custom organizational `.thmx` files |
| **User Theme Colors** | XML | `%APPDATA%\Microsoft\Templates\Document Themes\Theme Colors\*.xml` | Standalone color palette definitions |
| **Custom Templates** | Template | `C:\Users\<Username>\Documents\Custom Office Templates\*.potx` | Full master templates with pre-configured layouts and placeholders |

---

## 2. OOXML Theme Structure (`ppt/theme/theme1.xml`)

To ensure clean design inheritance, elements must bind to semantic theme tokens rather than hardcoded RGB strings (`<a:srgbClr>` / CLR-10) or explicit font names (`TYP-12`):

### Exact 12-Slot OOXML `<a:clrScheme>` Mapping:
| Slot | Functional Role in Human Design System | Compilation Target & Rules |
| :--- | :--- | :--- |
| `a:dk1` | **Primary Body Ink** (positive light) or **Dark Canvas Ground** (dark) | Mapped via `<p:clrMap bg1="dk1" tx1="lt1"/>` on dark themes. |
| `a:lt1` | **Primary 60% Canvas Ground** (positive light) or **Light Body Ink** (dark) | Base background for $\ge 35\text{–}60\%$ whitespace. |
| `a:dk2` | **Secondary Muted Ink / Neutral Chart Context Baseline** | Used for desaturated non-focal bars, captions, footnotes. |
| `a:lt2` | **Secondary Elevated Surface Tint** | Used for border-free Gestalt enclosure panels, callout cards, table headers. |
| `a:accent1` | **30% Structural Primary Brand Hue** | Slide headings, primary chart series, chapter divider grounds. |
| `a:accent2` | **10% Focal Spotlight Hue** | Reserved strictly for Von Restorff pop-out metrics, chart highlights, CTAs. |
| `a:accent3` – `a:accent6` | **Harmonized CVD-Safe / Secondary Data Series** | E.g. Okabe-Ito, Paul Tol, or monochromatic tints (prevents rainbow creep CLR-07). |
| `a:hlink` / `a:folHlink` | **Accessible Interactive Hyperlink Hue** | Verified $\ge 4.5:1$ on `bg1` with muted visited-link state. |

> **Office COM Theme Color Rule:** When addressing theme colors via `win32com.client.Dispatch("PowerPoint.Application")`, address the first four theme colors using `MsoThemeColorIndex` values **13–16** rather than 1–4 so Office's native color picker UI reflects active theme tokens accurately.

### Valid Minimal OOXML `theme1.xml` Fragment (ACAD-02 Oxford Heritage Example):
```xml
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="ACAD-02-Oxford-Heritage">
  <a:themeElements>
    <a:clrScheme name="OxfordHeritage">
      <a:dk1><a:srgbClr val="211D1C"/></a:dk1>
      <a:lt1><a:srgbClr val="F1EEE9"/></a:lt1>
      <a:dk2><a:srgbClr val="61615F"/></a:dk2>
      <a:lt2><a:srgbClr val="F2F0F0"/></a:lt2>
      <a:accent1><a:srgbClr val="002147"/></a:accent1>
      <a:accent2><a:srgbClr val="994636"/></a:accent2>
      <a:accent3><a:srgbClr val="426A5A"/></a:accent3>
      <a:accent4><a:srgbClr val="E08D79"/></a:accent4>
      <a:accent5><a:srgbClr val="A0AF84"/></a:accent5>
      <a:accent6><a:srgbClr val="89827A"/></a:accent6>
      <a:hlink><a:srgbClr val="1D42A6"/></a:hlink>
      <a:folHlink><a:srgbClr val="776885"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="OxfordHeritageType">
      <a:majorFont>
        <a:latin typeface="Palatino Linotype"/>
        <a:ea typeface=""/>
        <a:cs typeface=""/>
      </a:majorFont>
      <a:minorFont>
        <a:latin typeface="Segoe UI"/>
        <a:ea typeface=""/>
        <a:cs typeface=""/>
      </a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="CleanFlat">
      <!-- Flat fills, 0.5pt hairlines, zero heavy drop shadows -->
    </a:fmtScheme>
  </a:themeElements>
</a:theme>
```

---

## 3. Automation Engine & Scripting Safeguards

### A. The Single Carriage Return Rule (Preventing Index Drift)
* **The Trap:** When setting text via PowerPoint COM (`$tr.Text = $fullText`), using standard Windows newlines (`\r\n`) causes a fatal character count discrepancy:
  * .NET string length measures `\r\n` as **2 characters**.
  * PowerPoint internally stores paragraph breaks as **1 character** (`\r`).
  * As text accumulates across lines, formatting span coordinates drift, causing bold, italic, or underline tags to apply to the wrong words or characters!
* **The Mechanical Fix:** Always join text lines using a single carriage return (`` `r `` in PowerShell, `\r` in Python):
  ```powershell
  # Safe multi-line string assembly:
  $fullText = $rawLines -join "`r"
  $tr.Text = $fullText
  # Character spans match with 0 index drift!
  ```

### B. UTF-8 Character Encoding & Unicode Math
* **The Trap:** Windows PowerShell 5.1 interprets UTF-8 files without a BOM as Windows-1252 ANSI, converting mathematical symbols into garbled artifacts (e.g., `Ω` becomes `ÃŽÂ©`, `²` becomes `Â²`).
* **The Mechanical Fix:**
  1. Always read JSON data explicitly specifying UTF-8 encoding:
     ```powershell
     $rawJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
     ```
  2. For superscripts and special symbols in code replacements, use explicit Unicode character values:
     ```powershell
     $sup2 = [char]0x00B2 # Superscript 2 (²)
     $sup8 = [char]0x2078 # Superscript 8 (⁸)
     $omega = [char]0x03A9 # Capital Omega (Ω)
     $micro = [char]0x00B5 # Micro sign (µ)
     ```

### C. Native 1.5 Line Spacing Configuration
To ensure generous human-like readability and prevent dense wall-of-text fatigue:

```powershell
# Set 1.5 Line Spacing on a TextRange:
$tr.ParagraphFormat.LineRuleWithin = [Microsoft.Office.Core.MsoTriState]::msoTrue
$tr.ParagraphFormat.SpaceWithin = 1.5 # 1.5 lines

# For multi-step arithmetic derivations (dense calculations):
$tr.ParagraphFormat.SpaceWithin = 1.25 # Calibrated tighter to avoid slide clipping
```

### D. Bounding Box & Text Overflow Detection
Anthropic's research identifies text clipping as *"the single most common error users always notice"*. Detect overflow programmatically:

```powershell
# In PowerShell Win32COM:
$boundH = $shape.TextFrame2.TextRange.BoundHeight
$boxH   = $shape.Height
if ($boundH -gt $boxH) {
    Write-Warning "Text overflow detected in Shape '$($shape.Name)': BoundHeight ($boundH) exceeds Shape Height ($boxH)!"
}
```

### E. Native PowerPoint Tables & Charts
* **Never insert charts as static PNG images.** Use native Office charts:
  ```powershell
  # Native 2D Column Chart (ppChartBarClustered = 51)
  $chart = $slide.Shapes.AddChart2(201, 51, $left, $top, $width, $height).Chart
  ```
* **Native Tables with Alternating Zebra Rows:**
  ```powershell
  $tbl = $slide.Shapes.AddTable($rowCount, $colCount, $left, $top, $width, $height).Table
  $tbl.ApplyStyle("{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}", $false) # Clean light academic table style
  ```

### F. Human File Metadata Configuration (PowerShell COM & Python)

To prevent AI metadata leaks and establish human authorship:

#### In PowerShell Win32COM:
```powershell
# Set Human BuiltInDocumentProperties
$docProps = $pres.BuiltInDocumentProperties
$docProps.Item("Title").Value = $userTitle
$docProps.Item("Author").Value = $userName
$docProps.Item("Company").Value = $userCompany
$docProps.Item("Subject").Value = $userSubject
$docProps.Item("Category").Value = $userCategory
# Ensure no AI tool generator tags persist
```

#### In Python-PPTX:
```python
prs = Presentation(pptx_path)
core_props = prs.core_properties
core_props.title = user_title
core_props.author = user_name
core_props.last_modified_by = user_name
core_props.subject = user_subject
core_props.category = user_category
# Strips default python-pptx watermarks
prs.save(pptx_path)
```

---

## 4. Empirical WCAG 2.1 Contrast & CIELAB Benchmark Dataset

Empirical audit of the 6 uploaded human showcases alongside 10 global institutional benchmarks establishing the quantitative floor for human craftsmanship:

### Panel A: WCAG 2.1 Contrast Ratios (Luminance 0–21:1)
| Benchmark Specimen | Body Ink on Canvas | Accent on Canvas | Role Tag | Text on Filled Accent Card |
| :--- | :--- | :--- | :--- | :--- |
| **Showcase 1: Editorial Portfolio** | **14.60:1** (AAA) | 7.49:1 (AAA) | Text-Safe | — |
| **Showcase 2: Lemonade Creative** | **15.30:1** (AAA) | 9.19:1 (AAA) | Text-Safe | — |
| **Showcase 3: Business Report (22-Slide)** | **14.39:1** (AAA) | 1.64:1 (Fail) | **FILL-ONLY** | **8.76:1** (AAA) |
| **Showcase 4: Little Explorers Academy** | **18.42:1** (AAA) | 19.17:1 (AAA) | Text-Safe | — |
| **Showcase 5: Dark Architectural Corporate** | **16.46:1** (AAA) | 2.33:1 (Fail on Dark) | **FILL-ONLY** | **7.92:1** (AAA) |
| **Showcase 6: Grafitte Urban Art** | **16.93:1** (AAA) | 12.48:1 (AAA) | Text-Safe | — |
| *McKinsey Navy / White* | **16.79:1** (AAA) | — | Text-Safe | — |
| *Dieter Rams Ink / Braun White* | **14.90:1** (AAA) | — | Text-Safe | — |
| *Oxford Blue / Shell Grey* | **13.87:1** (AAA) | — | Text-Safe | — |
| *Japandi Sumi / Rice Paper* | **13.26:1** (AAA) | — | Text-Safe | — |
| *Financial Times Ink / Salmon* | **12.98:1** (AAA) | 4.84:1 (AA) | Text-Safe | — |
| *Metropolis Slate / Off-White* | **11.97:1** (AAA) | 4.57:1 (AA) | Text-Safe | — |
| *Nord Snow / Polar Night* | **10.84:1** (AAA) | 6.24:1 (AAA) | Text-Safe | — |
| *Aesop Amber / Cream* | **8.95:1** (AAA) | — | Text-Safe | — |
| *Harvard Crimson / White* | **7.77:1** (AAA) | — | Text-Safe | — |
| *Okabe-Ito Blue / White* | **5.19:1** (AA) | 3.87:1 (Large/UI) | Text-Safe | — |

### Panel B: Minimum CIELAB $\Delta E$ Distance from 12 Banned AI-Slop Anchors
* **Separation Floor:** Mandatory $\Delta E \ge 15$ for clear separation; $\Delta E \ge 12$ minimum threshold without explicit editorial justification.
* **Showcase 1 (Editorial):** $\Delta E = 27.34$ from Tailwind Red-500.
* **Showcase 5 (Dark Architecture):** $\Delta E = 22.21$ from Tailwind Red-500.
* **Showcase 6 (Grafitte Urban):** $\Delta E = 21.34$ from Tailwind Green-500.
* **Showcase 4 (Little Explorers):** $\Delta E = 14.90$ from Tailwind Slate-900 (neutral ink eliminates blue cast).
* **Showcase 2 (Lemonade):** $\Delta E = 13.65$ from Tailwind Amber-500 (differentiated by matte charcoal substrate).
* **Showcase 3 (Business Report):** $\Delta E = 13.65$ from Tailwind Amber-500 (differentiated by off-white ground and gold card fill).

