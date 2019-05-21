import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.HeadlessException;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;

public class LedWallFrame extends JFrame {
	
	public static final String TITLE= "LED Wall Simulator";
	public static final int WIDTH=16*40;
	public static final int HEIGHT=10*40+60;
	LedWallPanel ledwall;
	JTextArea LogPane;
	JButton refreshBtn;
		

	public LedWallFrame() throws HeadlessException {
		this(TITLE);
	}

	public LedWallFrame(String arg0) throws HeadlessException {
		super(arg0);
		
		
		refreshBtn = new JButton("Manual Refresh");
		
		ledwall=new LedWallPanel();
	
		refreshBtn.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				
				MainLWSimulator.globalRefreshLEDWall();
				
			}
		});
		
		
		JPanel container = new JPanel(new BorderLayout());
		
		container.add(refreshBtn,BorderLayout.NORTH);
		container.add(ledwall,BorderLayout.CENTER);
		
		add(container);
		setPreferredSize(new Dimension(WIDTH, HEIGHT));
		pack();
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setVisible(true);
	}
	
	
}
