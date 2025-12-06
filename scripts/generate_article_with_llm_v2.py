"""
ローカルLLM + RAGを使った記事自動生成スクリプト（プロンプト指定対応版）
SEOガイドなどの資料を学習させた上で、質の高い記事を生成します
"""

import sys
import os
from datetime import datetime
import random
import argparse

# 親ディレクトリのモジュールをインポート可能にする
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from local_llm.setup_rag import LocalLLMRAG
from scripts.affiliate_links import get_affiliate_link

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

# カテゴリごとのキーワード
CATEGORY_KEYWORDS = {
    "AI × 開発効率化": ["AI", "効率化", "開発ツール", "自動化", "LLM", "GitHub Copilot"],
    "フリーランス戦略": ["フリーランス", "案件獲得", "営業", "キャリア", "収入アップ"],
    "Web開発": ["Next.js", "FastAPI", "TypeScript", "React", "Python"],
    "DevOps": ["Docker", "CI/CD", "Kubernetes", "自動化", "インフラ"],
    "セキュリティ": ["セキュリティ", "OSINT", "脆弱性診断", "ゼロトラスト"],
}


class ArticleGenerator:
    """RAGを活用した記事生成クラス"""
    
    def __init__(self, model_name="gemma3:4b", documents_dir="./local_llm/documents"):
        """
        初期化
        
        Args:
            model_name: 使用するOllamaモデル名
            documents_dir: 学習させる資料が入っているディレクトリ
        """
        print("📚 ローカルLLM + RAGシステムを初期化しています...")
        self.rag = LocalLLMRAG(model_name=model_name, documents_dir=documents_dir)
        
        if not self.rag.setup(True):
            raise ValueError("RAGシステムのセットアップに失敗しました")
        
        print("✅ RAGシステムの初期化が完了しました\n")
    
    def generate_title(self, category: str, keywords: list, custom_prompt: str = None) -> str:
        """
        記事タイトルを生成
        
        Args:
            category: カテゴリ名
            keywords: キーワードリスト
            custom_prompt: カスタムプロンプト（指定時はこれを優先）
            
        Returns:
            記事タイトル
        """
        if custom_prompt:
            prompt = f"""あなたはSEOに詳しいコンテンツライターです。
以下のリクエストに基づいて、魅力的なブログ記事のタイトルを1つだけ生成してください。

リクエスト: {custom_prompt}

条件:
- 30-40文字程度
- SEOを意識したキーワードを含める
- 読者の興味を引くタイトル
- 数字を入れると効果的

タイトルのみを出力してください。説明は不要です。
"""
        else:
            prompt = f"""あなたはSEOに詳しいコンテンツライターです。
以下の条件で、魅力的なブログ記事のタイトルを1つだけ生成してください。

カテゴリ: {category}
キーワード: {', '.join(keywords)}

条件:
- 30-40文字程度
- 数字を含める（例: 5つの方法、3倍にする）
- 読者のベネフィットが明確
- SEOに効果的
- クリックしたくなる魅力的な表現

タイトルのみを出力してください。説明や前置きは不要です。
"""
        
        response = self.rag.llm.invoke(prompt)
        # 余分な改行や引用符を削除
        title = response.strip().strip('"').strip("'").strip()
        return title
    
    def generate_article_content(self, title: str, category: str, keywords: list, custom_prompt: str = None) -> str:
        """
        記事本文を生成（RAGで参照資料を活用）
        
        Args:
            title: 記事タイトル
            category: カテゴリ
            keywords: キーワードリスト
            custom_prompt: カスタムプロンプト（指定時はこれを優先）
            
        Returns:
            記事本文（Markdown形式）
        """
        # RAGで関連する情報を取得
        if custom_prompt:
            context_query = f"{custom_prompt} に関するSEOベストプラクティスとコンテンツ作成のガイドライン"
        else:
            context_query = f"{category}に関するSEOベストプラクティスとコンテンツ作成のガイドライン"
        
        retriever = self.rag.create_qa_chain()
        relevant_docs = retriever.invoke(context_query)
        
        # コンテキストを構築
        context = "\n".join([doc.page_content for doc in relevant_docs[:2]])
        
        # 記事生成プロンプト
        if custom_prompt:
            # カスタムプロンプトが指定されている場合
            prompt = f"""あなたは経験豊富なテックブロガーです。
以下の情報を参考に、エンジニア向けの実用的で価値の高い記事を執筆してください。

【参考資料（SEOガイドライン）】
{context}

【記事リクエスト】
{custom_prompt}

【記事情報】
タイトル: {title}
カテゴリ: {category}

【執筆条件】
- 文字数: 2000-3000文字
- トーン: 専門的だが親しみやすい
- 構成: 導入 → 本文（複数セクション） → まとめ
- Markdown形式で記述
- 実践的なアドバイスを含める
- リクエストされた内容に焦点を当てる

【記事構成】
## はじめに
- 問題提起や課題の明確化
- 記事で解決できることを提示

## 本文
- 実例やコード例を含める
- 箇条書きや番号リストを活用

## まとめ
- 主要ポイントを振り返る
- 次のアクションを提案

Markdown形式で記事本文のみを出力してください。タイトル（#）は含めないでください。
"""
        else:
            # デフォルトのプロンプト
            prompt = f"""あなたは経験豊富なテックブロガーです。
以下の情報を参考に、エンジニア向けの実用的で価値の高い記事を執筆してください。

【参考資料（SEOガイドライン）】
{context}

【記事情報】
タイトル: {title}
カテゴリ: {category}
キーワード: {', '.join(keywords)}

【執筆条件】
- 文字数: 2000-3000文字
- トーン: 専門的だが親しみやすい
- 構成: 導入 → 本文（複数セクション） → まとめ
- Markdown形式で記述
- 実践的なアドバイスを含める

【記事構成】
## はじめに
- 問題提起や課題の明確化
- 記事で解決できることを提示

## 本文
- 実例やコード例を含める
- 箇条書きや番号リストを活用

## まとめ
- 主要ポイントを振り返る
- 次のアクションを提案

Markdown形式で記事本文のみを出力してください。タイトル（#）は含めないでください。
"""
        
        print(f"📝 記事を生成中... (タイトル: {title})")
        print("   ⏳ AIが記事を執筆しています。少々お待ちください...\n")
        
        content = self.rag.llm.invoke(prompt)
        return content.strip()
    
    def generate_tags(self, title: str, content: str, category_keywords: list) -> list:
        """
        記事内容からタグを生成
        
        Args:
            title: 記事タイトル
            content: 記事本文
            category_keywords: カテゴリのキーワードリスト
            
        Returns:
            タグリスト
        """
        # シンプルにカテゴリキーワードから3-4個選択
        return random.sample(category_keywords, min(4, len(category_keywords)))
    
    def generate_article(self, category: str = None, custom_prompt: str = None):
        """
        記事を自動生成してMarkdownファイルとして保存
        
        Args:
            category: カテゴリ名（Noneの場合はランダム選択）
            custom_prompt: カスタムプロンプト（指定時は自由テーマで生成）
            
        Returns:
            生成されたファイルパス
        """
        if custom_prompt:
            print(f"📝 カスタムリクエスト: {custom_prompt}\n")
            # カスタムプロンプトの場合はカテゴリを自動推定
            if category is None:
                category = "AI × 開発効率化"  # デフォルトカテゴリ
            keywords = ["カスタム", "技術", "開発"]
        else:
            # カテゴリ選択
            if category is None:
                category = random.choice(CATEGORIES)
            
            print(f"🎯 カテゴリ: {category}")
            
            # キーワード取得
            keywords = CATEGORY_KEYWORDS.get(category, ["技術", "開発", "効率化"])
            selected_keywords = random.sample(keywords, min(3, len(keywords)))
            keywords = selected_keywords
            
            print(f"🔑 キーワード: {', '.join(keywords)}")
        
        # タイトル生成
        print("\n📌 タイトルを生成中...")
        title = self.generate_title(category, keywords, custom_prompt)
        print(f"✅ タイトル: {title}\n")
        
        # 記事本文生成
        content = self.generate_article_content(title, category, keywords, custom_prompt)
        
        # タグ生成
        tags = self.generate_tags(title, content, keywords if custom_prompt else CATEGORY_KEYWORDS.get(category, keywords))
        
        # アフィリエイトリンク取得
        affiliate_link = get_affiliate_link(category)
        
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
        
        print(f"\n✅ 記事を生成しました: {filename}")
        print(f"   📄 タイトル: {title}")
        print(f"   📁 カテゴリ: {category}")
        print(f"   🏷️  タグ: {', '.join(tags)}")
        print(f"   📊 文字数: {len(content)}文字")
        
        return filename


def main():
    """メイン実行"""
    # コマンドライン引数のパース
    parser = argparse.ArgumentParser(
        description="ローカルLLM + RAGを使った記事自動生成",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
使用例:
  # ランダムなカテゴリで記事生成
  python scripts/generate_article_with_llm_v2.py
  
  # 特定のカテゴリで記事生成
  python scripts/generate_article_with_llm_v2.py --category "Web開発"
  
  # カスタムプロンプトで記事生成
  python scripts/generate_article_with_llm_v2.py --prompt "Next.js 15の新機能について解説する記事"
  
  # Makefileから実行
  make llm PROMPT="Docker Composeの実践的な使い方"
        """
    )
    
    parser.add_argument(
        '--category',
        type=str,
        help='記事のカテゴリ（指定しない場合はランダム）',
        choices=CATEGORIES
    )
    
    parser.add_argument(
        '--prompt',
        type=str,
        help='カスタムプロンプト（例: "TypeScriptの型システムについて詳しく解説"）'
    )
    
    args = parser.parse_args()
    
    print("="*60)
    print("🤖 ローカルLLM記事自動生成システム")
    print("="*60)
    print()
    
    try:
        # 記事生成システムの初期化
        generator = ArticleGenerator()
        
        # 記事生成
        generator.generate_article(
            category=args.category,
            custom_prompt=args.prompt
        )
        
        print("\n" + "="*60)
        print("✨ 記事生成が完了しました！")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ エラーが発生しました: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
