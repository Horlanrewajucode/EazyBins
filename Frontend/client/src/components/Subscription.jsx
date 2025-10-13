import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubscriptionModal from "./SubscriptionModal"; // Import the modal component

const plans = [
  {
    name: "Basic",
    price: 5000,
    color: "bg-green-200",
    features: [
      {
        title: "Limited Notifications",
        desc: "Get updates for important events only",
      },
      { title: "Standard Support", desc: "Response within 24 hours" },
      {
        title: "Basic Analytics",
        desc: "View your monthly history and progress summary",
      },
    ],
  },
  {
    name: "Pro",
    price: 7000,
    color: "bg-green-300",
    features: [
      {
        title: "Unlimited Notifications",
        desc: "Stay up to date with all events in real time",
      },
      { title: "Priority Support", desc: "Response within 4–6 hours" },
      {
        title: "Detailed Analytics",
        desc: "Track weekly and monthly breakdowns",
      },
    ],
  },
  {
    name: "Premium",
    price: 10000,
    color: "bg-black text-white",
    features: [
      {
        title: "24/7 Dedicated Support",
        desc: "Direct chat with a support agent",
      },
      {
        title: "Advanced Analytics Dashboard",
        desc: "Full insights, charts, and reports",
      },
      {
        title: "Early Access to New Features",
        desc: "Be the first to try premium updates",
      },
    ],
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // Will be set on successful subscription

  // Fetch user's current plan on mount
  useEffect(() => {
    // Only fetch if userEmail is not an empty string
    if (!userEmail) return;

    // Replace with your API call
    fetch(`/api/user/current-plan?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setCurrentPlan(data.plan)); // e.g., "Pro"
  }, [userEmail]);

  // Handles selecting a plan
  const handleSelectPlan = (plan) => {
    if (currentPlan) {
      toast.error(`You are already subscribed to the ${currentPlan} plan.`);
      return;
    }
    setSelectedPlan(plan);
  };

  // Opens modal only if a plan is selected
  const handleOpenModal = () => {
    if (currentPlan) {
      toast.error(`You are already subscribed to the ${currentPlan} plan.`);
      return;
    }
    if (selectedPlan) setShowModal(true);
  };

  // Closes modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handles successful subscription from modal
  const handleSubscriptionSuccess = (email, planName) => {
    setUserEmail(email);
    setCurrentPlan(planName); // Set the plan directly, no need to re-fetch
    setShowModal(false); // Close the modal immediately
  };

  return (
    <section className="py-16 px-6 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Subscription</h2>
      <p className="text-gray-600 mb-10">
        Choose the plan that’s right for you.
      </p>
      <Toaster position="top-center" />

      {/* Plans Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => handleSelectPlan(plan)}
            className={`cursor-pointer rounded-2xl shadow-md transition-transform transform hover:scale-105 
              ${
                selectedPlan?.name === plan.name
                  ? "border-2 border-green-600 shadow-lg"
                  : "border border-gray-200"
              }
            `}
          >
            <div
              className={`${plan.color} rounded-t-2xl py-4 font-semibold text-lg flex items-center justify-center gap-2`}
            >
              <span>{plan.name}</span>
              {currentPlan === plan.name && (
                <span className="text-xs bg-white/30 text-black px-2 py-1 rounded-full">
                  Current Plan
                </span>
              )}
            </div>

            <div className="p-6">
              <p className="text-2xl font-bold mb-6 text-green-700">
                ₦{plan.price.toLocaleString()}/Mo
              </p>
              <ul className="space-y-4 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <span className="font-semibold">{f.title} – </span>
                    <span className="text-gray-600">{f.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Current Plan Message */}
      {/* {currentPlan && (
        <div className="mb-6 text-green-700 font-semibold">
          You are already subscribed to the{" "}
          <span className="underline">{currentPlan}</span> plan.
        </div>
      )} */}

      {/* CTA Button */}
      <button
        onClick={handleOpenModal}
        className={`mt-12 px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 
          ${
            selectedPlan && !currentPlan
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-400 cursor-not-allowed"
          } 
        `}
        disabled={!selectedPlan || !!currentPlan}
      >
        {currentPlan
          ? "You're currently on this plan"
          : selectedPlan
          ? `Get Started with ${selectedPlan.name} Plan`
          : "Get Started"}
      </button>

      {/* Show Modal */}
      {showModal && selectedPlan && (
        <SubscriptionModal
          plan={selectedPlan.name}
          price={selectedPlan.price}
          onClose={handleCloseModal}
          onSuccess={(email) => handleSubscriptionSuccess(email, selectedPlan.name)}
        />
      )}
    </section>
  );
}
