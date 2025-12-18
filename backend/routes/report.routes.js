import express from "express";
import { createReport, listReports } from "../controllers/report.controller.js";
const router = express.Router();

router.post("/", createReport);
router.get("/", listReports);
router.get("/user/:user_id", listReports);

export default router;
