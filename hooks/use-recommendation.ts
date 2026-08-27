'use client';

import { useState, useCallback, useRef } from 'react';
import { RecommendationResult, RecommendationResponse } from '@/lib/types';
import { recommendationResultSchema } from '@/lib/schema';
import { getSmartFallback } from '@/lib/fallback';
import { ValidationErrorType } from '@/components/input-section';

export function useRecommendation() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [validationError, setValidationError] = useState<ValidationErrorType>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const clearValidationError = useCallback(() => {
    setValidationError(null);
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const requestRecommendation = useCallback(async () => {
    const trimmed = text.trim();

    // 1. 유효성 검사 (0자/빈칸, 5자 미만)
    if (trimmed.length === 0) {
      setValidationError('EMPTY');
      return;
    }
    if (trimmed.length < 5) {
      setValidationError('TOO_SHORT');
      return;
    }

    // 이전 상태 초기화 및 로딩 시작
    setValidationError(null);
    setErrorMessage(null);
    setLoading(true);

    // 이전 요청이 있다면 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // 클라이언트 이중 타임아웃 방어 (3,200ms)
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 3200);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood: trimmed }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 서버 HTTP 상태 코드 체크
      if (!response.ok) {
        // 5xx 서버 에러 또는 기타 실패
        if (response.status >= 500) {
          throw new Error('SERVER_5XX_ERROR');
        }
      }

      const data: RecommendationResponse = await response.json().catch(() => ({
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: '일시적인 연결 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          retryable: true,
        },
      }));

      if (data.success && data.data) {
        // UI 보호 (Data Protection): 클라이언트에서도 Zod 스키마 검증
        const validateClientResult = recommendationResultSchema.safeParse(data.data);
        if (validateClientResult.success) {
          setResult(validateClientResult.data);
        } else {
          // 비정상적인 데이터 수신 시에도 크래시 없이 스마트 Fallback으로 안전 대체
          console.warn('[UI Protection] Malformed response data, using smart fallback.');
          const fallbackData = getSmartFallback(trimmed, 'parse_error');
          setResult(fallbackData);
        }
      } else {
        // 백엔드에서 반환한 안내 에러 메시지 노출
        const errorMsg =
          data.error?.message ||
          '일시적인 연결 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        setErrorMessage(errorMsg);
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      const isAbort =
        (err instanceof DOMException && err.name === 'AbortError') ||
        (err instanceof Error && err.name === 'AbortError');

      if (isAbort) {
        // 3초 타임아웃 초과 시 Fallback 자동 적용 (PRD 명세)
        console.warn('[Client Timeout] 3.2s exceeded. Applying smart fallback.');
        const timeoutFallback = getSmartFallback(trimmed, 'timeout');
        setResult(timeoutFallback);
      } else {
        // 네트워크 단절 또는 5xx 오류 시 PRD 에러 안내 문구 노출
        console.error('API Request Failed:', err);
        setErrorMessage(
          '일시적인 연결 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [text]);

  const reset = useCallback(() => {
    setText('');
    setResult(null);
    setValidationError(null);
    setErrorMessage(null);
    setLoading(false);
  }, []);

  return {
    text,
    setText,
    loading,
    result,
    validationError,
    errorMessage,
    requestRecommendation,
    clearValidationError,
    clearErrorMessage,
    reset,
  };
}
