import { pool } from "../config/db.js";

// Récupérer le profil d'un utilisateur
export const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM profiles WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Profil non trouvé." });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Mettre à jour le profil
export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    first_name,
    last_name,
    phone_number,
    country,
    bio,
    profile_picture_url,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE profiles
       SET first_name = ?, last_name = ?, phone_number = ?, country = ?, bio = ?, profile_picture_url = ?
       WHERE id = ?`,
      [
        first_name,
        last_name,
        phone_number,
        country,
        bio,
        profile_picture_url,
        userId,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Profil non trouvé." });

    res.status(200).json({ message: "Profil mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
