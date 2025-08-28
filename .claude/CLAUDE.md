# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server at http://localhost:3000
pnpm dev

# Build for production
pnpm build

# Preview production build at http://localhost:5000
pnpm preview

# Type checking
pnpm type-check

# Lint and fix code
pnpm lint

# Format code
pnpm format
```

## Architecture Overview

This is an Astro-based personal website and blog with internationalization support (English/Korean). The project uses a content-driven architecture with static site generation.

### Key Technologies
- **Astro 5**: Static site generator with component islands
- **SolidJS**: Used for interactive components (configured as JSX runtime)
- **Tailwind CSS v4**: Styling with custom CSS variables
- **MDX**: Blog content with enhanced markdown features
- **TypeScript**: Full type safety throughout

### Content Management
- Blog posts are stored in `src/content/blogs/` as MDX files
- File naming convention: `{slug}.{locale}.md` (e.g., `markdown-guide.en.md`)
- Content schema defined in `src/content/config.ts` with Zod validation
- Content collections handled via `src/content/content-collections.ts`

### Project Structure

#### Source Organization
- `src/pages.src/`: Source components for pages (separate from Astro's `src/pages/`)
  - `@shared/`: Reusable components, layouts, and icons
  - Page-specific directories with `.astro` components
- `src/pages/`: Astro's file-based routing (minimal, delegates to `pages.src`)
- `src/content/`: Blog content and content collection configuration
- `src/config/`: Site constants, locale configuration
- `src/styles/`: Global styles and Tailwind configuration

#### Key Patterns
- **Dual Page Structure**: `src/pages/` for routing, `src/pages.src/` for components
- **Internationalization**: Built-in Astro i18n with English (default) and Korean
- **Component Co-location**: Related files grouped in subdirectories (e.g., `layout.sub/`)
- **Path Aliases**: `@/*` maps to `src/*` for clean imports

### Configuration Files
- `astro.config.ts`: Astro configuration with MDX, Solid, and i18n setup
- `tsconfig.json`: TypeScript with SolidJS JSX runtime
- `eslint.config.mjs`: ESLint with Astro, SolidJS, and TypeScript support
- `prettier.config.js`: Prettier with Astro and Tailwind plugins

### Content Features
- **Expressive Code**: Syntax highlighting with themes and transformers
- **Remark Callouts**: Enhanced markdown with callout support
- **Custom Typography**: Styled components for consistent text rendering
- **Series Support**: Blog posts can be organized into series

### Styling System
- **Tailwind v4**: Using `@tailwindcss/vite` plugin
- **Custom CSS Variables**: Defined in `src/styles/colors.css`
- **Theme Support**: Light/dark mode with `data-theme` attributes
- **Font**: IBM Plex Variable font (self-hosted)

### Development Workflow
- Uses PNPM as package manager
- ESLint + Prettier for code formatting
- Husky for git hooks (if configured)
- TypeScript strict mode enabled