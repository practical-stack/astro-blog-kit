# 컨텍스트가 필요한 주석

## 주석의 황금률

> 주석은 **"왜(Why)"**를 설명한다. **"무엇(What)"**은 코드가 설명한다.

## 좋은 주석 유형

### 의도 설명 (Intent) - 결정의 이유

```typescript
// GOOD: 왜 이런 결정을 했는지
// 파일명에서 언어 코드를 제거하여 다국어 콘텐츠가 같은 URL 구조를 갖도록 함
// 예: "post.ko.md" → "post" (ko/en 모두 /posts/post로 접근)
export function stripLangFromId(id: string): string {
  return id.replace(langSuffixPattern, "");
}
```

### 경고 (Warning) - 함정 주의

```typescript
// GOOD: 주의사항 명시
/**
 * @deprecated getPostUrl()로 통합됨. 2025-03 제거 예정.
 * @see getPostUrl
 */
export function getSeriesPostUrl(...) { ... }

// GOOD: 성능 주의
// 주의: O(n²) 복잡도. posts가 1000개 이상이면 캐싱 필요
const related = posts.filter(p => hasCommonTag(p, current));
```

### 복잡한 로직 설명

```typescript
// GOOD: 정규식 설명
// 패턴: {series-slug}/_index.{lang}.md 형식에서 시리즈 slug 추출
// 예: "markdown-guide/_index.ko" → "markdown-guide"
const getSeriesSlug = (id: string) => id.replace(/\/_index.*$/, "");

// GOOD: 알고리즘 설명
// 이진 검색으로 삽입 위치 찾기 (정렬된 배열 유지)
// 선형 검색 대비 O(log n)으로 성능 개선
```

### 외부 의존성 컨텍스트

```typescript
// GOOD: 프레임워크 특성 설명 (Header.astro)
/**
 * Event Delegation 패턴 사용
 *
 * 이유: Astro View Transitions에서 직접 바인딩된 이벤트 리스너는
 * 페이지 전환 시 DOM이 교체되면서 사라짐. document 레벨 위임으로
 * 리스너가 영속됨.
 *
 * @see https://docs.astro.build/en/guides/view-transitions/#lifecycle-events
 */
document.addEventListener('click', (e) => { ... });
```

## 나쁜 주석 유형

### 코드를 반복하는 주석

```typescript
// BAD: 코드가 이미 말하는 것
// 포스트 URL을 반환합니다
function getPostUrl(post) { ... }

// 카운터를 증가시킴
count++;

// GOOD: 주석 삭제하고 명확한 이름 사용
function getPostUrl(post) { ... }
count++;
```

### 너무 추상적인 "왜"

```typescript
// BAD: 구체성 없음
// 성능을 위해
const cache = new Map();

// BAD: 모호함
// 더 나은 사용자 경험을 위해
await prefetch(links);

// GOOD: 구체적인 이유와 효과
// getCollection()이 매 호출마다 파일시스템을 읽어 빌드 시간이 기하급수적 증가
// 캐싱으로 빌드 시간 3분 → 30초 단축 (PR #42 측정 결과)
const cache = new Map();
```

### 변경 로그 (git이 처리)

```typescript
// BAD: git log가 할 일
// 2024-01-15: 버그 수정 (김철수)
// 2024-01-20: 성능 개선 (이영희)

// GOOD: 삭제. git blame/log 사용
```

### 주석 처리된 코드

```typescript
// BAD: 죽은 코드
// const oldImplementation = () => { ... };

// GOOD: 삭제. git history에 있음
```

## 주석 체크리스트

- [ ] 주석 없이 코드만으로 "무엇"을 이해할 수 있는가?
- [ ] 주석이 "왜"를 설명하는가?
- [ ] 변수/함수명 개선으로 주석을 제거할 수 있는가?
- [ ] 6개월 후 다른 개발자가 맥락을 이해할 수 있는가?
- [ ] @deprecated, @see 등 구조화된 주석이 적절히 사용되었는가?
