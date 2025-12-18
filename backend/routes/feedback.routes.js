import express from "express";
import {
  addFeedback,
  listFeedbacks,
} from "../controllers/feedback.controller.js";
const router = express.Router();

router.post("/", addFeedback);
router.get("/:target_type/:target_id", listFeedbacks);

export default router;
