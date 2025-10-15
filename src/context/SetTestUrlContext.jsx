import React, { createContext, useState } from "react";
// Create the context
export const SetTestUrlContext = createContext();
// Create the provider component
export const SetTestUrlProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    url: "",
    userId: "",
    password: "",
  });
  return (
    <SetTestUrlContext.Provider value={{ formData , setFormData }}>
      {children}
    </SetTestUrlContext.Provider>
  );
};