export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col items-center space-y-4">
          <nav className="flex gap-6 text-sm">
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition">
              About
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition">
              プライバシーポリシー
            </a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition">
              お問い合わせ
            </a>
          </nav>
          <div className="text-center text-gray-600">
            <p className="mb-2">© {currentYear} Freelance Dev Lab. All rights reserved.</p>
            <p className="text-sm">技術で稼ぐ力を、AIで最速に。</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
