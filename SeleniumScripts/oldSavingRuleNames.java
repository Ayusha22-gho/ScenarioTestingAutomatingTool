package com.usbank.pega;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.google.common.annotations.VisibleForTesting;

import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;
import java.util.ArrayList;
import java.io.FileReader;
import java.io.FileWriter;
import org.openqa.selenium.JavascriptExecutor;

public class oldSavingRuleNames extends UnitTestCase {

	static WebDriver driver;

	public oldSavingRuleNames(WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub
	}

	static String finalstr;

	
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
				new FileReader("C:\\Users\\933160\\Downloads\\Pega Rule Impact Analyzer\\Data\\BatchNameInput\\branches.txt"));
		String line = reader.readLine();

		WebElement table;
		// initialize list for rows
		List<WebElement> rows = null;

		// Create a BufferedWriter to write to CSV file
		BufferedWriter writer = null;

		// initialize list for finalRows

		List<String> finalRows = new ArrayList<String>();

		List<WebElement> value_list = driver.findElements(By.xpath(obj.getProperty("BranchExplorerNodeList")));

		StringBuilder sb = null;

		Thread.sleep(2000);
  
		
		while (line != null) {
			// loop to go through each branch mentioned in text file
			if (line.length() > 2) {
				try {
					// Store the value in a string
					WebElement value = driver.findElement(By.xpath("//a[contains(text(),'" + line + "')]"));

					JavascriptExecutor js = (JavascriptExecutor) driver;
					js.executeScript("arguments[0].scrollIntoView(true);", value);

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

						sb = new StringBuilder();
						for (int i = 0; i < 1; i++) {
							driver.switchTo().defaultContent();
							String val = value.getText();
							Thread.sleep(2000);
							driver.switchTo().frame(iframe);
							for (WebElement cell : cells) {
								sb.append(val);
								sb.append(",");
								sb.append(cell.getText());
								sb.append(System.lineSeparator());
							}
						}
					}
					finalRows.add(sb.toString());
					System.out.println("final row is :"+finalRows);
					driver.switchTo().defaultContent();
					driver.findElement(By.xpath(obj.getProperty("CloseTab"))).click();
					// Read the next line from the text file

					line = reader.readLine();
				} catch (Exception e) {
					System.out.println(line.toString() + " Is Invaild Branch");
				}
			} else if (line.length() == 0) {
				System.out.println("Blank Branch Name Encountered");
			} else {
				System.out.println("Invaild Branch Name Encountered");

			}
			line = reader.readLine();

		}    
		finalstr = String.join("", finalRows);
		System.out.println("final string is:"+finalstr);
		// Create a Bufferedwriter to write to CsV file
		writer = new BufferedWriter(new FileWriter("Scenario-2.csv"));
		writer.write(finalstr);
		Thread.sleep(2000);
		writer.newLine();
		Thread.sleep(2000);
		writer.close();
		
	}
	 
	@Test  
	  public static void loginpage() throws Exception {
		String currentDirectory = System.getProperty("user.dir");
		 Properties obj = new Properties();					
	 	 FileInputStream objfile = new FileInputStream(System.getProperty("user.dir")+"\\object.properties");									
	 	  obj.load(objfile);
	 	 System.out.println("The current working directary is " + currentDirectory);
			
        System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + "\\chromedriver.exe");
		WebDriver driver = new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*"));
	
		driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
		driver.get("https://fn8ocp3r.pegace.net/prweb/PRAuth/app/wheelson-road/Cin56JoglCB7VVI_xsmXpSzvNa_QCgfv*/!STANDARD?pzPostData=1742319837");
		System.out.print("It is working");
		driver.manage().window().maximize();
		driver.findElement(By.xpath(obj.getProperty("UserName"))).sendKeys("Tester");
		driver.findElement(By.xpath(obj.getProperty("Password"))).sendKeys("rules@99");
		driver.findElement(By.xpath(obj.getProperty("LoginBtn"))).click();
		SavingRuleName(driver);
		ReusableComponent rc = new ReusableComponent();
		//rc.excel(finalstr);
		driver.quit();
	}
}
