
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import new1 from "../assets/images/new5.jpg";
import new2 from "../assets/images/new6.jpg";
import new3 from "../assets/images/new1.jpg";
import new4 from "../assets/images/new7.jpg";
import new5 from "../assets/images/new8.jpg";

const API_URL = import.meta.env.VITE_API_URL;
const NewArrivalsPage = () => {
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
        // ONLY NEW ARRIVAL PRODUCTS
        // =================================================

        const newArrivalProducts = products.filter(
          (product) =>
            product.isNewArrival === true ||
            product.isNewArrival === "true"
        );

        // =================================================
        // NEWEST PRODUCT FIRST
        // =================================================

        newArrivalProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setBackendProducts(newArrivalProducts);
      } catch (error) {
        console.error(
          "New Arrivals Error:",
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
      id: "old-new-1",
      name: "Embroidered Lawn Suit",
      price: 3999,
      image: new1,
    },
    {
      id: "old-new-2",
      name: "Elegant Cotton Suit",
      price: 3499,
      image: new2,
    },
    {
      id: "old-new-3",
      name: "Luxury Embroidered Dress",
      price: 5499,
      image: new3,
    },
    {
      id: "old-new-4",
      name: "Printed Lawn Collection",
      price: 2999,
      image: new4,
    },
    {
      id: "old-new-5",
      name: "Premium Formal Suit",
      price: 6499,
      image: new5,
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
    <section className="min-h-screen bg-[#f5eee4] py-14 px-6 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="text-center mb-10">

          <p className="text-[#b18442] text-xs uppercase tracking-widest">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
            New Arrivals
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Discover our latest collection
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
            lg:grid-cols-5
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

export default NewArrivalsPage;
