import Image from 'next/image'
import { getImagePath } from '@/utils/image'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">About Freelance Dev Lab</h1>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">このブログについて</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Freelance Dev Lab は、技術で稼ぐ力をAIで最速にすることを目指すエンジニア向けメディアです。
        </p>
        <p className="text-gray-700 leading-relaxed">
          AI × 技術 × フリーランスの研究所として、エンジニアが自由に働き、
          高収益を実現するための実践的な情報を発信しています。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">発信内容</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-2xl mr-3">🤖</span>
            <div>
              <strong className="text-gray-900">AI × 開発効率化</strong>
              <p className="text-gray-600">最新AIツールで開発を劇的に効率化</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">💼</span>
            <div>
              <strong className="text-gray-900">フリーランス戦略</strong>
              <p className="text-gray-600">月100万円を安定して稼ぐ方法</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🌐</span>
            <div>
              <strong className="text-gray-900">Web開発</strong>
              <p className="text-gray-600">Next.js、FastAPI、TypeScriptなどモダン技術</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">⚙️</span>
            <div>
              <strong className="text-gray-900">DevOps</strong>
              <p className="text-gray-600">Docker、CI/CD、インフラ自動化</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🔐</span>
            <div>
              <strong className="text-gray-900">セキュリティ</strong>
              <p className="text-gray-600">OSINT、脆弱性診断の実践</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">💰</span>
            <div>
              <strong className="text-gray-900">マネタイズ</strong>
              <p className="text-gray-600">エンジニアの収益化戦略</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">コンセプト</h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-2xl font-bold text-center text-gray-900 mb-2">
            技術で稼ぐ力を、AIで最速に。
          </p>
          <p className="text-center text-gray-600">
            AI時代のエンジニアが自由に働き、高収益を実現する
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">運営方針</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>実践的で再現性の高い情報提供</li>
          <li>最新のAI技術を活用した効率化手法の紹介</li>
          <li>エンジニアの収益化とキャリア形成のサポート</li>
          <li>完全無料での情報発信（アフィリエイトリンクを含む場合があります）</li>
        </ul>
      </section>
    </div>
  )
}
