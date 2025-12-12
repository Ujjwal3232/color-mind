import Instruction from "../models/Instruction.js";
import Palette from "../models/Palette.js";

// Create instruction for a palette
export const createInstruction = async (req, res) => {
  try {
    const { title, content } = req.body;
    const paletteId = req.params.paletteId;

    const palette = await Palette.findById(paletteId);
    if (!palette) return res.status(404).json({ msg: "Palette not found" });

    if (palette.instruction)
      return res.status(400).json({ msg: "Instruction already exists for this palette" });

    const instruction = await Instruction.create({
      palette: paletteId,
      title,
      content
    });

    palette.instruction = instruction._id;
    await palette.save();

    res.json({ msg: "Instruction created", instruction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get instruction for a palette
export const getInstruction = async (req, res) => {
  try {
    const instruction = await Instruction.findOne({
      palette: req.params.paletteId,
    });

    if (!instruction)
      return res.status(404).json({ msg: "Instruction not found" });

    res.json(instruction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update instruction
export const updateInstruction = async (req, res) => {
  try {
    const instruction = await Instruction.findOneAndUpdate(
      { palette: req.params.paletteId },
      req.body,
      { new: true }
    );

    if (!instruction)
      return res.status(404).json({ msg: "Instruction not found" });

    res.json({ msg: "Instruction updated", instruction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
