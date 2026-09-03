#!/usr/bin/env bash
# Поднимает свежий Ubuntu 22/24 под сайт Лендвис с нуля. Идемпотентен —
# повторный запуск ничего не ломает. Запускать от root на НОВОМ сервере:
#   scp -r deploy root@NEW_IP:/root/  &&  ssh root@NEW_IP 'bash /root/deploy/provision.sh'
# После: указать A-запись домена на этот IP, затем ./cert.sh, затем deploy.sh.
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get -y -qq upgrade
apt-get -y -qq install nginx certbot python3-certbot-nginx ufw fail2ban unattended-upgrades rsync

# Своп 2 ГБ — обязателен на машинах с 1-2 ГБ ОЗУ, иначе всплеск нагрузки роняет всё
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  sysctl -w vm.swappiness=10
  grep -q '^vm.swappiness' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf
fi

# Файрвол: только SSH, HTTP, HTTPS
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Конфиг сайта
mkdir -p /var/www/lendvis
install -m 644 "$(dirname "$0")/nginx-lendvis.conf" /etc/nginx/sites-available/lendvis
ln -sf /etc/nginx/sites-available/lendvis /etc/nginx/sites-enabled/lendvis
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "== provision готов =="
echo "Дальше: 1) A-запись домена -> этот IP; 2) bash cert.sh; 3) с локали bash deploy.sh NEW_IP"
free -h; ufw status
