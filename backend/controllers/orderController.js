import Order from "../models/Order.js";

// ================= CREATE ORDER =================

export const createOrder = async (req, res) => {
  try {
    const {
      user,
      customer,
      items,
      totalPrice,
    } = req.body;

    if (!user || !user.uid || !user.email) {
      return res.status(400).json({
        message: "User is required",
      });
    }

    if (!customer) {
      return res.status(400).json({
        message: "Customer information is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No products in order",
      });
    }

    if (totalPrice === undefined || totalPrice === null) {
      return res.status(400).json({
        message: "Total price is required",
      });
    }

    const order = await Order.create({
      user,
      customer,
      items,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET USER ORDERS =================

export const getUserOrders = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const orders = await Order.find({
      "user.uid": uid,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      orders,
    });

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= ADMIN GET ALL ORDERS =================

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });

  } catch (error) {
    console.log("GET ALL ORDERS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= ADMIN UPDATE ORDER STATUS =================

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};