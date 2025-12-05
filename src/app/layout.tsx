import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Freelance Dev Lab - 技術で稼ぐ力を、AIで最速に。',
  description: 'AI × 技術 × フリーランスの研究所。エンジニアが自由に稼ぐための情報を発信。',
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
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
