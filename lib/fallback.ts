import { RecommendationResult } from './types';

/**
 * PRD 5번 명세에 따른 기본 Fallback 문구 및 추천값
 */
export const DEFAULT_FALLBACK_RECOMMENDATIONS: RecommendationResult[] = [
  {
    comfort: 'AI가 너무 깊게 고민하네요! 오늘은 무조건 시원한 맥주와 치킨을 추천합니다.',
    drink: '시원하고 청량한 생맥주',
    snack: '갓 튀겨 바삭한 후라이드 치킨',
    isFallback: true,
  },
  {
    comfort: '생각이 많아지는 밤, 머릿속 복잡한 고민은 잠시 비워두고 시원하게 한 모금 들이켜보세요.',
    drink: '탄산감 넘치는 얼음 생맥주',
    snack: '매콤달콤한 닭강정과 웨지감자',
    isFallback: true,
  },
  {
    comfort: '오늘 하루도 정말 치열하게 버텨냈어요. 오늘 밤만큼은 아무 생각 없이 푹 쉬어가세요.',
    drink: '톡 쏘는 레몬 라거 맥주',
    snack: '고소한 버터구이 오징어와 나쵸',
    isFallback: true,
  },
];

export const DEFAULT_FALLBACK_RECOMMENDATION = DEFAULT_FALLBACK_RECOMMENDATIONS[0];

/**
 * 상황별 키워드 기반 스마트 Fallback 데이터셋 (다양한 옵션 제공)
 */
interface ScenarioFallbackGroup {
  keywords: string[];
  results: RecommendationResult[];
}

const SCENARIO_FALLBACK_GROUPS: ScenarioFallbackGroup[] = [
  {
    keywords: ['운동', '헬스', '러닝', '등산', '다이어트', '근육', '피트니스', '땀', '수영', '자전거'],
    results: [
      {
        comfort: '오늘 온 힘을 다해 땀 흘린 당신, 정말 멋져요! 가볍고 깔끔한 한 잔으로 갈증과 피로를 날려보세요.',
        drink: '시원하고 가벼운 레몬 탄산 하이볼',
        snack: '단백질 가득한 그릴드 닭가슴살 샐러드와 견과류',
        isFallback: true,
      },
      {
        comfort: '힘든 운동 끝에 찾아오는 뿌듯함! 칼로리 부담 없이 청량하게 목을 축여보세요.',
        drink: '청량한 제로 토닉워터 위스키 하이볼',
        snack: '바삭하게 구운 두부 스테이크와 구운 채소',
        isFallback: true,
      },
      {
        comfort: '근육까지 뻐근한 오늘, 시원한 수분 충전과 함께 꿀잠을 청해보세요.',
        drink: '깔끔하고 가벼운 라이트 라거',
        snack: '신선한 연어 아보카도 롤',
        isFallback: true,
      },
    ],
  },
  {
    keywords: ['코딩', '과제', '야근', '개발', '에러', '버그', '시험', '공부', '프로젝트', '마감', '업무'],
    results: [
      {
        comfort: '복잡한 머릿속 코드는 잠시 닫아두고 오롯이 쉬어가세요. 수고한 뇌를 깨끗이 비워낼 시간이에요.',
        drink: '청량감 넘치는 수제 페일 에일',
        snack: '치즈가 듬뿍 올라간 감자튀김과 버팔로 윙',
        isFallback: true,
      },
      {
        comfort: '수많은 버그와 마감 압박을 이겨낸 당신에게 시원하고 알싸한 한 잔을 선물합니다.',
        drink: '쌉싸름하고 홉 향 가득한 IPA 맥주',
        snack: '매콤한 칠리 치즈 나초 플래터',
        isFallback: true,
      },
      {
        comfort: '화면만 바라보느라 피로했던 눈과 마음을 편안하게 녹여줄 부드러운 페어링이에요.',
        drink: '산토리 가쿠빈 진저 하이볼',
        snack: '달콤 짭조름한 가라아게와 샐러드',
        isFallback: true,
      },
    ],
  },
  {
    keywords: ['우울', '슬픔', '눈물', '외롭', '혼자', '속상', '지침', '힘들', '방전', '짜증', '스트레스', '답답'],
    results: [
      {
        comfort: '마음이 많이 무겁고 지친 하루였군요. 따뜻하고 은은한 한 잔이 당신의 마음에 다정한 쉼이 되어줄 거예요.',
        drink: '달콤 쌉싸름한 산토리 진저 하이볼',
        snack: '부드러운 에그 인 헬(샥슈카)과 바게트',
        isFallback: true,
      },
      {
        comfort: '누구에게도 털어놓지 못한 마음, 조용히 당신의 편이 되어줄 따뜻한 밤을 보냅니다.',
        drink: '은은한 오크향의 싱글몰트 위스키 (온더락)',
        snack: '깊은 풍미의 다크 초콜릿과 무화과 크래커',
        isFallback: true,
      },
      {
        comfort: '모든 것이 버겁게 느껴질 때는 그저 따뜻한 위로와 맛있는 한 입이면 충분해요.',
        drink: '달콤하고 부드러운 깔루아 밀크',
        snack: '따끈하게 구운 브라우니와 바닐라 아이스크림',
        isFallback: true,
      },
    ],
  },
  {
    keywords: ['축하', '합격', '기쁨', '행복', '성공', '기분 좋', '신나', '월급', '보너스', '생일', '파티'],
    results: [
      {
        comfort: '기분 좋은 순간을 온전히 만끽하세요! 오늘 하루를 더욱 특별하게 빛내줄 한 잔을 선물합니다.',
        drink: '스파클링 와인 (프로세코 or 샴페인)',
        snack: '신선한 하몽과 멜론, 모둠 치즈 플래터',
        isFallback: true,
      },
      {
        comfort: '오늘을 위해 쏟은 노력의 결실을 축하해요! 가장 찬란한 오늘 밤을 건배하세요.',
        drink: '상큼하고 화려한 모히또 칵테일',
        snack: '바질 페스토 카프레제 샐러드',
        isFallback: true,
      },
      {
        comfort: '세상에서 가장 신나는 오늘! 기분 좋은 풍미로 완벽한 밤을 채워보세요.',
        drink: '묵직하고 우아한 레드 와인 (쉬라즈)',
        snack: '육즙 가득한 소고기 찹스테이크',
        isFallback: true,
      },
    ],
  },
  {
    keywords: ['비', '눈', '추위', '날씨', '새벽', '밤', '조용', '차분', '음악', '책'],
    results: [
      {
        comfort: '차분한 밤공기 속에 당신만의 여유를 담아보세요. 깊은 풍미가 오늘 밤을 아늑하게 채워줄 거예요.',
        drink: '바디감 있는 까베르네 소비뇽 레드 와인',
        snack: '풍미 깊은 까망베르 치즈와 무화과잼 크래커',
        isFallback: true,
      },
      {
        comfort: '조용히 흘러나오는 빗소리와 함께 은은하게 취하는 밤, 편안한 쉼표가 되길 바라요.',
        drink: '고소하고 부드러운 프리미엄 느린마을 막걸리',
        snack: '노릇노릇 바삭한 해물파전',
        isFallback: true,
      },
      {
        comfort: '밤이 깊어갈수록 잔잔해지는 마음, 감미로운 향과 함께 온전한 나만의 시간을 누려보세요.',
        drink: '향긋한 얼그레이 하이볼',
        snack: '부드러운 티라미수 케이크',
        isFallback: true,
      },
    ],
  },
];

/**
 * 사용자 입력 기반 스마트 Fallback 반환 (랜덤 다양성 보장)
 */
export function getSmartFallback(
  mood: string,
  reason: 'timeout' | 'ai_error' | 'parse_error' | 'default' = 'default'
): RecommendationResult {
  const normalizedMood = mood.toLowerCase().trim();

  // 타임아웃 전용 안내 문구인 경우 PRD 문구 우선 적용 가능
  if (reason === 'timeout') {
    const randomIndex = Math.floor(Math.random() * DEFAULT_FALLBACK_RECOMMENDATIONS.length);
    return { ...DEFAULT_FALLBACK_RECOMMENDATIONS[randomIndex] };
  }

  for (const group of SCENARIO_FALLBACK_GROUPS) {
    if (group.keywords.some((kw) => normalizedMood.includes(kw))) {
      const randomIndex = Math.floor(Math.random() * group.results.length);
      return { ...group.results[randomIndex] };
    }
  }

  const randomIndex = Math.floor(Math.random() * DEFAULT_FALLBACK_RECOMMENDATIONS.length);
  return { ...DEFAULT_FALLBACK_RECOMMENDATIONS[randomIndex] };
}
