import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;

import javax.swing.JFileChooser;

public class MainLWSimulator {

	//put the directory name from the root of systemdrive
	public static final String LWFBDir="tmp";
	public static final String LWFBfilename="lwfb";
	
	private static File lwfbFile;
	private static LedWallPanel ledwall;

	
	public static void refreshLEDWall(LedWallPanel ledwall,File lwfb)
	{
		try {
			FrameBufferWatchService.updateFrameBuffer(lwfb, ledwall.getPixels());
			ledwall.Show();
		}
		catch(IOException e)
		{
			
			e.printStackTrace();
		}
	}
	public static void globalRefreshLEDWall()
	{
		refreshLEDWall(ledwall, lwfbFile);
	}

	public static void main(String[] args) throws IOException, InterruptedException {
		
		
		LedWallFrame m=new LedWallFrame();
		ledwall=m.ledwall;
		
		// Main fileWatcher process
		JFileChooser jfc=new JFileChooser();
		jfc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
		jfc.setApproveButtonText("Use this directory");
		jfc.setMultiSelectionEnabled(false);
		jfc.showDialog(m,"Select /tmp folder where lwfb is stored");
		
		
		Path tmpFolderPath=FileSystems.getDefault().getPath(System.getenv("DriveRoot")+File.separator+LWFBDir);
		
		if(jfc.getSelectedFile()  !=null)
		{
			tmpFolderPath = jfc.getSelectedFile().toPath();
		}		
		
		System.out.println(tmpFolderPath);
		
		lwfbFile = new File(tmpFolderPath.toFile(),LWFBfilename);
		
		
		//Load the LEDWall framebuffer file for the first time
		globalRefreshLEDWall();
		
		
		try (final WatchService watchService = FileSystems.getDefault().newWatchService()) {
			
			//Watch changes to files in the folder
		    final WatchKey watchKeyModif = tmpFolderPath.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY,StandardWatchEventKinds.ENTRY_CREATE);
		    
		    
		    while (true) {
		    	
		    	//Block until an event occurs oin the folder
		        final WatchKey wk = watchService.take();
		        
		        //Poll events that occurs
		        for (WatchEvent<?> event : wk.pollEvents()) {
		        		
		        	
		        	if(event.kind() == StandardWatchEventKinds.ENTRY_CREATE
		        			|| event.kind() == StandardWatchEventKinds.ENTRY_MODIFY)
		        	{
		        		//we only register "ENTRY_MODIFY" so the context is always a Path.
		        		final Path changed = (Path) event.context();
		        		System.out.println(changed);
		            
		            
		        		if (changed.endsWith(LWFBfilename)) {
		            	
		        			System.out.println("Framebuffer Updated");
		                		                           
		        			globalRefreshLEDWall();
		                
		        		}
		        	}
		     
		            
		        }
		        // reset the key
		        boolean valid = wk.reset();
		        if (!valid) {
		            System.out.println("Key has been unregisterede");
		        }
		    }
		}
		
	}

}
