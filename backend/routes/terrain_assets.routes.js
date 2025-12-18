import express from "express";
import {
  addTerrainImage,
  addTerrainDocument,
} from "../controllers/terrain_assets.controller.js";

const router = express.Router();

router.post("/images", addTerrainImage);
router.post("/documents", addTerrainDocument);

export default router;
