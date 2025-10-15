package com.usbank.pega;

import java.io.FileOutputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ReusableComponent {

	public void excel(String finalstr,String path) throws Exception {

		// Create a new Excel workbook
		XSSFWorkbook workbook = new XSSFWorkbook();

		// Create a new sheet in the workbook
		XSSFSheet sheet = workbook.createSheet("Sheet1");
		String[] columnNames = { "Branch Name", "Rule Name" };
		// write column names to the first row of the sheet
		Sheet sheets = workbook.getSheetAt(0);
		Row headerRow = sheet.createRow(0);
		for (int i = 0; i < columnNames.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(columnNames[i]);
		}
		// Split the string data into lines and write each line to new cell in the sheet
		String[] lines = finalstr.split("\\r?\\n");
		int rowNum = 1;
		for (String line : lines) {
			String[] values = line.split(",");
			Row row = sheet.createRow(rowNum++);
			int colNum = 0;
			for (String value : values) {
				Cell cell = row.createCell(colNum++);
				cell.setCellValue(value.trim());
			}
		}

		// Write the workbook to s file
		try {
			FileOutputStream outputStream = new FileOutputStream(path);
			workbook.write(outputStream);
			workbook.close();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();

		}
	}
}
