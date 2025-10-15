package com.usbank.pega;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Path;
import java.util.ArrayList;
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

public class CheckingSavingRules {

	static WebDriver driver;
	
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
  
		BufferedWriter fileWriter = new BufferedWriter(
				new FileWriter("C:\\Users\\933160\\Downloads\\Pega Rule Impact Analyzer\\Data\\OutputRuleNames"));
		BufferedWriter fileWriter2 = new BufferedWriter(
				new FileWriter("C:\\Users\\933160\\Downloads\\Pega Rule Impact Analyzer\\Data\\File\\NotmatchTestCase.txt"));
		
		
			// loop to go through each branch mentioned in text file
			if (line.length() > 2) {
				
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
						
						List<String> val = new ArrayList<String>();
							for (WebElement v : cells) {
								val.add(v.getText());
								
							}
			           driver.switchTo().defaultContent();
						driver.findElement(By.xpath(obj.getProperty("CloseTab"))).click();
						UnitTestCase utc = new UnitTestCase(driver);
						utc.Navigation();
						WebElement frame = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));

						// switch to iframe to access the table containing rule names
						driver.switchTo().frame(frame);

						Thread.sleep(5000);
						List<WebElement> Rulename = driver.findElements(By.xpath("//td[@data-attribute-name='Rule name']/div/span/a"));

	
							List<String> names = new ArrayList<String>();

							
								for (WebElement e : Rulename) {
									names.add(e.getText());

								}
								System.out.println(" Branch val is;"+val);

								System.out.println("test case names is;"+names);
								List<String> notContaingRules = new ArrayList<String>();
                         
							for (String values : val) {
								
								for (String name : names) {
									
									if (name.equalsIgnoreCase(values)) {
										System.out.println("rules match is;"+values);
										

										fileWriter.write(values +'\n');
										notContaingRules.add(values);
										
									}
										
					
								}if(!notContaingRules.contains(values)) {
									System.out.println("rules not match is;"+values);
									fileWriter2.write(values +'\n');
								}
							}fileWriter.close();
							fileWriter2.close();
						
					}}
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
		

		//ReusableComponent rc = new ReusableComponent();
		//rc.excel(finalstr);
		driver.quit();
	}

}
