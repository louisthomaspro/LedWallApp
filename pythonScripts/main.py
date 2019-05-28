import time
from typing import List
import sys
import random

i: int = 0
j = 0
file = open("/tmp/lwfb", "w+")

randomVal = 0
red = 0xff0000
blue = 0x0000ff
wall = []

while i < 160:
    wall.append(red)
    i += 1

Bwall = bytearray(wall)

for value in Bwall:
    print(value)
    l
# while j < 30:
#     oldcolorpos = randomVal
#     randomVal = random.randint(1, 158)
#     wall[oldcolorpos] = red
#     wall[randomVal] = blue
#     file.write(''.join(str(cube) for cube in wall))
#     file.write('\n')
#     time.sleep(1)
#     j += 1
