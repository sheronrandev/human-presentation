#!/usr/bin/env node
/**
 * scripts/compile_theme_xml.js
 * Injects selected Human Design System tokens directly into DrawingML OOXML theme1.xml.
 * Implements Section 8.2 of Human Presentation Design Systems and Cognitive Attention Architecture.
 */

const fs = require('fs');
const path = require('path');

function cleanHex(hex) {
  return (hex || '000000').replace('#', '').toUpperCase();
}

/**
 * Generate valid DrawingML theme1.xml string from a Human Design System object.
 */
function generateThemeXml(system) {
  const sysId = system.id || 'HUMAN-01';
  const sysName = (system.name || 'HumanTheme').replace(/[^a-zA-Z0-9]/g, '');
  const tokens = system.tokens || {};
  const fonts = system.fonts || {};
  const isDark = system.polarity === 'dark';

  // 12-Slot OOXML a:clrScheme mapping per Section 8.2
  // For dark themes: dk1 = canvas ground, lt1 = light body ink
  // For light themes: dk1 = body ink, lt1 = canvas ground
  const dk1Hex = cleanHex(isDark ? tokens.bg_60 : (tokens.ink || '#1A1A1A'));
  const lt1Hex = cleanHex(isDark ? (tokens.ink || '#F5F5F5') : (tokens.bg_60 || '#FFFFFF'));
  const dk2Hex = cleanHex(tokens.muted_ink || '#666666');
  const lt2Hex = cleanHex(tokens.surface || (isDark ? '#262626' : '#F5F5F5'));
  const accent1Hex = cleanHex(tokens.primary_30 || '#0F62FE');
  const accent2Hex = cleanHex(tokens.accent_10 || '#FF5A4E');

  // Chart series accent3 - accent6
  const chartPal = system.chart_palette_6 || [];
  const accent3Hex = cleanHex(chartPal[2] || '#4A607A');
  const accent4Hex = cleanHex(chartPal[3] || '#7A90A8');
  const accent5Hex = cleanHex(chartPal[4] || '#A8C0D8');
  const accent6Hex = cleanHex(chartPal[5] || '#D0E0F0');

  // Accessible hyperlink tokens
  const hlinkHex = cleanHex(isDark ? '#60A5FA' : '#1D42A6');
  const folHlinkHex = cleanHex(isDark ? '#A78BFA' : '#776885');

  // Font selections
  const majorFont = fonts.win_native_major || fonts.display || 'Georgia';
  const minorFont = fonts.win_native_minor || fonts.body || 'Segoe UI';

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="${sysId}-${sysName}">
  <a:themeElements>
    <a:clrScheme name="${sysName}Colors">
      <a:dk1><a:srgbClr val="${dk1Hex}"/></a:dk1>
      <a:lt1><a:srgbClr val="${lt1Hex}"/></a:lt1>
      <a:dk2><a:srgbClr val="${dk2Hex}"/></a:dk2>
      <a:lt2><a:srgbClr val="${lt2Hex}"/></a:lt2>
      <a:accent1><a:srgbClr val="${accent1Hex}"/></a:accent1>
      <a:accent2><a:srgbClr val="${accent2Hex}"/></a:accent2>
      <a:accent3><a:srgbClr val="${accent3Hex}"/></a:accent3>
      <a:accent4><a:srgbClr val="${accent4Hex}"/></a:accent4>
      <a:accent5><a:srgbClr val="${accent5Hex}"/></a:accent5>
      <a:accent6><a:srgbClr val="${accent6Hex}"/></a:accent6>
      <a:hlink><a:srgbClr val="${hlinkHex}"/></a:hlink>
      <a:folHlink><a:srgbClr val="${folHlinkHex}"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="${sysName}Fonts">
      <a:majorFont>
        <a:latin typeface="${majorFont}"/>
        <a:ea typeface=""/>
        <a:cs typeface=""/>
      </a:majorFont>
      <a:minorFont>
        <a:latin typeface="${minorFont}"/>
        <a:ea typeface=""/>
        <a:cs typeface=""/>
      </a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="${sysName}FlatFormat">
      <a:fillStyleLst>
        <a:solidFill><a:schemeClr val="lt1"/></a:solidFill>
        <a:solidFill><a:schemeClr val="lt2"/></a:solidFill>
        <a:solidFill><a:schemeClr val="accent1"/></a:solidFill>
      </a:fillStyleLst>
      <a:lnStyleLst>
        <a:ln w="6350" cmpd="s"><a:solidFill><a:schemeClr val="dk2"/></a:solidFill></a:ln>
        <a:ln w="12700" cmpd="s"><a:solidFill><a:schemeClr val="accent1"/></a:solidFill></a:ln>
        <a:ln w="19050" cmpd="s"><a:solidFill><a:schemeClr val="accent2"/></a:solidFill></a:ln>
      </a:lnStyleLst>
      <a:effectStyleLst>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
        <a:effectStyle><a:effectLst/></a:effectStyle>
      </a:effectStyleLst>
      <a:bgFillStyleLst>
        <a:solidFill><a:schemeClr val="lt1"/></a:solidFill>
        <a:solidFill><a:schemeClr val="lt2"/></a:solidFill>
        <a:solidFill><a:schemeClr val="dk1"/></a:solidFill>
      </a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
</a:theme>`;
}

// CLI test / export
if (require.main === module) {
  const args = process.argv.slice(2);
  const sysId = args[0] || 'ACAD-02';
  const outPath = args[1] || path.join(__dirname, `theme1_${sysId}.xml`);

  // Find system from shards
  const shardsDir = path.resolve(__dirname, '../references/design-systems');
  const shardFiles = fs.readdirSync(shardsDir).filter(f => f.endsWith('.json'));
  let found = null;
  for (const sf of shardFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(shardsDir, sf), 'utf-8'));
    found = (data.systems || []).find(s => s.id.toUpperCase() === sysId.toUpperCase());
    if (found) break;
  }

  if (!found) {
    console.error(`Design System ${sysId} not found in references/design-systems/`);
    process.exit(1);
  }

  const xml = generateThemeXml(found);
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`Successfully compiled theme1.xml for [${found.id}] ${found.name} -> ${outPath}`);
}

module.exports = { generateThemeXml };
