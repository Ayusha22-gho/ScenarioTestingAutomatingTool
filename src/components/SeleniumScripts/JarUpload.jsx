import React, { useState } from "react";
import axios from "axios";

const JarUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  //  const handleFileChange = (e) => {
  //    const file = e.target.files[0];
  //    if (file && file.name.endsWith('.jar')) {
  //      setSelectedFile(file);
  //    } else {
  //      alert('Please select a valid JAR file.');
  //    }
  //   //  };
  //   const handleFileChange = (e) => {
  //     const files =  Array.from(e.target.files);
  //     const jarFiles = files.filter(file=>file.name.endsWith('.jar'));
  //     setSelectedFile([...jarFiles]);
  //     console.log(selectedFile)
  //   };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const jarFiles = files.filter((file) => file.name.endsWith(".jar"));
    if (jarFiles.length !== files.length) {
      alert("Only .jar files are allowed. Non-JAR files were ignored.");
    }
    // Append new files without duplicates (based on name)
    setSelectedFiles((prevFiles) => {
      if (!Array.isArray(prevFiles)) {
        return [...jarFiles]; // fallback in case of bad state
      }
      const newUniqueFiles = jarFiles.filter(
        (newFile) =>
          !prevFiles.some((existing) => existing.name === newFile.name)
      );
      return [...prevFiles, ...newUniqueFiles];
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("No files selected.");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("jarFiles", file));
    try {
      const response = await axios.post(
        "http://localhost:8000/upload-jars",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(`Upload successful: ${response.data.message}`);
      setSelectedFiles([]); // Reset after upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    }
  };

  const removeFile = (index) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload JAR Files</h2>
      <input
        type="file"
        accept=".jar"
        multiple
        id="jar-upload"
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {file.name}
              <button
                onClick={() => removeFile(index)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleUpload} disabled={selectedFiles.length === 0}>
        Upload All
      </button>
    </div>
  );
};

export default JarUpload;
