import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "https://eazybinsbackend.onrender.com";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🌍 API Base URL:", import.meta.env.VITE_API_URL);
