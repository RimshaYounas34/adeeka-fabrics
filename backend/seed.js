import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

await connectDB();

const products = [
  {
    name: "Embroidered Lawn Suit",
    slug: "embroidered-lawn-suit",
    price: 4999,
    category: "unstitched",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Pure Lawn",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Pink"],
    isNewArrival: true,
    isBestSeller: false,
  },

  {
    name: "Digital Printed Lawn Suit",
    slug: "digital-printed-lawn-suit",
    price: 4499,
    category: "unstitched",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Digital Printed Lawn",
    sizes: ["S", "M", "L"],
    colors: ["Blush", "Teal"],
    isNewArrival: true,
    isBestSeller: false,
  },

  {
    name: "Embroidered Chiffon Saree",
    slug: "embroidered-chiffon-saree",
    price: 7999,
    category: "luxury",
    images: [
      "https://images.unsplash.com/photo-1610189844754-6f24ba0e8c31?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Chiffon",
    sizes: ["Free Size"],
    colors: ["Navy"],
    isNewArrival: true,
    isBestSeller: true,
  },

  {
    name: "Luxury Lawn Suit",
    slug: "luxury-lawn-suit",
    price: 6499,
    category: "luxury",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0f06ba54a97?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Premium Lawn",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Gold"],
    isNewArrival: true,
    isBestSeller: false,
  },

  {
    name: "Embroidered Organza Suit",
    slug: "embroidered-organza-suit",
    price: 8999,
    category: "formal",
    images: [
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Organza",
    sizes: ["S", "M", "L"],
    colors: ["Maroon"],
    isNewArrival: true,
    isBestSeller: false,
  },

  {
    name: "Printed Lawn Suit",
    slug: "printed-lawn-suit",
    price: 3999,
    category: "unstitched",
    images: [
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Lawn",
    sizes: ["S", "M", "L"],
    colors: ["Green"],
    isNewArrival: false,
    isBestSeller: true,
  },

  {
    name: "Embroidered Lawn Suit Deluxe",
    slug: "embroidered-lawn-suit-deluxe",
    price: 5499,
    category: "pret",
    images: [
      "https://images.unsplash.com/photo-1583391733981-8698e5d84a2a?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Lawn",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink"],
    isNewArrival: false,
    isBestSeller: true,
  },

  {
    name: "Chiffon Embroidered Suit",
    slug: "chiffon-embroidered-suit",
    price: 7499,
    category: "luxury",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Chiffon",
    sizes: ["S", "M", "L"],
    colors: ["Beige"],
    isNewArrival: false,
    isBestSeller: true,
  },

  {
    name: "Luxury Silk Suit",
    slug: "luxury-silk-suit",
    price: 8499,
    category: "luxury",
    images: [
      "https://images.unsplash.com/photo-1617019114838-3d40e64f0eb2?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Silk",
    sizes: ["S", "M", "L"],
    colors: ["Gold"],
    isNewArrival: false,
    isBestSeller: true,
  },

  {
    name: "Organza Embroidered Suit",
    slug: "organza-embroidered-suit",
    price: 9499,
    category: "formal",
    images: [
      "https://images.unsplash.com/photo-1610030181087-540e8c2cd39c?auto=format&fit=crop&w=800&q=80"
    ],
    fabric: "Organza",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    isNewArrival: false,
    isBestSeller: true,
  },
];

const run = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products added successfully!");

    process.exit();
  } catch (error) {
    console.log("Error:", error.message);

    process.exit(1);
  }
};

run();