package com.usbank.pega;

import org.openqa. selenium. By;
import org.openqa.selenium.WebDriver;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;
import static java.nio.file.StandardCopyOption.*;

public class TestCaseTrigger extends UnitTestCase {
	static WebDriver driver;

	public TestCaseTrigger(WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub

	}
	@Test
		public static void triggerTest() throws Exception {
		String currentDirectory = System.getProperty("user.dir");

		Properties obj = new Properties();					
 	    FileInputStream objfile = new FileInputStream(System.getProperty("user.dir")+"\\object.properties");									
 	    obj.load(objfile);
 	   System.out.println("The current working directary is " + currentDirectory);
		
 		WebDriverManager.chromedriver().setup();
	 	WebDriver driver = new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*"));
		
		driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
		driver.get(obj.getProperty("Url"));
		System.out.print("It is working");
		driver.manage().window().maximize();
		driver.findElement(By.xpath(obj.getProperty("UserName"))).sendKeys(obj.getProperty("PegaUserName"));
		driver.findElement(By.xpath(obj.getProperty("Password"))).sendKeys(obj.getProperty("PegaPassword"));
		driver.findElement(By.xpath(obj.getProperty("LoginBtn"))).click();
			Thread.sleep (2000) ;
			//SavingRuleNames. SavingRuleName(driver);
			Thread.sleep (2000);
			
			UnitTestCase utc = new UnitTestCase(driver);
			utc.Navigation();
			utc.unitCase();
			
			//ReportGenerator rg = new ReportGenerator(driver);
			//rg.ReportGen();
			//rg.ReportDoc();
			
			
			String name =getLastModified("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads");
			if(name.contains("WheelsonRoad_")) {
			Path source=Paths.get("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\"+name+"");
			Path target=Paths.get("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\PegaUnitTestResult\\PegaUnitTestReport.xlsx");
			Files.move(source, target, REPLACE_EXISTING);
			System.out.println("File copied successfully");
			}
			else {
				System.out.println("File not found");
			}
		
			
			driver.quit();
			
	}
	public static String getLastModified(String directoryFilePath)

		{

		    File directory = new File(directoryFilePath);

		    File[] files = directory.listFiles(File::isFile);

		    long lastModifiedTime = Long.MIN_VALUE;

		    File chosenFile = null;
	 
		    if (files != null)

		    {

		        for (File file : files)

		        {

		            if (file.lastModified() > lastModifiedTime)

		            {

		                chosenFile = file;

		                lastModifiedTime = file.lastModified();

		            }

		        }

		    }

		    System.out.println(chosenFile.getName());
	 
		    return chosenFile.getName();

		}
}
