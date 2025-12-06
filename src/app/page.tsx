import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/utils/posts'
import PostCard from '@/components/PostCard'
import { getImagePath } from '@/utils/image'

export default function Home() {
  const posts = getAllPosts().slice(0, 9)
  const totalPosts = getAllPosts().length

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 mb-12 overflow-hidden">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xNiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative text-center px-4">
          {/* ロゴ */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <Image 
                src={getImagePath('/images/logo.png')}
                alt="Freelance Dev Lab Logo" 
                width={140}
                height={140}
                className="relative h-32 w-auto drop-shadow-2xl"
                unoptimized
              />
            </div>
          </div>

          {/* メインタイトル */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Freelance Dev Lab
          </h1>

          {/* キャッチコピー */}
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 tracking-tight">
            技術で稼ぐ力を、<span className="text-blue-600">AI</span>で最速に。
          </p>

          {/* サブキャッチ */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-gray-200">
              <span className="text-2xl">🤖</span>
              <span className="text-lg font-semibold text-gray-700">AI</span>
              <span className="text-gray-400">×</span>
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-semibold text-gray-700">技術</span>
              <span className="text-gray-400">×</span>
              <span className="text-2xl">💼</span>
              <span className="text-lg font-semibold text-gray-700">フリーランス</span>
            </div>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            エンジニアが<span className="font-bold text-gray-800">自由に稼ぐ</span>ための情報を発信する研究所
          </p>

          {/* CTAボタン */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>記事を読む</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all duration-300"
            >
              <span>このサイトについて</span>
            </Link>
          </div>

          {/* 統計情報（オプション） */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalPosts}</div>
              <div className="text-sm text-gray-600">記事数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-sm text-gray-600">カテゴリ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">毎週</div>
              <div className="text-sm text-gray-600">更新中</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          カテゴリ
        </h2>
        <p className="text-gray-600 mb-8">興味のある分野から記事を探す</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            最新記事
          </h2>
          <Link
            href="/articles"
            className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <span>すべて見る</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <p className="text-gray-600 mb-8">最新の技術情報をチェック</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

const categories = [
  { name: 'AI × 開発効率化', slug: 'ai-dev', icon: '🤖' },
  { name: 'フリーランス戦略', slug: 'freelance', icon: '💼' },
  { name: 'Web開発', slug: 'web-dev', icon: '🌐' },
  { name: 'DevOps', slug: 'devops', icon: '⚙️' },
  { name: 'セキュリティ', slug: 'security', icon: '🔐' },
  { name: 'クラウド', slug: 'cloud', icon: '☁️' },
  { name: 'マネタイズ', slug: 'monetize', icon: '💰' },
  { name: 'ツールレビュー', slug: 'tools', icon: '🛠️' },
]
