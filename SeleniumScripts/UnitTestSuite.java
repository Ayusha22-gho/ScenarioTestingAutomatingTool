package com.usbank.pega;

import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;
import org.openqa.selenium.WebDriver;

public class UnitTestSuite {
	WebDriver driver;

	public UnitTestSuite(WebDriver driver) {
		this.driver = driver;
		// TODO Auto-generated constructor stub

	}
	@Test 
	public void unitSuite() throws Exception {
		UnitTestCase utc = new UnitTestCase(driver);
		utc.Navigation();
		Properties obj = new Properties();					
	    FileInputStream objfile = new FileInputStream(System.getProperty("user.dir")+"\\object.properties");									
	    obj.load(objfile);	
		String framel ="PegaGadget0Ifr";

		// switch to iframe to access the table containing rule names
		driver.switchTo().frame(framel);

		WebElement testSuites = driver.findElement(By.xpath(obj.getProperty("TestSuite")));
		Thread.sleep(5000);
		testSuites.click();
		Thread.sleep(1000);

		List<String> rules = Files.readAllLines(Paths.get("C:\\PegaWorkspace\\pegaTesting\\Scenario-2.csv"));
		System.out.println(rules);
		Thread.sleep(2000);

		List<WebElement> TestSuites = driver
				.findElements(By.xpath(obj.getProperty("TestSuiteName")));

		for (int j = 0; j < TestSuites.size(); j++) {
			System.out.println("for loop ke andar");
			
			Thread.sleep(2000);
			driver.switchTo().parentFrame();
			Thread.sleep(2000);
			
			driver.switchTo().frame(framel);
			Thread.sleep(2000);
			
			System.out.println(j);
			TestSuites.get(j).click();
			Thread.sleep(3000);
			
			driver.switchTo().defaultContent();
			Thread.sleep(2000);
			
			WebElement closel = driver.findElement(By.xpath(obj.getProperty("CloseTestSuiteTab")));
			Thread.sleep(2000);
			
			String frame = "PegaGadget1Ifr";
			driver.switchTo().frame(frame);
			
			List<WebElement> TestCaseName = driver.findElements(By.xpath(obj.getProperty("TestSuiteLoop1")));
			String[] list2 = new String[(TestCaseName.size() + 2)];
			// loop to iterate through test case name and split on the basis of TC
			for (int i = 0; i < TestCaseName.size(); i++) {
				System.out.println("split hone aagya");
				WebElement testcase = driver
						.findElement(By.xpath(obj.getProperty("TestSuiteLoop2")));
				String name = testcase.getText();
				String[] FinalName = name.split("_");
				String output = FinalName[FinalName.length - 1];
				System.out.println(output);
				list2[i] = output;
			}
			for (int i = 0; i < TestCaseName.size(); i++) {
				int s=0;
				String list2_name = list2[i];
				System.out.println("Sab aagya");
				
				for (String element1 : rules) {
					
					String element2 = list2_name;
					if (element1.contains(element2)) 
					{
						
						System.out.println("matched");
						Thread.sleep(2000);
						driver.switchTo().defaultContent();
						Thread.sleep(2000);
						closel.click();
						driver.switchTo().frame(framel);
						Thread.sleep(3000);
						List<WebElement> checkbox = driver.findElements(By.xpath(obj.getProperty("TestSuiteCheckBox")));
						
								Thread.sleep(2000);
								checkbox.get(j).click();
								s=1;
								Thread.sleep(3000);
								break;
					}
					
					else 
					{
						System.out.println("not matched");
						Thread.sleep(2000);
						driver.switchTo().defaultContent();
						Thread.sleep(3000);
						break;
					}
					
					
				}
				if(s==1)
					break;
			}
		}		
		driver.findElement(By.xpath(obj.getProperty("TestSuiteRunBtn"))).click();

	}
}
