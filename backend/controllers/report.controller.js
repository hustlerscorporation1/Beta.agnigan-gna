import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// ➕ Générer un rapport
export const createReport = async (req, res) => {
  const { generated_by, report_type, period_start, period_end, data } =
    req.body;
  try {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO reports (id, generated_by, report_type, period_start, period_end, data)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        generated_by,
        report_type,
        period_start,
        period_end,
        JSON.stringify(data),
      ]
    );
    res.status(201).json({ message: "Rapport généré.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du rapport." });
  }
};

// 📋 Lister rapports
export const listReports = async (req, res) => {
  const { user_id } = req.params; // optionnel : super-admin peut voir tous
  try {
    let query = `SELECT r.*, u.email FROM reports r LEFT JOIN auth_users u ON r.generated_by = u.id ORDER BY created_at DESC`;
    let params = [];
    if (user_id) {
      query = `SELECT r.*, u.email FROM reports r LEFT JOIN auth_users u ON r.generated_by = u.id WHERE r.generated_by = ? ORDER BY created_at DESC`;
      params = [user_id];
    }
    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement des rapports." });
  }
};
