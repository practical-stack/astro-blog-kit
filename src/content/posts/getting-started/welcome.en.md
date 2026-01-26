---
title: "Welcome to Your New Blog"
description: "Get started with your Astro blog template"
date: 2024-01-01
slug: welcome
lang: en
category: getting-started
tags: ["astro", "blog", "template"]
---

Welcome to your new Astro blog! This template comes with everything you need to
start blogging.

## Features

This template includes:

- **i18n Support** - Write posts in multiple languages
- **Dark Mode** - Automatic theme switching
- **Code Highlighting** - Beautiful syntax highlighting
- **Series** - Group related posts into organized series
- **Comments (Giscus)** - GitHub Discussions-based comment system

## Code Example

Here's a simple TypeScript example:

```typescript title="hello.ts"
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting("World"));
```

## Math Support

You can write math equations using KaTeX:

Inline math: $E = mc^2$

Block math:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## Callouts

> [!NOTE] This is a note callout. Use it to highlight important information.

> [!TIP] This is a tip callout. Great for sharing helpful advice.

> [!WARNING] This is a warning callout. Use it for cautions.

## Series

Group related posts into series, like chapters in a book.

```
src/content/series/
└── my-series/
    ├── _index.en.md        # Series metadata
    ├── 01-intro.en.md      # Chapter 1
    └── 02-deep-dive.en.md  # Chapter 2
```

Add the `series` field to your series post frontmatter:

```yaml
---
title: "Chapter Title"
series: my-series # Must match series slug
part: 1 # Order (or use 01- filename prefix)
---
```

## Comments (Giscus)

This template supports GitHub Discussions-based comments via
[Giscus](https://giscus.app).

To set up:

1. Configure your app at [giscus.app](https://giscus.app)
2. Fill in the `giscus` section in `src/config/site.ts`

```typescript
giscus: {
  repo: "yourusername/your-repo",
  repoId: "YOUR_REPO_ID",
  category: "General",
  categoryId: "YOUR_CATEGORY_ID",
  // ...
}
```

## Next Steps

1. Edit `src/config/site.ts` to customize your site
2. Replace placeholder images in `public/`
3. Start writing your own posts!

Happy blogging!
