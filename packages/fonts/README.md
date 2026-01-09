# @repo/fonts

Centralized font configuration for all applications in the monorepo.

## 📖 Overview

This package provides a single source of truth for font configuration across all apps (landing, admin, auth, editor). Change the font family in one place, and it updates everywhere automatically.

## 🎯 How to Change the Font

To change the font family for the entire application:

1. **Open** `packages/fonts/index.ts`

2. **Import a different font** from `next/font/google`:
   ```typescript
   import { Roboto } from "next/font/google";
   // Or any other Google Font: Poppins, Open Sans, Lato, etc.
   ```

3. **Update the font configuration**:
   ```typescript
   export const primaryFont = Roboto({
     variable: "--font-roboto",
     subsets: ["latin"],
     weight: ["300", "400", "500", "600", "700", "800", "900"],
     display: "swap",
   });
   ```

4. **Update the CSS variable name** (optional, but recommended for consistency):
   ```typescript
   export const FONT_VARIABLE = "--font-roboto";
   ```

5. **Save the file** - all apps will automatically use the new font!

## 📝 Example: Switching to Roboto

```typescript
import { Roboto } from "next/font/google";

export const primaryFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const FONT_VARIABLE = "--font-roboto";
```

## 📝 Example: Switching to Poppins

```typescript
import { Poppins } from "next/font/google";

export const primaryFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const FONT_VARIABLE = "--font-poppins";
```

## 🔧 Technical Details

- All apps import `primaryFont` from `@repo/fonts`
- The font is applied via CSS variable in each layout
- Tailwind config references the same CSS variable
- Changes propagate automatically to all apps after restart

## 🌐 Available Google Fonts

Browse all available fonts at [Google Fonts](https://fonts.google.com/)

Popular choices:
- **Inter** (current default) - Modern, clean, highly readable
- **Roboto** - Friendly, professional
- **Poppins** - Geometric, playful
- **Open Sans** - Humanist, warm
- **Lato** - Serious yet friendly
- **Montserrat** - Urban, modern
- **Plus Jakarta Sans** - Contemporary, versatile

## 📦 Package Structure

```
packages/fonts/
├── index.ts          # Main font configuration (EDIT THIS FILE)
├── package.json      # Package metadata
├── tsconfig.json     # TypeScript config
└── README.md         # This file
```

## 🚀 After Making Changes

After changing the font:
1. Restart all development servers
2. Clear Next.js cache if needed: `rm -rf apps/*/.next`
3. Verify changes in all apps (landing, admin, auth, editor)
