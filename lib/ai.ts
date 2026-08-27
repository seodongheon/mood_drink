import { recommendationResultSchema } from './schema';
import { RecommendationResult } from './types';
import { getSmartFallback } from './fallback';

export const SYSTEM_PROMPT = `당신은 지친 하루를 보낸 사람들의 마음을 보듬고, 기분과 상황에 딱 맞는 최고의 술과 안주를 페어링해주는 주류/미식 큐레이터입니다.

[필수 규칙 및 제약사항]
1. 사용자의 입력 상황(방전, 운동, 코딩/과제, 스트레스, 슬픔, 축하 등)에 깊이 공감하고 위로하는 멘트를 반드시 "1~2문장"으로 작성하세요.
2. 추천 주종(drink)은 반드시 "1개"만 명확하게 추천하세요.
3. 추천 안주(snack)는 주종 및 사용자의 상황과 찰떡궁합인 메뉴로 반드시 "1개"만 명확하게 추천하세요.
4. 반드시 아래 JSON 스키마 형식의 순수 JSON만 반환하세요. 마크다운(\`\`\`json 등)이나 추가 텍스트를 포함하지 마세요.

[JSON 출력 형식]
{
  "comfort": "공감과 위로의 따뜻한 멘트 (1~2문장)",
  "drink": "상황에 어울리는 맞춤 주종 1개",
  "snack": "주종과 어울리는 맞춤 안주 1개"
}`;

export interface AIOptions {
  timeoutMs?: number;
  provider?: 'gemini' | 'openai' | 'mock';
  apiKey?: string;
  model?: string;
}

/**
 * Gemini REST API 호출
 */
async function callGemini(
  mood: string,
  apiKey: string,
  model: string,
  signal: AbortSignal
): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: `사용자의 오늘 하루 상황 및 기분: "${mood}"` }],
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
      temperature: 0.7,
      maxOutputTokens: 300,
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
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini API returned empty text');
  }

  return text;
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
  // 실제 네트워크 지연 시뮬레이션 (150ms ~ 350ms)
  await new Promise<void>((resolve, reject) => {
    const delay = Math.floor(Math.random() * 200) + 150;
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
  const provider = options?.provider ?? process.env.AI_PROVIDER ?? 'mock';
  const apiKey = options?.apiKey ?? process.env.AI_API_KEY;
  const model = options?.model ?? process.env.AI_MODEL ?? (provider === 'openai' ? 'gpt-4o-mini' : 'gemini-2.0-flash');

  // 타임아웃 제어용 AbortController 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(new DOMException('Request timeout after ' + timeoutMs + 'ms', 'TimeoutError'));
  }, timeoutMs);

  try {
    let rawJsonResponse: string;

    // Provider 분기
    if (provider === 'gemini' && apiKey && apiKey !== 'your_api_key_here') {
      rawJsonResponse = await callGemini(mood, apiKey, model, controller.signal);
    } else if (provider === 'openai' && apiKey && apiKey !== 'your_api_key_here') {
      rawJsonResponse = await callOpenAI(mood, apiKey, model, controller.signal);
    } else {
      rawJsonResponse = await callMock(mood, controller.signal);
    }

    clearTimeout(timeoutId);

    // JSON 파싱 및 정제
    let parsed: unknown;
    try {
      const cleanJson = rawJsonResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseError) {
      console.warn('AI Output JSON parsing failed, switching to Smart Fallback:', parseError);
      return getSmartFallback(mood, 'parse_error');
    }

    // Zod 스키마 검증
    const validationResult = recommendationResultSchema.safeParse(parsed);
    if (!validationResult.success) {
      console.warn('AI Output failed Zod validation, switching to Smart Fallback:', validationResult.error);
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
