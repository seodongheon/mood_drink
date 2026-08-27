# 🧠 Sprint 2: AI 추천 엔진 & 프롬프트/타임아웃 파이프라인

## 📌 1. 스프린트 개요
- **목표**: PRD 요구 조건(주종 1개, 안주 1개, 공감 멘트 1~2문장)을 강제하는 프롬프트 엔지니어링 및 3초 타임아웃/Fallback 파이프라인 구축
- **기간 (예정)**: Day 2 ~ Day 3
- **담당 영역**: AI / LLM Integration, Resilience Layer

---

## 🎯 2. 세부 과업 (Tasks)

- [x] **Task 2.1: 프롬프트 엔지니어링 및 Structured JSON Output 구성**
  - 시스템 프롬프트 작성: 사용자 입력 상황에 맞는 맞춤 주종 1개, 안주 1개, 따뜻한 공감 멘트(1~2문장) 필수 반환 강제
  - LLM 응답을 Zod 스키마로 검증 및 파싱
- [x] **Task 2.2: 3초 타임아웃(Timeout Controller) 구현**
  - `AbortController`를 활용하여 3,000ms 초과 시 LLM API 호출 강제 중단 로직 구현
- [x] **Task 2.3: Fail-safe 기본 추천값(Fallback Engine) 구축**
  - 타임아웃, AI 5xx 오류, 파싱 에러 발생 시 즉시 반환할 기본 추천 데이터셋 구현
  - 기본값 메시지: *"AI가 너무 깊게 고민하네요! 오늘은 무조건 시원한 맥주와 치킨을 추천합니다."*

---

## 📦 3. 주요 산출물 (Deliverables)
1. `lib/ai.ts` (LLM 호출 및 프롬프트 관리자)
2. `lib/fallback.ts` (상황별/기본 Fallback 데이터 모듈)
3. `app/api/recommend/route.ts` (AI 호출 및 타임아웃 파이프라인 통합)

---

## ✅ 4. 완료 기준 (Definition of Done)
- [x] AI 응답이 정확히 `comfort`(1~2문장), `drink`(1개), `snack`(1개) 포맷으로 반환된다.
- [x] 3초 초과 지연 시 에러 크래시 없이 즉시 Fallback 추천 결과가 반환된다.
