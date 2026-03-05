/**
 * Script to generate a blank TurboFunding loan application PDF
 * Usage: npm run generate:blank-pdf
 * 
 * This script uses tsx to execute TypeScript and imports the server action directly.
 */

import { downloadBlankApplicationPDF } from '../lib/actions/download-application-pdf';
import * as fs from 'fs/promises';
import * as path from 'path';

async function generateBlankPDF() {
  try {
    console.log('🔄 Generating blank TurboFunding application PDF...');
    
    const pdfBytes = await downloadBlankApplicationPDF();
    
    const outputDir = process.cwd();
    const outputPath = path.join(outputDir, 'blank-application.pdf');
    
    await fs.writeFile(outputPath, Buffer.from(pdfBytes));
    
    console.log(`✅ PDF generated successfully!`);
    console.log(`📄 Location: ${outputPath}`);
    console.log(`📊 File size: ${((pdfBytes as unknown as Uint8Array).length / 1024).toFixed(2)} KB`);
    console.log('\n📋 Use this PDF as a template for:');
    console.log('   • Client demonstrations');
    console.log('   • Portfolio samples');
    console.log('   • Internal records');
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

generateBlankPDF();
