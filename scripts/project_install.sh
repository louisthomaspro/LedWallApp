#!/usr/bin/env bash


export LEDWALLAPP_HOME='/home/louis/Public/LedWallApp2'


TITLE='\033[1;35m'
INFO='\033[0;36m'
SUCCESS='\033[1;32m'
NC='\033[0m' # No Color

msg_title() {
    printf "${TITLE}*** $1 ***\n${NC}"
}
msg_info() {
    printf "$1\n${NC}"
}
msg_finish() {
    printf "${SUCCESS}*** $1 ***\n${NC}"
}


msg_title "Project Init"

msg_info "Recreate Public directory..."
rm -rf ${LEDWALLAPP_HOME} || exit 0
mkdir ${LEDWALLAPP_HOME} || exit 0

msg_info "Cloning project..."
git clone https://github.com/louisthomaspro/LedWallApp.git ${LEDWALLAPP_HOME} || exit 0

msg_info "Npm install back..."
sudo npm install --prefix ${LEDWALLAPP_HOME}/back || exit 0

msg_info "Npm install front..."
sudo npm install --prefix ${LEDWALLAPP_HOME}/front || exit 0

msg_info "Build front..."
pushd ${LEDWALLAPP_HOME}/front && ng build --prod && popd || exit 0

msg_title "Systemd Init"
sh ${LEDWALLAPP_HOME}/scripts/systemd_init.sh || exit 0

msg_title "Nginx Init"
sh ${LEDWALLAPP_HOME}/scripts/nginx_init.sh || exit 0


msg_finish "Project is ready !"
