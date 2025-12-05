"""
記事自動生成スクリプト
AI生成した記事本文をMarkdown形式で保存します
"""

from datetime import datetime
import os
import random
from affiliate_links import get_affiliate_link

# 設定
POSTS_DIR = "posts"
os.makedirs(POSTS_DIR, exist_ok=True)

# カテゴリとテンプレートの定義
CATEGORIES = [
    "AI × 開発効率化",
    "フリーランス戦略",
    "Web開発",
    "DevOps",
    "セキュリティ",
    "クラウド・インフラ",
    "マネタイズ",
    "ツールレビュー",
]

# サンプル記事テンプレート（実際にはAI生成に置き換える）
SAMPLE_ARTICLES = {
    "AI × 開発効率化": {
        "titles": [
            "AIで開発効率を3倍にする5つの方法",
            "GitHub Copilot vs Claude Code 徹底比較",
            "LLMを活用した自動コード生成の実践",
        ],
        "tags": ["AI", "効率化", "開発ツール", "自動化"],
    },
    "フリーランス戦略": {
        "titles": [
            "フリーランスエンジニアが月100万円稼ぐまでのロードマップ",
            "案件獲得率を2倍にする営業テクニック",
            "確定申告で損しないための完全ガイド",
        ],
        "tags": ["フリーランス", "案件獲得", "営業", "キャリア"],
    },
    "Web開発": {
        "titles": [
            "Next.js 14 App Routerの完全ガイド",
            "FastAPIで作る高速RESTful API",
            "TypeScriptで型安全な開発を実現する方法",
        ],
        "tags": ["Next.js", "FastAPI", "TypeScript", "Web開発"],
    },
    "DevOps": {
        "titles": [
            "Docker ComposeでローカルWeb開発環境を構築",
            "GitHub Actionsで実現するCI/CD自動化",
            "Kubernetesの基礎から本番運用まで",
        ],
        "tags": ["Docker", "CI/CD", "Kubernetes", "自動化"],
    },
    "セキュリティ": {
        "titles": [
            "エンジニアが知るべきOSINT入門",
            "Webアプリケーションの脆弱性診断手法",
            "ゼロトラストセキュリティの実装方法",
        ],
        "tags": ["セキュリティ", "OSINT", "脆弱性診断", "ゼロトラスト"],
    },
}


def generate_article_content(category: str, title: str, tags: list) -> str:
    """
    記事本文を生成（ここでAI生成に置き換え可能）
    
    Args:
        category: カテゴリ名
        title: 記事タイトル
        tags: タグリスト
        
    Returns:
        記事本文（Markdown形式）
    """
    # TODO: ここでローカルLLM（Gemma等）を使って記事生成
    # 現在はサンプルテキストを返す
    
    content = f"""# {title}

## はじめに

この記事では、{category}に関する実践的な内容をお届けします。

## 概要

エンジニアとして効率的に働くためには、最新の技術とツールを活用することが重要です。

## 詳細

### ポイント1

具体的な実装方法や考え方を解説します。

### ポイント2

実務で使える実践的なテクニックを紹介します。

### ポイント3

よくある落とし穴と対策について説明します。

## まとめ

今回紹介した内容を実践することで、開発効率が大幅に向上します。

"""
    return content


def generate_article():
    """記事を自動生成してMarkdownファイルとして保存"""
    
    # ランダムにカテゴリを選択（実際にはキーワード戦略に基づく）
    category = random.choice(list(SAMPLE_ARTICLES.keys()))
    
    # カテゴリに応じたタイトルとタグを取得
    article_data = SAMPLE_ARTICLES[category]
    title = random.choice(article_data["titles"])
    tags = random.sample(article_data["tags"], min(3, len(article_data["tags"])))
    
    # アフィリエイトリンクを取得
    affiliate_link = get_affiliate_link(category)
    
    # 記事本文を生成
    content = generate_article_content(category, title, tags)
    
    # アフィリエイトリンクを記事末尾に追加
    content += f"\n\n---\n\n"
    content += f"💡 **この記事が役立ったら、こちらもチェック！**\n\n"
    content += f"[おすすめツール・サービスはこちら]({affiliate_link})\n"
    
    # 現在日時
    date = datetime.now().strftime("%Y-%m-%d")
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    # Frontmatter付きMarkdown生成
    markdown = f"""---
title: "{title}"
date: "{date}"
category: "{category}"
tags: {tags}
thumbnail: "/images/default-thumbnail.svg"
affiliate_link: "{affiliate_link}"
---

{content}
"""
    
    # ファイル名生成（タイムスタンプベース）
    filename = f"{POSTS_DIR}/{timestamp}.md"
    
    # ファイルに保存
    with open(filename, "w", encoding="utf-8") as f:
        f.write(markdown)
    
    print(f"✅ 記事を生成しました: {filename}")
    print(f"   タイトル: {title}")
    print(f"   カテゴリ: {category}")
    print(f"   タグ: {', '.join(tags)}")
    
    return filename


if __name__ == "__main__":
    generate_article()
