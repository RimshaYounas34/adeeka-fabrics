import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import userRoutes from "./routes/users.js";
import newsletterRoutes from "./routes/newsletter.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// =====================================================
// PATH
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================================
// STATIC UPLOADS
// =====================================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Adeeka Fabrics API is running...",
  });
});

// =====================================================
// ROUTES
// =====================================================

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", adminRoutes);

// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// VERCEL
// =====================================================

export default app;