import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Ajouter un favori
export const addFavorite = async (req, res) => {
  const { user_id, terrain_id } = req.body;
  try {
    const id = uuidv4();
    await pool.query(
      "INSERT INTO favorites (id, user_id, terrain_id) VALUES (?, ?, ?)",
      [id, user_id, terrain_id]
    );
    res.status(201).json({ message: "Terrain ajouté aux favoris.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Supprimer un favori
export const removeFavorite = async (req, res) => {
  const { user_id, terrain_id } = req.body;
  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND terrain_id = ?",
      [user_id, terrain_id]
    );
    res.status(200).json({ message: "Favori supprimé." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Lister les favoris d’un utilisateur
export const listFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT f.*, t.title, t.price, t.image_urls
       FROM favorites f
       JOIN terrains t ON f.terrain_id = t.id
       WHERE f.user_id = ?`,
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
