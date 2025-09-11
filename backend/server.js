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

// ✅ CORS middleware
app.use(
  cors({
    origin: ["https://myticketsystems.vercel.app", "http://localhost:5173"], // ✅ allow frontend origins
    credentials: true, // ✅ allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // ✅ include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ custom headers
  })
);


// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is live 🚀");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
