import { api } from "../libs/baseapi";

export async function signup(formData) {
  try {
    const response = await api.post("/api/auth/signup", formData);
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.error("❌ Signup error:", error.response?.data || error.message);
    throw new Error(error);
    
  }
}
