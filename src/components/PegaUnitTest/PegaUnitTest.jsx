import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import axios from "axios";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import NavBar from "../NavBar/navbar";
import SelectModal from "../Modal/selectModal";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { SetExcelDataContext } from "../../context/SetExcelDataContext";
import { SelectedRulesContext } from "../../context/SelectedRulesContext";
import WithUTC from "../WithUTC/WithUTC";
import TestUrlConfigure from "../TestUrlConfigure/TestUrlConfigure";
import { JarPathContext } from "../../context/JarPathContext";
import BASE_URL from "../../config";

function PegaUnitTest({ heading }) {
 
  const [branches, setBranches] = useState([]);
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUrl , setIsOpenUrl] =useState(false)
  const [rules, setRules] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [saveBranch, setSaveBranch] = useState(false)
  const { excelData, setExcelData } = useContext(SetExcelDataContext)
  const { setSelectedRules } = useContext(SelectedRulesContext)
  const {jarPath} = useContext(JarPathContext)

  let navigate = useNavigate();

  const handleRunClick = async () => {
    if (jarPath.trim().length < 1) {
      alert("Please provide the Jar Path.");
      return;
    }
    alert("Rule scanning is in progress");

    await axios
      .post(`${BASE_URL}/v1/run-command`, { jarPath })
      .then((response) => {
        alert("Impacted Rules Extraction has been completed");
        console.log(response.data);
        setSearchResults(response.data.stdout);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };

  const saveBranchName = async () => {
    await axios
      .post(`${BASE_URL}/v1/save-branch`, { branches })
      .then((response) => {
        alert("Branch Saved. Please Click on Search Impacted Rules to Search the Rules for the given branch");
        setSaveBranch(true)
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };

  const addBranch = () => {
    if (branches.length < 5) {
      setBranches([...branches, ""]);
      console.log("tab ", branches);
    }
  };
  const updateBranchContent = (id, value) => {
    const updatedTabs = [...branches];
    updatedTabs[id] = value;
    setBranches(updatedTabs);
    console.log(branches);
  };
  const removeBranch = (index) => {
    // const newTextArea = [...branches];
    // newTextArea.splice(index, 1);
    // setBranches(newTextArea);
    const removedBranch = branches.filter((_, element) => element !== index);
    setBranches(removedBranch);
    console.log(branches);
  };
  const resetSearchResult = () => {
    setSearchResults(null);
    setExcelData([])
    setSelectedRules([])
  };

  const showImpactedRulesWithUTC = async () => {
    await axios
      .get(`${BASE_URL}/v1/api/excel-with-tc-data`)
      .then((response) => {
        setExcelData(response.data); // Set the data into state
      })
      .catch((error) => {
        console.error("There was an error fetching the Excel data!", error);
      });
  };

  return (
    <div class="homeContainer">
      <NavBar />
      <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <div className="configureButtons">
        {/* <Configure
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            configureFlag={true}
            handleInputChange={handleInputChange}
            handleOkClick={handleOkClick}
            handleCancelClick={handleCancelClick}
            inputValue={inputValue}
            jarPath={jarPath}
          /> */}
          <TestUrlConfigure
            isOpen = {isOpenUrl}
            setIsOpen={setIsOpenUrl}
          />
        </div>
        <hr/>
        <div className="addBranchContainer">
          <label className="branchLabel">
            Enter The Impacted Branch Name
          </label>
          <button
            onClick={addBranch}
            disabled={branches.length >= 5}
            className="branchButton"
          >
            +
          </button>
        </div>
        <div>
          {branches.length > 0 ? (
            <div className="branchLabel">
              <label> Branch Name :</label>
            </div>
          ) : null}

          {branches.map((tab, index) => (
            <>
              <div key={index} className="branchNameContainer">
                <span className="branchNumbers">Branch #{index + 1}</span>
                <textarea
                  value={tab}
                  onChange={(e) => updateBranchContent(index, e.target.value)}
                  rows="2"
                  cols="50"
                />
                <button
                  onClick={() => removeBranch(index)}
                  className="branchRemoveButton"
                >
                  Remove
                </button>
              </div>
            </>
          ))}
          {branches.length > 0 ? (
            <button className="branchSaveButton" onClick={saveBranchName}>
              Save Branch Name
            </button>
          ) : null}
        </div>

        <div className="branchButtons">
          
          <Button variant="contained" onClick={resetSearchResult}>
            RESET
          </Button>
          <Button variant="contained" onClick={handleRunClick} disabled={!saveBranch}>
            SEARCH IMPACTED RULES
          </Button>
          <Button variant="contained">CLOSE</Button>
        </div>

        <div>
          {searchResults &&
            (
              <>
                <div>
                  <WithUTC />
                </div>
                <div className="branchButtons">
                  <Button variant="contained" onClick={showImpactedRulesWithUTC}>
                    IMPACTED RULES WITH UTC
                  </Button>
                  <Button variant="outlined" onClick={() => setRules(true)} >
                    VIEW SELECTED RULES
                  </Button>
                  {rules && <SelectModal setRules={setRules} />}
                  <Button
                    variant="contained"
                    onClick={() => navigate("/rules-without-utc")}
                  >
                    IMPACTED RULES WITHOUT UTC
                  </Button>
                </div>
              </>
            )
          }
        </div>
      </Card>
    </div>
  );
}
export default PegaUnitTest;
