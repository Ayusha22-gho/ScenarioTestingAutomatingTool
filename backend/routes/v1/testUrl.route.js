const express = require("express");
const router = express.Router();
const TestUrlController = require("../../controllers/testUrlController")

router.post("/update-test-url",TestUrlController.updateTestUrl)
module.exports = router