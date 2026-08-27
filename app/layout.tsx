import { Analytics } from '@vercel/analytics/next';
import { Noto_Sans_KR, Plus_Jakarta_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-korean',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: '오늘의 한 잔 (Mood Drink) — 심야의 위로 (Nocturnal Comfort)',
  description:
    '지친 하루의 끝, 당신을 위한 따뜻한 조명과 한 잔의 위로. 맞춤 주종 1개와 안주 1개를 3초 안에 페어링해 드립니다.',
  keywords: [
    '술 추천',
    '안주 추천',
    '기분 맞춤 주류',
    '혼술 추천',
    'AI 주류 큐레이터',
    'Mood Drink',
    'Nocturnal Comfort',
    '심야의 위로',
  ],
  authors: [{ name: 'Mood Drink Team' }],
  openGraph: {
    title: '오늘의 한 잔 (Mood Drink) — 심야의 위로',
    description:
      '지친 하루의 끝, 당신을 위한 따뜻한 조명과 한 잔의 위로. 맞춤 주종 1개와 안주 1개의 완벽한 페어링.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Mood Drink',
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 한 잔 (Mood Drink) — 심야의 위로',
    description:
      '지친 하루의 끝, 당신을 위한 따뜻한 조명과 한 잔의 위로. 맞춤 주종 1개와 안주 1개의 완벽한 페어링.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
  themeColor: '#161309',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark bg-[#161309]">
      <body
        className={`${plusJakartaSans.variable} ${notoSansKr.variable} font-sans antialiased bg-[#161309] text-[#FDFCF9] min-h-screen selection:bg-[#FFB347]/30 selection:text-[#FFB347]`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
