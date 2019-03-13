import tkinter as tk
import os
import sys
import time
import random
import sched
import time

PIXEL_SIZE = 50

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
        for i in range(16):
            for j in range(10):
                self.lw_canv.create_rectangle(i * PIXEL_SIZE, j * PIXEL_SIZE, i * PIXEL_SIZE + PIXEL_SIZE, j * PIXEL_SIZE + PIXEL_SIZE, fill=("#" + "%06x" % random.randint(0, 0xFFFFFF)))

    def refresh_file(self):
        idx_color = 0;
        fo = open("ws2812driver", "r")
        rgb_values = fo.readlines()[0].split(',')
        print(rgb_values)
        for j in range(10):
            for i in range(16):
                color = '#%02x%02x%02x' % (int(rgb_values[idx_color]), int(rgb_values[idx_color + 1]), int(rgb_values[idx_color + 2]))
                idx_color += 3
                self.lw_canv.create_rectangle(i * PIXEL_SIZE, j * PIXEL_SIZE, i * PIXEL_SIZE + PIXEL_SIZE, j * PIXEL_SIZE + PIXEL_SIZE, fill=color)
        print(idx_color)

s = sched.scheduler(time.time, time.sleep)

root = tk.Tk()
app = Application(master=root)
app.mainloop()
##while True:
##    app.update()
####    idx_color = 0;
####    fo = open("ws2812driver", "r")
####    rgb_values = fo.readlines()[0].split(',')
####    #print(rgb_values)
####    for i in range(16):
####        for j in range(10):
####            color = '#%02x%02x%02x' % (int(rgb_values[idx_color]), int(rgb_values[idx_color + 1]), int(rgb_values[idx_color + 2]))
####            idx_color += 3
####            app.lw_canv.create_rectangle(i * PIXEL_SIZE, j * PIXEL_SIZE, i * PIXEL_SIZE + PIXEL_SIZE, j * PIXEL_SIZE + PIXEL_SIZE, fill=color)
####    #print(idx_color)
##    time.sleep(0.1)


