const express = require("express");
const router = express.Router();
const sitController = require("../../controllers/sitController")

router.post("/sit-branch-name",sitController.saveSITBranchName)
router.post("/search-impacted-branch",sitController.SearchImpactedBranchUnderSTC)
router.post("/selected-workflow-scenario",sitController.SelectedWorkFlowTestSIT)

module.exports = router
