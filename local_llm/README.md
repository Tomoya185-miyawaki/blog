# ローカルLLM + RAGシステム セットアップガイド

このシステムは、あなたの資料を学習してそれに基づいて回答するローカルLLMです。

## 必要なもの

- Python 3.8以上
- Ollama（既にインストール済み✓）

## セットアップ手順

### 1. Pythonパッケージのインストール

```bash
cd local_llm
pip install -r requirements.txt
```

### 2. Ollamaモデルのダウンロード

軽量で高性能な日本語対応モデルをダウンロード:

```bash
# 推奨: Llama 3.2 (約2GB)
ollama pull llama3.2

# または他のモデル
# ollama pull llama3.2:1b  # より軽量版 (約1.3GB)
# ollama pull gemma2:2b    # Google製 (約1.6GB)
# ollama pull qwen2.5:3b   # 中国製、日本語強い (約2GB)
```

### 3. 資料の配置

`documents/` フォルダに学習させたい資料を配置してください:

```bash
local_llm/
  documents/
    ├── manual.pdf          # PDFファイル
    ├── notes.txt           # テキストファイル
    ├── guide.md            # Markdownファイル
    ├── report.docx         # Wordファイル
    └── subfolder/          # サブフォルダも可
        └── more_docs.txt
```

対応フォーマット:
- `.txt` - テキストファイル
- `.pdf` - PDFファイル
- `.md` - Markdownファイル
- `.docx`, `.doc` - Wordファイル

## 使い方

### 基本的な使い方

```bash
python setup_rag.py
```

起動したら、質問を入力してください。システムがあなたの資料を参照して回答します。

### 使用例

```
質問 > この資料で説明されている主要な機能は何ですか？

回答: 提供された資料によると、主要な機能は以下の通りです...

参照した資料:
  1. documents/manual.pdf
  2. documents/guide.md
```

終了するには `quit` または `exit` を入力してください。

## トラブルシューティング

### モデルがダウンロードできない

```bash
# Ollamaサービスが起動しているか確認
ollama list

# 起動していない場合
ollama serve
```

### メモリ不足エラー

より軽量なモデルを使用:
```bash
ollama pull llama3.2:1b
```

`setup_rag.py` の `model_name` を変更:
```python
model_name = "llama3.2:1b"
```

### 資料が読み込まれない

1. `documents/` フォルダに資料が配置されているか確認
2. ファイル形式が対応しているか確認（.txt, .pdf, .md, .docx）
3. ファイルのエンコーディングがUTF-8か確認

### 回答が遅い

1. より軽量なモデルを使用
2. `setup_rag.py` の `chunk_size` を小さくする
3. 検索するチャンク数を減らす（`search_kwargs={"k": 3}` → `{"k": 2}`）

## カスタマイズ

### モデルの変更

`setup_rag.py` の以下の行を編集:
```python
model_name = "llama3.2:latest"  # 他のモデルに変更可能
```

### 資料ディレクトリの変更

```python
rag = LocalLLMRAG(model_name=model_name, documents_dir="./your_directory")
```

### プロンプトのカスタマイズ

`setup_rag.py` の `create_qa_chain()` メソッド内の `template` を編集してください。

## 推奨モデル

| モデル | サイズ | 特徴 |
|--------|--------|------|
| llama3.2 | 2GB | バランス型、日本語対応良好 |
| llama3.2:1b | 1.3GB | 軽量、速度重視 |
| qwen2.5:3b | 2GB | 日本語に強い |
| gemma2:2b | 1.6GB | Google製、高品質 |

## よくある質問

**Q: オフラインで使えますか？**  
A: はい、一度モデルと資料をダウンロードすれば、完全にオフラインで動作します。

**Q: 資料は何個まで読み込めますか？**  
A: メモリが許す限り無制限ですが、数百MB程度が現実的です。

**Q: 既存の資料を更新したら？**  
A: `chroma_db/` フォルダを削除して再実行すると、資料を再読み込みします。

**Q: APIとして使えますか？**  
A: 可能です。FastAPIなどでエンドポイントを作成してください。

## 次のステップ

- Web UIを追加（Streamlit、Gradioなど）
- API化（FastAPI）
- より高度なRAG技術の導入
- マルチモーダル対応（画像、音声など）
