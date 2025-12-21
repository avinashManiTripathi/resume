export async function exportToPdf(elementId: string, filename: string = "resume.pdf") {
    // This will use the browser's print functionality
    const element = document.getElementById(elementId);
    if (!element) {
        console.error("Element not found");
        return;
    }

    // Create a print-friendly version
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          @media print {
            body { margin: 0; }
            @page { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

export async function exportToDoc(content: string, filename: string = "resume.doc") {
    // Create a simple DOC file (actually HTML with .doc extension)
    const blob = new Blob(
        [
            `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Resume</title></head>
<body>${content}</body>
</html>`,
        ],
        { type: "application/msword" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

export function calculateFileSize(content: string): string {
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
