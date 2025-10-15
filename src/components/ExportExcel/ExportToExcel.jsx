import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
const ExportToExcel = ({ tableData, fileName }) => {
    const handleExport = () => {
        // Convert data to a worksheet
        const ws = XLSX.utils.json_to_sheet(tableData);

        // Create a workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");

        // Style the header row after appending the sheet
        const headerRange = XLSX.utils.decode_range(ws["!ref"]);
        console.log("headerrange",headerRange)
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // Row 0 is the header
            console.log("cellAddress",cellAddress)
            if (ws[cellAddress]) {
                console.log("ws[cellAddress]",ws[cellAddress])
                ws[cellAddress].s = {
                    font: { bold: true,sz :14 }, // Make header text bold
                    alignment: { horizontal: "center", vertical: "center" }, // Optional: Center alignment
                };
            }
        }

        // Apply conditional formatting for "Passed" and "Failed"
        const dataRange = XLSX.utils.decode_range(ws["!ref"]); // Get the full range of data
        for (let row = dataRange.s.r; row <= dataRange.e.r; row++) {
            console.log("headerrange7")
            for (let col = dataRange.s.c; col <= dataRange.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                const cell = ws[cellAddress];
                if (cell && cell.v === "Passed") {
                    // Apply green background for "Passed"
                    cell.s = {
                        font: { color: { rgb: "FFFFFF" } }, // Optional: white font
                        fill: { fgColor: { rgb: "00FF00" } }, // Green fill
                    };
                } else if (cell && cell.v === "Failed") {
                    // Apply red background for "Failed"
                    cell.s = {
                        font: { color: { rgb: "FFFFFF" } }, // Optional: white font
                        fill: { fgColor: { rgb: "FF0000" } }, // Red fill
                    };
                }
            }
        }
        // Adjust column widths
        const headers = Object.keys(tableData[0]);
        const columnWidths = headers.map((header) => {
            console.log("headerrange")
            const maxLength = Math.max(
                header.length,
                ...tableData.map((row) => String(row[header] || "").length)
            );
            return { wch: maxLength + 2 }; // Add padding
        });
        ws["!cols"] = columnWidths;


        //Geerate timestamp
        const timestamp = new Date().toISOString().replace(/[-:]/g, "-").replace("T", "-").slice(0, 19) //format : YYYYMMDD_HHMM
        const CompletedfileName = `${fileName}_${timestamp}.xlsx`

        // Write the workbook and download
        XLSX.writeFile(wb, CompletedfileName);
    };
    return <Button variant="contained" onClick={handleExport}>Download Excel</Button>;
};
export default ExportToExcel;

//import XLSX from "xlsx-style";
// const XLSX = require("xlsx-style")
// const ExportToExcel = ({ tableData, fileName }) => {
    
   
//    // Convert data to worksheet
//    const ws = XLSX.utils.json_to_sheet(tableData);
//    // Apply styles for headers
//    const headers = Object.keys(tableData[0]);
//    headers.forEach((header, index) => {
//        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
//        ws[cellAddress].s = {
//            font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
//            fill: { fgColor: { rgb: "4CAF50" } }, // Green background for headers
//        };
//    });
//    // Apply conditional formatting to cells
//    const dataRange = XLSX.utils.decode_range(ws["!ref"]);
//    for (let row = 1; row <= dataRange.e.r; row++) {
//        const cellAddress = XLSX.utils.encode_cell({ r: row, c: 1 }); // Assuming 'Status' is column 1
//        const cell = ws[cellAddress];
//        if (cell && cell.v === "Passed") {
//            cell.s = {
//                font: { color: { rgb: "FFFFFF" } },
//                fill: { fgColor: { rgb: "00FF00" } }, // Green for "Passed"
//            };
//        } else if (cell && cell.v === "Failed") {
//            cell.s = {
//                font: { color: { rgb: "FFFFFF" } },
//                fill: { fgColor: { rgb: "FF0000" } }, // Red for "Failed"
//            };
//        }
//    }
//    // Adjust column widths
//    ws["!cols"] = headers.map((header) => ({ wch: header.length + 5 }));
//    // Create workbook and append worksheet
//    const wb = XLSX.utils.book_new();
//    XLSX.utils.book_append_sheet(wb, ws, "Report");
//    // Write the workbook to a file
//    const timestamp = new Date().toISOString().replace(/[-:]/g, "-").replace("T", "-").slice(0, 19);
//    const CompletedfileName = `${fileName}_${timestamp}.xlsx`;
//    XLSX.writeFile(wb, CompletedfileName);
// };
// export default ExportToExcel;