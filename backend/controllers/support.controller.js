import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer un ticket
export const createTicket = async (req, res) => {
  const { user_id, subject, description, priority, assigned_to, metadata } =
    req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO support_tickets (id, user_id, subject, description, priority, assigned_to, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        user_id,
        subject,
        description,
        priority,
        assigned_to,
        JSON.stringify(metadata),
      ]
    );
    res.status(201).json({ message: "Ticket créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du ticket." });
  }
};

// 🔄 Mettre à jour un ticket
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status, assigned_to } = req.body;
  try {
    await pool.query(
      `UPDATE support_tickets SET status = ?, assigned_to = ? WHERE id = ?`,
      [status, assigned_to, id]
    );
    res.status(200).json({ message: "Ticket mis à jour." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du ticket." });
  }
};

// 📋 Lister les tickets d’un utilisateur
export const listTickets = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des tickets." });
  }
};
