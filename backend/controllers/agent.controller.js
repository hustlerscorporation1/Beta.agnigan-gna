import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer un agent
export const createAgent = async (req, res) => {
  const { profile_id, employee_code, branch, commission_rate } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO agents (id, profile_id, employee_code, branch, commission_rate)
       VALUES (?, ?, ?, ?, ?)`,
      [id, profile_id, employee_code, branch, commission_rate]
    );
    res.status(201).json({ message: "Agent créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l’agent." });
  }
};

// 🔄 Mettre à jour un agent
export const updateAgent = async (req, res) => {
  const { id } = req.params;
  const { branch, commission_rate, is_active } = req.body;
  try {
    await pool.query(
      `UPDATE agents SET branch = ?, commission_rate = ?, is_active = ? WHERE id = ?`,
      [branch, commission_rate, is_active, id]
    );
    res.status(200).json({ message: "Agent mis à jour." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l’agent." });
  }
};

// 📋 Lister tous les agents
export const listAgents = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, p.first_name, p.last_name, p.phone_number 
       FROM agents a
       LEFT JOIN profiles p ON a.profile_id = p.id
       ORDER BY a.created_at DESC`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des agents." });
  }
};
