# 🚀 Sprint 1: 프로젝트 기반 구축 & 데이터 모델링

## 📌 1. 스프린트 개요
- **목표**: 일관된 데이터 구조 정의, 환경 변수 설정 및 백엔드 API 엔드포인트 골격 구축
- **기간 (예정)**: Day 1
- **담당 영역**: Backend, Infrastructure, Types

---

## 🎯 2. 세부 과업 (Tasks)

- [x] **Task 1.1: 환경 변수 및 의존성 패키지 설정**
  - AI API Key 연동을 위한 `.env.local` 및 템플릿 `.env.example` 구성
  - 데이터 유효성 검증을 위한 `zod` 패키지 설치 (`npm install zod`)
- [x] **Task 1.2: 공통 데이터 타입 및 스키마 정의 (`lib/types.ts`, `lib/schema.ts`)**
  - 사용자 입력 모델 (`RecommendationRequest`)
  - AI 추천 응답 모델 (`RecommendationResponse`: `comfort`, `drink`, `snack`, `isFallback`)
  - 에러 응답 모델 (`ApiError`)
  - Zod 기반 입력/출력 런타임 스키마 정의 (`requestSchema`, `recommendationResultSchema`)
- [x] **Task 1.3: Route Handler 골격 생성 (`app/api/recommend/route.ts`)**
  - POST 요청 수신 및 Request Body 파싱
  - 입력값 기본 유효성 검사 (0자/빈칸, 5자 미만, 300자 초과 방어)
  - 키워드 기반 매핑 및 규격화된 JSON 응답 반환 테스트 완료

---

## 📦 3. 주요 산출물 (Deliverables)
1. [`lib/types.ts`](file:///c:/mood-based-drink-recommender/lib/types.ts)
2. [`lib/schema.ts`](file:///c:/mood-based-drink-recommender/lib/schema.ts)
3. [`app/api/recommend/route.ts`](file:///c:/mood-based-drink-recommender/app/api/recommend/route.ts)
4. [`.env.example`](file:///c:/mood-based-drink-recommender/.env.example)
5. [`scripts/test-api.mjs`](file:///c:/mood-based-drink-recommender/scripts/test-api.mjs)

---

## ✅ 4. 완료 기준 (Definition of Done)
- [x] `POST /api/recommend`로 텍스트 전송 시 규격화된 JSON 응답이 반환된다.
- [x] TypeScript 타입 에러 및 린트 에러 없이 프로덕션 빌드(`npm run build`)가 성공한다.
