# Astro Blog Kit

Astro 5로 구축된 모던하고 기능이 풍부한 블로그 템플릿입니다. i18n 지원, 다크
모드, 코드 하이라이팅, 수학 수식 렌더링 등을 포함합니다.

**[라이브 데모](https://astro-blog-kit.p-iknow-dev.workers.dev/)**

## 기능

- **Astro 5** - 빠르고 현대적인 정적 사이트 생성기
- **Tailwind CSS v4** - 유틸리티 우선 CSS 프레임워크
- **i18n 지원** - 영어/한국어 기본 지원, 쉬운 확장
- **다크 모드** - 시스템 설정 감지 및 수동 전환
- **코드 하이라이팅** - 줄 번호와 diff 지원이 포함된 Expressive Code
- **수학 수식 렌더링** - LaTeX 수식을 위한 KaTeX
- **콜아웃** - GitHub/Obsidian 스타일 콜아웃 블록
- **댓글** - Giscus 연동 (GitHub Discussions)
- **SEO** - Open Graph, Twitter Cards, 사이트맵, RSS
- **검색** - 내장 검색 페이지
- **시리즈** - 관련 포스트를 시리즈로 그룹화

## 빠른 시작

> **포크하지 마세요** - 이것은 템플릿 저장소입니다.
> **[Use this template](https://github.com/practical-stack/astro-blog-kit/generate)**
> 버튼을 대신 사용하세요.

1. **[Use this template](https://github.com/practical-stack/astro-blog-kit/generate)**
   클릭 → **Create a new repository**
2. 저장소 이름 지정 (예: `my-blog`)
3. 새로 생성된 저장소 클론:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-blog.git
   cd my-blog
   ```
4. 의존성 설치 및 실행:
   ```bash
   pnpm install
   pnpm dev
   ```

http://localhost:3000 에서 확인

---

## 콘텐츠 구조

이 블로그는 Astro Content Collections로 구성된 **세 가지 유형의 콘텐츠**를
지원합니다:

### 개요

| 컬렉션        | 위치                  | 용도                  | URL 패턴                            |
| ------------- | --------------------- | --------------------- | ----------------------------------- |
| `posts`       | `src/content/posts/`  | 독립 블로그 포스트    | `/{lang}/posts/{category}/{slug}`   |
| `series`      | `src/content/series/` | 시리즈 메타데이터     | `/{lang}/series/{series-slug}`      |
| `seriesPosts` | `src/content/series/` | 시리즈 내 개별 포스트 | `/{lang}/series/{series-slug}/{id}` |

### 1. 일반 포스트 (`posts`)

카테고리별로 정리된 독립 블로그 포스트입니다.

**위치**: `src/content/posts/{category}/`

```
src/content/posts/
├── getting-started/
│   ├── welcome.en.md        # 영어 버전
│   └── welcome.ko.md        # 한국어 버전
├── tutorials/
│   ├── react-basics.en.md
│   └── react-basics.ko.md
└── javascript/
    └── async-await.en.md    # 단일 언어도 가능
```

**Frontmatter (필수 항목은 \*로 표시)**:

```yaml
---
title: "첫 번째 포스트" # * 포스트 제목
description: "간단한 요약" # * SEO 및 미리보기용
date: 2024-01-01 # * 게시 날짜
slug: my-first-post # * URL 슬러그 (케밥 케이스, 영어)
lang: ko # 언어 (파일명에서 자동 감지)
category: tutorials # 카테고리명
tags: ["astro", "blog"] # 태그 배열
draft: false # true일 때 모든 곳에서 숨김
dev-only: false # true일 때 프로덕션에서 숨김
img: /path/to/image.webp # 대표 이미지 (선택)
update: 2024-02-01 # 마지막 수정일 (선택)
---
```

**URL 생성**: `/{lang}/posts/{folder-path}/{slug}`

- 예시: `src/content/posts/tutorials/intro.en.md`에서 `slug: getting-started`
- → URL: `/en/posts/tutorials/getting-started`

### 2. 시리즈

시리즈는 책의 챕터처럼 관련 포스트들의 모음입니다.

**구조**:

```
src/content/series/
└── markdown-guide/              # 시리즈 폴더
    ├── _index.en.md             # * 시리즈 메타데이터 (영어)
    ├── _index.ko.md             # * 시리즈 메타데이터 (한국어)
    ├── 01-style-guide.en.md     # 챕터 1
    ├── 01-style-guide.ko.md
    ├── 02-code-blocks.en.md     # 챕터 2
    ├── 02-code-blocks.ko.md
    └── 03-advanced.en.md        # 챕터 3
```

#### 시리즈 메타데이터 (`_index*.md`)

각 시리즈에 **필수**입니다. 언어별로 하나씩 필요합니다.

```yaml
---
title: "마크다운 가이드" # * 시리즈 제목
description: "블로그를 위한 마크다운 마스터하기" # * 시리즈 설명
slug: markdown-guide # 시리즈 URL 슬러그
lang: ko # * 언어
---
선택적 소개 내용...
```

#### 시리즈 포스트

시리즈 내의 개별 챕터/포스트입니다.

```yaml
---
title: "스타일 가이드" # * 챕터 제목
description: "기본 마크다운 스타일링" # * 챕터 설명
date: 2024-01-01 # * 게시 날짜
series: markdown-guide # * 시리즈 슬러그와 일치해야 함
part: 1 # 시리즈 내 순서 (또는 파일명 접두사 사용)
lang: ko # * 언어
category: guide # 카테고리 (선택)
tags: ["markdown"] # 태그 (선택)
draft: false # true일 때 숨김
dev-only: false # true일 때 프로덕션에서 숨김
---
```

**순서 지정**: frontmatter의 `part: N` 또는 `NN-` 파일명 접두사 사용 (예: `01-`,
`02-`).

**URL 생성**: `/{lang}/series/{series-slug}/{file-id}`

- 예시: `markdown-guide/` 폴더의 `01-style-guide.en.md`
- → URL: `/en/series/markdown-guide/01-style-guide`

---

## 국제화 (i18n)

이 블로그는 **이중 언어 콘텐츠** (영어와 한국어)를 기본 지원합니다.

### 지원 언어

| 언어   | 코드 | 로케일  |
| ------ | ---- | ------- |
| 영어   | `en` | `en-US` |
| 한국어 | `ko` | `ko-KR` |

### URL 구조

모든 URL은 언어 코드로 시작합니다:

- 영어: `/en/posts/...`, `/en/series/...`
- 한국어: `/ko/posts/...`, `/ko/series/...`

### 파일 명명 규칙

`.md` 앞에 언어 접미사를 사용합니다:

```
# 포스트
welcome.en.md   → 영어 버전
welcome.ko.md   → 한국어 버전

# 시리즈 메타데이터
_index.en.md    → 영어 시리즈 정보
_index.ko.md    → 한국어 시리즈 정보

# 시리즈 포스트
01-intro.en.md  → 영어 챕터
01-intro.ko.md  → 한국어 챕터
```

### 새 언어 추가하기

1. **`src/config/locale.ts` 수정**:

```typescript
export const LOCALES = ["en", "ko", "ja"] as const;

export const LOCALE = {
  en: "en-US",
  ko: "ko-KR",
  ja: "ja-JP", // 새 로케일 추가
} as const;
```

2. **`astro.config.ts` 업데이트**:

```typescript
i18n: {
  locales: ["en", "ko", "ja"],
  defaultLocale: "en",
  routing: {
    prefixDefaultLocale: true,
  },
}
```

3. **`src/config/site.ts`에 번역 추가**:

```typescript
description: {
  en: "English description",
  ko: "한국어 설명",
  ja: "日本語の説明",  // 새 번역 추가
}
```

4. **`.ja.md` 접미사로 콘텐츠 파일 생성**

---

## 댓글 (Giscus)

이 블로그는 GitHub Discussions 기반의 [Giscus](https://giscus.app)를 댓글
시스템으로 사용합니다.

### 빠른 설정

1. **[giscus.app](https://giscus.app)** 에서 설정 마법사 따르기
2. 생성된 값 복사 (`data-repo-id`, `data-category-id` 등)
3. `src/config/site.ts` 업데이트:

```typescript
giscus: {
  repo: "yourusername/your-repo",       // GitHub 저장소
  repoId: "R_kgDOxxxxxx",               // giscus.app에서 획득
  category: "General",                   // Discussion 카테고리명
  categoryId: "DIC_kwDOxxxxxx",         // giscus.app에서 획득
  mapping: "pathname",                   // 포스트와 discussion 매핑 방식
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "1",
  inputPosition: "top",
  lang: "ko",                            // 인터페이스 언어
  loading: "lazy",
}
```

### 참고 자료

- **설정 마법사**: [giscus.app](https://giscus.app)
- **GitHub App**: [github.com/apps/giscus](https://github.com/apps/giscus)
- **문서**: [github.com/giscus/giscus](https://github.com/giscus/giscus#readme)
- **고급 설정**: [giscus.app/ko](https://giscus.app/ko) (한국어)

### 댓글 비활성화

`src/config/site.ts`에서 `giscus` 섹션을 제거하거나 주석 처리합니다.

---

## 개인 설정 가이드

블로그를 본인 용도에 맞게 커스터마이즈하려면 다음 단계를 따르세요.

### 1단계: 사이트 설정

`src/config/site.ts` 수정:

```typescript
export const siteConfig = {
  // 기본 정보
  title: "내 블로그 이름",
  subtitle: "나의 태그라인",
  description: {
    en: "Your English site description for SEO",
    ko: "한국어 사이트 설명",
  },
  author: "내 이름",
  siteUrl: "https://yourdomain.com", // 슬래시 없이
  ogImage: "/og-image.png",

  // 소셜 링크 (필요 없는 것은 제거)
  links: {
    github: "https://github.com/yourusername",
    x: "https://x.com/yourusername",
    linkedIn: "https://linkedin.com/in/yourusername",
    email: "mailto:you@example.com",
  },

  // 댓글 (Giscus) - 설정은 https://giscus.app 참고
  giscus: {
    repo: "yourusername/your-repo",
    repoId: "YOUR_REPO_ID", // giscus.app에서 획득
    category: "General",
    categoryId: "YOUR_CATEGORY_ID", // giscus.app에서 획득
    mapping: "pathname",
    // ... 기타 옵션
  },

  // 분석
  googleAnalyticsId: "G-XXXXXXXXXX", // 비활성화하려면 ""로 설정
};
```

### 2단계: Astro 설정

`astro.config.ts` 업데이트:

```typescript
export default defineConfig({
  site: "https://yourdomain.com", // 위의 siteUrl과 일치
  // ...
});
```

### 3단계: 에셋 교체

`public/` 폴더의 파일 교체:

| 파일           | 용도                  | 권장 크기  |
| -------------- | --------------------- | ---------- |
| `logo.svg`     | 헤더 로고             | 44x44px    |
| `favicon.png`  | 브라우저 탭 아이콘    | 32x32px    |
| `og-image.png` | 기본 소셜 공유 이미지 | 1200x630px |
| `profile.webp` | 저자 프로필 사진      | 128x128px  |

### 4단계: 샘플 콘텐츠 삭제

```bash
# 샘플 포스트 삭제
rm -rf src/content/posts/getting-started/

# 샘플 시리즈 삭제
rm -rf src/content/series/markdown-guide/
```

### 5단계: 첫 번째 포스트 작성

```bash
mkdir -p src/content/posts/blog
```

`src/content/posts/blog/hello-world.ko.md` 생성:

```yaml
---
title: "안녕하세요"
description: "첫 번째 블로그 포스트"
date: 2024-01-01
slug: hello-world
lang: ko
category: blog
tags: ["소개"]
---
내 블로그에 오신 것을 환영합니다!
```

### 6단계: 첫 번째 시리즈 만들기 (선택)

```bash
mkdir -p src/content/series/my-tutorial
```

**1. 시리즈 메타데이터 생성** (`src/content/series/my-tutorial/_index.ko.md`):

```yaml
---
title: "내 튜토리얼 시리즈"
description: "단계별로 멋진 것 배우기"
slug: my-tutorial
lang: ko
---
이 튜토리얼 시리즈에 오신 것을 환영합니다!
```

**2. 시리즈 포스트 생성**
(`src/content/series/my-tutorial/01-introduction.ko.md`):

```yaml
---
title: "소개"
description: "기본 사항 시작하기"
date: 2024-01-01
series: my-tutorial
part: 1
lang: ko
tags: ["튜토리얼"]
---
여정을 시작합시다...
```

**3. 더 많은 챕터 추가** - `part` 번호를 증가시키거나 `NN-` 파일명 접두사를
사용합니다.

### 7단계: 댓글 설정 (선택)

자세한 설정 방법은 위의 [댓글 (Giscus)](#댓글-giscus) 섹션을 참고하세요.

### 설정 체크리스트

- [ ] `src/config/site.ts`에 내 정보 업데이트
- [ ] `astro.config.ts` 사이트 URL 업데이트
- [ ] `public/logo.svg` 교체
- [ ] `public/favicon.png` 교체
- [ ] `public/og-image.png` 교체
- [ ] `public/profile.webp` 교체
- [ ] 댓글용 Giscus 설정 (선택)
- [ ] Google Analytics ID 추가 (선택)
- [ ] 샘플 콘텐츠 삭제
- [ ] 첫 번째 포스트 작성

---

## 명령어

| 명령어            | 설명                                     |
| ----------------- | ---------------------------------------- |
| `pnpm dev`        | http://localhost:3000에서 개발 서버 시작 |
| `pnpm build`      | 프로덕션 빌드                            |
| `pnpm preview`    | 프로덕션 빌드 미리보기                   |
| `pnpm type-check` | TypeScript 타입 검사 실행                |
| `pnpm format`     | Prettier로 코드 포맷팅                   |
| `pnpm lint`       | ESLint로 코드 린트                       |

---

## 프로젝트 구조

```
├── src/
│   ├── config/
│   │   ├── site.ts          # 사이트 설정 (여기 수정)
│   │   └── locale.ts        # i18n 설정
│   ├── content/
│   │   ├── posts/           # 일반 블로그 포스트
│   │   │   └── {category}/  # 카테고리별 포스트 정리
│   │   └── series/          # 시리즈 콘텐츠
│   │       └── {series}/    # 각 시리즈별 폴더
│   │           ├── _index.en.md   # 시리즈 메타데이터
│   │           └── 01-post.en.md  # 시리즈 포스트
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── post/            # 포스트 관련 컴포넌트
│   │   ├── series/          # 시리즈 컴포넌트
│   │   └── shared/          # Bio, Comments, ThemeToggle
│   ├── layouts/             # 페이지 레이아웃
│   ├── pages/[lang]/        # 라우트 (i18n 접두사)
│   ├── styles/              # 글로벌 CSS & 모듈
│   └── utils/               # 유틸리티 함수
├── public/                  # 정적 에셋 (여기 교체)
├── astro.config.ts          # Astro 설정
└── package.json
```

---

## 마크다운 기능

### 코드 블록

제목과 줄 하이라이팅:

````markdown
```typescript title="example.ts" {2-3}
const a = 1;
const b = 2; // 하이라이트
const c = 3; // 하이라이트
```
````

diff 표기법:

````markdown
```typescript
const old = "removed";  // [!code --]
const new = "added";    // [!code ++]
```
````

### 콜아웃

Obsidian 스타일 콜아웃:

```markdown
> [!NOTE] 중요한 노트 하이라이트된 정보입니다.

> [!TIP] 프로 팁 유용한 제안입니다.

> [!WARNING] 주의하세요 조심해야 할 사항입니다.

> [!CAUTION] 위험 중요한 경고입니다.
```

### 수학 (KaTeX)

인라인: `$E = mc^2$`

블록:

```markdown
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

---

## 커스터마이징

### 스타일링

- **글로벌 스타일**: `src/styles/global.css`
- **테마 색상**: `src/styles/modules/theme.css`
- **타이포그래피**: `src/styles/modules/prose.css`
- **콜아웃**: `src/styles/modules/callouts.css`

### 코드 하이라이팅

테마는 `astro.config.ts`에서 설정됩니다:

```typescript
astroExpressiveCode({
  themes: ["dracula-soft", "night-owl"], // [light, dark]
  // ...
});
```

---

## 배포

이것은 정적 Astro 사이트입니다. 모든 정적 호스팅 제공자에 배포할 수 있습니다.

```bash
# 빌드 명령어
pnpm build

# 출력 디렉토리
dist
```

플랫폼별 가이드 (Vercel, Netlify, Cloudflare, AWS 등)는
[Astro 배포 문서](https://docs.astro.build/en/guides/deploy/)를 참고하세요.

---

## 라이선스

MIT
