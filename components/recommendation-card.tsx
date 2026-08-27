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
      className="animate-in fade-in slide-in-from-bottom-3 mt-7 duration-500"
    >
      {/* 상단 뱃지 및 인디케이터 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.25em] text-[#FFB347]">
          <Sparkles size={14} className="animate-pulse" />
          <span>NOCTURNAL COMFORT</span>
        </div>
        {result.isFallback && (
          <span className="flex items-center gap-1.5 rounded-full bg-[#FFB347]/15 px-3 py-1 font-mono text-[11px] font-medium text-[#FFB347] border border-[#FFB347]/30">
            <Zap size={11} />
            FAST FALLBACK
          </span>
        )}
      </div>

      {/* 좌(위로 멘트) / 우(주종 + 안주 세로 스택) 2열 그리드 */}
      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr] items-stretch">
        {/* [왼쪽 칸] 위로 및 공감 멘트 카드 */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#2C2719] bg-[#1F1B11] p-7 text-[#FDFCF9] shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#FFB347]/40 min-h-64">
          {/* 부드러운 배경 앰버 빛 번짐 */}
          <div className="absolute -top-16 -left-16 h-36 w-36 rounded-full bg-[#FFB347]/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between font-mono text-xs tracking-[0.2em] text-[#9C978B]">
            <div className="flex items-center gap-2">
              <HeartHandshake size={15} className="text-[#FFB347]" />
              <span>A WARM WORD FOR YOU</span>
            </div>
            <Quote size={20} className="text-[#FFB347]/40" />
          </div>

          <p className="my-6 text-pretty font-sans text-lg font-medium leading-relaxed md:text-2xl md:leading-relaxed text-[#FDFCF9]">
            "{result.comfort}"
          </p>

          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#9C978B]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFB347]" />
            <span>{result.isFallback ? 'AI가 준비한 특별 안심 페어링' : '당신의 오늘 기분에 맞춘 심야 큐레이션'}</span>
          </div>
        </div>

        {/* [오른쪽 칸] 주종(상) & 안주(하) 세로 스택 */}
        <div className="flex flex-col gap-4 justify-between">
          {/* 주종 카드 */}
          <div className="flex flex-1 items-center gap-4 rounded-3xl border border-[#2C2719] bg-[#1F1B11] p-5 shadow-xl transition-all duration-300 hover:border-[#FFB347]/50 hover:shadow-[0_0_20px_rgba(255,179,71,0.15)] group">
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#FFB347]/15 text-[#FFB347] shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Beer size={24} />
            </span>

            <div className="flex flex-col justify-center">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#FFB347] uppercase">
                RECOMMENDED DRINK
              </span>
              <h3 className="mt-1 text-base font-bold text-[#FDFCF9] sm:text-lg leading-snug">
                {result.drink}
              </h3>
            </div>
          </div>

          {/* 안주 카드 */}
          <div className="flex flex-1 items-center gap-4 rounded-3xl border border-[#2C2719] bg-[#1F1B11] p-5 shadow-xl transition-all duration-300 hover:border-[#FFB347]/50 hover:shadow-[0_0_20px_rgba(255,179,71,0.15)] group">
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#FFB347]/15 text-[#FFB347] shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Utensils size={24} />
            </span>

            <div className="flex flex-col justify-center">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#FFB347] uppercase">
                PAIRING SNACK
              </span>
              <h3 className="mt-1 text-base font-bold text-[#FDFCF9] sm:text-lg leading-snug">
                {result.snack}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
