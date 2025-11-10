import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

const router = express.Router();

// Liste des chats d’un utilisateur
router.get("/", authenticate, getChats);

// Liste des messages d’un chat
router.get("/:chatId/messages", authenticate, getMessages);

// Envoyer un message
router.post("/:chatId/messages", authenticate, sendMessage);

export default router;
