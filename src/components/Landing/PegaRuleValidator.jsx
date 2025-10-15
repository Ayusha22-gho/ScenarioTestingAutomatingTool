import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Launch.css";
import ConfigurePRVPath from "../ConfigurePath/ConfigurePRVPath";
import { PRVJarPathContext } from "../../context/PRVJarPathContext";
import { Button } from "@mui/material";


const PegaPage = () => {
  const { PRVjarPath, setPRVJarPath } = useContext(PRVJarPathContext);

  const [isOpenPRVConfigure, setIsPRVOpenConfigure] = useState(false);
  const [PRVinputValue, setPRVInputValue] = useState("");

  // useEffect(() => {
  //   const existingPath = localStorage.getItem("PRVJarPath") || "";
  //   console.log("in useeffect block");
  //   setPRVJarPath(existingPath);
  // }, []);

  const handlePRVInputChange = (e) => {
    console.log(e.target.value)
    setPRVInputValue(e.target.value);
  };

  const handlePRVOkClick = () => {
    if (PRVinputValue.trim().length < 3) {
      alert("Please Provide New Jar Path Else Press Cancel Button");
      return;
    }
    console.log("PRVinputValue",PRVinputValue)
    localStorage.setItem("PRVJarPath", PRVinputValue);
    const testPathValue = localStorage.getItem("PRVJarPath");
    alert("PRVJarPath Has Been Set To: " + testPathValue);
    setPRVJarPath(testPathValue);
   // setIsPRVOpenConfigure(false);
   console.log("testPathValue",testPathValue)
   console.log("PRVJarPath State",PRVjarPath)
  };
  const handlePRVCancelClick = () => {
    setPRVInputValue("");
  };

  const launchPritaApplication = async () => {
    console.log("jarpath", setPRVJarPath);
    await axios
      .post("http://localhost:8081/v1/pega-rule-validator", { PRVjarPath })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const navigate = useNavigate();
  return (
    <div className="body-container">
      <div className="app-page">
        <h1>PEGA RULE VALIDATOR</h1>
        <ConfigurePRVPath
          isOpenPRVConfigure={isOpenPRVConfigure}
          setIsPRVOpenConfigure={setIsPRVOpenConfigure}
          handlePRVInputChange={handlePRVInputChange}
          handlePRVOkClick={handlePRVOkClick}
          handlePRVCancelClick={handlePRVCancelClick}
          PRVinputValue={PRVinputValue}
        />
        <Button className="back-button" onClick={launchPritaApplication} disabled={!PRVjarPath}
        variant="contained"
        >
          Launch
        </Button>
        <Button className="back-button" onClick={() => navigate("/")} variant="contained"
           sx={{
            margin: "10px",
          }}
          >
          Go Back
        </Button>
      </div>
    </div>
  );
};
export default PegaPage;
