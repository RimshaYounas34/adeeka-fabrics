import express from "express";

import {
  createUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Create / Register User
router.post("/", createUser);

// Admin - Get All Users
router.get("/", getAllUsers);

export default router;