import { api } from "../libs/baseapi";

export async function login(formData) {
  try {
    const response = await api.post("/api/auth/login", formData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "login failed";
    throw new Error(message);
  }
}
