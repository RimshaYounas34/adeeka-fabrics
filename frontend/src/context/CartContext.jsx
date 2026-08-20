
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const API_URL = import.meta.env.VITE_API_URL;

// =====================================================
// CART PROVIDER
// =====================================================

export const CartProvider = ({ children }) => {
  // =====================================================
  // CART
  // =====================================================

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("adeeka_cart");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Cart localStorage error:", error);

      return [];
    }
  });

  // =====================================================
  // WISHLIST
  // =====================================================

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved =
        localStorage.getItem("adeeka_wishlist");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error(
        "Wishlist localStorage error:",
        error
      );

      return [];
    }
  });

  // =====================================================
  // STATES
  // =====================================================

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [toast, setToast] = useState(null);

  // =====================================================
  // SAVE CART
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "adeeka_cart",
      JSON.stringify(items)
    );
  }, [items]);

  // =====================================================
  // SAVE WISHLIST
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "adeeka_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // =====================================================
  // TOAST
  // =====================================================

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

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
    if (!product) {
      return "/placeholder.jpg";
    }

    let image =
      product.image ||
      (Array.isArray(product.images)
        ? product.images[0]
        : "");

    if (!image) {
      return "/placeholder.jpg";
    }

    image = String(image);

    // =================================================
    // 1. CLOUDINARY / COMPLETE URL
    // =================================================

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // =================================================
    // 2. FRONTEND VITE IMAGE
    // =================================================

    if (
      image.startsWith("/src/") ||
      image.startsWith("/assets/")
    ) {
      return image;
    }

    // =================================================
    // 3. BACKEND UPLOAD IMAGE
    // =================================================

    if (
      image.startsWith("/uploads/") ||
      image.startsWith("/images/") ||
      image.startsWith("/products/")
    ) {
      return `${API_URL}${image}`;
    }

    // =================================================
    // 4. API PATH
    // =================================================

    if (image.startsWith("/api/")) {
      return `${API_URL}${image}`;
    }

    // =================================================
    // 5. LOCAL FRONTEND PATH
    // =================================================

    if (image.startsWith("/")) {
      return image;
    }

    // =================================================
    // 6. BACKEND PATH WITHOUT /
    // =================================================

    if (
      image.includes("uploads/") ||
      image.includes("images/") ||
      image.includes("products/")
    ) {
      return `${API_URL}/${image}`;
    }

    // =================================================
    // 7. CLOUDINARY OR OTHER URL
    // =================================================

    return image;
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {
    const productId = getProductId(product);

    const productImage =
      getProductImage(product);

    console.log(
      "ADDING PRODUCT TO CART:",
      product
    );

    console.log(
      "CART IMAGE:",
      productImage
    );

    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          (item._id || item.id) === productId
      );

      // =================================================
      // ALREADY IN CART
      // =================================================

      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === productId
            ? {
                ...item,

                qty: (item.qty || 0) + 1,

                image:
                  item.image &&
                  item.image !==
                    "/placeholder.jpg"
                    ? item.image
                    : productImage,

                images:
                  item.images &&
                  item.images.length > 0
                    ? item.images
                    : [productImage],
              }
            : item
        );
      }

      // =================================================
      // NEW PRODUCT
      // =================================================

      return [
        ...prev,

        {
          ...product,

          id: productId,

          _id: productId,

          image: productImage,

          images: [productImage],

          qty: 1,
        },
      ];
    });

    showToast(
      `${product.name} added to bag`
    );

    setIsCartOpen(true);
  };

  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = (id) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          (item._id || item.id) !== id
      )
    );
  };

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id
          ? {
              ...item,

              qty: Math.max(
                1,
                Number(qty)
              ),
            }
          : item
      )
    );
  };

  // =====================================================
  // CLEAR CART
  // IMPORTANT:
  // Checkout successful hone ke baad
  // ye function cart ko completely empty karega.
  // =====================================================

  const clearCart = () => {
    setItems([]);

    localStorage.removeItem(
      "adeeka_cart"
    );

    setIsCartOpen(false);

    console.log(
      "Cart cleared after successful checkout"
    );
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = (product) => {
    const productId =
      getProductId(product);

    const productImage =
      getProductImage(product);

    setWishlist((prev) => {
      const exists = prev.some(
        (item) =>
          (item._id || item.id) ===
          productId
      );

      // =================================================
      // REMOVE FROM WISHLIST
      // =================================================

      if (exists) {
        showToast(
          `${product.name} removed from wishlist`
        );

        return prev.filter(
          (item) =>
            (item._id || item.id) !==
            productId
        );
      }

      // =================================================
      // ADD TO WISHLIST
      // =================================================

      showToast(
        `${product.name} added to wishlist`
      );

      return [
        ...prev,

        {
          ...product,

          id: productId,

          _id: productId,

          image: productImage,

          images: [productImage],
        },
      ];
    });
  };

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = items.reduce(
    (total, item) =>
      total + (item.qty || 0),
    0
  );

  // =====================================================
  // CART TOTAL
  // =====================================================

  const cartTotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        (item.qty || 0),
    0
  );

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <CartContext.Provider
      value={{
        // =================================================
        // CART
        // =================================================

        items,

        addToCart,

        removeFromCart,

        updateQty,

        clearCart,

        cartCount,

        cartTotal,

        // =================================================
        // CART DRAWER
        // =================================================

        isCartOpen,

        setIsCartOpen,

        // =================================================
        // WISHLIST
        // =================================================

        wishlist,

        toggleWishlist,

        // =================================================
        // TOAST
        // =================================================

        toast,

        // =================================================
        // IMAGE HELPER
        // =================================================

        getProductImage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
