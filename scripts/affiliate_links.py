# カテゴリごとのアフィリエイトリンク設定
# 実際のアフィリエイトリンクはA8.netなどから取得して設定してください

affiliate_links = {
    "AI × 開発効率化": "https://px.a8.net/ai-tool",
    "フリーランス戦略": "https://px.a8.net/freelance-agent",
    "Web開発": "https://px.a8.net/web-dev-course",
    "DevOps": "https://px.a8.net/devops-service",
    "セキュリティ": "https://px.a8.net/security-tool",
    "OSINT": "https://px.a8.net/osint-tool",
    "クラウド・インフラ": "https://px.a8.net/cloud-service",
    "フロントエンド": "https://px.a8.net/frontend-tool",
    "マネタイズ": "https://px.a8.net/monetize-tool",
    "ツールレビュー": "https://px.a8.net/tool-review",
}

def get_affiliate_link(category: str) -> str:
    """
    カテゴリに対応したアフィリエイトリンクを返す
    カテゴリ未登録の場合はデフォルトリンクを返す
    
    Args:
        category: 記事のカテゴリ名
        
    Returns:
        アフィリエイトリンクURL
    """
    default_link = "https://px.a8.net/default"
    return affiliate_links.get(category, default_link)
