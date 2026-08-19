import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Users from "../models/User.js";

// =====================================================
// ADMIN LOGIN
// =====================================================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin credentials
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
    // ADMIN LOGIN SUCCESS
    // =================================================

    res.status(200).json({
      success: true,
      message: "Admin login successful",

      admin: {
        email,
      },

      // Temporary token
      // Agar tum JWT use kar rahe ho to yahan JWT token bhejna hoga
      token: "admin-token",
    });

  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Admin login failed",
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
    });
  }
};


// =====================================================
// ADMIN DASHBOARD
// =====================================================

export const getDashboardStats = async (req, res) => {
  try {

    // =================================================
    // TOTAL PRODUCTS
    // =================================================

    const totalProducts =
      await Product.countDocuments();


    // =================================================
    // TOTAL ORDERS
    // =================================================

    const totalOrders =
      await Order.countDocuments();


    // =================================================
    // TOTAL CUSTOMERS
    // =================================================

    const totalCustomers =
      await Users.countDocuments();


    // =================================================
    // TOTAL SALES
    // =================================================

    const salesResult =
      await Order.aggregate([
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
              $sum: "$totalPrice",
            },
          },
        },
      ]);


    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;


    // =================================================
    // RECENT ORDERS
    // =================================================

    const recentOrders =
      await Order.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          "user customer items totalPrice status createdAt"
        );


    // =================================================
    // CURRENT YEAR
    // =================================================

    const currentYear =
      new Date().getFullYear();


    // =================================================
    // MONTHLY SALES
    // =================================================

    const monthlySales =
      await Order.aggregate([

        {
          $match: {
            status: {
              $ne: "Cancelled",
            },

            createdAt: {
              $gte: new Date(
                `${currentYear}-01-01`
              ),

              $lt: new Date(
                `${currentYear + 1}-01-01`
              ),
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
              $sum: "$totalPrice",
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

    res.status(200).json({
      success: true,

      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalSales,
      },

      recentOrders,

      monthlySales,
    });

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
      .select("-password");


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

    const orders =
      await Order.find()
        .sort({
          createdAt: -1,
        });


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


    const order =
      await Order.findById(id);


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


    if (
      !allowedStatuses.includes(status)
    ) {

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