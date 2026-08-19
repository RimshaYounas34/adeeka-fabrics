import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// =====================================================
// UPLOAD FOLDER
// =====================================================

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// =====================================================
// FILE FILTER
// =====================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

// =====================================================
// MULTER
// =====================================================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =====================================================
// ADD PRODUCT
// =====================================================

router.post(
  "/",
  upload.array("images", 10),
  async (req, res) => {
    try {
      console.log("========== ADD PRODUCT ==========");

      console.log("Body:", req.body);
      console.log("Files:", req.files);

      // ---------------------------------------------
      // CHECK BASIC DATA
      // ---------------------------------------------

      if (!req.body.name) {
        return res.status(400).json({
          success: false,
          message: "Product name is required.",
        });
      }

      if (!req.body.price) {
        return res.status(400).json({
          success: false,
          message: "Product price is required.",
        });
      }

      if (!req.body.category) {
        return res.status(400).json({
          success: false,
          message: "Product category is required.",
        });
      }

      // ---------------------------------------------
      // CREATE IMAGE URLS
      // ---------------------------------------------

      const images = (req.files || []).map((file) => {
        return `/uploads/${file.filename}`;
      });

      // ---------------------------------------------
      // PARSE ARRAYS
      // ---------------------------------------------

      let sizes = [];
      let colors = [];

      try {
        sizes = req.body.sizes
          ? JSON.parse(req.body.sizes)
          : [];
      } catch (error) {
        sizes = [];
      }

      try {
        colors = req.body.colors
          ? JSON.parse(req.body.colors)
          : [];
      } catch (error) {
        colors = [];
      }

      // ---------------------------------------------
      // BOOLEAN VALUES
      // ---------------------------------------------

      const isNewArrival =
        req.body.isNewArrival === "true";

      const isBestSeller =
        req.body.isBestSeller === "true";

      const isSale =
        req.body.isSale === "true";

      // ---------------------------------------------
      // PRODUCT DATA
      // ---------------------------------------------

      const product = new Product({
        name: req.body.name,

        slug: req.body.slug,

        price: Number(req.body.price),

        category: req.body.category,

        collectionName:
          req.body.collectionName || "",

        description:
          req.body.description || "",

        stock:
          Number(req.body.stock) || 0,

        images,

        sizes,

        colors,

        isNewArrival,

        isBestSeller,

        isSale,
      });

      // ---------------------------------------------
      // SAVE
      // ---------------------------------------------

      const savedProduct = await product.save();

      console.log(
        "Product saved:",
        savedProduct
      );

      res.status(201).json({
        success: true,
        message: "Product added successfully.",
        product: savedProduct,
      });

    } catch (error) {
      console.error(
        "Add Product Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });

  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =====================================================
// GET PRODUCTS BY CATEGORY
// =====================================================

router.get(
  "/category/:category",
  async (req, res) => {
    try {
      const category =
        req.params.category.toLowerCase();

      const products = await Product.find({
        category,
      }).sort({
        createdAt: -1,
      });

      res.json({
        success: true,
        products,
      });

    } catch (error) {
      console.error(
        "Get Category Products Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.json({
      success: true,
      product,
    });

  } catch (error) {
    console.error(
      "Get Single Product Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    console.log(
      "========== DELETE PRODUCT =========="
    );

    console.log(
      "Product ID:",
      req.params.id
    );

    // ---------------------------------------------
    // FIND PRODUCT
    // ---------------------------------------------

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // ---------------------------------------------
    // DELETE IMAGE FILES
    // ---------------------------------------------

    if (
      product.images &&
      product.images.length > 0
    ) {
      product.images.forEach((image) => {
        try {
          // /uploads/image.jpg
          const imagePath = path.join(
            process.cwd(),
            image.replace(/^\/+/, "")
          );

          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);

            console.log(
              "Image deleted:",
              imagePath
            );
          }
        } catch (imageError) {
          console.log(
            "Image delete error:",
            imageError.message
          );
        }
      });
    }

    // ---------------------------------------------
    // DELETE PRODUCT FROM MONGODB
    // ---------------------------------------------

    await Product.findByIdAndDelete(
      req.params.id
    );

    console.log(
      "Product deleted:",
      req.params.id
    );

    // ---------------------------------------------
    // RESPONSE
    // ---------------------------------------------

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });

  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;