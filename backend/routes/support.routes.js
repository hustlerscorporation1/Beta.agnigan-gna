import express from "express";
import {
  authenticate,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
  createTicket,
  listTickets,
  updateTicket,
} from "../controllers/support.controller.js";

const router = express.Router();

// Créer un ticket
router.post("/", authenticate, createTicket);

// Lister tous les tickets (admin)
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  listTickets
);

// Mettre à jour un ticket (statut / assignation)
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  updateTicket
);

export default router;
