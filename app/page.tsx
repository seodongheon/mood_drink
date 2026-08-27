'use client';

import React, { useRef } from 'react';
import {
  Beer,
  Clock3,
  Flame,
  Heart,
  HeartHandshake,
  Moon,
  Sparkles,
  Utensils,
  Wine,
  Bot,
  ArrowDown,
} from 'lucide-react';
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

  const interactionSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToInteraction = () => {
    interactionSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    const textarea = document.getElementById('mood-input');
    textarea?.focus();
  };

  return (
    <div className="relative min-h-screen bg-[#161309] text-[#FDFCF9] flex flex-col antialiased selection:bg-[#FFB347]/30 selection:text-[#FFB347]">
      {/* 🌙 배경 앰비언트 라이트 (Ambient Lighting) */}
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[32rem] w-[50rem] rounded-full bg-[#FFB347]/10 blur-[140px] z-0" />
      <div className="pointer-events-none fixed top-1/2 -right-40 h-[28rem] w-[28rem] rounded-full bg-[#FFB347]/5 blur-[120px] z-0" />

      {/* 1. 상단 고정 네비게이션 바 (TopAppBar) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-[#161309]/80 backdrop-blur-xl border-b border-[#2C2719]/40">
        <div className="flex items-center gap-2.5 font-sans text-sm font-bold tracking-[0.2em] text-[#FFB347]">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFB347] text-[#161309] shadow-[0_0_15px_rgba(255,179,71,0.35)]">
            <Wine size={16} />
          </span>
          <span className="text-[#FDFCF9]">토닥토닥 술상</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#2C2719] bg-[#1F1B11]/90 px-3.5 py-1 font-mono text-[11px] tracking-[0.2em] text-[#9C978B]">
          <Moon size={12} className="text-[#FFB347] animate-pulse" />
          <span>NOCTURNAL COMFORT</span>
        </div>
      </header>

      <main className="relative z-10 flex-grow pt-20 flex flex-col">
        {/* =========================================================================
            2. Hero Section (랜딩 히어로)
           ========================================================================= */}
        <section className="text-center pt-24 pb-20 px-6 flex flex-col items-center justify-center relative min-h-[70vh] max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFB347]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#FFB347] border border-[#FFB347]/20 mb-6">
            <Flame size={13} />
            <span>지친 하루의 끝, 당신을 위한 따뜻한 조명</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#FFB347] mb-4 drop-shadow-sm">
            토닥토닥 술상
          </h1>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-[#FDFCF9] mb-5">
            오늘 하루도 정말 고생 많았어요.
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#9C978B] max-w-lg mx-auto leading-relaxed mb-10">
            당신의 지친 마음을 달래줄 완벽한 한 잔의 위로. <br />
            지금 당신의 기분에 딱 맞는 술상을 준비해 드릴게요.
          </p>

          <button
            type="button"
            onClick={scrollToInteraction}
            className="inline-flex items-center gap-2.5 bg-[#FFB347] text-[#161309] font-bold text-base py-4 px-9 rounded-full transition-all duration-300 hover:bg-[#ffbe5e] hover:shadow-[0_0_35px_rgba(255,179,71,0.5)] active:scale-95 shadow-[0_0_20px_rgba(255,179,71,0.3)] cursor-pointer"
          >
            <span>오늘의 술상 추천받기</span>
            <ArrowDown size={18} className="animate-bounce" />
          </button>
        </section>

        {/* =========================================================================
            3. Value Proposition Section (당신만을 위한 특별한 주막)
           ========================================================================= */}
        <section className="py-20 px-6 bg-[#1F1B11]/50 border-y border-[#2C2719]/60">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#FFB347]">
                당신만을 위한 특별한 주막
              </h3>
              <p className="text-sm sm:text-base text-[#9C978B] mt-2">
                혼술하는 밤, 완벽한 휴식을 위한 3가지 포인트
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: AI 소믈리에 */}
              <div className="flex flex-col items-center text-center p-7 bg-[#1F1B11] rounded-3xl border border-[#2C2719] shadow-xl hover:border-[#FFB347]/40 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FFB347]/15 flex items-center justify-center mb-5 text-[#FFB347] group-hover:scale-110 transition-transform duration-300">
                  <Bot size={32} />
                </div>
                <h4 className="font-sans text-lg font-bold text-[#FDFCF9] mb-2.5">
                  당신만을 위한 AI 소믈리에
                </h4>
                <p className="text-sm text-[#9C978B] leading-relaxed">
                  현재의 기분, 감정, 상황을 정밀하게 분석하여 가장 어울리는 주종을 즉시 매칭해 드립니다.
                </p>
              </div>

              {/* Feature 2: 맞춤 안주 */}
              <div className="flex flex-col items-center text-center p-7 bg-[#1F1B11] rounded-3xl border border-[#2C2719] shadow-xl hover:border-[#FFB347]/40 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FFB347]/15 flex items-center justify-center mb-5 text-[#FFB347] group-hover:scale-110 transition-transform duration-300">
                  <Utensils size={32} />
                </div>
                <h4 className="font-sans text-lg font-bold text-[#FDFCF9] mb-2.5">
                  마음까지 채워주는 안주
                </h4>
                <p className="text-sm text-[#9C978B] leading-relaxed">
                  추천된 술과 찰떡궁합을 자랑하는 30여 종의 다채로운 페어링 안주를 제안합니다.
                </p>
              </div>

              {/* Feature 3: 따뜻한 위로 */}
              <div className="flex flex-col items-center text-center p-7 bg-[#1F1B11] rounded-3xl border border-[#2C2719] shadow-xl hover:border-[#FFB347]/40 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FFB347]/15 flex items-center justify-center mb-5 text-[#FFB347] group-hover:scale-110 transition-transform duration-300">
                  <HeartHandshake size={32} />
                </div>
                <h4 className="font-sans text-lg font-bold text-[#FDFCF9] mb-2.5">
                  따뜻한 위로의 한마디
                </h4>
                <p className="text-sm text-[#9C978B] leading-relaxed">
                  당신의 이야기에 깊이 공감하고, 오늘 하루의 피로를 녹여줄 다정한 위로 멘트를 건넵니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. How it Works (Steps) Section (이렇게 위로받으세요)
           ========================================================================= */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#FFB347]">
                이렇게 위로받으세요
              </h3>
              <p className="text-sm text-[#9C978B] mt-2">
                간단한 3단계로 오늘 밤의 힐링 페어링을 만나는 방법
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-13 h-13 rounded-full bg-[#1F1B11] flex items-center justify-center font-mono font-bold text-lg text-[#FFB347] mb-4 border border-[#FFB347]/30 shadow-md">
                  1
                </div>
                <h4 className="font-sans text-base font-bold text-[#FDFCF9] mb-1.5">
                  오늘 하루 들려주기
                </h4>
                <p className="text-xs sm:text-sm text-[#9C978B]">
                  있었던 일, 기분 등을 편하게 적어주세요.
                </p>
              </div>

              <div className="hidden md:block w-12 border-t-2 border-dashed border-[#2C2719]"></div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-13 h-13 rounded-full bg-[#1F1B11] flex items-center justify-center font-mono font-bold text-lg text-[#FFB347] mb-4 border border-[#FFB347]/30 shadow-md">
                  2
                </div>
                <h4 className="font-sans text-base font-bold text-[#FDFCF9] mb-1.5">
                  AI의 깊은 고민
                </h4>
                <p className="text-xs sm:text-sm text-[#9C978B]">
                  3초 안에 당신의 감정에 가장 잘 맞는 위로를 찾습니다.
                </p>
              </div>

              <div className="hidden md:block w-12 border-t-2 border-dashed border-[#2C2719]"></div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-13 h-13 rounded-full bg-[#1F1B11] flex items-center justify-center font-mono font-bold text-lg text-[#FFB347] mb-4 border border-[#FFB347]/30 shadow-md">
                  3
                </div>
                <h4 className="font-sans text-base font-bold text-[#FDFCF9] mb-1.5">
                  완벽한 술상 확인하기
                </h4>
                <p className="text-xs sm:text-sm text-[#9C978B]">
                  추천된 술, 안주, 그리고 위로를 즐기세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. Bottom Interactive Service Section (실제 서비스 입력 및 추천 결과)
           ========================================================================= */}
        <section
          ref={interactionSectionRef}
          id="interaction-section"
          className="py-20 px-6 bg-[#1F1B11]/40 border-t border-[#2C2719]/60 relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#FFB347] uppercase">
                YOUR STORY TONIGHT
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#FDFCF9] mt-2">
                자, 이제 당신의 이야기를 들려주세요.
              </h2>
              <p className="text-sm text-[#9C978B] mt-2 max-w-lg mx-auto">
                오늘 하루 어떤 일이 있었는지, 기분이 어떤지 편하게 적어주시면 됩니다.
              </p>
            </div>

            {/* 입력창 컴포넌트 */}
            <div className="max-w-2xl mx-auto">
              <InputSection
                text={text}
                onChange={setText}
                onSubmit={requestRecommendation}
                loading={loading}
                hasResult={result !== null}
                validationError={validationError}
                onClearError={clearValidationError}
              />
            </div>

            {/* 네트워크/서버 API 에러 알림 배너 */}
            {errorMessage && (
              <div className="max-w-2xl mx-auto">
                <ErrorToast message={errorMessage} onClose={clearErrorMessage} />
              </div>
            )}

            {/* 로딩 중 스켈레톤 플레이스홀더 (좌: 공감 / 우: 주종&안주 세로) */}
            {loading && (
              <div className="mt-8 grid gap-5 md:grid-cols-[1.3fr_1fr] items-stretch animate-pulse max-w-3xl mx-auto">
                <div className="min-h-64 rounded-3xl border border-[#2C2719] bg-[#1F1B11] p-7 flex flex-col justify-between">
                  <div className="h-3.5 w-36 bg-[#FFB347]/20 rounded-full" />
                  <div className="space-y-3">
                    <div className="h-5 w-5/6 bg-[#FFB347]/15 rounded-full" />
                    <div className="h-5 w-4/6 bg-[#FFB347]/15 rounded-full" />
                  </div>
                  <div className="h-3 w-32 bg-[#FFB347]/10 rounded-full" />
                </div>

                <div className="flex flex-col gap-4 justify-between">
                  <div className="flex-1 rounded-3xl border border-[#2C2719] bg-[#1F1B11] p-5 flex items-center gap-4 min-h-28">
                    <div className="h-13 w-13 rounded-2xl bg-[#FFB347]/15 shrink-0" />
                    <div className="space-y-2.5 flex-1">
                      <div className="h-3 w-24 bg-[#FFB347]/20 rounded-full" />
                      <div className="h-5 w-3/4 bg-[#FFB347]/15 rounded-full" />
                    </div>
                  </div>

                  <div className="flex-1 rounded-3xl border border-[#2C2719] bg-[#1F1B11] p-5 flex items-center gap-4 min-h-28">
                    <div className="h-13 w-13 rounded-2xl bg-[#FFB347]/15 shrink-0" />
                    <div className="space-y-2.5 flex-1">
                      <div className="h-3 w-24 bg-[#FFB347]/20 rounded-full" />
                      <div className="h-5 w-3/4 bg-[#FFB347]/15 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI 추천 결과 카드 영역 */}
            {!loading && result && (
              <div className="mt-8 max-w-3xl mx-auto">
                <RecommendationCard result={result} />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* =========================================================================
          6. Footer (푸터)
         ========================================================================= */}
      <footer className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#100E05] border-t border-[#2C2719]/50 text-xs text-[#9C978B]">
        <div className="font-sans font-bold text-[#FFB347] flex items-center gap-2">
          <Wine size={15} />
          <span>토닥토닥 술상 (Todak Todak Sulsang)</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-[#FFB347] transition-colors">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-[#FFB347] transition-colors">
            이용약관
          </a>
          <a href="#" className="hover:text-[#FFB347] transition-colors">
            문의하기
          </a>
        </div>

        <div className="text-[#9C978B]/70 font-mono text-[11px]">
          © {new Date().getFullYear()} Todak Todak Sulsang. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
