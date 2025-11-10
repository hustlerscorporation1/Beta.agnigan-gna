import express from "express";
import {
  authenticate,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
  createTerrain,
  updateTerrain,
  listTerrains,
  getTerrainById,
} from "../controllers/terrain.controller.js";

const router = express.Router();

// Création terrain → admin/super_admin
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  createTerrain
);

// Mise à jour terrain
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  updateTerrain
);

// Liste tous les terrains (avec filtres si besoin)
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  listTerrains
);

// Détails d’un terrain
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "super_admin"),
  getTerrainById
);

export default router;
