'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ content }: { content: string }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // HTMLから見出しを抽出
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content

    const headings = tempDiv.querySelectorAll('h2, h3')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1))
      const text = heading.textContent || ''
      const id = `heading-${index}`
      
      // 見出しにIDを追加（実際のDOMにも反映させる）
      heading.id = id
      
      items.push({ id, text, level })
    })

    setTocItems(items)

    // 実際のDOMの見出しにもIDを設定
    const actualHeadings = document.querySelectorAll('article h2, article h3')
    actualHeadings.forEach((heading, index) => {
      heading.id = `heading-${index}`
    })

    // スクロール監視
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    actualHeadings.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      actualHeadings.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [content])

  if (tocItems.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // ヘッダー分のオフセット
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        目次
      </h2>
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={`${
              item.level === 3 ? 'ml-4' : ''
            }`}
          >
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`text-left w-full hover:text-blue-600 transition-colors ${
                activeId === item.id
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700'
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
