// signUpForm component for SignUpPage.jsx

import { useState } from "react";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/signupAuth";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // terms: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const navigate = useNavigate();

  const validateField = (id, value) => {
    let error = "";
    let successMsg = "";

    if (id === "firstName" || id === "lastName") {
      if (!value.trim()) {
        error = `${id === "firstName" ? "First" : "Last"} name is required`;
      } else if (!/^[A-Za-z]+$/.test(value)) {
        error = "Only letters are allowed";
      } else {
        successMsg = "Looks good ✔";
      }
    }

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

    // if (id === "terms") {
    //   if (!value) {
    //     error = "You must agree to the terms";
    //   } else {
    //     successMsg = "✔";
    //   }
    // }

    return { error, successMsg };
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [id]: fieldValue });

    const { error, successMsg } = validateField(id, fieldValue);

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
    // console.log("Signup form submitted:", formData);
    // alert("✅ Signup successful!");

    mutation.mutate(formData);

    // Resetting the form fields including errors and success messages
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // terms: false,
    });

    setErrors({});
    setSuccess({});

  };

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (_, variables) => {
      // alert('successful')
      localStorage.setItem("signupEmail", variables.email);
      // after successful login/signup
      // localStorage.setItem("authToken", response.data.token);

      navigate("/otp-page");
    },
    onError: (error) => {
      // alert('error')
      alert(error.response?.data?.message || error.message);
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
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Sign up to get started with your new account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className={`block w-full rounded-md border px-4 py-2 text-gray-900 sm:text-sm 
      ${
        errors.firstName
          ? "border-red-500"
          : success.firstName
          ? "border-green-500"
          : "border-gray-300"
      }
    `}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500 text-left">
                {errors.firstName}
              </p>
            )}
            {success.firstName && (
              <p className="mt-1 text-xs text-green-600 text-left">
                {success.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className={`block w-full rounded-md border px-4 py-2 text-gray-900 sm:text-sm 
      ${
        errors.lastName
          ? "border-red-500"
          : success.lastName
          ? "border-green-500"
          : "border-gray-300"
      }
    `}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500 text-left">
                {errors.lastName}
              </p>
            )}
            {success.lastName && (
              <p className="mt-1 text-xs text-green-600 text-left">
                {success.lastName}
              </p>
            )}
          </div>

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
              placeholder="example@email.com"
              onChange={handleChange}
              className={`block w-full rounded-md border px-4 py-2 text-gray-900 sm:text-sm 
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

          {/* Password */}
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
                className={`block w-full rounded-md border px-4 py-2 pr-10 text-gray-900 sm:text-sm 
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

          {/* Terms and Conditions */}
          {/* <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree with the{" "}
              <a href="#" className="text-green-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div> */}

          {/* {errors.terms && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.terms}
            </p>
          )} */}

          {/* Signup button */}
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-center text-gray-700 text-sm">
            Already have an account?{" "}
            {/* <a href="#" className="text-green-600 font-medium hover:underline">
              Log In
            </a> */}
            <Link
              to="/login"
              className="text-green-600 font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
