import express from "express";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';
const app = express();
dotenv.config();
// Middleware and routes
const allowedOrigin = process.env.FRONTEND_URL

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes); // authRoute

export default app;
