package com.usbank.pega;

import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class UnitTestCase {
	WebDriver driver;

	public UnitTestCase(WebDriver driver) {
		this.driver = driver;
		
	}
	
	public void Navigation() throws Exception {
		Properties obj = new Properties();
		FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
		obj.load(objfile);
		Thread.sleep(3000);
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

		WebElement unitTesting = driver.findElement(By.xpath(obj.getProperty("UnitTesting")));

		ac.moveToElement(unitTesting).perform();
		Thread.sleep(2000);

		driver.findElement(By.xpath(obj.getProperty("TestCase"))).click();

	}
	

	@SuppressWarnings("null")
	public void unitCase() throws Exception {
		Properties obj = new Properties();
		FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
		obj.load(objfile);
		List<String> values = Files.readAllLines(
				Paths.get("C:\\Users\\"+System.getProperty("user.name")+"\\Downloads\\PRITA\\Data\\SelectedRuleNames\\selectedRules.txt"));
		// Find the ifcame element

		WebElement iframe = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));

		// switch to iframe to access the table containing rule names
		driver.switchTo().frame(iframe);

		Thread.sleep(5000);
		List<WebElement> Rulename = driver.findElements(By.xpath("//td[@data-attribute-name='Rule name']/div/span/a"));

		List<String> names = new ArrayList<String>();

		for (int i = 0; i < Rulename.size(); i++) {
			names.add(Rulename.get(i).getText());

		}
		int UTCsize = names.size();
		for (String value : values) {
			int i = 0;
			for (String name : names) {
				if (name.equalsIgnoreCase(value)) {
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

		driver.findElement(By.xpath(obj.getProperty("RunSelectedBtn"))).click();

		driver.findElement(By.xpath(obj.getProperty("ReportExcelBtn"))).click();
		Thread.sleep(4000);
		driver.findElement(By.xpath(obj.getProperty("ConfirmBtn"))).click();
		Thread.sleep(3000);

	}
	
}
