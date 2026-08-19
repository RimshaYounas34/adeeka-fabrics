
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import unstiched1 from "../assets/images/unstiched1.jpg";
import unstiched2 from "../assets/images/unstiched2.jpg";
import unstiched3 from "../assets/images/unstiched3.jpg";
import unstiched4 from "../assets/images/unstiched4.jpg";
import unstiched5 from "../assets/images/unstiched5.jpg";
import unstiched6 from "../assets/images/unstiched6.jpg";
import unstiched7 from "../assets/images/unstiched7.jpg";
import unstiched8 from "../assets/images/unstiched8.jpg";

const API_URL = "http://localhost:5000";

const ShopPage = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // =====================================================
  // GET PRODUCTS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/products`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to fetch products");
          return;
        }

        const products = Array.isArray(data)
          ? data
          : data.products || [];

        // =================================================
        // ONLY UNSTITCHED PRODUCTS
        // =================================================

        const unstitchedProducts = products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            "unstitched"
        );

        // =================================================
        // NEWEST PRODUCT FIRST
        // =================================================

        unstitchedProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setBackendProducts(unstitchedProducts);
      } catch (error) {
        console.error(
          "Unstitched Products Error:",
          error
        );
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // OLD FRONTEND PRODUCTS
  // =====================================================

  const oldProducts = [
    {
      id: "old-1",
      name: "Embroidered Lawn Suit",
      price: 4999,
      image: unstiched1,
    },
    {
      id: "old-2",
      name: "Printed Lawn Suit",
      price: 3999,
      image: unstiched2,
    },
    {
      id: "old-3",
      name: "Elegant Cotton Suit",
      price: 4499,
      image: unstiched3,
    },
    {
      id: "old-4",
      name: "Premium Lawn Suit",
      price: 4999,
      image: unstiched4,
    },
    {
      id: "old-5",
      name: "Chiffon Unstitched Suit",
      price: 5999,
      image: unstiched5,
    },
    {
      id: "old-6",
      name: "Premium Cotton Suit",
      price: 4799,
      image: unstiched6,
    },
    {
      id: "old-7",
      name: "Embroidered Suit",
      price: 5499,
      image: unstiched7,
    },
    {
      id: "old-8",
      name: "Luxury Lawn Suit",
      price: 6499,
      image: unstiched8,
    },
  ];

  // =====================================================
  // CONVERT BACKEND PRODUCTS
  // =====================================================

  const newProducts = backendProducts.map(
    (product) => ({
      ...product,

      // ProductCard ke liye id
      id: product._id,

      // Backend image
      image:
        product.images &&
        product.images.length > 0
          ? product.images[0].startsWith("http")
            ? product.images[0]
            : `${API_URL}${product.images[0]}`
          : "",
    })
  );

  // =====================================================
  // NEW BACKEND PRODUCTS FIRST
  // OLD PRODUCTS AFTER
  // =====================================================

  let allProducts = [
    ...newProducts,
    ...oldProducts,
  ];

  // =====================================================
  // SORT
  // =====================================================

  if (sort === "low") {
    allProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    allProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="bg-[#f5eee4] min-h-screen py-14 px-6 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="text-center mb-10">

          <p className="text-[#b18442] text-xs uppercase tracking-widest">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
            Unstitched Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Explore our beautiful unstitched suits
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4" />

        </div>

        {/* ================================================= */}
        {/* SORT BAR */}
        {/* ================================================= */}

        <div className="flex justify-between items-center mb-8">

          <p className="text-sm text-[#75695e]">
            {allProducts.length} Products
          </p>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
              bg-white
              border
              border-[#d8cec1]
              px-4
              py-2
              text-sm
              outline-none
            "
          >

            <option value="">
              Newest
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

          </select>

        </div>

        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-5
          "
        >

          {allProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default ShopPage;
