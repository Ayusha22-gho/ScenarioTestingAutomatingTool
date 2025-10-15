import { createContext, useState, useEffect } from "react";
export const PRVJarPathContext = createContext();
export const PRVJarPathProvider = ({ children }) => {
   // Initialize state from localStorage or set empty string
   const [PRVjarPath, setPRVJarPath] = useState(localStorage.getItem("PRVJarPath") || "");
   // Update localStorage whenever jarPath changes
   useEffect(() => {
       localStorage.setItem("PRVJarPath", PRVjarPath);
   }, [PRVjarPath]);
   return (
<PRVJarPathContext.Provider value={{ PRVjarPath, setPRVJarPath }}>
           {children}
</PRVJarPathContext.Provider>
   );
};