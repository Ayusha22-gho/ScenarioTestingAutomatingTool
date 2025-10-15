const express = require("express");
const testUrlRoute = require("./testUrl.route")
const preSITRoute = require("./presit.route")
const sitRoute = require("./sit.route")
const excelDataRoute = require("./exceldata.route")
const pegaValidator = require("./pegaRule.route")

const router = express.Router();

router.use("/",testUrlRoute)
router.use("/",preSITRoute)
router.use("/",sitRoute)
router.use("/",pegaValidator)
router.use("/api",excelDataRoute)

module.exports = router;