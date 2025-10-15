const path = require("path");
const fs = require("fs");
require('dotenv').config()
const os = require('os')

const homeDir = os.homedir();

const propsFilePath = path.resolve(__dirname,"..","object.properties")

const updateTestUrl =  (req, res) => {
    const { url, userId, password } = req.body;
  
    if (!url && !userId && !password) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update." });
    }
  
    try {
      updatePropertiesFile({ url, userId, password });
      res.json({ message: "Properties updated successfully." });
    } catch (error) {
      console.error("Error updating properties:", error);
      res.status(500).json({ message: "Error updating properties." });
    }
  };

  function parseLine(line) {
    const index = line.indexOf("=");
    if (index === -1) {
      return { key: line.trim(), value: "" };
    }
    const key = line.substring(0, index).trim();
    const value = line.substring(index + 1).trim();
    return { key, value };
  }

  function updatePropertiesFile({ url, userId, password }) {
    // Read the file contents
    const properties = fs.readFileSync(propsFilePath, "utf8");
    const lines = properties.split("\n");
  
    // Define the keys to update
    const keysToUpdate = {
      Url: url,
      PegaUserName: userId,
      PegaPassword: password,
    };
  
    const updatedLines = lines.map((line) => {
      // Ignore empty lines or comments (assuming lines starting with '-' are comments)
      if (!line.trim() || line.trim().startsWith("-")) {
        return line;
      }
      // Parse the line to get key and value
      const { key, value } = parseLine(line);
      // If the key is one of the ones to update, replace its value
      if (keysToUpdate[key] !== undefined) {
        return `${key}=${keysToUpdate[key]}`;
      }
      // Otherwise, return the original line
      return line;
    });
  
    fs.writeFileSync(propsFilePath, updatedLines.join("\n"), "utf-8");
    console.log("Properties file updated successfully.");
  }
  
  module.exports = {
    updateTestUrl
  }
  