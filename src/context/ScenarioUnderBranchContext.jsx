import React, { createContext, useState } from "react";
// Create the context
export const ScenarioUnderBranchContext = createContext();
// Create the provider component
export const ScenarioUnderBranchProvider = ({ children }) => {
    const [scenaroUnderBranch ,setScenarioUnderBranch] = useState([])
  return (
    <ScenarioUnderBranchContext.Provider value={{ scenaroUnderBranch, setScenarioUnderBranch }}>
      {children}
    </ScenarioUnderBranchContext.Provider>
  );
};
