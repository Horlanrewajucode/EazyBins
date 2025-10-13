// Using Express to create a mock backend API.

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let userPlans = {}; // email -> plan

// Mock endpoint
app.post("/api/subscribe", (req, res) => {
  const { fullName, email, plan, method, price, paymentData } = req.body;
  console.log("Subscription received:", req.body);

  // Save the plan for this email
  userPlans[email] = plan;

  setTimeout(() => {
    res.json({
      success: true,
      message: `Subscription for ${plan} plan saved successfully!`,
    });
  }, 1200);
});

// Mock current plan endpoint
app.get("/api/user/current-plan", (req, res) => {
  const email = req.query.email;
  res.json({ plan: userPlans[email] || null });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Mock API running on http://localhost:${PORT}`));
