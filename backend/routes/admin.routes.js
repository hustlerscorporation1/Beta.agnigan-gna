import express from "express";
import {
  authenticate,
  authorizeRoles,
} from "../middlewares/auth.middleware.js"; // ← bien pointer vers ton middleware
const router = express.Router();

// Route accessible seulement aux admins et super-admins
router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  (req, res) => {
    res.json({ message: "Bienvenue sur le dashboard admin!" });
  }
);

export default router;
