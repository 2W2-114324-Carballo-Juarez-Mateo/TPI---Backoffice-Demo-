#!/usr/bin/env bash
set -euo pipefail

# Prepara una VM Ubuntu / Oracle Linux (Ampere A1) con Docker + Compose + Git.
# Uso: bash deploy/setup-vm.sh

echo "==> [1/4] Paquetes base"
if command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl git jq
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf install -y curl git jq
else
  echo "SO no soportado (se espera Ubuntu u Oracle Linux)." >&2
  exit 1
fi

echo "==> [2/4] Docker Engine"
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sudo sh
fi
sudo usermod -aG docker "$USER"

echo "==> [3/4] Plugin docker compose"
if ! docker compose version >/dev/null 2>&1; then
  sudo mkdir -p /usr/local/lib/docker/cli-plugins
  sudo curl -sSL \
    "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-aarch64" \
    -o /usr/local/lib/docker/cli-plugins/docker-compose
  sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
fi

echo "==> [4/4] Verificación"
docker version
docker compose version

echo ""
echo "OK. Cerrá sesión y volvé a entrar (para usar docker sin sudo)."
echo "Luego: cd backoffice-demo && bash deploy/deploy.sh"