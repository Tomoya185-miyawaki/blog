#!/usr/bin/env python3
import argparse
import sys
from bs4 import BeautifulSoup
import requests
from markdownify import markdownify as md

def fetch_url(url, timeout=15):
    resp = requests.get(url, timeout=timeout, headers={
        "User-Agent": "Mozilla/5.0"
    })
    resp.raise_for_status()
    return resp.text

def extract_main_html(html):
    soup = BeautifulSoup(html, "html.parser")

    main = soup.find("main")
    if main:
        return str(main)

    article = soup.find("article")
    if article:
        return str(article)

    body = soup.find("body")
    return str(body) if body else html

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    html = fetch_url(args.url)
    content = extract_main_html(html)
    markdown = md(content)

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(markdown)

    print(f"✔ Saved: {args.output}")

if __name__ == "__main__":
    main()
