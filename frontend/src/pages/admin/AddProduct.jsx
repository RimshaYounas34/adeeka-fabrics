import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { ArrowLeft, Plus, X, Package, Save, ImagePlus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    collectionName: "",
    description: "",
    stock: "",

    images: [],

    sizes: [],
    colors: [],

    isNewArrival: false,
    isBestSeller: false,
    isSale: false,
  });

  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // GENERATE SLUG
  // =====================================================

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e) => {
    const name = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        invalidFiles.push(`${file.name} is not an image`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} is larger than 5MB`);
        return;
      }

      validFiles.push(file);
    });

    if (invalidFiles.length > 0) {
      setMessage(`${invalidFiles.join(", ")}. Maximum image size is 5MB.`);
    } else {
      setMessage("");
    }

    if (validFiles.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));

    // Same file dobara select karne ke liye input reset
    e.target.value = "";
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // =====================================================
  // IMAGE PREVIEW URL CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      formData.images.forEach((file) => {
        if (file instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(file));
        }
      });
    };
  }, [formData.images]);

  // =====================================================
  // ADD SIZE
  // =====================================================

  const addSize = () => {
    const size = sizeInput.trim();

    if (!size) return;

    if (formData.sizes.includes(size)) {
      setSizeInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, size],
    }));

    setSizeInput("");
  };

  // =====================================================
  // REMOVE SIZE
  // =====================================================

  const removeSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((item) => item !== size),
    }));
  };

  // =====================================================
  // ADD COLOR
  // =====================================================

  const addColor = () => {
    const color = colorInput.trim();

    if (!color) return;

    if (formData.colors.includes(color)) {
      setColorInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));

    setColorInput("");
  };

  // =====================================================
  // REMOVE COLOR
  // =====================================================

  const removeColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((item) => item !== color),
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!formData.name.trim()) {
      setMessage("Product name is required.");
      return;
    }

    if (!formData.price) {
      setMessage("Product price is required.");
      return;
    }

    if (!formData.category) {
      setMessage("Please select where this product should appear.");
      return;
    }

    if (formData.images.length === 0) {
      setMessage("Please select at least one product image.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // FORM DATA
      // =================================================

      const data = new FormData();

      data.append("name", formData.name.trim());

      /*
        Slug ke end mein small unique number.
        Isse same product name ki wajah se
        duplicate slug error kam hoga.
      */

      const uniqueSlug = `${generateSlug(formData.name)}-${Date.now()}`;

      data.append("slug", uniqueSlug);

      data.append("price", formData.price);

      // IMPORTANT:
      // pret / luxury / sale / unstitched yahan jayega
      data.append("category", formData.category);

      // Collection ka naam
      data.append("collectionName", formData.collectionName.trim());

      data.append("description", formData.description.trim());

      data.append("stock", formData.stock || "0");

      data.append("sizes", JSON.stringify(formData.sizes));

      data.append("colors", JSON.stringify(formData.colors));

      data.append("isNewArrival", String(formData.isNewArrival));

      data.append("isBestSeller", String(formData.isBestSeller));

      data.append("isSale", String(formData.isSale));

      // =================================================
      // IMAGES
      // =================================================

      formData.images.forEach((file) => {
        data.append("images", file);
      });

      // =================================================
      // API REQUEST
      // =================================================

      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      console.log("ADD PRODUCT RESPONSE:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      // =================================================
      // SUCCESS
      // =================================================

      setMessage("Product added successfully! Image bhi upload ho gayi.");

      // =================================================
      // RESET FORM
      // =================================================

      setFormData({
        name: "",
        slug: "",
        price: "",
        category: "",
        collectionName: "",
        description: "",
        stock: "",
        images: [],
        sizes: [],
        colors: [],
        isNewArrival: false,
        isBestSeller: false,
        isSale: false,
      });

      setSizeInput("");
      setColorInput("");

      // =================================================
      // GO DASHBOARD
      // =================================================

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Add Product Error:", error);

      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f3ed]">
      {/* HEADER */}

      <div className="bg-white border-b border-[#e5ddd2]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#75695e] hover:text-[#b18442]"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* CONTENT */}

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        {/* TITLE */}

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-[1px] bg-[#b18442]" />

            <p className="text-[10px] uppercase tracking-[3px] text-[#b18442]">
              Product Management
            </p>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-[#17110d]">
            Add New Product
          </h1>

          <p className="text-sm text-[#75695e] mt-2">
            Add a new product to your Adeeka Fabrics store.
          </p>
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            className={`mb-6 px-5 py-4 text-sm border ${
              message.includes("successfully")
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* PRODUCT INFORMATION */}

            <div className="xl:col-span-2 bg-white border border-[#e5ddd2] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 bg-[#f5eee4] flex items-center justify-center">
                  <Package size={19} className="text-[#b18442]" />
                </div>

                <div>
                  <h2 className="font-serif text-xl text-[#17110d]">
                    Product Information
                  </h2>

                  <p className="text-xs text-[#75695e]">
                    Basic details about your product
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NAME */}

                <div className="md:col-span-2">
                  <label className="label">Product Name *</label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. Embroidered Lawn Suit"
                    className="input"
                  />
                </div>

                {/* SLUG */}

                <div>
                  <label className="label">Slug</label>

                  <input
                    type="text"
                    value={formData.slug}
                    readOnly
                    className="input bg-[#faf8f4] text-[#75695e]"
                  />
                </div>

                {/* PRICE */}

                <div>
                  <label className="label">Price (Rs.) *</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="4999"
                    min="0"
                    className="input"
                  />
                </div>

                {/* CATEGORY */}

                <div>
                  <label className="label">Store Category *</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select where product should appear</option>

                    <option value="formal">Formal</option>

                    <option value="casual">Casual</option>
                    <option value="new-arrival">New Arrival</option>

                    <option value="unstitched">Unstitched</option>

                    <option value="pret">Pret</option>

                    <option value="luxury">Luxury</option>

                    <option value="sale">Sale</option>
                  </select>
                </div>

                {/* COLLECTION */}

                <div>
                  <label className="label">Collection</label>

                  <input
                    type="text"
                    name="collectionName"
                    value={formData.collectionName}
                    onChange={handleChange}
                    placeholder="e.g. Lawn Collection"
                    className="input"
                  />
                </div>

                {/* STOCK */}

                <div>
                  <label className="label">Stock</label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="20"
                    min="0"
                    className="input"
                  />
                </div>

                {/* DESCRIPTION */}

                <div className="md:col-span-2">
                  <label className="label">Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write product description..."
                    className="input resize-none"
                  />
                </div>
              </div>
            </div>

            {/* STATUS */}

            <div className="bg-white border border-[#e5ddd2] p-6 md:p-8 h-fit">
              <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                Product Status
              </p>

              <h2 className="font-serif text-xl text-[#17110d] mt-1 mb-6">
                Store Options
              </h2>

              <div className="space-y-4">
                <label className="option">
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    checked={formData.isNewArrival}
                    onChange={handleChange}
                  />

                  <div>
                    <p className="text-sm font-medium text-[#17110d]">
                      New Arrival
                    </p>

                    <p className="text-[11px] text-[#75695e]">
                      Show in New Arrivals
                    </p>
                  </div>
                </label>

                <label className="option">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleChange}
                  />

                  <div>
                    <p className="text-sm font-medium text-[#17110d]">
                      Best Seller
                    </p>

                    <p className="text-[11px] text-[#75695e]">
                      Mark as best seller
                    </p>
                  </div>
                </label>

                <label className="option">
                  <input
                    type="checkbox"
                    name="isSale"
                    checked={formData.isSale}
                    onChange={handleChange}
                  />

                  <div>
                    <p className="text-sm font-medium text-[#17110d]">
                      On Sale
                    </p>

                    <p className="text-[11px] text-[#75695e]">
                      Show as sale product
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* IMAGES */}

            <div className="xl:col-span-2 bg-white border border-[#e5ddd2] p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                Product Media
              </p>

              <h2 className="font-serif text-xl text-[#17110d] mt-1">
                Product Images
              </h2>

              <p className="text-xs text-[#75695e] mt-1 mb-5">
                Select images directly from your computer.
              </p>

              <label
                htmlFor="product-images"
                className="border-2 border-dashed border-[#e5ddd2] hover:border-[#b18442] bg-[#faf8f4] min-h-[170px] flex flex-col items-center justify-center cursor-pointer transition"
              >
                <ImagePlus size={38} className="text-[#b18442] mb-3" />

                <p className="text-sm text-[#17110d]">
                  Click to select product images
                </p>

                <p className="text-xs text-[#75695e] mt-1">
                  JPG, PNG, WEBP • Maximum 5MB each
                </p>
              </label>

              <input
                id="product-images"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />

              {/* PREVIEW */}

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {formData.images.map((file, index) => {
                    const previewURL = URL.createObjectURL(file);

                    return (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative border border-[#e5ddd2] aspect-square overflow-hidden"
                      >
                        <img
                          src={previewURL}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 bg-white flex items-center justify-center shadow hover:bg-red-50"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SIZES & COLORS */}

            <div className="bg-white border border-[#e5ddd2] p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                Variants
              </p>

              <h2 className="font-serif text-xl text-[#17110d] mt-1 mb-6">
                Sizes & Colors
              </h2>

              {/* SIZES */}

              <label className="label">Sizes</label>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  placeholder="e.g. Medium"
                  className="input flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSize();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={addSize}
                  className="px-4 bg-[#f5eee4] text-[#b18442]"
                >
                  <Plus size={17} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-7">
                {formData.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#f5eee4] text-xs"
                  >
                    {size}

                    <button type="button" onClick={() => removeSize(size)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              {/* COLORS */}

              <label className="label">Colors</label>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="e.g. Beige"
                  className="input flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addColor();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 bg-[#f5eee4] text-[#b18442]"
                >
                  <Plus size={17} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.colors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-[#f5eee4] text-xs"
                  >
                    {color}

                    <button type="button" onClick={() => removeColor(color)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SAVE */}

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <Link
              to="/admin/dashboard"
              className="px-6 py-3 border border-[#e5ddd2] bg-white text-xs uppercase tracking-widest text-[#75695e] text-center"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#17110d] text-white text-xs uppercase tracking-widest hover:bg-[#b18442] transition disabled:opacity-50"
            >
              <Save size={17} />

              {loading ? "Uploading..." : "Save Product"}
            </button>
          </div>
        </form>
      </main>

      {/* STYLES */}

      <style>{`

        .label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #75695e;
          margin-bottom: 8px;
        }

        .input {
          width: 100%;
          border: 1px solid #e5ddd2;
          background: #fff;
          padding: 12px 14px;
          font-size: 13px;
          color: #17110d;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #b18442;
          box-shadow:
            0 0 0 2px
            rgba(177,132,66,0.08);
        }

        .option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 1px solid #e5ddd2;
          cursor: pointer;
          transition: 0.2s;
        }

        .option:hover {
          border-color: #b18442;
          background: #faf8f4;
        }

        .option input {
          width: 17px;
          height: 17px;
          accent-color: #b18442;
        }

      `}</style>
    </div>
  );
};

export default AddProduct;
