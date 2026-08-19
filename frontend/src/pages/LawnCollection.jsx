import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import lawn1 from "../assets/images/lawn1.jpg";
import lawn2 from "../assets/images/lawn2.jpg";
import lawn3 from "../assets/images/lawn3.jpg";
import lawn4 from "../assets/images/lawn4.jpg";
import lawn5 from "../assets/images/lawn5.jpg";
import lawn6 from "../assets/images/lawn6.jpg";
import lawn7 from "../assets/images/lawn7.jpg";
import lawn8 from "../assets/images/lawn8.jpg";

const API_URL = "http://localhost:5000";

const LawnCollection = () => {
  const [sort, setSort] = useState("");
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET LAWN PRODUCTS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

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
        // ONLY LAWN PRODUCTS
        // =================================================
        //
        // Backend mein Lawn ko collectionName mein
        // "lawn" rakhna hai.
        //

        const lawnProducts = products.filter(
          (product) =>
            product.collectionName?.toLowerCase().trim() ===
            "lawn"
        );

        // =================================================
        // NEWEST PRODUCTS FIRST
        // =================================================

        lawnProducts.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setBackendProducts(lawnProducts);

      } catch (error) {
        console.error(
          "Lawn Products Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // DUMMY LAWN PRODUCTS
  // =====================================================

  const oldProducts = [
    {
      id: "old-lawn-1",
      name: "Embroidered Lawn Suit",
      price: 4999,
      image: lawn1,
      category: "unstitched",
      collectionName: "lawn",
      badge: "New Arrival",
    },
    {
      id: "old-lawn-2",
      name: "Printed Lawn 2 Piece",
      price: 3999,
      image: lawn2,
      category: "unstitched",
      collectionName: "lawn",
      badge: "Bestseller",
    },
    {
      id: "old-lawn-3",
      name: "Luxury Lawn Suit",
      price: 5999,
      image: lawn3,
      category: "unstitched",
      collectionName: "lawn",
      badge: "",
    },
    {
      id: "old-lawn-4",
      name: "Floral Lawn Collection",
      price: 4499,
      image: lawn4,
      category: "unstitched",
      collectionName: "lawn",
      badge: "New Arrival",
    },
    {
      id: "old-lawn-5",
      name: "Elegant Lawn 3 Piece",
      price: 5499,
      image: lawn5,
      category: "unstitched",
      collectionName: "lawn",
      badge: "",
    },
    {
      id: "old-lawn-6",
      name: "Premium Lawn Dress",
      price: 6299,
      image: lawn6,
      category: "unstitched",
      collectionName: "lawn",
      badge: "Bestseller",
    },
    {
      id: "old-lawn-7",
      name: "Classic Lawn Embroidery",
      price: 4799,
      image: lawn7,
      category: "unstitched",
      collectionName: "lawn",
      badge: "New Arrival",
    },
    {
      id: "old-lawn-8",
      name: "Elegant Printed Lawn",
      price: 4299,
      image: lawn8,
      category: "unstitched",
      collectionName: "lawn",
      badge: "",
    },
  ];

  // =====================================================
  // CONVERT BACKEND PRODUCTS
  // =====================================================

  const newProducts = backendProducts.map(
    (product) => {
      let productImage = "";

      if (
        product.images &&
        product.images.length > 0
      ) {
        const image = product.images[0];

        // Complete URL
        if (
          image.startsWith("http://") ||
          image.startsWith("https://")
        ) {
          productImage = image;
        }

        // /uploads/image.jpg
        else if (image.startsWith("/")) {
          productImage = `${API_URL}${image}`;
        }

        // uploads/image.jpg
        else {
          productImage = `${API_URL}/${image}`;
        }
      }

      return {
        ...product,

        // ProductCard ke liye ID
        id: product._id,

        // Backend image
        image: productImage,

        // Collection
        collectionName: "lawn",

        // Badge
        badge: product.isNewArrival
          ? "New Arrival"
          : product.isBestSeller
          ? "Bestseller"
          : product.isSale
          ? "Sale"
          : "",
      };
    }
  );

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
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    );
  }

  if (sort === "high") {
    allProducts.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="bg-[#f5eee4] min-h-screen py-14 px-6 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-10">

          {/* BACK */}

          <div className="text-left mb-8">

            <Link
              to="/collections"
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                uppercase
                tracking-widest
                text-[#75695e]
                hover:text-[#b18442]
                transition
              "
            >
              <ArrowLeft size={16} />

              Back to Collections
            </Link>

          </div>

          <p className="text-[#b18442] text-xs uppercase tracking-widest">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
            Lawn Collection
          </h1>

          <p className="text-[#75695e] text-sm mt-3">
            Discover our beautiful Lawn Collection
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4" />

        </div>

        {/* =================================================
            SORT BAR
        ================================================= */}

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

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="text-center py-10">

            <p className="text-sm text-[#75695e]">
              Loading lawn products...
            </p>

          </div>

        )}

        {/* =================================================
            PRODUCTS
        ================================================= */}

        {!loading &&
          allProducts.length > 0 && (

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-5
              "
            >

              {allProducts.map(
                (product, index) => (

                  <ProductCard
                    key={
                      product._id ||
                      product.id ||
                      `lawn-${index}`
                    }
                    product={product}
                  />

                )
              )}

            </div>

          )}

        {/* =================================================
            NO PRODUCTS
        ================================================= */}

        {!loading &&
          allProducts.length === 0 && (

            <div className="text-center py-20">

              <p className="font-serif text-2xl text-[#17110d]">
                No Lawn Products Found
              </p>

              <p className="text-sm text-[#75695e] mt-2">
                Lawn products will appear here.
              </p>

            </div>

          )}

      </div>

    </section>
  );
};

export default LawnCollection;