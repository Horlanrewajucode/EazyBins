//LoginPage.jsx

import { motion } from "framer-motion";
import Background from "../components/background";
import LoginForm from "../components/loginForm";

export default function LoginPage() {
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
      <LoginForm />
    </div>
  );
}
