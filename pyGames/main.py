import time
from typing import List
import sys
import random

i: int = 0
j = 0
file = open("/tmp/lwfb", "w+")

randomVal = 0
red: List[int] = [0xff, 0x00, 0x00]
blue: List[int] = [0x00, 0x00, 0xff]
wall = []

while i < 160:
    wall.append(red)
    i += 1

while j < 30:
    oldcolorpos = randomVal
    randomVal = random.randint(1, 158)
    wall[oldcolorpos] = red
    wall[randomVal] = blue
    file.write(''.join(str(cube) for cube in wall))
    file.write('\n')
    time.sleep(1)
    j += 1
