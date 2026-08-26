# 🛡️ Sprint 4: 엔드투엔드 연동 & 예외 처리 방어선 구축

## 📌 1. 스프린트 개요
- **목표**: 프론트엔드와 백엔드 API의 완전한 결합 및 PRD 예외 처리 시나리오(네트워크 단절, 5xx 에러, 3초 타임아웃, 파싱 오류, 재시도)의 완벽한 방어선 구축
- **기간 (예정)**: Day 6
- **담당 영역**: Full-stack Integration, Error Handling, Exception Resilience

---

## 🎯 2. 세부 과업 (Tasks)

- [ ] **Task 4.1: 클라이언트 API 통신 파이프라인 연동**
  - Next.js 클라이언트에서 `POST /api/recommend` fetch 호출 연동
  - 상태 관리 (`loading`, `result`, `error`, `invalid`) 최적화
- [ ] **Task 4.2: 3초 타임아웃 & Fallback UI 처리**
  - 클라이언트 레벨에서도 3초 타임아웃을 감지하여 응답 지연 시 즉시 기본 추천 카드를 화면에 표시
- [ ] **Task 4.3: 네트워크 및 5xx 서버 에러 안내(Toast/Alert)**
  - API 호출 실패 시 *"일시적인 연결 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."* 안내 배너/토스트 노출
  - 에러 발생 직후 '추천받기' 버튼을 다시 활성화하여 사용자가 바로 재시도할 수 있도록 처리
- [ ] **Task 4.4: UI 보호 (Data Protection)**
  - 비정상적인 줄글이나 깨진 데이터 수신 시에도 JSON 파싱 에러로 인한 화면 크래시(흰 화면)를 100% 방지하고 Fallback 데이터로 안전하게 대체

---

## 📦 3. 주요 산출물 (Deliverables)
1. `app/page.tsx` (E2E 연동 및 에러/타임아웃 핸들러)
2. `hooks/use-recommendation.ts` (추천 비즈니스 로직 및 에러 처리 커스텀 훅)
3. `components/error-toast.tsx` (오류 알림 컴포넌트)

---

## ✅ 4. 완료 기준 (Definition of Done)
- [ ] 네트워크 차단 또는 서버 500 에러 시 친절한 안내 멘트가 뜨고 버튼이 재활성화된다.
- [ ] 3초 이상 소요 시 Fallback 결과가 노출되어 무한 로딩이 발생하지 않는다.
- [ ] 추천 완료 후 '다시 추천받기' 버튼을 통해 연속적인 재추천이 가능하다.
