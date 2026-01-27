# 단일 책임 원칙 (SRP)

## 정의

> "모듈은 오직 하나의 액터(actor)에 대해서만 책임져야 한다" - Robert C. Martin

**실용적 해석**: 변경의 이유가 하나여야 한다.

## 측정 가능한 SRP 기준

| 항목      | 단일 책임 신호      | 복합 책임 신호           |
| --------- | ------------------- | ------------------------ |
| 함수명    | 동사 하나           | "And", "Or", "With" 포함 |
| 매개변수  | 4개 이하            | 5개 이상                 |
| 반환 타입 | 단일 타입           | Union 타입 (맥락에 따라) |
| 변경 빈도 | 한 가지 이유로 변경 | 여러 이유로 변경         |

## Astro 컨텍스트에서의 SRP

### 유틸리티 함수

```typescript
// GOOD: 단일 책임
// src/utils/posts/url.ts - "URL 생성"
// src/utils/posts/query.ts - "데이터 쿼리"
// src/utils/posts/sort.ts - "정렬"

// BAD: 복합 책임 (and 테스트)
function getAndSortPosts(lang) { ... }       // "가져오기" AND "정렬"
function fetchAndTransformData() { ... }     // "페칭" AND "변환"
function validateAndSaveUser() { ... }       // "검증" AND "저장"

// GOOD: 분리
const posts = await getPosts(lang);
const sorted = sortPosts(posts);
```

### 함수 시그니처

→ [Options Object 패턴](options-object.md) 참조

### 예외: 함수 합성 (Function Composition)

함수 합성은 SRP 위반이 **아닙니다**. 각 함수가 단일 책임을 가지면, 이를 조합하는
것은 허용됩니다.

```typescript
// GOOD: 함수 합성 - 각 함수는 단일 책임, 합성 함수는 "조율(orchestration)"
const getPublishedPostsByLang = (lang: Locale) =>
  pipe(
    getPosts, // 책임: 데이터 가져오기
    filterPublished, // 책임: 필터링
    filterByLang(lang), // 책임: 언어 필터링
    sortByDate // 책임: 정렬
  );

// GOOD: 메서드 체이닝 - 동일한 원리
const result = posts
  .filter(isPublished)
  .filter((p) => p.data.lang === lang)
  .sort(byDate);

// GOOD: 합성 함수의 이름이 "무엇을 하는가"를 명확히 설명
function getPostsForDisplay(lang: Locale) {
  const posts = await getPosts();
  const filtered = filterPublished(posts);
  const localized = filterByLang(filtered, lang);
  return sortByDate(localized);
}
// → "And"가 없고, 단일 목적(표시용 포스트 가져오기)을 가짐
```

**핵심 구분:** | 패턴 | SRP 위반? | 이유 | |------|-----------|------| |
`getAndSortPosts()` | YES | 내부에서 두 책임을 직접 구현 | | `pipe(get, sort)` |
NO | 단일 책임 함수들의 조합 | | `posts.filter().sort()` | NO | 메서드 체이닝
(조합) | | `getPostsForDisplay()` | NO | 단일 목적, 내부는 조합 |

### Astro 컴포넌트 책임 스펙트럼

```
표현 컴포넌트 ◀━━━━━━━━━━━━━━━━━━━━━▶ 컨테이너 컴포넌트
(Presentational)                    (Container)

PostNavigation.astro                SeriesListView.astro
- Props → 렌더링                    - 데이터 페칭
- 로직 없음                         - 변환/그룹화
- 재사용 용이                       - 렌더링
                                    - 페이지 수준에서 허용

Bio.astro                           [경계 초과] GodComponent.astro
- 설정 읽기 + 렌더링                - 인증 체크
- 단순해서 허용                     - 3개 컬렉션 페칭
                                    - 복잡한 비즈니스 로직
                                    - 에러 처리
                                    - 렌더링
                                    → 분리 필요
```

### 레이아웃 책임

```astro
// GOOD: BaseLayout.astro의 단일 책임 = "페이지 쉘 제공" // 세부 구성요소: // -
HTML 구조 정의 // - 메타 태그 설정 // - 공통 스크립트 포함 // 모두 "페이지
쉘"이라는 하나의 목적에 기여 // GOOD: PostLayout.astro의 단일 책임 = "포스트
페이지 구조 제공" // - 포스트 헤더 // - TOC // - 본문 슬롯 // - 네비게이션 // -
댓글 // 모두 "포스트 페이지"라는 하나의 목적에 기여
```

## SRP 체크리스트

**함수:**

- [ ] 함수를 "그리고(and)" 없이 한 문장으로 설명할 수 있는가?
- [ ] 매개변수가 5개 미만인가?
- [ ] 함수가 하나의 추상화 수준에서 동작하는가?

**컴포넌트:**

- [ ] 변경 이유가 하나인가?
- [ ] 프론트매터가 80줄 미만인가?
- [ ] 데이터 페칭이 3회 이하인가?
