#!/usr/bin/env bash


export LEDWALLAPP_HOME='/home/louis/Public/LedWallApp2'


TITLE='\033[1;35m'
INFO='\033[0;36m'
ERROR='\033[1;31m'
SUCCESS='\033[1;32m'
NC='\033[0m' # No Color

msg_err() {
   printf "${ERROR}Script failed\n"; exit 0
}
msg_title() {
    printf "${TITLE}*** $1 ***\n${NC}"
}
msg_info() {
    printf "$1\n${NC}"
}
msg_finish() {
    printf "${SUCCESS}*** $1 ***\n${NC}"
}


msg_title "LedWallApp Project Initialization"

msg_info "Recreate Public directory..."
rm -rf ${LEDWALLAPP_HOME} || msg_err
mkdir ${LEDWALLAPP_HOME} || msg_err

msg_info "Cloning project..."
git clone https://github.com/louisthomaspro/LedWallApp.git ${LEDWALLAPP_HOME} || msg_err

msg_info "Npm install back"
sudo npm install --prefix ${LEDWALLAPP_HOME}/back || msg_err

msg_info "Npm install front"
sudo npm install --prefix ${LEDWALLAPP_HOME}/front || msg_err

msg_info "Build front"
pushd ${LEDWALLAPP_HOME}/front && ng build --prod && popd || msg_err

sh ${LEDWALLAPP_HOME}/scripts/systemd_init.sh || msg_err
sh ${LEDWALLAPP_HOME}/scripts/nginx_init.sh || msg_err


msg_finish "Project is ready !"
