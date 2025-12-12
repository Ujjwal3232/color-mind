// src/api/paletteService.js
import API from "./axios";

// Get all palettes for logged-in user
export const getUserPalettes = async () => {
  const { data } = await API.get("/palettes");
  return data;
};

// Fetch palettes and normalize MongoDB _id -> id for frontend
export const fetchPalettes = async () => {
  const data = await getUserPalettes();
  return data.map((p) => ({ ...p, id: p._id }));
};

// Get a single palette
export const getPaletteById = async (id) => {
  const { data } = await API.get(`/palettes/${id}`);
  return data;
};

// Create a new palette
export const createPalette = async (paletteData) => {
  const { data } = await API.post("/palettes", paletteData);
  // Backend may return { msg, palette } or the palette directly
  const payload = data.palette || data;
  return { ...payload, id: payload._id };
};

// Update a palette
export const updatePalette = async (id, paletteData) => {
  const { data } = await API.put(`/palettes/${id}`, paletteData);
  return data;
};

// Delete a palette
export const deletePalette = async (id) => {
  const { data } = await API.delete(`/palettes/${id}`);
  return data;
};
