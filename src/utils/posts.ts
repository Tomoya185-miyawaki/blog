import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'posts')

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown)
  return result.toString()
}

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  thumbnail?: string
  excerpt?: string
  content: string
  affiliate_link?: string
}

export function getAllPosts(): Post[] {
  // postsディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: data.category || '',
        tags: data.tags || [],
        thumbnail: data.thumbnail || '',
        excerpt: data.excerpt || content.slice(0, 150).replace(/[#*\[\]]/g, '') + '...',
        content,
        affiliate_link: data.affiliate_link || '',
      }
    })

  // 日付でソート（新しい順）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const allPosts = getAllPosts()
  const post = allPosts.find((p) => p.slug === slug)
  
  if (post) {
    // MarkdownをHTMLに変換
    const htmlContent = await markdownToHtml(post.content)
    return {
      ...post,
      content: htmlContent,
    }
  }
  
  return undefined
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}
