# 学習資料ディレクトリ

このディレクトリには、記事生成AIに学習させたい資料を配置してください。

## 推奨資料

### SEO関連
- **Google検索セントラル - SEOスタートガイド**
  - https://developers.google.com/search/docs/fundamentals/seo-starter-guide
  - PDFやテキストで保存して配置

- **検索エンジン最適化（SEO）クイックチェックシート**
  - https://developers.google.com/search/docs/fundamentals/seo-checklist

### コンテンツライティング
- あなた独自のライティングガイドライン
- 過去に評価の高かった記事
- ブランドボイスガイド

### 技術資料
- 特定技術の公式ドキュメント
- ベストプラクティス集
- 業界標準ガイド

## ファイル形式

以下の形式に対応しています:
- `.txt` - テキストファイル
- `.md` - Markdownファイル  
- `.pdf` - PDFファイル
- `.docx` - Wordファイル

## 配置例

```
documents/
├── seo-starter-guide.pdf          # GoogleのSEOガイド
├── writing-guidelines.md          # 自社ライティングガイド
├── best-practices.txt             # ベストプラクティス
└── technical/
    ├── nextjs-guide.md            # Next.jsガイド
    └── security-checklist.pdf     # セキュリティチェックリスト
```

## 使い方

1. このディレクトリに資料を配置
2. `python scripts/generate_article_with_llm.py` を実行
3. AIが資料を参照しながら記事を生成

## ヒント

- **質の高い資料を使う**: AIの出力品質は学習資料の質に依存します
- **定期的に更新**: 最新のSEOトレンドや技術情報を反映
- **構造化された資料**: 見出しや箇条書きが明確な資料が効果的
- **関連性の高い資料**: 記事のカテゴリに関連する資料を重点的に
