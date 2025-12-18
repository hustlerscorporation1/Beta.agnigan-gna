import express from "express";
import {
  addFavorite,
  removeFavorite,
  listFavorites,
} from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/", addFavorite);
router.delete("/", removeFavorite);
router.get("/:userId", listFavorites);

export default router;
