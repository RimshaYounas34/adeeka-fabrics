import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

// ================= BEST SELLER IMAGES =================

import best1 from "../assets/images/best1.jpg";
import best2 from "../assets/images/best2.jpg";
import best3 from "../assets/images/best3.jpg";
import best4 from "../assets/images/best4.jpg";
import best5 from "../assets/images/best5.jpg";
import best6 from "../assets/images/best6.jpg";
import best7 from "../assets/images/best7.jpg";
import best8 from "../assets/images/best8.jpg";

// ================= API =================

const API_URL = "http://localhost:5000";

// =====================================================
// BEST SELLERS PAGE
// =====================================================

const BestSellersPage = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // DUMMY PRODUCTS
  // =====================================================

  const dummyProducts = [
    {
      _id: "dummy-best-1",
      name: "Embroidered Lawn Suit",
      price: 4499,
      image: best1,
      images: [best1],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-2",
      name: "Elegant Printed Suit",
      price: 3999,
      image: best2,
      images: [best2],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-3",
      name: "Luxury Embroidered Dress",
      price: 5999,
      image: best3,
      images: [best3],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-4",
      name: "Premium Pret Suit",
      price: 4999,
      image: best4,
      images: [best4],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-5",
      name: "Formal Collection",
      price: 6999,
      image: best5,
      images: [best5],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-6",
      name: "Luxury Chiffon Suit",
      price: 6499,
      image: best6,
      images: [best6],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-7",
      name: "Premium Silk Dress",
      price: 7499,
      image: best7,
      images: [best7],
      isBestSeller: true,
    },

    {
      _id: "dummy-best-8",
      name: "Elegant Party Wear",
      price: 7999,
      image: best8,
      images: [best8],
      isBestSeller: true,
    },
  ];

  // =====================================================
  // FETCH BACKEND PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/products`
        );

        if (!response.ok) {
          throw new Error(
            "Backend products fetch failed"
          );
        }

        const data = await response.json();

        console.log(
          "ALL BACKEND PRODUCTS:",
          data
        );

        const products = Array.isArray(data)
          ? data
          : data.products || [];

        // =================================================
        // ONLY BEST SELLERS
        // =================================================

        const bestSellers = products.filter(
          (product) =>
            product.isBestSeller === true ||
            product.isBestSeller === "true" ||
            product.isBestSeller === 1
        );

        console.log(
          "BACKEND BEST SELLERS:",
          bestSellers
        );

        // =================================================
        // FORMAT BACKEND IMAGES
        // =================================================

        const formattedProducts =
          bestSellers.map((product) => {
            const images = (
              product.images || []
            ).map((image) => {
              if (!image) {
                return "";
              }

              // Full URL
              if (
                image.startsWith("http://") ||
                image.startsWith("https://")
              ) {
                return image;
              }

              // Backend image
              return `${API_URL}${
                image.startsWith("/")
                  ? ""
                  : "/"
              }${image}`;
            });

            return {
              ...product,
              _id: product._id,
              images: images,
              image: images[0] || "",
            };
          });

        setBackendProducts(
          formattedProducts
        );
      } catch (error) {
        console.log(
          "Backend unavailable. Showing dummy products."
        );

        console.error(error);

        setBackendProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // BACKEND + DUMMY
  // =====================================================

  let allProducts = [
    ...backendProducts,
    ...dummyProducts,
  ];

  // =====================================================
  // SORT LOW TO HIGH
  // =====================================================

  if (sort === "low") {
    allProducts = [...allProducts].sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );
  }

  // =====================================================
  // SORT HIGH TO LOW
  // =====================================================

  if (sort === "high") {
    allProducts = [...allProducts].sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="min-h-screen bg-[#f5eee4] py-14 px-6 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="text-center mb-10">

          <p className="text-[#b18442] text-xs uppercase tracking-[3px]">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-3">
            Best Sellers
          </h1>

          <p className="text-[#75695e] text-sm mt-3 max-w-xl mx-auto">
            Discover the most loved styles from
            our customers.
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-5" />

        </div>

        {/* ================================================= */}
        {/* SORT */}
        {/* ================================================= */}

        <div className="flex items-center justify-between mb-8">

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
              text-[#17110d]
              outline-none
              focus:border-[#b18442]
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
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <div className="text-center py-6">

            <p className="text-sm text-[#75695e]">
              Loading products...
            </p>

          </div>
        )}

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
              key={product._id}
              product={{
                ...product,

                _id: product._id,

                image:
                  product.image ||
                  product.images?.[0] ||
                  "",

                images:
                  product.images &&
                  product.images.length > 0
                    ? product.images
                    : product.image
                    ? [product.image]
                    : [],
              }}
            />

          ))}

        </div>

        {/* ================================================= */}
        {/* EMPTY */}
        {/* ================================================= */}

        {!loading &&
          allProducts.length === 0 && (

            <div className="text-center py-20">

              <p className="font-serif text-2xl text-[#17110d]">
                No Best Sellers Found
              </p>

              <p className="text-sm text-[#75695e] mt-2">
                New best seller products will
                appear here.
              </p>

            </div>

          )}

      </div>

    </section>
  );
};

export default BestSellersPage;