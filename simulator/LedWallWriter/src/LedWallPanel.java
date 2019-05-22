import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.util.Random;

import javax.swing.JPanel;

public class LedWallPanel extends JPanel {

	int W;
	int H;

	int pixels[][];


	public LedWallPanel()
	{
		this(16,10,new int[16][10]);
	}

	public LedWallPanel(int w, int h,int pixels[][]) {
		super();
		W = w;
		H = h;
		this.pixels = pixels;
		LedWallPanel.fillRandomColors(pixels);
	}


	public int getW() {
		return W;
	}

	public int getH() {
		return H;
	}

	public void setW(int w) {
		W = w;
	}

	public void setH(int h) {
		H = h;
	}

	public void setPixels(int pixels[][])
	{
		this.pixels=pixels;
	}

	public int[][] getPixels()
	{
		return pixels;
	}

	@Override
	public void paint(Graphics g) {

		super.paint(g);

		Graphics2D g2d=(Graphics2D)g;

		g2d.setBackground(new Color(220,220,220));

		int pixW=g2d.getClipBounds().width / W;
		int pixH=g2d.getClipBounds().height / H;

		pixW=Math.min(pixW, pixH);
		pixH=pixW;
		
		int dx=pixW/30;
		int dy=pixH/30;

		for(int x=0;x<W;x++)
		{
			for(int y=0;y<H;y++)
			{
				g2d.setColor(Color.LIGHT_GRAY);
				g2d.fillRect(pixW*x,pixH*y,pixW,pixH);
				
				Color c=new Color(pixels[x][y]);

				g2d.setColor(c);

				//g2d.fillRect(pixW*x + pixW/10,pixH*y + pixH/10,pixW - pixW/10,pixH - pixH/10);
				g2d.fill3DRect(pixW*x+dx,pixH*y+dy,pixW-2*dx,pixH-2*dy,true);
			}
		}
	}

	public void clear()
	{
		for(int x=0;x<W;x++)
		{
			for(int y=0;y<H;y++)
			{
				pixels[x][y]=0;
			}
		}

		invalidate();
	}

	public static void fillRandomColors(int pixels[][])
	{
		for(int x=0;x<pixels.length;x++)
		{
			for(int y=0;y<pixels[x].length;y++)
			{
				pixels[x][y]=new Random().nextInt(0xFFFFFF);
			}
		}
	}

	public void Show()
	{
		revalidate();
		repaint();
	}
	

	
}
