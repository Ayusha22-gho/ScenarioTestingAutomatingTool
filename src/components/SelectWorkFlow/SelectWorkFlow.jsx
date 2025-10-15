import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell
} from "@mui/material";
import ViewScenarioReport from './ViewScenarioReport';
import BASE_URL from "../../config";

import axios from "axios";

import { ScenarioUnderBranchContext } from '../../context/ScenarioUnderBranchContext';

export default function SelectWorkFlow({ setRules }) {
    const { scenaroUnderBranch } = useContext(ScenarioUnderBranchContext)
    const [selectScenario, setSelecetScenario] = useState([])
    const [executed, setExecution] = useState(false)
    const[viewResults, setViewResults] = useState([])
    const [scenarioMatched, setScenarioMatched] = useState([])
  


    useEffect(()=>{
        fetchExcelData();
    },[])

    const handleCheckBoxChange = (item) => {
        setSelecetScenario((prevSelected) => prevSelected.includes(item) ?
            prevSelected.filter((i) => i !== item) :
            [...prevSelected, item]
        );
        console.log("Selected Rules", selectScenario);
    }

    const handleSelectAllRules = (e) => {
        if (e.target.checked) {
            const allRows = scenaroUnderBranch.map((row) => row)
            setSelecetScenario(allRows);
        } else {
            setSelecetScenario([])
        }
        console.log("Select All rules", selectScenario)
    }

    const isAllSelected = selectScenario.length === scenaroUnderBranch.length;
    const selectedScenario = selectScenario.map(item => item["Rule Name"]);


    const handleSelectedScenarioScript = async ()=>{
        //const selectedRuleNames = selectedRules.map(item => item["Rule Name"]);
        alert("PEGA Scenario Test Case Execution is in Progress.");
        await axios
          .post(`${BASE_URL}/v1/selected-workflow-scenario`, { rules : selectedScenario })
          .then((response) => {
            console.log("selected rules result", response.data.stdout);
            alert("PEGA Scenario Test Execution Has Been Completed. Please Click on View Results To View the Execution Report");
            setExecution(true)
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
          });
      }

      const fetchExcelData = async ()=>{
        await axios
        .get(`${BASE_URL}/v1/api/scenario-branch-testresult`)
        .then((response) => {
          setViewResults( response.data); // Set the data into state
          console.log("from useeffect block",response.data)
        })
        .catch((error) => {
          console.error("There was an error fetching the Excel data!", error);
        });
      }

      const fetchScenarioTestResults = async () => {
        
        await axios
          .get(`${BASE_URL}/v1/api/scenario-branch-testresult`)
          .then((response) => {
            setViewResults( response.data); // Set the data into state
            console.log("latest viewresults",response.data)
            const matchedData = viewResults.filter(value =>
                selectedScenario.some(item => item.toLowerCase() === value["Test case name"].toLowerCase())
              )
              
              setScenarioMatched(matchedData);
              console.log("matched scenario data",matchedData,scenarioMatched)
          })
          .catch((error) => {
            console.error("There was an error fetching the Excel data!", error);
          })
         
      };

      const showViewResults =()=>{
        fetchScenarioTestResults();   
      }

    return (
        <div>
            <Dialog open={setRules} onClose={() => setRules(false)} >
                <DialogTitle sx={{ 'font-weight': '700' }}>
                    Select Scenarios
                </DialogTitle>
                <DialogContent>
                    <div className="tableWithoutUTContainer">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {scenaroUnderBranch.length > 0 &&
                                            Object.keys(scenaroUnderBranch[0]).map((key) => (
                                                <TableCell key={key} sx={{ 'font-weight': '700' }}>{key}</TableCell>
                                            ))}
                                        < TableCell sx={{ 'font-weight': '700' }}>Select All
                                            <input type='checkbox' onChange={handleSelectAllRules} checked={isAllSelected} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scenaroUnderBranch.map((row, index) => (
                                        <TableRow key={index}>
                                            {Object.values(row).map((cell, idx) => (
                                                <TableCell key={idx}>{cell}</TableCell>
                                            ))}
                                            <TableCell>
                                                <input type='checkbox' value={row} onChange={() => handleCheckBoxChange(row)}
                                                    checked={selectScenario.includes(row)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Button variant="contained" disabled = {selectScenario.length===0} onClick={handleSelectedScenarioScript}>Run Selected</Button>
                    <ViewScenarioReport executed = {executed} showViewResults={showViewResults}  scenarioMatched={scenarioMatched}/>


                </DialogContent>
            </Dialog>
        </div>
    )
}
