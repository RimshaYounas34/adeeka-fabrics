import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();

  // =====================================================
  // PRODUCT ID
  // =====================================================

  const productId = product?._id || product?.id;

  const isWishlisted = wishlist.some(
    (item) => (item?._id || item?.id) === productId
  );

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getImage = () => {
    // ===================================================
    // 1. IMAGES ARRAY
    // ===================================================

    if (
      Array.isArray(product?.images) &&
      product.images.length > 0 &&
      product.images[0]
    ) {
      const image = product.images[0];

      // Frontend imported image
      // Example: /src/assets/images/best1.jpg
      if (
        image.startsWith("/") &&
        !image.startsWith("/uploads")
      ) {
        return image;
      }

      // Full backend/cloud URL
      if (
        image.startsWith("http://") ||
        image.startsWith("https://")
      ) {
        return image;
      }

      // Backend uploaded image
      if (image.startsWith("/")) {
        return `${API_URL}${image}`;
      }

      // Backend image without /
      return `${API_URL}/${image}`;
    }

    // ===================================================
    // 2. SINGLE IMAGE PROPERTY
    // ===================================================

    if (product?.image) {
      return product.image;
    }

    // ===================================================
    // 3. FALLBACK
    // ===================================================

    return "/placeholder.jpg";
  };

  const image = getImage();

  // =====================================================
  // BADGE
  // =====================================================

  const getBadge = () => {
    if (
      product?.isSale ||
      product?.category === "sale"
    ) {
      return "Sale";
    }

    if (product?.isNewArrival) {
      return "New";
    }

    if (product?.isBestSeller) {
      return "Best Seller";
    }

    return null;
  };

  const badge = getBadge();

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition
      "
    >

      {/* ================================================= */}
      {/* IMAGE */}
      {/* ================================================= */}

      <div
        className="
          relative
          aspect-[3/4]
          overflow-hidden
          bg-[#f5eee4]
        "
      >

        <img
          src={image}
          alt={product?.name || "Product"}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition
            duration-500
          "
          onError={(e) => {
            if (
              e.currentTarget.src !==
              window.location.origin + "/placeholder.jpg"
            ) {
              e.currentTarget.src = "/placeholder.jpg";
            }
          }}
        />

        {/* ================================================= */}
        {/* BADGE */}
        {/* ================================================= */}

        {badge && (
          <span
            className="
              absolute
              top-3
              left-3
              bg-[#17110d]
              text-[#f5eee4]
              text-[10px]
              uppercase
              tracking-widest
              px-3
              py-1.5
              rounded-full
            "
          >
            {badge}
          </span>
        )}

        {/* ================================================= */}
        {/* WISHLIST */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() =>
            toggleWishlist(product)
          }
          className="
            absolute
            top-3
            right-3
            w-9
            h-9
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            shadow-md
            hover:scale-105
            transition
          "
        >

          <Heart
            size={17}
            className={
              isWishlisted
                ? "fill-[#b18442] text-[#b18442]"
                : "text-[#17110d]"
            }
          />

        </button>

        {/* ================================================= */}
        {/* ADD TO BAG */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={() =>
            addToCart(product)
          }
          className="
            absolute
            bottom-3
            left-3
            right-3
            bg-[#17110d]
            text-[#f5eee4]
            py-3
            rounded-xl
            text-xs
            uppercase
            tracking-widest
            flex
            items-center
            justify-center
            gap-2
            opacity-0
            group-hover:opacity-100
            transition
            duration-300
            hover:bg-[#b18442]
          "
        >

          <ShoppingBag size={15} />

          Add to Bag

        </button>

      </div>

      {/* ================================================= */}
      {/* PRODUCT INFO */}
      {/* ================================================= */}

      <div className="p-4">

        <h3
          className="
            font-serif
            text-base
            md:text-lg
            text-[#17110d]
          "
        >
          {product?.name}
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
            product?.price || 0
          ).toLocaleString()}
        </p>

      </div>

    </motion.div>
  );
};

export default ProductCard;