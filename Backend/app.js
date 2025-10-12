import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paystackRoutes from "./routes/paystackRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";
import collectorRoutes from "./routes/collectorRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
// import "./cron/subscriptionCron.js"; // Uncomment to enable cron job
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.set('trust proxy', true)

// Middleware and routes
const allowedOrigin = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes); // authRoutes
app.use("/api/user", userRoutes); // userRoutes
app.use("/api/paystack", paystackRoutes); // paystackRoutes
app.use("/api/pickups", pickupRoutes); // pickupRoutes
app.use("/api/collectors", collectorRoutes); // collectorRoutes
app.use("/api/webhooks", webhookRoutes); // webhookRoutes
export default app;
