package com.usbank.pega;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileReader;
 
import java.util.ArrayList;

import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class SavingRuleNames {

	static WebDriver driver;
	static String finalstr1;
	static String finalstr2;
	static String branch;
	static String path1="C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\OutputRuleNames\\output-file.xlsx";
	
	static String path2="C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\OutputRuleNames\\outputRuleWithoutTC-file.xlsx";
	
//	static String path1= System.getProperty("user.dir")+"\\object.properties\\OutputRuleNames\\output-file.xlsx";
//	
//	static String path2=System.getProperty("user.dir")+"\\object.properties\\OutputRuleNames\\outputRuleWithoutTC-file.xlsx";
	
     @SuppressWarnings("null")
	public static void SavingRuleName(WebDriver driver) throws Exception {
		  Properties obj = new Properties();					
	 	   FileInputStream objfile = new FileInputStream(System.getProperty("user.dir")+"\\object.properties");									
	 	   obj.load(objfile);
		Thread.sleep(5000);
		driver.findElement(By.xpath(obj.getProperty("AppBtn"))).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath(obj.getProperty("Branches"))).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath(obj.getProperty("BranchExplorer"))).click();

		Thread.sleep(2000);

		// Open the text file for reading

		BufferedReader reader = new BufferedReader(
				new FileReader("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\BatchNameInput\\branches.txt"));
		String line = reader.readLine();

		WebElement table;
		// initialize list for rows
		List<WebElement> rows = null;

		// Create a BufferedWriter to write to CSV file
		BufferedWriter writer = null;

		// initialize list for finalRows

		List<String> finalRows = new ArrayList<String>();

		List<WebElement> value_list = driver.findElements(By.xpath(obj.getProperty("BranchExplorerNodeList")));

		

		Thread.sleep(2000);
  
		
		
			// loop to go through each branch mentioned in text file
		if (line.length() > 2) {

			// Store the value in a string
			WebElement value = driver.findElement(By.xpath("//a[contains(text(),'" + line + "')]"));

			JavascriptExecutor js = (JavascriptExecutor) driver;
			js.executeScript("arguments[0].scrollIntoView(true);", value);
			branch = value.getText();
			value.click();

			Thread.sleep(5000);
			// Find the iframe, element
			WebElement iframe = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));

			// switch to iframe to access the table containing rule names
			driver.switchTo().frame(iframe);
			Thread.sleep(2000);

			table = driver.findElement(By.xpath(obj.getProperty("RuleTable")));

			// Get all the rows of the table
			rows = table.findElements(By.xpath(obj.getProperty("TableRow")));

			for (WebElement row : rows) {
				List<WebElement> cells = row.findElements(By.xpath(obj.getProperty("TableType")));

				ArrayList<String> masterRulesFromBranch = new ArrayList<String>();
				for (WebElement v : cells) {
					masterRulesFromBranch.add(v.getText());

				}
				Collections.sort(masterRulesFromBranch);
				driver.switchTo().defaultContent();
				driver.findElement(By.xpath(obj.getProperty("CloseTab"))).click();
				UnitTestCase utc = new UnitTestCase(driver);
				utc.Navigation();
				WebElement frame = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));

				// switch to iframe to access the table containing rule names
				driver.switchTo().frame(frame);

				Thread.sleep(5000);
				List<WebElement> Rulename = driver
						.findElements(By.xpath("//td[@data-attribute-name='Rule name']/div/span/a"));

				ArrayList<String> RulesFromUTC = new ArrayList<String>();

				for (WebElement e : Rulename) {
					RulesFromUTC.add(e.getText());

				}
				Collections.sort(RulesFromUTC);

				System.out.println(" masterRulesFromBranch is;" + masterRulesFromBranch);

				System.out.println("RulesFromUTC is;" + RulesFromUTC);

				ArrayList<String> withOutUTC = new ArrayList<String>(masterRulesFromBranch);
				Collections.sort(withOutUTC);
				withOutUTC.removeAll(RulesFromUTC);
				System.out.println(" Rules withOut UTC :" + withOutUTC);

				ArrayList<String> rulewithUTC = new ArrayList<String>(masterRulesFromBranch);
				// System.out.println(" RulewithUTC :"+ rulewithUTC);
				Collections.sort(rulewithUTC);
				rulewithUTC.retainAll(RulesFromUTC);
				System.out.println(" Rule with UTC  :" + rulewithUTC);
				updatedArrayList(branch, rulewithUTC);
				updatedArrayList(branch, withOutUTC);
				System.out.println("finalstr1 before join is:"+finalstr1);

				finalstr1= String.join("", rulewithUTC);
				System.out.println("finalstr1 is:"+finalstr1);
				finalstr2= String.join("", withOutUTC);
				System.out.println("finalstr2 is:"+finalstr2);

			}}
			
    	 
     }
     
	@Test  
	  public static void loginpage() throws Exception {
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
		SavingRuleName(driver);
		ReusableComponent rc = new ReusableComponent();
		rc.excel(finalstr1,path1);
		rc.excel(finalstr2,path2);
		driver.quit();
	}
    public static void updatedArrayList(String s,ArrayList <String> a)throws Exception {
    	for(int i=0 ;i<a.size();i++  ) {
    		String newValue=s+","+a.get(i);
    		newValue+=System.lineSeparator();
    		a.set(i, newValue);
    	}
    	System.out.println("newvalue arraylist is :"+a);
    }
}



