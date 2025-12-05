'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  thumbnail?: string
  excerpt?: string
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
        {post.thumbnail && (
          <div className="aspect-video bg-gray-100 overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/default-thumbnail.svg'
              }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {post.category}
            </span>
            <time className="text-xs text-gray-500">
              {format(new Date(post.date), 'yyyy年MM月dd日', { locale: ja })}
            </time>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
