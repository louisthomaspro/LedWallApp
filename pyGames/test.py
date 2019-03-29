import time
from typing import List
import sys
import random

i: int = 0
j = 0


randomVal = 0
red: List[int] = [0xff, 0x00, 0x00]
blue: List[int] = [0x00, 0x00, 0xff]
wall = []


while i < 160:
    wall.append(red)
    i += 1

while j < 10:
    
    wall_format = []
    oldcolorpos = randomVal
    randomVal = random.randint(1, 158)
    wall[oldcolorpos] = red
    wall[randomVal] = blue
    
    for i in range(0, len(wall)):
        wall_format.append(wall[i][0])
        wall_format.append(wall[i][1])
        wall_format.append(wall[i][2])
    file = open("/tmp/lwfb", "wb")
    print("file opend")
    b_wall_format = bytearray(wall_format) 
    file.write(b_wall_format)
    file.close()
    print("file closed")
    time.sleep(1)
    j += 1
