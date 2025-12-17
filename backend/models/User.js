// models/User.js
import { pool } from "../config/db.js";

// Chercher un utilisateur par email
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM auth_users WHERE email = ?", [
    email,
  ]);
  return rows[0] || null;
};

// Créer un nouvel utilisateur
export const insertUser = async (user) => {
  const { id, email, password_hash, role } = user;
  await pool.query(
    `INSERT INTO auth_users (id, email, password_hash, role) VALUES (?, ?, ?, ?)`,
    [id, email, password_hash, role]
  );
};

// Mettre à jour last_login
export const updateLastLogin = async (userId) => {
  await pool.query(`UPDATE auth_users SET last_login = NOW() WHERE id = ?`, [
    userId,
  ]);
};
