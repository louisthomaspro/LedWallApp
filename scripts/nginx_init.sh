#!/usr/bin/env bash

# Text your configuration with :
# sudo nginx -t -c /etc/nginx/nginx.conf
# sudo /etc/init.d/nginx restart


#sudo ln -s /home/pi/Public/LedWallApp/front/config/nginx.conf /etc/nginx/sites-enabled/ledwallapp.conf
sudo ln -s -f /home/louis/Public/LedWallApp/front/config/nginx.conf /etc/nginx/sites-enabled/ledwallapp.conf
