// Use rpmsg to control the NeoPixels via /dev/rpmsg_pru30
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>			// atoi
#include <string.h>
#include <pru_cfg.h>
#include <pru_intc.h>
#include <rsc_types.h>
#include <pru_rpmsg.h>
#include "resource_table_0.h"

volatile register uint32_t __R30;
volatile register uint32_t __R31;

/* Host-0 Interrupt sets bit 30 in register R31 */
#define HOST_INT			((uint32_t) 1 << 30)	

/* The PRU-ICSS system events used for RPMsg are defined in the Linux device tree
 * PRU0 uses system event 16 (To ARM) and 17 (From ARM)
 * PRU1 uses system event 18 (To ARM) and 19 (From ARM)
 */
#define TO_ARM_HOST			16	
#define FROM_ARM_HOST		17

/*
* Using the name 'rpmsg-pru' will probe the rpmsg_pru driver found
* at linux-x.y.z/drivers/rpmsg/rpmsg_pru.c
*/
#define CHAN_NAME			"rpmsg-pru"
#define CHAN_DESC			"Channel 30"
#define CHAN_PORT			30

/*
 * Used to make sure the Linux drivers are ready for RPMsg communication
 * Found at linux-x.y.z/include/uapi/linux/virtio_config.h
 */
#define VIRTIO_CONFIG_S_DRIVER_OK	4

char payload[RPMSG_BUF_SIZE];

#define STR_LEN 24
#define MAX_STR_LEN 200
#define	oneCyclesOn		700/5	// Stay on for 700ns
#define oneCyclesOff	600/5
#define zeroCyclesOn	350/5
#define zeroCyclesOff	800/5
#define resetCycles		51000/5	// Must be at least 50u, use 51u
#define out 1					// Bit number to output on -> This is P9_29 on BB Black

#define SPEED 20000000/5		// Time to wait between updates

typedef struct{
	uint8_t r;
	uint8_t g;
	uint8_t b;
}Led;

Led colors[MAX_STR_LEN];
uint32_t color[MAX_STR_LEN];	// green, red, blue
Led color_cor={.r=0xFF,.b=0xFF,.g=0xFF}; //Color correction on the LEDs

void main(void)
{
	struct pru_rpmsg_transport transport;
	uint16_t src, dst, len;
	volatile uint8_t *status;
	
	uint8_t r, g, b;
	int i, j;
	// Set everything to background
	for(i=0; i<MAX_STR_LEN; i++) {
		color[i] = 0x000000;
	}

	/* Allow OCP master port access by the PRU so the PRU can read external memories */
	CT_CFG.SYSCFG_bit.STANDBY_INIT = 0;

	/* Clear the status of the PRU-ICSS system event that the ARM will use to 'kick' us */
	CT_INTC.SICR_bit.STS_CLR_IDX = FROM_ARM_HOST;

	/* Make sure the Linux drivers are ready for RPMsg communication */
	status = &resourceTable.rpmsg_vdev.status;
	while (!(*status & VIRTIO_CONFIG_S_DRIVER_OK));

	/* Initialize the RPMsg transport structure */
	pru_rpmsg_init(&transport, &resourceTable.rpmsg_vring0, &resourceTable.rpmsg_vring1, TO_ARM_HOST, FROM_ARM_HOST);

	/* Create the RPMsg channel between the PRU and ARM user space using the transport structure. */
	while (pru_rpmsg_channel(RPMSG_NS_CREATE, &transport, CHAN_NAME, CHAN_DESC, CHAN_PORT) != PRU_RPMSG_SUCCESS);
	while (1) {
		/* Check bit 30 of register R31 to see if the ARM has kicked us */
		if (__R31 & HOST_INT) {
			/* Clear the event status */
			CT_INTC.SICR_bit.STS_CLR_IDX = FROM_ARM_HOST;
			/* Receive all available messages, multiple messages can be sent per kick */
			while (pru_rpmsg_receive(&transport, &src, &dst, payload, &len) == PRU_RPMSG_SUCCESS) {
			    char *ret;	// rest of payload after front character is removed
			    int index;	// index of LED to control
			    // NO LONGER : Input format is:  index red green blue
				// Input format is:  index RRGGBB
					//With RR being the Hex value of index
					// idem for GG and BB
			    //index = atoi(payload);
				index = strtol(payload,&ret,10);
			    // Update the array, but don't write it out.
				/*
			    if((index >=0) & (index < STR_LEN)) {
				
			    	ret = strchr(payload, ' ');	// Skip over index
				    r = strtol(&ret[1], NULL, 0);
				    ret = strchr(&ret[1], ' ');	// Skip over r, etc.
				    g = strtol(&ret[1], NULL, 0);
				    ret = strchr(&ret[1], ' ');
				    b = strtol(&ret[1], NULL, 0);

				    color[index] = (g<<16)|(r<<8)|b;	// String wants GRB

			    } */
				if((index >=0) & (index < MAX_STR_LEN)) {
					//ret = strchr(payload, ' ');	// Skip over index
					uint32_t rawhex = strtol(&ret[1], NULL, 16) & 0x00FFFFFF; //Mask out to 24 bits
					colors[index].r= ( rawhex >> 16 ) & 0xFF;
					colors[index].g= ( rawhex >> 8 ) & 0xFF;
					colors[index].b= ( rawhex ) & 0xFF;
					#if 0
					uint32_t rawhex = strtol(&ret[1], NULL, 16) & 0x00FFFFFF; //Mask out to 24 bits
					r= ( rawhex >> 16 ) & 0xFF;
					g= ( rawhex >> 8 ) & 0xFF;
					b= ( rawhex ) & 0xFF;
					
					color[index] = (g<<16)|(r<<8)|b;	// String wants GRB
					#endif
				}
			    // When index is -1, send the array to the LED string
				//The value following the -1 is the number of LEDs to latch in hex format
			    if(index == -1) {
				    // Output the string
					//ret = strchr(payload, ' ');	// Skip over index
					uint16_t nb_leds= strtol(&ret[1], NULL, 16) & 0xFFFF;
					nb_leds = nb_leds > MAX_STR_LEN ? MAX_STR_LEN : nb_leds; //Allow only MAX_STR_LEN leds to be latched
					uint32_t color_corrected;
					
					for(j=0; j<nb_leds; j++) {
						// Cycle through each bit
						r = (((uint16_t)color_cor.r) * colors[j].r) / 0xFF;
						g = (((uint16_t)color_cor.g) * colors[j].g) / 0xFF;
						b = (((uint16_t)color_cor.b) * colors[j].b) / 0xFF;
						color_corrected = (g<<16)|(r<<8)|b;
						
						for(i=23; i>=0; i--) {
							if(color_corrected & (0x1<<i)) {
								__R30 |= 0x1<<out;		// Set the GPIO pin to 1
								__delay_cycles(oneCyclesOn-1);
								__R30 &= ~(0x1<<out);	// Clear the GPIO pin
								__delay_cycles(oneCyclesOff-14);
							} else {
								__R30 |= 0x1<<out;		// Set the GPIO pin to 1
								__delay_cycles(zeroCyclesOn-1);
								__R30 &= ~(0x1<<out);	// Clear the GPIO pin
								__delay_cycles(zeroCyclesOff-14);
							}
						}
					}
					// Send Reset
					__R30 &= ~(0x1<<out);	// Clear the GPIO pin
					__delay_cycles(resetCycles);
		
					// Wait
					//__delay_cycles(SPEED);
			    }
				
				//Apply color correction
				if(index == -2) {
					uint32_t rawhex = strtol(&ret[1], NULL, 16) & 0x00FFFFFF; //Mask out to 24 bits
					color_cor.r= ( rawhex >> 16 ) & 0xFF;
					color_cor.g= ( rawhex >> 8 ) & 0xFF;
					color_cor.b= ( rawhex ) & 0xFF;
				}

			}
		}
	}
}
