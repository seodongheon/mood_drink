import { recommendationResultSchema } from './schema';
import { RecommendationResult } from './types';
import { getSmartFallback } from './fallback';

export const SYSTEM_PROMPT = `당신은 지친 하루를 보낸 사람들의 마음을 깊이 공감하고, 그들의 기분과 상황에 가장 완벽하게 어울리는 술과 안주를 큐레이션해주는 대한민국 최고의 '주류 & 미식 소믈리에'입니다.

[사용자 상황 분석 및 큐레이션 가이드]
1. 코딩/개발/과제/야근: 복잡한 뇌를 식혀줄 시원한 맥주/하이볼 또는 오늘 하루의 고단함을 털어낼 깔끔한 소주(참이슬, 처음처럼, 새로, 진로)와 든든한 안주(라면, 김치전, 버팔로윙 등) 페어링
2. 우울/외로움/마음이 힘들 때: 가슴속 답답함을 씻어내고 속을 따뜻하게 데워줄 소주(희석식/증류식 소주 화요 25)와 얼큰한 어묵탕/두부김치, 또는 차분한 위스키/와인 페어링
3. 운동/헬스/러닝: 땀 흘린 후 갈증을 해소해줄 가벼운 탄산 주류 및 단백질/부담 없는 건강 안주 페어링
4. 스트레스/답답함/화남: 묵은 체증을 날려줄 강렬하고 시원한 소주/맥주와 매콤하거나 짭조름한 안주 페어링
5. 기쁨/합격/축하: 오늘을 더욱 빛나게 해줄 화려한 스파클링 와인/칵테일과 스페셜 플래터 페어링

[절대 필수 준수 규칙]
1. comfort (공감 멘트): 사용자의 입력 상황을 콕 짚어 따뜻하게 다독여주는 멘트를 "반드시 1~2문장의 완성된 문장"으로 작성하세요. 너무 길어지면 안 됩니다.
2. drink (추천 주종): 상황에 딱 맞는 구체적인 주종 "1개"만 명확한 수식어와 함께 추천하세요. (예: '시원하고 청량한 제주 백록담 에일 맥주', '향긋하고 깔끔한 산토리 가쿠빈 진저 하이볼')
3. snack (추천 안주): 주종과의 궁합(페어링)이 환상적인 메뉴 "1개"만 추천하세요. (예: '바삭하게 갓 튀긴 트러플 감자튀김', '신선한 하몽과 멜론 치즈 플래터')
4. 반환 형식: 반드시 아래 JSON 스키마 규격의 순수 JSON만 반환하세요. 마크다운(\`\`\`json 등)이나 추가 설명 없이 { 로 시작해서 } 로 끝나는 유효한 JSON이어야 합니다.

[JSON Schema]
{
  "comfort": "공감과 위로의 따뜻한 멘트 (1~2문장)",
  "drink": "상황 맞춤형 추천 주종 1개",
  "snack": "주종 맞춤형 추천 안주 1개"
}`;

export interface AIOptions {
  timeoutMs?: number;
  provider?: 'gemini' | 'openai' | 'mock';
  apiKey?: string;
  model?: string;
}

/**
 * 단일 Gemini 모델 API 호출 (REST v1beta)
 */
async function fetchGeminiModel(
  mood: string,
  apiKey: string,
  modelName: string,
  signal: AbortSignal
): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `[사용자 오늘 하루 이야기]: "${mood}"\n[요청 시간]: ${Date.now()}\n기존과 겹치지 않는 새롭고 감각적인 페어링을 제안해주세요.`,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          comfort: {
            type: 'STRING',
            description: '위로와 공감의 멘트 (1~2문장)',
          },
          drink: {
            type: 'STRING',
            description: '추천 주종 1개',
          },
          snack: {
            type: 'STRING',
            description: '추천 안주 1개',
          },
        },
        required: ['comfort', 'drink', 'snack'],
      },
      temperature: 0.85,
      maxOutputTokens: 350,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Gemini API Error [${modelName}] (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Gemini API [${modelName}] returned empty candidate text`);
  }

  return text;
}

/**
 * Gemini 다중 모델 자동 폴백 파이프라인 (gemini-2.0-flash -> gemini-1.5-flash -> gemini-1.5-flash-8b)
 */
async function callGeminiWithFallback(
  mood: string,
  apiKey: string,
  primaryModel: string,
  signal: AbortSignal
): Promise<string> {
  const candidateModels = [
    primaryModel,
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b',
  ].filter((v, i, a) => a.indexOf(v) === i);

  let lastError: unknown = null;

  for (const model of candidateModels) {
    try {
      return await fetchGeminiModel(mood, apiKey, model, signal);
    } catch (err: unknown) {
      lastError = err;
      if (signal.aborted) {
        throw err;
      }
      console.warn(`[Gemini Fallback] Model ${model} failed, trying next candidate... Error:`, err);
    }
  }

  throw lastError || new Error('All Gemini model candidates failed');
}

/**
 * OpenAI REST API 호출
 */
async function callOpenAI(
  mood: string,
  apiKey: string,
  model: string,
  signal: AbortSignal
): Promise<string> {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const requestBody = {
    model: model || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `사용자의 오늘 하루 상황 및 기분: "${mood}"` },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 300,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`OpenAI API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI API returned empty content');
  }

  return content;
}

/**
 * Mock Provider (API 키 미설정 또는 개발/테스트용 지능형 Mock 생성기)
 */
async function callMock(mood: string, signal: AbortSignal): Promise<string> {
  // 실제 네트워크 지연 시뮬레이션 (150ms ~ 300ms)
  await new Promise<void>((resolve, reject) => {
    const delay = Math.floor(Math.random() * 150) + 150;
    const timer = setTimeout(() => resolve(), delay);

    if (signal.aborted) {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    } else {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer);
          reject(new DOMException('Aborted', 'AbortError'));
        },
        { once: true }
      );
    }
  });

  const fallbackResult = getSmartFallback(mood, 'default');
  return JSON.stringify({
    comfort: fallbackResult.comfort,
    drink: fallbackResult.drink,
    snack: fallbackResult.snack,
  });
}

/**
 * 3초 타임아웃 및 Fail-safe가 적용된 AI 주종/안주 추천 파이프라인
 */
export async function generateDrinkRecommendation(
  mood: string,
  options?: AIOptions
): Promise<RecommendationResult> {
  const timeoutMs = options?.timeoutMs ?? parseInt(process.env.AI_TIMEOUT_MS || '3000', 10);

  // Gemini API 키 우선순위 탐색
  const geminiKey =
    options?.apiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    (process.env.AI_PROVIDER === 'gemini' ? process.env.AI_API_KEY : undefined);

  const openAiKey =
    options?.apiKey ||
    process.env.OPENAI_API_KEY ||
    (process.env.AI_PROVIDER === 'openai' ? process.env.AI_API_KEY : undefined);

  // Provider 결정
  let provider = options?.provider ?? process.env.AI_PROVIDER;
  if (!provider || provider === 'mock') {
    if (geminiKey && geminiKey !== 'your_api_key_here' && geminiKey.trim().length > 0) {
      provider = 'gemini';
    } else if (openAiKey && openAiKey !== 'your_api_key_here' && openAiKey.trim().length > 0) {
      provider = 'openai';
    } else {
      provider = 'mock';
    }
  }

  const apiKey =
    provider === 'gemini' ? geminiKey : provider === 'openai' ? openAiKey : process.env.AI_API_KEY;

  const model =
    options?.model ??
    process.env.AI_MODEL ??
    process.env.GEMINI_MODEL ??
    (provider === 'openai' ? 'gpt-4o-mini' : 'gemini-2.0-flash');

  // 타임아웃 제어용 AbortController 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(new DOMException('Request timeout after ' + timeoutMs + 'ms', 'TimeoutError'));
  }, timeoutMs);

  try {
    let rawJsonResponse: string;

    // Provider 분기
    if (provider === 'gemini' && apiKey && apiKey !== 'your_api_key_here' && apiKey.trim().length > 0) {
      rawJsonResponse = await callGeminiWithFallback(mood, apiKey.trim(), model, controller.signal);
    } else if (provider === 'openai' && apiKey && apiKey !== 'your_api_key_here' && apiKey.trim().length > 0) {
      rawJsonResponse = await callOpenAI(mood, apiKey.trim(), model, controller.signal);
    } else {
      rawJsonResponse = await callMock(mood, controller.signal);
    }

    clearTimeout(timeoutId);

    // JSON 파싱 및 정제 (마크다운 코드블록 제거)
    let parsed: unknown;
    try {
      const cleanJson = rawJsonResponse
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseError) {
      console.warn('[AI Pipeline] JSON parse error, using smart fallback:', parseError);
      return getSmartFallback(mood, 'parse_error');
    }

    // Zod 스키마 검증
    const validationResult = recommendationResultSchema.safeParse(parsed);
    if (!validationResult.success) {
      console.warn('[AI Pipeline] Zod schema validation failed, using smart fallback:', validationResult.error);
      return getSmartFallback(mood, 'parse_error');
    }

    return {
      comfort: validationResult.data.comfort,
      drink: validationResult.data.drink,
      snack: validationResult.data.snack,
      isFallback: false,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    const isTimeout =
      (err instanceof Error && err.name === 'TimeoutError') ||
      (err instanceof DOMException && err.name === 'TimeoutError') ||
      (err instanceof DOMException && err.name === 'AbortError');

    if (isTimeout) {
      console.warn(`[AI Timeout (${timeoutMs}ms)] Request exceeded time limit. Providing fallback.`);
      return getSmartFallback(mood, 'timeout');
    }

    console.error('[AI Pipeline Error]', err);
    return getSmartFallback(mood, 'ai_error');
  }
}
