---
title: "블로그에 오신 것을 환영합니다"
description: "Astro 블로그 템플릿 시작하기"
date: 2024-01-01
slug: welcome
lang: ko
category: getting-started
tags: ["astro", "blog", "template"]
---

새로운 Astro 블로그에 오신 것을 환영합니다! 이 템플릿에는 블로그를 시작하는 데
필요한 모든 것이 포함되어 있습니다.

## 기능

이 템플릿에는 다음이 포함됩니다:

- **다국어 지원** - 여러 언어로 포스트 작성
- **다크 모드** - 자동 테마 전환
- **코드 하이라이팅** - 아름다운 문법 강조
- **시리즈** - 연관된 포스트를 시리즈로 묶어 관리
- **댓글 (Giscus)** - GitHub Discussions 기반 댓글 시스템

## 코드 예시

간단한 TypeScript 예시입니다:

```typescript title="hello.ts"
const greeting = (name: string): string => {
  return `안녕하세요, ${name}님!`;
};

console.log(greeting("세계"));
```

## 수학 지원

KaTeX를 사용하여 수학 공식을 작성할 수 있습니다:

인라인 수식: $E = mc^2$

블록 수식:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## 콜아웃

> [!NOTE] 이것은 노트 콜아웃입니다. 중요한 정보를 강조할 때 사용하세요.

> [!TIP] 이것은 팁 콜아웃입니다. 유용한 조언을 공유할 때 좋습니다.

> [!WARNING] 이것은 경고 콜아웃입니다. 주의 사항에 사용하세요.

## 시리즈

연관된 포스트를 시리즈로 묶어 책의 챕터처럼 구성할 수 있습니다.

```
src/content/series/
└── my-series/
    ├── _index.ko.md        # 시리즈 메타데이터
    ├── 01-intro.ko.md      # 챕터 1
    └── 02-deep-dive.ko.md  # 챕터 2
```

시리즈 포스트의 frontmatter에 `series` 필드를 추가하세요:

```yaml
---
title: "챕터 제목"
series: my-series # 시리즈 슬러그와 일치해야 함
part: 1 # 순서 (또는 파일명 접두사 01- 사용)
---
```

## 댓글 (Giscus)

이 템플릿은 [Giscus](https://giscus.app)를 통해 GitHub Discussions 기반 댓글을
지원합니다.

설정 방법:

1. [giscus.app](https://giscus.app)에서 앱 설정
2. `src/config/site.ts`의 `giscus` 섹션에 값 입력

```typescript
giscus: {
  repo: "yourusername/your-repo",
  repoId: "YOUR_REPO_ID",
  category: "General",
  categoryId: "YOUR_CATEGORY_ID",
  // ...
}
```

## 다음 단계

1. `src/config/site.ts`를 편집하여 사이트를 커스터마이징하세요
2. `public/` 폴더의 플레이스홀더 이미지를 교체하세요
3. 직접 포스트를 작성해보세요!

즐거운 블로깅 되세요!
