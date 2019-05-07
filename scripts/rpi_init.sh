#!/bin/bash

#################################################
#												#
#	Fichier d'initialisation de la Raspberry	#
#		du led wall Polytech Tours 2019			#
#												#
#################################################

set -e

trap 'cancel' 2 3 6

cancel()
{
	BACKUP_FILE=("~/etc/dhcpcd.conf" "~/etc/dnsmasq.conf" "~/etc/hostapd/hostapd.conf" "~/etc/default/hostapd" "~/etc/sysctl.conf")
	for i in ${BACKUP_FILE[@]}
	do
		sudo cp -u "BACKUP_FILE[$i]".orig "BACKUP_FILE[$i]"
	done
}

password_generator()
{
python - <<END
import random,string,crypt;
randomsalt = ''.join(random.sample(string.hexdigits,12));
print randomsalt;
END
}

SSID="LedWall";
PWD=$1;

echo "wifi name :" $SSID;
if [ -z "$PWD" ]
	then
	echo "wifi password (random) : ";
	read VAR;
	if [ -z "$VAR" ]; 
		then
		PWD=$(password_generator)
		echo "Random password for wifi :" $PWD;
	else		
		PWD="$VAR";
		echo "Your password for wifi :" $PWD;
	fi
else
	echo "Your password for wifi :" $PWD
fi
echo "Press enter to continue"
read input

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install dnsmasq hostapd || exit 0;

sudo systemctl stop dnsmasq || exit 0;
sudo systemctl stop hostapd || exit 0;

sudo cp /etc/dhcpcd.conf /etc/dhcpcd.conf.orig
sudo cat > /etc/dhcpcd.conf << EOF || exit 0;
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
EOF

sudo service dhcpcd restart

sudo cp /etc/dnsmasq.conf /etc/dnsmasq.conf.orig  
sudo cat >> /etc/dnsmasq.conf <<EOF  || exit 0;
interface=wlan0
  dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
EOF

sudo cp /etc/hostapd/hostapd.conf /etc/hostapd/hostapd.conf.orig
sudo cat >> /etc/hostapd/hostapd.conf <<EOF  || exit 0;
interface=wlan0
driver=nl80211
ssid=$(SSID)
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=$(PWD)
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
EOF

sudo cp ~/etc/default/hostapd /etc/default/hostapd.orig
sudo sed 's/#DAEMON_CONF.*/DAEMON_CONF="/etc/hostapd/hostapd.conf/"' ~/etc/default/hostapd  || exit 0;

sudo systemctl start hostapd || exit 0;
sudo systemctl start dnsmasq || exit 0

sudo cp /etc/sysctl.conf /etc/sysctl.conf.orig
sudo sed 's/#net.ipv4.ip_forward=1/net.ipv4.ip_forward=1/' ~/etc/sysctl.conf || exit 0;

sudo iptables -t nat -A  POSTROUTING -o eth0 -j MASQUERADE

sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"

iptables-restore < ~/etc/iptables.ipv4.nat

sudo apt install -y git
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -y npm
sudo npm install -g forever @angular/cli

#Init the back and the middle office
sudo chmod 775 project_install.sh || exit 0
sudo ./project_install.sh || exit 0

#Reboot the Raspberry Pi
sudo reboot




















