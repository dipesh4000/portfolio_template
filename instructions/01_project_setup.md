# 01 — Project Setup

## 1.1 Initialise the Project

```bash
npx create-next-app@latest bleach-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd bleach-portfolio
```

---

## 1.2 Install All Dependencies

```bash
# Animation
npm install framer-motion

# UI primitives
npm install @radix-ui/react-tooltip @radix-ui/react-dialog

# Schema validation
npm install zod

# Utilities
npm install clsx tailwind-merge

# Icons
npm install lucide-react

# Date handling (for education/experience timelines)
npm install date-fns
```

---

## 1.3 Tailwind Configuration

Replace the contents of `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0B0B',
          secondary: '#121212',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#BFBFBF',
        },
        accent: '#F5A623',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'slash-in': 'slashIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reiatsu-pulse': 'reiatsuPulse 3s ease-in-out infinite',
      },
      keyframes: {
        slashIn: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reiatsuPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 1.4 TypeScript Path Config

Confirm `tsconfig.json` has these paths (create-next-app usually does this):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 1.5 Environment Variables

Create `.env.local` in the project root:

```env
# Codolio
CODOLIO_USERNAME=dipesh4000

# Public vars (safe to expose to browser)
NEXT_PUBLIC_GITHUB_USERNAME=dipesh4000
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Create `.env.example` (commit this, not `.env.local`):

```env
CODOLIO_USERNAME=your-codolio-username
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 1.6 Folder Structure

Create this exact structure inside `src/`:

```
src/
├── app/
│   ├── api/
│   │   └── codolio/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── GitHubActivity.tsx
│   │   └── DSAActivity.tsx
│   └── ui/
│       ├── SwordDivider.tsx
│       ├── GlitchText.tsx
│       ├── SectionLabel.tsx
│       └── ReiatsuParticles.tsx
│
├── data/
│   ├── config.ts
│   ├── projects.ts
│   ├── education.ts
│   ├── experience.ts
│   └── socials.ts
│
├── lib/
│   ├── utils.ts
│   ├── schemas.ts
│   └── codolio.ts
│
└── types/
    └── index.ts
```

Run this to create all empty files:

```bash
mkdir -p src/app/api/codolio
mkdir -p src/components/{layout,sections,ui}
mkdir -p src/data src/lib src/types

touch src/app/api/codolio/route.ts
touch src/components/layout/{Navbar,Footer}.tsx
touch src/components/sections/{Hero,About,Projects,Education,Experience,GitHubActivity,DSAActivity}.tsx
touch src/components/ui/{SwordDivider,GlitchText,SectionLabel,ReiatsuParticles}.tsx
touch src/data/{config,projects,education,experience,socials}.ts
touch src/lib/{utils,schemas,codolio}.ts
touch src/types/index.ts
```

---

## 1.7 Verify Setup

```bash
npm run dev
```

You should see the default Next.js page at `http://localhost:3000`. If it errors, check Tailwind content paths first.

---

Proceed to `02_design_system.md`.
