import time
from typing import List
import sys
import random
import keyboard
import curses
from pynput import keyboard

i: int = 0
j = 0
higth = 0
width = 0

randomVal = 0
red: List[int] = [0xff, 0x00, 0x00]
blue: List[int] = [0x00, 0x00, 0xff]
wall = []
flag = False


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

while i < 160:
    wall.append(red)
    i += 1
printLedWall(fromListToLedframe(wall))
oldcolorpos = 0

def on_press(key):
    global higth
    global width
    global oldcolorpos
    try: variable = key.char # single-char keys
    except: variable = key.name # other keys
    if key == keyboard.Key.esc: return False # stop listener
    if variable in ['down', 'up', 'left', 'right']: # keys interested
        coordinates = [0,0]
        if variable == "up":
            print("up")
            coordinates = goUp(higth, width)
            wall[oldcolorpos] = red
            pos = form2Dto1D(coordinates[0], coordinates[1])
            higth = coordinates[0]
            printLedWall(fromListToLedframe(wall))
            
            pass
        elif variable == "down":
       
            coordinates = goDown(higth,width)
            wall[oldcolorpos] = red
            pos = form2Dto1D(coordinates[0], coordinates[1])
            higth = coordinates[0]
            wall[pos] = blue
            oldcolorpos = pos
            printLedWall(fromListToLedframe(wall))
            print("down")
            pass
        
        elif variable == "left":
        
            coordinates = goLeft(higth, width)
            wall[oldcolorpos] = red
            pos = form2Dto1D(coordinates[0], coordinates[1])
            width = coordinates[1]
            wall[pos] = blue
            oldcolorpos = pos
            printLedWall(fromListToLedframe(wall))
            print("left")
            pass
        
        elif variable == "right":
            
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
        #return False # remove this if want more keys

lis = keyboard.Listener(on_press=on_press)
lis.start() # start to listen on a separate thread
lis.join() # no this if main thread is polling self.keys
