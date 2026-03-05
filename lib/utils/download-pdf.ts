/**
 * Utility function for downloading blank application PDF
 * Can be used in client components with next.js "use client" directive
 */

export async function downloadBlankApplicationPDF() {
  try {
    // Call the server action
    const response = await fetch('/api/download-blank-pdf', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TurboFunding_Blank_Application.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✅ Blank PDF downloaded successfully');
  } catch (error) {
    console.error('❌ Failed to download PDF:', error);
    throw error;
  }
}
