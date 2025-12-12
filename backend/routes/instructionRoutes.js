import express from "express";
import {
  createInstruction,
  getInstruction,
  updateInstruction
} from "../controllers/instructionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Example: /api/instructions/:paletteId
router.post("/:paletteId", authMiddleware, createInstruction);       // Create instruction
router.get("/:paletteId", authMiddleware, getInstruction);           // Get instruction
router.put("/:paletteId", authMiddleware, updateInstruction);        // Update instruction

export default router;
