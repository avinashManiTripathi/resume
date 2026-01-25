export const saveBlobAsPdf = (blob: Blob, fileName: string) => {
    try {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("PDF save error:", err);
        throw err;
    }
};

