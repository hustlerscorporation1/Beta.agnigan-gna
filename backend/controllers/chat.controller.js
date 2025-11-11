// controllers/chatController.js
import { v4 as uuidv4 } from "uuid";
import {
  insertChat,
  insertMessage,
  getMessagesByChatId,
} from "../models/Chat.js";

// ➕ Créer un chat
export const createChat = async (req, res) => {
  try {
    const id = uuidv4();
    const { chat_type, topic, metadata } = req.body;

    await insertChat({ id, chat_type, topic, metadata });
    res.status(201).json({ message: "Chat créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du chat." });
  }
};

// ➕ Envoyer un message
export const sendMessage = async (req, res) => {
  try {
    const id = uuidv4();
    const { chat_id, sender_id, body, attachments } = req.body;

    await insertMessage({ id, chat_id, sender_id, body, attachments });
    res.status(201).json({ message: "Message envoyé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l’envoi du message." });
  }
};

// 📋 Lister messages d’un chat
export const listMessages = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const messages = await getMessagesByChatId(chat_id);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des messages." });
  }
};
