/**
 * 사용자의 기분/상황 기반 주종 및 안주 추천 요청 모델
 */
export interface RecommendationRequest {
  mood: string;
}

/**
 * AI 추천 결과 모델 (PRD 성공 조건: 주종 1개, 안주 1개, 공감 멘트 1~2문장)
 */
export interface RecommendationResult {
  comfort: string;
  drink: string;
  snack: string;
  isFallback?: boolean;
}

/**
 * API 공통 성공/에러 응답 모델
 */
export interface RecommendationResponse {
  success: boolean;
  data?: RecommendationResult;
  error?: ApiError;
}

/**
 * API 에러 모델
 */
export interface ApiError {
  code: 'EMPTY_INPUT' | 'TOO_SHORT' | 'TOO_LONG' | 'TIMEOUT' | 'AI_ERROR' | 'INVALID_JSON' | 'UNKNOWN';
  message: string;
  retryable: boolean;
}
