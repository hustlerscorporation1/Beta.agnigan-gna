import express from "express";
import {
  createAgent,
  listAgents,
  updateAgent,
  deleteAgent,
} from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/", createAgent);
router.get("/", listAgents);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);

export default router;
