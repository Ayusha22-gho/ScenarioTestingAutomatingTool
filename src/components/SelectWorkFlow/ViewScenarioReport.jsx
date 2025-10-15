import React,{useState,useEffect} from 'react'
import {
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewScenarioReport({executed,showViewResults,scenarioMatched}) {
    let navigate = useNavigate();
    useEffect( () => {
        if(scenarioMatched.length > 0){
            navigate('/view-results',{state :{scenarioMatched}})
        }
      }, [scenarioMatched]);

  return (
    <Button variant="contained" sx={{ margin: 4 }} disabled = {!executed} onClick={showViewResults}>
                        View Results</Button>
  )
}
