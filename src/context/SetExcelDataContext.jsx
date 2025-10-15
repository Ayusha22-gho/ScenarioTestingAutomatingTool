import React, { createContext, useState } from "react";
// Create the context
export const SetExcelDataContext = createContext();
// Create the provider component
export const SetExcelDataProvider = ({ children }) => {
    const [excelData, setExcelData] = useState([]);
  return (
    <SetExcelDataContext.Provider value={{ excelData, setExcelData }}>
      {children}
    </SetExcelDataContext.Provider>
  );
};
