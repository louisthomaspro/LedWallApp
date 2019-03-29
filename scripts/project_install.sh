#!/usr/bin/env bash


LEDWALLAPP_HOME=/var/www/LedWallApp


TITLE='\033[1;35m'
NC='\033[0m' # No Color

msg_title() {
    printf "${TITLE}*** $1 ***\n${NC}"
}

msg_title "Project Init"

echo "Recreate Public directory..."
rm -rf ${LEDWALLAPP_HOME} || exit 0
mkdir -p ${LEDWALLAPP_HOME} || exit 0

echo "Cloning project..."
git clone https://github.com/louisthomaspro/LedWallApp.git ${LEDWALLAPP_HOME} || exit 0

echo "Npm install back..."
sudo npm install --prefix ${LEDWALLAPP_HOME}/back || exit 0

echo "Npm install front..."
sudo npm install --prefix ${LEDWALLAPP_HOME}/front || exit 0

echo "Build front..."
pushd ${LEDWALLAPP_HOME}/front && ng build --prod && popd || exit 0

msg_title "Systemd Init"
sh ${LEDWALLAPP_HOME}/scripts/systemd_init.sh $LEDWALLAPP_HOME || exit 0

msg_title "Nginx Init"
sh ${LEDWALLAPP_HOME}/scripts/nginx_init.sh || exit 0


printf "\033[1;32mProject is ready !\n"
