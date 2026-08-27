# 🍷 기분 기반 맞춤형 주종 & 안주 추천 서비스 (Mood Drink)

> 하루 끝, 방전된 당신을 위한 맞춤형 주류 & 안주 큐레이션 서비스

---

## 📖 프로젝트 소개
코딩 과제, 헬스, 러닝, 야근 등으로 에너지가 완전히 방전되어 무언가를 결정하기 힘들 때, 
사용자의 기분과 상황을 텍스트로 받아 **따뜻한 공감 멘트(1~2문장) + 딱 맞는 주종(1개) + 어울리는 안주(1개)**를 신속하게 추천해 주는 AI 기반 큐레이션 웹 애플리케이션입니다.

---

## ✨ 핵심 기능 및 특징

1. **지능형 AI 페어링 엔진 (`lib/ai.ts`)**
   - 사용자 상황(방전, 운동, 코딩, 우울, 축하 등)에 최적화된 프롬프트 엔지니어링
   - Google Gemini REST API, OpenAI REST API, Smart Mock Provider 완벽 지원
   - Zod 스키마 기반 출력 데이터 무결성 검증

2. **3초 타임아웃 & Fail-safe 기본 추천 (`lib/fallback.ts`)**
   - `AbortController`를 통해 3초(3,000ms) 초과 시 무한 로딩 방지 및 강제 종료
   - 네트워크 단절, AI API 오류(5xx), 파싱 실패 시에도 크래시 없이 즉시 Fallback 결과 제공
   - PRD 표준 문구: *"AI가 너무 깊게 고민하네요! 오늘은 무조건 시원한 맥주와 치킨을 추천합니다."*

3. **철저한 유효성 검증 & UI 방어**
   - 빈칸(0자), 최소 글자 수(5자 미만), 최대 글자 수(300자) 검증 및 Truncate 처리

---

## 🛠️ 기술 스택

- **Frontend / Framework**: [Next.js 16+ (App Router)](https://nextjs.org), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Data Validation**: Zod
- **AI Integration**: Google Gemini API / OpenAI API / Smart Mock Provider

---

## 📂 프로젝트 구조

```plaintext
mood-based-drink-recommender/
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts          # AI 추천 API 엔드포인트
│   ├── globals.css               # 글로벌 스타일 및 테마 정의
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지 UI
├── docs/
│   ├── DEVELOPMENT_PLAN.md       # 전체 개발 계획서 & 추적 매트릭스
│   ├── sprint-1/README.md        # Sprint 1: 프로젝트 기반 구축 & 데이터 모델링 (완료)
│   ├── sprint-2/README.md        # Sprint 2: AI 추천 엔진 & 타임아웃/Fallback (완료)
│   ├── sprint-3/README.md        # Sprint 3: 프론트엔드 UI/UX & 유효성 검증 (진행 예정)
│   ├── sprint-4/README.md        # Sprint 4: E2E 연동 & 예외 처리 방어선
│   └── sprint-5/README.md        # Sprint 5: QA & 완료 조건 전수 검증
├── lib/
│   ├── ai.ts                     # AI 호출, 프롬프트, 3초 타임아웃 파이프라인
│   ├── fallback.ts               # Fail-safe 기본 및 상황별 Fallback 엔진
│   ├── schema.ts                 # Zod 검증 스키마
│   ├── types.ts                  # 공통 TypeScript 타입
│   └── utils.ts                  # 유틸리티 함수
├── PRD.md                        # 제품 요구사항 정의서
├── .env.example                  # 환경 변수 템플릿
└── package.json
```

---

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local`을 생성합니다.
```env
AI_PROVIDER=mock # mock | gemini | openai
AI_API_KEY=your_api_key_here
AI_MODEL=gemini-2.0-flash
AI_TIMEOUT_MS=3000
```
> **Note**: `AI_PROVIDER=mock` 또는 API 키가 없는 경우에도 내장된 지능형 Mock 엔진을 통해 모든 추천 기능이 완벽하게 동작합니다.

### 3. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`에 접속하여 서비스를 확인합니다.

---

## 📊 개발 진행 현황 (Sprint Roadmap)

| 스프린트 | 마일스톤 | 상태 | 상세 문서 |
| :--- | :--- | :---: | :--- |
| **Sprint 1** | 프로젝트 기반 구축 & 데이터 모델링 | ✅ 완료 | [Sprint 1 README](docs/sprint-1/README.md) |
| **Sprint 2** | AI 추천 엔진 & 프롬프트/타임아웃 파이프라인 | ✅ 완료 | [Sprint 2 README](docs/sprint-2/README.md) |
| **Sprint 3** | 프론트엔드 UI/UX & 유효성 검증 시스템 | ✅ 완료 | [Sprint 3 README](docs/sprint-3/README.md) |
| **Sprint 4** | 엔드투엔드 연동 & 예외 처리 방어선 구축 | ✅ 완료 | [Sprint 4 README](docs/sprint-4/README.md) |
| **Sprint 5** | QA, 성능 최적화 & PRD 완료 조건 검증 | ⏳ 다음 단계 | [Sprint 5 README](docs/sprint-5/README.md) |
