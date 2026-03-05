/**
 * API Route: GET /api/download-blank-pdf
 * Generates and returns a blank TurboFunding application PDF
 */

import { downloadBlankApplicationPDF } from '@/lib/actions/download-application-pdf';

export async function GET() {
  try {
    console.log('[API] /api/download-blank-pdf - Generating blank PDF');
    
    const pdfBytes = await downloadBlankApplicationPDF();
    
    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="TurboFunding_Blank_Application.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Length': String(pdfBytes.length),
      },
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[API] Blank PDF generation error:', errorMsg);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to generate blank PDF',
        message: errorMsg,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
