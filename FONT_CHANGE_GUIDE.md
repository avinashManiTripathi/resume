# Quick Reference: How to Change Font Family

## ✅ What's Been Set Up

I've centralized all font configuration into a single package: `packages/fonts`

All apps (landing, admin, auth, editor) now use this shared font configuration.

## 🎯 To Change the Font (3 Simple Steps)

### 1. Open the Font Configuration File
Navigate to: **`packages/fonts/index.ts`**

### 2. Replace the Font Import
Change this line:
```typescript
import { Plus_Jakarta_Sans } from "next/font/google";
```

To your preferred font, for example:
```typescript
import { Roboto } from "next/font/google";
```

### 3. Update the Font Configuration
Update both the `primaryFont` export AND the `FONT_VARIABLE`:
```typescript
export const primaryFont = Roboto({
  variable: "--font-roboto",  // Update variable name
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const FONT_VARIABLE = "--font-roboto";  // ⚠️ Don't forget this!
```

**That's it!** The font will change across:
- ✅ All 4 apps (landing, admin, auth, editor)
- ✅ All CSS files (automatically via CSS variables)
- ✅ Tailwind utilities (font classes)

## 🔄 After Changing

1. **Restart your dev servers** (Ctrl+C and run `npm run dev` again)
2. **Clear cache if needed**: `rm -rf apps/*/.next`

## 🌐 Popular Font Examples

```typescript
// Roboto
import { Roboto } from "next/font/google";
export const primaryFont = Roboto({ variable: "--font-roboto", ... });

// Poppins  
import { Poppins } from "next/font/google";
export const primaryFont = Poppins({ variable: "--font-poppins", ... });

// Open Sans
import { Open_Sans } from "next/font/google";
export const primaryFont = Open_Sans({ variable: "--font-open-sans", ... });

// Plus Jakarta Sans
import { Plus_Jakarta_Sans } from "next/font/google";
export const primaryFont = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta", ... });
```

Browse all fonts: https://fonts.google.com/

## 📁 Files Changed

- ✅ Created `packages/fonts/` package
- ✅ Updated all 4 app layouts (landing, admin, auth, editor)
- ✅ Added `@repo/fonts` dependency to all apps
- ✅ Installed dependencies

---

**One file to change them all:** `packages/fonts/index.ts` 🎨
