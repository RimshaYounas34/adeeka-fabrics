
import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import ProductCard from "../components/ProductCard.jsx";


// ================= API =================

const API_URL = "http://localhost:5000";


// ================= CASUAL IMAGES =================

import casual1 from "../assets/images/casual1.jpg";
import casual2 from "../assets/images/casual2.jpg";
import casual3 from "../assets/images/casual3.jpg";
import casual4 from "../assets/images/casual4.jpg";
import casual5 from "../assets/images/casual5.jpg";
import casual6 from "../assets/images/casual6.jpg";
import casual7 from "../assets/images/casual7.jpg";
import casual8 from "../assets/images/casual8.jpg";
import casual9 from "../assets/images/casual9.jpg";
import casual10 from "../assets/images/casual10.jpg";
import casual11 from "../assets/images/casual11.jpg";
import casual12 from "../assets/images/casual12.jpg";
import casual13 from "../assets/images/casual13.jpg";
import casual14 from "../assets/images/casual14.jpg";
import casual15 from "../assets/images/casual15.jpg";
import casual16 from "../assets/images/casual16.jpg";
import casual17 from "../assets/images/casual17.jpg";
import casual18 from "../assets/images/casual18.jpg";
import casual19 from "../assets/images/casual19.jpg";
import casual20 from "../assets/images/casual20.jpg";


// ================= OLD CASUAL PRODUCTS =================

const oldCasualProducts = [

  {
    id: "casual-1",
    name: "Elegant Casual Suit",
    price: 3499,
    image: casual1,
    category: "casual",
  },

  {
    id: "casual-2",
    name: "Printed Casual Suit",
    price: 3299,
    image: casual2,
    category: "casual",
  },

  {
    id: "casual-3",
    name: "Cotton Casual Suit",
    price: 3799,
    image: casual3,
    category: "casual",
  },

  {
    id: "casual-4",
    name: "Classic Casual Dress",
    price: 3999,
    image: casual4,
    category: "casual",
  },

  {
    id: "casual-5",
    name: "Premium Casual Suit",
    price: 4299,
    image: casual5,
    category: "casual",
  },

  {
    id: "casual-6",
    name: "Printed Lawn Suit",
    price: 3599,
    image: casual6,
    category: "casual",
  },

  {
    id: "casual-7",
    name: "Everyday Cotton Suit",
    price: 3399,
    image: casual7,
    category: "casual",
  },

  {
    id: "casual-8",
    name: "Elegant Lawn Suit",
    price: 3899,
    image: casual8,
    category: "casual",
  },

  {
    id: "casual-9",
    name: "Soft Cotton Collection",
    price: 3699,
    image: casual9,
    category: "casual",
  },

  {
    id: "casual-10",
    name: "Modern Casual Suit",
    price: 4199,
    image: casual10,
    category: "casual",
  },

  {
    id: "casual-11",
    name: "Comfort Lawn Suit",
    price: 3499,
    image: casual11,
    category: "casual",
  },

  {
    id: "casual-12",
    name: "Daily Wear Suit",
    price: 3199,
    image: casual12,
    category: "casual",
  },

  {
    id: "casual-13",
    name: "Elegant Printed Dress",
    price: 3999,
    image: casual13,
    category: "casual",
  },

  {
    id: "casual-14",
    name: "Premium Cotton Dress",
    price: 4499,
    image: casual14,
    category: "casual",
  },

  {
    id: "casual-15",
    name: "Casual Embroidered Suit",
    price: 4699,
    image: casual15,
    category: "casual",
  },

  {
    id: "casual-16",
    name: "Classic Lawn Collection",
    price: 3799,
    image: casual16,
    category: "casual",
  },

  {
    id: "casual-17",
    name: "Stylish Casual Suit",
    price: 4299,
    image: casual17,
    category: "casual",
  },

  {
    id: "casual-18",
    name: "Summer Casual Suit",
    price: 3599,
    image: casual18,
    category: "casual",
  },

  {
    id: "casual-19",
    name: "Premium Everyday Suit",
    price: 4499,
    image: casual19,
    category: "casual",
  },

  {
    id: "casual-20",
    name: "Casual Festive Suit",
    price: 4999,
    image: casual20,
    category: "casual",
  },

];


// ================= CASUAL PAGE =================

const CasualPage = () => {

  const [sortBy, setSortBy] =
    useState("default");

  const [newProducts, setNewProducts] =
    useState([]);


  // =====================================================
  // FETCH ADMIN PRODUCTS
  // =====================================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/products`
        );


        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }


        const data =
          await response.json();


        // Backend array ya { products: [] }
        const allProducts =
          Array.isArray(data)
            ? data
            : data.products || [];


        // Sirf Casual products
        const casualAdminProducts =
          allProducts.filter(
            (product) =>
              product.category?.toLowerCase() ===
              "casual"
          );


        setNewProducts(
          casualAdminProducts
        );

      } catch (error) {

        console.error(
          "Casual Products Error:",
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
    ...oldCasualProducts,
  ];


  // =====================================================
  // SORT
  // =====================================================

  const sortedProducts =
    [...allProducts].sort((a, b) => {

      if (sortBy === "low") {
        return a.price - b.price;
      }


      if (sortBy === "high") {
        return b.price - a.price;
      }


      if (sortBy === "name") {
        return a.name.localeCompare(
          b.name
        );
      }


      // Default:
      // Admin products pehle
      return 0;

    });


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="min-h-screen bg-[#faf8f3]">


      {/* ================================================= */}
      {/* HERO BANNER */}
      {/* ================================================= */}

      <section className="bg-[#f3eee5] px-6 py-20 text-center">

        <p className="mb-4 text-sm uppercase tracking-[4px] text-[#b08a45]">
          Adeeka Fabrics
        </p>


        <h1 className="font-serif text-5xl text-[#2f2a24] md:text-6xl">
          Casual Collection
        </h1>


        <p className="mx-auto mt-5 max-w-2xl text-gray-600">
          Effortless styles made for your everyday elegance.
          Discover comfortable and beautiful casual wear.
        </p>

      </section>


      {/* ================================================= */}
      {/* PRODUCTS SECTION */}
      {/* ================================================= */}

      <section className="px-6 py-16 md:px-10 lg:px-16">


        {/* ================================================= */}
        {/* FILTER BAR */}
        {/* ================================================= */}

        <div className="mb-8 flex flex-col gap-4 border-y border-[#e5dccd] py-5 sm:flex-row sm:items-center sm:justify-between">


          {/* PRODUCT COUNT */}

          <div className="flex items-center gap-2 text-sm text-gray-600">

            <SlidersHorizontal
              size={18}
            />

            <span>
              {sortedProducts.length} Products
            </span>

          </div>


          {/* SORT */}

          <div className="flex items-center gap-3">

            <label
              htmlFor="sort"
              className="text-sm text-gray-600"
            >
              Sort By:
            </label>


            <select
              id="sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="
                border
                border-[#d8c3a5]
                bg-white
                px-4
                py-2
                text-sm
                text-[#2f2a24]
                outline-none
                focus:border-[#b08a45]
              "
            >

              <option value="default">
                Recommended
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="name">
                Name: A to Z
              </option>

            </select>

          </div>

        </div>


        {/* ================================================= */}
        {/* PRODUCTS GRID */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-x-6
            gap-y-12
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {sortedProducts.map(
            (product) => (

              <ProductCard
                key={
                  product._id ||
                  product.id
                }
                product={product}
              />

            )
          )}

        </div>


      </section>

    </div>

  );

};


export default CasualPage;
