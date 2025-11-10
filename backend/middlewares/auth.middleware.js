import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/auth.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token manquant." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // id, role, email
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

// Middleware de rôle
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé." });
    }
    next();
  };
};
