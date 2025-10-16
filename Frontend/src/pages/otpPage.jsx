import { useState } from "react";
import Logo from "../components/logo";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { otp, resendOtp } from "../services/otpAuth"; // Assuming resendOtp is exported from here
import Loader from "../components/loader";
import toast from "react-hot-toast";


function OtpPage() {
  const [otpData, setOtpData] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  function handleChange(value, index) {
    const newOtp = [...otpData];

    if (/^[0-9]?$/.test(value)) {
      newOtp[index] = value;
      setOtpData(newOtp);

      if (value && index < otpData.length - 1) {
        document.getElementById(`otpData-${index + 1}`).focus();
      }
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleSubmit(newOtp.join(""));
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otpData[index] && index > 0) {
      document.getElementById(`otpData-${index - 1}`).focus();
    }
  }

  function handleSubmit(code) {
    console.log("Entered OTP:", code);

    if (code.length < 6) return;
    setIsLoading(true)
    mutation.mutate(code);
  }

  const email = localStorage.getItem("signupEmail");

  const resendMutation = useMutation({
    mutationFn: () => resendOtp(email),
    onSuccess: () => {
      toast.success("A new OTP has been sent to your email.");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to resend OTP. Please try again later.";
      toast.error(errorMessage);
    },
  });
  const mutation = useMutation({
    mutationFn: otp,
    onSuccess: (data) => {
      toast.success("Email verified successfully! Please log in.");
      localStorage.removeItem("signupEmail");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occured.";
      toast.error(`OTP verification failed: ${errorMessage}`);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  return (
    <main className="flex flex-col h-screen items-center justify-center pb-13 gap-16">
      <Logo />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-sm">
            Enter the 6-digit code we sent to{" "}
            <span className="font-bold underline text-sm md:text-2xl text-green-500">
              {email}
            </span>
          </h3>
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(otpData.join(""));
            }}
          >
            <div className="flex gap-2 md:gap-4">
              {otpData.map((digit, index) => (
                <input
                  key={index}
                  id={`otpData-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 p-2 md:w-16 md:h-16 rounded-lg border-2 border-black text-black text-4xl text-center outline-0"
                />
              ))}
            </div>
            <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer">
              Verify
            </button>
          </form>
          <h3 className="text-xl">
            Didn't get the code{" "}
            <button
              onClick={() => resendMutation.mutate()}
              className="cursor-pointer text-2xl text-green-500 underline font-bold"
            >
              Resend
            </button>
          </h3>
        </div>
      )}
    </main>
  );
}

export default OtpPage;
