
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import sale1 from "../assets/images/sale1.jpg";
import sale2 from "../assets/images/sale2.jpg";
import sale3 from "../assets/images/sale3.jpg";
import sale4 from "../assets/images/sale4.jpg";
import sale5 from "../assets/images/sale5.jpg";
import sale6 from "../assets/images/sale6.jpg";
import sale7 from "../assets/images/sale7.jpg";
import sale8 from "../assets/images/sale8.jpg";

const API_URL = "http://localhost:5000";

const SalePage = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);

  // ================= GET PRODUCTS FROM BACKEND =================

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

        // Sirf Sale products
        const saleProducts = products.filter(
          (product) =>
            product.category?.toLowerCase() === "sale"
        );

        // Newest product first
        saleProducts.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

        setBackendProducts(saleProducts);
      } catch (error) {
        console.error(
          "Sale Products Error:",
          error
        );
      }
    };

    fetchProducts();
  }, []);

  // ================= OLD FRONTEND PRODUCTS =================

  const oldProducts = [
    {
      id: "old-sale-1",
      name: "Embroidered Lawn Suit",
      oldPrice: 4999,
      price: 3999,
      discount: 20,
      image: sale1,
    },
    {
      id: "old-sale-2",
      name: "Printed Lawn Suit",
      oldPrice: 4499,
      price: 3499,
      discount: 22,
      image: sale2,
    },
    {
      id: "old-sale-3",
      name: "Elegant Cotton Suit",
      oldPrice: 4799,
      price: 3799,
      discount: 21,
      image: sale3,
    },
    {
      id: "old-sale-4",
      name: "Premium Lawn Suit",
      oldPrice: 5499,
      price: 4299,
      discount: 22,
      image: sale4,
    },
    {
      id: "old-sale-5",
      name: "Chiffon Sale Suit",
      oldPrice: 6499,
      price: 4999,
      discount: 23,
      image: sale5,
    },
    {
      id: "old-sale-6",
      name: "Embroidered Cotton Suit",
      oldPrice: 4999,
      price: 3999,
      discount: 20,
      image: sale6,
    },
    {
      id: "old-sale-7",
      name: "Party Wear Suit",
      oldPrice: 6999,
      price: 5499,
      discount: 21,
      image: sale7,
    },
    {
      id: "old-sale-8",
      name: "Festive Sale Suit",
      oldPrice: 7999,
      price: 5999,
      discount: 25,
      image: sale8,
    },
  ];

  // ================= CONVERT BACKEND PRODUCTS =================

  const newProducts = backendProducts.map(
    (product) => {
      let discount = product.discount || 0;

      let oldPrice =
        product.oldPrice ||
        (discount
          ? Math.round(
              product.price /
                (1 - discount / 100)
            )
          : product.price);

      return {
        ...product,

        // ProductCard ke liye id
        id: product._id,

        // Backend images mein se first image
        image:
          product.images &&
          product.images.length > 0
            ? product.images[0]
            : "",

        oldPrice,
        discount,
      };
    }
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
    <section className="bg-[#f5eee4] min-h-screen">

      {/* ================= SALE HERO ================= */}

      <div className="bg-[#17110d] text-[#f5eee4] py-16 md:py-20 px-6 text-center relative overflow-hidden">

        <p className="absolute left-5 top-10 text-[#b18442]/20 text-6xl md:text-8xl font-serif">
          SALE
        </p>

        <p className="absolute right-5 bottom-0 text-[#b18442]/20 text-6xl md:text-8xl font-serif">
          SALE
        </p>

        <div className="relative z-10">

          <p className="text-[#b18442] text-xs uppercase tracking-[0.35em]">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-5xl md:text-7xl mt-3 tracking-wide">
            SALE
          </h1>

          <div className="flex items-center justify-center gap-4 mt-4">

            <div className="w-12 h-[1px] bg-[#b18442]"></div>

            <p className="text-[#f5eee4]/70 text-sm uppercase tracking-[0.25em]">
              Up To 25% Off
            </p>

            <div className="w-12 h-[1px] bg-[#b18442]"></div>

          </div>

          <p className="text-[#f5eee4]/60 text-sm md:text-base mt-5 max-w-lg mx-auto">
            Discover your favorite styles at exclusive sale prices.
            Limited time only.
          </p>

          <div className="mt-6 inline-block border border-[#b18442] px-7 py-3 text-[#b18442] text-xs uppercase tracking-widest">
            Limited Time Offer
          </div>

        </div>

      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="max-w-7xl mx-auto py-14 px-6 md:px-10">

        {/* Top Bar */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <p className="text-[#b18442] text-xs uppercase tracking-widest">
              Special Prices
            </p>

            <p className="text-sm text-[#75695e] mt-1">
              {allProducts.length} Sale Products
            </p>

          </div>

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
              text-[#17110d]
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

        {/* Product Grid */}

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

            <div
              key={product.id}
              className="relative"
            >

              {/* SALE BADGE */}

              <div
                className="
                  absolute
                  top-3
                  left-3
                  z-10
                  bg-[#8f1d14]
                  text-white
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  shadow-md
                "
              >
                SALE
                {product.discount
                  ? ` -${product.discount}%`
                  : ""}
              </div>

              {/* Product Card */}

              <ProductCard
                product={product}
              />

            </div>

          ))}

        </div>

        {/* Bottom Sale Message */}

        <div className="text-center mt-16 border-t border-[#d8cec1] pt-10">

          <p className="text-[#b18442] text-xs uppercase tracking-[0.3em]">
            Don't Miss Out
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-[#17110d] mt-2">
            Your Favorite Styles, Now On Sale
          </h2>

          <p className="text-[#75695e] text-sm mt-2">
            Shop before your favorite pieces sell out.
          </p>

        </div>

      </div>

    </section>
  );
};

export default SalePage;
