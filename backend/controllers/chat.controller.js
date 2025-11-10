import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer un chat
export const createChat = async (req, res) => {
  const { chat_type, topic, metadata } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO chats (id, chat_type, topic, metadata) VALUES (?, ?, ?, ?)`,
      [id, chat_type, topic, JSON.stringify(metadata)]
    );
    res.status(201).json({ message: "Chat créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du chat." });
  }
};

// ➕ Envoyer un message
export const sendMessage = async (req, res) => {
  const { chat_id, sender_id, body, attachments } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO messages (id, chat_id, sender_id, body, attachments) VALUES (?, ?, ?, ?, ?)`,
      [id, chat_id, sender_id, body, JSON.stringify(attachments)]
    );
    res.status(201).json({ message: "Message envoyé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l’envoi du message." });
  }
};

// 📋 Lister messages d’un chat
export const listMessages = async (req, res) => {
  const { chat_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT m.*, p.first_name, p.last_name
       FROM messages m
       LEFT JOIN profiles p ON m.sender_id = p.id
       WHERE chat_id = ?
       ORDER BY created_at ASC`,
      [chat_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des messages." });
  }
};
