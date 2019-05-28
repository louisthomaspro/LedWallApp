#!/bin/bash
cd /home/debian/PRU_WS2812/
source setup.sh
make
chmod 666 /dev/rpmsg_pru30
while [ $? -ne 0 ] 
do
	sleep 2
	chmod 666 /dev/rpmsg_pru30
done

cd /home/debian/LedWallApp/
./LedWall_Middleware

