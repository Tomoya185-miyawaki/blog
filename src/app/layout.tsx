import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GoogleAdsense from '@/components/GoogleAdsense'

export const metadata: Metadata = {
  title: 'Freelance Dev Lab - 技術で稼ぐ力を、AIで最速に。',
  description: 'AI × 技術 × フリーランスの研究所。エンジニアが自由に稼ぐための情報を発信。',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Freelance Dev Lab',
    description: 'AI × 技術 × フリーランスの研究所',
    images: ['/images/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Dev Lab',
    description: 'AI × 技術 × フリーランスの研究所',
    images: ['/images/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
  const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''

  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        
        {/* Google AdSense */}
        {ADSENSE_CLIENT_ID && <GoogleAdsense ADSENSE_CLIENT_ID={ADSENSE_CLIENT_ID} />}
        
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
