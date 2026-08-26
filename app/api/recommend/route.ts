import { NextRequest, NextResponse } from 'next/server';
import { requestSchema } from '@/lib/schema';
import { RecommendationResponse, RecommendationResult } from '@/lib/types';

// 임시 Mock 추천 결과 데이터셋 (Sprint 2에서 실제 LLM 엔진으로 확장)
const mockRecommendations: RecommendationResult[] = [
  {
    comfort: '오늘도 정말 수고 많으셨어요. 복잡했던 생각은 잠시 비워두고 나만을 위한 쉼표를 찍어보세요.',
    drink: '시원하고 청량한 라거 맥주',
    snack: '바삭하게 튀겨낸 순살 치킨과 웨지감자',
    isFallback: false,
  },
  {
    comfort: '지친 하루 끝에 따뜻한 위로가 닿기를 바라요. 조용한 밤, 은은하게 취해보는 건 어떨까요?',
    drink: '향긋한 산토리 가쿠빈 하이볼',
    snack: '부드러운 브리 치즈와 견과류 크래커',
    isFallback: false,
  },
  {
    comfort: '오늘 하루도 치열하게 버텨낸 당신이 자랑스러워요. 깊은 풍미와 함께 피로를 녹여보세요.',
    drink: '묵직한 바디감의 까베르네 소비뇽 레드 와인',
    snack: '달콤 짭조름한 하몽 멜론',
    isFallback: false,
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    
    // 입력값 Zod 유효성 검사
    const parseResult = requestSchema.safeParse(body);

    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues?.[0];
      const errorMessage = firstIssue?.message || '입력값이 올바르지 않습니다.';
      const errorCode =
        body?.mood === undefined || String(body?.mood).trim() === ''
          ? 'EMPTY_INPUT'
          : String(body?.mood).trim().length < 5
          ? 'TOO_SHORT'
          : 'TOO_LONG';

      const response: RecommendationResponse = {
        success: false,
        error: {
          code: errorCode,
          message: errorMessage,
          retryable: true,
        },
      };

      return NextResponse.json(response, { status: 400 });
    }

    const { mood } = parseResult.data;

    // 기분 키워드 기반 간단한 Mock 매핑 (Sprint 2에서 AI 프롬프트 엔진으로 교체 예정)
    let selectedResult = mockRecommendations[0];
    if (mood.includes('조용') || mood.includes('차분') || mood.includes('힐링') || mood.includes('혼자')) {
      selectedResult = mockRecommendations[1];
    } else if (mood.includes('축하') || mood.includes('고급') || mood.includes('분위기')) {
      selectedResult = mockRecommendations[2];
    }

    const response: RecommendationResponse = {
      success: true,
      data: selectedResult,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('API Error in POST /api/recommend:', error);
    const response: RecommendationResponse = {
      success: false,
      error: {
        code: 'AI_ERROR',
        message: '일시적인 연결 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        retryable: true,
      },
    };

    return NextResponse.json(response, { status: 500 });
  }
}
