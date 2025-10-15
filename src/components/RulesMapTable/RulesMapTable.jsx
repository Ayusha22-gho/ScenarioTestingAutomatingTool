import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const data = [
  { id: 1, branch: "PegaTC", rule: "Rule1", tc: "TC1" },
  { id: 2, branch: "PegaTC", rule: "Rule2", tc: "TC2" },
  { id: 3, branch: "PRITA", rule: "Rule3", tc: "TC3" },
  { id: 4, branch: "Wheelson", rule: "Rule4", tc: "TC4" },
  { id: 5, branch: "PegaTC", rule: "Rule5", tc: "TC5" },
  { id: 6, branch: "Wheelson", rule: "Rule6", tc: "TC6" },
  { id: 7, branch: "Wheelson", rule: "Rule7", tc: "TC7" },
  { id: 8, branch: "PRITA", rule: "Rule8", tc: "TC8" },
];

const RulesMapTable = () => {
  return (
    <TableContainer
    component={Paper}
      style={{ width: "80%", margin: "10px auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Rule ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Branch Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Rule Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>TC Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.branch}</TableCell>
              <TableCell>{row.rule}</TableCell>
              <TableCell>{row.tc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RulesMapTable;
