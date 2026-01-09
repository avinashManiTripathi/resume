/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "app/**/*.{js,ts,jsx,tsx,mdx}",
        "pages/**/*.{js,ts,jsx,tsx,mdx}",
        "components/**/*.{js,ts,jsx,tsx,mdx}",
        "src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
                "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
            },
        },
    },
    plugins: [],
}
