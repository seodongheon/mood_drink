'use client'

import { useState } from 'react'
import { AlertTriangle, Beer, Check, ChevronRight, Clock3, Coffee, LoaderCircle, RotateCcw, Send, Sparkles, Utensils } from 'lucide-react'

type Result = { comfort: string; drink: string; snack: string; fallback?: boolean }

const defaultResult: Result = {
  comfort: '오늘도 정말 애썼어요. 이제는 잠깐 멈춰서, 나를 위한 시간을 가져도 괜찮아요.',
  drink: '차갑게 식힌 라거 맥주',
  snack: '바삭한 치킨과 감자튀김',
}

const calmResult: Result = {
  comfort: '복잡했던 하루였겠어요. 따뜻한 한 모금과 함께 천천히 마음을 내려놓아봐요.',
  drink: '은은한 유자 하이볼',
  snack: '고소한 치즈와 크래커',
}

export default function Page() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState(false)
  const [invalid, setInvalid] = useState(false)

  function recommend() {
    if (text.trim().length === 0) { setInvalid(true); return }
    if (text.trim().length < 5) { setInvalid(true); return }
    setInvalid(false); setError(false); setLoading(true)
    window.setTimeout(() => { setResult(text.includes('차분') || text.includes('조용') ? calmResult : defaultResult); setLoading(false) }, 1050)
  }

  function simulateError() { setError(true); window.setTimeout(() => setError(false), 4600) }
  function simulateFallback() { setResult({ comfort: 'AI가 너무 깊게 고민하네요!', drink: '무조건 시원한 맥주', snack: '치킨', fallback: true }) }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <div className="flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.18em] text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"><Sparkles size={13} /></span>
          오늘의 한 잔
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> MOOD / CARE</div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-28 pt-14 md:px-10 md:pt-20">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">a small pause for you</p>
          <h1 className="max-w-2xl text-balance font-serif text-5xl leading-[1.02] tracking-[-0.055em] md:text-7xl">오늘 하루도<br /><span className="text-muted-foreground">고생 많았어요.</span></h1>
          <p className="mt-7 max-w-md text-pretty text-sm leading-6 text-muted-foreground md:text-base">말하기도 귀찮은 날, 지금의 마음만 살짝 들려주세요.<br />오늘 밤 어울리는 한 잔과 한 입을 골라드릴게요.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-lg md:p-6">
            <div className={`relative rounded-xl border bg-background transition-all duration-300 ${invalid ? 'border-destructive' : 'border-border focus-within:border-foreground'}`}>
              <label htmlFor="mood" className="sr-only">오늘의 기분</label>
              <textarea id="mood" maxLength={300} value={text} onChange={(e) => { setText(e.target.value); if (e.target.value.trim().length >= 5) setInvalid(false) }} placeholder="오늘 하루 어떤 일이 있었는지, 기분이 어떤지 편하게 적어주세요." className="min-h-44 w-full resize-none bg-transparent px-4 pb-12 pt-4 text-sm leading-6 outline-none placeholder:text-muted-foreground/70 md:min-h-52 md:px-5 md:pt-5" />
              <span className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground">{text.length} / 300</span>
            </div>
            {invalid && <p className="mt-3 text-xs text-destructive">{text.trim().length === 0 ? '오늘 하루를 짧게라도 들려주세요!' : '조금 더 자세히 들려주세요!'}</p>}
            <button onClick={recommend} disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <><LoaderCircle size={16} className="animate-spin" /> 고민 중...</> : <>{result ? '다시 추천받기' : '추천받기'} <Send size={15} /></>}
            </button>
          </div>
          <aside className="hidden rounded-2xl border border-border p-5 lg:block"><p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">HOW IT WORKS</p><div className="mt-5 flex items-start gap-3"><span className="mt-0.5 text-accent"><Clock3 size={17} /></span><p className="text-xs leading-5 text-muted-foreground">당신의 문장을 읽고<br /><span className="text-foreground">지금 필요한 위로</span>를 찾아요.</p></div><div className="mt-5 flex items-center gap-1 text-[10px] text-muted-foreground">PRIVATE BY DESIGN <ChevronRight size={12} /></div></aside>
        </div>

        {error && <div role="alert" className="mt-5 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive"><AlertTriangle size={16} /> 일시적인 연결 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</div>}

        {result && <section aria-live="polite" className="animate-in fade-in slide-in-from-bottom-3 mt-8 duration-500"><div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-accent"><Check size={14} /> FOR YOUR TONIGHT</div><div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg md:p-7"><p className="font-mono text-[10px] tracking-[0.18em] opacity-60">A WORD FOR YOU</p><p className="mt-6 text-pretty font-serif text-2xl leading-9">{result.comfort}</p>{result.fallback && <p className="mt-4 text-sm opacity-75">오늘은 무조건 시원하게, 가볍게 쉬어요.</p>}</div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent"><Beer size={19} /></span><p className="mt-7 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">DRINK</p><p className="mt-2 text-lg font-semibold">{result.drink}</p></div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent"><Utensils size={19} /></span><p className="mt-7 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">SNACK</p><p className="mt-2 text-lg font-semibold">{result.snack}</p></div>
        </div></section>}
      </section>

      <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/95 p-1 shadow-lg backdrop-blur"><button onClick={simulateError} className="rounded-full px-3 py-2 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><AlertTriangle size={12} className="mr-1 inline" /> 오류</button><button onClick={simulateFallback} className="rounded-full px-3 py-2 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><RotateCcw size={12} className="mr-1 inline" /> 타임아웃</button></div>
    </main>
  )
}
