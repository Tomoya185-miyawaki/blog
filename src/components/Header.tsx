import Link from 'next/link'
import Image from 'next/image'
import { getImagePath } from '@/utils/image'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Freelance Dev Lab
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                技術で稼ぐ力を、AIで最速に
              </span>
            </div>
          </Link>
          
          {/* ナビゲーション */}
          <div className="flex space-x-6 items-center">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              ホーム
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/articles" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              記事一覧
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
