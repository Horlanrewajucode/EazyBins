import express from "express";
import authRoutes from './routes/authRoutes.js'
const app = express();

// Middleware and routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes); // authRoute

export default app;
