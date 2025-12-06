'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import { Post } from '@/utils/posts'

const POSTS_PER_PAGE = 9

interface ArticleListProps {
  allPosts: Post[]
}

export default function ArticleList({ allPosts }: ArticleListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  // 現在のページの記事を取得
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)

  // ページ番号の配列を生成
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          記事一覧
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <p className="text-lg">
            全<span className="font-bold text-blue-600">{allPosts.length}</span>件の記事
          </p>
          {totalPages > 1 && (
            <>
              <span className="text-gray-400">|</span>
              <p className="text-sm">
                {currentPage} / {totalPages} ページ
              </p>
            </>
          )}
        </div>
      </div>

      {/* 記事一覧 */}
      {posts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-2 mt-12" aria-label="ページネーション">
              {/* 前へボタン */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 hover:bg-gray-50 hover:border-blue-400'
                }`}
                aria-label="前のページ"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">前へ</span>
              </button>

              {/* ページ番号 */}
              <div className="flex gap-1">
                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500">
                        ...
                      </span>
                    )
                  }

                  const pageNum = page as number
                  const isCurrentPage = pageNum === currentPage

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`
                        min-w-[44px] px-4 py-2 rounded-lg font-medium text-center transition-all
                        ${isCurrentPage
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'border border-gray-300 hover:bg-gray-50 hover:border-blue-400 text-gray-700'
                        }
                      `}
                      aria-label={`ページ${pageNum}`}
                      aria-current={isCurrentPage ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              {/* 次へボタン */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 hover:bg-gray-50 hover:border-blue-400'
                }`}
                aria-label="次のページ"
              >
                <span className="hidden sm:inline">次へ</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          まだ記事がありません
        </div>
      )}
    </div>
  )
}
