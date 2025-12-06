"""
ローカルLLM + RAGを使った記事自動生成スクリプト
SEOガイドなどの資料を学習させた上で、質の高い記事を生成します
"""

import sys
import os
from datetime import datetime
import random

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
    
    def generate_title(self, category: str, keywords: list) -> str:
        """
        記事タイトルを生成
        
        Args:
            category: カテゴリ名
            keywords: キーワードリスト
            
        Returns:
            記事タイトル
        """
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
    
    def generate_article_content(self, title: str, category: str, keywords: list) -> str:
        """
        記事本文を生成（RAGで学習した内容を反映）
        
        Args:
            title: 記事タイトル
            category: カテゴリ名
            keywords: キーワードリスト
            
        Returns:
            記事本文（Markdown形式）
        """
        # RAGで関連情報を取得
        context_query = f"{category}に関するSEOベストプラクティスとコンテンツ作成のガイドライン"
        retriever = self.rag.create_qa_chain()
        relevant_docs = retriever.invoke(context_query)
        
        # コンテキストを構築
        context = "\n".join([doc.page_content for doc in relevant_docs[:2]])
        
        prompt = f"""あなたは経験豊富なテックブロガーです。
以下の条件で、実践的で価値のあるブログ記事を執筆してください。

【参考資料（SEOガイドライン）】
{context}

【記事情報】
タイトル: {title}
カテゴリ: {category}
キーワード: {', '.join(keywords)}

【記事の要件】
1. 読者にとって実践的で役立つ内容
2. 具体例やコード例を含める
3. SEOを意識した自然な文章
4. 見出し構造を適切に使用（##, ###）
5. 2000-3000文字程度
6. 専門的だが分かりやすい表現

【記事構成】
## はじめに
- 読者の課題を明確にする
- 記事で得られる価値を示す

## [メインコンテンツ（2-4セクション）]
- 具体的な方法やテクニックを解説
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
    
    def generate_article(self, category: str = None, interactive: bool = True):
        """
        記事を自動生成してMarkdownファイルとして保存
        
        Args:
            category: カテゴリ名（Noneの場合はランダム選択）
            interactive: タイトル確認を行うか（デフォルト: True）
            
        Returns:
            生成されたファイルパス
        """
        # 使用済みカテゴリを追跡（NGで別のカテゴリを提案するため）
        used_categories = []
        
        # タイトル生成とユーザー確認ループ
        title = None
        final_category = category
        final_keywords = None
        
        while title is None:
            # カテゴリ選択（NGの場合は未使用のカテゴリから選択）
            if final_category is None or final_category in used_categories:
                available_categories = [c for c in CATEGORIES if c not in used_categories]
                if not available_categories:
                    # 全カテゴリを使い切ったらリセット
                    used_categories = []
                    available_categories = CATEGORIES
                final_category = random.choice(available_categories)
            
            used_categories.append(final_category)
            
            print(f"\n🎯 カテゴリ: {final_category}")
            
            # キーワード取得
            keywords = CATEGORY_KEYWORDS.get(final_category, ["技術", "開発", "効率化"])
            selected_keywords = random.sample(keywords, min(3, len(keywords)))
            final_keywords = selected_keywords
            
            print(f"🔑 キーワード: {', '.join(selected_keywords)}")
            
            print("\n📌 タイトルを生成中...")
            candidate_title = self.generate_title(final_category, selected_keywords)
            print(f"\n✨ 生成されたタイトル: {candidate_title}")
            
            if interactive:
                print("\n" + "="*60)
                user_input = input("このタイトルで記事を作成しますか？ (OK/NG): ").strip().upper()
                print("="*60 + "\n")
                
                if user_input == "OK":
                    title = candidate_title
                    print(f"✅ タイトル確定: {title}\n")
                elif user_input == "NG":
                    print("🔄 別のカテゴリとテーマで新しいタイトルを生成します...\n")
                    final_category = None  # 次のループで新しいカテゴリを選択
                    continue
                else:
                    print("⚠️  'OK'または'NG'を入力してください\n")
                    continue
            else:
                title = candidate_title
                print(f"✅ タイトル: {title}\n")
        
        # 記事本文生成
        content = self.generate_article_content(title, final_category, final_keywords)
        
        # タグ生成
        all_keywords = CATEGORY_KEYWORDS.get(final_category, final_keywords)
        tags = self.generate_tags(title, content, all_keywords)
        
        # アフィリエイトリンク取得
        affiliate_link = get_affiliate_link(final_category)
        
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
category: "{final_category}"
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
        print(f"   📁 カテゴリ: {final_category}")
        print(f"   🏷️  タグ: {', '.join(tags)}")
        print(f"   📊 文字数: {len(content)}文字")
        
        return filename


def main():
    """メイン実行"""
    print("="*60)
    print("🤖 ローカルLLM記事自動生成システム")
    print("="*60)
    print()
    
    try:
        # 記事生成システムの初期化
        generator = ArticleGenerator()
        
        # 記事生成
        generator.generate_article()
        
        print("\n" + "="*60)
        print("✨ 記事生成が完了しました！")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ エラーが発生しました: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
