import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  PlusCircle,
  Edit,
  Trash2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

// VITE_API_URL = http://localhost:5000/api
// Static images ke liye /api remove karna hoga
const SERVER_URL = API_URL.replace(/\/api\/?$/, "");

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // IMPORTANT:
      // API_URL already contains /api
      // So endpoint will be:
      // http://localhost:5000/api/products

      const response = await fetch(`${API_URL}/products`);

      const data = await response.json();

      console.log("PRODUCTS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products"
        );
      }

      const productList = Array.isArray(data)
        ? data
        : data.products || [];

      setProducts(productList);
    } catch (error) {
      console.error("Products fetch error:", error);

      setError(
        error.message || "Unable to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================================
  // IMAGE
  // =====================================================

  const getImage = (product) => {
    let image =
      product.image ||
      product.images?.[0] ||
      "";

    // No image
    if (!image) {
      return "/placeholder.jpg";
    }

    // Full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // If backend returns /uploads/...
    if (image.startsWith("/")) {
      return `${SERVER_URL}${image}`;
    }

    // If backend returns uploads/...
    return `${SERVER_URL}/${image}`;
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(id);
      setError("");

      const token = localStorage.getItem(
        "adeeka_admin_token"
      );

      // IMPORTANT:
      // API_URL already has /api
      // Result:
      // http://localhost:5000/api/products/:id

      const response = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("DELETE PRODUCT RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setProducts((prev) =>
        prev.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.message ||
          "Unable to delete product"
      );
    } finally {
      setDeleting(null);
    }
  };

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString();
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f3ed] px-5 py-8 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <span className="w-7 h-[1px] bg-[#b18442]" />

              <p className="text-[10px] uppercase tracking-[3px] text-[#b18442]">
                Adeeka Fabrics
              </p>

            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#17110d]">
              Manage Products
            </h1>

            <p className="text-sm text-[#75695e] mt-2">
              View, edit and manage all your store products.
            </p>

          </div>

          <div className="flex gap-3">

            {/* REFRESH */}

            <button
              onClick={fetchProducts}
              disabled={loading}
              className="
                inline-flex
                items-center
                gap-2
                border
                border-[#d8cec1]
                bg-white
                px-4
                py-3
                text-xs
                uppercase
                tracking-widest
                text-[#17110d]
                hover:border-[#b18442]
                transition
                disabled:opacity-50
              "
            >

              <RefreshCw
                size={16}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh

            </button>

            {/* ADD PRODUCT */}

            <Link
              to="/admin/add-product"
              className="
                inline-flex
                items-center
                gap-2
                bg-[#17110d]
                text-[#f7f3ed]
                px-5
                py-3
                text-xs
                uppercase
                tracking-widest
                hover:bg-[#b18442]
                transition
              "
            >

              <PlusCircle size={16} />

              Add Product

            </Link>

          </div>

        </div>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div className="
            mb-6
            bg-red-50
            border
            border-red-200
            text-red-700
            px-5
            py-4
            text-sm
          ">
            <p className="font-medium">
              Unable to load products
            </p>

            <p className="text-xs mt-1">
              {error}
            </p>
          </div>
        )}

        {/* ================================================= */}
        {/* PRODUCT COUNT */}
        {/* ================================================= */}

        <div className="bg-white border border-[#e5ddd2] p-5 mb-6">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-[#f5eee4] flex items-center justify-center">

              <Package
                size={20}
                className="text-[#b18442]"
              />

            </div>

            <div>

              <p className="text-[10px] uppercase tracking-[2px] text-[#75695e]">
                Total Products
              </p>

              <p className="font-serif text-2xl text-[#17110d]">
                {products.length}
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading ? (

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <div
              className="
                w-10
                h-10
                border-2
                border-[#d8c3a5]
                border-t-[#b18442]
                rounded-full
                animate-spin
                mx-auto
              "
            />

            <p className="text-sm text-[#75695e] mt-4">
              Loading products...
            </p>

          </div>

        ) : products.length === 0 ? (

          /* ================================================= */
          /* EMPTY */
          /* ================================================= */

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <Package
              size={40}
              className="mx-auto text-[#b18442]"
            />

            <h2 className="font-serif text-2xl text-[#17110d] mt-5">
              No Products Found
            </h2>

            <p className="text-sm text-[#75695e] mt-2">
              Add your first product to your store.
            </p>

            <Link
              to="/admin/add-product"
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                bg-[#17110d]
                text-white
                px-5
                py-3
                text-xs
                uppercase
                tracking-widest
                hover:bg-[#b18442]
                transition
              "
            >

              <PlusCircle size={16} />

              Add Product

            </Link>

          </div>

        ) : (

          /* ================================================= */
          /* PRODUCTS TABLE */
          /* ================================================= */

          <div className="bg-white border border-[#e5ddd2] overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>

                  <tr className="bg-[#faf8f4] border-b border-[#e5ddd2]">

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Product
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Price
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Stock
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr
                      key={product._id}
                      className="
                        border-b
                        border-[#eee8df]
                        last:border-0
                        hover:bg-[#faf8f4]
                        transition
                      "
                    >

                      {/* PRODUCT */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-4">

                          <img
                            src={getImage(product)}
                            alt={product.name || "Product"}
                            onError={(e) => {
                              if (
                                e.currentTarget.src.includes(
                                  "placeholder.jpg"
                                )
                              ) {
                                return;
                              }

                              e.currentTarget.src =
                                "/placeholder.jpg";
                            }}
                            className="
                              w-14
                              h-16
                              object-cover
                              bg-[#f5eee4]
                            "
                          />

                          <div>

                            <p className="text-sm font-medium text-[#17110d]">
                              {product.name || "Unnamed Product"}
                            </p>

                            <p className="text-[11px] text-[#75695e] mt-1">
                              ID:{" "}
                              {product._id?.slice(-8) || "-"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-6 py-4">

                        <span
                          className="
                            inline-flex
                            px-3
                            py-1.5
                            bg-[#f5eee4]
                            text-[10px]
                            uppercase
                            tracking-wider
                            text-[#75695e]
                          "
                        >
                          {product.category || "-"}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td className="px-6 py-4">

                        <span className="text-sm font-medium text-[#b18442]">
                          PKR{" "}
                          {formatPrice(product.price)}
                        </span>

                      </td>

                      {/* STOCK */}

                      <td className="px-6 py-4">

                        <span
                          className={`text-sm ${
                            Number(
                              product.stock ??
                                product.quantity ??
                                0
                            ) <= 0
                              ? "text-red-500"
                              : "text-[#75695e]"
                          }`}
                        >
                          {product.stock ??
                            product.quantity ??
                            0}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`
                            inline-flex
                            px-3
                            py-1.5
                            text-[10px]
                            uppercase
                            tracking-wider
                            ${
                              Number(
                                product.stock ??
                                  product.quantity ??
                                  0
                              ) > 0
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                            }
                          `}
                        >
                          {Number(
                            product.stock ??
                              product.quantity ??
                              0
                          ) > 0
                            ? "Active"
                            : "Out of Stock"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-end gap-2">

                          {/* EDIT */}

                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="
                              w-9
                              h-9
                              flex
                              items-center
                              justify-center
                              border
                              border-[#e5ddd2]
                              text-[#75695e]
                              hover:border-[#b18442]
                              hover:text-[#b18442]
                              transition
                            "
                            title="Edit Product"
                          >

                            <Edit size={16} />

                          </Link>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteProduct(
                                product._id
                              )
                            }
                            disabled={
                              deleting === product._id
                            }
                            className="
                              w-9
                              h-9
                              flex
                              items-center
                              justify-center
                              border
                              border-[#e5ddd2]
                              text-[#75695e]
                              hover:border-red-400
                              hover:text-red-500
                              transition
                              disabled:opacity-50
                            "
                            title="Delete Product"
                          >

                            {deleting ===
                            product._id ? (

                              <RefreshCw
                                size={16}
                                className="animate-spin"
                              />

                            ) : (

                              <Trash2 size={16} />

                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <Link
          to="/admin/dashboard"
          className="
            inline-flex
            items-center
            gap-2
            mt-6
            text-xs
            uppercase
            tracking-widest
            text-[#75695e]
            hover:text-[#b18442]
            transition
          "
        >

          <ArrowLeft size={15} />

          Back to Dashboard

        </Link>

      </div>
    </div>
  );
};

export default ManageProducts;