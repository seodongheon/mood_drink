'use client';

import React from 'react';
import { Clock3, Moon, Sparkles, Wine } from 'lucide-react';
import { InputSection } from '@/components/input-section';
import { RecommendationCard } from '@/components/recommendation-card';
import { ErrorToast } from '@/components/error-toast';
import { useRecommendation } from '@/hooks/use-recommendation';

export default function Page() {
  const {
    text,
    setText,
    loading,
    result,
    validationError,
    errorMessage,
    requestRecommendation,
    clearValidationError,
    clearErrorMessage,
  } = useRecommendation();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/20">
      {/* 상단 네비게이션 헤더 */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 md:px-8">
        <div className="flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.2em] text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Wine size={16} />
          </span>
          <span>MOOD DRINK</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
          <Moon size={13} className="text-accent" />
          <span>NIGHT CURATION</span>
        </div>
      </header>

      {/* 메인 히어로 & 입력 영역 */}
      <section className="mx-auto flex w-full max-w-5xl flex-col px-5 pb-24 pt-8 md:px-8 md:pt-14">
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            A small comforting pause
          </p>
          <h1 className="font-serif text-4xl font-normal leading-[1.15] tracking-tight md:text-6xl">
            오늘 하루도 <br />
            <span className="text-muted-foreground font-light">정말 고생 많았어요.</span>
          </h1>
          <p className="mt-5 text-sm leading-6 text-muted-foreground md:text-base">
            코딩 과제, 헬스, 러닝, 또는 길었던 하루의 방전된 기분을 편하게 적어주세요.
            <br />
            당신의 밤을 따뜻하게 안아줄 맞춤 한 잔과 안주를 골라드릴게요.
          </p>
        </div>

        {/* 2열 레이아웃: 입력 영역 + 안내 사이드바 */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <InputSection
            text={text}
            onChange={setText}
            onSubmit={requestRecommendation}
            loading={loading}
            hasResult={result !== null}
            validationError={validationError}
            onClearError={clearValidationError}
          />

          {/* 데스크톱 우측 가이드 카드 */}
          <aside className="hidden rounded-2xl border border-border/80 bg-card/60 p-5 shadow-sm backdrop-blur-sm lg:block">
            <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-accent font-semibold">
              <Sparkles size={13} />
              <span>HOW IT WORKS</span>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="mt-0.5 text-accent">
                <Clock3 size={16} />
              </span>
              <p className="text-xs leading-5 text-muted-foreground">
                입력하신 기분을 즉시 분석하여 <br />
                <strong className="font-medium text-foreground">3초 안에 맞춤 페어링</strong>을 제안합니다.
              </p>
            </div>
            <div className="mt-4 border-t border-border/60 pt-3 text-[10px] font-mono text-muted-foreground">
              ⚡ 3초 초과 시 스마트 Fallback 전환
            </div>
          </aside>
        </div>

        {/* 네트워크/서버 API 에러 알림 배너 */}
        {errorMessage && (
          <ErrorToast
            message={errorMessage}
            onClose={clearErrorMessage}
          />
        )}

        {/* AI 추천 결과 카드 영역 (기본 상태: 숨김) */}
        {result && <RecommendationCard result={result} />}
      </section>
    </main>
  );
}
