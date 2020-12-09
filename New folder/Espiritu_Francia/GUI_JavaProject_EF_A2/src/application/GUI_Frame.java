package application;

import javax.swing.JFrame;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.ActionEvent;
import java.awt.Font;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import util.Broker;

/**
 *
 *
 */
public class GUI_Frame 
{
	
	private Broker broker;
	
	public GUI_Frame()
	{
		initialize();
	}
	public void initialize()
	{
		JFrame frame = new JFrame();
		frame.setTitle("Integration Assignment");
		frame.setBounds(100,100,750,400);
		frame.setResizable(false);
		
		JButton btnCheck = new JButton("Check");
		btnCheck.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnCheck.setBounds(296, 53, 279, 25);
		btnCheck.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent arg0) 
			{
				login();
			}
		});
		frame.getContentPane().setLayout(null);
		frame.getContentPane().add(btnCheck);
		
		JButton btnProcess = new JButton("Process");
		btnProcess.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e) 
			{
				broker.processFile();
			}
		});
		btnProcess.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnProcess.setBounds(296, 110, 279, 25);
		frame.getContentPane().add(btnProcess);
		
		JButton btnPerform = new JButton("Perform");
		btnPerform.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e) 
			{
				broker.performEOM();
			}
		});
		btnPerform.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnPerform.setBounds(296, 171, 279, 25);
		frame.getContentPane().add(btnPerform);
		
		JButton btnExport = new JButton("Export");
		btnExport.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e) 
			{
				broker.exportData();
			}
		});
		btnExport.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnExport.setBounds(296, 228, 279, 25);
		frame.getContentPane().add(btnExport);
		
		JButton btnClose = new JButton("Close");
		btnClose.setFont(new Font("Tahoma", Font.BOLD, 13));
		btnClose.setBounds(582, 327, 134, 25);
		btnClose.addActionListener(new ActionListener()
		{
			@Override
			public void actionPerformed(ActionEvent e)
			{
				System.exit(0);
				
			}
		});
		frame.getContentPane().add(btnClose);
		
		JLabel lblStepDatabase = new JLabel("Step 1: Database Login and Check");
		lblStepDatabase.setFont(new Font("Tahoma", Font.BOLD, 14));
		lblStepDatabase.setBounds(29, 53, 242, 25);
		frame.getContentPane().add(lblStepDatabase);
		
		JLabel lblStepProcess = new JLabel("Step 2: Process Delimted Text File");
		lblStepProcess.setFont(new Font("Tahoma", Font.BOLD, 14));
		lblStepProcess.setBounds(29, 111, 242, 24);
		frame.getContentPane().add(lblStepProcess);
		
		JLabel lblStepPerform = new JLabel("Step 3: Perform Month End");
		lblStepPerform.setFont(new Font("Tahoma", Font.BOLD, 14));
		lblStepPerform.setBounds(29, 172, 211, 23);
		frame.getContentPane().add(lblStepPerform);
		
		JLabel lblStep = new JLabel("Step 4 : Export Data");
		lblStep.setFont(new Font("Tahoma", Font.BOLD, 14));
		lblStep.setBounds(29, 229, 211, 23);
		frame.getContentPane().add(lblStep);
		
		frame.addWindowListener(new WindowAdapter()
		{
			@Override
			public void windowClosing(WindowEvent e)
			{
				System.exit(0);
			}
		});
		
		frame.setResizable(false);
		frame.setVisible(true);
	}
	
	private void login()
	{
		String username = JOptionPane.showInputDialog("Input username: ");
		String password = JOptionPane.showInputDialog("Input password: ");
		broker = Broker.getBroker(username, password);
		
	}
	
}
