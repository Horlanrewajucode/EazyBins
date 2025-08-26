import { api } from "../libs/baseapi";

export async function signup(formData) {
  try {
    const response = await api.post("/api/auth/signup", formData);
    // console.log(response)
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Signup failed";
    throw new Error(message);
  }
}
