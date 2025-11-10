import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { jwtSecret, jwtExpiry } from "../config/auth.js";

// ➕ Inscription (si besoin pour users)
export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const [existing] = await pool.query(
      `SELECT id FROM auth_users WHERE email = ?`,
      [email]
    );
    if (existing.length)
      return res.status(400).json({ message: "Email déjà utilisé." });

    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO auth_users (id, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [id, email, hash, role || "buyer"]
    );
    res.status(201).json({ message: "Utilisateur créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l’inscription." });
  }
};

// 🔑 Connexion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      `SELECT * FROM auth_users WHERE email = ?`,
      [email]
    );
    if (!rows.length)
      return res.status(401).json({ message: "Utilisateur non trouvé." });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      jwtSecret,
      { expiresIn: jwtExpiry }
    );
    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
