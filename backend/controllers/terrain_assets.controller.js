import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Ajouter une image
export const addTerrainImage = async (req, res) => {
  const { terrain_id, url, alt_text, uploaded_by } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      "INSERT INTO terrain_images (id, terrain_id, url, alt_text, uploaded_by) VALUES (?, ?, ?, ?, ?)",
      [id, terrain_id, url, alt_text, uploaded_by]
    );
    res.status(201).json({ message: "Image ajoutée", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Ajouter un document
export const addTerrainDocument = async (req, res) => {
  const { terrain_id, document_type, url, uploaded_by, issued_date } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      "INSERT INTO terrain_documents (id, terrain_id, document_type, url, uploaded_by, issued_date) VALUES (?, ?, ?, ?, ?, ?)",
      [id, terrain_id, document_type, url, uploaded_by, issued_date]
    );
    res.status(201).json({ message: "Document ajouté", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
