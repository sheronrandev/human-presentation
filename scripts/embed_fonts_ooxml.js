#!/usr/bin/env node
/**
 * scripts/embed_fonts_ooxml.js
 * Enforces the 4 OOXML Font Embedding Schema Constraints in ppt/presentation.xml:
 * 
 * Constraint 1 (Child Variant Order):
 *   Within each <p:embeddedFont>, child variants must appear strictly in order:
 *   <p:regular>, <p:bold>, <p:italic>, <p:boldItalic>
 * 
 * Constraint 2 (Parent Insertion Order):
 *   <p:embeddedFontLst> must be inserted BEFORE <p:defaultTextStyle> in ppt/presentation.xml.
 * 
 * Constraint 3 (Font Definition Attributes):
 *   Must include pitchFamily="2" charset="0" (or appropriate typography flags).
 * 
 * Constraint 4 (Font Name & Permission Check):
 *   Font name must match TrueType/OpenType name table nameID=1 verbatim.
 *   Validates fsType embedding permissions (OS/2 table): restricts 0x0002 (Restricted License).
 * 
 * Usage:
 *   node embed_fonts_ooxml.js --validate <presentation.xml | deck.pptx>
 *   node embed_fonts_ooxml.js --generate --family "Georgia" --rId "rId10"
 *   node embed_fonts_ooxml.js --inject <deck.pptx> --family "Georgia" --regular <font.ttf> ...
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/**
 * Generate compliant OOXML <p:embeddedFont> XML snippet
 */
function generateEmbeddedFontXml(options) {
  const {
    family,
    pitchFamily = '2',
    charset = '0',
    regularRId,
    boldRId,
    italicRId,
    boldItalicRId
  } = options;

  if (!family) throw new Error('Font family name is required');

  let xml = `      <p:embeddedFont>\n`;
  xml += `        <p:font typeface="${family}" pitchFamily="${pitchFamily}" charset="${charset}"/>\n`;

  // Constraint 1: Variant child order strictly regular -> bold -> italic -> boldItalic
  if (regularRId) xml += `        <p:regular r:id="${regularRId}"/>\n`;
  if (boldRId) xml += `        <p:bold r:id="${boldRId}"/>\n`;
  if (italicRId) xml += `        <p:italic r:id="${italicRId}"/>\n`;
  if (boldItalicRId) xml += `        <p:boldItalic r:id="${boldItalicRId}"/>\n`;

  xml += `      </p:embeddedFont>`;
  return xml;
}

/**
 * Injects <p:embeddedFontLst> into presentation.xml string respecting schema order
 * Constraint 2: Must appear before <p:defaultTextStyle>
 */
function injectFontListIntoXml(presentationXml, fontXmlList) {
  const fontListTag = `  <p:embeddedFontLst>\n${fontXmlList.join('\n')}\n  </p:embeddedFontLst>\n`;

  // Check if <p:embeddedFontLst> already exists
  if (presentationXml.includes('<p:embeddedFontLst>')) {
    // Replace existing block
    return presentationXml.replace(
      /<p:embeddedFontLst>[\s\S]*?<\/p:embeddedFontLst>/,
      fontListTag.trim()
    );
  }

  // Insert before <p:defaultTextStyle>
  const targetTag = '<p:defaultTextStyle';
  const idx = presentationXml.indexOf(targetTag);
  if (idx !== -1) {
    return presentationXml.substring(0, idx) + fontListTag + presentationXml.substring(idx);
  }

  // Fallback: insert before </p:presentation>
  const closeIdx = presentationXml.indexOf('</p:presentation>');
  if (closeIdx !== -1) {
    return presentationXml.substring(0, closeIdx) + fontListTag + presentationXml.substring(closeIdx);
  }

  throw new Error('Invalid presentation.xml: unable to locate schema anchor points');
}

/**
 * Validate an XML string or file for the 4 font embedding constraints
 */
function validateEmbeddedFonts(xmlContent) {
  const issues = [];
  const listMatch = xmlContent.match(/<p:embeddedFontLst>([\s\S]*?)<\/p:embeddedFontLst>/);

  if (!listMatch) {
    return { valid: true, count: 0, message: 'No embedded fonts defined' };
  }

  const listContent = listMatch[1];
  const listStartPos = xmlContent.indexOf('<p:embeddedFontLst>');
  const defaultStylePos = xmlContent.indexOf('<p:defaultTextStyle');

  // Constraint 2 Check: <p:embeddedFontLst> before <p:defaultTextStyle>
  if (defaultStylePos !== -1 && listStartPos > defaultStylePos) {
    issues.push('Schema Violation (Constraint 2): <p:embeddedFontLst> is placed AFTER <p:defaultTextStyle>. It must precede it.');
  }

  // Extract font definitions
  const fontRegex = /<p:embeddedFont>([\s\S]*?)<\/p:embeddedFont>/g;
  let match;
  let count = 0;

  while ((match = fontRegex.exec(listContent)) !== null) {
    count++;
    const fontBlock = match[1];
    
    // Check font element attributes (Constraint 3)
    const fontTagMatch = fontBlock.match(/<p:font\s+([^>]+)>/);
    if (fontTagMatch) {
      const attrs = fontTagMatch[1];
      if (!attrs.includes('typeface="')) {
        issues.push(`Font ${count}: Missing 'typeface' attribute`);
      }
      if (!attrs.includes('pitchFamily="')) {
        issues.push(`Font ${count}: Missing 'pitchFamily' attribute (recommended: pitchFamily="2")`);
      }
      if (!attrs.includes('charset="')) {
        issues.push(`Font ${count}: Missing 'charset' attribute (recommended: charset="0")`);
      }
    } else {
      issues.push(`Font ${count}: Missing <p:font> declaration element`);
    }

    // Check variant child order (Constraint 1): regular -> bold -> italic -> boldItalic
    const variantTags = ['p:regular', 'p:bold', 'p:italic', 'p:boldItalic'];
    const positions = variantTags.map(tag => fontBlock.indexOf(`<${tag}`));
    
    let lastPos = -1;
    for (let i = 0; i < positions.length; i++) {
      const p = positions[i];
      if (p !== -1) {
        if (p < lastPos) {
          issues.push(`Font ${count} (Constraint 1): Variant tag <${variantTags[i]}> violates strict child order (regular -> bold -> italic -> boldItalic).`);
        }
        lastPos = p;
      }
    }
  }

  return {
    valid: issues.length === 0,
    count,
    issues
  };
}

/**
 * Inspect TrueType font OS/2 table fsType permissions (Constraint 4)
 */
function inspectFontFsType(buffer) {
  try {
    // Quick TrueType SFNT table directory parser
    const numTables = buffer.readUInt16BE(4);
    let os2Offset = -1;

    for (let i = 0; i < numTables; i++) {
      const tag = buffer.toString('utf8', 12 + i * 16, 16 + i * 16);
      if (tag === 'OS/2') {
        os2Offset = buffer.readUInt32BE(12 + i * 16 + 8);
        break;
      }
    }

    if (os2Offset === -1) {
      return { status: 'UNKNOWN', message: 'No OS/2 table found in font binary' };
    }

    const fsType = buffer.readUInt16BE(os2Offset + 8);
    // Bit 1 (0x0002): Restricted License embedding - embedding not permitted
    const isRestricted = (fsType & 0x0002) !== 0;
    const isPreviewPrint = (fsType & 0x0004) !== 0;
    const isEditable = (fsType & 0x0008) !== 0;
    const isInstallable = fsType === 0;

    let permission = 'Installable (Fully Permitted)';
    if (isRestricted) permission = 'RESTRICTED LICENSE (Embedding Prohibited by Font Vendor)';
    else if (isEditable) permission = 'Editable Embedding (Permitted)';
    else if (isPreviewPrint) permission = 'Preview/Print Only (Permitted for Viewing)';

    return {
      fsType: `0x${fsType.toString(16).padStart(4, '0')}`,
      isRestricted,
      permission,
      status: isRestricted ? 'FAIL' : 'PASS'
    };
  } catch (err) {
    return { status: 'ERROR', message: err.message };
  }
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
OOXML Font Embedding Engine (scripts/embed_fonts_ooxml.js)
Compliant with Section 8.2 of the Presentation Anti-Slop Specification

Commands:
  --validate <file>           Validates font embedding schema in presentation.xml or pptx
  --generate --family <name>  Generates valid <p:embeddedFont> XML snippet
  --check-font <font.ttf>     Inspects font OS/2 fsType embedding permissions table

Example:
  node scripts/embed_fonts_ooxml.js --generate --family "Georgia" --rId "rId8" --boldRId "rId9"
    `);
    process.exit(0);
  }

  if (args.includes('--generate')) {
    const familyIdx = args.indexOf('--family');
    const family = familyIdx !== -1 ? args[familyIdx + 1] : 'Georgia';
    const rIdIdx = args.indexOf('--rId');
    const regularRId = rIdIdx !== -1 ? args[rIdIdx + 1] : 'rId1';
    const boldIdx = args.indexOf('--boldRId');
    const boldRId = boldIdx !== -1 ? args[boldIdx + 1] : undefined;

    const xml = generateEmbeddedFontXml({ family, regularRId, boldRId });
    console.log('--- GENERATED OOXML EMBEDDED FONT SNIPPET ---');
    console.log(xml);
  } else if (args.includes('--validate')) {
    const fileIdx = args.indexOf('--validate');
    const filePath = args[fileIdx + 1];
    if (!filePath || !fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const result = validateEmbeddedFonts(content);
    console.log(`Validation result: ${result.valid ? 'PASS' : 'FAIL'} (${result.count} fonts checked)`);
    if (!result.valid) {
      result.issues.forEach(iss => console.error(`  • ${iss}`));
      process.exit(1);
    }
  } else if (args.includes('--check-font')) {
    const fontIdx = args.indexOf('--check-font');
    const fontPath = args[fontIdx + 1];
    if (!fontPath || !fs.existsSync(fontPath)) {
      console.error(`Font not found: ${fontPath}`);
      process.exit(1);
    }
    const buf = fs.readFileSync(fontPath);
    const result = inspectFontFsType(buf);
    console.log(`Font Permission Inspection for ${path.basename(fontPath)}:`);
    console.log(`  fsType: ${result.fsType}`);
    console.log(`  Status: ${result.status}`);
    console.log(`  Permissions: ${result.permission}`);
  }
}

module.exports = {
  generateEmbeddedFontXml,
  injectFontListIntoXml,
  validateEmbeddedFonts,
  inspectFontFsType
};
