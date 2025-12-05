import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold text-gray-900">
              Freelance Dev Lab
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
              ホーム
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
