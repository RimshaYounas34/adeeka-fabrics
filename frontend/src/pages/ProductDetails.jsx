import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5eee4] flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-3xl font-semibold text-[#17110d]">
            Product Not Found
          </h1>

          <Link
            to="/"
            className="
              inline-block
              mt-6
              bg-[#17110d]
              text-[#f5eee4]
              px-8
              py-3
            "
          >
            Back to Home
          </Link>

        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-[#f5eee4] py-12 px-5 md:px-10">

      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* PRODUCT IMAGE */}

          <div className="overflow-hidden">

            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-[500px]
                md:h-[600px]
                object-cover
              "
            />

          </div>

          {/* PRODUCT INFO */}

          <div className="flex flex-col justify-center">

            <p
              className="
                text-sm
                uppercase
                tracking-[3px]
                text-[#b18442]
                mb-4
              "
            >
              {product.category}
            </p>

            <h1
              className="
                text-3xl
                md:text-4xl
                font-semibold
                text-[#17110d]
              "
            >
              {product.name}
            </h1>

            <p className="text-2xl text-[#b18442] mt-5">
              PKR {product.price.toLocaleString()}
            </p>

            <p className="text-gray-600 leading-7 mt-6">
              Discover our beautiful {product.name}.
              Designed with elegance and comfort in mind,
              this piece is perfect for your wardrobe.
            </p>

            {/* STATUS */}

            <div className="mt-6 flex gap-3">

              {product.isNew && (
                <span
                  className="
                    border
                    border-[#b18442]
                    text-[#b18442]
                    px-4
                    py-2
                    text-xs
                    uppercase
                  "
                >
                  New Arrival
                </span>
              )}

              {product.isBestSeller && (
                <span
                  className="
                    border
                    border-[#b18442]
                    text-[#b18442]
                    px-4
                    py-2
                    text-xs
                    uppercase
                  "
                >
                  Best Seller
                </span>
              )}

            </div>

            {/* ADD TO CART */}

            <button
              onClick={handleAddToCart}
              className="
                mt-8
                w-full
                md:w-fit
                flex
                items-center
                justify-center
                gap-3
                bg-[#17110d]
                text-[#f5eee4]
                px-10
                py-4
                uppercase
                tracking-wider
                text-sm
                hover:bg-[#b18442]
                hover:text-[#17110d]
                transition
              "
            >
              <ShoppingBag size={18} />

              Add to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;