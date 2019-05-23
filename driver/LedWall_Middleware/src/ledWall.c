#include "ledWall.h"
#include <errno.h>

Led FrameBuffer[LED_WALL_HEIGHT][LED_WALL_WIDTH];
#ifdef RASPBERRY
ws2811_t ledstring =
{
    .freq = TARGET_FREQ,
    .dmanum = DMA,
    .channel =
    {
        [0] =
        {
            .gpionum = GPIO_PIN,
            .count = LED_COUNT,
            .invert = 0,
            .brightness = 255,
            .strip_type = STRIP_TYPE,
        }/*,
        [1] =
        {
            .gpionum = 0,
            .count = 0,
            .invert = 0,
            .brightness = 0,
        },*/
    },
};
#endif

#ifdef BEAGLE
int pru_rpmsg_fd=-1;
#endif

/**
   Returns the Pixel ID in the LED string
   @param x : from 0 to W (excluded)
   @param y : from 0 to H (excluded)
   @return
*/
uint8_t PixId(uint8_t x, uint8_t y)
{
  if (x % 2 == 0)
  {
    return (LED_WALL_WIDTH - 1 - x) * LED_WALL_HEIGHT + y;
  }
  else
  {
    return (LED_WALL_WIDTH - 1 - x) * LED_WALL_HEIGHT + (LED_WALL_HEIGHT - 1) - y;
  }
}


int readFrame()
{
    int numberLedRead;

    Lwfb = fopen(LWFB_Path, "r");
    if(!Lwfb)
    {
        fprintf(stderr, "Could not open the framebuffer file for reading !\n");
        fprintf(stderr, "ERROR: %s\n", strerror(errno));
        return 1;
    }

    numberLedRead = fread(&FrameBuffer, sizeof(Led), LED_WALL_HEIGHT*LED_WALL_WIDTH, Lwfb);
    if(numberLedRead != LED_WALL_HEIGHT*LED_WALL_WIDTH)
    {
        fprintf(stderr, "Did not read the right number of bytes !\n%d bytes were read instead of %d !\n", numberLedRead,LED_WALL_HEIGHT*LED_WALL_WIDTH);
        fprintf(stderr, "ERROR: %s\n", strerror(errno));
        return 2;
    }
    fclose(Lwfb);


    return 0;
}
ws2811_return_t init_ledwall()
{
	ws2811_return_t ret=WS2811_SUCCESS;
	#ifdef RASPBERRY

    if ((ret = ws2811_init(&ledstring)) != WS2811_SUCCESS)
    {
        fprintf(stderr, "ws2811_init failed: %s\n", ws2811_get_return_t_str(ret));
    }

	#elif defined BEAGLE
	pru_rpmsg_fd = open("/dev/rpmsg_pru30",O_WRONLY); //Where do we close this ?
	if(pru_rpmsg_fd == -1)
	{
		fprintf(stderr, "ws2811_init failed: %s\n", "Could not open /dev/rpmsg_pru30");
		ret=WS2811_ERROR_GENERIC;
	}
	#endif

	return ret;

}
void applyColorCorrection(uint32_t balance)
{
#ifdef RASPBERRY
    for (uint8_t x = 0; x < LED_WALL_WIDTH; x++)
    {
        for (uint8_t y = 0; y < LED_WALL_HEIGHT; y++)
        {
            FrameBuffer[y][x].red = FrameBuffer[y][x].red * ((balance >> 16) & 0xFF) / 0xFF;
            FrameBuffer[y][x].green = FrameBuffer[y][x].green * ((balance >> 8) & 0xFF) / 0xFF;
            FrameBuffer[y][x].blue = FrameBuffer[y][x].blue * (balance & 0xFF) / 0xFF;
        }
    }
#elif defined BEAGLE
			dprintf(pru_rpmsg_fd, "-2 %06X\n",balance);
#endif
}
void render_ledwall(void)
{
	#ifdef RASPBERRY
    ws2811_return_t ret;
	#endif
    int x, y;

    for (x = 0; x < LED_WALL_WIDTH; x++)
    {
        for (y = 0; y < LED_WALL_HEIGHT; y++)
        {
			#ifdef RASPBERRY
            ledstring.channel[0].leds[PixId(x, y)] = (FrameBuffer[y][x].red << 16 | FrameBuffer[y][x].green << 8 | FrameBuffer[y][x].blue);

			#elif defined BEAGLE
			dprintf(pru_rpmsg_fd, "%d %06X\n", PixId(x,y), (FrameBuffer[y][x].red << 16 | FrameBuffer[y][x].green << 8 | FrameBuffer[y][x].blue));
			#endif
			//printf("%d", PixId(x, y));
        }
    }

	#ifdef RASPBERRY
    if ((ret = ws2811_render(&ledstring)) != WS2811_SUCCESS)
    {
        fprintf(stderr, "ws2811_render failed: %s\n", ws2811_get_return_t_str(ret));
    }
	#elif defined BEAGLE
		dprintf(pru_rpmsg_fd, "-1 %06X\n",LED_COUNT);
	#endif
}
