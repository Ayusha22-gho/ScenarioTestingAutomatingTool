const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

let SITBranchName = "";
let jarPath = "";
const ScnTestNamesUnderBranch = path.join(
  "C:/Users/934197/Downloads/PRITA/Data/",
  "ScenarioTestCasesPresentUnderBranch",
  "ScnTestNamesUnderBranch.xlsx"
);
const PegaScenarioTestReport = path.join(
  "C:/Users/934197/Downloads/PRITA/Data/",
  "PegaScenarioTestResult",
  "PegaScenarioTestReport.xlsx"
);

//Function to read data from Excel file and convert it to JSON
function readExcelData(excelFilePath) {
  const workbook = xlsx.readFile(excelFilePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
  console.log("jsondata", jsonData);
  return jsonData;
}
const saveSITBranchName = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  SITBranchName = req.body.branch;

  //TODO: Make the path dynamic
  const filePath = path.join(
    "C:/Users/934197/Downloads/PRITA/Data/",
    "ScenarioTestBranchInput",
    "ScnTestBranchNameInp.txt"
  );
  fs.writeFile(filePath, SITBranchName, (err) => {
    if (err) {
      console.log("error writing file", err);
      return res
        .status(500)
        .send({ message: "error while creating file with branch name" });
    }
  });
  res
    .status(200)
    .send({ message: "Created Input File With Branch Name", SITBranchName });
};

const SearchImpactedBranchUnderSTC = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  jarPath = req.body.jarPath;
  const command = `java -jar ${jarPath}SavingScenarioTestNames.jar`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.send({ stdout, stderr });
  });
};

const scenariosUnderBranch = (req, res) => {
  const data = readExcelData(ScnTestNamesUnderBranch);
  res.json(data); // Send JSON data to frontend
};

const SITBranchTestResult = (req, res) => {
  const data = readExcelData(PegaScenarioTestReport);
  res.json(data); // Send JSON data to frontend
};

const SelectedWorkFlowTestSIT = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { rules } = req.body;

  //TODO: Make the path dynamic
  const filePath = path.join(
    "C:/Users/934197/Downloads/PRITA/Data/",
    "SelectedScenarioTestNames",
    "SelectedScnTestes.txt"
  );
  fs.writeFile(filePath, rules.join("\n") + "\n", (err) => {
    if (err) {
      console.log("error writing file", err);
    }
  });
 
  const command = `java -jar ${jarPath}ScenarioTestCaseRunner.jar`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    res.send({ stdout, stderr });
  });
};

module.exports = {
  saveSITBranchName,
  SearchImpactedBranchUnderSTC,
  scenariosUnderBranch,
  SelectedWorkFlowTestSIT,
  SITBranchTestResult
};
