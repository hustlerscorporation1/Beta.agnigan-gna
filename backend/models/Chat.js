// models/Chat.js
import { pool } from "../config/db.js";

// ➕ Créer un chat
export const insertChat = async (chat) => {
  const sql = `
    INSERT INTO chats (id, chat_type, topic, metadata)
    VALUES (?, ?, ?, ?)
  `;
  await pool.query(sql, [
    chat.id,
    chat.chat_type,
    chat.topic,
    JSON.stringify(chat.metadata),
  ]);
};

// ➕ Envoyer un message
export const insertMessage = async (message) => {
  const sql = `
    INSERT INTO messages (id, chat_id, sender_id, body, attachments)
    VALUES (?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [
    message.id,
    message.chat_id,
    message.sender_id,
    message.body,
    JSON.stringify(message.attachments),
  ]);
};

// 📋 Lister messages d’un chat
export const getMessagesByChatId = async (chat_id) => {
  const sql = `
    SELECT m.*, p.first_name, p.last_name
    FROM messages m
    LEFT JOIN profiles p ON m.sender_id = p.id
    WHERE chat_id = ?
    ORDER BY created_at ASC
  `;
  const [rows] = await pool.query(sql, [chat_id]);
  return rows;
};
