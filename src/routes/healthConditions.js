const express = require("express");
const router = express.Router();
const { createHealthConditions } = require("../controllers/healthConditionsControllers");

router.post("/", createHealthConditions);

module.exports = router;