import { RecommendationResult } from './types';

/**
 * PRD 5번 명세에 따른 기본 Fallback 문구 및 추천값
 * "AI가 너무 깊게 고민하네요! 오늘은 무조건 시원한 맥주와 치킨을 추천합니다."
 */
export const DEFAULT_FALLBACK_RECOMMENDATION: RecommendationResult = {
  comfort: 'AI가 너무 깊게 고민하네요! 오늘은 무조건 시원한 맥주와 치킨을 추천합니다.',
  drink: '시원하고 청량한 생맥주',
  snack: '갓 튀겨 바삭한 후라이드 치킨',
  isFallback: true,
};

/**
 * 상황별 키워드 기반 스마트 Fallback 데이터셋
 * AI 장애/타임아웃 시에도 사용자의 입력 키워드에 최대한 부합하는 고품질 추천 제공
 */
interface ScenarioFallback {
  keywords: string[];
  result: RecommendationResult;
}

const SCENARIO_FALLBACKS: ScenarioFallback[] = [
  {
    keywords: ['운동', '헬스', '러닝', '등산', '다이어트', '근육', '피트니스', '땀', '수영', '자전거'],
    result: {
      comfort: '오늘 온 힘을 다해 땀 흘린 당신, 정말 멋져요! 가볍고 깔끔한 한 잔으로 갈증과 피로를 날려보세요.',
      drink: '시원하고 가벼운 레몬 탄산 하이볼',
      snack: '단백질 가득한 그릴드 닭가슴살 샐러드와 견과류',
      isFallback: true,
    },
  },
  {
    keywords: ['코딩', '과제', '야근', '개발', '에러', '버그', '시험', '공부', '프로젝트', '마감', '업무'],
    result: {
      comfort: '복잡한 머릿속 코드는 잠시 닫아두고 오롯이 쉬어가세요. 수고한 뇌를 깨끗이 비워낼 시간이에요.',
      drink: '청량감 넘치는 수제 페일 에일',
      snack: '치즈가 듬뿍 올라간 감자튀김과 버팔로 윙',
      isFallback: true,
    },
  },
  {
    keywords: ['우울', '슬픔', '눈물', '외롭', '혼자', '속상', '지침', '힘들', '방전', '짜증', '스트레스', '답답'],
    result: {
      comfort: '마음이 많이 무겁고 지친 하루였군요. 따뜻하고 은은한 한 잔이 당신의 마음에 다정한 쉼이 되어줄 거예요.',
      drink: '달콤 쌉싸름한 산토리 진저 하이볼',
      snack: '부드러운 에그 인 헬(샥슈카)과 바게트',
      isFallback: true,
    },
  },
  {
    keywords: ['축하', '합격', '기쁨', '행복', '성공', '기분 좋', '신나', '월급', '보너스', '생일', '파티'],
    result: {
      comfort: '기분 좋은 순간을 온전히 만끽하세요! 오늘 하루를 더욱 특별하게 빛내줄 한 잔을 선물합니다.',
      drink: '스파클링 와인 (프로세코 or 샴페인)',
      snack: '신선한 하몽과 멜론, 모둠 치즈 플래터',
      isFallback: true,
    },
  },
  {
    keywords: ['비', '눈', '추위', '날씨', '새벽', '밤', '조용', '차분', '음악', '책'],
    result: {
      comfort: '차분한 밤공기 속에 당신만의 여유를 담아보세요. 깊은 풍미가 오늘 밤을 아늑하게 채워줄 거예요.',
      drink: '바디감 있는 까베르네 소비뇽 레드 와인',
      snack: '풍미 깊은 까망베르 치즈와 무화과잼 크래커',
      isFallback: true,
    },
  },
];

/**
 * 사용자 입력 기반 스마트 Fallback 반환
 * 매칭되는 키워드가 없거나 특정 에러 상황 시 기본 Fallback 반환
 */
export function getSmartFallback(
  mood: string,
  reason: 'timeout' | 'ai_error' | 'parse_error' | 'default' = 'default'
): RecommendationResult {
  const normalizedMood = mood.toLowerCase().trim();

  // 타임아웃 전용 안내 문구인 경우 PRD 문구 우선 적용 가능
  if (reason === 'timeout') {
    return { ...DEFAULT_FALLBACK_RECOMMENDATION };
  }

  for (const item of SCENARIO_FALLBACKS) {
    if (item.keywords.some((kw) => normalizedMood.includes(kw))) {
      return { ...item.result };
    }
  }

  return { ...DEFAULT_FALLBACK_RECOMMENDATION };
}
