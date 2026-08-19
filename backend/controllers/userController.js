import Users from "../models/User.js";

// ================= CREATE USER =================

export const createUser = async (req, res) => {
  try {
    const {
      firebaseUid,
      name,
      email,
      password,
    } = req.body;

    if (!firebaseUid || !name || !email) {
      return res.status(400).json({
        message: "Please provide user details",
      });
    }

    const existingUser = await Users.findOne({
      firebaseUid,
    });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser,
      });
    }

    const user = await Users.create({
      firebaseUid,
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.log("Create User Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= ADMIN GET ALL USERS =================

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({})
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      users,
    });

  } catch (error) {
    console.log("GET ALL USERS ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};