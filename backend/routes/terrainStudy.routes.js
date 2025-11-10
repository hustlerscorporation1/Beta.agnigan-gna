import express from "express";
import {
  createTerrainStudy,
  listTerrainStudies,
} from "../controllers/terrainStudy.controller.js";

const router = express.Router();

router.post("/", createTerrainStudy);
router.get("/:terrainId", listTerrainStudies);

export default router;
