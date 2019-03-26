#include "ledWall.h"

Led FrameBuffer[LED_WALL_HEIGHT][LED_WALL_WIDTH];

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
        perror("Could not open the framebuffer file for reading !\n");
        return 1;
    }

    numberLedRead = fread(&FrameBuffer, sizeof(Led), LED_WALL_HEIGHT*LED_WALL_WIDTH, Lwfb);
    if(numberLedRead != LED_WALL_HEIGHT*LED_WALL_WIDTH)
    {
        perror("Did not read the right number of bytes !\n");
        return 2;
    }
    fclose(Lwfb);


    return 0;
}
ws2811_return_t init_ledwall()
{
    ws2811_return_t ret;
    if ((ret = ws2811_init(&ledstring)) != WS2811_SUCCESS)
    {
        fprintf(stderr, "ws2811_init failed: %s\n", ws2811_get_return_t_str(ret));
    }
    return ret;
}
void render_ledwall(void)
{
    ws2811_return_t ret;
    int x, y;

    for (x = 0; x < LED_WALL_WIDTH; x++)
    {
        for (y = 0; y < LED_WALL_HEIGHT; y++)
        {
            ledstring.channel[0].leds[PixId(x, y)] = (FrameBuffer[y][x].red << 16 | FrameBuffer[y][x].green << 8 | FrameBuffer[y][x].blue);
            //printf("%d", PixId(x, y));
        }
    }

    if ((ret = ws2811_render(&ledstring)) != WS2811_SUCCESS)
    {
        fprintf(stderr, "ws2811_render failed: %s\n", ws2811_get_return_t_str(ret));
    }
}
