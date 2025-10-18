// loginForm conponent for Login.jsx

import { useState } from "react";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/loginAuth";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const validateField = (id, value) => {
    let error = "";
    let successMsg = "";

    if (id === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email";
      } else {
        successMsg = "Valid email ✔";
      }
    }

    if (id === "password") {
      if (!value.trim()) {
        error = "Password is required";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(value)) {
        error = "Password must contain at least one number";
      } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
        error = "Password must contain at least one symbol";
      } else {
        successMsg = "Strong password ✔";
      }
    }

    return { error, successMsg };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    const { error, successMsg } = validateField(id, value);

    setErrors({ ...errors, [id]: error });
    setSuccess({ ...success, [id]: successMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let newSuccess = {};

    Object.keys(formData).forEach((field) => {
      const { error, successMsg } = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      } else if (successMsg) {
        newSuccess[field] = successMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess({});
      return;
    }

    // Success
    console.log("Form submitted:", formData);
    // alert("✅ Login successful!");

    const payload = {
      identifier: formData.email,
      password: formData.password,
    };

    console.log("Form submitted:", payload);

    // Resetting all fields including errors and success messages
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
    setSuccess({});
setIsLoading(true)
    mutation.mutate(payload);
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      // alert('successful')
      localStorage.setItem("token", data.token || "true");
      localStorage.setItem("signupEmail", variables.identifier);
      navigate("/homePage");
    },
    onError: (error) => {
      // alert('error')
      // alert(error.response?.data?.message || error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full max-w-md"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div>
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
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1 text-left"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="off"
                  className={`block w-full rounded-md border px-4 py-2 outline-stone-400 text-gray-900 sm:text-sm 
                ${
                  errors.email
                    ? "border-red-500"
                    : success.email
                    ? "border-green-500"
                    : "border-gray-300"
                }
              `}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 text-left">
                    {errors.email}
                  </p>
                )}
                {success.email && (
                  <p className="mt-1 text-xs text-green-600 text-left">
                    {success.email}
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
                    className={`block w-full rounded-md border px-4 py-2 pr-10 outline-stone-400 text-gray-900 sm:text-sm 
                  ${
                    errors.password
                      ? "border-red-500"
                      : success.password
                      ? "border-green-500"
                      : "border-gray-300"
                  }
                `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
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
                {success.password && (
                  <p className="mt-1 text-xs text-green-600 text-left">
                    {success.password}
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
                className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                Login
              </button>

              {/* Sign up link */}
              <p className="text-center text-gray-700 text-sm">
                Don’t Have An Account?{" "}
                {/* <a href="#" 
              
            </a> */}
                <Link
                  to="/signup"
                  className="text-green-600 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
