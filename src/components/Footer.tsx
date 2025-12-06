import Link from 'next/link'
import Image from 'next/image'
import { getImagePath } from '@/utils/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* 背景パターン */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xNiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative container mx-auto px-4 py-12 max-w-6xl">
        {/* 上部セクション */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* キャッチコピー */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Freelance Dev Lab
                </h3>
                <p className="text-sm text-gray-400">技術で稼ぐ力を、AIで最速に</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              エンジニアが自由に稼ぐための情報を発信する研究所
            </p>
          </div>

          {/* ナビゲーション */}
          <div>
            <h4 className="font-bold text-white mb-4">メニュー</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                ホーム
              </Link>
              <Link href="/articles" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                記事一覧
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                About
              </Link>
            </nav>
          </div>

          {/* リンク */}
          <div>
            <h4 className="font-bold text-white mb-4">情報</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                お問い合わせ
              </Link>
            </nav>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* 下部セクション */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">
            © {currentYear} Freelance Dev Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
