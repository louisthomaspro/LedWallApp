import time as temps
from datetime import datetime, date, time

FPS = 10
H=10
W=16

font_4x5_col = {
    ' ': [0x0, 0x0, 0x0, 0x0, 0x0], 
    '!': [0x4, 0x4, 0x4, 0x0, 0x4],
    '"': [0xa, 0xa, 0x0, 0x0, 0x0],
    '#': [0x6, 0xf, 0x6, 0xf, 0x6],
    '$': [0x7, 0xa, 0x6, 0x5, 0xe],
    '%': [0x7, 0xe, 0x4, 0x7, 0xe],
    '&': [0x2, 0x5, 0x6, 0xa, 0x5],
    '\'': [0x2, 0x2, 0x0, 0x0, 0x0],
    '(': [0x4, 0x8, 0x8, 0x8, 0x4],
    ')': [0x4, 0x2, 0x2, 0x2, 0x4],
    '*': [0x0, 0x6, 0xf, 0x6, 0x0],
    '+': [0x0, 0x2, 0x7, 0x2, 0x0],
    ',': [0x0, 0x0, 0x0, 0x2, 0x4],
    '-': [0x0, 0x0, 0x0, 0xf, 0x0],
    '.': [0x0, 0x0, 0x0, 0x0, 0x4],
    '/': [0x1, 0x1, 0x2, 0x4, 0x8],
    '0': [0x6, 0xb, 0xf, 0xd, 0x6],
    '1': [0x2, 0x6, 0x2, 0x2, 0x2],
    '2': [0xe, 0x1, 0x6, 0x8, 0xf],
    '3': [0xe, 0x1, 0x6, 0x1, 0xe],
    '4': [0x2, 0x6, 0xa, 0xf, 0x2],
    '5': [0xf, 0x8, 0xe, 0x1, 0xe],
    '6': [0x6, 0x8, 0xe, 0x9, 0x6],
    '7': [0xf, 0x1, 0x2, 0x4, 0x8],
    '8': [0x6, 0x9, 0x6, 0x9, 0x6],
    '9': [0x6, 0x9, 0xf, 0x1, 0x6],
    ':': [0x0, 0x4, 0x0, 0x4, 0x0],
    ';': [0x0, 0x4, 0x0, 0x4, 0x8],
    '<': [0x2, 0x4, 0x8, 0x4, 0x2],
    '=': [0x0, 0xf, 0x0, 0xf, 0x0],
    '>': [0x4, 0x2, 0x1, 0x2, 0x4],
    '?': [0x6, 0x9, 0x2, 0x0, 0x2],
    '@': [0x6, 0xd, 0xb, 0x8, 0x6],
    'A': [0x4, 0xa, 0xe, 0xa, 0xa],
    'B': [0xe, 0x9, 0xe, 0x9, 0xe],
    'C': [0x6, 0x9, 0x8, 0x9, 0x6],
    'D': [0xe, 0x9, 0x9, 0x9, 0xe],
    'E': [0xf, 0x8, 0xe, 0x8, 0xf],
    'F': [0xf, 0x8, 0xe, 0x8, 0x8],
    'G': [0x6, 0x8, 0xb, 0x9, 0x6],
    'H': [0x9, 0x9, 0xf, 0x9, 0x9],
    'I': [0xe, 0x4, 0x4, 0x4, 0xe],
    'J': [0x1, 0x1, 0x1, 0x9, 0x6],
    'K': [0x9, 0xa, 0xc, 0xa, 0x9],
    'L': [0x8, 0x8, 0x8, 0x8, 0xf],
    'M': [0x9, 0xf, 0xf, 0x9, 0x9],
    'N': [0x9, 0xd, 0xf, 0xb, 0x9],
    'O': [0x6, 0x9, 0x9, 0x9, 0x6],
    'P': [0xe, 0x9, 0xe, 0x8, 0x8],
    'Q': [0x6, 0x9, 0x9, 0xb, 0x7],
    'R': [0xe, 0x9, 0xe, 0xa, 0x9],
    'S': [0x7, 0x8, 0x6, 0x1, 0xe],
    'T': [0xe, 0x4, 0x4, 0x4, 0x4],
    'U': [0x9, 0x9, 0x9, 0x9, 0x6],
    'V': [0x9, 0x9, 0x9, 0x6, 0x6],
    'W': [0x9, 0x9, 0xf, 0xf, 0x9],
    'X': [0x9, 0x9, 0x6, 0x9, 0x9],
    'Y': [0x9, 0x5, 0x2, 0x2, 0x2],
    'Z': [0xf, 0x2, 0x4, 0x8, 0xf],
    '[': [0xe, 0x8, 0x8, 0x8, 0xe],
    '\\': [0x8, 0x8, 0x4, 0x2, 0x1],
    ']': [0x7, 0x1, 0x1, 0x1, 0x7],
    '^': [0x4, 0xa, 0x0, 0x0, 0x0],
    '_': [0x0, 0x0, 0x0, 0x0, 0xf],
    '`': [0x4, 0x2, 0x0, 0x0, 0x0],
    'a': [0x0, 0x5, 0xb, 0xb, 0x5],
    'b': [0x8, 0x8, 0xe, 0x9, 0xe],
    'c': [0x0, 0x7, 0x8, 0x8, 0x7],
    'd': [0x1, 0x1, 0x7, 0x9, 0x7],
    'e': [0x0, 0x6, 0xf, 0x8, 0x7],
    'f': [0x3, 0x4, 0xe, 0x4, 0x4],
    'g': [0x7, 0x9, 0x7, 0x1, 0x7],
    'h': [0x8, 0x8, 0xe, 0x9, 0x9],
    'i': [0x0, 0x2, 0x0, 0x2, 0x2],
    'j': [0x1, 0x0, 0x1, 0x1, 0x6],
    'k': [0x8, 0xa, 0xc, 0xa, 0x9],
    'l': [0xc, 0x4, 0x4, 0x4, 0xe],
    'm': [0x0, 0x9, 0xf, 0xf, 0x9],
    'n': [0x0, 0xe, 0x9, 0x9, 0x9],
    'o': [0x0, 0x6, 0x9, 0x9, 0x6],
    'p': [0x0, 0xe, 0x9, 0xe, 0x8],
    'q': [0x0, 0x6, 0x9, 0x7, 0x1],
    'r': [0x0, 0xb, 0xc, 0x8, 0x8],
    's': [0x0, 0x7, 0x4, 0x2, 0xe],
    't': [0x4, 0xe, 0x4, 0x4, 0x3],
    'u': [0x0, 0x9, 0x9, 0x9, 0x6],
    'v': [0x0, 0x9, 0x9, 0x6, 0x6],
    'w': [0x0, 0x9, 0xf, 0xf, 0x6],
    'x': [0x0, 0x9, 0x6, 0x6, 0x9],
    'y': [0x0, 0x9, 0x7, 0x1, 0x6],
    'z': [0x0, 0xf, 0x2, 0x4, 0xf],
    '{': [0x6, 0x4, 0xc, 0x4, 0x6],
    '|': [0x4, 0x4, 0x4, 0x4, 0x4],
    '}': [0xc, 0x4, 0x6, 0x4, 0xc],
    '~': [0x0, 0x0, 0x5, 0xa, 0x0],
};

font_5x7_col= [
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], #
		[ 0x03, 0x07, 0x7E, 0x20, 0x1C ], #
		[ 0x60, 0x66, 0x09, 0x09, 0x09 ], #
		[ 0x60, 0x6F, 0x0A, 0x0A, 0x08 ], #
		[ 0x10, 0x18, 0x1C, 0x18, 0x10 ], #
		[ 0x00, 0x3E, 0x1C, 0x08, 0x00 ], #
		[ 0x00, 0x08, 0x1C, 0x3E, 0x00 ], #
		[ 0x04, 0x0C, 0x1C, 0x0C, 0x04 ], #
		[ 0x7F, 0x00, 0x00, 0x00, 0x00 ], # (1 col left)
		[ 0x7F, 0x7F, 0x00, 0x00, 0x00 ], # (2 col left)
		[ 0x7F, 0x7F, 0x7F, 0x00, 0x00 ], # (3 col left)
		[ 0x7F, 0x7F, 0x7F, 0x7F, 0x00 ], # (4 col left)
		[ 0x7F, 0x7F, 0x7F, 0x7F, 0x7F ], # (solid fill)
		[ 0x00, 0x7F, 0x7F, 0x7F, 0x7F ], # (4 col right)
		[ 0x00, 0x00, 0x7F, 0x7F, 0x7F ], # (3 col right)
		[ 0x00, 0x00, 0x00, 0x7F, 0x7F ], # (2 col right)
		[ 0x00, 0x00, 0x00, 0x00, 0x7F ], # (1 col right)
		[ 0x03, 0x07, 0x7E, 0x20, 0x1C ], # (music note)
		[ 0x60, 0x66, 0x09, 0x09, 0x09 ], # (deg c)
		[ 0x60, 0x6F, 0x0A, 0x0A, 0x08 ], # (deg f)
		[ 0x10, 0x18, 0x1C, 0x18, 0x10 ], # (triangle down)
		[ 0x00, 0x3E, 0x1C, 0x08, 0x00 ], # (triangle right)
		[ 0x00, 0x08, 0x1C, 0x3E, 0x00 ], # (triangle left)
		[ 0x04, 0x0C, 0x1C, 0x0C, 0x04 ], # (triangle up)
		[ 0x00, 0x00, 0x00, 0x00, 0x00 ], # (space)
		[ 0x00, 0x7D, 0x00, 0x00, 0x00 ], # (!)
		[ 0x00, 0x70, 0x00, 0x70, 0x00 ], # (")
		[ 0x14, 0x7F, 0x14, 0x7F, 0x14 ], # (#)
		[ 0x12, 0x2A, 0x7F, 0x2A, 0x24 ], # ($)
		[ 0x62, 0x64, 0x08, 0x13, 0x23 ], # (%)
		[ 0x36, 0x49, 0x35, 0x02, 0x05 ], # (&)
		[ 0x00, 0x50, 0x60, 0x00, 0x00 ], # (')
		[ 0x00, 0x1C, 0x22, 0x41, 0x00 ], # (()
		[ 0x00, 0x41, 0x22, 0x1C, 0x00 ], # ())
		[ 0x44, 0x28, 0x7C, 0x28, 0x44 ], # (*)
		[ 0x08, 0x08, 0x7F, 0x08, 0x08 ], # (+)
		[ 0x05, 0x06, 0x00, 0x00, 0x00 ], # (,)
		[ 0x08, 0x08, 0x08, 0x00, 0x00 ], # (-)
		[ 0x00, 0x03, 0x03, 0x00, 0x00 ], # (.)
		[ 0x02, 0x04, 0x08, 0x10, 0x20 ], # (/)
		[ 0x3E, 0x45, 0x49, 0x51, 0x3E ], # (0)
		[ 0x00, 0x21, 0x7F, 0x01, 0x00 ], # (1)
		[ 0x21, 0x43, 0x45, 0x49, 0x31 ], # (2)
		[ 0x42, 0x41, 0x51, 0x69, 0x46 ], # (3)
		[ 0x0C, 0x14, 0x24, 0x7F, 0x04 ], # (4)
		[ 0x72, 0x51, 0x51, 0x51, 0x4E ], # (5)
		[ 0x1E, 0x29, 0x49, 0x49, 0x06 ], # (6)
		[ 0x43, 0x44, 0x48, 0x50, 0x60 ], # (7)
		[ 0x36, 0x49, 0x49, 0x49, 0x36 ], # (8)
		[ 0x30, 0x49, 0x49, 0x4A, 0x3C ], # (9)
		[ 0x00, 0x36, 0x36, 0x00, 0x00 ], # (:)
		[ 0x00, 0x35, 0x36, 0x00, 0x00 ], # (;)
		[ 0x08, 0x14, 0x22, 0x41, 0x00 ], # (<)
		[ 0x14, 0x14, 0x14, 0x14, 0x14 ], # (=)
		[ 0x41, 0x22, 0x14, 0x08, 0x00 ], # (>)
		[ 0x20, 0x40, 0x45, 0x48, 0x30 ], # (?)
		[ 0x3E, 0x41, 0x4D, 0x51, 0x36 ], # (@)
		[ 0x3F, 0x48, 0x48, 0x48, 0x3F ], # (A)
		[ 0x7F, 0x49, 0x49, 0x49, 0x36 ], # (B)
		[ 0x3E, 0x41, 0x41, 0x41, 0x22 ], # (C)
		[ 0x7F, 0x41, 0x41, 0x41, 0x3E ], # (D)
		[ 0x7F, 0x49, 0x49, 0x49, 0x41 ], # (E)
		[ 0x7F, 0x48, 0x48, 0x48, 0x40 ], # (F)
		[ 0x3E, 0x41, 0x49, 0x49, 0x2E ], # (G)
		[ 0x7F, 0x08, 0x08, 0x08, 0x7F ], # (H)
		[ 0x00, 0x41, 0x7F, 0x41, 0x00 ], # (I)
		[ 0x02, 0x01, 0x41, 0x7E, 0x40 ], # (J)
		[ 0x7F, 0x08, 0x14, 0x22, 0x41 ], # (K)
		[ 0x7F, 0x01, 0x01, 0x01, 0x01 ], # (L)
		[ 0x7F, 0x20, 0x18, 0x20, 0x7F ], # (M)
		[ 0x7F, 0x10, 0x08, 0x04, 0x7F ], # 👎
		[ 0x3E, 0x41, 0x41, 0x41, 0x3E ], # (O)
		[ 0x7F, 0x48, 0x48, 0x48, 0x30 ], # (P)
		[ 0x3E, 0x41, 0x45, 0x42, 0x3D ], # (Q)
		[ 0x7F, 0x48, 0x4C, 0x4A, 0x31 ], # (R)
		[ 0x31, 0x49, 0x49, 0x49, 0x46 ], # (S)
		[ 0x40, 0x40, 0x7F, 0x40, 0x40 ], # (T)
		[ 0x7E, 0x01, 0x01, 0x01, 0x7E ], # (U)
		[ 0x7C, 0x02, 0x01, 0x02, 0x7C ], # (V)
		[ 0x7E, 0x01, 0x06, 0x01, 0x7E ], # (W)
		[ 0x63, 0x14, 0x08, 0x14, 0x63 ], # (X)
		[ 0x70, 0x08, 0x07, 0x08, 0x70 ], # 󰀀
		[ 0x43, 0x45, 0x49, 0x51, 0x61 ], # (Z)
		[ 0x00, 0x7F, 0x41, 0x41, 0x00 ], # ([)
		[ 0x20, 0x10, 0x08, 0x04, 0x02 ], # (\)
		[ 0x00, 0x41, 0x41, 0x7F, 0x00 ], # (])
		[ 0x10, 0x20, 0x40, 0x20, 0x10 ], # (^)
		[ 0x01, 0x01, 0x01, 0x01, 0x01 ], # (_)
		[ 0x00, 0x40, 0x20, 0x10, 0x00 ], # (`)
		[ 0x02, 0x15, 0x15, 0x15, 0x0F ], # (a)
		[ 0x7F, 0x09, 0x11, 0x11, 0x0E ], # (b)
		[ 0x0E, 0x11, 0x11, 0x11, 0x02 ], # (c)
		[ 0x0E, 0x11, 0x11, 0x09, 0x7F ], # (d)
		[ 0x0E, 0x15, 0x15, 0x15, 0x0C ], # (e)
		[ 0x08, 0x3F, 0x48, 0x40, 0x20 ], # (f)
		[ 0x18, 0x25, 0x25, 0x25, 0x3E ], # (g)
		[ 0x7F, 0x08, 0x10, 0x10, 0x0F ], # (h)
		[ 0x00, 0x11, 0x5F, 0x01, 0x00 ], # (i)
		[ 0x02, 0x01, 0x11, 0x5E, 0x00 ], # (j)
		[ 0x7F, 0x04, 0x0A, 0x11, 0x00 ], # (k)
		[ 0x00, 0x41, 0x7F, 0x01, 0x00 ], # (l)
		[ 0x1F, 0x10, 0x0C, 0x10, 0x0F ], # (m)
		[ 0x1F, 0x08, 0x10, 0x10, 0x0F ], # 👎
		[ 0x0E, 0x11, 0x11, 0x11, 0x0E ], # (o)
		[ 0x1F, 0x14, 0x14, 0x14, 0x08 ], # (p)
		[ 0x08, 0x14, 0x14, 0x14, 0x0F ], # (q)
		[ 0x1F, 0x08, 0x10, 0x10, 0x08 ], # (r)
		[ 0x09, 0x15, 0x15, 0x15, 0x02 ], # (s)
		[ 0x10, 0x7E, 0x11, 0x01, 0x02 ], # (t)
		[ 0x1E, 0x01, 0x01, 0x02, 0x1F ], # (u)
		[ 0x1C, 0x02, 0x01, 0x02, 0x1C ], # (v)
		[ 0x1E, 0x01, 0x02, 0x01, 0x1E ], # (w)
		[ 0x11, 0x0A, 0x04, 0x0A, 0x11 ], # (x)
		[ 0x18, 0x05, 0x05, 0x05, 0x1E ], # 󰀀
		[ 0x11, 0x13, 0x15, 0x19, 0x11 ], # (z)
		[ 0x08, 0x36, 0x41, 0x00, 0x00 ], # ([)
		[ 0x00, 0x00, 0x7F, 0x00, 0x00 ], # (|)
		[ 0x00, 0x00, 0x41, 0x36, 0x08 ], # (])
		[ 0x08, 0x08, 0x2A, 0x1C, 0x08 ], # (arrow right)
		[ 0x08, 0x1C, 0x2A, 0x08, 0x08 ], # (arrow left)
]



pixels=[]

def display(wall):
	frame = fromListToLedframe(wall)
	printLedWall(frame)


def printLedWall(Byteframe):
	
	file = open("/tmp/lwfb", "wb")
	# print("file opend")
	file.write(Byteframe)
	file.close()
	# print("file closed")
	return True

def fromListToLedframe(wall):
	wall_format = []
	for y in range(H):
		for x in range(W):
			wall_format.append(pixels[x][y] >> 16 &0xFF)
			wall_format.append(pixels[x][y] >> 8 &0xFF)
			wall_format.append(pixels[x][y] &0xFF)
	
	b_wall_format = bytearray(wall_format) 

	return b_wall_format



def initPixels(w,h):
	global pixels
	global H,W
	for x in range(W):
		col=[]
		for y in range(H):
			col.append(0)
			
		pixels.append(col)
	return

def drawCharAt5x7(xref,yref,c,colour):
	global pixels
	global H,W
	global font_5x7_col
	
	letter = font_5x7_col[c]
	font_width=5
	font_height=7
	row_start=0
	row_end=font_height
	col_start=0
	col_end=font_width
	if(xref <= (-font_width)): #Out of screen to the left
		return

	if(yref <= (-font_height)): #Out of screen to the Top
		return
		
	if(yref >= H): #Out of screen to the bottom
		return

	if(xref >= W): #Out of screen to the right
		return

	row_start=  -yref if yref < 0 else 0
	col_start= -xref if xref < 0 else 0
	
	row_end= H-yref if yref + font_height > H else font_height
	col_end= W-xref if xref + font_width > W else font_width
	
	

	#Navigate through the letter pixels
	for row in range(row_start,row_end):
	
		for col in range(col_start,col_end):
		
			xn = xref + col
			yn = yref + row

			if (letter[col] & (0x40 >> row)):
		
				pixels[xn][yn]=colour
			
		
	return


def drawCharAt4x5(xref,yref,c,colour):
	global font_4x5_col
	global pixels
	global H,W
	letter = font_4x5_col[c]
    	
	font_width=4
	font_height=5
	
	row_start=0
	row_end=font_height
	col_start=0
	col_end=font_width

	if(xref <= (-font_width)):
		return

	if(yref <= (-font_height)):
		return

	if(yref >= H):
		return

	if(xref >= W):
		return
		
	row_start=  -yref if yref < 0 else 0
	col_start= -xref if xref < 0 else 0
	
	row_end= H-yref if yref + font_height > H else font_height
	col_end= W-xref if xref + font_width > W else font_width
	

	#Navigate through the letter pixels
	for row in range(row_start,row_end):
	
		for col in range(col_start,col_end):
		
			xn = xref + col
			yn = yref + row

			
			if (letter[row] & (0x08 >> col)):				
				pixels[xn][yn]=colour
			
		
	return


def drawStringAt4x5(xref,yref,s,colour):  
	for i in range(len(s)):
		drawCharAt4x5(xref,yref,s[i],colour)
		xref+=5
	return
def drawStringAt5x7(xref,yref,s,colour):
	for i in range(len(s)):
  
		drawCharAt5x7(xref,yref,s[i],colour)
		xref+=6

	return

def drawSolidColor(color):
	global pixels
	global H,W
	for x in range(W):
		for y in range(H):
			pixels[x][y]=color 

def clearPixels():
	drawSolidColor(0)
	return

def show():
	global pixels
	display(pixels)
	return


def setup():
	initPixels(W,H)
	return


#Variables Globales
xref=W
textstr="21:43:10"
disppoints=False;

#variable de temps d'affichage
time_ref=temps.time()
time_switch=15

mode = True


def draw():
	global xref
	global textstr
	global strwidth
	global disppoints
	global time_switch
	global time_ref
	global mode
	global FPS
	
	clearPixels();
	
	
	if(temps.time() - time_ref >= time_switch):
		time_ref=temps.time()
		mode= not mode
		xref = W if mode else xref
		#10 FPS in date mode
		#2 FPS in hour mode
		FPS = 10 if mode else 2
	
	
	if(mode):
		drawSolidColor(0)
		date = datetime.now().strftime("%d/%m/%Y")
		day = datetime.now().strftime("%d")
		mon = datetime.now().strftime("%m")
		year= datetime.now().strftime("%Y")
		c=0xFFFFFF
		xtemp=xref
		
		drawStringAt4x5(1,0,"Day",0xFF00FF)
		drawStringAt4x5(xtemp,5,day,0xFF0000)
		xtemp= xtemp + len(day)*5
		
		drawStringAt4x5(xtemp,5,"/",0xFFFFFF)
		xtemp = xtemp + 5
		
		drawStringAt4x5(xtemp,5,mon,0x00FF00)
		xtemp=xtemp+len(mon)*5
		
		drawStringAt4x5(xtemp,5,"/",0xFFFFFF)
		xtemp = xtemp + 5
		
		drawStringAt4x5(xtemp,5,year,0x0000FF)
		
		xtemp = xtemp + len(year)*5
		
		#drawStringAt4x5(xref,3,date,c)
		
		strwidth= xtemp - xref
		
		if(xref < -strwidth):
			xref=W
		else:
			xref=xref-1
		
	else:
		
	
		drawSolidColor(0)
	
		#Retrieve hours and minutes
		hour=datetime.now().strftime("%H")
		minute=datetime.now().strftime("%M")
	
		c=0xFF0000
		drawStringAt4x5(0,0,hour,c)
 
		c=0x00FF00
		disppoints= not disppoints
	
	
		if disppoints==False:
			drawStringAt4x5(2,5," "+minute,c)
		else:
			drawStringAt4x5(2,5,":",0xFFFFFF)
			drawStringAt4x5(2+5,5,minute,c)
			
	

   
	show()
  
	
  
	#if(xref < -strwidth):
	#	xref=W
	#else:
	#	xref=xref-1
	return
	
	
#Main Loop	
setup()
while(True):
	
	draw()
	temps.sleep(1/FPS)