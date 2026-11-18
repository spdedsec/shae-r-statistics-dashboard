# ========================================================================
# SHAE R Statistics Dashboard — Makefile
# Copyright (c) 2026 spdedsec <legendsatya7272@gmail.com>
# License: MIT
# ========================================================================

.PHONY: all test build clean web lint help

all: test build

test:
	@echo "==> Running JavaScript test suite..."
	node tests/test.js

build:
	@echo "==> Static site - no build step required"

clean:
	@echo "==> Cleaning..."
	rm -rf dist

web:
	@echo "==> Serving on http://localhost:8000..."
	python3 -m http.server 8000 -d src

lint:
	@echo "==> Linting JavaScript files..."
	npx eslint src/app.js 2>/dev/null || echo "eslint not installed - install with 'npm install -g eslint'"

help:
	@echo "Available targets:"
	@echo "  test    - Run test suite"
	@echo "  build   - Build (no-op for static site)"
	@echo "  clean   - Clean artifacts"
	@echo "  web     - Start local web server"
	@echo "  lint    - Lint JavaScript files"
	@echo "  help    - Show this help"