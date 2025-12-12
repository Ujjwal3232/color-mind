import express from "express";
import {
  createPalette,
  getUserPalettes,
  getPaletteById,
  updatePalette,
  deletePalette
} from "../controllers/paletteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All palette routes require login
router.post("/", authMiddleware, createPalette);                 // Create palette
router.get("/", authMiddleware, getUserPalettes);                // Get all palettes of user
router.get("/:id", authMiddleware, getPaletteById);              // Get single palette
router.put("/:id", authMiddleware, updatePalette);               // Update palette
router.delete("/:id", authMiddleware, deletePalette);            // Delete palette

export default router;
