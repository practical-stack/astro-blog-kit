# 응집도 vs 중복: 트레이드오프

## 핵심 긴장 관계

| 극단            | 결과                                                |
| --------------- | --------------------------------------------------- |
| **DRY 맹신**    | 응집도 파괴. `utils/shared.ts`에 무관한 함수들 모임 |
| **응집도 맹신** | 중복 폭발. 각 모듈이 동일한 로직을 각자 구현        |

> **균형점**: 응집도를 우선하되, **지식의 중복**만 제거한다.

## 의사결정 프레임워크

```
중복 코드 발견
    │
    ├─ 추출하면 어디에 놓을 것인가?
    │   │
    │   ├─ 기존 응집된 모듈에 자연스럽게 들어감
    │   │   └─ ✅ 추출 OK
    │   │
    │   ├─ 새 모듈을 만들어야 함
    │   │   ├─ 새 모듈이 명확한 단일 책임을 가짐
    │   │   │   └─ ✅ 추출 OK (예: date.ts, lang.ts)
    │   │   │
    │   │   └─ 새 모듈이 "공통", "헬퍼", "유틸" 같은 모호한 이름
    │   │       └─ ⚠️ 응집도 경고 - 중복 허용 고려
    │   │
    │   └─ 기존 모듈에 억지로 넣어야 함 (맞지 않는 느낌)
    │       └─ ❌ 중복 허용이 나음
    │
    └─ 추출 후 import 의존성이 어떻게 되는가?
        │
        ├─ 단방향 (A → shared, B → shared)
        │   └─ ✅ 건강한 의존성
        │
        └─ 순환 또는 깊은 의존성 발생
            └─ ❌ 중복 허용이 나음
```

## 구체적 시나리오

### 시나리오 1: 추출해야 하는 경우

```typescript
// posts/query.ts
const slug = id.replace(/\.(ko|en)$/, "");

// series/query.ts
const slug = id.replace(/\.(ko|en)$/, "");

// 분석:
// - 같은 비즈니스 규칙 (언어 코드 제거)
// - 하나 변경 시 다른 것도 변경 필수
// - "lang.ts"라는 명확한 모듈에 자연스럽게 들어감

// ✅ 추출
// lang.ts
export const stripLangFromId = (id: string) => id.replace(/\.(ko|en)$/, "");
```

### 시나리오 2: 중복 허용이 나은 경우

```typescript
// posts/PostList.astro
const isEmpty = posts.length === 0;
{isEmpty && <p>포스트가 없습니다.</p>}

// series/SeriesListView.astro
const isEmpty = items.length === 0;
{isEmpty && <p>시리즈가 없습니다.</p>}

// 분석:
// - 유사하지만 다른 도메인 (posts vs series)
// - 메시지가 다름 → 독립적으로 변경될 수 있음
// - 추출하면? → "isEmpty(arr)" 같은 trivial 함수, 또는 "공통 EmptyState 컴포넌트"
//   → 과도한 추상화, 응집도 저하

// ✅ 중복 허용
```

### 시나리오 3: 경계 케이스

```typescript
// posts/query.ts
export function filterByLang<T extends { data: { lang: string } }>(
  items: T[],
  lang: string
): T[] {
  return items.filter((item) => item.data.lang === lang);
}

// series/query.ts
export function filterByLang<T extends { data: { lang: string } }>(
  items: T[],
  lang: string
): T[] {
  return items.filter((item) => item.data.lang === lang);
}

// 분석:
// - 완전히 동일한 로직
// - 하지만 posts와 series가 다르게 발전할 수 있음
//   (예: series는 lang이 없는 항목 허용, posts는 아님)

// 판단 기준:
// - 현재 4회 이상 반복? → 추출
// - 2~3회? → 일단 중복 허용, 추후 평가
// - 다른 필터 조건이 추가될 가능성? → 각자 유지

// ⚠️ 맥락에 따라 판단
```

## 안티패턴: 응집도를 파괴하는 추출

```typescript
// ❌ BAD: "공통"이라는 이유로 만든 파일
// utils/common.ts
export const isEmpty = (arr: any[]) => arr.length === 0;
export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
export const formatDate = (d: Date) => d.toISOString().split("T")[0];
export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
export const debounce = (fn: Function, ms: number) => { ... };

// 문제:
// 1. 우연적 응집 - 서로 무관한 함수들
// 2. 파일명으로 내용 예측 불가
// 3. 시간이 지나면 "아무거나 넣는 파일"이 됨

// ✅ GOOD: 도메인별 분리
// utils/date.ts     → formatDate
// utils/lang.ts     → slugify (언어/텍스트 관련이면)
// utils/string.ts   → capitalize, slugify (문자열 처리면)
// utils/array.ts    → isEmpty (정말 필요하다면)
// utils/timing.ts   → debounce
```

## 체크리스트

**추출 전 확인:**

- [ ] 추출된 코드가 들어갈 응집된 모듈이 있는가?
- [ ] 새 모듈을 만든다면, 명확한 단일 책임이 있는가?
- [ ] "common", "shared", "helpers", "misc" 같은 이름이 떠오르는가? → 경고 신호
- [ ] 추출 후 순환 의존성이 생기지 않는가?

**중복 허용 시 확인:**

- [ ] 각 인스턴스가 독립적으로 변경될 가능성이 있는가?
- [ ] 중복이 4회 미만인가?
- [ ] 추출 비용(새 모듈, import 추가) > 중복 비용인가?
