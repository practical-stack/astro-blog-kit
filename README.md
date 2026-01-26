# Astro Blog Kit

A modern, feature-rich blog template built with Astro 5. Includes i18n support,
dark mode, code highlighting, math rendering, and more.

## Features

- **Astro 5** - Fast, modern static site generator
- **Tailwind CSS v4** - Utility-first CSS framework
- **i18n Support** - Built-in English/Korean with easy extension
- **Dark Mode** - System-aware with manual toggle
- **Code Highlighting** - Expressive Code with line numbers and diff support
- **Math Rendering** - KaTeX for LaTeX equations
- **Callouts** - GitHub-style callout blocks
- **Comments** - Giscus integration (GitHub Discussions)
- **SEO** - Open Graph, Twitter Cards, sitemap, RSS
- **Search** - Built-in search page
- **Series** - Group related posts into series

## Quick Start

```bash
# Clone the template
git clone https://github.com/yourusername/astro-blog-kit.git my-blog
cd my-blog

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open http://localhost:3000

## Configuration

### 1. Site Settings

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  title: "My Blog",
  subtitle: "A Developer's Journey",
  description: {
    en: "Your English description",
    ko: "한국어 설명",
  },
  author: "Your Name",
  siteUrl: "https://your-blog.com",
  // ... social links, Giscus, analytics
};
```

### 2. Astro Config

Update `astro.config.ts`:

```typescript
export default defineConfig({
  site: "https://your-blog.com",
  // ...
});
```

### 3. Assets

Replace placeholder files in `public/`:

| File           | Purpose                    | Recommended Size |
| -------------- | -------------------------- | ---------------- |
| `logo.svg`     | Header logo (mobile)       | 44x44px          |
| `favicon.png`  | Browser tab icon           | 32x32px          |
| `og-image.png` | Default social share image | 1200x630px       |
| `profile.webp` | Author profile photo       | 128x128px        |

## Writing Content

### Blog Posts

Create files in `src/content/posts/{category}/`:

```markdown
---
title: "My First Post"
description: "A brief description"
date: 2024-01-01
slug: my-first-post
category: tutorials
tags: ["astro", "blog"]
---

Your content here...
```

### Series

Create a folder in `src/content/series/{series-name}/`:

```
src/content/series/my-series/
├── _index.en.md      # Series metadata (English)
├── _index.ko.md      # Series metadata (Korean)
├── 01-intro.en.md    # First post
├── 01-intro.ko.md
├── 02-setup.en.md    # Second post
└── 02-setup.ko.md
```

Series metadata (`_index*.md`):

```markdown
---
title: "My Series"
description: "Learn something step by step"
slug: my-series
lang: en
---
```

Series post:

```markdown
---
title: "Introduction"
description: "Getting started"
date: 2024-01-01
series: my-series
part: 1
lang: en
---
```

## Commands

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | Start dev server at http://localhost:3000 |
| `pnpm build`      | Build for production                      |
| `pnpm preview`    | Preview production build                  |
| `pnpm type-check` | Run TypeScript type checking              |
| `pnpm format`     | Format code with Prettier                 |
| `pnpm lint`       | Lint code with ESLint                     |

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── site.ts       # Site configuration
│   │   └── locale.ts     # i18n settings
│   ├── content/
│   │   ├── posts/        # Blog posts
│   │   └── series/       # Series posts
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── post/         # Post-related components
│   │   ├── series/       # Series components
│   │   └── shared/       # Bio, Comments, ThemeToggle
│   ├── layouts/          # Page layouts
│   ├── pages/[lang]/     # Routes (i18n prefixed)
│   ├── styles/           # Global CSS
│   └── utils/            # Utility functions
├── public/               # Static assets
├── astro.config.ts       # Astro configuration
└── package.json
```

## Customization

### Adding Languages

1. Edit `src/config/locale.ts`:

```typescript
export const LOCALES = ["en", "ko", "ja"] as const;
```

2. Update `astro.config.ts`:

```typescript
i18n: {
  locales: ["en", "ko", "ja"],
  defaultLocale: "en",
}
```

3. Add translations in `src/config/site.ts`

### Styling

- Global styles: `src/styles/global.css`
- Theme colors: `src/styles/modules/theme.css`
- Typography: `src/styles/modules/prose.css`

### Comments (Giscus)

1. Go to https://giscus.app
2. Configure your repository
3. Update `siteConfig.giscus` in `src/config/site.ts`

### Analytics

Set your Google Analytics ID in `siteConfig.googleAnalyticsId`, or leave empty
to disable.

## Markdown Features

### Code Blocks

````markdown
```typescript title="example.ts"
const hello = "world";
```
````

With line highlighting:

````markdown
```typescript {2-3}
const a = 1;
const b = 2; // highlighted
const c = 3; // highlighted
```
````

### Callouts

```markdown
> [!NOTE] This is a note callout

> [!WARNING] This is a warning
```

### Math (KaTeX)

Inline: `$E = mc^2$`

Block:

```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

## Deployment

### Netlify

```bash
# Build command
pnpm build

# Publish directory
dist
```

### Vercel

Works out of the box with automatic detection.

### Cloudflare Pages

```bash
# Build command
pnpm build

# Build output directory
dist
```

## License

MIT
