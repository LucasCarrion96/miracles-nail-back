const express = require("express");
const router = express.Router();
const { healthConditionsControllers } = require("../controllers/healthConditionsControllers");

router.post("/", healthConditionsControllers.createHealthConditions);

module.exports = router;