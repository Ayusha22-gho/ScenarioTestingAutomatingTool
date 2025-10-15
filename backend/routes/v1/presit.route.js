const express = require("express");
const router = express.Router();
const preSitController = require("../../controllers/presitController")

router.post("/save-branch", preSitController.saveBranchName)
router.post("/run-command", preSitController.savingRules);
router.post("/selected-rules-presit",preSitController.selectedRulesPreSIT)

module.exports = router;