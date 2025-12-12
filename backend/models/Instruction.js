import mongoose from "mongoose";

const instructionSchema = new mongoose.Schema({
  palette: { type: mongoose.Schema.Types.ObjectId, ref: "Palette", required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true } // HTML stored as plain text
}, { timestamps: true });

export default mongoose.model("Instruction", instructionSchema);
