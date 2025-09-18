import express from "express";
import healthConditionsControllers from "../controllers/healthConditionsControllers.js";

const router = express.Router();

router.post("/", healthConditionsControllers.createHealthConditions);

export default router;