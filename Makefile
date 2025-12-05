SHELL := /bin/bash
PY := python3
GEN := scripts/generate_article.py

.PHONY: help generate-article

help:
	@echo "Usage:"
	@echo "  make generate-article [ARGS=\"...\"]"
	@echo ""
	@echo "Examples:"
	@echo "  make generate-article"
	@echo "  make generate-article ARGS='--title \"My Title\"'"

ga:
	$(PY) $(GEN) $(ARGS)