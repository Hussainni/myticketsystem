import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "hussain@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = new User({
        name: "Hussain",
        email: "hussain@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();
      console.log("Admin user created");
    }

    process.exit();
  } catch (error) {
    console.error("Failed to create admin user:", error.message);
    process.exit(1);
  }
};

seedAdmin();
