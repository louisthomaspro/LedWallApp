#!/usr/bin/python
from time import sleep
import math

len = 160
amp = 12
f = 25
shift = 3
phase = 0

# Open a file
fo = open("/dev/rpmsg_pru30", "w", 0)

while True:
    for i in range(0, len):
        r = (amp * (math.sin(2*math.pi*f*(i-phase-0*shift)/len) + 1)) + 1;
        g = (amp * (math.sin(2*math.pi*f*(i-phase-1*shift)/len) + 1)) + 1;
        b = (amp * (math.sin(2*math.pi*f*(i-phase-2*shift)/len) + 1)) + 1;
        fo.write("%d %02X%02X%02X\n" % (i, r, g, b))
        #print("%d %02X%02X%02X\n" % (i,r,g,b))

    fo.write("-1 %04X\n" % len) #Indicate to latch 160 leds
    #print("-1 %04X\n" % len)	
    phase = phase + 1
    sleep(0.01)

# Close opened file
fo.close()
