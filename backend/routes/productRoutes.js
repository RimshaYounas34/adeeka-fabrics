
import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// =====================================================
// CLOUDINARY CONFIG
// =====================================================

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log("======================================");
console.log("CLOUDINARY CONFIG");
console.log("Cloud Name:", cloudName || "MISSING");
console.log("API Key:", apiKey ? "LOADED" : "MISSING");
console.log("API Secret:", apiSecret ? "LOADED" : "MISSING");
console.log("======================================");

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "❌ Cloudinary configuration is missing."
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// =====================================================
// MULTER
// =====================================================

const storage = multer.memoryStorage();

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
    cb(
      new Error("Only image files are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =====================================================
// CLOUDINARY UPLOAD FUNCTION
// =====================================================

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    // Check configuration before upload

    if (!apiKey) {
      return reject(
        new Error(
          "Cloudinary API key is missing. Check your .env file."
        )
      );
    }

    if (!cloudName) {
      return reject(
        new Error(
          "Cloudinary cloud name is missing. Check your .env file."
        )
      );
    }

    if (!apiSecret) {
      return reject(
        new Error(
          "Cloudinary API secret is missing. Check your .env file."
        )
      );
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "adeeka-fabrics/products",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary Upload Error:",
              error
            );

            reject(error);
          } else {
            resolve(result);
          }
        }
      );

    uploadStream.end(fileBuffer);
  });
};

// =====================================================
// ADD PRODUCT
// =====================================================

router.post(
  "/",
  upload.array("images", 10),
  async (req, res) => {
    try {
      console.log(
        "========== ADD PRODUCT =========="
      );

      console.log("Body:", req.body);

      console.log(
        "Files:",
        req.files?.length || 0
      );

      // =================================================
      // CHECK BASIC DATA
      // =================================================

      if (!req.body.name) {
        return res.status(400).json({
          success: false,
          message:
            "Product name is required.",
        });
      }

      if (!req.body.price) {
        return res.status(400).json({
          success: false,
          message:
            "Product price is required.",
        });
      }

      if (!req.body.category) {
        return res.status(400).json({
          success: false,
          message:
            "Product category is required.",
        });
      }

      // =================================================
      // UPLOAD IMAGES TO CLOUDINARY
      // =================================================

      let images = [];

      if (
        req.files &&
        req.files.length > 0
      ) {
        console.log(
          "Uploading images to Cloudinary..."
        );

        const uploadedImages =
          await Promise.all(
            req.files.map((file) =>
              uploadToCloudinary(
                file.buffer
              )
            )
          );

        images =
          uploadedImages.map(
            (image) =>
              image.secure_url
          );

        console.log(
          "Cloudinary images:",
          images
        );
      }

      // =================================================
      // ALSO SUPPORT IMAGE URLS
      // =================================================

      if (
        images.length === 0 &&
        req.body.images
      ) {
        if (
          Array.isArray(
            req.body.images
          )
        ) {
          images =
            req.body.images;
        } else {
          try {
            images = JSON.parse(
              req.body.images
            );
          } catch (error) {
            images = [
              req.body.images,
            ];
          }
        }
      }

      // =================================================
      // PARSE SIZES
      // =================================================

      let sizes = [];

      try {
        sizes =
          Array.isArray(
            req.body.sizes
          )
            ? req.body.sizes
            : req.body.sizes
            ? JSON.parse(
                req.body.sizes
              )
            : [];
      } catch (error) {
        console.log(
          "Sizes parse error:",
          error.message
        );

        sizes = [];
      }

      // =================================================
      // PARSE COLORS
      // =================================================

      let colors = [];

      try {
        colors =
          Array.isArray(
            req.body.colors
          )
            ? req.body.colors
            : req.body.colors
            ? JSON.parse(
                req.body.colors
              )
            : [];
      } catch (error) {
        console.log(
          "Colors parse error:",
          error.message
        );

        colors = [];
      }

      // =================================================
      // BOOLEAN VALUES
      // =================================================

      const isNewArrival =
        req.body.isNewArrival === true ||
        req.body.isNewArrival ===
          "true";

      const isBestSeller =
        req.body.isBestSeller === true ||
        req.body.isBestSeller ===
          "true";

      const isSale =
        req.body.isSale === true ||
        req.body.isSale === "true";

      // =================================================
      // CREATE PRODUCT
      // =================================================

      const product =
        new Product({
          name: req.body.name,

          slug:
            req.body.slug ||
            req.body.name
              .toLowerCase()
              .replace(
                /\s+/g,
                "-"
              ),

          price: Number(
            req.body.price
          ),

          category:
            req.body.category,

          collectionName:
            req.body.collectionName ||
            "",

          description:
            req.body.description ||
            "",

          stock:
            Number(
              req.body.stock
            ) || 0,

          images,

          sizes,

          colors,

          isNewArrival,

          isBestSeller,

          isSale,
        });

      // =================================================
      // SAVE PRODUCT
      // =================================================

      const savedProduct =
        await product.save();

      console.log(
        "Product saved:",
        savedProduct._id
      );

      // =================================================
      // RESPONSE
      // =================================================

      return res.status(201).json({
        success: true,
        message:
          "Product added successfully.",
        product:
          savedProduct,
      });

    } catch (error) {
      console.error(
        "Add Product Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    return res.json({
      success: true,
      products,
    });

  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
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

      const products =
        await Product.find({
          category,
        }).sort({
          createdAt: -1,
        });

      return res.json({
        success: true,
        products,
      });

    } catch (error) {
      console.error(
        "Get Category Products Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get(
  "/:id",
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found.",
        });
      }

      return res.json({
        success: true,
        product,
      });

    } catch (error) {
      console.error(
        "Get Single Product Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete(
  "/:id",
  async (req, res) => {
    try {
      console.log(
        "========== DELETE PRODUCT =========="
      );

      console.log(
        "Product ID:",
        req.params.id
      );

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found.",
        });
      }

      await Product.findByIdAndDelete(
        req.params.id
      );

      console.log(
        "Product deleted:",
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Product deleted successfully.",
      });

    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

export default router;
