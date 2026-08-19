import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import silk1 from "../assets/images/silk1.jpg";
import silk2 from "../assets/images/silk2.jpg";
import silk3 from "../assets/images/silk3.jpg";
import silk4 from "../assets/images/silk4.jpg";
import silk5 from "../assets/images/silk5.jpg";
import silk6 from "../assets/images/silk6.jpg";
import silk7 from "../assets/images/silk7.jpg";
import silk8 from "../assets/images/silk8.jpg";

const API_URL = import.meta.env.VITE_API_URL;
const SilkCollection = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // =====================================================
  // GET SILK PRODUCTS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to fetch products");
          return;
        }

        const products = Array.isArray(data)
          ? data
          : data.products || [];

        // Collection ke naam se filter
        const silkProducts = products.filter((product) => {
          const collection = product.collectionName
            ?.toLowerCase()
            .trim();

          return (
            collection === "silk" ||
            collection === "silk collection"
          );
        });

        // New products first
        silkProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setBackendProducts(silkProducts);
      } catch (error) {
        console.error("Silk Products Error:", error);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // DUMMY PRODUCTS
  // =====================================================

  const oldProducts = [
    {
      id: "old-silk-1",
      name: "Elegant Silk Suit",
      price: 8499,
      image: silk1,
    },
    {
      id: "old-silk-2",
      name: "Premium Silk Dress",
      price: 9499,
      image: silk2,
    },
    {
      id: "old-silk-3",
      name: "Embroidered Silk Suit",
      price: 9999,
      image: silk3,
    },
    {
      id: "old-silk-4",
      name: "Luxury Silk Ensemble",
      price: 10999,
      image: silk4,
    },
    {
      id: "old-silk-5",
      name: "Royal Silk Collection",
      price: 11999,
      image: silk5,
    },
    {
      id: "old-silk-6",
      name: "Festive Silk Suit",
      price: 12499,
      image: silk6,
    },
    {
      id: "old-silk-7",
      name: "Classic Silk 3 Piece",
      price: 11499,
      image: silk7,
    },
    {
      id: "old-silk-8",
      name: "Designer Silk Dress",
      price: 13499,
      image: silk8,
    },
  ];

  // =====================================================
  // CONVERT BACKEND PRODUCTS
  // =====================================================

  const newProducts = backendProducts.map((product) => ({
    ...product,

    id: product._id,

    image:
      product.images && product.images.length > 0
        ? product.images[0].startsWith("http")
          ? product.images[0]
          : `${API_URL}${product.images[0]}`
        : "",
  }));

  // =====================================================
  // BACKEND FIRST + DUMMY AFTER
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

        {/* HEADING */}

        <div className="text-center mb-10">

          <p className="text-[#b18442] text-xs uppercase tracking-widest">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
            Silk Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Discover our luxurious silk collection
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4" />

        </div>

        {/* SORT BAR */}

        <div className="flex justify-between items-center mb-8">

          <p className="text-sm text-[#75695e]">
            {allProducts.length} Products
          </p>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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

        {/* PRODUCTS */}

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

export default SilkCollection;