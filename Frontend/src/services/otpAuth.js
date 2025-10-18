import { api } from "../libs/baseapi";

export async function otp(code) {
  try {
    const email = localStorage.getItem("signupEmail");

    if (!email) {
      throw new Error("No email found in localStorage");
    }

    console.log(code);
    const response = await api.post("/api/auth/verify-otp", {
      email,
      otp: code,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "incorrect otp";
    throw new Error(message);
  }
}
