'use client';

import React from 'react';
import { Beer, HeartHandshake, Sparkles, Utensils, Zap } from 'lucide-react';
import { RecommendationResult } from '@/lib/types';

interface RecommendationCardProps {
  result: RecommendationResult;
}

export function RecommendationCard({ result }: RecommendationCardProps) {
  return (
    <section
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-4 mt-8 duration-500"
    >
      {/* 상단 뱃지 및 인디케이터 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.2em] text-accent">
          <Sparkles size={14} />
          <span>FOR YOUR TONIGHT</span>
        </div>
        {result.isFallback && (
          <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[10px] font-medium text-accent">
            <Zap size={11} />
            FAST FALLBACK
          </span>
        )}
      </div>

      {/* 3단 결과 카드 그리드 */}
      <div className="grid gap-4 md:grid-cols-[1.3fr_0.85fr_0.85fr]">
        {/* 1. 위로/공감 멘트 카드 */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl md:p-7">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] opacity-70">
            <HeartHandshake size={13} />
            <span>A WARM WORD FOR YOU</span>
          </div>

          <p className="my-5 text-pretty font-serif text-xl leading-8 md:text-2xl md:leading-9">
            {result.comfort}
          </p>

          <p className="text-xs font-mono tracking-wider opacity-60">
            {result.isFallback ? 'AI가 추천한 특별 기본 페어링' : '당신만을 위한 기분 맞춤 페어링'}
          </p>
        </div>

        {/* 2. 주종 카드 */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Beer size={20} />
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
              01
            </span>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              RECOMMENDED DRINK
            </p>
            <p className="mt-1.5 text-lg font-bold text-foreground leading-snug">
              {result.drink}
            </p>
          </div>
        </div>

        {/* 3. 안주 카드 */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Utensils size={20} />
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
              02
            </span>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              PAIRING SNACK
            </p>
            <p className="mt-1.5 text-lg font-bold text-foreground leading-snug">
              {result.snack}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
