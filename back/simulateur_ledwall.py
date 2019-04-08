#POLYTECH LED WALL TEAM 2019
import tkinter as tk
import os
import sys
import time
import random
import sched
import time

LED_WALL_WIDTH = 16
LED_WALL_HEIGHT = 10
PIXEL_SIZE = 50
DRIVER_PATH = "/tmp/lwfb"

old_timestamp = 0;

class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self._cached_stamp = 0;
        self.master = master
        self.pack()
        self.create_widgets()
        
    def create_widgets(self):
        self.lw_canv = tk.Canvas(self.master, width=16 * PIXEL_SIZE, height=10 * PIXEL_SIZE, bg='#888888')
        self.lw_canv.pack(side="top")
        
        self.refresh_rdm_color()
        
        self.btn_quit = tk.Button(self, text="QUIT", fg="red", command=self.master.destroy)
        self.btn_quit.pack()
        
        self.btn_refresh = tk.Button(self, text="REFRESH")
        self.btn_refresh["command"] = self.refresh_file
        self.btn_refresh.pack()

        self.btn_random = tk.Button(self, text="RANDOM")
        self.btn_random["command"] = self.refresh_rdm_color
        self.btn_random.pack()

    def refresh_rdm_color(self):
        for i in range(LED_WALL_WIDTH):
            for j in range(LED_WALL_HEIGHT):
                self.lw_canv.create_rectangle(i * PIXEL_SIZE, j * PIXEL_SIZE, i * PIXEL_SIZE + PIXEL_SIZE, j * PIXEL_SIZE + PIXEL_SIZE, fill=("#" + "%06x" % random.randint(0, 0xFFFFFF)))

    def refresh_file(self):
        idx_color = 0
        bytes_read = open(DRIVER_PATH, "rb").read()
        rgb_values = []
        for b in bytes_read:
            rgb_values.append(int(b))
        #Check if the frame is valid
        if (len(rgb_values) != (LED_WALL_WIDTH * LED_WALL_HEIGHT) * 3):
            return -1
        #print(rgb_values)
        for y in range(LED_WALL_HEIGHT):
            for x in range(LED_WALL_WIDTH):
                color = '#%02x%02x%02x' % (rgb_values[idx_color], rgb_values[idx_color + 1], rgb_values[idx_color + 2])
                idx_color += 3
                self.lw_canv.create_rectangle(x * PIXEL_SIZE, y * PIXEL_SIZE, x * PIXEL_SIZE + PIXEL_SIZE, y * PIXEL_SIZE + PIXEL_SIZE, fill=color)
        #print(idx_color)
        return 0

root = tk.Tk()
root.title("LED Wall simulator")
app = Application(master=root)
#app.mainloop()
while True:
    current_timestamp = os.path.getmtime(DRIVER_PATH)
    if (old_timestamp == 0 or current_timestamp != old_timestamp):
        app.update()
        old_timestamp = current_timestamp
        app.refresh_file()
        time.sleep(0.01)

