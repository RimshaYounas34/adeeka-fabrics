
import jwt from "jsonwebtoken";

import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Users from "../models/User.js";

// =====================================================
// ADMIN LOGIN
// =====================================================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // =================================================
    // CHECK ADMIN CREDENTIALS
    // =================================================

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // =================================================
    // CREATE JWT TOKEN
    // =================================================

    const token = jwt.sign(
      {
        email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // =================================================
    // LOGIN SUCCESS
    // =================================================

    res.status(200).json({
      success: true,
      message: "Admin login successful",

      admin: {
        email,
        role: "admin",
      },

      token,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN PROFILE
// =====================================================

export const getAdminProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      admin: req.admin || null,
    });
  } catch (error) {
    console.error("Admin Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get admin profile",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN DASHBOARD
// =====================================================

export const getDashboardStats = async (req, res) => {
  try {
    console.log("========== ADMIN DASHBOARD ==========");

    // =================================================
    // TOTAL PRODUCTS
    // =================================================

    const totalProducts = await Product.countDocuments();

    console.log("Total Products:", totalProducts);

    // =================================================
    // TOTAL ORDERS
    // =================================================

    const totalOrders = await Order.countDocuments();

    console.log("Total Orders:", totalOrders);

    // =================================================
    // TOTAL CUSTOMERS
    // =================================================

    const totalCustomers = await Users.countDocuments();

    console.log("Total Customers:", totalCustomers);

    // =================================================
    // TOTAL SALES
    // =================================================

    const salesResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },

      {
        $group: {
          _id: null,

          totalSales: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },
        },
      },
    ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    console.log("Total Sales:", totalSales);

    // =================================================
    // RECENT ORDERS
    // =================================================

    const recentOrders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select(
        "user customer items totalPrice status createdAt"
      )
      .lean();

    console.log(
      "Recent Orders:",
      recentOrders.length
    );

    // =================================================
    // CURRENT YEAR
    // =================================================

    const currentYear = new Date().getFullYear();

    const startOfYear = new Date(
      currentYear,
      0,
      1
    );

    const startOfNextYear = new Date(
      currentYear + 1,
      0,
      1
    );

    // =================================================
    // MONTHLY SALES
    // =================================================

    const monthlySales = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },

          createdAt: {
            $gte: startOfYear,
            $lt: startOfNextYear,
          },
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },

            year: {
              $year: "$createdAt",
            },
          },

          sales: {
            $sum: {
              $ifNull: ["$totalPrice", 0],
            },
          },

          orders: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // =================================================
    // RESPONSE
    // =================================================

    const dashboardData = {
      success: true,

      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalSales,
      },

      recentOrders,

      monthlySales,
    };

    console.log(
      "Dashboard Data:",
      dashboardData
    );

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error(
      "Dashboard Stats Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL USERS
// =====================================================

export const getAllUsers = async (req, res) => {
  try {
    console.log("========== GET ALL USERS ==========");

    const users = await Users.find()
      .sort({
        createdAt: -1,
      })
      .select("-password")
      .lean();

    console.log(
      "Users found:",
      users.length
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(
      "GET ALL USERS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ORDERS
// =====================================================

export const getAllOrders = async (req, res) => {
  try {
    console.log("========== GET ALL ORDERS ==========");

    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    console.log(
      "Orders found:",
      orders.length
    );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "GET ALL ORDERS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ORDER
// =====================================================

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "GET SINGLE ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get order",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ORDER STATUS
// =====================================================

export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    // =================================================
    // ALLOWED STATUS
    // =================================================

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    // =================================================
    // UPDATE ORDER
    // =================================================

    const order =
      await Order.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // =================================================
    // RESPONSE
    // =================================================

    res.status(200).json({
      success: true,

      message:
        "Order status updated successfully",

      order,
    });
  } catch (error) {
    console.error(
      "UPDATE ORDER STATUS ERROR:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Failed to update order status",

      error: error.message,
    });
  }
};
