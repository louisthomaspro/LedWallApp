import time
from typing import List
import sys
import random
import keyboard
import curses
from pynput import keyboard

i: int = 0
j = 0

def printLedWall(Byteframe):
    file = open("/tmp/lwfb", "wb")
    print("file opend")
    file.write(Byteframe)
    file.close()
    print("file closed")
    return True

def fromListToLedframe (wallList):
    wall_format = []
    for i in range(0, len(wallList)):
        wall_format.append(wallList[i][0])
        wall_format.append(wallList[i][1])
        wall_format.append(wallList[i][2])
    b_wall_format = bytearray(wall_format) 

    return b_wall_format

def form2Dto1D(higth, width):
    pos1D = (higth*16)+width
    return pos1D

def input_char(message):
    try:
        win = curses.initscr()
        win.addstr(0, 0, message)
        while True: 
            ch = win.getch()
            if ch in range(32, 127): break
            time.sleep(0.05)
    except: raise
    finally:
        curses.endwin()
    return chr(ch)


def inrange(higth, width):
    print("inrange \n")
    coordiantes = [0,0]
    
    if higth > 9  :
        higth = 0
    if higth < 0  :
        higth = 9       
    if width > 15 :
        width = 0    
    if width < 0  :
        width = 15
        
    
    coordiantes[0] = higth
    coordiantes[1] = width
    print("return val :",coordiantes,"\n") 
    return coordiantes
    
def goUp(higth, width):
    higth -= 1
    coordinates = inrange(higth, width)
    return coordinates

def goDown(higth, width):
    higth +=1
    coordinates = inrange(higth, width)
    return coordinates

def goLeft(higth, width):
    width -=1
    coordinates = inrange(higth, width)
    return coordinates

def goRight(higth, width):
    width +=1
    coordinates = inrange(higth, width)
    return coordinates

def on_press(key):
    try: k = key.char # single-char keys
    except: k = key.name # other keys
    if key == keyboard.Key.esc: return False # stop listener
    if k in ['down', 'up', 'left', 'right']: # keys interested
        # self.keys.append(k) # store it in global-like variable
        print('Key pressed: ' + k)
        return k 


higth = 0
width = 0

randomVal = 0
red: List[int] = [0xff, 0x00, 0x00]
blue: List[int] = [0x00, 0x00, 0xff]
wall = []
flag = False

while i < 160:
    wall.append(red)
    i += 1
printLedWall(fromListToLedframe(wall))
oldcolorpos = 0

while flag == False:
    
    coordinates = [0,0]
    # variable = input_char('press Z, S, D, Q to play:')
    # print(variable)
    lis = keyboard.Listener(on_press=on_press)
    lis.start() # start to listen on a separate thread
    lis.join()
    variable = lis.getName()
    
    if variable == "\x1b[A":
        
        print(higth)
        coordinates = goUp(higth, width)
        wall[oldcolorpos] = red
        pos = form2Dto1D(coordinates[0], coordinates[1])
        higth = coordinates[0]
        printLedWall(fromListToLedframe(wall))
        
        pass
    
    elif variable == '\x1b[B':
       
        coordinates = goDown(higth,width)
        wall[oldcolorpos] = red
        pos = form2Dto1D(coordinates[0], coordinates[1])
        higth = coordinates[0]
        wall[pos] = blue
        oldcolorpos = pos
        printLedWall(fromListToLedframe(wall))
        pass
    
    elif variable == '\x1b[D':
       
        coordinates = goLeft(higth, width)
        wall[oldcolorpos] = red
        pos = form2Dto1D(coordinates[0], coordinates[1])
        width = coordinates[1]
        wall[pos] = blue
        oldcolorpos = pos
        printLedWall(fromListToLedframe(wall))
        print("left")
        pass
    
    elif variable == '\x1b[C':
        
        coordinates = goRight(higth, width)
        wall[oldcolorpos] = red
        pos = form2Dto1D(coordinates[0], coordinates[1])
        width = coordinates[1]
        wall[pos] = blue
        oldcolorpos = pos
        printLedWall(fromListToLedframe(wall))
        print("right")
        pass
    
    elif variable == "u":
        print("byby BITCH")
        flag = True
    else:
        print("are you dum ?")
        pass





















# while j < 10:
    
#    
#     oldcolorpos = randomVal
#     randomVal = random.randint(1, 158)
#     wall[oldcolorpos] = red
#     wall[randomVal] = blue
    
#     for i in range(0, len(wall)):
#         wall_format.append(wall[i][0])
#         wall_format.append(wall[i][1])
#         wall_format.append(wall[i][2])
#     b_wall_format = bytearray(wall_format) 

#     printLedWall(b_wall_format)
#     time.sleep(1)
#     j += 1
