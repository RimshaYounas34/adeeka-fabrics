import Users from "../models/User.js";

// ================= CREATE USER =================

export const createUser = async (req, res) => {
  try {
    console.log("CREATE USER BODY:", req.body);

    const {
      firebaseUid,
      name,
      email,
      password,
      role,
    } = req.body;

    if (!firebaseUid || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide user details",
      });
    }

    const existingUser = await Users.findOne({
      firebaseUid,
    });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: existingUser,
      });
    }

    const user = await Users.create({
      firebaseUid,
      name,
      email,
      password: password || "",
      role: role || "user",
    });

    console.log("USER CREATED:", user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.log("CREATE USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};


// ================= ADMIN GET ALL USERS =================

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({
      role: "user",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {
    console.log("GET ALL USERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};