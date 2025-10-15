import React from 'react'
import Card from "@mui/material/Card";
import NavBar from '../NavBar/navbar';
import RulesDropDown from '../RulesMapTable/RulesDropDown';


export default function SeleniumMapping({heading}) {
  return (
    <div class = "homeContainer">
        <NavBar/>
        <Card variant="outlined" className="cardContainer">
        <p className="cardHeading">{heading}</p>
        <RulesDropDown/>
        </Card>
    </div>
  )
}
