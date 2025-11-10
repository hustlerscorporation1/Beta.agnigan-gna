import express from "express";
import {
  logAgentAction,
  listAgentActions,
} from "../controllers/agentAction.controller.js";

const router = express.Router();

router.post("/", logAgentAction);
router.get("/:agentId", listAgentActions);

export default router;
