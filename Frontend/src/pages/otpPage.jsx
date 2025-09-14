import { useState } from "react";
import Logo from "../components/logo";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { otp } from "../services/otpAuth";

function OtpPage() {
  const [otpData, setOtpData] = useState(["", "", "", "", "", ""]);
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

  function handleSubmit(code) {
    console.log("Entered OTP:", code);

    if (code.length < 6) return;
    mutation.mutate(code);
  }

  const mutation = useMutation({
    mutationFn: otp,
    onSuccess: () => {
        //   alert("successful");
        // localStorage.setItem("token", data.token || "true");
        // localStorage.removeItem("signupEmail");
      navigate("/login");
    },
    onError: (error) => {
      // alert('error')
      alert(error.response?.data?.message || error.message);
    },
  });
  return (
    <main>
      <Logo />
      <h3>Enter the 6-digit code we send to your email</h3>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(otpData.join(""));
        }}
      >
        <div>
          {otpData.map((digit, index) => (
            <input
              key={index}
              id={`otpData-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-16 h-16 rounded-lg border-2 border-black text-black text-4xl text-center"
            />
          ))}
        </div>
        <button className="cursor-pointer">Verify</button>
      </form>
      <h3>
        Didn't get the code <button className="cursor-pointer">Resend</button>
      </h3>
    </main>
  );
}

export default OtpPage;
