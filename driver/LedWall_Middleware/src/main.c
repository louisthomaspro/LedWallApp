#include <stdio.h>
#include <stdlib.h>
#include <sys/inotify.h>
#include "notifyEvent.h"
#include "ledWall.h"

int main()
{
    if(initEvent()!=0)
        return 1;

    init_ledwall();

    while(1)
    {
        if(waitForEvent()!=0)
            return 2;

        printf("IN_CLOSE_WRITE\n");

        if(readFrame()!=0)
            return 3;


        printf("%08X\n", *((uint32_t *) &FrameBuffer[0][0]));

        for(int i=0;i<LED_WALL_HEIGHT;i++)
        {
            for(int j=0;j<LED_WALL_WIDTH;j++)
                printf("{%02X,%02X,%02X}", FrameBuffer[i][j].red, FrameBuffer[i][j].green, FrameBuffer[i][j].blue);
            printf("|\n");
        }

        render_ledwall();


    }
    return 0;
}
