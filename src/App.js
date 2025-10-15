import "./App.css";
import { Routes, Route } from "react-router-dom";
import Land from "./components/Landing/Land";
import PegaUnitTest from "./components/PegaUnitTest/PegaUnitTest";
import BranchTest from "./components/BranchTesting/BranchTest";
import WithoutUTC from "./components/WithoutUTC/WithoutUTC";
import ViewResult from "./components/ViewResults/ViewResult";
import UploadJarFiles from "./components/UploadJars/UploadJarFiles";
import SeleniumScripts from "./components/SeleniumScripts/SeleniumScripts";
import SeleniumMapping from "./components/SeleniumScripts/SeleniumMapping";
import LaunchPage from "./components/Landing/LauchPage";
import PegaPage from "./components/Landing/PegaRuleValidator";
import JarUpload from "./components/SeleniumScripts/JarUpload"



function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LaunchPage />}></Route>
      <Route exact path = "/prita" element = {<Land/>}></Route>
      <Route exact path = "/pega" element = {<PegaPage/>}></Route>

      <Route
        exact
        path="/preSIT"
        element={<PegaUnitTest heading="PRITA - PreSIT" />}
      ></Route>
      <Route
        exact
        path="/SIT"
        element={<BranchTest heading="Workflow Testing - Branch Search" />}
      ></Route>
      <Route path="/selenium-scripts" element={<SeleniumScripts heading = "Selenium Scripts Mapping"/>}></Route>
      <Route exact path ="/selenium-script-mapping" element = {<SeleniumMapping heading = "Selenium Scripts Mapping"/>}></Route>
      <Route
        exact
        path="/rules-without-utc"
        element={<WithoutUTC heading="Rules Without Unit Test Cases" />}
      ></Route>
      <Route
        exact
        path="/view-results"
        element={
          <ViewResult
            heading1="Pega Unit Test Report"
            heading2="Pega Scenario Test Report"
          />
        }
      ></Route>
     <Route exact path="/upload-jar" element={<JarUpload />}></Route>
      <Route exact path="/upload" element={<UploadJarFiles />}></Route>
    </Routes>
  );
}

export default App;
