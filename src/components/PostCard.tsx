'use client'

import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useState } from 'react'
import { getImagePath } from '@/utils/image'

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
  const defaultThumbnail = getImagePath('/images/default-thumbnail.svg')
  const [imgSrc, setImgSrc] = useState(
    post.thumbnail ? getImagePath(post.thumbnail) : defaultThumbnail
  )

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 h-full transform group-hover:-translate-y-1">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
          <Image
            src={imgSrc}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              setImgSrc(defaultThumbnail)
            }}
            unoptimized
          />
          {/* オーバーレイ効果 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {format(new Date(post.date), 'yyyy年MM月dd日', { locale: ja })}
            </time>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* 読むボタン */}
          <div className="mt-4 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span>記事を読む</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
