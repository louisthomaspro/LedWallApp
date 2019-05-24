from time import sleep
from random import randint


red = [0xff, 0x00, 0x00]
darkred = [0xbc, 0x00, 0x00]
blue = [0x00, 0x00, 0xff]

WIDTH = 16
HEIGHT = 10

snake = [] # Initial snake co-ordinates
wall = []

KEY_UP=1
KEY_DOWN=2
KEY_LEFT=3
KEY_RIGHT=4



def init():
	global snake
	global wall
	snake = [[4,10], [4,9], [4,8], [4,7], [4,6]]
	wall = []
	for i in range(HEIGHT):
		wall.append([blue] * WIDTH)
	


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
	for i in range(HEIGHT):
		for j in range(WIDTH):
			wall_format.append(wall[i][j][0])
			wall_format.append(wall[i][j][1])
			wall_format.append(wall[i][j][2])
	
	b_wall_format = bytearray(wall_format) 

	return b_wall_format


def displaySnake(snake, wall):
	i = 0
	for value in snake:
		if (i == 0):
			wall[value[0]][value[1]] = darkred
		else:
			wall[value[0]][value[1]] = red
		i+=1


init()

while(1):

	newLine = []
	newCol = []

	key = 1
	failed = 0
	while True:
		key = randint(1, 4)
		newLine = snake[0][0] + (key == KEY_DOWN and 1) + (key == KEY_UP and -1)
		newCol = snake[0][1] + (key == KEY_LEFT and -1) + (key == KEY_RIGHT and 1)

		if ([newLine, newCol] in snake or newLine < 0 or newLine > HEIGHT-1 or newCol < 0 or newCol > WIDTH-1):
			failed+=1
			if (failed > 20):
				init()
				break
		else:
			break
		

	if (failed > 20):
		continue

	snake.insert(0, [newLine, newCol])
	last = snake.pop()
	wall[last[0]][last[1]] = blue

	# WALL[LIGNE][COLONNE]



	displaySnake(snake, wall)
	display(wall)

	sleep(0.2)