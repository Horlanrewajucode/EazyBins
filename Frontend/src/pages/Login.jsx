//LoginPage.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
//import background from "../assets/file.svg";
import Background from "../components/background"; // Adjust the import path as necessary

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with login request
    console.log("Form submitted:", formData);
  };

  const handlePasswordToggle = () => {
   setShowPassword((prev) => !prev);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white md:overflow-hidden overflow-auto shadow-[4px_0_5px_-4px_rgba(0,0,0,0.15)] pb-13">
      {/* Left panel with animation */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex items-center justify-center p-8 md:w-1/2"
      >
        <Background />
      </motion.div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Log In To Your Account To Continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=""
                className={`block w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm outline-stone-300 ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500 text-left">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password with toggle */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 text-left"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=""
                  className={`block w-full rounded-md border px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500 sm:text-sm outline-stone-300 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon size={18} />
                  ) : (
                    <EyeOffIcon size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 text-left">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-left">
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Login
            </button>

            {/* Sign up link */}
            <p className="text-center text-gray-700 text-sm">
              Don’t Have An Account?{" "}
              <a
                href="#"
                className="text-green-600 font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
