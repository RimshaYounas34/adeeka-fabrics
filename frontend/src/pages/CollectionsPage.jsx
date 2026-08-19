
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import collection1 from "../assets/images/collection1.jpg";
import collection2 from "../assets/images/collection2.jpg";
import collection3 from "../assets/images/collection3.jpg";
import collection4 from "../assets/images/collection4.jpg";
import collection5 from "../assets/images/collection5.jpg";
import collection6 from "../assets/images/collection6.jpg";
import collection7 from "../assets/images/collection7.jpg";
import collection8 from "../assets/images/collection8.jpg";

const API_URL = import.meta.env.VITE_API_URL;
const CollectionsPage = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // ================= OLD COLLECTION PRODUCTS =================

  const oldProducts = [
    {
      id: "collection1",
      name: "Embroidered Lawn Suit",
      price: 4999,
      image: collection1,
    },
    {
      id: "collection2",
      name: "Elegant Chiffon Suit",
      price: 5499,
      image: collection2,
    },
    {
      id: "collection3",
      name: "Premium Silk Suit",
      price: 6999,
      image: collection3,
    },
    {
      id: "collection4",
      name: "Luxury Formal Suit",
      price: 8499,
      image: collection4,
    },
    {
      id: "collection5",
      name: "Printed Lawn Suit",
      price: 3999,
      image: collection5,
    },
    {
      id: "collection6",
      name: "Embroidered Cotton Suit",
      price: 4499,
      image: collection6,
    },
    {
      id: "collection7",
      name: "Party Wear Suit",
      price: 7499,
      image: collection7,
    },
    {
      id: "collection8",
      name: "Festive Collection",
      price: 9999,
      image: collection8,
    },
  ];

  // ================= GET NEW PRODUCTS =================

  useEffect(() => {
    const fetchCollections = async () => {
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

        // Sirf Collection category ke products
        const collectionProducts = products.filter(
          (product) =>
            product.category?.toLowerCase() ===
            "collection"
        );

        // Newest product first
        collectionProducts.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        // Backend products ko ProductCard format mein convert
        const formattedProducts =
          collectionProducts.map((product) => ({
            ...product,

            id: product._id,

            image:
              product.images &&
              product.images.length > 0
                ? product.images[0].startsWith("http")
                  ? product.images[0]
                  : `${API_URL}${product.images[0]}`
                : "",
          }));

        setBackendProducts(formattedProducts);

      } catch (error) {
        console.error(
          "Collections Products Error:",
          error
        );
      }
    };

    fetchCollections();
  }, []);

  // ================= NEW FIRST + OLD AFTER =================

  let allProducts = [
    ...backendProducts,
    ...oldProducts,
  ];

  // ================= SORT =================

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

  // ================= UI =================

  return (
    <section className="bg-[#f5eee4] min-h-screen py-14 px-6 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}

        <div className="text-center mb-10">

          <p className="text-[#b18442] text-xs uppercase tracking-widest">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
            Our Collections
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Explore our latest collection of elegant suits
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4"></div>

        </div>

        {/* ================= SORT BAR ================= */}

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
              cursor-pointer
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

        {/* ================= PRODUCTS ================= */}

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

export default CollectionsPage;
