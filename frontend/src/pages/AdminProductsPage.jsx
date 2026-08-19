import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ArrowLeft,
  Package,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const AdminProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/products`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Products fetch failed");
      }

      const productList = Array.isArray(data)
        ? data
        : data.products || [];

      setProducts(productList);

    } catch (error) {
      console.error("Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE PRODUCT =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem(
        "adeeka_admin_token"
      );

      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");

    } catch (error) {
      console.error("Delete Error:", error);
      alert("Product delete nahi ho saka");
    }
  };

  // ================= IMAGE =================

  const getImage = (product) => {
    const image =
      product.image ||
      product.images?.[0] ||
      "";

    if (!image) {
      return "/placeholder.jpg";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f3ed] px-5 py-8 md:px-10">

      {/* ================= HEADER ================= */}

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-xs text-[#75695e] hover:text-[#b18442] transition mb-4"
            >
              <ArrowLeft size={15} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-2">

              <span className="w-7 h-[1px] bg-[#b18442]" />

              <p className="text-[10px] uppercase tracking-[3px] text-[#b18442]">
                Adeeka Fabrics
              </p>

            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-[#17110d] mt-2">
              Manage Products
            </h1>

            <p className="text-sm text-[#75695e] mt-2">
              Add, edit and manage your store products.
            </p>

          </div>

          <Link
            to="/admin/add-product"
            className="
              inline-flex
              items-center
              justify-center
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
            <PlusCircle size={17} />
            Add Product
          </Link>

        </div>

        {/* ================= PRODUCTS COUNT ================= */}

        <div className="bg-white border border-[#e5ddd2] px-5 py-4 mb-6">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-[#f5eee4] flex items-center justify-center">
              <Package
                size={19}
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

        {/* ================= LOADING ================= */}

        {loading ? (

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <div className="w-10 h-10 border-2 border-[#d8c3a5] border-t-[#b18442] rounded-full animate-spin mx-auto" />

            <p className="text-sm text-[#75695e] mt-4">
              Loading products...
            </p>

          </div>

        ) : products.length === 0 ? (

          /* ================= EMPTY ================= */

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <Package
              size={40}
              className="mx-auto text-[#b18442]"
            />

            <h2 className="font-serif text-2xl text-[#17110d] mt-5">
              No Products Found
            </h2>

            <p className="text-sm text-[#75695e] mt-2">
              Start by adding your first product.
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
                px-6
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

          /* ================= PRODUCTS TABLE ================= */

          <div className="bg-white border border-[#e5ddd2] overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

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
                      Best Seller
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
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
                            alt={product.name}
                            className="w-16 h-20 object-cover bg-[#f5eee4]"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.jpg";
                            }}
                          />

                          <div>

                            <p className="text-sm font-medium text-[#17110d]">
                              {product.name}
                            </p>

                            <p className="text-[11px] text-[#75695e] mt-1">
                              ID: {product._id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-6 py-4">

                        <span className="text-xs capitalize text-[#75695e]">
                          {product.category || "-"}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td className="px-6 py-4">

                        <span className="text-sm font-medium text-[#17110d]">
                          Rs.{" "}
                          {Number(
                            product.price || 0
                          ).toLocaleString()}
                        </span>

                      </td>

                      {/* BEST SELLER */}

                      <td className="px-6 py-4">

                        {product.isBestSeller ? (

                          <span className="inline-flex px-3 py-1.5 bg-[#f5eee4] text-[#b18442] text-[10px] uppercase tracking-wider">
                            Best Seller
                          </span>

                        ) : (

                          <span className="text-xs text-[#a0968b]">
                            No
                          </span>

                        )}

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/edit-product/${product._id}`
                              )
                            }
                            className="
                              w-9
                              h-9
                              border
                              border-[#e5ddd2]
                              flex
                              items-center
                              justify-center
                              text-[#75695e]
                              hover:text-[#b18442]
                              hover:border-[#b18442]
                              transition
                            "
                            title="Edit Product"
                          >
                            <Pencil size={16} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="
                              w-9
                              h-9
                              border
                              border-[#e5ddd2]
                              flex
                              items-center
                              justify-center
                              text-[#75695e]
                              hover:text-red-600
                              hover:border-red-300
                              transition
                            "
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
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

      </div>

    </div>
  );
};

export default AdminProductsPage;