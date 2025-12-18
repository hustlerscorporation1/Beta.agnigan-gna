import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Créer une transaction
export const createTransaction = async (req, res) => {
  const { buyer_id, seller_id, terrain_id, amount, currency, status } =
    req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO transactions (id, buyer_id, seller_id, terrain_id, amount, currency, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        buyer_id,
        seller_id,
        terrain_id,
        amount,
        currency,
        status || "pending",
      ]
    );
    res.status(201).json({ message: "Transaction créée.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Lister les transactions d’un utilisateur
export const listTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT t.*, tr.title AS terrain_title, tr.price
       FROM transactions t
       JOIN terrains tr ON t.terrain_id = tr.id
       WHERE t.buyer_id = ? OR t.seller_id = ?`,
      [userId, userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Mettre à jour le statut
export const updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query("UPDATE transactions SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    res.status(200).json({ message: "Statut mis à jour." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
