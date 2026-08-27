'use client';

import React from 'react';
import { LoaderCircle, RotateCcw, Sparkles } from 'lucide-react';

export type ValidationErrorType = 'EMPTY' | 'TOO_SHORT' | null;

interface InputSectionProps {
  text: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  hasResult: boolean;
  validationError: ValidationErrorType;
  onClearError?: () => void;
}

export function InputSection({
  text,
  onChange,
  onSubmit,
  loading,
  hasResult,
  validationError,
  onClearError,
}: InputSectionProps) {
  const maxLength = 300;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    // 300자 초과 방어 및 자동 Truncate
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    onChange(value);

    // 5자 이상 입력 시 유효성 에러 자동 해제
    if (validationError && value.trim().length >= 5) {
      onClearError?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter 또는 Cmd+Enter로 빠른 제출 지원
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!loading) {
        onSubmit();
      }
    }
  };

  const getErrorMessage = () => {
    if (validationError === 'EMPTY') {
      return '오늘 하루를 짧게라도 들려주세요!';
    }
    if (validationError === 'TOO_SHORT') {
      return '조금 더 자세히 들려주세요!';
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="rounded-3xl border border-[#2C2719] bg-[#1F1B11]/90 p-5 shadow-2xl backdrop-blur-md md:p-7 transition-all">
      <div
        className={`relative rounded-2xl border bg-[#161309]/80 transition-all duration-300 ${
          validationError
            ? 'border-[#FF5A5F] ring-1 ring-[#FF5A5F]/40'
            : 'border-[#2C2719] focus-within:border-[#FFB347]/60 focus-within:ring-2 focus-within:ring-[#FFB347]/15'
        }`}
      >
        <label htmlFor="mood-input" className="sr-only">
          오늘의 기분 및 하루 이야기
        </label>
        <textarea
          id="mood-input"
          maxLength={maxLength}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="오늘 하루 어떤 일이 있었는지, 기분이 어떤지 편하게 적어주세요."
          className="min-h-40 w-full resize-none bg-transparent px-5 pb-12 pt-5 text-sm leading-relaxed text-[#FDFCF9] outline-none placeholder:text-[#9C978B]/70 md:min-h-48 md:text-base md:px-6 md:pt-6"
          disabled={loading}
          aria-invalid={validationError !== null}
          aria-describedby={errorMessage ? 'validation-error-msg' : undefined}
        />
        <div className="absolute bottom-4 right-5 flex items-center gap-2 font-mono text-xs text-[#9C978B] select-none">
          <span className={text.length >= maxLength ? 'text-[#FF5A5F] font-semibold' : ''}>
            {text.length}
          </span>
          <span className="opacity-50">/</span>
          <span>{maxLength}</span>
        </div>
      </div>

      {/* 동적 유효성 검사 경고 문구 (PRD 빨간 글씨 규격) */}
      {errorMessage && (
        <div
          id="validation-error-msg"
          role="alert"
          className="mt-3 flex items-center gap-2 text-xs font-medium text-[#FF5A5F] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5A5F]" />
          {errorMessage}
        </div>
      )}

      {/* '추천받기' 액션 버튼 (Nocturnal Comfort Amber Glow & Full Round) */}
      <button
        type="button"
        id="recommend-action-btn"
        onClick={onSubmit}
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FFB347] px-6 py-4 text-sm font-bold text-[#161309] tracking-wide transition-all duration-300 hover:bg-[#ffbe5e] hover:shadow-[0_0_30px_rgba(255,179,71,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(255,179,71,0.25)]"
      >
        {loading ? (
          <>
            <LoaderCircle size={17} className="animate-spin text-[#161309]" />
            <span>AI가 심야의 페어링을 고민 중...</span>
          </>
        ) : hasResult ? (
          <>
            <RotateCcw size={16} />
            <span>다른 페어링 다시 추천받기</span>
          </>
        ) : (
          <>
            <Sparkles size={16} />
            <span>오늘 밤 맞춤 한 잔 추천받기</span>
          </>
        )}
      </button>
    </div>
  );
}
