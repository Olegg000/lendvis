#!/usr/bin/env bash
# Собирает сайт локально и заливает на сервер. Запускать С ЛОКАЛЬНОЙ МАШИНЫ из корня репо:
#   bash deploy/deploy.sh <IP> [путь-к-ssh-ключу]
# Контент собирается из исходников, поэтому это же и есть «восстановление» на любом сервере.
set -euo pipefail
IP="${1:?укажи IP сервера}"
KEY="${2:-$HOME/.ssh/lendvis_vps}"
cd "$(dirname "$0")/.."
npm ci
npm run build            # base '/' в vite.config.ts — подходит и для домена, и для github.io
cp dist/index.html dist/404.html
rsync -az --delete -e "ssh -i $KEY -o StrictHostKeyChecking=accept-new" \
  dist/ "root@$IP:/var/www/lendvis/"
ssh -i "$KEY" "root@$IP" 'nginx -t && systemctl reload nginx && echo deploy-ok'
echo "== сайт залит на $IP =="
