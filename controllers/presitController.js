const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

let jarPath = "";

//TODO : Make the path dynamic
const excelPathWithUTC = path.join(
  "C:/Users/934197/Downloads/PRITA/Data/",
  "OutputRuleNames",
  "output-file.xlsx"
);
const excelPathWithoutUTC = path.join(
  "C:/Users/934197/Downloads/PRITA/Data/",
  "OutputRuleNames",
  "outputRuleWithoutTC-file.xlsx"
);

const PegaUnitTestReport = path.join(
  "C:/Users/934197/Downloads/PRITA/Data/",
  "PegaUnitTestResult",
  "PegaUnitTestReport.xlsx"
);

const savingRules = (req, res ) => {
  console.log("Received request", req.body);
  res.set("Access-Control-Allow-Origin", "*");
  jarPath = req.body.jarPath;
  console.log("jarpath", jarPath);
  if (!jarPath) {
    return res.status(400).send({ error: "Jar path is required" });
  }
  const command = `java -jar ${jarPath}SavingRuleNames.jar`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.send({ stdout, stderr });
  });
};

const saveBranchName = (req, res) => {
  let preSITBranchName = "";
  res.set("Access-Control-Allow-Origin", "*");
  preSITBranchName = req.body.branches;

  //TODO: Make the path dynamic
  const filePath = path.join(
    "C:/Users/934197/Downloads/PRITA/Data/",
    "BatchNameInput",
    "branches.txt"
  );
  fs.writeFile(filePath, preSITBranchName.toString(), (err) => {
    if (err) {
      console.log("error writing file", err);
      return res.status(500).send({ message: "error saving branch to file" });
    }
  });
  res
    .status(200)
    .send({ message: "Branch name saved successfully", preSITBranchName });
};

//Function to read data from Excel file and convert it to JSON
function readExcelData(excelFilePath) {
  const workbook = xlsx.readFile(excelFilePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
  console.log("jsondata", jsonData);
  return jsonData;
}

// API endpoint to fetch Excel data
const excelWithUTC = (req, res) => {
  // Path to your Excel file
  const data = readExcelData(excelPathWithUTC);
  res.json(data); // Send JSON data to frontend
};

const excelWithoutUTC = (req, res) => {
  // Path to your Excel file
  const data = readExcelData(excelPathWithoutUTC);
  res.json(data); // Send JSON data to frontend
};

const preSITTestResult =  (req, res) => {
  // Path to your Excel file
  const data = readExcelData(PegaUnitTestReport);
  res.json(data); // Send JSON data to frontend
};

const selectedRulesPreSIT = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { rules } = req.body;
  
  //TODO: Make the path dynamic
  const filePath = path.join(
    "C:/Users/934197/Downloads/PRITA/Data/",
    "SelectedRuleNames",
    "selectedRules.txt"
  );
  // fs.writeFile(filePath,rules.toString(),(err)=>{
  //   if(err){
  //     console.log("error writing file",err);
  //     return res.status(500).send({message:"error while creating file with branch name"})
  //   }
  // })
  fs.writeFile(filePath, rules.join("\n") + "\n", (err) => {
    if (err) {
      console.log("error writing file", err);
    }
    const command = `java -jar ${jarPath}TestCaseRunner.jar`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.send({ stdout, stderr });
    });
  });
};

module.exports = {
  savingRules,
  saveBranchName,
  excelWithUTC,
  excelWithoutUTC,
  selectedRulesPreSIT,
  preSITTestResult
};
