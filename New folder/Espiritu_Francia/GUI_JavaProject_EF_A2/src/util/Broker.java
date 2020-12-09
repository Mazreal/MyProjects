package util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;

import javax.swing.JOptionPane;

import oracle.jdbc.internal.OracleTypes;

public class Broker
{
	private String username, password;
	private static Broker broker;
	private Connection conn;
	
	public static Broker getBroker(String username, String password)
	{
		if(broker == null)
		{
			broker = new Broker(username, password);
		}
		return broker;
	}
	
	private Broker(String username, String password)
	{
		setConnection(username, password);
		if(checkPermission(username) != 'Y')
		{
			JOptionPane.showMessageDialog(null, "Invalid permissions for user: " + username);
			try
			{
				conn.close();
			} catch (SQLException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else
		{
			JOptionPane.showMessageDialog(null, "Connection Established!");
		}
		this.username = username;
		this.password = password;
		
	}

	private char checkPermission(String username)
	{
		try
		{
			CallableStatement cstmt = conn.prepareCall("{? = call func_user_perm(?)}");
			cstmt.registerOutParameter(1, OracleTypes.CHAR);
			cstmt.setString(2, username);
			cstmt.execute();
			return cstmt.getString(1).charAt(0);
			
		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 'x';
		
	}

	private void setConnection(String username, String password)
	{
		try
		{
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", username, password);
		} catch (ClassNotFoundException e)
		{
			System.out.println("Unable to find Driver");
			e.printStackTrace();
		} catch (SQLException e)
		{
			JOptionPane.showMessageDialog(null, "Invalid username and/or password");
			System.out.println("Problem connecting to database: " + e.getMessage());
			e.printStackTrace();
		}
		
	}

	public void processFile()
	{
		String path = JOptionPane.showInputDialog("Directory path for control and log files: ");
		String delimiterFile = JOptionPane.showInputDialog("Delimited File name with path: ");
		File file = new File(path+"\\control.ctl");
		try
		{
			if(!file.createNewFile())
			{
				JOptionPane.showMessageDialog(null, "File already exists.");
			}
			BufferedWriter writer = new BufferedWriter(new FileWriter(file));
			String content = "LOAD DATA " + "\n";
			content += "INFILE \'" + delimiterFile + "\'" + "\n";
			content += "REPLACE INTO TABLE payroll_load FIELDS TERMINATED BY \';\' OPTIONALLY ENCLOSED BY \'\"\' TRAILING NULLCOLS (payroll_date DATE \"Month dd, yyyy\", employee_id, amount, status)";
			writer.write(content);
			writer.close();
		} catch (IOException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		String command = "sqlldr userid=" +username+"/"+password +" control="+path+"\\control.ctl log="+path+"\\log.log";
		
		Runtime rt = Runtime.getRuntime();
		
		Process proc;
		try
		{
			proc = rt.exec(command);
			int exitValue = proc.waitFor();
			if(exitValue == 0)
			{
				JOptionPane.showMessageDialog(null, "Success!");
			}
			else
			{
				JOptionPane.showMessageDialog(null, "Errors occurred");
			}
		} catch (IOException e)
		{
			JOptionPane.showMessageDialog(null, "Problem creating SQL*Loader");
			e.printStackTrace();
		} catch (InterruptedException e)
		{
			JOptionPane.showMessageDialog(null, "Problem creating SQL*Loader");
			e.printStackTrace();
		}
			
		
	}

	public void performEOM()
	{
		try
		{
			CallableStatement cstmt = conn.prepareCall("{call proc_end_month}");
			cstmt.execute();
			JOptionPane.showMessageDialog(null, "Success!");
		} catch (SQLException e)
		{
			JOptionPane.showMessageDialog(null, "Errors occurred");
			e.printStackTrace();
		}
		
	}
	
	public void exportData()
	{
		String path = JOptionPane.showInputDialog("Input export path location: ");
		String filename = JOptionPane.showInputDialog("Filename to be created: ");
		String alias = JOptionPane.showInputDialog("Directory path alias: ");
		File file = new File(path +"\\"+ filename);
		try
		{
			file.createNewFile();
		} catch (IOException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try
		{
			
			Statement stmt = conn.createStatement();
			String directoryCommand = "CREATE OR REPLACE DIRECTORY " +alias.toUpperCase()+ " AS \'" +path+"\'" ;
			System.out.println(directoryCommand);
			stmt.executeUpdate(directoryCommand);
			
			CallableStatement cstmt = conn.prepareCall("{call proc_pop_file(?,?)}");
			cstmt.setString(1, alias);
			cstmt.setString(2, filename);
			cstmt.execute();
			JOptionPane.showMessageDialog(null, "Success!!");
		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	
	
	
}
