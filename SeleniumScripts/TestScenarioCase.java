package com.usbank.pega;



import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import java.io.File;
import java.io.FileInputStream;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class TestScenarioCase {
	static String branch;
	private static WebDriver webDriver;
	static WebDriverWait wait;
		// TODO Auto-generated constructor stub
	public static void TestScenariocases(WebDriver driver) throws Exception {
		
		
			Properties obj = new Properties();
			FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
			obj.load(objfile);
			List<String> values = Files.readAllLines(
					Paths.get("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\SelectedScenarioTestNames\\SelectedScnTestes.txt"));
			// Find the ifcame element

			
			WebElement configure = driver.findElement(By.xpath(obj.getProperty("ConfigureLink")));
			configure.click();

			Thread.sleep(3000);

			WebElement application = driver.findElement(By.xpath(obj.getProperty("Application")));
			Actions ac = new Actions(driver);
			Thread.sleep(3000);

			ac.moveToElement(application).perform();
			Thread.sleep(3000);

			WebElement quality = driver.findElement(By.xpath(obj.getProperty("Quality")));

			ac.moveToElement(quality).perform();
			Thread.sleep(2000);

			WebElement automatedTesting = driver.findElement(By.xpath(obj.getProperty("AutomatedTesting")));

			ac.moveToElement(automatedTesting).perform();
			Thread.sleep(2000);

			WebElement ScenarioTesting = driver.findElement(By.xpath(obj.getProperty("ScenarioTesting")));

			ac.moveToElement(ScenarioTesting).perform();
			Thread.sleep(2000);

			driver.findElement(By.xpath(obj.getProperty("TestScenarioCase"))).click();
			WebElement iframe = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));

			// switch to iframe to access the table containing rule names
			driver.switchTo().frame(iframe);

			Thread.sleep(3000);
			//WebElement checkbox = driver.findElement(By.xpath(obj.getProperty("Checkbox")));
			List<WebElement> TestName = driver.findElements(By.xpath("//td[@data-attribute-name='Test case name']/div/span/a"));

			List<String> TestScenarioName = new ArrayList<String>();

			for (int i = 0; i < TestName.size(); i++) {
				TestScenarioName.add(TestName.get(i).getText());

			}
			int UTCsize = TestScenarioName.size();
			for (String TestScenarioLists : values) {
				int i = 0;
				for (String TestScenarioNames : TestScenarioName) {
					if (TestScenarioNames.equalsIgnoreCase(TestScenarioLists)) {
						try {
							WebElement checkbox = driver
									.findElement(By.xpath("(//input[@type = 'checkbox'])[" + (i + 2) + "]"));
							Thread.sleep(5000);
							checkbox.click();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					i++;
					if (i == UTCsize) {
						break;
					}
				}

			}
			
			Thread.sleep(5000);
			driver.findElement(By.xpath(obj.getProperty("RunButton"))).click();
			/* WebElement element1=driver.findElement(By.xpath(obj.getProperty("CloseFrame")));;
					 wait.until(ExpectedConditions.visibilityOf(element1));
			
					 ((JavascriptExecutor)driver).executeScript("arguments[0].click();", element1);*/
			wait =new WebDriverWait(driver, Duration.ofSeconds(60));
			 WebElement element =driver.findElement(By.xpath(obj.getProperty("ReportExcelBtn")));

			wait.until(ExpectedConditions.visibilityOf(element));
			element.click();
		   Thread.sleep(5000);
			//((JavascriptExecutor)driver).executeScript("arguments[0].click();", element);
			//driver.findElement(By.xpath(obj.getProperty("ReportExcelBtn"))).click();
			
			
			String name =getLastModified("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads");
			if(name.contains("WheelsonRoad_")) {
			Path source=Paths.get("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\"+name+"");
			Path target=Paths.get("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\PegaScenarioTestResult\\PegaScenarioTestReport.xlsx");
			Files.move(source, target, REPLACE_EXISTING);
			System.out.println("File copied successfully");
			}
			else {
				System.out.println("File not found");
			}
		
			Thread.sleep(5000);
			driver.quit();
			
	}
	
	public static void handlePopup() {
		String parentWindow =webDriver.getWindowHandle();
		Set<String> s=webDriver.getWindowHandles();
		Iterator<String> i1=s.iterator();
		
		if(s.size()==2){
			System.out.println("Popup window is displayed ");
			while(i1.hasNext()){
				String popupwindow =i1.next();
				if(!popupwindow.equals(parentWindow)) {
					webDriver.switchTo().window(popupwindow);
					webDriver.close();
					webDriver.switchTo().window(parentWindow);
				}
				
			}
		}
		
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
		
		TestScenariocases(driver);
		
		
	}
}