import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/utils/posts'
import PostCard from '@/components/PostCard'
import { getImagePath } from '@/utils/image'

export default function Home() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-b from-blue-50 to-white rounded-lg mb-12">
        <div className="mb-6 flex justify-center">
          <Image 
            src={getImagePath('/images/logo.png')}
            alt="Freelance Dev Lab Logo" 
            width={128}
            height={128}
            className="h-32 w-auto"
            unoptimized
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Freelance Dev Lab
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          技術で稼ぐ力を、AIで最速に。
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          AI × 技術 × フリーランスの研究所。<br />
          エンジニアが自由に稼ぐための情報を発信します。
        </p>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">カテゴリ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-6">最新記事</h2>
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
