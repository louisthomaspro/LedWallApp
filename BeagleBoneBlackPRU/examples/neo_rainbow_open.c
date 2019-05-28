#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdint.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <math.h>

#define NB_LEDS 160
int main()
{
	
	uint32_t color=0;
	uint8_t count=0;
	uint8_t r,g,b;
	uint16_t len = 160;
	double amp = 12;
	double f = 25;
	uint16_t shift = 3;
	uint16_t phase = 0;
	
	int fd = open("/dev/rpmsg_pru30",O_WRONLY);
	while(1)
	{
		
		
		for(int i=0;i<NB_LEDS;i++)
		{
			r = (amp * ( sin(2*M_PI*f*(i-phase-0*shift)/len) + 1)) + 1;
			g = (amp * ( sin(2*M_PI*f*(i-phase-1*shift)/len) + 1)) + 1;
			b = (amp * ( sin(2*M_PI*f*(i-phase-2*shift)/len) + 1)) + 1;
			
			color = r<<16 | g<<8 | b;
			
			dprintf(fd, "%d %06X\n",i, color);
			
			//printf("%d %06X\n",i, color);
		
		}
		dprintf(fd, "-1 %04X\n",NB_LEDS); //Indicate to latch NB_LEDS leds ! 
		printf("-1 %04X\n",NB_LEDS);
		usleep(20000);
		
		count = (count + 1) % 3;
		phase++;
	}
	
	close(fd);
	return 0;
}