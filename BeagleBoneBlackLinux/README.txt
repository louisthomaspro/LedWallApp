Dernier Linux en date pour la BB Black:

Images dispo sur:
https://elinux.org/Beagleboard:BeagleBoneBlack_Debian


debian 9.8 stretch IOT
BBB-blank-debian-9.8-iot-armhf-2019-04-14-4gb.img
wget https://rcn-ee.com/rootfs/bb.org/testing/2019-04-14/stretch-iot/BBB-blank-debian-9.8-iot-armhf-2019-04-14-4gb.img.xz


Flasher sur une carte SD le .img et pluguer dans la carte et redémarrer !
Le firmware devrait se flasher automatique -> LEDs qui clignotes en chenillard puis les 4 au fixe allumee ou eteint quand c'est fini
Une fois LEDs au fixe, debrancher la carte, enlever SD, rebrancher carte


Une fois booté, une interface RNDIS ethernet va arriver sur l'usb net (Linux RNDIS net): 
Accessible via SSH sur 192.168.7.2
USER	MDP
debian	temppwd

Enlever la page d'accueil sur le port 80 pour pouvoir installer Nginx
basé sur ce tuto NE PAS LE SUIVRE
http://kacangbawang.com/beagleboneblack-revc-debloat-part-1/

SUIVRE LES COMMANDES CI-DESSOUS

#=====================================================================
#Preparation du systeme

sudo nano /boot/uEnv.txt

#Il va falloir desactiver le HDMI
#  retirer le # devant les lignes : disable_uboot_overlay_video=1    et    disable_uboot_overlay_audio=1

#Monter /tmp en tmpfs en ram
#Ajouter une ligne dans fstab
sudo nano /etc/fstab

#Ajouter la ligne a la fin
tmpfs /tmp tmpfs rw,size=16M,noexec,nodev,nosuid,noatime,mode=1777 0 0


#Redemarrer pour appliquer les modifs
sudo reboot

#Supprimer Apache2:
sudo service apache2 stop 
sudo apt-get purge apache2
sudo apt-get purge apache2-mpm-worker
sudo apt-get purge apache2-utils
sudo apt-get purge apache2.2-bin
sudo apt-get purge apache2.2-common
sudo apt-get autoremove #get rid of no-longer needed dependencies

whereis apache2

#supprimer tout les répertoires listés.
sudo rm -rf /etc/apache2 
sudo rm -rf /usr/lib/apache2
sudo rm -rf /usr/sbin/apache2 
sudo rm -rf /usr/share/apache2

#supprimer la page d'accueil web de la Beagleboard
sudo systemctl stop cloud9.service            #stop working copy
sudo systemctl stop cloud9.socket             #stop working copy
sudo systemctl disable cloud9.service         #disable autorun
sudo systemctl disable cloud9.socket          #disable autorun
sudo rm -rf /var/lib/cloud9                   #installed binaries and such
sudo rm -rf /opt/cloud9                       #source download and build directory
sudo rm /etc/default/cloud9                   #environment variables
sudo rm /lib/systemd/system/cloud9.*          #systemd scripts
sudo systemctl daemon-reload                  #restart/reload systemctl deamon

#Remove Bonescript inutile et utilise les ports 80
sudo systemctl stop bonescript-autorun.service        #stop currently running copy
sudo systemctl stop bonescript.service
sudo systemctl stop bonescript.socket
sudo systemctl disable bonescript-autorun.service     #purge autorun scripts
sudo systemctl disable bonescript.service
sudo systemctl disable bonescript.socket
sudo rm /lib/systemd/system/bonescript*               #startup scripts
sudo rm -rf /usr/local/lib/node_modules/bonescript    #binaries
sudo systemctl daemon-reload                          #restart/reload systemctl deamon


#NE SURTOUT PAS TOUCHER AU CONTENU DE CE DOSSIER
#CONTIENT DES SCRIPTS UTILES POUR LES GPIOs
#/opt/source



#=====================================================================

#Installer NGINX:
#Va installer toutes les dépendances et nginx-full 1.10.3
sudo apt-get update
sudo apt-get install nginx


#Pour ouvrir le site par defaut de Nginx:

cd /etc/nginx/sites_available
sudo nano default

#Dans server modifier la ligne:
#server{
#	listen 80;
#	listen [::]:80 ipv6only=on default_server;
#	... reste du fichier
#}


#Arreter nginx
sudo nginx -s stop

#demarrer nginx
sudo nginx

#=====================================================================

#Installer MongoDB
#extraire mongodb_stretch_3_0_14_core.zip
#extraire mongodb_stretch_3_0_14_tools.zip
#copier les binaires via SCP dans les repertoires suivant
# mongo mongod mongos
mkdir ~/mongodb
mkdir ~/mongodb/core
mkdir ~/mongodb/tools
#Copier les binaires dans les dossiers correspondants
chmod 755 ~/mongodb/core/*
chmod 755 ~/mongodb/tools/*

#Copier les binaires vers /usr/local/bin pour y avoir acces dans le PATH
cp ~/mongodb/core/* /usr/local/bin
cp ~/mongodb/tools/* /usr/local/bin

#Creer le dossier /data/db  pour Mongo
sudo mkdir /data
sudo mkdir /data/db

#Tester le serveur mongod
#Mongod doit s initialiser et attendre sur le port 27017
sudo mongod

#Fermer mongod

#Tester le terminal mongo, ouvrir un nouveau terminal ssh
#le shell mongo doit se connecter au serveur mongod
sudo mongo

#Fermer mongo


#Installer le programme WS2812b PRU
#dans /home/debian/
mkdir ~/PRU_WS2812
cd ~/PRU_WS2812
#Ajouter les fichiers suivants dans PRU_WS2812:
# AM335x_PRU.cmd Makefile resource_table_0.h setup.sh neo_pixel_pru_firmware.c README.txt
# examples/neo_blink_open.c examples/neo_rainbow_open.c examples/neo_rainbow.py

#Pour lancer le firmware du PRU
#Attention a bien avoir modified le /boot/uEnv.txt en retirant la video et l'audio
#Sinon le source va echouer a cause du pinmux
source setup.sh
make #Entrer le mdp debian si besoin

#make va ouvrir le makefile, compiler le fichier neo_pixel_pru_firmware.c
#dans ~/PRU_WS2812/pru0-gen/ 

#Maintenant le systeme est pret pour recevoir le Middleware et l'appli web et le back
#Node js est preinstalled et Nginx a ete installed precedemment
#https://github.com/louisthomaspro/LedWallApp/releases -> Extraire les dossier back et front dans ~/LedWallApp

mkdir ~/LedWallApp

#https://github.com/louisthomaspro/LedWallApp/tree/develop/driver/LedWall_Middleware/bin/Debug
#placer LedWall_Middleware binaire dans ~/LedWallApp/
chmod 755 LedWall_Middleware


#Nginx config pour le front
cd /etc/nginx/sites_available/
sudo touch ledwallapp.conf
#Ecrire dans le fichier la config suivante
server { 
	listen 80; 
	server_name localhost;
	root /home/debian/LedWallApp/front;
    location / {
        try_files $uri $uri/ /index.html;
    }
}

#Ajouter le lien symbolique pour activer le site LedWallApp
sudo ln -s /etc/nginx/sites-available/ledwallapp.conf /etc/nginx/sites-enabled/ || exit 0

#Supprimer le site par default de Nginx
sudo rm /etc/nginx/sites-enabled/default

#Relancer nginx
sudo nginx -s stop
sudo nginx


#Ajouter les scripts de demarrage systemd
mkdir ~/LedWallApp/startup
#Copier launchMiddleWare.sh ledwallapp-api.service ledwallapp-middleware.service mongodb.service
#dans le dossier startup
#Creer des liens symboliques des fichiers .service dans /lib/systemd/system/

#Configurer le host ap Wifi pour la BB wireless !
sudo nano /var/lib/connman/settings

#Dans la rubrique [WIFI]
#Thetering=true
#Tethering.Identifier=DII-LedWall
#Tethering.Passphrase=AxrCewDII
#sources : https://diyevil.com/projects/beaglebone-wifi-access-point/

# Lancer tous les services pour la LedWallApp
cd ~/PRU_WS2812
source setup.sh
make
sudo mongod
sudo ~/LedWallApp/LedWall_Middleware
node ~/LedWallApp/back/server.js
sudo nginx




