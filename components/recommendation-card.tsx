'use client';

import React from 'react';
import { Beer, HeartHandshake, Sparkles, Utensils, Zap, Quote } from 'lucide-react';
import { RecommendationResult } from '@/lib/types';

interface RecommendationCardProps {
  result: RecommendationResult;
}

export function RecommendationCard({ result }: RecommendationCardProps) {
  return (
    <section
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-3 mt-6 duration-400"
    >
      {/* 상단 뱃지 및 인디케이터 */}
      <div className="mb-3.5 flex items-center justify-between">
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

      {/* 좌(위로 멘트) / 우(주종 + 안주 세로 스택) 2열 그리드 */}
      <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] items-stretch">
        {/* [왼쪽 칸] 위로 및 공감 멘트 카드 */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl md:p-7 min-h-60">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] opacity-70">
            <div className="flex items-center gap-1.5">
              <HeartHandshake size={14} />
              <span>A WARM WORD FOR YOU</span>
            </div>
            <Quote size={18} className="opacity-40" />
          </div>

          <p className="my-5 text-pretty font-serif text-lg leading-relaxed md:text-2xl md:leading-9">
            {result.comfort}
          </p>

          <p className="text-[11px] font-mono tracking-wider opacity-60">
            {result.isFallback ? '⚡ AI가 준비한 특별 안심 페어링' : '✨ 당신의 오늘 기분에 맞춘 전용 페어링'}
          </p>
        </div>

        {/* [오른쪽 칸] 주종(상) & 안주(하) 세로 스택 */}
        <div className="flex flex-col gap-4 justify-between">
          {/* 주종 카드 */}
          <div className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-md transition-all hover:shadow-lg hover:border-accent/40">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-sm">
              <Beer size={22} />
            </span>

            <div className="flex flex-col justify-center">
              <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">
                RECOMMENDED DRINK
              </span>
              <h3 className="mt-1 text-base font-bold text-foreground sm:text-lg leading-snug">
                {result.drink}
              </h3>
            </div>
          </div>

          {/* 안주 카드 */}
          <div className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-md transition-all hover:shadow-lg hover:border-accent/40">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-sm">
              <Utensils size={22} />
            </span>

            <div className="flex flex-col justify-center">
              <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">
                PAIRING SNACK
              </span>
              <h3 className="mt-1 text-base font-bold text-foreground sm:text-lg leading-snug">
                {result.snack}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
