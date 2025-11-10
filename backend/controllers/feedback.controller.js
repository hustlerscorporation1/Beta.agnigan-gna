import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Ajouter un feedback
export const addFeedback = async (req, res) => {
  const { user_id, target_type, target_id, rating, comment } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO feedbacks (id, user_id, target_type, target_id, rating, comment)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, user_id, target_type, target_id, rating, comment]
    );
    res.status(201).json({ message: "Feedback ajouté.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l’ajout du feedback." });
  }
};

// 📋 Lister feedbacks pour un target (terrain, agent, transaction)
export const listFeedbacks = async (req, res) => {
  const { target_type, target_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT f.*, u.first_name, u.last_name
       FROM feedbacks f
       LEFT JOIN profiles u ON f.user_id = u.id
       WHERE f.target_type = ? AND f.target_id = ?
       ORDER BY created_at DESC`,
      [target_type, target_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des feedbacks." });
  }
};
