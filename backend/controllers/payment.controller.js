import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Enregistrer un paiement
export const createPayment = async (req, res) => {
  const { transaction_id, user_id, amount, payment_method_id, status } =
    req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO payments (id, transaction_id, user_id, amount, payment_method_id, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        transaction_id,
        user_id,
        amount,
        payment_method_id,
        status || "completed",
      ]
    );
    res.status(201).json({ message: "Paiement enregistré.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Historique des paiements d’un utilisateur
export const listPayments = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT p.*, t.terrain_id, t.amount AS transaction_amount
       FROM payments p
       JOIN transactions t ON p.transaction_id = t.id
       WHERE p.user_id = ?`,
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
