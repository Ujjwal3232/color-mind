// src/api/instructionService.js
import API from "./axios";

// Create instruction for a palette
export const createInstruction = async (paletteId, instructionData) => {
  const { data } = await API.post(`/instructions/${paletteId}`, instructionData);
  return data;
};

// Get instruction for a palette
export const getInstruction = async (paletteId) => {
  const { data } = await API.get(`/instructions/${paletteId}`);
  return data;
};

// Update instruction
export const updateInstruction = async (paletteId, instructionData) => {
  const { data } = await API.put(`/instructions/${paletteId}`, instructionData);
  return data;
};
