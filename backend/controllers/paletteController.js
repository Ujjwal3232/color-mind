import Palette from "../models/Palette.js";
import Instruction from "../models/Instruction.js";

// Create a palette
export const createPalette = async (req, res) => {
  try {
    const { paletteName, emoji, colors } = req.body;

    const palette = await Palette.create({
      user: req.user,
      paletteName,
      emoji,
      colors
    });

    res.json({ msg: "Palette created successfully", palette });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all palettes of logged-in user
export const getUserPalettes = async (req, res) => {
  try {
    const palettes = await Palette.find({ user: req.user })
      .populate("instruction");

    res.json(palettes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single palette with instruction
export const getPaletteById = async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id)
      .populate("instruction");

    if (!palette) return res.status(404).json({ msg: "Palette not found" });

    res.json(palette);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update palette
export const updatePalette = async (req, res) => {
  try {
    const palette = await Palette.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!palette) return res.status(404).json({ msg: "Palette not found" });

    res.json({ msg: "Palette updated", palette });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete palette + delete associated instruction if exists
export const deletePalette = async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (!palette) return res.status(404).json({ msg: "Palette not found" });

    // Delete attached instruction
    if (palette.instruction) {
      await Instruction.findByIdAndDelete(palette.instruction);
    }

    await Palette.findByIdAndDelete(req.params.id);

    res.json({ msg: "Palette deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
