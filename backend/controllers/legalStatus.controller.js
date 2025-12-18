import { pool } from "../config/db.js";

// Lister tous les statuts
export const getAllLegalStatuses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM legal_status_types");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors du chargement des statuts." });
  }
};
