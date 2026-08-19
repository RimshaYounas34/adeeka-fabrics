import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.log("Get Products Error:", error);

    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

// Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("Get Product Error:", error);

    res.status(500).json({
      message: "Failed to get product",
    });
  }
};

// Create Product
export const createProduct = async (req, res) => {
  try {
    // Cloudinary image URLs
    const imageUrls = [];

    // Agar images upload hui hain
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "adeeka-fabrics",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          stream.end(file.buffer);
        });

        imageUrls.push(result.secure_url);
      }
    }

    const product = await Product.create({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Create Product Error:", error);

    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Delete Product Error:", error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};