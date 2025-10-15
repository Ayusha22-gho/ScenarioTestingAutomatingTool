import React, { useContext, useState } from 'react'
import { SetExcelDataContext } from '../../context/SetExcelDataContext'
import { SelectedRulesContext } from '../../context/SelectedRulesContext';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function WithUTC() {
    const { excelData } = useContext(SetExcelDataContext)
    const { selectedRules, setSelectedRules } = useContext(SelectedRulesContext)

    const handleCheckBoxChange = (item) => {
        setSelectedRules((prevSelected) => prevSelected.includes(item) ?
            prevSelected.filter((i) => i !== item) :
            [...prevSelected, item]
        );
        console.log("Selected Rules", selectedRules)
    }

    const handleSelectAllRules = (e) => {
        if (e.target.checked) {
            const allRows = excelData.map((row) => row)
            setSelectedRules(allRows);
        } else {
            setSelectedRules([])
        }
        console.log("Select All rules", selectedRules)
    }

    const isAllSelected = selectedRules.length === excelData.length;
    
    return (
        <>
        {excelData.length > 0 &&  <h3>Search Results : </h3>}
       
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {excelData.length > 0 &&
                            <>
                            {
                            Object.keys(excelData[0]).map((key) => (
                                <TableCell key={key} sx={{ 'font-weight': '700' }}>{key}</TableCell>
                            ))}
                            < TableCell sx={{ 'font-weight': '700' }}>Select All <input type='checkbox' onChange={handleSelectAllRules} checked={isAllSelected} /></TableCell>
                            </>
                        }

                </TableRow>
            </TableHead>
            <TableBody>
                {excelData.map((row, index) => (
                    <TableRow key={index}>
                        {Object.values(row).map((cell, idx) => (

                            <TableCell key={idx}>{cell}
                            </TableCell>
                        ))}
                        <TableCell>
                            <input type='checkbox' value={row} onChange={() => handleCheckBoxChange(row)}
                                checked={selectedRules.includes(row)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer >
        </>
    )
}
