import { NextRequest, NextResponse } from 'next/server';
import { requestSchema } from '@/lib/schema';
import { RecommendationResponse } from '@/lib/types';
import { generateDrinkRecommendation } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // 클라이언트 입력값 Zod 유효성 검사
    const parseResult = requestSchema.safeParse(body);

    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues?.[0];
      const errorMessage = firstIssue?.message || '입력값이 올바르지 않습니다.';
      const rawMood = body?.mood ? String(body.mood).trim() : '';

      const errorCode =
        rawMood.length === 0
          ? 'EMPTY_INPUT'
          : rawMood.length < 5
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

    // AI 추천 엔진 실행 (프롬프트 강제, 3초 타임아웃, Fallback 엔진 내장)
    const result = await generateDrinkRecommendation(mood);

    const response: RecommendationResponse = {
      success: true,
      data: result,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in POST /api/recommend:', error);
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
