# Astro 도메인 특화 품질 기준

## 컴포넌트 구조

### Props 인터페이스 (필수)

```astro
---
// GOOD: 명시적 Props 인터페이스
interface Props {
  lang: Locale;
  posts: PostEntry[];
  getHref?: (post: PostEntry) => string;  // 선택적 prop
}

const { lang, posts, getHref = defaultGetHref } = Astro.props;
---

---
// BAD: Props 타입 없음
const { lang, posts } = Astro.props;  // IDE 지원 없음, 런타임 에러 위험
---
```

### 프론트매터 구성 순서 (권장)

```astro
---
// 1. 외부 라이브러리 import
import { getCollection } from "astro:content";
import { format } from "date-fns";

// 2. 내부 import (타입 먼저, 알파벳 순)
import type { Locale } from "@/config/locale";
import type { PostEntry } from "@/utils/posts/types";
import { getPostUrl } from "@/utils/posts/url";
import { isPublished } from "@/utils/filter";

// 3. Props 인터페이스
interface Props {
  lang: Locale;
}

// 4. Props 추출
const { lang } = Astro.props;

// 5. 데이터 페칭 (await)
const posts = await getCollection("posts", isPublished);

// 6. 파생 데이터 / 헬퍼 함수
const sortedPosts = posts.sort((a, b) => ...);
const formatTitle = (title: string) => title.toUpperCase();
---
```

## 스타일 패턴

| 패턴 | 사용 시점 | 예시 |
|------|----------|------|
| Tailwind 유틸리티 | 기본 선택 | `class="flex items-center gap-4"` |
| `<style>` (scoped) | 복잡한 선택자, 애니메이션 | `:hover`, `::before` |
| `<style is:global>` | 슬롯 내부, 외부 라이브러리 스타일링 | `.prose img` |
| 인라인 style | 동적 값만 | `style={`--progress: ${percent}%`}` |

```astro
// GOOD: Tailwind 우선
<div class="flex items-center gap-4 p-4 rounded-lg bg-surface">

// GOOD: 복잡한 선택자는 scoped style
<style>
  .nav-item:not(:last-child)::after {
    content: '|';
    margin: 0 0.5rem;
  }
</style>

// ACCEPTABLE: 전역 스타일 (명시적 의도)
<style is:global>
  /* prose 내부의 이미지는 Tailwind로 접근 불가 */
  .prose img {
    border-radius: 8px;
  }
</style>

// BAD: 과도한 인라인 (4개 이상 속성)
<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem;">
```

## Content Collections

```typescript
// GOOD: 완전한 스키마
schema: z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  update: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  "dev-only": z.boolean().default(false),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  img: z.string().optional(),
  lang: z.enum(LOCALES).optional(),
  slug: z.string(),
})

// BAD: 타입 안전성 포기
schema: z.object({
  title: z.string(),
  metadata: z.any(),        // ❌ 어떤 값이든 허용
  config: z.unknown(),      // ❌ 타입 정보 없음
  data: z.record(z.any()),  // ❌ 키-값 모두 미검증
})
```

## i18n 패턴

```typescript
// GOOD: 컴포넌트 내 번역 객체
const texts = {
  en: {
    title: "Series",
    parts: (n: number) => `${n} parts`,
    empty: "No series found.",
  },
  ko: {
    title: "시리즈",
    parts: (n: number) => `${n}편`,
    empty: "시리즈가 없습니다.",
  },
} as const;

const t = texts[lang];

// GOOD: 경로 생성 유틸리티 사용
import { getLangPath } from "@/utils/locale";
const langPath = getLangPath(lang);  // "/en" 또는 "/ko"

// GOOD
href={`${langPath}/posts/${slug}`}

// BAD: 하드코딩
href={`/en/posts/${slug}`}     // ❌ 언어 전환 시 깨짐
href={`/${lang}/posts/${slug}`} // ⚠️ 작동하지만 일관성 부족
```

## View Transitions 호환

```astro
// GOOD: 이벤트 위임 (document 레벨에서 한 번만 등록)
<script>
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const button = target.closest('.dropdown-toggle');
    if (button) {
      // 핸들러 로직
    }
  });
</script>

// GOOD: astro:page-load로 재초기화
<script>
  function initializeComponent() {
    // 컴포넌트 초기화 로직
  }
  
  // 초기 로드와 View Transition 후 모두 실행
  document.addEventListener('DOMContentLoaded', initializeComponent);
  document.addEventListener('astro:page-load', initializeComponent);
</script>

// BAD: 직접 바인딩만 (View Transition 후 동작 안 함)
<script>
  document.querySelector('.btn')?.addEventListener('click', handler);
  // 페이지 전환 후 .btn이 새 DOM이 되면 리스너 없음
</script>
```

## 동적 라우트 & 성능

```astro
// src/pages/[lang]/posts/[...slug].astro

// GOOD: getStaticPaths로 빌드 시 경로 생성
export async function getStaticPaths() {
  const posts = await getCollection("posts", isPublished);
  
  return posts.map((post) => ({
    params: { lang: post.data.lang, slug: getPostSlug(post) },
    props: { post },  // props로 데이터 전달 (재페칭 방지)
  }));
}

// BAD: getStaticPaths에서 props 미전달
export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { lang: post.data.lang, slug: getPostSlug(post) },
    // props 없음 → 페이지에서 다시 getCollection 호출 필요
  }));
}
```

## 이미지 최적화

```astro
// GOOD: astro:assets 사용
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.png';
---
<Image src={heroImage} alt="Hero" width={800} />

// ACCEPTABLE: 외부 이미지 (최적화 제한적)
<Image src="https://example.com/image.jpg" alt="External" width={800} height={600} />

// BAD: 최적화 없는 img 태그
<img src="/images/hero.png" alt="Hero" />  // 크기 지정 없음, 포맷 최적화 없음
```
