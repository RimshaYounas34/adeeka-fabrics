import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const SearchBar = ({ products = [], onClose }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =====================================================
  // GET PRODUCT ID
  // =====================================================

  const getProductId = (product) => {
    return product?._id || product?.id;
  };

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getProductImage = (product) => {
    let image =
      product?.image ||
      product?.images?.[0] ||
      "";

    if (!image) {
      return "/placeholder.jpg";
    }

    image = String(image);

    // Already full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // Frontend Vite image
    if (
      image.startsWith("/src/") ||
      image.startsWith("/assets/")
    ) {
      return image;
    }

    // Backend uploads
    if (
      image.startsWith("/uploads/") ||
      image.startsWith("/images/") ||
      image.startsWith("/products/")
    ) {
      return `${API_URL}${image}`;
    }

    // Other absolute paths
    if (image.startsWith("/")) {
      return image;
    }

    // Backend relative path
    return `${API_URL}/${image}`;
  };

  // =====================================================
  // SEARCH PRODUCTS
  // =====================================================

  const searchText = search.trim().toLowerCase();

  const filteredProducts =
    searchText === ""
      ? []
      : products.filter((product) => {
          const name =
            product.name?.toLowerCase() || "";

          const category =
            product.category?.toLowerCase() || "";

          const fabric =
            product.fabric?.toLowerCase() || "";

          const collection =
            product.collectionName?.toLowerCase() || "";

          const slug =
            product.slug?.toLowerCase() || "";

          return (
            name.includes(searchText) ||
            category.includes(searchText) ||
            fabric.includes(searchText) ||
            collection.includes(searchText) ||
            slug.includes(searchText)
          );
        });

  // =====================================================
  // PRODUCT CLICK
  // =====================================================

  const handleProductClick = (product) => {
    const productId = getProductId(product);

    if (!productId) {
      console.error(
        "Product ID missing:",
        product
      );
      return;
    }

    navigate(`/product-details/${productId}`);

    if (onClose) {
      onClose();
    }
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    setSearch("");

    if (onClose) {
      onClose();
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="fixed inset-0 z-[100] bg-black/50">

      {/* ================================================= */}
      {/* SEARCH CONTAINER */}
      {/* ================================================= */}

      <div className="bg-[#f5eee4] text-[#17110d] w-full p-6">

        {/* ================================================= */}
        {/* SEARCH HEADER */}
        {/* ================================================= */}

        <div className="max-w-6xl mx-auto flex items-center gap-4">

          <Search size={22} />

          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-lg
              border-b
              border-[#17110d]
              py-2
            "
          />

          {/* CLOSE */}

          <button
            type="button"
            onClick={handleClose}
            className="
              hover:text-[#b18442]
              transition
            "
            aria-label="Close Search"
          >
            <X size={25} />
          </button>

        </div>

        {/* ================================================= */}
        {/* SEARCH RESULTS */}
        {/* ================================================= */}

        {searchText !== "" && (

          <div className="max-w-6xl mx-auto mt-6">

            {/* RESULT COUNT */}

            <div className="mb-5">

              <p className="text-sm text-[#75695e]">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}{" "}
                found
              </p>

            </div>

            {/* ================================================= */}
            {/* PRODUCTS */}
            {/* ================================================= */}

            {filteredProducts.length > 0 ? (

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-5
                  gap-5
                  max-h-[70vh]
                  overflow-y-auto
                  pr-2
                "
              >

                {filteredProducts.map(
                  (product) => {

                    const productId =
                      getProductId(product);

                    const image =
                      getProductImage(product);

                    return (

                      <div
                        key={productId}
                        onClick={() =>
                          handleProductClick(
                            product
                          )
                        }
                        className="
                          cursor-pointer
                          group
                          bg-white
                          overflow-hidden
                        "
                      >

                        {/* IMAGE */}

                        <div
                          className="
                            overflow-hidden
                            aspect-[3/4]
                            bg-[#eee5d8]
                          "
                        >

                          <img
                            src={image}
                            alt={
                              product.name ||
                              "Product"
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-105
                              transition
                              duration-300
                            "
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.jpg";
                            }}
                          />

                        </div>

                        {/* INFO */}

                        <div className="p-3">

                          <h3
                            className="
                              text-sm
                              font-medium
                              text-[#17110d]
                              line-clamp-2
                            "
                          >
                            {product.name}
                          </h3>

                          <p
                            className="
                              text-sm
                              text-[#b18442]
                              mt-2
                            "
                          >
                            PKR{" "}
                            {Number(
                              product.price || 0
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            ) : (

              /* ================================================= */
              /* NO RESULT */
              /* ================================================= */

              <div
                className="
                  text-center
                  py-12
                "
              >

                <Search
                  size={35}
                  className="
                    mx-auto
                    text-[#b18442]
                    mb-3
                  "
                />

                <p
                  className="
                    font-serif
                    text-xl
                    text-[#17110d]
                  "
                >
                  No products found
                </p>

                <p
                  className="
                    text-sm
                    text-[#75695e]
                    mt-2
                  "
                >
                  Try another product name,
                  category or fabric.
                </p>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default SearchBar;