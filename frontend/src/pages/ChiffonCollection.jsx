import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import chiffon1 from "../assets/images/chiffon1.jpg";
import chiffon2 from "../assets/images/chiffon2.jpg";
import chiffon3 from "../assets/images/chiffon3.jpg";
import chiffon4 from "../assets/images/chiffon4.jpg";
import chiffon5 from "../assets/images/chiffon5.jpg";
import chiffon6 from "../assets/images/chiffon6.jpg";
import chiffon7 from "../assets/images/chiffon7.jpg";
import chiffon8 from "../assets/images/chiffon8.jpg";

const API_URL = "http://localhost:5000";

const ChiffonCollection = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // =====================================================
  // GET CHIFFON PRODUCTS FROM BACKEND
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
        const chiffonProducts = products.filter((product) => {
          const collection = product.collectionName
            ?.toLowerCase()
            .trim();

          return (
            collection === "chiffon" ||
            collection === "chiffon collection"
          );
        });

        // New products first
        chiffonProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setBackendProducts(chiffonProducts);
      } catch (error) {
        console.error("Chiffon Products Error:", error);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // DUMMY PRODUCTS
  // =====================================================

  const oldProducts = [
    {
      id: "old-chiffon-1",
      name: "Elegant Chiffon Suit",
      price: 7499,
      image: chiffon1,
    },
    {
      id: "old-chiffon-2",
      name: "Embroidered Chiffon Dress",
      price: 8499,
      image: chiffon2,
    },
    {
      id: "old-chiffon-3",
      name: "Premium Chiffon 3 Piece",
      price: 8999,
      image: chiffon3,
    },
    {
      id: "old-chiffon-4",
      name: "Luxury Chiffon Suit",
      price: 9499,
      image: chiffon4,
    },
    {
      id: "old-chiffon-5",
      name: "Floral Chiffon Dress",
      price: 7999,
      image: chiffon5,
    },
    {
      id: "old-chiffon-6",
      name: "Party Wear Chiffon",
      price: 9999,
      image: chiffon6,
    },
    {
      id: "old-chiffon-7",
      name: "Royal Chiffon Collection",
      price: 10999,
      image: chiffon7,
    },
    {
      id: "old-chiffon-8",
      name: "Classic Chiffon Ensemble",
      price: 11499,
      image: chiffon8,
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
  // BACKEND PRODUCTS FIRST
  // DUMMY PRODUCTS AFTER
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
            Chiffon Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Discover our elegant chiffon collection
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

export default ChiffonCollection;