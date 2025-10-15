const express = require("express");
const router = express.Router();
const pegaRuleValidatorController = require("../../controllers/pegaRuleController")

router.post("/pega-rule-validator", pegaRuleValidatorController.LaunchPegaRuleValidator)

module.exports = router;