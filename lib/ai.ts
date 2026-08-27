import { recommendationResultSchema } from './schema';
import { RecommendationResult } from './types';
import { getSmartFallback } from './fallback';

export const SYSTEM_PROMPT = `당신은 지친 하루를 보낸 사람들의 마음을 깊이 공감하고, 그들의 기분과 상황에 가장 완벽하게 어울리는 술과 안주를 큐레이션해주는 대한민국 최고의 '주류 & 미식 소믈리에'입니다.

[사용자 상황 분석 및 큐레이션 가이드]
1. 코딩/개발/과제/야근: 복잡한 뇌를 식혀줄 시원한 맥주/하이볼/소주와 함께, 부담 없이 쏙쏙 집어먹기 좋은 가벼운 안주(버터 갈릭 에다마메, 먹태구이와 땡초마요, 나초) 또는 든든한 요리 페어링
2. 우울/외로움/마음이 힘들 때: 속을 따뜻하게 데워줄 소주/위스키/와인과 함께 부드러운 안주(에그인헬, 구운 브리치즈와 꿀, 포차식 어묵탕, 달콤한 파인애플 샤베트 등) 페어링
3. 운동/헬스/러닝: 땀 흘린 후 갈증을 해소해줄 가벼운 하이볼/라이트 맥주와 칼로리 부담 없는 산뜻한 안주(바질 방울토마토 마리네이드, 명란구이와 오이 슬라이스, 닭가슴살 샐러드) 페어링
4. 스트레스/답답함/화남: 묵은 체증을 날려줄 강렬하고 시원한 한 잔과 매콤짭조름한 핑거푸드 페어링
5. 기쁨/합격/축하: 오늘을 더욱 빛나게 해줄 스파클링 와인/칵테일과 카나페, 하몽 멜론 치즈 플래터 페어링

[안주 큐레이션 다양성 원칙 및 방대한 안주 풀]
뻔하고 기름진 치킨/피자뿐만 아니라, 상황에 맞는 다채로운 안주를 폭넓게 큐레이션하세요:
1. 포차 & 소울푸드: 얼큰 어묵탕, 삼겹 두부김치, 불향 무뼈닭발과 콘치즈, 국물 떡볶이와 모둠튀김, 해물파전과 양파장아찌, 쫄깃한 골뱅이 소면
2. 이자카야 & 꼬치류: 닭꼬치 모둠(야키토리), 명란구이와 오이 슬라이스, 타코와사비, 버터 갈릭 에다마메(풋콩), 문어 숙회와 참기름장, 가라아게
3. 와인바 & 타파스: 감바스 알 아히요와 바게트, 하몽 멜론 치즈 플래터, 바질 페스토 카프레제, 트러플 크림 뇨끼, 소고기 찹스테이크, 관자 버터구이
4. 편의점 & 홈술 꿀조합: 트러플 오일 짜파게티와 파김치, 차돌 라면과 김치전, 버팔로윙과 치즈나초, 바삭한 멘보샤와 칠리소스
5. 가벼운 핑거푸드 & 건어물: 바삭한 먹태구이와 땡초마요, 트러플 감자칩과 올리브, 소고기 육포와 아몬드
6. 상큼 & 달콤 디저트 페어링: 파인애플 샤베트와 황도, 구운 브리치즈와 견과류/꿀, 얼린 청포도와 그릭요거트 볼, 다크 초콜릿과 무화과 크림치즈 크래커

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
 * Gemini 다중 모델 자동 폴백 파이프라인 (gemini-3.6-flash -> gemini-2.5-flash -> gemini-2.0-flash)
 */
async function callGeminiWithFallback(
  mood: string,
  apiKey: string,
  primaryModel: string,
  signal: AbortSignal
): Promise<string> {
  const candidateModels = [
    primaryModel,
    'gemini-3.6-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
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
    (provider === 'openai' ? 'gpt-4o-mini' : 'gemini-3.6-flash');

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
