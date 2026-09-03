#!/usr/bin/env bash
# Выпускает Let's Encrypt и включает HTTPS+редирект. Запускать на сервере ПОСЛЕ
# того как A-запись домена уже указывает на него (проверь: dig +short A lendvis.ru).
set -euo pipefail
DOMAIN="${1:-lendvis.ru}"
EMAIL="${2:-olegochekpaucochek@gmail.com}"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos -m "$EMAIL" --redirect
systemctl enable certbot.timer --now
nginx -t && systemctl reload nginx
echo "== HTTPS включён для $DOMAIN, автопродление активно =="
