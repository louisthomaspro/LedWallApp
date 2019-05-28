#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdint.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>


int main()
{
	
	uint32_t color=0;
	uint8_t count=0;
	
	int fd = open("/dev/rpmsg_pru30",O_WRONLY);
	while(1)
	{
		
		color = 0xFF << (count*8);
		dprintf(fd, "0 %06X\n", color);
		printf("0 %06X\n", color);
		dprintf(fd, "-1 %04X\n",1); //Indicate to latch 1 LED
		printf("-1 %04X\n",1); 
		sleep(1);
		
		count = (count + 1) % 3;
	}
	
	close(fd);
	return 0;
}