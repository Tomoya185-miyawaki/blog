# Freelance Dev Lab - セットアップガイド

完全無料でAI自動投稿ブログを構築する手順です。

## 📋 前提条件

- GitHubアカウント
- Node.js 18以上
- Python 3.11以上
- Git

## 🚀 セットアップ手順

### 1. リポジトリの準備

```bash
# このディレクトリで初期化
cd /Users/miyawaki/workspace/blog
git init
git add .
git commit -m "Initial commit: Freelance Dev Lab"

# GitHubにリポジトリを作成後
git remote add origin https://github.com/YOUR_USERNAME/blog.git
git branch -M main
git push -u origin main
```

### 2. 依存関係のインストール

```bash
# Node.js依存関係
npm install

# Python依存関係
pip install -r requirements.txt
```

### 3. ローカルで開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く

### 4. 記事の生成テスト

```bash
# 記事を1つ生成
python scripts/generate_article.py

# 生成された記事を確認
ls posts/
```

### 5. GitHub Pagesの設定

1. GitHubリポジトリの `Settings` → `Pages` に移動
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `root` を選択
4. Save

### 6. GitHub Actionsの有効化

1. リポジトリの `Actions` タブに移動
2. ワークフローを有効化
3. 初回は手動実行: `Run workflow`

### 7. アフィリエイトリンクの設定

`scripts/affiliate_links.py` を編集して、実際のアフィリエイトリンクを設定:

```python
affiliate_links = {
    "AI × 開発効率化": "https://px.a8.net/YOUR_LINK",
    # ...他のカテゴリ
}
```

## 🤖 AI記事生成の拡張

### ローカルLLM（Gemma等）との統合

`scripts/generate_article.py` の `generate_article_content()` 関数を編集:

```python
def generate_article_content(category: str, title: str, tags: list) -> str:
    # ここでローカルLLMを呼び出す
    # 例: Ollamaの場合
    import requests
    
    prompt = f"""
    以下の記事を書いてください:
    タイトル: {title}
    カテゴリ: {category}
    タグ: {', '.join(tags)}
    
    読者: エンジニア、フリーランス
    文字数: 2000文字以上
    形式: Markdown
    """
    
    response = requests.post(
        'http://localhost:11434/api/generate',
        json={'model': 'gemma2', 'prompt': prompt}
    )
    
    return response.json()['response']
```

## 📅 自動投稿スケジュール

`.github/workflows/auto-post.yml` でcron設定を変更:

```yaml
on:
  schedule:
    # 毎日9:00 UTC（日本時間18:00）
    - cron: '0 9 * * *'
    
    # 毎日2回投稿したい場合
    # - cron: '0 0,12 * * *'
```

## 🎨 デザインのカスタマイズ

`src/app/globals.css` と `tailwind.config.js` を編集してデザインを変更できます。

## 📊 アクセス解析

Google Analyticsを追加する場合:

1. `src/app/layout.tsx` に以下を追加:

```tsx
import Script from 'next/script'

// <head>内に追加
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 🔧 トラブルシューティング

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .next node_modules
npm install
npm run build
```

### GitHub Actionsが動かない

1. リポジトリの `Settings` → `Actions` → `General`
2. `Workflow permissions` を `Read and write permissions` に変更

### 記事が表示されない

1. `posts/` ディレクトリにMarkdownファイルがあるか確認
2. Frontmatterの形式が正しいか確認
3. ビルドし直す: `npm run build`

## 💡 運用のコツ

1. **週1回のチェック**: 生成された記事の品質を確認
2. **SEOキーワード**: `scripts/generate_article.py` のタイトルを最適化
3. **アフィリエイト最適化**: 収益の高いリンクに随時更新
4. **SNS連携**: 記事公開時にTwitter等で共有

## 📚 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [A8.net](https://www.a8.net/)

---

何か問題があれば、GitHubのIssueで質問してください！
