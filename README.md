# Astro Blog Kit

[한국어](./README.ko.md)

A modern, feature-rich blog template built with Astro 5. Includes i18n support,
dark mode, code highlighting, math rendering, and more.

**[Live Demo](https://astro-blog-kit.p-iknow-dev.workers.dev/)**

## Features

- **Astro 5** - Fast, modern static site generator
- **Tailwind CSS v4** - Utility-first CSS framework
- **i18n Support** - Built-in English/Korean with easy extension
- **Dark Mode** - System-aware with manual toggle
- **Code Highlighting** - Expressive Code with line numbers and diff support
- **Math Rendering** - KaTeX for LaTeX equations
- **Callouts** - GitHub/Obsidian-style callout blocks
- **Comments** - Giscus integration (GitHub Discussions)
- **SEO** - Open Graph, Twitter Cards, sitemap, RSS
- **Search** - Built-in search page
- **Series** - Group related posts into series

## Quick Start

> **DO NOT FORK** - This is a template repository. Use the
> **[Use this template](https://github.com/practical-stack/astro-blog-kit/generate)**
> button instead.

1. Click
   **[Use this template](https://github.com/practical-stack/astro-blog-kit/generate)**
   → **Create a new repository**
2. Name your repository (e.g., `my-blog`)
3. Clone your newly created repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-blog.git
   cd my-blog
   ```
4. Install dependencies and start:
   ```bash
   pnpm install
   pnpm dev
   ```

Open http://localhost:3000

---

## Content Structure

This blog supports **three types of content** organized into Astro Content
Collections:

### Overview

| Collection    | Location              | Purpose                          | URL Pattern                         |
| ------------- | --------------------- | -------------------------------- | ----------------------------------- |
| `posts`       | `src/content/posts/`  | Standalone blog posts            | `/{lang}/posts/{category}/{slug}`   |
| `series`      | `src/content/series/` | Series metadata (index files)    | `/{lang}/series/{series-slug}`      |
| `seriesPosts` | `src/content/series/` | Individual posts within a series | `/{lang}/series/{series-slug}/{id}` |

### 1. Regular Posts (`posts`)

Standalone blog posts organized by category.

**Location**: `src/content/posts/{category}/`

```
src/content/posts/
├── getting-started/
│   ├── welcome.en.md        # English version
│   └── welcome.ko.md        # Korean version
├── tutorials/
│   ├── react-basics.en.md
│   └── react-basics.ko.md
└── javascript/
    └── async-await.en.md    # Single language is also fine
```

**Frontmatter (Required fields marked with \*)**:

```yaml
---
title: "My First Post" # * Post title
description: "A brief summary" # * Used for SEO and previews
date: 2024-01-01 # * Publication date
slug: my-first-post # * URL slug (kebab-case, English)
lang: en # Language (auto-detected from filename)
category: tutorials # Category name
tags: ["astro", "blog"] # Tags array
draft: false # Hidden everywhere when true
dev-only: false # Hidden in production when true
img: /path/to/image.webp # Featured image (optional)
update: 2024-02-01 # Last update date (optional)
---
```

**URL Generation**: `/{lang}/posts/{folder-path}/{slug}`

- Example: `src/content/posts/tutorials/intro.en.md` with
  `slug: getting-started`
- → URL: `/en/posts/tutorials/getting-started`

### 2. Series

A series is a collection of related posts, like chapters in a book.

**Structure**:

```
src/content/series/
└── markdown-guide/              # Series folder
    ├── _index.en.md             # * Series metadata (English)
    ├── _index.ko.md             # * Series metadata (Korean)
    ├── 01-style-guide.en.md     # Chapter 1
    ├── 01-style-guide.ko.md
    ├── 02-code-blocks.en.md     # Chapter 2
    ├── 02-code-blocks.ko.md
    └── 03-advanced.en.md        # Chapter 3
```

#### Series Metadata (`_index*.md`)

**Required** for each series. One per language.

```yaml
---
title: "Markdown Guide" # * Series title
description: "Master markdown for blogs" # * Series description
slug: markdown-guide # Series URL slug
lang: en # * Language
---
Optional introductory content here...
```

#### Series Posts

Individual chapters/posts within a series.

```yaml
---
title: "Style Guide" # * Chapter title
description: "Basic markdown styling" # * Chapter description
date: 2024-01-01 # * Publication date
series: markdown-guide # * Must match series slug
part: 1 # Order in series (or use filename prefix)
lang: en # * Language
category: guide # Optional category
tags: ["markdown"] # Optional tags
draft: false # Hidden when true
dev-only: false # Hidden in prod when true
---
```

**Ordering**: Use either `part: N` in frontmatter OR `NN-` filename prefix
(e.g., `01-`, `02-`).

**URL Generation**: `/{lang}/series/{series-slug}/{file-id}`

- Example: `01-style-guide.en.md` in `markdown-guide/`
- → URL: `/en/series/markdown-guide/01-style-guide`

---

## Internationalization (i18n)

This blog supports **bilingual content** (English and Korean) out of the box.

### Supported Languages

| Language | Code | Locale  |
| -------- | ---- | ------- |
| English  | `en` | `en-US` |
| Korean   | `ko` | `ko-KR` |

### URL Structure

All URLs are prefixed with the language code:

- English: `/en/posts/...`, `/en/series/...`
- Korean: `/ko/posts/...`, `/ko/series/...`

### File Naming Convention

Use language suffix before `.md`:

```
# Posts
welcome.en.md   → English version
welcome.ko.md   → Korean version

# Series metadata
_index.en.md    → English series info
_index.ko.md    → Korean series info

# Series posts
01-intro.en.md  → English chapter
01-intro.ko.md  → Korean chapter
```

### Adding a New Language

1. **Edit `src/config/locale.ts`**:

```typescript
export const LOCALES = ["en", "ko", "ja"] as const;

export const LOCALE = {
  en: "en-US",
  ko: "ko-KR",
  ja: "ja-JP", // Add new locale
} as const;
```

2. **Update `astro.config.ts`**:

```typescript
i18n: {
  locales: ["en", "ko", "ja"],
  defaultLocale: "en",
  routing: {
    prefixDefaultLocale: true,
  },
}
```

3. **Add translations in `src/config/site.ts`**:

```typescript
description: {
  en: "English description",
  ko: "한국어 설명",
  ja: "日本語の説明",  // Add new translation
}
```

4. **Create content files with `.ja.md` suffix**

---

## Comments (Giscus)

This blog uses [Giscus](https://giscus.app) for comments, powered by GitHub
Discussions.

### Quick Setup

1. Go to **[giscus.app](https://giscus.app)** and follow the configuration
   wizard
2. Copy the generated values (`data-repo-id`, `data-category-id`, etc.)
3. Update `src/config/site.ts`:

```typescript
giscus: {
  repo: "yourusername/your-repo",       // Your GitHub repo
  repoId: "R_kgDOxxxxxx",               // From giscus.app
  category: "General",                   // Discussion category name
  categoryId: "DIC_kwDOxxxxxx",         // From giscus.app
  mapping: "pathname",                   // How to map posts to discussions
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "1",
  inputPosition: "top",
  lang: "en",                            // Interface language
  loading: "lazy",
}
```

### Resources

- **Configuration Wizard**: [giscus.app](https://giscus.app)
- **GitHub App**: [github.com/apps/giscus](https://github.com/apps/giscus)
- **Documentation**:
  [github.com/giscus/giscus](https://github.com/giscus/giscus#readme)
- **Advanced Configuration**: [giscus.app/ko](https://giscus.app/ko) (Korean)

### Disabling Comments

Remove or comment out the `giscus` section in `src/config/site.ts`.

---

## Personal Configuration Guide

Follow these steps to customize the blog for your own use.

### Step 1: Site Settings

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  // Basic Info
  title: "Your Blog Name",
  subtitle: "Your Tagline",
  description: {
    en: "Your English site description for SEO",
    ko: "한국어 사이트 설명",
  },
  author: "Your Name",
  siteUrl: "https://yourdomain.com", // No trailing slash
  ogImage: "/og-image.png",

  // Social Links (remove any you don't need)
  links: {
    github: "https://github.com/yourusername",
    x: "https://x.com/yourusername",
    linkedIn: "https://linkedin.com/in/yourusername",
    email: "mailto:you@example.com",
  },

  // Comments (Giscus) - See https://giscus.app for setup
  giscus: {
    repo: "yourusername/your-repo",
    repoId: "YOUR_REPO_ID", // Get from giscus.app
    category: "General",
    categoryId: "YOUR_CATEGORY_ID", // Get from giscus.app
    mapping: "pathname",
    // ... other options
  },

  // Analytics
  googleAnalyticsId: "G-XXXXXXXXXX", // Leave empty "" to disable
};
```

### Step 2: Astro Config

Update `astro.config.ts`:

```typescript
export default defineConfig({
  site: "https://yourdomain.com", // Match siteUrl above
  // ...
});
```

### Step 3: Replace Assets

Update files in `public/`:

| File           | Purpose                    | Recommended Size |
| -------------- | -------------------------- | ---------------- |
| `logo.svg`     | Header logo                | 44x44px          |
| `favicon.png`  | Browser tab icon           | 32x32px          |
| `og-image.png` | Default social share image | 1200x630px       |
| `profile.webp` | Author bio photo           | 128x128px        |

### Step 4: Remove Sample Content

```bash
# Delete sample posts
rm -rf src/content/posts/getting-started/

# Delete sample series
rm -rf src/content/series/markdown-guide/
```

### Step 5: Create Your First Post

```bash
mkdir -p src/content/posts/blog
```

Create `src/content/posts/blog/hello-world.en.md`:

```yaml
---
title: "Hello World"
description: "My first blog post"
date: 2024-01-01
slug: hello-world
lang: en
category: blog
tags: ["intro"]
---
Welcome to my blog!
```

### Step 6: Create Your First Series (Optional)

```bash
mkdir -p src/content/series/my-tutorial
```

**1. Create series metadata** (`src/content/series/my-tutorial/_index.en.md`):

```yaml
---
title: "My Tutorial Series"
description: "Learn something awesome step by step"
slug: my-tutorial
lang: en
---
Welcome to this tutorial series!
```

**2. Create series posts**
(`src/content/series/my-tutorial/01-introduction.en.md`):

```yaml
---
title: "Introduction"
description: "Getting started with the basics"
date: 2024-01-01
series: my-tutorial
part: 1
lang: en
tags: ["tutorial"]
---
Let's begin our journey...
```

**3. Add more chapters** with incrementing `part` numbers or `NN-` filename
prefixes.

### Step 7: Set Up Comments (Optional)

See the [Comments (Giscus)](#comments-giscus) section above for detailed setup
instructions.

### Configuration Checklist

- [ ] Updated `src/config/site.ts` with your info
- [ ] Updated `astro.config.ts` site URL
- [ ] Replaced `public/logo.svg`
- [ ] Replaced `public/favicon.png`
- [ ] Replaced `public/og-image.png`
- [ ] Replaced `public/profile.webp`
- [ ] Set up Giscus for comments (optional)
- [ ] Added Google Analytics ID (optional)
- [ ] Removed sample content
- [ ] Created your first post

---

## Commands

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | Start dev server at http://localhost:3000 |
| `pnpm build`      | Build for production                      |
| `pnpm preview`    | Preview production build                  |
| `pnpm type-check` | Run TypeScript type checking              |
| `pnpm format`     | Format code with Prettier                 |
| `pnpm lint`       | Lint code with ESLint                     |

---

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── site.ts          # Site configuration (EDIT THIS)
│   │   └── locale.ts        # i18n settings
│   ├── content/
│   │   ├── posts/           # Regular blog posts
│   │   │   └── {category}/  # Posts organized by category
│   │   └── series/          # Series content
│   │       └── {series}/    # Each series in its own folder
│   │           ├── _index.en.md   # Series metadata
│   │           └── 01-post.en.md  # Series posts
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── post/            # Post-related components
│   │   ├── series/          # Series components
│   │   └── shared/          # Bio, Comments, ThemeToggle
│   ├── layouts/             # Page layouts
│   ├── pages/[lang]/        # Routes (i18n prefixed)
│   ├── styles/              # Global CSS & modules
│   └── utils/               # Utility functions
├── public/                  # Static assets (REPLACE THESE)
├── astro.config.ts          # Astro configuration
└── package.json
```

---

## Markdown Features

### Code Blocks

With title and line highlighting:

````markdown
```typescript title="example.ts" {2-3}
const a = 1;
const b = 2; // highlighted
const c = 3; // highlighted
```
````

With diff notation:

````markdown
```typescript
const old = "removed";  // [!code --]
const new = "added";    // [!code ++]
```
````

### Callouts

Obsidian-style callouts:

```markdown
> [!NOTE] Important note This is highlighted information.

> [!TIP] Pro tip A helpful suggestion.

> [!WARNING] Be careful Something to watch out for.

> [!CAUTION] Danger Critical warning.
```

### Math (KaTeX)

Inline: `$E = mc^2$`

Block:

```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

---

## Customization

### Styling

- **Global styles**: `src/styles/global.css`
- **Theme colors**: `src/styles/modules/theme.css`
- **Typography**: `src/styles/modules/prose.css`
- **Callouts**: `src/styles/modules/callouts.css`

### Code Highlighting

Themes are configured in `astro.config.ts`:

```typescript
astroExpressiveCode({
  themes: ["dracula-soft", "night-owl"], // [light, dark]
  // ...
});
```

---

## Deployment

This is a static Astro site. Deploy to any static hosting provider.

```bash
# Build command
pnpm build

# Output directory
dist
```

For platform-specific guides (Vercel, Netlify, Cloudflare, AWS, etc.), see
[Astro's deployment documentation](https://docs.astro.build/en/guides/deploy/).

---

## License

MIT
