
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import pret1 from "../assets/images/pret1.jpg";
import pret2 from "../assets/images/pret2.jpg";
import pret3 from "../assets/images/pret3.jpg";
import pret4 from "../assets/images/pret4.jpg";
import pret5 from "../assets/images/pret5.jpg";
import pret6 from "../assets/images/pret6.jpg";
import pret7 from "../assets/images/pret7.jpg";
import pret8 from "../assets/images/pret8.jpg";

const PretPage = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // ================= GET PRODUCTS FROM BACKEND =================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to fetch products");
          return;
        }

        // Backend response agar { products: [...] } hai
        const products = Array.isArray(data)
          ? data
          : data.products || [];

        // Sirf Pret products
        const pretProducts = products.filter(
          (product) =>
            product.category?.toLowerCase() === "pret"
        );

        // Newest product first
        pretProducts.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setBackendProducts(pretProducts);

      } catch (error) {
        console.error(
          "Pret Products Error:",
          error
        );
      }
    };

    fetchProducts();
  }, []);

  // ================= OLD FRONTEND PRODUCTS =================

  const oldProducts = [
    {
      id: "old-1",
      name: "Elegant Pret Suit",
      price: 4999,
      image: pret1,
    },
    {
      id: "old-2",
      name: "Printed Pret Suit",
      price: 4499,
      image: pret2,
    },
    {
      id: "old-3",
      name: "Embroidered Pret Suit",
      price: 5499,
      image: pret3,
    },
    {
      id: "old-4",
      name: "Classic Pret Suit",
      price: 3999,
      image: pret4,
    },
    {
      id: "old-5",
      name: "Premium Pret Suit",
      price: 5999,
      image: pret5,
    },
    {
      id: "old-6",
      name: "Cotton Pret Suit",
      price: 4299,
      image: pret6,
    },
    {
      id: "old-7",
      name: "Luxury Pret Suit",
      price: 6499,
      image: pret7,
    },
    {
      id: "old-8",
      name: "Festive Pret Suit",
      price: 6999,
      image: pret8,
    },
  ];

  // ================= CONVERT BACKEND PRODUCTS =================

  const newProducts = backendProducts.map(
    (product) => ({
      ...product,

      // ProductCard ke liye id
      id: product._id,

      // Backend images array mein se first image
      image:
        product.images &&
        product.images.length > 0
          ? product.images[0]
          : "",
    })
  );

  // ================= NEW PRODUCTS FIRST =================

  let allProducts = [
    ...newProducts,
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
            Pret Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Ready-to-wear styles made for every occasion
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

export default PretPage;
