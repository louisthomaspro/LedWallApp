#include <stdio.h>
#include <stdlib.h>
#include "notifyEvent.h"
#include "ledWall.h"

int main()
{
    int ret;
    if(initEvent()!=0)
        return 1;

    init_ledwall();

    while(1)
    {
        if(waitForEvent()!=0)
            return 2;

        //printf("IN_CLOSE_WRITE\n");

        ret = readFrame();
        if(ret==2)
            continue;
        else if(ret==1)
            return 3;


        /*for(int i=0;i<LED_WALL_HEIGHT;i++)
        {
            for(int j=0;j<LED_WALL_WIDTH;j++)
                printf("{%02X,%02X,%02X}", FrameBuffer[i][j].red, FrameBuffer[i][j].green, FrameBuffer[i][j].blue);
            printf("|\n");
        }*/
        applyColorCorrection(COLOR_BALANCE);
        render_ledwall();


    }
    return 0;
}
