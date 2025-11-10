import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer un contrat
export const createContract = async (req, res) => {
  const { terrain_id, seller_id, buyer_id, contract_url } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO contracts (id, terrain_id, seller_id, buyer_id, contract_url)
       VALUES (?, ?, ?, ?, ?)`,
      [id, terrain_id, seller_id, buyer_id, contract_url]
    );
    res.status(201).json({ message: "Contrat créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du contrat." });
  }
};

// 🔄 Signer un contrat
export const signContract = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE contracts SET signed = 1, signed_at = NOW() WHERE id = ?`,
      [id]
    );
    res.status(200).json({ message: "Contrat signé." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la signature." });
  }
};
