package com.usbank.pega;

import org.openqa. selenium. By;
import org.openqa.selenium.WebDriver;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

import java.io.FileInputStream;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class TestSuiteTrigger extends UnitTestCase {
	static WebDriver driver;

	public TestSuiteTrigger (WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub

	}
     @Test
		public static void triggerSuite() throws Exception {
	
    	Properties obj = new Properties();					
 	    FileInputStream objfile = new FileInputStream(System.getProperty("user.dir")+"\\object.properties");									
 	    obj.load(objfile);
			System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + "\\chromedriver.exe");
			WebDriver driver = new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*"));
			driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);

			driver.get("https://o9yoy9vy.pegace.net/prweb/PRAuth/app/wheelson-road/Cin56JoglCB7VVI_xsmXpSzvNa_QCgfv*/!STANDARD?pzPostData=417532522");
			System.out.print("It is working");
			
			driver.manage().window().maximize () ;
			driver.findElement(By.xpath(obj.getProperty("UserName"))).sendKeys("Developer9");
			driver.findElement(By.xpath(obj.getProperty("Password"))).sendKeys("rules@99");
			driver.findElement(By.xpath(obj.getProperty("LoginBtn"))).click();
			Thread.sleep (2000) ;
			oldSavingRuleNames. SavingRuleName(driver);
			Thread.sleep (2000);
			
			UnitTestSuite uts = new UnitTestSuite(driver);
			uts.unitSuite();
			
			
			//driver.quit);
			}
}
