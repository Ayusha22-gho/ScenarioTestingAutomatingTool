import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadJarFiles() {
  const [file, setFile] = useState(null);
  const [jars, setJars] = useState([]);
  const [selectedJar, setSelectedJar] = useState("");
  const [args, setArgs] = useState("");
  const [output, setOutput] = useState("");
  useEffect(() => {
    fetchJars();
  }, []);
  const fetchJars = async () => {
    try {
      const response = await axios.get("http://localhost:3000/list-jars");
      setJars(response.data.jars);
    } catch (error) {
      alert("Failed to fetch JAR list.");
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("jarFile", file);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      fetchJars(); // Refresh list after upload
    } catch (error) {
      alert(error.response?.data?.error || "File upload failed.");
    }
  };
  const runJar = async () => {
    if (!selectedJar) {
      alert("Please select a JAR file.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/run-jar", {
        filename: selectedJar,
        args: args.split(" "), // Convert input string to an array
      });
      setOutput(
        response.data.output ||
          `Process exited with code ${response.data.exitCode}`
      );
    } catch (error) {
      setOutput(error.response?.data?.error || "Execution failed.");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload & Execute JAR</h2>
      <input type="file" onChange={handleFileChange} accept=".jar" />
      <button onClick={uploadFile}>Upload JAR</button>
      <h3>Available JAR Files:</h3>
      <select onChange={(e) => setSelectedJar(e.target.value)}>
        <option value="">Select a JAR</option>
        {jars.map((jar, index) => (
          <option key={index} value={jar}>
            {jar}
          </option>
        ))}
      </select>
      <h3>Provide Arguments:</h3>
      <input
        type="text"
        placeholder="Enter arguments separated by space"
        value={args}
        onChange={(e) => setArgs(e.target.value)}
      />
      <button onClick={runJar}>Run JAR</button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}
export default UploadJarFiles;
