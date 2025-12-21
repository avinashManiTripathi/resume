
export const downloadPdf = async (ApiUrl: string, fileName: string, content: any) => {
    try {
        const res = await fetch(ApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        });

        if (!res.ok) throw new Error("Failed to download PDF");

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("PDF download error:", err);
    }
};

