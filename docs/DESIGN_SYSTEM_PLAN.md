# 🌙 Nocturnal Comfort (심야의 위로) 디자인 시스템 개편 계획서

## 1. 개요
루트의 `design.md`에 정의된 **'Nocturnal Comfort (심야의 위로)'** 브랜드 컨셉을 전체 사이트에 일관되게 적용하여, 지친 하루의 끝 따뜻한 앰버 조명 아래서 편안하게 위로받는 감성적이고 몰입감 높은 심야 무드를 완성합니다.

---

## 2. 디자인 토큰 및 사양 매핑

### 🎨 컬러 시스템 (Color Palette)
| 토큰명 | 색상 코드 | 역할 및 용도 |
| :--- | :--- | :--- |
| **Base (Surface)** | `#161309` | 전체 배경(깊은 밤의 정막함을 담은 다크 브라운) |
| **Point (Primary/Accent)** | `#FFB347` | 핵심 앰버 포인트, 액션 버튼, 강조 텍스트, 발광(Glow) 효과 |
| **Sub (Container/Card)** | `#1F1B11` | 입력창 박스, 결과 카드, 안내 사이드바 컨테이너 |
| **Text (On-Surface)** | `#FDFCF9` | 주요 텍스트, 제목 (높은 가독성의 따뜻한 미색 화이트) |
| **Muted (Variant)** | `#9C978B` | 서브 텍스트, 플레이스홀더, 글자수 카운터, 비활성 라벨 |
| **Border / Stroke** | `#2C2719` | 요소 간의 경계를 짓는 은은한 다크 앰버 보더 |

### ✍️ 타이포그래피 (Typography)
- **영문/기본 폰트**: `Plus Jakarta Sans` (`next/font/google`)
- **한글 폰트**: `Noto Sans KR` (완벽한 다국어 및 한글 가독성 조화)
- **위계**:
  - Title: 굵은 볼드와 넓은 자간(`tracking-wider`), 감성적인 헤드라인
  - Body: 넉넉한 행간(`leading-relaxed` ~ `leading-loose`)으로 여유로운 독서감 제공

### 📐 조형 및 스타일 (Visual Style)
- **Roundness**: `Full Round (Max)` ➔ `rounded-3xl`, `rounded-full` 적용 (날카로움 배제, 극대화된 포근함)
- **Elevation & Lighting**: 인위적인 드롭 섀도우를 지양하고, **은은한 앰버 조명 발광(Amber Glow: `rgba(255, 179, 71, 0.25)`)** 및 **백드롭 블러(`backdrop-blur-md`)**를 활용한 심야 바(Bar) 무드 연출

---

## 3. 단계별 수정 계획 (Execution Plan)

```
[Phase 1: 글로벌 테마] ──> [Phase 2: 컴포넌트 리스타일링] ──> [Phase 3: 인터랙션/글로우] ──> [Phase 4: 검증 & 배포]
(globals.css/layout.tsx)    (Input, Card, Toast, Page)       (Amber Glow, Pulse, Blur)       (Build & Vercel)
```

### Phase 1. 글로벌 테마 및 폰트 구축
1. **`app/globals.css`**:
   - `:root` 및 다크 테마 변수를 `design.md`의 5대 컬러 토큰(`#161309`, `#FFB347`, `#1F1B11`, `#FDFCF9`, `#9C978B`, `#2C2719`)으로 전면 교체
   - 앰버 글로우(`glow-amber`) 및 소프트 백드롭 유틸리티 클래스 정의
2. **`app/layout.tsx`**:
   - `Plus_Jakarta_Sans`와 `Noto_Sans_KR`을 결합한 듀얼 폰트 변수 설정
   - 메타데이터 및 브라우저 테마 색상을 `#161309`로 동기화

### Phase 2. 핵심 UI 컴포넌트 리스타일링
1. **메인 페이지 레이아웃 (`app/page.tsx`)**:
   - 심야의 감성적인 배경 앰버 라이트 그래디언트(저조도 원형 앰버 블러) 배치
   - 상단 헤더, 안내 사이드바를 `Full Round`와 `#1F1B11` 컨테이너로 리뉴얼
2. **기분 입력 영역 (`components/input-section.tsx`)**:
   - 텍스트 영역 테두리와 배경을 부드러운 다크 앰버 레이어로 변경
   - '추천받기' 버튼에 앰버 메인 컬러 + 마우스 호버 시 **따뜻한 앰버 빛 번짐(Glow) 효과** 적용
3. **AI 추천 결과 카드 (`components/recommendation-card.tsx`)**:
   - 왼쪽 공감 멘트 카드: `#1F1B11` 딥 컨테이너 + 앰버 하이라이트 인용구 및 라운드 처리
   - 오른쪽 주종/안주 카드: 세로 스택형 앰버 아이콘 박스 & 앰버 테두리 호버 인터랙션
4. **에러 토스트 & 로딩 스켈레톤 (`components/error-toast.tsx`)**:
   - 부드러운 앰버/오렌지 경고 톤과 앰버 펄스 애니메이션 적용

### Phase 3. 인터랙션 및 시각 디테일 완성
- 버튼 클릭 시 미세한 스케일 다운(`active:scale-[0.98]`)과 부드러운 스프링 트랜지션
- 스켈레톤 로딩 시 AI의 고요한 고민을 표현하는 앰버 브라운 펄스 효과

### Phase 4. 빌드 검증 및 Vercel 배포
- `npm run build` 및 TypeScript 무결성 검증
- Vercel 프로덕션 라이브 서버 원클릭 배포

---

## 4. 완료 기준 (Definition of Done)
- [ ] 사이트 전반의 배경이 `#161309` 다크 브라운 톤으로 전환되고 앰버 `#FFB347` 포인트가 감성적으로 조화됨
- [ ] 모든 카드, 입력창, 버튼에 `Full Round (Max)` 곡률이 일관되게 적용됨
- [ ] `Plus Jakarta Sans` + `Noto Sans KR` 폰트 조합이 자연스럽게 렌더링됨
- [ ] 빌드 에러 없이 Vercel 라이브 사이트에 성공적으로 배포됨
