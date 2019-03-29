#!/usr/bin/env bash

. parameters.sh

msg_title "Nginx Init"

msg_info "Delete all enabled sites..."
sudo rm -rf /etc/nginx/sites-enabled/* || msg_err

msg_info "Copy nginx ledwallapp configuration..."
sudo cp ../front/config/nginx.conf /etc/nginx/sites-available/ledwallapp.conf || msg_err

msg_info "Enable configuration..."
sudo ln -s -f /etc/nginx/sites-available/ledwallapp.conf /etc/nginx/sites-enabled/ledwallapp.conf || msg_err

msg_info "Restart nginx..."
sudo systemctl restart nginx || msg_err

msg_finish "Nginx Init Finished Successfully"
