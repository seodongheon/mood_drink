import { RecommendationResult } from './types';

/**
 * PRD 5번 명세에 따른 기본 Fallback 문구 및 추천값 (폭넓은 안주 풀)
 */
export const DEFAULT_FALLBACK_RECOMMENDATIONS: RecommendationResult[] = [
  {
    comfort: 'AI가 너무 깊게 고민하네요! 오늘은 무조건 시원한 맥주와 치킨을 추천합니다.',
    drink: '시원하고 청량한 생맥주',
    snack: '갓 튀겨 바삭한 후라이드 치킨',
    isFallback: true,
  },
  {
    comfort: '생각이 많아지는 밤, 머릿속 복잡한 고민은 잠시 비워두고 가볍게 한 모금 들이켜보세요.',
    drink: '탄산감 넘치는 얼음 생맥주',
    snack: '바삭하게 구운 먹태구이와 땡초 마요네즈',
    isFallback: true,
  },
  {
    comfort: '오늘 하루도 정말 치열하게 버텨냈어요. 부담 없는 안주와 함께 편안하게 쉬어가세요.',
    drink: '향긋하고 깔끔한 산토리 하이볼',
    snack: '고소한 명란구이와 아삭한 오이 슬라이스',
    isFallback: true,
  },
  {
    comfort: '지친 하루 끝에 작은 쉼표를 찍어보세요. 가볍고 달콤한 한 잔이 당신을 안아줄 거예요.',
    drink: '톡 쏘는 레몬 라거 맥주',
    snack: '버터에 구운 브리 치즈와 견과류, 꿀',
    isFallback: true,
  },
  {
    comfort: '바쁘게 달려온 하루, 짭조름하고 맛있는 야식 한 입으로 힐링해 보세요.',
    drink: '시원하고 청량한 켈리 생맥주',
    snack: '트러플 오일을 두른 짜파게티와 알싸한 파김치',
    isFallback: true,
  },
  {
    comfort: '모든 피로를 시원하게 털어버릴 수 있는 가장 완벽한 홈술 페어링을 제안합니다.',
    drink: '상큼한 자몽 하이볼',
    snack: '탱글탱글한 타코와사비와 김',
    isFallback: true,
  },
];

export const DEFAULT_FALLBACK_RECOMMENDATION = DEFAULT_FALLBACK_RECOMMENDATIONS[0];

/**
 * 상황별 키워드 기반 스마트 Fallback 데이터셋 (대폭 확장된 미식 페어링 풀)
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
        comfort: '오늘 온 힘을 다해 땀 흘린 당신, 정말 멋져요! 부담 없는 깔끔한 핑거푸드로 갈증을 풀어보세요.',
        drink: '시원하고 가벼운 레몬 탄산 하이볼',
        snack: '상큼한 바질 방울토마토 마리네이드와 리코타 치즈',
        isFallback: true,
      },
      {
        comfort: '힘든 운동 끝에 찾아오는 뿌듯함! 칼로리 부담 없이 산뜻하게 즐길 수 있는 메뉴예요.',
        drink: '청량한 제로 토닉 위스키 하이볼',
        snack: '고소한 명란구이와 아삭한 오이 슬라이스',
        isFallback: true,
      },
      {
        comfort: '근육까지 뻐근한 오늘, 시원한 수분 충전과 단백질 안주로 꿀잠을 청해보세요.',
        drink: '깔끔하고 가벼운 라이트 라거',
        snack: '단백질 가득한 그릴드 닭가슴살 샐러드와 견과류',
        isFallback: true,
      },
      {
        comfort: '개운하게 운동 마친 오늘 밤, 가볍고 달콤한 과일 안주와 함께 쉬어가세요.',
        drink: '달콤 상큼한 유자 하이볼',
        snack: '달콤한 샤인머스캣과 짭조름한 프로슈토 꼬치',
        isFallback: true,
      },
      {
        comfort: '열심히 땀 흘린 당신을 위해 기름기 쏙 뺀 담백한 고단백 안주를 준비했어요.',
        drink: '깔끔한 무알콜 레몬 탄산수 하이볼',
        snack: '부드러운 훈제 오리구이와 매콤새콤 부추무침',
        isFallback: true,
      },
      {
        comfort: '운동 후 가볍게 마시는 한 잔, 바다의 쫄깃한 풍미로 피로를 녹여보세요.',
        drink: '시원한 얼음 카스 라이트',
        snack: '쫄깃한 문어 숙회와 매콤한 초고추장/참기름장',
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
        comfort: '하나씩 쏙쏙 집어먹으며 키보드에서 손을 떼고 편안하게 영화 한 편 어떠세요?',
        drink: '향긋한 산토리 가쿠빈 진저 하이볼',
        snack: '고소한 버터 갈릭 에다마메(풋콩)와 나쵸칩',
        isFallback: true,
      },
      {
        comfort: '끝없는 에러와 과제에 지친 밤, 쌉싸름한 소주 한 잔으로 오늘 하루의 스트레스를 털어내세요.',
        drink: '살얼음 띄운 시원한 소주 (진로 / 새로)',
        snack: '얼큰하고 칼칼한 차돌 라면과 바삭한 김치전',
        isFallback: true,
      },
      {
        comfort: '배부른 야식 대신 가볍게 씹으며 피로를 녹여낼 수 있는 바삭한 안주를 준비했어요.',
        drink: '쌉싸름하고 홉 향 가득한 IPA 맥주',
        snack: '바삭하게 구운 먹태구이와 땡초 마요네즈',
        isFallback: true,
      },
      {
        comfort: '화면만 바라보느라 피로했던 눈과 마음에 작은 쉼표를 선물합니다.',
        drink: '산뜻한 블랑 1664 밀맥주',
        snack: '트러플 오일을 곁들인 감자칩과 블랙 올리브',
        isFallback: true,
      },
      {
        comfort: '야근하느라 출출해진 속을 기분 좋게 채워줄 궁극의 꿀조합 야식이에요.',
        drink: '시원한 테라 캔맥주',
        snack: '트러플 오일 짜파게티와 알싸한 파김치',
        isFallback: true,
      },
      {
        comfort: '모니터 앞을 벗어나 일본 이자카야 감성으로 가볍게 즐겨보세요.',
        drink: '청량한 짐빔 하이볼',
        snack: '겉바속촉 닭꼬치 구이(야키토리) 모둠',
        isFallback: true,
      },
      {
        comfort: '지친 밤, 짭조름하고 바삭한 한 입이 큰 위로가 되어줄 거예요.',
        drink: '시원한 기네스 흑맥주',
        snack: '바삭하고 통통한 멘보샤와 스위트 칠리소스',
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
        comfort: '가슴속 답답함을 시원하게 씻어내고 싶을 때, 묵직하고 깔끔한 소주 한 잔이 큰 위로가 될 거예요.',
        drink: '깔끔하고 차가운 소주 (참이슬 / 처음처럼)',
        snack: '따끈하고 깊은 국물의 포차식 어묵탕',
        isFallback: true,
      },
      {
        comfort: '아무것도 하기 싫을 때 가볍게 한 입, 달콤한 위로가 마음을 다정하게 감싸줄 거예요.',
        drink: '은은한 오크향의 싱글몰트 위스키 (온더락)',
        snack: '진한 다크 초콜릿과 무화과 크림치즈 크래커',
        isFallback: true,
      },
      {
        comfort: '오늘따라 마음이 쓸쓸하고 힘든 당신에게, 부드럽고 깊은 풍미의 증류주를 추천해요.',
        drink: '프리미엄 증류식 소주 (화요 25 / 서울의 밤)',
        snack: '달콤하고 시원한 파인애플 샤베트 & 황도',
        isFallback: true,
      },
      {
        comfort: '모든 것이 버겁게 느껴질 때는 그저 따뜻한 위로와 가벼운 달콤함이면 충분해요.',
        drink: '달콤하고 부드러운 깔루아 밀크',
        snack: '따끈하게 구운 브리 치즈와 아카시아 꿀, 아몬드',
        isFallback: true,
      },
      {
        comfort: '쌓였던 화와 스트레스를 화끈하게 털어버릴 수 있는 매콤한 안주를 선물합니다.',
        drink: '살얼음 띄운 시원한 진로 소주',
        snack: '불향 가득한 매콤 무뼈 닭발과 고소한 콘치즈',
        isFallback: true,
      },
      {
        comfort: '속상했던 마음, 매콤달콤한 소울푸드로 따뜻하게 채워보세요.',
        drink: '청량하고 시원한 레몬맥주',
        snack: '매콤 칼칼한 국물 떡볶이와 바삭한 모둠 튀김',
        isFallback: true,
      },
      {
        comfort: '답답한 속을 확 풀어줄 든든하고 감칠맛 넘치는 포차 페어링이에요.',
        drink: '알싸하고 시원한 처음처럼 소주',
        snack: '매콤 고소한 삼겹 두부김치',
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
        comfort: '오늘을 위해 쏟은 노력의 결실을 축하해요! 가볍고 향긋한 카나페와 함께 축배를 들어보세요.',
        drink: '상큼하고 화려한 모히또 칵테일',
        snack: '바질 페스토 카프레제와 훈제연어 카나페',
        isFallback: true,
      },
      {
        comfort: '세상에서 가장 신나는 오늘! 기분 좋은 풍미로 완벽한 밤을 채워보세요.',
        drink: '산뜻한 소비뇽 블랑 화이트 와인',
        snack: '올리브 절임과 고소한 브리치즈 큐브',
        isFallback: true,
      },
      {
        comfort: '특별한 날의 주인공인 당신을 위해 파티 분위기를 물씬 풍기는 고급스러운 요리를 추천해요.',
        drink: '바디감 있는 까베르네 소비뇽 레드 와인',
        snack: '육즙 가득한 소고기 찹스테이크와 구운 아스파라거스',
        isFallback: true,
      },
      {
        comfort: '축배를 들며 풍성한 감칠맛에 빠져드는 이국적인 감성 페어링이에요.',
        drink: '드라이한 화이트 스파클링 와인',
        snack: '올리브 오일에 끓인 통통한 감바스 알 아히요와 마늘 바게트',
        isFallback: true,
      },
      {
        comfort: '오늘의 기쁨을 고급스러운 미식과 함께 오래오래 기억하세요.',
        drink: '부드러운 피노 누아 레드 와인',
        snack: '트러플 크림 뇨끼와 신선한 루꼴라',
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
        snack: '노릇노릇 바삭한 해물파전과 양파 장아찌',
        isFallback: true,
      },
      {
        comfort: '밤이 깊어갈수록 잔잔해지는 마음, 부담 없는 산뜻한 안주와 함께 온전한 나만의 시간을 누려보세요.',
        drink: '향긋한 얼그레이 하이볼',
        snack: '얼린 청포도와 그릭요거트 그래놀라 볼',
        isFallback: true,
      },
      {
        comfort: '조용한 밤, 잔잔한 음악과 함께 가볍게 즐기는 힐링 한 모금이에요.',
        drink: '깔끔한 유자 진토닉',
        snack: '바질 토마토 브루스케타와 구운 올리브',
        isFallback: true,
      },
      {
        comfort: '빗소리가 감미로운 밤, 매콤새콤하게 입맛을 돋워줄 정겨운 안주예요.',
        drink: '달콤한 복순도가 탄산 막걸리',
        snack: '쫄깃한 골뱅이 소면 무침과 참기름 오이채',
        isFallback: true,
      },
      {
        comfort: '은은한 조명 아래 깊은 바다의 풍미와 함께 사색에 잠겨보세요.',
        drink: '달콤한 매실원주 (언더락)',
        snack: '버터에 노릇하게 구운 통가리비 관자구이',
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
