import { DM_Sans } from "next/font/google";

/**
 * Centralized font configuration for all apps.
 * 
 * To change the font family for the entire application:
 * 1. Import a different font from "next/font/google" (e.g., Roboto, Open Sans, etc.)
 * 2. Update the font configuration below
 * 3. All apps will automatically use the new font
 */
export const primaryFont = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
});

/**
 * The CSS variable name for the font.
 * Use this in your CSS files: font-family: var(--font-primary)
 */
export const FONT_VARIABLE = "--font-dm-sans";
