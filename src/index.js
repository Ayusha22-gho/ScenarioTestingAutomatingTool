import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { SetExcelDataProvider } from "./context/SetExcelDataContext";
import { SelectedRulesProvider } from "./context/SelectedRulesContext";
import { ScenarioUnderBranchProvider } from "./context/ScenarioUnderBranchContext";
import { SetTestUrlProvider } from "./context/SetTestUrlContext";
import { SnackbarProvider } from "notistack";
import { JarPathProvider } from "./context/JarPathContext";
import { PRVJarPathProvider } from "./context/PRVJarPathContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider>
    <PRVJarPathProvider>
  <JarPathProvider>
    
      <SetTestUrlProvider>
    <SearchProvider>
      <SetExcelDataProvider>
        <SelectedRulesProvider>
          <ScenarioUnderBranchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </ScenarioUnderBranchProvider>
        </SelectedRulesProvider>
      </SetExcelDataProvider>
    </SearchProvider>
    </SetTestUrlProvider>
    
    </JarPathProvider>
    </PRVJarPathProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
