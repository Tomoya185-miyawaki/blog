SHELL := /bin/bash
PY := python3
GEN := scripts/generate_article.py
GEN_LLM := scripts/generate_article_with_llm.py
GEN_LLM_V2 := scripts/generate_article_with_llm_v2.py
CONVERT := scripts/convert_to_md.py
DOC_DIR := local_llm/documents

.PHONY: help generate-article generate-llm llm-p

help:
	@echo "Usage:"
	@echo "  make generate-article [ARGS=\"...\"]"
	@echo "  make llm                            # AI記事生成（ランダム）"
	@echo "  make llm-p PROMPT=\"...\"       # AI記事生成（プロンプト指定）"
	@echo ""
	@echo "Examples:"
	@echo "  make generate-article"
	@echo "  make llm"
	@echo "  make llm-p PROMPT=\"Next.jsの新機能について書いて\""
	@echo "  make llm-p PROMPT=\"Dockerの基礎から実践まで解説する記事\""
	
ga:
	$(PY) $(GEN) $(ARGS)

llm:
	$(PY) $(GEN_LLM)

llm-p:
	@if [ -z "$(PROMPT)" ]; then \
		echo "❌ PROMPTを指定してください"; \
		echo "例: make llm-prompt PROMPT=\"Next.jsの記事を書いて\""; \
		exit 1; \
	fi
	$(PY) $(GEN_LLM_V2) --prompt "$(PROMPT)"

md:
	@if [ -z "$(URL)" ]; then \
		echo "❌ URLを指定してください"; \
		echo "例: make md URL=https://example.com"; \
		exit 1; \
	fi; \
	filename=$$(basename "$(URL)" | sed 's/[?&].*//'); \
	output="$(DOC_DIR)/$${filename%.html}.md"; \
	echo "📄 出力先: $$output"; \
	$(PY) $(CONVERT) --url "$(URL)" --output "$$output"