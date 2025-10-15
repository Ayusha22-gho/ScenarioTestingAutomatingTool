import React from 'react'
import NavBar from '../NavBar/navbar'
import Card from "@mui/material/Card";
import RulesMapTable from '../RulesMapTable/RulesMapTable';
export default function SeleniumScripts({heading}) {
  return (
    <div class = "homeContainer">
        <NavBar/>
        <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <RulesMapTable/>
        </Card>
    </div>
  )
}

