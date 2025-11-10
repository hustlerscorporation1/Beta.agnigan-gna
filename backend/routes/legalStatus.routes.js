import express from "express";
import { getAllLegalStatuses } from "../controllers/legalStatus.controller.js";

const router = express.Router();

router.get("/", getAllLegalStatuses);

export default router;
