import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Créer un terrain
export const createTerrain = async (req, res) => {
  const {
    owner_id,
    title,
    description,
    price,
    currency,
    location_address,
    country_id,
    city_id,
    area_sqm,
    category_id,
    legal_status_id,
    terrain_type,
    image_urls,
  } = req.body;

  try {
    const id = uuidv4();

    await pool.query(
      `INSERT INTO terrains 
        (id, owner_id, title, description, price, currency, location_address, country_id,
         city_id, area_sqm, category_id, legal_status_id, terrain_type, image_urls)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        owner_id,
        title,
        description,
        price,
        currency,
        location_address,
        country_id,
        city_id,
        area_sqm,
        category_id,
        legal_status_id,
        terrain_type,
        JSON.stringify(image_urls || []),
      ]
    );

    res.status(201).json({ message: "Terrain créé avec succès", id });
  } catch (error) {
    console.error("Erreur SQL/Backend :", error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// Lister tous les terrains avec filtres
export const listTerrains = async (req, res) => {
  const { status, category_id, country_id, city_id, min_price, max_price } =
    req.query;

  try {
    let sql = "SELECT * FROM terrains WHERE 1=1";
    const params = [];

    if (status) {
      sql += " AND status = ?";
      params.push(status);
    }
    if (category_id) {
      sql += " AND category_id = ?";
      params.push(category_id);
    }
    if (country_id) {
      sql += " AND country_id = ?";
      params.push(country_id);
    }
    if (city_id) {
      sql += " AND city_id = ?";
      params.push(city_id);
    }
    if (min_price) {
      sql += " AND price >= ?";
      params.push(min_price);
    }
    if (max_price) {
      sql += " AND price <= ?";
      params.push(max_price);
    }

    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Détails d’un terrain
export const getTerrain = async (req, res) => {
  const { terrainId } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM terrains WHERE id = ?", [
      terrainId,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Terrain non trouvé." });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
