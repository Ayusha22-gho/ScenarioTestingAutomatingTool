import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Button,
    Card,
    Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell
} from "@mui/material";
import NavBar from '../NavBar/navbar';
import "./ViewResult.css"
import ExportToExcel from '../ExportExcel/ExportToExcel';

export default function ViewResult({ heading1, heading2 }) {
    const location = useLocation();
    let navigate = useNavigate();
    const { matchedViewResults } = location.state || {}
    const { scenarioMatched } = location.state || {}

    const renderContent = () => {
        if (matchedViewResults && !scenarioMatched) {
            return <div class="reportDisplayContainer">
                <NavBar />
                <Card variant="outlined" className="reportcardContainer">
                    <div className='viewResultsHeading'>
                        <p className="cardHeading">{heading1}</p>
                        <ExportToExcel className="swd" tableData={matchedViewResults} fileName="PreSITExecutionReport" />
                        <Button variant='contained'  onClick={() => navigate("/preSIT")}>Back</Button>
                    </div>
                    <TableContainer component={Paper} >
                        <Table sx={{ width: 500 }} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    {matchedViewResults.length > 0 &&
                                        Object.keys(matchedViewResults[0]).map((key) => (
                                            <TableCell key={key} sx={{ 'font-weight': '700' }}>{key}</TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matchedViewResults.map((row, index) => (
                                    <TableRow key={index}>
                                        {Object.values(row).map((cell, idx) => (
                                            <TableCell key={idx}
                                                sx={{
                                                    color: row["Test Case Result"] === "Passed" ? "green" : "red", fontWeight: "bold"
                                                }}
                                            >{cell}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Card>

            </div>
        } else if (scenarioMatched && !matchedViewResults) {
            return <div class="reportDisplayContainer">
                <NavBar />
                <Card variant="outlined" className="reportcardContainer">
                    <div className='viewResultsHeading'>
                        <p className="cardHeading">{heading2}</p>
                       
                        <ExportToExcel className="swd" tableData={scenarioMatched} fileName="SITExecutionReport" />
                        <Button variant='contained'  onClick={() => navigate("/SIT")}>Back</Button>
                    </div>
                    <TableContainer component={Paper} >
                        <Table sx={{ width: 500 }} aria-label="simple table" className='scenarioTestTable'>
                            <TableHead>
                                <TableRow>
                                    {scenarioMatched.length > 0 &&
                                        Object.keys(scenarioMatched[0]).map((key) => (
                                            <>
                                           
                                             <TableCell key={key} sx={{ 'font-weight': '700' }}>{key}</TableCell>
                                            </>
                                           
                                            
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scenarioMatched.map((row, index) => (
                                    <TableRow key={index}>
                                        {Object.values(row).map((cell, idx) => (
                                            <TableCell key={idx}
                                                sx={{
                                                    color: row["Test Case Run Result"] === "Passed" ? "green" : "red", fontWeight: "bold"
                                                }}
                                            >{cell}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> </Card></div>
        } else {
            return <div>
                No Results To Display
                <Button variant="contained" onClick={() => navigate("/")}>BACK</Button>
            </div>
        }

    }
    return (
        <div>
            {renderContent()}
        </div>

    )
}
