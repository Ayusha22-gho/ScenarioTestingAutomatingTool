package com.usbank.pega;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ReportGenerator {

	WebDriver driver;

	public ReportGenerator(WebDriver driver) {
		this.driver = driver;
		// TODO Auto-generated constructor stub
	}

	static String finalstring;

	public void ReportGen() throws InterruptedException, Exception {

		StringBuilder rp = new StringBuilder();

		// initialize list for finalRows
		List<String> finalNames = new ArrayList<String>();

		System.out.println("in gen");
		Properties obj = new Properties();
		FileInputStream objfile = new FileInputStream(System.getProperty("user.dir") + "\\object.properties");
		obj.load(objfile);
		List<String> values = Files.readAllLines(Paths.get(
				"C:\\Users\\933160\\Downloads\\Pega Rule Impact Analyzer\\Data\\SelectedRuleNames\\selectedRules.txt"));
		// Find the ifcame element
		String finalRuleText;

		//WebElement iframe = driver.findElement(By.xpath("//iframe[@name='PegaGadget0Ifr']"));

		// switch to iframe to access the table containing rule names
		//driver.switchTo().frame(iframe);

		Thread.sleep(5000);
		List<WebElement> Rulename = driver.findElements(By.xpath("//td[@data-attribute-name='Rule name']/div/span/a"));

		List<String> names = new ArrayList<String>();

		for (int i = 0; i < Rulename.size(); i++) {
			for (WebElement e : Rulename) {
				names.add(e.getText());
			}

		}

		for (String text : values) {
			String ruleText = text;
			finalRuleText = ruleText.substring(text.indexOf(",") + 1);
			System.out.println(finalRuleText);
			int i = 0;
			for (String name : names) {
				if (name.equalsIgnoreCase(finalRuleText)) {
					WebElement checkbox = driver
							.findElement(By.xpath("(//input[@type = 'checkbox'])[" + (i + 2) + "]"));
					Thread.sleep(5000);
					checkbox.click();
					WebElement TestName = driver.findElement(By.xpath(
							"(//td[@data-attribute-name='Test case name']//a[contains(@name,'pzViewApplicationTestCases_D_pxGetTestCaseData')])["+ (i + 1) + "]"));
					rp.append(TestName.getText());
					rp.append(",");
					WebElement status = driver.findElement(By.xpath(
							"(//td[@data-attribute-name='Result']//..//*[contains(@name,'pzTestCaseRunStatusWrapperLP_D_pxGetTestCaseData_pa') or contains(text(),'Not run')])[" + (i + 1) + "]"));
					rp.append(status.getText());
						rp.append("-");
					
					break;
				}
				i++;
			}
		}
	

		/*List<WebElement> elements = driver.findElements(By.xpath("//a[contains(text(),'TC_')]"));

		rp = new StringBuilder();

		for (int i = 0; i < elements.size(); i++) {

			WebElement checkbox = driver.findElement(By.xpath("(//input[@type = 'checkbox'])[" + (i + 2) + "]"));
			WebElement name = driver.findElement(By.xpath(
					"(//td[@data-attribute-name='Test case name']//a[contains(@name,'pzViewApplicationTestCases_D_pxGetTestCaseData')]["+ (i + 1) + "]"));

			WebElement status = driver.findElement(By.xpath(
					"(//td[@data-attribute-name='result']//..//*[contains(@name,'pzTestCaseRunStatusWrapperLP_D_pxGetTestCaseData_pa') or contains(text(),'Not run')])[" + (i + 1) + "]"));

			if (checkbox.isSelected()) {
				rp.append(name.getText());
				rp.append(",");
				rp.append(status.getText());
				rp.append("-");
			} else {
			}
		}*/
		finalNames.add(rp.toString());
		finalstring = String.join("", finalNames);
		System.out.println(finalstring);
	}

	public void ReportDoc() {
		// Create a new Excel workbook
		XSSFWorkbook workbook = new XSSFWorkbook();
		// Create a new sheet in the workbook
		XSSFSheet sheet = workbook.createSheet("Sheet1");
		String[] columnNames = { "Test Case Name", "Status" };
		// write column names to the first row of the sheet
		Sheet sheets = workbook.getSheetAt(0);
		Row headerRow = sheet.createRow(0);

		for (int i = 0; i < columnNames.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(columnNames[i]);
		}

		int rowIndex = 1;
		String[] splitArray = finalstring.split("-");
		for (String splitstring : splitArray) {
			String[] values = splitstring.split(",");
			Row row = sheet.createRow(rowIndex);
			int cellIndex = 0;

			for (String value : values) {
				Cell cell = row.createCell(cellIndex);
				cell.setCellValue(value.trim());
				cellIndex++;
			}
			rowIndex++;
		}
		
		//Split the string data into lines and write each line to a new cell in the
		// sheet
	/*	String[] lines = finalstring.split("\\r?\\n");
		int rowNum = 1;
		for (String line : lines) {
		String[] values = line.split(",");
		Row row = sheet.createRow(rowNum++);
		int colNum = 0;
		for (String value : values) {
		Cell cell= row.createCell (colNum++);
		cell. setCellValue(value.trim()) ;
		}
		}*/


		// Write the workbook to s file
		try {
			FileOutputStream outputStream = new FileOutputStream(
					"s");
			workbook.write(outputStream);
			workbook.close();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();

		}
	}
}
	
