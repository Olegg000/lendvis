#!/usr/bin/env bash
# Выпускает Let's Encrypt и включает HTTPS+редирект. Запускать на сервере ПОСЛЕ
# того как A-запись домена уже указывает на него (проверь: dig +short A lendvis.ru).
set -euo pipefail
DOMAIN="${1:-lendvis.ru}"
EMAIL="${2:-olegochekpaucochek@gmail.com}"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
  --non-interactive --agree-tos -m "$EMAIL" --redirect
systemctl enable certbot.timer --now

# certbot сводит домен и www в один блок, и сайт начинает отдаваться с кодом 200
# на двух адресах сразу — для поиска это два сайта-близнеца. Разводим их обратно:
# www только перенаправляет на основной хост.
python3 - "$DOMAIN" <<'FIXWWW'
import sys, pathlib
d = sys.argv[1]
p = pathlib.Path('/etc/nginx/sites-available/lendvis'); s = p.read_text()
if f'server_name www.{d};' in s:
    sys.exit(0)  # уже разведены
s = s.replace(f'server_name {d} www.{d};\n\n    root', f'server_name {d};\n\n    root', 1)
s = s.replace(f'if ($host = www.{d}) {{\n        return 301 https://$host$request_uri;',
              f'if ($host = www.{d}) {{\n        return 301 https://{d}$request_uri;', 1)
s = s.rstrip() + f"""

server {{
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name www.{d};

    ssl_certificate /etc/letsencrypt/live/{d}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/{d}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://{d}$request_uri;
}}
"""
p.write_text(s)
FIXWWW

nginx -t && systemctl reload nginx
echo "== HTTPS включён для $DOMAIN, автопродление активно =="
