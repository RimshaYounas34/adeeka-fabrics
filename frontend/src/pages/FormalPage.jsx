
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import formal1 from "../assets/images/formal1.jpg";
import formal2 from "../assets/images/formal2.jpg";
import formal3 from "../assets/images/formal3.jpg";
import formal4 from "../assets/images/formal4.jpg";
import formal5 from "../assets/images/formal5.jpg";
import formal6 from "../assets/images/formal6.jpg";
import formal7 from "../assets/images/formal7.jpg";
import formal8 from "../assets/images/formal8.jpg";
import formal9 from "../assets/images/formal9.jpg";
import formal10 from "../assets/images/formal10.jpg";
import formal11 from "../assets/images/formal11.jpg";
import formal12 from "../assets/images/formal12.jpg";
import formal13 from "../assets/images/formal13.jpg";
import formal14 from "../assets/images/formal14.jpg";
import formal15 from "../assets/images/formal15.jpg";
import formal16 from "../assets/images/formal16.jpg";
import formal17 from "../assets/images/formal17.jpg";
import formal18 from "../assets/images/formal18.jpg";
import formal19 from "../assets/images/formal19.jpg";
import formal20 from "../assets/images/formal20.jpg";

const API_URL = "http://localhost:5000";

// =====================================================
// OLD FORMAL PRODUCTS
// Ye images bilkul same rahengi
// =====================================================

const oldProducts = [
  {
    id: "formal1",
    name: "Elegant Embroidered Formal Suit",
    price: 7999,
    image: formal1,
  },
  {
    id: "formal2",
    name: "Premium Chiffon Formal Suit",
    price: 8499,
    image: formal2,
  },
  {
    id: "formal3",
    name: "Royal Embroidered Dress",
    price: 8999,
    image: formal3,
  },
  {
    id: "formal4",
    name: "Classic Formal Lawn Suit",
    price: 7499,
    image: formal4,
  },
  {
    id: "formal5",
    name: "Luxury Party Wear Suit",
    price: 9999,
    image: formal5,
  },
  {
    id: "formal6",
    name: "Elegant Cotton Formal Suit",
    price: 6999,
    image: formal6,
  },
  {
    id: "formal7",
    name: "Embroidered Organza Suit",
    price: 10999,
    image: formal7,
  },
  {
    id: "formal8",
    name: "Premium Festive Dress",
    price: 11999,
    image: formal8,
  },
  {
    id: "formal9",
    name: "Luxury Velvet Formal Suit",
    price: 12999,
    image: formal9,
  },
  {
    id: "formal10",
    name: "Pearl Embroidered Suit",
    price: 9499,
    image: formal10,
  },
  {
    id: "formal11",
    name: "Designer Formal Dress",
    price: 11499,
    image: formal11,
  },
  {
    id: "formal12",
    name: "Classic Chiffon Dress",
    price: 8999,
    image: formal12,
  },
  {
    id: "formal13",
    name: "Golden Embroidered Suit",
    price: 12499,
    image: formal13,
  },
  {
    id: "formal14",
    name: "Festive Formal Collection",
    price: 13499,
    image: formal14,
  },
  {
    id: "formal15",
    name: "Elegant Silk Formal Suit",
    price: 9999,
    image: formal15,
  },
  {
    id: "formal16",
    name: "Royal Party Wear Dress",
    price: 14499,
    image: formal16,
  },
  {
    id: "formal17",
    name: "Embroidered Wedding Suit",
    price: 15499,
    image: formal17,
  },
  {
    id: "formal18",
    name: "Premium Formal Collection",
    price: 11999,
    image: formal18,
  },
  {
    id: "formal19",
    name: "Luxury Wedding Dress",
    price: 16499,
    image: formal19,
  },
  {
    id: "formal20",
    name: "Royal Festive Formal Suit",
    price: 17999,
    image: formal20,
  },
];


// =====================================================
// FORMAL PAGE
// =====================================================

const FormalPage = () => {

  const [sort, setSort] = useState("");

  const [newProducts, setNewProducts] = useState([]);


  // =====================================================
  // GET ADMIN PRODUCTS
  // =====================================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Backend response array ya products property
        const allProducts =
          Array.isArray(data)
            ? data
            : data.products || [];


        // Sirf Formal category
        const formalProducts =
          allProducts.filter(
            (product) =>
              product.category?.toLowerCase() ===
              "formal"
          );


        setNewProducts(formalProducts);

      } catch (error) {

        console.error(
          "Formal Products Error:",
          error
        );

      }

    };


    fetchProducts();

  }, []);


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
  // RENDER
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
            Formal Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Discover elegant formal dresses for every special occasion
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4"></div>

        </div>


        {/* ================================================= */}
        {/* TOP BAR */}
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
              Sort By
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
              key={product._id || product.id}
              product={product}
            />

          ))}

        </div>


      </div>

    </section>

  );

};


export default FormalPage;
