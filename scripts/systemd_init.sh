#!/usr/bin/env bash

echo "Copying service files"
sudo cp ../systemd/ledwallapp-api.service /etc/systemd/system/ledwallapp-api.service
sudo cp ../systemd/ledwallapp-api.service /etc/systemd/system/ledwallapp-middleware.service

echo "Enable & start 'ledwallapp-api.service'"
sudo systemctl enable ledwallapp-api.service
sudo systemctl start ledwallapp-api.service

echo "Enable & start 'ledwallapp-middleware.service'"
sudo systemctl enable ledwallapp-middleware.service
sudo systemctl start ledwallapp-middleware.service
