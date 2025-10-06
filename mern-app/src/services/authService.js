import axios from "axios";

// ✅ Use environment variable instead of localhost
const API_URL = `${process.env.REACT_APP_API_URL}/api/auth/`;

// Register user
export const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return user && token ? { user: JSON.parse(user), token } : null;
};
