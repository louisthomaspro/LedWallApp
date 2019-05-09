#ifndef LEDWALL_H_INCLUDED
#define LEDWALL_H_INCLUDED


#include <errno.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#include "led.h"
#include "notifyEvent.h"
#include "clk.h"
#include "gpio.h"
#include "dma.h"
#include "pwm.h"
#include "ws2811.h"

#define LED_WALL_WIDTH 16
#define LED_WALL_HEIGHT 10
#define LED_COUNT               (LED_WALL_WIDTH * LED_WALL_HEIGHT)
#define COLOR_BALANCE 0xFFE08C

#define TARGET_FREQ             WS2811_TARGET_FREQ
#define GPIO_PIN                18
#define DMA                     10

#define BEAGLE

#define STRIP_TYPE WS2811_STRIP_GRB

extern Led FrameBuffer[LED_WALL_HEIGHT][LED_WALL_WIDTH];

int readFrame();

ws2811_return_t init_ledwall();

void applyColorCorrection(uint32_t balance);

void render_ledwall();

#endif // LEDWALL_H_INCLUDED
