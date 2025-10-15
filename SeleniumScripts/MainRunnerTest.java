package com.usbank.pega;
 
import org.testng.TestNG;
 
public class MainRunnerTest {
 
	static TestNG testNG;
	public static void main(String[] args) {
		// TODO Auto-generated method stub
     testNG= new TestNG();
     testNG.setTestClasses(new Class[]{SavingRuleNames.class});
     testNG.run();
	}
 
}