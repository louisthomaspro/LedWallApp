#!/usr/bin/env bash

. parameters.sh



msg_title "*** LedWallApp Project Initialization ***"

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

sh ${LEDWALLAPP_HOME}/scripts/systemd_init.sh
sh ${LEDWALLAPP_HOME}/scripts/nginx_init.sh


msg_finish "Project is ready !"
