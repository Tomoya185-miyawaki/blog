SHELL := /bin/bash
PY := python3
GEN := scripts/generate_article.py
GEN_LLM := scripts/generate_article_with_llm.py

.PHONY: help generate-article generate-llm

help:
	@echo "Usage:"
	@echo "  make generate-article [ARGS=\"...\"]"
	@echo "  make generate-llm                    # AI記事生成"
	@echo ""
	@echo "Examples:"
	@echo "  make generate-article"
	@echo "  make generate-article ARGS='--title \"My Title\"'"
ga:
	$(PY) $(GEN) $(ARGS)
llm:
	$(PY) $(GEN_LLM)