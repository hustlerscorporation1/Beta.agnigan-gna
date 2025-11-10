import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

// GET /api/profiles/:userId
router.get("/:userId", getProfile);

// PUT /api/profiles/:userId
router.put("/:userId", updateProfile);

export default router;
