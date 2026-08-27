import { Analytics } from '@vercel/analytics/next';
import { Noto_Sans_KR } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-korean',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '오늘의 한 잔 (Mood Drink) — 오늘 하루도 고생 많았어요',
  description:
    '지친 하루(코딩 과제, 헬스, 러닝, 방전된 기분)를 들려주시면, 당신의 밤을 따뜻하게 안아줄 맞춤 주종 1개와 안주 1개를 3초 안에 페어링해 드립니다.',
  keywords: [
    '술 추천',
    '안주 추천',
    '기분 맞춤 주류',
    '혼술 추천',
    'AI 주류 큐레이터',
    'Mood Drink',
  ],
  authors: [{ name: 'Mood Drink Team' }],
  openGraph: {
    title: '오늘의 한 잔 (Mood Drink) — 기분 맞춤 주종/안주 큐레이션',
    description:
      '지친 하루 끝, 당신을 위한 따뜻한 위로 멘트와 딱 맞는 주종/안주 페어링을 만나보세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Mood Drink',
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 한 잔 (Mood Drink)',
    description:
      '지친 하루 끝, 당신을 위한 따뜻한 위로 멘트와 딱 맞는 주종/안주 페어링을 만나보세요.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f4' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-background">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
