import express from "express";
import {
  createPayment,
  listPayments,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/:userId", listPayments);

export default router;
