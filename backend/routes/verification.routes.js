import express from "express";
import {
  createVerification,
  updateVerificationStatus,
  listVerifications,
} from "../controllers/verification.controller.js";

const router = express.Router();

router.post("/", createVerification);
router.put("/:id/status", updateVerificationStatus);
router.get("/:terrainId", listVerifications);

export default router;
