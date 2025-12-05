# 📦 Freelance Dev Lab - プロジェクト構成

## 🎯 プロジェクト概要

**Freelance Dev Lab** は、技術系×フリーランス向けの完全自動化アフィリエイトブログシステムです。

- **完全無料**: GitHub Pages + GitHub Actions
- **AI自動投稿**: 毎日記事を自動生成・公開
- **収益化**: カテゴリ別アフィリエイトリンク自動挿入
- **ミニマルデザイン**: 白基調の読みやすいデザイン

## 📂 ディレクトリ構成

```
blog/
├── .github/
│   └── workflows/
│       └── auto-post.yml          # GitHub Actions設定
├── public/
│   └── images/                    # 画像ファイル
├── posts/                         # Markdown記事
│   └── 20251204000000-welcome.md  # サンプル記事
├── scripts/
│   ├── affiliate_links.py         # アフィリエイトリンク管理
│   └── generate_article.py        # AI記事生成スクリプト
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # Aboutページ
│   │   ├── posts/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 記事詳細ページ
│   │   ├── globals.css           # グローバルスタイル
│   │   ├── layout.tsx            # レイアウト
│   │   └── page.tsx              # トップページ
│   ├── components/
│   │   ├── Header.tsx            # ヘッダー
│   │   ├── Footer.tsx            # フッター
│   │   └── PostCard.tsx          # 記事カード
│   └── lib/
│       └── posts.ts              # 記事取得ロジック
├── .eslintrc.json
├── .gitignore
├── next.config.js                # Next.js設定
├── package.json
├── postcss.config.js
├── README.md
├── requirements.txt              # Python依存関係
├── SETUP.md                      # セットアップガイド
├── tailwind.config.js
└── tsconfig.json
```

## 🔑 主要ファイルの役割

### フロントエンド (Next.js)

| ファイル | 役割 |
|---------|------|
| `src/app/layout.tsx` | 全ページ共通レイアウト |
| `src/app/page.tsx` | トップページ（記事一覧） |
| `src/app/posts/[slug]/page.tsx` | 記事詳細ページ |
| `src/components/Header.tsx` | ヘッダーコンポーネント |
| `src/components/Footer.tsx` | フッターコンポーネント |
| `src/components/PostCard.tsx` | 記事カードコンポーネント |
| `src/lib/posts.ts` | Markdown記事読み込みロジック |

### バックエンド (Python)

| ファイル | 役割 |
|---------|------|
| `scripts/affiliate_links.py` | カテゴリ別アフィリリンク定義 |
| `scripts/generate_article.py` | AI記事自動生成スクリプト |

### CI/CD

| ファイル | 役割 |
|---------|------|
| `.github/workflows/auto-post.yml` | 自動投稿ワークフロー |

### 設定ファイル

| ファイル | 役割 |
|---------|------|
| `next.config.js` | Next.js設定（SSG、GitHub Pages対応） |
| `tailwind.config.js` | Tailwind CSS設定 |
| `tsconfig.json` | TypeScript設定 |
| `package.json` | Node.js依存関係 |
| `requirements.txt` | Python依存関係 |

## 🔄 自動化フロー

```
1. GitHub Actions (cron: 毎日9:00 UTC)
   ↓
2. Python: generate_article.py 実行
   - カテゴリ選択
   - タイトル生成
   - AI本文生成（TODO: LLM統合）
   - アフィリエイトリンク挿入
   - Markdownファイル作成
   ↓
3. Git commit & push
   ↓
4. Next.js ビルド
   ↓
5. GitHub Pages デプロイ
   ↓
6. ブログ公開 ✅
```

## 🎨 デザイン仕様

- **カラー**: 白基調、アクセントカラーはブルー (#3b82f6)
- **フォント**: システムデフォルト（サンセリフ）
- **レスポンシブ**: モバイル・タブレット・PC対応
- **レイアウト**: ミニマルで読みやすい

## 📝 記事フォーマット

Markdown記事の構造:

```markdown
---
title: "記事タイトル"
date: "2025-12-04"
category: "AI × 開発効率化"
tags: ["AI", "効率化", "開発"]
thumbnail: "/images/sample.png"
affiliate_link: "https://px.a8.net/xxx"
---

# 記事タイトル

## セクション1

本文...

## セクション2

本文...

---

💡 **この記事が役立ったら、こちらもチェック！**

[おすすめツール・サービスはこちら](アフィリエイトリンク)
```

## 💰 収益化戦略

### カテゴリ別アフィリエイト

| カテゴリ | 商材例 | 単価目安 |
|---------|-------|---------|
| フリーランス戦略 | エージェント登録 | 1〜4万円 |
| AI × 開発効率化 | AIツール | 数千円 |
| Web開発 | 技術書・教材 | 数百円〜 |
| DevOps | VPS・クラウド | 数千円 |
| セキュリティ | VPN・ツール | 数千円 |

### 目標

- **短期（3ヶ月）**: 月5万円
- **中期（6ヶ月）**: 月10万円
- **長期（1年）**: 月30万円

## 🚀 次のステップ

1. **AI統合**: ローカルLLM（Gemma）で記事生成
2. **SEO最適化**: キーワード調査と記事戦略
3. **SNS連携**: Twitter自動投稿
4. **アクセス解析**: Google Analytics設定
5. **メール配信**: ニュースレター機能

## 📚 技術スタック詳細

### フロントエンド
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

### バックエンド
- Python 3.11+
- (将来) Gemma / Ollama

### インフラ
- GitHub Pages (ホスティング)
- GitHub Actions (CI/CD)

### 開発ツール
- ESLint
- Prettier (推奨)
- Git

## 🛠 カスタマイズポイント

### 1. デザイン変更
`tailwind.config.js` でカラーやフォントを変更

### 2. カテゴリ追加
- `scripts/generate_article.py` の `CATEGORIES` に追加
- `scripts/affiliate_links.py` にリンク追加

### 3. 記事テンプレート追加
`scripts/generate_article.py` の `SAMPLE_ARTICLES` に追加

### 4. 投稿頻度変更
`.github/workflows/auto-post.yml` の `cron` を変更

## 📊 パフォーマンス目標

- **Lighthouse Score**: 90+
- **ページ読み込み**: 2秒以内
- **SEO Score**: 90+
- **アクセシビリティ**: 90+

## 🔒 セキュリティ

- GitHub Actionsのシークレット管理
- アフィリエイトリンクの安全性確認
- 依存関係の定期更新

---

**Happy Coding! 🚀**
