import express from "express";
import {
  createContract,
  signContract,
} from "../controllers/contract.controller.js";
const router = express.Router();

router.post("/", createContract);
router.put("/:id/sign", signContract);

export default router;
