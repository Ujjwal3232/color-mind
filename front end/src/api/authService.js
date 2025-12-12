// src/api/authService.js
import API from "./axios";

// Register user
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// Login user
export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
