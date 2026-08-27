'use client';

import React from 'react';
import { LoaderCircle, RotateCcw, Send, Sparkles } from 'lucide-react';

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
    <div className="rounded-2xl border border-border bg-card p-4 shadow-lg md:p-6 transition-all">
      <div
        className={`relative rounded-xl border bg-background transition-all duration-300 ${
          validationError
            ? 'border-destructive ring-1 ring-destructive/40'
            : 'border-border focus-within:border-foreground/80 focus-within:ring-1 focus-within:ring-foreground/20'
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
          className="min-h-40 w-full resize-none bg-transparent px-4 pb-12 pt-4 text-sm leading-6 outline-none placeholder:text-muted-foreground/70 md:min-h-48 md:px-5 md:pt-5"
          disabled={loading}
          aria-invalid={validationError !== null}
          aria-describedby={errorMessage ? 'validation-error-msg' : undefined}
        />
        <div className="absolute bottom-3.5 right-4 flex items-center gap-2 font-mono text-[11px] text-muted-foreground select-none">
          <span className={text.length >= maxLength ? 'text-destructive font-semibold' : ''}>
            {text.length}
          </span>
          <span>/</span>
          <span>{maxLength}</span>
        </div>
      </div>

      {/* 동적 유효성 검사 경고 문구 (PRD 빨간 글씨 규격) */}
      {errorMessage && (
        <div
          id="validation-error-msg"
          role="alert"
          className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive" />
          {errorMessage}
        </div>
      )}

      {/* '추천받기' 액션 버튼 및 로딩 인터랙션 */}
      <button
        type="button"
        id="recommend-action-btn"
        onClick={onSubmit}
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-md"
      >
        {loading ? (
          <>
            <LoaderCircle size={16} className="animate-spin text-primary-foreground" />
            <span>고민 중...</span>
          </>
        ) : hasResult ? (
          <>
            <RotateCcw size={15} />
            <span>다시 추천받기</span>
          </>
        ) : (
          <>
            <Sparkles size={15} />
            <span>추천받기</span>
          </>
        )}
      </button>
    </div>
  );
}
