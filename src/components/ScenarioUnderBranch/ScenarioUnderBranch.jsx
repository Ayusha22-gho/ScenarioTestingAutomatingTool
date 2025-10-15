import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ScenarioUnderBranch({scenaroUnderBranch}) {
    return (
        <div>
            <h3>List of Scenarios: </h3>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {scenaroUnderBranch.length > 0 &&
                            Object.keys(scenaroUnderBranch[0]).map((key) => (
                                <TableCell key={key} sx={{ 'font-weight': '700' }}>{key}</TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scenaroUnderBranch.map((row, index) => (
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
    )
}
