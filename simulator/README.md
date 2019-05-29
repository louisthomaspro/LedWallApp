# This is the LED Wall Simulator
You can choose between Python and JAVA.
Java is the newest version and uses less CPU to run.

Use the Simulator to test you Python script and LedWallApp application without deploying to the Linux board target.
It simulated the 16x10 LED Wall in a PC software.

## Running the simulator
Make sure to create a **/tmp** folder where to store the **lwfb** file containing the framebuffer to display.

Start LedWallSimulator.jar with **JAVA JRE 7 minimum**.
Then select the **correspondig /tmp** folder where lwfb is or will be stored

Now the Simulator will update once you write exactly 480 bytes to the lwfb file and display the content of **lwfb**.

Colors are displayed by reading the lwfb file accordingly:
**R0_0 G0_0 B0_0 R0_1 G0_1 B0_1 R0_2 G0_2 B0_2 ... R0_15 G0_15 B0_15
R1_0 G1_0 B1_0 R1_1 G1_1 B1_1 R1_2 G1_2 B1_2 ... R1_15 G1_15 B1_15
...
R9_0 G9_0 B9_0 R9_1 G9_1 B9_1 ... R9_15 G9_15 B9_15**

Where each **Ry_x , Gy_x , By_x** are **bytes** correspondig to the **red, green, blue** colors in scale of **[0,255]** of the **(x,y)** pixel


## How to write to lwfb file

Your applications should write the **lwfb** file accordingly:
1. **open /tmp/lwfb**
1. **write the 480 bytes colors of the pixels to the lwfb file (using the program of your choice)**
1. **close /tmp/lwfb**

You can find an example of a JAVA program writing the **lwfb** file in LedWallWriter directories of the repo.

