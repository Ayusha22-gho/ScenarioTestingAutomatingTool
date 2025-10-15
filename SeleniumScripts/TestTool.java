package com.usbank.pega;



import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.List;
import java.util.ArrayList;
import java.io.FileReader;
import java.io.FileWriter;
import org.openqa.selenium.JavascriptExecutor;

public class TestTool extends UnitTestCase {

	static WebDriver driver;

	public TestTool(WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub
	}

	static String finalstr;

	public static void SavingRuleName(WebDriver driver) throws Exception {
		Thread.sleep(2000);
		driver.findElement(By.xpath("//div[@title='App']")).click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//div[@aria-label='Branches']//..//h3")).click();
		Thread.sleep(4000);
		driver.findElement(By.xpath("(//li[@id='$PD_pzBranchExplorer$ppxResults$l1']//..//a)[1]")).click();

	}


	public static void main(String[] args) throws Exception {

		String currentDirectory = System.getProperty("user.dir");

		System.out.println("The current working directóry is " + currentDirectory);

		System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + "\\chromedriver.exe");
		WebDriver driver = new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*"));

		driver.get("https://gr3tl82h.pegace.net/prweb/PRAuth/app/wheelson-road_/");
		System.out.print("It is working");
		driver.manage().window().maximize();
		driver.findElement(By.xpath("//input[@id='txtUserID']")).sendKeys("bhagyashree.kamble@cognizant.com");
		driver.findElement(By.xpath("//input[@id='txtPassword']")).sendKeys("Rules@12345");
		driver.findElement(By.xpath("//button[@id='sub' and @class='loginButton']")).click();
		SavingRuleName(driver);
		Thread.sleep(3000);
		driver.quit();
	}
}
