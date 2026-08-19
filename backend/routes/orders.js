
import express from "express";

import {
  createOrder,
  getUserOrders,
} from "../controllers/orderController.js";

const router = express.Router();

// Create Order
router.post("/", createOrder);

// Get user's orders
router.get("/user/:uid", getUserOrders);

export default router;
