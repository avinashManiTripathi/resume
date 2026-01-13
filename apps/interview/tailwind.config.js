/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Syncing with Landing Project Blue
                primary: {
                    50: '#E1E5FA',
                    100: '#CCD3F6',
                    500: '#223DC5', // Main Landing Blue
                    600: '#1a2f9e',
                    900: '#0f172a',
                },
                accent: {
                    50: '#FFF9EA',
                    500: '#FFD053', // Landing Yellow
                    600: '#e6b83d',
                },
            },
            fontFamily: {
                sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
