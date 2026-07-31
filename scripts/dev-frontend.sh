#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="${HOME}/.local/node/bin:${PATH}"

cd "${ROOT_DIR}"

if [ ! -d node_modules ]; then
    echo "Instalando dependências do frontend..."
    npm install
fi

echo "Frontend em http://localhost:8080 (API: http://localhost:3334)"
npm run dev
