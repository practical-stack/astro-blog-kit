---
name: code-quality-reviewer
description: |
  Astro Blog Kit 코드 품질 리뷰어. 응집도, 중복, 단일책임원칙, 컨텍스트 주석, Astro 특화 패턴 평가.

  USE WHEN:
  - "코드 리뷰", "code review", "품질 검토"
  - "응집도 분석", "cohesion analysis"
  - "중복 검사", "duplication check"
  - "SRP 검토", "single responsibility"
  - Astro 컴포넌트/유틸리티 품질 평가
  - PR 리뷰, 코드 개선 제안

  DO NOT USE WHEN:
  - 새 기능 구현 (직접 코딩 작업)
  - 버그 수정 (디버깅)
  - 테스트 작성 (test-master 스킬 사용)
---

# Code Quality Review Skill

Astro Blog Kit 프로젝트의 코드 품질을 평가하고 개선점을 제안합니다.

---

## Quick Reference (리뷰 시 먼저 확인)

### 즉시 체크할 5가지

```bash
# 1. 타입 안전성 위반
rg "as any|@ts-ignore|@ts-expect-error" src/

# 2. 하드코딩된 언어 경로
rg '"/en/|"/ko/|href="/en|href="/ko' src/

# 3. Props 타입 없는 컴포넌트
rg -l "Astro\.props" src/components/ | xargs -I {} sh -c 'grep -L "interface Props" {}'

# 4. z.any() 사용
rg "z\.any\(\)|z\.unknown\(\)" src/

# 5. 직접 이벤트 바인딩 (View Transitions 비호환)
rg "querySelector.*addEventListener" src/
```

### 정량적 임계값 (보수적 기준)

| 항목                      | 주의  | 경고  | 위험             |
| ------------------------- | ----- | ----- | ---------------- |
| 컴포넌트 프론트매터 줄 수 | 60줄  | 80줄  | 100줄+           |
| 한 파일의 export 개수     | 6개   | 8개   | 10개+            |
| 함수 매개변수 개수        | 4개   | 5개   | 6개+             |
| 중첩 깊이 (if/for)        | 3단계 | 4단계 | 5단계+           |
| 동일 패턴 반복 횟수       | 2회   | 3회   | 4회+ (추출 필수) |
| 컴포넌트 Props 개수       | 6개   | 8개   | 10개+            |
| 인라인 스타일 속성 수     | 2개   | 3개   | 4개+             |

> **보수적 기준 원칙**: 위 수치는 "이 이상이면 무조건 문제"가 아니라 "검토가
> 필요한 신호"입니다. 맥락에 따라 정당화될 수 있습니다.

### 심각도 기준

| 심각도       | 항목                                                  | 조치           |
| ------------ | ----------------------------------------------------- | -------------- |
| **CRITICAL** | `as any`, `@ts-ignore`, Props 타입 없음               | PR 차단        |
| **HIGH**     | 하드코딩 `/en/`, `/ko/`, `z.any()`, 100줄+ 프론트매터 | 수정 요청      |
| **MEDIUM**   | 4회+ 반복 패턴, "무엇" 설명 주석                      | 추출/제거 권장 |
| **LOW**      | 인라인 스타일 4개+, 전역 스타일 과다                  | 개선 제안      |

---

## 상세 가이드라인 (References)

각 주제에 대한 상세한 기준과 예시는 아래 참조 문서를 확인하세요.

| 주제                | 파일                                                | 핵심 내용                                      |
| ------------------- | --------------------------------------------------- | ---------------------------------------------- |
| **응집도**          | [cohesion.md](references/cohesion.md)               | 7가지 응집도 유형, 측정 기준, 체크리스트       |
| **중복**            | [duplication.md](references/duplication.md)         | DRY 올바른 이해, 의사결정 트리, 허용/추출 기준 |
| **응집도 vs 중복**  | [tradeoffs.md](references/tradeoffs.md)             | 트레이드오프 의사결정 프레임워크, 경계 케이스  |
| **단일 책임 (SRP)** | [srp.md](references/srp.md)                         | 측정 기준, 함수 합성 예외, 컴포넌트 스펙트럼   |
| **Options Object**  | [options-object.md](references/options-object.md)   | 함수 시그니처 패턴, 명시성과 확장성            |
| **주석**            | [comments.md](references/comments.md)               | "왜" vs "무엇", 좋은/나쁜 주석 유형            |
| **Astro 패턴**      | [astro-patterns.md](references/astro-patterns.md)   | Props, 스타일, i18n, View Transitions, 이미지  |
| **리뷰 워크플로우** | [review-workflow.md](references/review-workflow.md) | PR 리뷰 절차, 안티패턴 탐지, 코멘트 템플릿     |

---

## 사용 예시

### 단일 파일 리뷰

```
src/components/post/NewComponent.astro 파일을 리뷰해주세요.
```

### 디렉토리 응집도 분석

```
src/utils/ 디렉토리의 응집도와 SRP 준수 여부를 분석해주세요.
```

### PR 전체 리뷰

```
이번 PR의 변경사항을 코드 품질 관점에서 리뷰해주세요.
Quick Reference의 grep 명령어로 먼저 자동 검사 후,
심각도 테이블 기준으로 피드백 부탁드립니다.
```

---

## 워크플로우

```
1. Quick Reference grep 실행 (30초)
   ↓
2. 임계값 테이블로 정량 체크
   ↓
3. 심각도 기준으로 분류
   ↓
4. 필요 시 상세 가이드라인(references/) 참조
   ↓
5. 리뷰 코멘트 템플릿으로 피드백 정리
```
