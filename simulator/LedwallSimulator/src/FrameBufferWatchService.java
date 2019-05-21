import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.WatchService;

public class FrameBufferWatchService {


	String framebufferPath;

	public FrameBufferWatchService(String framebufferPath) throws IOException {
		super();
		this.framebufferPath = framebufferPath;

		WatchService ws=FileSystems.getDefault().newWatchService();


	}


	public static int[][] readFrameBuffer(File f,int W,int H) throws IOException
	{
		FileInputStream fis=new FileInputStream(f);

		byte[] frame = new byte[3*W*H];
		int[][] colors=new int[W][H];

		int n=fis.read(frame, 0, 3*H*W);

		if(n==3*H*W)
		{
			for(int y=0;y<H;y++)
			{
				for(int x=0;x<W;x++)
				{
					int id= y*W + x;

					colors[x][y]= (int)frame[3*id] << 16 | (int)frame[3*id+1] << 8 | (int)frame[3*id+2];
				}
			}
		}


		fis.close();

		return colors;
	}

	public static boolean updateFrameBuffer(File f,int colors[][]) throws IOException 
	{

		boolean success = false;

		int W=colors.length;
		int H=colors[0].length;

		byte[] frame = new byte[3*W*H];

		FileInputStream fis=new FileInputStream(f);

		int n=fis.read(frame, 0, 3*H*W);
		
		fis.close();
		
		if(n!=3*H*W)
		{
			//Didn't update the framebuffer because not the correct nb of bytes
			System.out.println("Framebuffer has not the correct amount of bytes");
			System.out.printf("n=%d\r\n",n);
			success=false;
		}
		else
		{
			for(int y=0;y<H;y++)
			{
				for(int x=0;x<W;x++)
				{
					int id= y*W + x;
					int r=frame[3*id];
					int g=frame[3*id+1];
					int b=frame[3*id+2];

					colors[x][y]= (r&0xFF)<<16 | (g&0xFF)<<8 | (b&0xFF);

				}
			}
			success=true;
		}
		
		

		return success;
	}


}
