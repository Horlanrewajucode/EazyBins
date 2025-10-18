import express from "express";
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
// Middleware and routes
const allowedOrigin = [process.env.FRONTEND_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes); // authRoutes
app.use('/api/user', userRoutes); //userRoutes
export default app;
