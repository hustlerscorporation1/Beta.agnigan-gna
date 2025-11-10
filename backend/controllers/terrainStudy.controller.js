import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Créer une étude
export const createTerrainStudy = async (req, res) => {
  const {
    terrain_id,
    agent_id,
    study_date,
    study_type,
    summary,
    litigation_status,
    risk_level,
    notes,
  } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO terrain_studies (id, terrain_id, agent_id, study_date, study_type, summary, litigation_status, risk_level, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        terrain_id,
        agent_id,
        study_date,
        study_type,
        summary,
        litigation_status,
        risk_level,
        notes,
      ]
    );
    res.status(201).json({ message: "Étude de terrain enregistrée.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l’étude." });
  }
};

// 📋 Lister toutes les études d’un terrain
export const listTerrainStudies = async (req, res) => {
  const { terrainId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT ts.*, p.first_name, p.last_name
       FROM terrain_studies ts
       LEFT JOIN profiles p ON ts.agent_id = p.id
       WHERE ts.terrain_id = ?`,
      [terrainId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des études." });
  }
};
