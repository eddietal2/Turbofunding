import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

async function test() {
  const pdfDoc = await PDFDocument.create();
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'SpaceGrotesk-Bold.ttf');
  
  console.log('Font path:', fontPath);
  console.log('File exists:', fs.existsSync(fontPath));
  console.log('File size:', fs.statSync(fontPath).size, 'bytes');
  
  try {
    const fontBytes = fs.readFileSync(fontPath);
    console.log('Bytes read:', fontBytes.length);
    const font = await pdfDoc.embedFont(new Uint8Array(fontBytes));
    console.log('✅ Font embedded successfully!');
  } catch (error: any) {
    console.log('❌ Error embedding font:', error.message);
    console.log('Full error:', error);
  }
}

test();
