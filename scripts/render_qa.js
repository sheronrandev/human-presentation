#!/usr/bin/env node
/**
 * scripts/render_qa.js
 * High-Resolution Win32COM Slide Renderer & Visual QA Pipeline.
 * 
 * Uses PowerShell COM Automation to invoke PowerPoint's native hardware-accelerated
 * font rasterizer and export each slide as a pristine 1920x1080 PNG image.
 * Produces a structured qa_manifest.json suitable for automated Vision-Subagent
 * inspection and human verification.
 * 
 * Usage:
 *   node render_qa.js --pptx <presentation.pptx> --out-dir <renders_dir>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function renderDeckToPng(pptxPath, outputDir = 'renders') {
  const absPptx = path.resolve(pptxPath);
  const absOutDir = path.resolve(outputDir);

  if (!fs.existsSync(absPptx)) {
    throw new Error(`Presentation file not found: ${absPptx}`);
  }

  if (!fs.existsSync(absOutDir)) {
    fs.mkdirSync(absOutDir, { recursive: true });
  }

  console.log(`[render_qa] Launching native PowerPoint rasterizer for: ${path.basename(absPptx)}`);
  console.log(`[render_qa] Output directory: ${absOutDir}`);

  // Create temporary PowerShell script to execute COM export
  const psScriptPath = path.join(absOutDir, '_render_job.ps1');
  const manifestPath = path.join(absOutDir, 'qa_manifest.json');

  const psScript = `
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = 'Stop'

$pptxPath = "${absPptx.replace(/\\/g, '\\\\')}"
$outDir   = "${absOutDir.replace(/\\/g, '\\\\')}"
$manifest = "${manifestPath.replace(/\\/g, '\\\\')}"

Write-Host "Connecting to PowerPoint COM Server..." -ForegroundColor Cyan
$ppt = New-Object -ComObject PowerPoint.Application

try {
    # Open presentation in hidden read-only mode
    $pres = $ppt.Presentations.Open($pptxPath, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    $slideCount = $pres.Slides.Count
    Write-Host "Presentation opened successfully ($slideCount slides detected)." -ForegroundColor Green

    $manifestList = @()

    for ($i = 1; $i -le $slideCount; $i++) {
        $slide = $pres.Slides.Item($i)
        $numStr = $i.ToString("D2")
        $pngName = "slide_$numStr.png"
        $pngPath = Join-Path $outDir $pngName
        
        Write-Host "Exporting Slide $i to 1920x1080 PNG..." -ForegroundColor Gray
        $slide.Export($pngPath, "PNG", 1920, 1080)

        # Extract title text if available
        $titleText = "Slide $i"
        try {
            if ($slide.Shapes.HasTitle -eq [Microsoft.Office.Core.MsoTriState]::msoTrue) {
                $titleText = $slide.Shapes.Title.TextFrame.TextRange.Text.Trim()
            }
        } catch {}

        $entry = @{
            slide_number = $i
            file_name = $pngName
            full_path = $pngPath
            title = $titleText
            width = 1920
            height = 1080
            aspect_ratio = "16:9"
            exported_at = (Get-Date).ToString("o")
        }
        $manifestList += $entry
    }

    $outObj = @{
        source_pptx = $pptxPath
        total_slides = $slideCount
        resolution = "1920x1080"
        slides = $manifestList
    }

    $jsonStr = $outObj | ConvertTo-Json -Depth 4
    [System.IO.File]::WriteAllText($manifest, $jsonStr, [System.Text.Encoding]::UTF8)
    Write-Host "Manifest saved to: $manifest" -ForegroundColor Green
}
finally {
    if ($pres) { $pres.Close() }
    $ppt.Quit()
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
`;

  fs.writeFileSync(psScriptPath, psScript, 'utf8');

  try {
    const cmd = `powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`;
    const stdout = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
    console.log(stdout);

    // Clean up temporary script
    if (fs.existsSync(psScriptPath)) {
      fs.unlinkSync(psScriptPath);
    }

    if (fs.existsSync(manifestPath)) {
      const raw = fs.readFileSync(manifestPath, 'utf8').replace(/^\uFEFF/, '');
      const manifest = JSON.parse(raw);
      console.log(`[render_qa] Successfully exported ${manifest.total_slides} slides at 1920x1080.`);
      return manifest;
    } else {
      throw new Error('Manifest file was not generated.');
    }
  } catch (err) {
    if (fs.existsSync(psScriptPath)) {
      try { fs.unlinkSync(psScriptPath); } catch (_) {}
    }
    console.error(`[render_qa] Error during COM slide rendering: ${err.message}`);
    throw err;
  }
}

// CLI Handling
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Win32COM Slide Renderer & Visual QA Pipeline (scripts/render_qa.js)
Compliant with Section 8 of the Presentation Anti-Slop Specification

Usage:
  node scripts/render_qa.js --pptx <presentation.pptx> [--out-dir <dir>]

Example:
  node scripts/render_qa.js --pptx "C:\\path\\to\\deck.pptx" --out-dir "renders"
    `);
    process.exit(0);
  }

  const pptxIdx = args.indexOf('--pptx');
  const outDirIdx = args.indexOf('--out-dir');

  const pptxPath = pptxIdx !== -1 ? args[pptxIdx + 1] : args[0];
  const outDir = outDirIdx !== -1 ? args[outDirIdx + 1] : 'renders';

  if (!pptxPath) {
    console.error('Error: Please specify --pptx <file.pptx>');
    process.exit(1);
  }

  try {
    renderDeckToPng(pptxPath, outDir);
  } catch (e) {
    process.exit(1);
  }
}

module.exports = {
  renderDeckToPng
};
