package com.usbank.pega;

import java.io.FileInputStream;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

public class TestFlowPRITA {

	static WebDriver driver;

	public TestFlowPRITA(WebDriver driver) {
		super();
	}
		// TODO Auto-generated constructor stub
	public static void TestPRITA(WebDriver driver) throws Exception {
		Properties obj = new Properties();

		FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
		obj.load(objfile);
		driver.findElement(By.xpath(obj.getProperty("AppBtn"))).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath(obj.getProperty("Branches"))).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath(obj.getProperty("BranchExplorer"))).click();
		Thread.sleep(3000);
		driver.findElement(By.xpath(obj.getProperty("PegaUnitBranchExplore"))).click();
		Thread.sleep(3000);

		driver.findElement(By.xpath(obj.getProperty("Flow"))).click();
		Thread.sleep(3000);
		driver.findElement(By.xpath(obj.getProperty("SelectTestPRITA"))).click();
		WebElement iframe = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));
		driver.switchTo().frame(iframe);

		Thread.sleep(3000);
		driver.findElement(By.xpath(obj.getProperty("ActionButton"))).click();
		Thread.sleep(3000);
		driver.findElement(By.xpath(obj.getProperty("SelectRun"))).click();
		Thread.sleep(3000);
		driver.switchTo().defaultContent();
		Thread.sleep(3000);
		String iframel ="PegaGadget1Ifr";
		driver.switchTo().frame(iframel);
		driver.findElement(By.xpath(obj.getProperty("CustomerFieldFirstName"))).sendKeys("Suman");

		driver.findElement(By.xpath(obj.getProperty("CustomerFieldLastName"))).sendKeys("Mishra");
		Thread.sleep(2000);

		driver.findElement(By.xpath(obj.getProperty("Email"))).sendKeys("Test@gmail.com");

		driver.findElement(By.xpath(obj.getProperty("Create"))).click();
		driver.findElement(By.xpath(obj.getProperty("FirstName"))).sendKeys("Suman");
		driver.findElement(By.xpath(obj.getProperty("SubmitButton"))).click();
		Thread.sleep(3000);

		driver.findElement(By.xpath(obj.getProperty("Close"))).click();
		

	}
	@Test
	public static void loginpage() throws Exception {
		String currentDirectory = System.getProperty("user.dir");
		Properties obj = new Properties();
		FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
		obj.load(objfile);
		System.out.println("The current working directary is " + currentDirectory);

		System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + "\\chromedriver.exe");
		WebDriver driver = new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*"));

		driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
		driver.get("https://ybpy4g6i.pegace.net/prweb/PRAuth/app/wheelson-road/Cin56JoglCB7VVI_xsmXpSzvNa_QCgfv*/!STANDARD?pzuiactionrrr=CXtpbn1peTYycG1yNDFBalNheE5VMlFmZ2k0Tnh5Zk1TcWQrQVdkREpPY3VKL21aRGFhSzdKUG1JVWs3MzUwQkRiNDNEQUVkblRXYXZpOHo4dDV5VEpXOUdUdz09*");
		System.out.print("It is working");
		driver.manage().window().maximize();
		driver.findElement(By.xpath(obj.getProperty("UserName"))).sendKeys("Tester");
		driver.findElement(By.xpath(obj.getProperty("Password"))).sendKeys("Rules@99");
		driver.findElement(By.xpath(obj.getProperty("LoginBtn"))).click();
		TestPRITA(driver);
		driver.quit();
	}
}
