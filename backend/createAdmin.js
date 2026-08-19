import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const name = "Adeeka Admin";
    const email = "admin@adeeka.com";
    const password = "admin123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("================================");
    console.log("✅ Admin created successfully!");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Password:", password);
    console.log("================================");

    process.exit(0);

  } catch (error) {
    console.error("❌ Admin creation error:", error);
    process.exit(1);
  }
};

createAdmin();