#!/usr/bin/env bash

. parameters.sh



msg_title "*** LedWallApp Project Initialization ***"

msg_info "Recreate Public directory..."
rm -rf ${LEDWALLAPP_HOME}
mkdir ${LEDWALLAPP_HOME}

msg_info "Cloning project..."
git clone https://github.com/louisthomaspro/LedWallApp.git ${LEDWALLAPP_HOME}

msg_info "Npm install back"
npm install --prefix ${LEDWALLAPP_HOME}/back

msg_info "Npm install front"
npm install --prefix ${LEDWALLAPP_HOME}

msg_info "Build front"
ng build --prod

sh ${LEDWALLAPP_HOME}/LedWallApp/scripts/systemd_init.sh
sh ${LEDWALLAPP_HOME}/LedWallApp/scripts/nginx_init.sh


msg_finish "Project is ready !"
