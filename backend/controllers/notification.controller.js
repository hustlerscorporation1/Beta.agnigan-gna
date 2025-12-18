import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer une notification
export const createNotification = async (req, res) => {
  const { user_id, type, title, body, data } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO notifications (id, user_id, type, title, body, data) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user_id, type, title, body, JSON.stringify(data)]
    );
    res.status(201).json({ message: "Notification envoyée.", id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l’envoi de la notification." });
  }
};

// 🔄 Marquer comme lue
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`UPDATE notifications SET is_read = 1 WHERE id = ?`, [id]);
    res.status(200).json({ message: "Notification marquée comme lue." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};

// 📋 Lister notifications
export const listNotifications = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des notifications." });
  }
};
