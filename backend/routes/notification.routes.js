import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getNotifications,
  markAsRead,
  listNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", createNotification);
// Lister toutes les notifications d’un utilisateur
router.get("/", authenticate, getNotifications);

// Marquer comme lue
router.put("/:id/read", authenticate, markAsRead, listNotifications);

export default router;
