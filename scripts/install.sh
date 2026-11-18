#!/usr/bin/env bash
# ========================================================================
# SHAE R Statistics Dashboard — install.sh
# Copyright (c) 2026 spdedsec <legendsatya7272@gmail.com>
# License: MIT
#
# Installs shae-stats as a CLI command to launch the dashboard.
# ========================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="${SCRIPT_DIR}/src"
BIN_DIR="${HOME}/.local/bin"
TARGET="${BIN_DIR}/shae-stats"

echo "==> SHAE R Statistics Dashboard installer"
echo "    Source : ${SRC_DIR}"
echo "    Target : ${TARGET}"
echo

if [ ! -d "${SRC_DIR}" ]; then
  echo "ERROR: source directory not found: ${SRC_DIR}" >&2
  exit 1
fi

# Ensure bin dir exists
if [ ! -d "${BIN_DIR}" ]; then
  echo "==> Creating ${BIN_DIR}"
  mkdir -p "${BIN_DIR}"
fi

# Remove old link if present
if [ -L "${TARGET}" ] || [ -e "${TARGET}" ]; then
  echo "==> Removing existing target"
  rm -f "${TARGET}"
fi

# Create wrapper script
cat > "${TARGET}" <<EOF
#!/usr/bin/env bash
# SHAE R Statistics Dashboard launcher
cd "${SRC_DIR}"
exec python3 -m http.server 8000
EOF
chmod +x "${TARGET}"

echo "==> Installed."
echo
echo "Run it with:"
echo "  shae-stats"
echo "Then open http://localhost:8000 in your browser."
echo
echo "If ~/.local/bin is not on your PATH, add this to your shell profile:"
echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""