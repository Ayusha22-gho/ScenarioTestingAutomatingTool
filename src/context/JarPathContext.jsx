import { createContext, useState, useEffect } from "react";
export const JarPathContext = createContext();
export const JarPathProvider = ({ children }) => {
   // Initialize state from localStorage or set empty string
   const [jarPath, setJarPath] = useState(localStorage.getItem("JarPath") || "");
   // Update localStorage whenever jarPath changes
   useEffect(() => {
       localStorage.setItem("JarPath", jarPath);
   }, [jarPath]);
   return (
<JarPathContext.Provider value={{ jarPath, setJarPath }}>
           {children}
</JarPathContext.Provider>
   );
};