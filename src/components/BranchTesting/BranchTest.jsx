import React, { useEffect, useState ,useContext} from "react";
import NavBar from "../NavBar/navbar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import axios from "axios";
import TestUrlConfigure from "../TestUrlConfigure/TestUrlConfigure";
import ScenarioUnderBranch from "../ScenarioUnderBranch/ScenarioUnderBranch";
import SelectWorkFlow from "../SelectWorkFlow/SelectWorkFlow";
import { ScenarioUnderBranchContext } from "../../context/ScenarioUnderBranchContext";
import { JarPathContext } from "../../context/JarPathContext";
import BASE_URL from "../../config";

export default function BranchTest({ heading }) {
  const [isOpenUrl , setIsOpenUrl] =useState(false)
  const [branch, setBranch] = useState("");
  const {scenaroUnderBranch ,setScenarioUnderBranch} = useContext(ScenarioUnderBranchContext)
  const [save, setSave] = useState(false)
  const [viewResult, setViewResult] = useState(false)
  const [rules,setRules] = useState(false)
  const {jarPath} = useContext(JarPathContext)


  const saveImpactedBranch = async() => {
    if (branch.length < 1) {
      alert("Please enter branch name to be searched");
      return;
    }
    await axios
      .post(`${BASE_URL}/v1/sit-branch-name`, { branch })
      .then((response) => {
        console.log(response.data)
        setSave(true)
       alert(response.data.message +" "+ response.data.SITBranchName)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const searchImpactedBranch = async()=>{
    if (branch.length < 1) {
      alert("Please enter branch name to be searched");
      return;
    }
    await axios
      .post(`${BASE_URL}/v1/search-impacted-branch`,{jarPath})
      .then((response) => {
        setViewResult(true)
        alert("Scenario Test Cases Under The Branch Has Been Extracted.");
        console.log("setScenarioUnderBranch",response.data)
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  }

  const viewScenaroUnderBranch = async()=>{
    await axios
    .get(`${BASE_URL}/v1/api/scenario-underBranch`)
    .then((response) => {
      console.log("setScenarioUnderBranch",response.data)
      setScenarioUnderBranch(response.data); // Set the data into state
    })
    .catch((error) => {
      console.error("There was an error fetching the Excel data!", error);
    });
  }
  const resetScenarioTest = ()=>{
    setScenarioUnderBranch([])
    setSave(false)
    setViewResult(false)
    setBranch("")
  }
  return (
    <div class="homeContainer">
      <NavBar />
      <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <div className="testurlconfigurebutton">
          <TestUrlConfigure
           isOpen = {isOpenUrl}
           setIsOpen={setIsOpenUrl}
          />
        </div>
        <hr/>
        <div className="addBranchContainer">
          <label className="branchLabel">Branch Name#</label>
          <div className="branchSearchContainer">
            <textarea
              rows="2"
              cols="80"
              value = {branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
        </div>

        <div className="branchButtons">
          <Button variant ="contained" onClick={saveImpactedBranch}>Save Branch Name</Button>
          <Button  variant ="contained" disabled = {!save} onClick = {searchImpactedBranch} >
            Search Impacted Branch
          </Button>
          <Button variant="contained" onClick={resetScenarioTest}>Reset</Button>
        </div>

        <div>
          {scenaroUnderBranch.length>0 && <ScenarioUnderBranch scenaroUnderBranch = {scenaroUnderBranch} />}
          
          <div className="branchButtons">
            <Button variant="contained" disabled ={!viewResult} onClick = {viewScenaroUnderBranch}>
              View Search Result
            </Button>
            <Button variant="contained" disabled ={scenaroUnderBranch.length === 0} onClick={()=>setRules(true)}>
              Select Workflow Test Scenarios
            </Button>
            {rules && <SelectWorkFlow setRules={setRules}/>}
          </div>
        </div>
      </Card>
    </div>
  );
}
