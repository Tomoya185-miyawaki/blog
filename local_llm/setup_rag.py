"""
ローカルLLM + RAGシステム
あなたの資料を読み込んで、それに基づいて回答するLLMシステム
"""
import os
from pathlib import Path
from langchain_community.document_loaders import (
    TextLoader,
    PDFMinerLoader,
    Docx2txtLoader
)
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms import Ollama

class LocalLLMRAG:
    def __init__(self, model_name="gemma3:4b", embedding_model="nomic-embed-text", documents_dir="./documents"):
        """
        初期化
        Args:
            model_name: 使用するOllamaモデル名（テキスト生成用）
            embedding_model: 埋め込み用モデル名
            documents_dir: 学習させる資料が入っているディレクトリ
        """
        self.model_name = model_name
        self.embedding_model = embedding_model
        self.documents_dir = Path(documents_dir)
        self.documents_dir.mkdir(exist_ok=True)
        
        # Ollamaの設定
        self.embeddings = OllamaEmbeddings(
            model=embedding_model,
            base_url="http://localhost:11434"
        )
        self.llm = Ollama(
            model=model_name,
            temperature=0.7,
            base_url="http://localhost:11434"
        )
        
        # ベクトルストアのパス
        self.vector_db_path = "./chroma_db"
        self.vector_store = None
        
    def load_documents(self):
        """資料ディレクトリから全てのドキュメントを読み込む"""
        documents = []
        
        for file_path in self.documents_dir.rglob("*"):
            if file_path.is_file():
                try:
                    if file_path.suffix in [".txt", ".md"]:
                        loader = TextLoader(str(file_path), encoding="utf-8")
                    elif file_path.suffix == ".pdf":
                        loader = PDFMinerLoader(str(file_path))
                    elif file_path.suffix in [".docx", ".doc"]:
                        loader = Docx2txtLoader(str(file_path))
                    else:
                        print(f"スキップ: {file_path} (非対応フォーマット)")
                        continue
                    
                    docs = loader.load()
                    documents.extend(docs)
                    print(f"読み込み完了: {file_path.name}")
                except Exception as e:
                    print(f"エラー: {file_path.name} - {str(e)}")
        
        return documents
    
    def create_vector_store(self, documents):
        """ドキュメントをチャンク分割してベクトルストアに保存"""
        # テキストを適切なサイズに分割
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        
        splits = text_splitter.split_documents(documents)
        print(f"ドキュメントを{len(splits)}個のチャンクに分割しました")
        
        # ベクトルストアの作成
        self.vector_store = Chroma.from_documents(
            documents=splits,
            embedding=self.embeddings,
            persist_directory=self.vector_db_path
        )
        print("ベクトルストアの作成が完了しました")
    
    def load_vector_store(self):
        """既存のベクトルストアを読み込む"""
        if os.path.exists(self.vector_db_path):
            try:
                self.vector_store = Chroma(
                    persist_directory=self.vector_db_path,
                    embedding_function=self.embeddings
                )
                # 検証: 実際にデータが読み込まれているか確認
                if self.vector_store._collection.count() > 0:
                    print("既存のベクトルストアを読み込みました")
                    return True
                else:
                    print("ベクトルストアが空です。再作成します。")
                    self.vector_store = None
                    return False
            except Exception as e:
                print(f"ベクトルストアの読み込みエラー: {e}")
                self.vector_store = None
                return False
        return False
    
    def setup(self, force_reload=False):
        """RAGシステムのセットアップ"""
        if not force_reload and self.load_vector_store():
            print("既存の知識ベースを使用します")
        else:
            print("資料を読み込んでいます...")
            documents = self.load_documents()
            
            if not documents:
                print("警告: 資料が見つかりません。documentsフォルダに資料を配置してください")
                return False
            
            print(f"{len(documents)}個のドキュメントを読み込みました")
            self.create_vector_store(documents)
        
        # 確認
        if self.vector_store is None:
            print("エラー: ベクトルストアの初期化に失敗しました")
            return False
            
        return True
    
    def create_qa_chain(self):
        """質問応答チェーンの作成"""
        if not self.vector_store:
            raise ValueError("ベクトルストアが初期化されていません。setup()を先に実行してください")
        
        return self.vector_store.as_retriever(search_kwargs={"k": 3})
    
    def ask(self, question):
        """質問する"""
        retriever = self.create_qa_chain()
        
        # 関連ドキュメントを取得
        relevant_docs = retriever.invoke(question)
        
        # コンテキストを構築
        context = "\n\n".join([doc.page_content for doc in relevant_docs])
        
        # プロンプトを構築
        prompt = f"""以下の文脈を使用して質問に答えてください。
文脈に情報がない場合は、「提供された資料にはその情報がありません」と答えてください。
日本語で丁寧に回答してください。

文脈:
{context}

質問: {question}

回答:"""
        
        # LLMで回答を生成
        print(f"\n質問: {question}")
        print(f"\n回答: ", end="", flush=True)
        
        response = self.llm.invoke(prompt)
        print(response)
        
        if relevant_docs:
            print("\n参照した資料:")
            for i, doc in enumerate(relevant_docs, 1):
                source = doc.metadata.get('source', '不明')
                print(f"  {i}. {source}")
        
        return {
            'result': response,
            'source_documents': relevant_docs
        }

def main():
    """メイン実行"""
    print("=== ローカルLLM + RAGシステム ===\n")
    
    # 使用するモデルを選択（必要に応じて変更）
    # 利用可能なモデル: llama3.2, llama2, mistral, gemma など
    model_name = "gemma3:4b"
    
    print(f"使用モデル: {model_name}")
    print("資料ディレクトリ: ./documents\n")
    
    # RAGシステムの初期化
    rag = LocalLLMRAG(model_name=model_name, documents_dir="./documents")
    
    # セットアップ
    if not rag.setup(True):
        print("\nセットアップに失敗しました")
        return
    
    print("\n=== セットアップ完了 ===")
    print("質問を入力してください（終了するには 'quit' または 'exit' を入力）\n")
    
    # 対話ループ
    while True:
        try:
            question = input("\n質問 > ").strip()
            
            if question.lower() in ['quit', 'exit', '終了']:
                print("終了します")
                break
            
            if not question:
                continue
            
            rag.ask(question)
            
        except KeyboardInterrupt:
            print("\n\n終了します")
            break
        except Exception as e:
            print(f"\nエラー: {str(e)}")

if __name__ == "__main__":
    main()
