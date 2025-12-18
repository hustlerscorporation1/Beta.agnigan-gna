// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { jwtSecret, jwtExpiry } from "../config/auth.js";
import {
  findUserByEmail,
  insertUser,
  updateLastLogin,
} from "../models/User.js";

// ➕ Inscription
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé." });

    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);

    await insertUser({ id, email, password_hash: hash, role: role || "buyer" });

    res.status(201).json({ message: "Utilisateur créé.", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l’inscription." });
  }
};

// 🔑 Connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user)
      return res.status(401).json({ message: "Utilisateur non trouvé." });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      jwtSecret,
      { expiresIn: jwtExpiry }
    );

    await updateLastLogin(user.id);

    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
