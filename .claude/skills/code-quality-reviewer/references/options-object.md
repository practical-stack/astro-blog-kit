# Options Object 패턴

## 원칙

옵션은 **두 번째 인자로 객체 형태**로 전달합니다.

## 이유

1. **명시성**: 호출부에서 인자의 의미가 보임
2. **확장성**: 새 옵션 추가 시 breaking change 없음

## 예시

```typescript
// BAD: 위치 기반 인자 - 호출부에서 의미 불명확
function getPosts(lang, limit, includesDraft, sortOrder) { ... }
getPosts("ko", 10, true, "desc");  // 10이 뭐지? true가 뭐지?

// BAD: 새 옵션 추가 시 breaking change
function getPosts(lang, limit, includesDraft, sortOrder, newOption) { ... }
// → 모든 호출부 수정 필요

// GOOD: Options Object 패턴
interface GetPostsOptions {
  limit?: number;
  includeDraft?: boolean;
  sortOrder?: "asc" | "desc";
}

function getPosts(lang: Locale, options: GetPostsOptions = {}) {
  const { limit = 10, includeDraft = false, sortOrder = "desc" } = options;
  // ...
}

// 호출부 - 명시적
getPosts("ko", { limit: 10, includeDraft: true, sortOrder: "desc" });
getPosts("en", { limit: 5 });  // 나머지는 기본값
getPosts("ko");               // 모두 기본값

// GOOD: 새 옵션 추가 - breaking change 없음
interface GetPostsOptions {
  limit?: number;
  includeDraft?: boolean;
  sortOrder?: "asc" | "desc";
  category?: string;  // 새 옵션 추가 → 기존 호출부 영향 없음
}
```

## 규칙

| 상황                        | 권장 패턴                        |
| --------------------------- | -------------------------------- |
| 필수 인자 1개               | `fn(required)`                   |
| 필수 인자 1개 + 옵션들      | `fn(required, { options })`      |
| 필수 인자 2개 이상          | `fn({ req1, req2 })`             |
| 필수 인자 2개 이상 + 옵션들 | `fn({ req1, req2, ...options })` |

```typescript
// BAD: 필수 인자 2개를 위치 기반으로
function createPost(title, lang, options?) { ... }
createPost("Hello", "ko", { draft: true });  // title과 lang 순서 헷갈림

// GOOD: 필수 인자 2개 이상이면 첫 인자부터 객체로
interface CreatePostParams {
  title: string;
  lang: Locale;
  draft?: boolean;
}

function createPost({ title, lang, draft = false }: CreatePostParams) { ... }
createPost({ title: "Hello", lang: "ko", draft: true });  // 명시적
createPost({ title: "Hi", lang: "en" });  // 옵션 생략 가능
```

## 체크리스트

- [ ] 필수 인자가 2개 이상인가? → 첫 인자부터 객체로
- [ ] boolean 인자가 있는가? → 의미가 호출부에서 보이지 않음, 객체 필수
- [ ] 향후 인자 추가 가능성이 있는가? → 객체로 미리 설계
