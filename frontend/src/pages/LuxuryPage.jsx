
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import luxury1 from "../assets/images/luxury1.jpg";
import luxury2 from "../assets/images/luxury2.jpg";
import luxury3 from "../assets/images/luxury3.jpg";
import luxury4 from "../assets/images/luxury4.jpg";
import luxury5 from "../assets/images/luxury5.jpg";
import luxury6 from "../assets/images/luxury6.jpg";
import luxury7 from "../assets/images/luxury7.jpg";
import luxury8 from "../assets/images/luxury8.jpg";

const API_URL = "http://localhost:5000";

const LuxuryPage = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // =====================================================
  // GET LUXURY PRODUCTS FROM BACKEND
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

        // Sirf Luxury products
        const luxuryProducts = products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            "luxury"
        );

        // New products first
        luxuryProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setBackendProducts(luxuryProducts);
      } catch (error) {
        console.error(
          "Luxury Products Error:",
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
      id: "old-luxury-1",
      name: "Luxury Embroidered Suit",
      price: 8499,
      image: luxury1,
    },
    {
      id: "old-luxury-2",
      name: "Premium Luxury Suit",
      price: 9499,
      image: luxury2,
    },
    {
      id: "old-luxury-3",
      name: "Elegant Luxury Dress",
      price: 7999,
      image: luxury3,
    },
    {
      id: "old-luxury-4",
      name: "Luxury Chiffon Suit",
      price: 8999,
      image: luxury4,
    },
    {
      id: "old-luxury-5",
      name: "Embroidered Formal Suit",
      price: 9999,
      image: luxury5,
    },
    {
      id: "old-luxury-6",
      name: "Luxury Party Wear",
      price: 10999,
      image: luxury6,
    },
    {
      id: "old-luxury-7",
      name: "Premium Festive Suit",
      price: 11999,
      image: luxury7,
    },
    {
      id: "old-luxury-8",
      name: "Royal Embroidered Suit",
      price: 12999,
      image: luxury8,
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
  // NEW PRODUCTS FIRST
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
            Luxury Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Discover our premium luxury suits
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

export default LuxuryPage;
