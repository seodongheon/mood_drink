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

      {/* 1. 위로/공감 멘트 카드 (상단 전면 배너) */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl md:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] opacity-70">
          <div className="flex items-center gap-1.5">
            <HeartHandshake size={14} />
            <span>A WARM WORD FOR YOU</span>
          </div>
          <Quote size={18} className="opacity-40" />
        </div>

        <p className="my-4 text-pretty font-serif text-lg leading-relaxed md:text-2xl md:leading-9">
          {result.comfort}
        </p>

        <p className="text-[11px] font-mono tracking-wider opacity-60">
          {result.isFallback ? '⚡ AI가 준비한 특별 안심 페어링' : '✨ 당신의 오늘 기분에 맞춘 전용 페어링'}
        </p>
      </div>

      {/* 2. 주종 & 안주 2단 대칭 정렬 그리드 */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* 주종 카드 */}
        <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-md transition-all hover:shadow-lg hover:border-accent/40">
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
        <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-md transition-all hover:shadow-lg hover:border-accent/40">
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
    </section>
  );
}
