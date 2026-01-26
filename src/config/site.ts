import type { Locale } from "./locale";

/**
 * Site Configuration
 *
 * Update these values to customize your blog.
 * All fields are required unless marked as optional.
 */
export const siteConfig = {
  // ============================================
  // BASIC SITE INFO (Required)
  // ============================================

  /** Site title - displayed in header and browser tab */
  title: "My Blog",

  /** Subtitle - displayed next to title in header */
  subtitle: "A Developer's Journey",

  /** Site description - used for SEO and social sharing */
  description: {
    en: "Welcome to my blog. I write about web development, programming, and technology.",
    ko: "제 블로그에 오신 것을 환영합니다. 웹 개발, 프로그래밍, 기술에 대해 글을 씁니다.",
  } satisfies Record<Locale, string>,

  /** Your name or handle */
  author: "Your Name",

  /** Your site's URL (without trailing slash) */
  siteUrl: "https://your-blog.com",

  /** Default OG image path (relative to public folder) */
  ogImage: "/og-image.svg",

  // ============================================
  // SOCIAL LINKS (Optional - remove if not needed)
  // ============================================
  links: {
    /** GitHub profile URL */
    github: "https://github.com/yourusername",

    /** X (Twitter) profile URL */
    x: "https://x.com/yourusername",

    /** LinkedIn profile URL */
    linkedIn: "https://www.linkedin.com/in/yourusername/",

    /** Email address (with mailto: prefix) */
    email: "mailto:your@email.com",
  },

  // ============================================
  // GISCUS COMMENTS (Optional)
  // ============================================
  // To enable comments, create a Giscus app at https://giscus.app
  // and fill in the values below. Set to null to disable comments.
  giscus: {
    /** GitHub repo in format "owner/repo" */
    repo: "yourusername/your-blog-comments",

    /** Repository ID from Giscus setup */
    repoId: "YOUR_REPO_ID",

    /** Discussion category name */
    category: "General",

    /** Category ID from Giscus setup */
    categoryId: "YOUR_CATEGORY_ID",

    /** How to map posts to discussions */
    mapping: "pathname",

    /** Use strict title matching */
    strict: "0",

    /** Enable reactions */
    reactionsEnabled: "1",

    /** Emit discussion metadata */
    emitMetadata: "1",

    /** Comment input position: "top" or "bottom" */
    inputPosition: "top",

    /** Giscus interface language */
    lang: "en",

    /** Loading behavior: "lazy" or "eager" */
    loading: "lazy",
  },

  // ============================================
  // ANALYTICS (Optional)
  // ============================================
  // Set to empty string "" to disable Google Analytics
  googleAnalyticsId: "",
};

export type SiteConfig = typeof siteConfig;
