import { getAllPosts } from '@/utils/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const categories = [
    { slug: 'ai-dev' },
    { slug: 'freelance' },
    { slug: 'web-dev' },
    { slug: 'devops' },
    { slug: 'security' },
    { slug: 'cloud' },
    { slug: 'monetize' },
    { slug: 'tools' },
  ]
  return categories
}

const categoryMap: Record<string, string> = {
  'ai-dev': 'AI × 開発効率化',
  'freelance': 'フリーランス戦略',
  'web-dev': 'Web開発',
  'devops': 'DevOps',
  'security': 'セキュリティ',
  'cloud': 'クラウド・インフラ',
  'monetize': 'マネタイズ',
  'tools': 'ツールレビュー',
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = categoryMap[params.slug] || params.slug
  const allPosts = getAllPosts()
  const posts = allPosts.filter((post) => {
    // カテゴリ名の部分一致で検索
    return post.category.includes(categoryName) || 
           categoryName.includes(post.category) ||
           post.category === categoryName
  })

  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← ホームに戻る
        </Link>
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-600">{posts.length}件の記事</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">まだ記事がありません</p>
        </div>
      )}
    </div>
  )
}
