import { getAllPosts, getPostBySlug } from '@/utils/posts'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import PostImage from '@/components/PostImage'
import { DisplayAd, InArticleAd } from '@/components/GoogleAdsense'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const ADSENSE_SLOT_DISPLAY = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY || ''
  const ADSENSE_SLOT_IN_ARTICLE = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || ''

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <time className="text-gray-500 text-sm">
            {format(new Date(post.date), 'yyyy年MM月dd日', { locale: ja })}
          </time>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 記事上部広告 */}
      {ADSENSE_SLOT_DISPLAY && <DisplayAd adSlot={ADSENSE_SLOT_DISPLAY} />}

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="mb-8 rounded-lg overflow-hidden bg-gray-100">
          <PostImage
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content with in-article ads */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* 記事内広告（記事の途中に表示） */}
        {ADSENSE_SLOT_IN_ARTICLE && (
          <div className="my-8">
            <InArticleAd adSlot={ADSENSE_SLOT_IN_ARTICLE} />
          </div>
        )}
      </div>

      {/* 記事下部広告 */}
      {ADSENSE_SLOT_DISPLAY && (
        <div className="mt-8">
          <DisplayAd adSlot={ADSENSE_SLOT_DISPLAY} />
        </div>
      )}
    </article>
  )
}
