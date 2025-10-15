package com.usbank.pega;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
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

import io.github.bonigarcia.wdm.WebDriverManager;


public class SavingScenarioTestNames {
	
		static String branch;
		static String finalstr1;
		static String path1="C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\ScenarioTestCasesPresentUnderBranch\\ScnTestNamesUnderBranch.xlsx";
			// TODO Auto-generated constructor stub
		public static void SavingScenariosTest(WebDriver driver) throws Exception {
			Properties obj = new Properties();

			FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
			obj.load(objfile);
			driver.findElement(By.xpath(obj.getProperty("AppBtn"))).click();
			Thread.sleep(5000);
			driver.findElement(By.xpath(obj.getProperty("Branches"))).click();
			Thread.sleep(5000);
			driver.findElement(By.xpath(obj.getProperty("BranchExplorer"))).click();
			Thread.sleep(3000);

			// Open the text file for reading

			
			BufferedReader reader = new BufferedReader(
					new FileReader("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\ScenarioTestBranchInput\\ScnTestBranchNameInp.txt"));
			String line = reader.readLine();


			Thread.sleep(2000);
	  
			
			
				// loop to go through each branch mentioned in text file
			if (line.length() > 2) {

				// Store the value in a string
				WebElement value = driver.findElement(By.xpath("//a[contains(text(),'" + line + "')]"));

				JavascriptExecutor js = (JavascriptExecutor) driver;
				js.executeScript("arguments[0].scrollIntoView(true);", value);
				branch = value.getText();
				driver.findElement(By.xpath("//a[text()='" + branch + "']/ancestor::li[1]//preceding-sibling::li")).click();
				Thread.sleep(3000);
				driver.findElement(By.xpath(obj.getProperty("PegaBranchExplorer"))).click();
				Thread.sleep(3000);
				List<WebElement> ScenarioList = driver.findElements(By.xpath(obj.getProperty("TestScenarioExplorer")));
				System.out.println(ScenarioList.size());
				
				ArrayList<String> TestScenarioList = new ArrayList<String>();
				
				for (int i=0; i<ScenarioList.size();i++) {
					TestScenarioList.add(ScenarioList.get(i).getText());
					
           }
				 System.out.println("TestScenarioList is:" +TestScenarioList);	
				
				 updatedArrayList(branch, TestScenarioList);
                  finalstr1= String.join("", TestScenarioList);
					System.out.println("finalstr1 is:"+finalstr1);
				
	}
		}
		public static void updatedArrayList(String s,ArrayList <String> a)throws Exception {
	    	for(int i=0 ;i<a.size();i++  ) {
	    		String newValue=s+","+a.get(i);
	    		newValue+=System.lineSeparator();
	    		a.set(i, newValue);
	    	}
	    	System.out.println("newvalue arraylist is :"+a);
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
				SavingScenariosTest(driver);
				ReusableComponent rc = new ReusableComponent();
				rc.excel(finalstr1,path1);
				driver.quit();
				}

}