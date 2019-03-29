#!/usr/bin/env bash


echo "Delete all enabled sites..."
sudo rm -rf /etc/nginx/sites-enabled/* || exit 0

echo "Copy nginx ledwallapp configuration..."
sudo cp ../front/config/nginx.conf /etc/nginx/sites-available/ledwallapp.conf || exit 0

echo "Enable configuration..."
sudo ln -s -f /etc/nginx/sites-available/ledwallapp.conf /etc/nginx/sites-enabled/ledwallapp.conf || exit 0

echo "Restart nginx..."
sudo systemctl restart nginx || exit 0
