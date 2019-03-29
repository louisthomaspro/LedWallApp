#!/usr/bin/env bash


echo "Copy services..."
sudo cp ../systemd/ledwallapp-api.service /etc/systemd/system/ledwallapp-api.service || exit 0
sudo cp ../systemd/ledwallapp-middleware.service /etc/systemd/system/ledwallapp-middleware.service || exit 0

echo "Reloading systemd manager configuration..."
sudo systemctl daemon-reload || exit 0

echo "Enabling services..."
sudo systemctl enable ledwallapp-api.service || exit 0
sudo systemctl enable ledwallapp-middleware.service || exit 0

echo "Starting services..."
sudo systemctl restart ledwallapp-api.service
sudo systemctl restart ledwallapp-middleware.service || exit 0
