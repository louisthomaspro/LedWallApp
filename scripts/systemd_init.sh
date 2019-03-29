#!/usr/bin/env bash

[ -z "$PARAMETERS" ] && . parameters.sh

msg_title "Systemd Init"
msg_info "Copy services..."
sudo cp ../systemd/ledwallapp-api.service /etc/systemd/system/ledwallapp-api.service || msg_err
sudo cp ../systemd/ledwallapp-middleware.service /etc/systemd/system/ledwallapp-middleware.service || msg_err

msg_info "Reloading systemd manager configuration..."
sudo systemctl daemon-reload || msg_err

msg_info "Enabling services..."
sudo systemctl enable ledwallapp-api.service || msg_err
sudo systemctl enable ledwallapp-middleware.service || msg_err

msg_info "Starting services..."
sudo systemctl restart ledwallapp-api.service
sudo systemctl restart ledwallapp-middleware.service || msg_err

msg_finish "Systemd Init Finished Successfully"
