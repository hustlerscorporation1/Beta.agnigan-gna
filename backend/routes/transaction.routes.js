import express from "express";
import {
  authenticate,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
  listTransactions,
  getTransactionById,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  listTransactions
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  getTransactionById
);

export default router;
