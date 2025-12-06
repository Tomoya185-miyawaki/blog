import { getAllPosts } from '@/utils/posts'
import ArticleList from '@/components/ArticleList'

export default function ArticlesPage() {
  const allPosts = getAllPosts()

  return <ArticleList allPosts={allPosts} />
}
