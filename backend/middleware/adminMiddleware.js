
import jwt from "jsonwebtoken";

// =====================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// =====================================================

const adminMiddleware = (req, res, next) => {
  try {
    // =================================================
    // CHECK AUTHORIZATION HEADER
    // =================================================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization token provided.",
      });
    }

    // =================================================
    // CHECK BEARER TOKEN
    // =================================================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing.",
      });
    }

    // =================================================
    // CHECK JWT SECRET
    // =================================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from .env"
      );

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    // =================================================
    // VERIFY TOKEN
    // =================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(
      "Admin authenticated:",
      decoded.email
    );

    // =================================================
    // CHECK ADMIN ROLE
    // =================================================

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // =================================================
    // SAVE ADMIN DATA
    // =================================================

    req.admin = {
      email: decoded.email,
      role: decoded.role,
    };

    // =================================================
    // CONTINUE
    // =================================================

    next();

  } catch (error) {
    console.error(
      "Admin Middleware Error:",
      error.message
    );

    // Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Admin token has expired. Please login again.",
      });
    }

    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin token. Please login again.",
      });
    }

    // Other errors
    return res.status(401).json({
      success: false,
      message: "Admin authentication failed.",
    });
  }
};

export default adminMiddleware;
