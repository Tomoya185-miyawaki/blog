# Freelance Dev Lab

**技術で稼ぐ力を、AIで最速に。**

技術系×フリーランス向けの完全自動化アフィリエイトブログ

## 🎯 コンセプト

- AI × 開発効率化
- フリーランスエンジニア戦略
- DevOps / クラウド
- セキュリティ / OSINT
- Web開発（Next.js / FastAPI / LLM）
- マネタイズ・案件獲得術
- ツールレビュー / 比較

## 🚀 技術スタック

- **Next.js 14** (App Router + SSG)
- **TypeScript**
- **Tailwind CSS** (ミニマル白基調デザイン)
- **MDX** (記事管理)
- **GitHub Actions** (自動投稿)
- **GitHub Pages** (無料ホスティング)

## 📂 ディレクトリ構成

```
freelance-dev-lab/
├─ public/              # 静的ファイル
│   └─ images/         # アイキャッチ画像
├─ posts/              # Markdown記事
├─ scripts/            # AI記事生成スクリプト
├─ src/
│   ├─ app/           # Next.js App Router
│   ├─ components/    # Reactコンポーネント
│   └─ lib/           # ユーティリティ
├─ .github/
│   └─ workflows/     # GitHub Actions
└─ package.json
```

## 🤖 自動化フロー

1. GitHub Actionsが毎日定時実行
2. Pythonスクリプトが記事を自動生成
3. カテゴリ別アフィリエイトリンクを自動挿入
4. Markdownファイルを自動コミット
5. Next.jsがビルド＆GitHub Pagesにデプロイ

## 💰 収益化戦略

- **フリーランスエージェント**: 1件1〜4万円
- **AIツール・SaaS**: 継続課金型
- **技術書籍・教材**: ロングテール収益

**目標: 月5万円**

## 📝 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# エクスポート（GitHub Pages用）
npm run export
```

## 🔧 記事生成

```bash
# Python環境セットアップ
pip install -r requirements.txt

# 記事自動生成
python scripts/generate_article.py
```

## 📊 運用

- **投稿頻度**: 毎日自動（GitHub Actions）
- **作業量**: 週1〜2回のチェックのみ
- **改善**: SEO・アフィリリンク・テンプレート更新

## 📄 ライセンス

MIT
