import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await axios.post(`${API_URL}/otp/send`, { email });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${API_URL}/otp/verify`, { email, otp });
  return response.data;
};