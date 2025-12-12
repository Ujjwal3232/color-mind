import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const paletteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner
  paletteName: { type: String, required: true },
  emoji: { type: String },
  colors: [colorSchema], // array of colors
  instruction: { type: mongoose.Schema.Types.ObjectId, ref: "Instruction", default: null } // optional instruction
}, { timestamps: true });

export default mongoose.model("Palette", paletteSchema);
