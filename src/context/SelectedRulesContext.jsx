import React, { createContext, useState } from "react";

export const SelectedRulesContext = createContext();

export const SelectedRulesProvider = ({ children }) => {
    const [selectedRules, setSelectedRules] = useState([])
    return (
        <SelectedRulesContext.Provider value = {{selectedRules,setSelectedRules}}>{children}</SelectedRulesContext.Provider>
    )
}
