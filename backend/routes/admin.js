import express from "express";

import {
  adminLogin,
  getAdminProfile,
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/adminController.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// =====================================================
// ADMIN LOGIN
// =====================================================

router.post(
  "/login",
  adminLogin
);


// =====================================================
// ADMIN PROFILE
// =====================================================

router.get(
  "/profile",
  adminMiddleware,
  getAdminProfile
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


// =====================================================
// GET SINGLE ORDER
// =====================================================

router.get(
  "/orders/:id",
  adminMiddleware,
  getSingleOrder
);


// =====================================================
// UPDATE ORDER STATUS
// =====================================================

router.put(
  "/orders/:id",
  adminMiddleware,
  updateOrderStatus
);


export default router;