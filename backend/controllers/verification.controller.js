import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer une vérification
export const createVerification = async (req, res) => {
  const { terrain_id, agent_id, verification_type, comments, evidence } =
    req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO verifications (id, terrain_id, agent_id, verification_type, comments, evidence)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        terrain_id,
        agent_id,
        verification_type,
        comments,
        JSON.stringify(evidence),
      ]
    );
    res.status(201).json({ message: "Vérification enregistrée.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la vérification." });
  }
};

// 🔄 Mettre à jour le statut
export const updateVerificationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query(`UPDATE verifications SET status = ? WHERE id = ?`, [
      status,
      id,
    ]);
    res.status(200).json({ message: "Statut de vérification mis à jour." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur de mise à jour." });
  }
};

// 📋 Liste des vérifications d’un terrain
export const listVerifications = async (req, res) => {
  const { terrainId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT v.*, p.first_name, p.last_name
       FROM verifications v
       LEFT JOIN profiles p ON v.agent_id = p.id
       WHERE v.terrain_id = ?`,
      [terrainId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des vérifications." });
  }
};
