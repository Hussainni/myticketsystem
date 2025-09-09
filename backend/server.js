import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes.js";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/commentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./connection.js";
import path from "path";

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
  origin: 'https://myticketsystems.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(cookieParser());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is live 🚀");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
