import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";
import Product from "./models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Frontend images folder
const imagesFolder = path.join(
  __dirname,
  "../frontend/src/assets/images"
);

// Existing products
const products = [
  // ================= NEW ARRIVALS =================
  {
    id: "new-1",
    name: "Embroidered Lawn Suit",
    price: 3999,
    image: "new1.jpg",
    category: "new-arrivals",
    isNewArrival: true,
  },
  {
    id: "new-2",
    name: "Elegant Cotton Suit",
    price: 3499,
    image: "new2.jpg",
    category: "new-arrivals",
    isNewArrival: true,
  },
  {
    id: "new-3",
    name: "Luxury Embroidered Dress",
    price: 5499,
    image: "new3.jpg",
    category: "new-arrivals",
    isNewArrival: true,
  },
  {
    id: "new-4",
    name: "Printed Lawn Collection",
    price: 2999,
    image: "new4.jpg",
    category: "new-arrivals",
    isNewArrival: true,
  },
  {
    id: "new-5",
    name: "Premium Formal Suit",
    price: 6499,
    image: "new5.jpg",
    category: "new-arrivals",
    isNewArrival: true,
  },

  // ================= BEST SELLERS =================
  {
    id: "best-1",
    name: "Embroidered Lawn Suit",
    price: 4499,
    image: "best1.jpg",
    category: "best-sellers",
    isBestSeller: true,
  },
  {
    id: "best-2",
    name: "Elegant Printed Suit",
    price: 3999,
    image: "best2.jpg",
    category: "best-sellers",
    isBestSeller: true,
  },
  {
    id: "best-3",
    name: "Luxury Embroidered Dress",
    price: 5999,
    image: "best3.jpg",
    category: "best-sellers",
    isBestSeller: true,
  },
  {
    id: "best-4",
    name: "Premium Pret Suit",
    price: 4999,
    image: "best4.jpg",
    category: "best-sellers",
    isBestSeller: true,
  },
  {
    id: "best-5",
    name: "Formal Collection",
    price: 6999,
    image: "best5.jpg",
    category: "best-sellers",
    isBestSeller: true,
  },

  // ================= LUXURY =================
  {
    id: "luxury-1",
    name: "Luxury Embroidered Suit",
    price: 8499,
    image: "luxury1.jpg",
    category: "luxury",
  },
  {
    id: "luxury-2",
    name: "Premium Luxury Suit",
    price: 9499,
    image: "luxury2.jpg",
    category: "luxury",
  },
  {
    id: "luxury-3",
    name: "Elegant Luxury Dress",
    price: 7999,
    image: "luxury3.jpg",
    category: "luxury",
  },
  {
    id: "luxury-4",
    name: "Luxury Chiffon Suit",
    price: 8999,
    image: "luxury4.jpg",
    category: "luxury",
  },
  {
    id: "luxury-5",
    name: "Embroidered Formal Suit",
    price: 9999,
    image: "luxury5.jpg",
    category: "luxury",
  },
  {
    id: "luxury-6",
    name: "Luxury Party Wear",
    price: 10999,
    image: "luxury6.jpg",
    category: "luxury",
  },
  {
    id: "luxury-7",
    name: "Premium Festive Suit",
    price: 11999,
    image: "luxury7.jpg",
    category: "luxury",
  },
  {
    id: "luxury-8",
    name: "Royal Embroidered Suit",
    price: 12999,
    image: "luxury8.jpg",
    category: "luxury",
  },

  // ================= PRET =================
  {
    id: "pret-1",
    name: "Elegant Pret Suit",
    price: 4999,
    image: "pret1.jpg",
    category: "pret",
  },
  {
    id: "pret-2",
    name: "Printed Pret Suit",
    price: 4499,
    image: "pret2.jpg",
    category: "pret",
  },
  {
    id: "pret-3",
    name: "Embroidered Pret Suit",
    price: 5499,
    image: "pret3.jpg",
    category: "pret",
  },
  {
    id: "pret-4",
    name: "Classic Pret Suit",
    price: 3999,
    image: "pret4.jpg",
    category: "pret",
  },
  {
    id: "pret-5",
    name: "Premium Pret Suit",
    price: 5999,
    image: "pret5.jpg",
    category: "pret",
  },
  {
    id: "pret-6",
    name: "Cotton Pret Suit",
    price: 4299,
    image: "pret6.jpg",
    category: "pret",
  },
  {
    id: "pret-7",
    name: "Luxury Pret Suit",
    price: 6499,
    image: "pret7.jpg",
    category: "pret",
  },
  {
    id: "pret-8",
    name: "Festive Pret Suit",
    price: 6999,
    image: "pret8.jpg",
    category: "pret",
  },

  // ================= UNSTITCHED =================
  {
    id: "unstiched-1",
    name: "Embroidered Lawn Suit",
    price: 4999,
    image: "unstiched1.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-2",
    name: "Printed Lawn Suit",
    price: 3999,
    image: "unstiched2.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-3",
    name: "Elegant Cotton Suit",
    price: 4499,
    image: "unstiched3.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-4",
    name: "Premium Lawn Suit",
    price: 4999,
    image: "unstiched4.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-5",
    name: "Chiffon Unstitched Suit",
    price: 5999,
    image: "unstiched5.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-6",
    name: "Premium Cotton Suit",
    price: 4799,
    image: "unstiched6.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-7",
    name: "Embroidered Suit",
    price: 5499,
    image: "unstiched7.jpg",
    category: "unstitched",
  },
  {
    id: "unstiched-8",
    name: "Luxury Lawn Suit",
    price: 6499,
    image: "unstiched8.jpg",
    category: "unstitched",
  },

  // ================= COLLECTIONS =================
  {
    id: "collection-1",
    name: "Embroidered Lawn Suit",
    price: 4999,
    image: "collection1.jpg",
    category: "collections",
  },
  {
    id: "collection-2",
    name: "Elegant Chiffon Suit",
    price: 5499,
    image: "collection2.jpg",
    category: "collections",
  },
  {
    id: "collection-3",
    name: "Premium Silk Suit",
    price: 6999,
    image: "collection3.jpg",
    category: "collections",
  },
  {
    id: "collection-4",
    name: "Luxury Formal Suit",
    price: 8499,
    image: "collection4.jpg",
    category: "collections",
  },
  {
    id: "collection-5",
    name: "Printed Lawn Suit",
    price: 3999,
    image: "collection5.jpg",
    category: "collections",
  },
  {
    id: "collection-6",
    name: "Embroidered Cotton Suit",
    price: 4499,
    image: "collection6.jpg",
    category: "collections",
  },
  {
    id: "collection-7",
    name: "Party Wear Suit",
    price: 7499,
    image: "collection7.jpg",
    category: "collections",
  },
  {
    id: "collection-8",
    name: "Festive Collection",
    price: 9999,
    image: "collection8.jpg",
    category: "collections",
  },
];

// Upload image to Cloudinary
const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "adeeka-fabrics",
  });

  return result.secure_url;
};

// Seed products
const seedProducts = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    for (const item of products) {
      const filePath = path.join(imagesFolder, item.image);

      if (!fs.existsSync(filePath)) {
        console.log(`❌ Image not found: ${item.image}`);
        continue;
      }

      console.log(`Uploading: ${item.image}`);

      const imageUrl = await uploadImage(filePath);

      const slug = item.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // ID ko slug mein include kar rahe hain
      // taake same name wale products conflict na karein
      const uniqueSlug = `${slug}-${item.id}`;

      await Product.create({
        name: item.name,
        slug: uniqueSlug,
        price: item.price,
        category: item.category,
        collectionName: item.category,
        description: `${item.name} from Adeeka Fabrics`,
        images: [imageUrl],
        sizes: ["S", "M", "L"],
        colors: [],
        isNewArrival: item.isNewArrival || false,
        isBestSeller: item.isBestSeller || false,
        isSale: false,
        stock: 10,
      });

      console.log(`✅ Added: ${item.name}`);
    }

    console.log("🎉 All products added successfully!");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProducts();