import { useReducer, useEffect } from "react";
import { Lock, CreditCard, CheckCircle2 } from "lucide-react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const banks = [
  "Guarantee Trust Bank",
  "Access Bank",
  "Titan Bank",
  "First Bank",
  "Moniepoint MFB",
  "Zenith Bank",
  "Keystone Bank",
  "UBA",
  "Stanbic IBTC",
  "FCMB",
  "PalmPay",
  "Paycom (Opay)",
];

const InputField = ({ name, error, ...props }) => (
  <div>
    <input name={name} {...props} />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const initialState = {
  form: {
    fullName: "",
    email: "",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bank: "",
  },
  errors: {},
  touched: {},
  countdown: 86400,
  showSuccess: false,
  isFormValid: false,
  showPaymentInfo: false,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };
    case "SET_TOUCHED":
      return { ...state, touched: { ...state.touched, [action.payload]: true } };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_FORM_VALIDITY":
      return { ...state, isFormValid: action.payload };
    case "SET_SHOW_PAYMENT_INFO":
      return { ...state, showPaymentInfo: action.payload };
    case "DECREMENT_COUNTDOWN":
      return { ...state, countdown: state.countdown - 1 };
    case "SHOW_SUCCESS":
      return { ...state, showSuccess: true };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "RESET":
      return {
        ...initialState,
        showSuccess: state.showSuccess, // Keep success screen visible
      };
    case "CLOSE_MODAL":
      return { ...state, showSuccess: false };
    default:
      return state;
  }
}

export default function SubscriptionModal({ plan, price, onClose, onSuccess }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, touched, countdown, showSuccess, isFormValid, showPaymentInfo, isLoading } = state;

  useEffect(() => {
    if (form.paymentMethod === "bank" && countdown > 0) {
      const timer = setInterval(() => dispatch({ type: "DECREMENT_COUNTDOWN" }), 1000);
      return () => clearInterval(timer);
    }
  }, [form.paymentMethod, countdown]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) message = "Full name is required.";
        else if (value.trim().length < 3)
          message = "Full name must be at least 3 characters.";
        break;
      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Enter a valid email address.";
        break;
      case "cardName":
        if (!value.trim()) message = "Card name is required.";
        break;
      case "cardNumber":
        if (!/^\d{16}$/.test(value)) message = "Card number must be 16 digits.";
        break;
      case "expiry":
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          message = "Expiry must be in MM/YY format.";
        } else {
          const [month, year] = value.split("/");
          const expiryDate = new Date(`20${year}`, month, 0); // day 0 gets the last day of the previous month
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          if (expiryDate < now) {
            message = "Card has expired.";
          }
        }
        break;
      case "cvv":
        if (!/^\d{3}$/.test(value)) message = "CVV must be 3 digits."; // We're using 3 digits because we haven't gone international yet
        break;
      case "bank":
        if (form.paymentMethod === "bank" && !value.trim())
          message = "Please select a bank.";
        break;
      default:
        break;
    }
    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", payload: { name, value } });

    if (name === "bank") {
      dispatch({ type: "SET_SHOW_PAYMENT_INFO", payload: !!value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    dispatch({ type: "SET_TOUCHED", payload: name });
  };

  useEffect(() => {
    const activeFields = getActiveFields();
    const newErrors = {};
    let isValid = true;

    for (const key of activeFields) {
      const error = validateField(key, form[key]);
      if (error || !form[key]) isValid = false;
      newErrors[key] = error;
    }
    dispatch({ type: "SET_ERRORS", payload: newErrors });
    dispatch({ type: "SET_FORM_VALIDITY", payload: isValid });
  }, [form]);

  const getActiveFields = () => {
    return form.paymentMethod === "card"
      ? ["fullName", "email", "cardName", "cardNumber", "expiry", "cvv"]
      : ["fullName", "email", "bank"];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trigger touched state for all fields to show errors on submit
    getActiveFields().forEach((name) => dispatch({ type: "SET_TOUCHED", payload: name }));

    if (!isFormValid) {
      toast.error("Please correct form errors before submitting.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          plan,
          price,
          method: form.paymentMethod,
          paymentData:
            form.paymentMethod === "card"
              ? {
                  cardName: form.cardName,
                  cardNumber: form.cardNumber,
                  expiry: form.expiry,
                  cvv: form.cvv,
                }
              : { bank: form.bank },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const successMessage = data.message || `Subscription to ${plan} plan was successful!`;
        // Success animation + fade out
        dispatch({ type: "SHOW_SUCCESS" });
        toast.success(successMessage);

        // Wait 2 seconds to show the success UI, then tell the parent to close the modal.
        setTimeout(() => {
          onSuccess(form.email, plan);
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("A network error occurred. Please try again.");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const getInputClass = (name) => {
    if (!touched[name]) return "border-gray-300";
    if (errors[name]) return "border-red-500 focus:ring-red-300";
    return "border-green-500 focus:ring-green-300";
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative overflow-hidden">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {showSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm animate-fadeIn z-20">
            <CheckCircle2
              size={80}
              className="text-green-600 mb-3 animate-scaleIn"
            />
            <p className="text-3xl text-center font-semibold text-gray-800">
              Success!
            </p>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-2 text-center">
          {plan} — ₦{price.toLocaleString()}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full name & email */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border p-2 rounded-md w-full focus:outline-none focus:ring ${getInputClass(
                "fullName"
              )}`}
              error={touched.fullName && errors.fullName}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border p-2 rounded-md w-full focus:outline-none focus:ring ${getInputClass(
                "email"
              )}`}
              error={touched.email && errors.email}
            />
          </div>

          {/* Payment method */}
          <div>
            <label className="font-medium block mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="card">Card Payment</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Card section */}
            <div
              className={`p-4 border rounded-lg transition-all ${
                form.paymentMethod === "bank"
                  ? "opacity-40 pointer-events-none"
                  : ""
              }`}
            >
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CreditCard size={18} /> Card Payment
              </h3>

              <div className="flex items-center justify-center gap-4 text-4xl text-gray-600 mb-4">
                <FaCcVisa className="hover:text-blue-500 transition-colors" />
                <FaCcMastercard className="hover:text-red-500 transition-colors" />
                <img
                  src="/images/Verve-Logo.png"
                  alt="Verve"
                  className="w-10 h-7 object-contain hover:scale-110 transition-transform"
                />
              </div>

              <div className="space-y-3">
                <InputField
                  type="text"
                  name="cardName"
                  placeholder="Card Name"
                  value={form.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardName && errors.cardName}
                  className={`border p-2 rounded-md w-full focus:outline-none focus:ring ${getInputClass(
                    "cardName"
                  )}`}
                />
                <InputField
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardNumber && errors.cardNumber}
                  className={`border p-2 rounded-md w-full focus:outline-none focus:ring ${getInputClass(
                    "cardNumber"
                  )}`}
                />

                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.expiry && errors.expiry}
                    className={`border p-2 rounded-md w-full focus:outline-none focus:ring ${getInputClass(
                      "expiry"
                    )}`}
                  />
                  <InputField
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={form.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cvv && errors.cvv}
                    className={`border p-2 rounded-md w-full focus:outline-none focus:ring ${getInputClass(
                      "cvv"
                    )}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`py-2 rounded-md w-full transition-colors flex items-center justify-center ${
                    isFormValid && !isLoading
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Pay"
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-2">
                  <Lock size={14} /> Secure by Paystack
                </div>
              </div>
            </div>

            {/* Bank section */}
            <div
              className={`p-4 border rounded-lg transition-all ${
                form.paymentMethod === "card"
                  ? "opacity-40 pointer-events-none"
                  : ""
              }`}
            >
              <h3 className="font-semibold mb-2">Bank Transfer</h3>

              <select
                name="bank"
                value={form.bank}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border p-2 rounded-md w-full mb-3 focus:outline-none focus:ring ${getInputClass(
                  "bank"
                )}`}
              >
                <option value="">Select Bank</option>
                {banks.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.bank && (
                <p className="text-red-500 text-sm mt-1">{errors.bank}</p>
              )}

              {/* Payment info fade in/out */}
              <div
                className={`transition-all duration-500 ${
                  showPaymentInfo
                    ? "opacity-100 translate-y-0 animate-fadeIn"
                    : "opacity-0 translate-y-4 pointer-events-none animate-fadeOut"
                }`}
              >
                {showPaymentInfo && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-center">
                    <h4 className="font-semibold text-blue-700 mb-2">
                      Transfer Information
                    </h4>
                    <p className="text-gray-700">
                      Please make your payment to the account below and send a
                      screenshot of the payment to: 
                      <a
                        href="mailto:payments@easybinz.com"
                        className="text-blue-600 hover:underline"
                      >
                        payments@easybinz.com
                      </a>
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        <strong>Bank:</strong> Moniepoint MFB
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Account Name:</strong> Chukwuemeka Andre Ozomma
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Account Number:</strong> 0132676387
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Amount:</strong> ₦{price.toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Expiry in {formatTime(countdown)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
