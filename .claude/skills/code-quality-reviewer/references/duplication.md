# 중복 (Duplication)

## DRY 원칙의 올바른 이해

> **DRY는 "지식(knowledge)의 중복"을 피하는 것이지, "코드의 중복"이 아닙니다.**

## 중복 판단 의사결정 트리

```
코드가 비슷해 보인다
    │
    ├─ 같은 비즈니스 규칙을 표현하는가?
    │   ├─ YES → 하나가 변경되면 다른 것도 변경해야 하는가?
    │   │         ├─ YES → 추출 필요 (지식의 중복)
    │   │         └─ NO  → 허용 (우연한 유사성)
    │   └─ NO  → 허용 (다른 도메인)
    │
    └─ 반복 횟수가 4회 이상인가?
        ├─ YES → 추출 강력 권장
        └─ NO  → 맥락에 따라 판단
```

## 허용되는 중복

```typescript
// 허용: 다른 도메인의 유사한 코드
// 각각 독립적으로 변경될 수 있음

// src/utils/posts/query.ts
export async function getPostsByLang({ lang }) {
  return posts.filter((p) => p.lang === lang);
}

// src/utils/series/query.ts (가상)
export async function getSeriesByLang({ lang }) {
  return series.filter((s) => s.lang === lang);
}
// → posts와 series의 필터링 로직이 다르게 발전할 수 있음
```

```typescript
// 허용: 2~3회 반복되는 단순 패턴
// 추출 비용 > 중복 비용

const formattedDate = format(date, "yyyy-MM-dd"); // 2곳에서 사용
// → 3곳까지는 인라인 허용, 4곳부터 추출
```

## 추출이 필요한 중복

| 조건             | 기준                            | 예시             |
| ---------------- | ------------------------------- | ---------------- |
| 반복 횟수        | 4회 이상                        | 날짜 포맷팅 패턴 |
| 변경 동기화 필수 | 하나 바꾸면 전부 바꿔야 함      | 비즈니스 규칙    |
| 복잡도           | 3줄 이상의 로직                 | 정규식 + 변환    |
| 버그 이력        | 한 곳 수정 후 다른 곳 누락 경험 | -                |

```typescript
// BAD: 4회 이상 반복되는 비즈니스 로직
// file1.ts, file2.ts, file3.ts, file4.ts 모두에서:
const formatted = format(date, "yyyy-MM-dd");

// GOOD: 추출 (이미 src/utils/date.ts에 구현됨)
import { formatDateShort } from "@/utils/date";
```

```typescript
// BAD: 변경 시 동기화 필수인 로직
// PostList.astro
const slug = post.id.replace(/\.ko$|\.en$/, "");
// SeriesListView.astro
const slug = item.id.replace(/\.ko$|\.en$/, "");

// GOOD: 이미 추출됨
import { stripLangFromId } from "@/utils/lang";
```

## 중복 체크리스트

- [ ] 동일 패턴이 4회 이상 반복되는가?
- [ ] 한 곳을 수정하면 다른 곳도 수정해야 하는가?
- [ ] 3줄 이상의 복잡한 로직이 반복되는가?
- [ ] 타입 정의가 2곳 이상에 분산되어 있는가?
