import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { SelectedRulesContext } from "../../context/SelectedRulesContext";

const SelectModal = ({ setRules }) => {

  const [isData, setData] = useState(false)
  const [viewResults, setViewResults] = useState([])
  const [matchedViewResults, setMatchedViewResults] = useState([])
  const [buttonEnabled,setButtonEnabled] = useState(false)

  useEffect (()=>{
    if(matchedViewResults.length >0){
      setButtonEnabled(true)
      alert("Execution Report Has Been Generated. Please Click on View Report Button to View the Report.")
    }
  },[matchedViewResults])

  let navigate = useNavigate(); 
  const { selectedRules } = useContext(SelectedRulesContext)
  const selectedRuleNames = selectedRules.map(item => item["Rule Name"]);

  const handleSelectedRulesScript = async ()=>{
    //const selectedRuleNames = selectedRules.map(item => item["Rule Name"]);
    alert('PRE SIT Test Case Run is in Progress.')
    await axios
      .post("http://localhost:8080/v1/selected-rules-presit", { rules : selectedRuleNames })
      .then((response) => {
        console.log("selected rules result", response.data.stdout);
        alert('PRE SIT Execution Completed. Please Click on Generate Report to Generate the Execution Report')
        setData(true)
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  }

  const showViewResults = async () => {
    await axios
      .get("http://localhost:8080/v1/api/pega-scenario-testresult")
      .then((response) => {
        setViewResults(response.data); // Set the data into state
      })
      .catch((error) => {
        console.error("There was an error fetching the Excel data!", error);
      });
      
      const splitData = viewResults.map(item => {
          const RuleName = item["Rule Under Test InsName"].split('!')[1];
          return  {...item,RuleName}
          
      })
     console.log("splitData",splitData)

      const matchedData = splitData.filter(value =>
        selectedRuleNames.some(item => item.toLowerCase() === value.RuleName.toLowerCase())
      )
      
      console.log("selectedRuleNames",selectedRuleNames)
      setMatchedViewResults(matchedData)
      console.log("matchedViewResults",matchedViewResults)

      // if(matchedViewResults.length > 0){
      //   alert("Impacted Rules Report Generated. Click on View Results")
      // }
      
  };
    const goToViewResultsPage = () =>{
      setTimeout(() => {
        navigate('/view-results',{state :{matchedViewResults}})
      }, "1000");
    }
  
  return (
    <div>
      <Dialog open={setRules} onClose={() => setRules(false)} >
        <DialogTitle sx={{ 'font-weight': '700' }}>
          Selected Rules
        </DialogTitle>
        <DialogContent>
          <div className="tableWithoutUTContainer">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {selectedRules.length > 0 &&
                      Object.keys(selectedRules[0]).map((key) => (
                        <TableCell key={key} sx={{ 'font-weight': '700' }}>{key}</TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRules.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((cell, idx) => (
                        <TableCell key={idx}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button variant="contained" disabled = {selectedRules.length === 0} onClick={handleSelectedRulesScript}>Run</Button>
  
          <Button variant="contained" disabled = {!isData} sx={{ margin: 4}}  onClick={showViewResults}>Generate Report</Button>
          <Button variant="contained" disabled = {!buttonEnabled} sx={{ margin: 4}} onClick={goToViewResultsPage}>View Report</Button>
          
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SelectModal
