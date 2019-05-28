from time import sleep
from random import randint
import numpy


snake_body_color = [0xff, 0x00, 0x00]
snake_head_color = [0x63, 0x03, 0x03] #dark red
wall_color = [0x00, 0x00, 0xff] #blue
food_color = [0xe0, 0xb1, 0x16] #orange

WIDTH = 16
HEIGHT = 10

snake = [] # Initial snake co-ordinates
wall = []
food = [3,3] 

KEY_UP=1
KEY_DOWN=2
KEY_LEFT=3
KEY_RIGHT=4

neighbors = [(0, 1), (0, -1), (1, 0), (-1, 0)]


def init():
	global snake
	global wall
	snake = [[4,10], [4,9], [4,8], [4,7]]
	wall = []
	for i in range(HEIGHT):
		wall.append([wall_color] * WIDTH)


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
			wall[value[0]][value[1]] = snake_head_color
		else:
			wall[value[0]][value[1]] = snake_body_color
		i+=1


def displayFood(food, wall):
	wall[food[0]][food[1]] = food_color


def getObstaclesGrid():
	global snake
	grid = []
	for i in range(HEIGHT):
		grid.append([0] * WIDTH)
	for pos in snake:
		grid[pos[0]][pos[1]] = 1
	return grid


def h(a, b):
    """Return distance between 2 points"""
    return (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2

def find_path(start, end, grid):
    """Return path between 2 points
    example :
    grid = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
    ]
    path = find_path((3,3), (0, 0), grid)
    """
    array = numpy.array(grid)

    open_list = []
    close_list = []
    came_from = {}

    # Add F score in open_list
    gscore = {start:0}
    fscore = {start:h(start, end)}
    open_list.append((fscore[start], start))

    while open_list:

        # Get min F value in open_list
        minf = min(open_list, key=lambda o: o[0])
        current = minf[1]
        open_list.remove(minf)

        # Return path
        if current == end:
            data = []
            while current in came_from:
                data.append(list(current))
                current = came_from[current]
            return data[::-1]

        # Add current node in close_list
        close_list.append(current)

        # For neighbors
        for i, j in neighbors:
            neighbor = current[0] + i, current[1] + j
            tentative_g_score = gscore[current] + h(current, neighbor)

            # Check neighbor value
            if 0 <= neighbor[0] < array.shape[0]:
                if 0 <= neighbor[1] < array.shape[1]:
                    if array[neighbor[0]][neighbor[1]] == 1 and (neighbor[0], neighbor[1]) != end:
                        continue
                else:
                    continue
            else:
                continue

            # Continue if neighbor is in close list
            if neighbor in close_list and tentative_g_score >= gscore.get(neighbor, 0):
                continue

            # If neighbor is not in open_list
            if tentative_g_score < gscore.get(neighbor, 0) or neighbor not in [i[1]for i in open_list]:
                came_from[neighbor] = current
                gscore[neighbor] = tentative_g_score
                fscore[neighbor] = tentative_g_score + h(neighbor, end)
                open_list.append((fscore[neighbor], neighbor))

    return []












init()
grid = [
	[0, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 0],
]

path = []

while(True):

	newPos = [-1, -1]

	path = find_path(tuple(snake[0]), tuple(food), getObstaclesGrid())
	if (len(path) > 0):
		newPos = path[0]
		path.pop(0)
	else:
		print("random !!")
		key = 1
		failed = 0
		while True:
			key = randint(1, 4)
			newPos[0] = snake[0][0] + (key == KEY_DOWN and 1) + (key == KEY_UP and -1)
			newPos[1] = snake[0][1] + (key == KEY_LEFT and -1) + (key == KEY_RIGHT and 1)

			if (newPos in snake or newPos[0] < 0 or newPos[0] > HEIGHT-1 or newPos[1] < 0 or newPos[1] > WIDTH-1
			# or food == newPos
			):
				failed+=1
				if (failed > 20):
					init()
					break
			else:
				break
			
		if (failed > 20):
			continue

	snake.insert(0, newPos)

	# WALL[LIGNE][COLONNE]

	if snake[0] == food:   # When snake eats the food
		food = []
		while food == []:
			food = [randint(0, HEIGHT-1), randint(0, WIDTH-1)]   # Calculating next food's coordinates
			if food in snake: food = []
	else:    
		last = snake.pop()
		wall[last[0]][last[1]] = wall_color


	displayFood(food, wall)
	displaySnake(snake, wall)
	display(wall)

	sleep(0.2)