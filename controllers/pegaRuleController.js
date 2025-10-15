const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

const LaunchPegaRuleValidator = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const PRVjarPath = req.body.PRVjarPath;
    const command = `java -jar ${PRVjarPath}PegaRuleValidator.jar`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      res.send({ stdout, stderr });
    });
};

module.exports = {
    LaunchPegaRuleValidator
}