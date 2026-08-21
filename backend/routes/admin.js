import express from "express";

import {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  // baqi existing controllers...
} from "../controllers/adminController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// =====================================================
// ADMIN LOGIN - PUBLIC
// =====================================================

router.post(
  "/login",
  adminLogin
);

// =====================================================
// ADMIN DASHBOARD
// =====================================================

router.get(
  "/dashboard",
  adminMiddleware,
  getDashboardStats
);

// =====================================================
// GET ALL USERS
// =====================================================

router.get(
  "/users",
  adminMiddleware,
  getAllUsers
);

// =====================================================
// GET ALL ORDERS
// =====================================================

router.get(
  "/orders",
  adminMiddleware,
  getAllOrders
);

export default router;