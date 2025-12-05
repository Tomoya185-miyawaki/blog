import sys
sys.path.append('.')
from generate_article import SAMPLE_ARTICLES, generate_article_content, POSTS_DIR, get_affiliate_link
from datetime import datetime
import os

categories_to_generate = list(SAMPLE_ARTICLES.keys())

print("=" * 60)
print(f"全{len(categories_to_generate)}カテゴリの記事を生成します")
print("=" * 60)

for category in categories_to_generate:
    article_data = SAMPLE_ARTICLES[category]
    title = article_data["titles"][0]
    tags = article_data["tags"][:3]
    
    affiliate_link = get_affiliate_link(category)
    content = generate_article_content(category, title, tags)
    content += f"\n\n---\n\n💡 **この記事が役立ったら、こちらもチェック！**\n\n[おすすめツール・サービスはこちら]({affiliate_link})\n"
    
    date = datetime.now().strftime("%Y-%m-%d")
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")[:14]
    
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
    
    filename = f"{POSTS_DIR}/{timestamp}.md"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(markdown)
    
    print(f"✅ {category}: {title}")

print("=" * 60)
print("完了！")
print("=" * 60)
