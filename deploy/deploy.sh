#!/usr/bin/env bash
set -euo pipefail

# Clona/actualiza el repo, crea .env y levanta el back completo en la VM.
# Uso: bash deploy/deploy.sh

REPO_URL="https://github.com/2W2-114324-Carballo-Juarez-Mateo/TPI---Backoffice-Demo-.git"
APP_DIR="$HOME/backoffice-demo"

echo "==> [1/4] Repo"
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git pull --ff-only
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> [2/4] .env (claves)"
if [ ! -f .compose/.env ]; then
  cp .compose/.env.example .compose/.env
  echo "  Creado .compose/.env con la clave por defecto."
  echo "  IMPORTANTE: editá .compose/.env y cambiá DATABASE_PASSWORD si querés."
fi

echo "==> [3/4] Build + up (puede tardar varios minutos la primera vez)"
docker compose -f .compose/docker-compose.yml up -d --build

echo "==> [4/4] Verificación de health"
sleep 25
for i in $(seq 1 6); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/api/administration/health || true)
  if [ "$code" = "200" ]; then
    echo "  Back OK. Gateway: http://<IP_PUBLICA>:8080 | Eureka UI: http://<IP_PUBLICA>:8761"
    exit 0
  fi
  echo "  ($i) gateway aún no responde..."
  sleep 20
done

echo "El gateway no respondió. Diagnóstico:"
docker compose -f .compose/docker-compose.yml ps
echo "Logs: docker compose -f .compose/docker-compose.yml logs -f gateway-local"
exit 1