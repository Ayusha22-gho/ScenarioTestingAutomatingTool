const express = require("express");
const router = express.Router();
const preSitController = require("../../controllers/presitController")
const sitController = require("../../controllers/sitController")

router.get("/excel-without-tc-data",preSitController.excelWithoutUTC)
router.get("/excel-with-tc-data",preSitController.excelWithUTC)
router.get("/pega-scenario-testresult",preSitController.preSITTestResult)
router.get("/scenario-underBranch",sitController.scenariosUnderBranch)
router.get("/scenario-branch-testresult",sitController.SITBranchTestResult)

module.exports = router;