
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import BASE_URL from "../api.js";

export default function CheckoutPage() {
  // =====================================================
  // CART
  // =====================================================

  const {
    items,
    cartTotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // CUSTOMER FORM
  // =====================================================

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  const savedUser = (() => {
    try {
      const user = localStorage.getItem("adeeka_user");

      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.log("User localStorage error:", error);

      return null;
    }
  })();

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =================================================
    // CHECK CART
    // =================================================

    if (!items || items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // =================================================
    // CHECK LOGIN
    // =================================================

    if (!savedUser) {
      alert("Please login before placing an order.");

      navigate("/login");

      return;
    }

    // =================================================
    // CHECK USER DATA
    // =================================================

    if (!savedUser.uid || !savedUser.email) {
      alert(
        "Your login information is incomplete. Please login again."
      );

      localStorage.removeItem("adeeka_user");

      navigate("/login");

      return;
    }

    // =================================================
    // CHECK PRODUCTS
    // =================================================

    const invalidProduct = items.find(
      (item) =>
        !item._id &&
        !item.id &&
        !item.slug
    );

    if (invalidProduct) {
      console.log(
        "Invalid Product:",
        invalidProduct
      );

      alert(
        "Some product information is missing. Please add the product again."
      );

      return;
    }

    setLoading(true);

    try {
      // =================================================
      // ORDER ITEMS
      // =================================================

      const orderItems = items.map((item) => ({
        product:
          item._id ||
          item.id ||
          item.slug,

        name:
          item.name ||
          "Product",

        image:
          item.images?.[0] ||
          item.image ||
          "",

        price:
          Number(item.price) || 0,

        qty:
          Number(item.qty) || 1,

        size:
          item.size || "",

        color:
          item.color || "",
      }));

      // =================================================
      // ORDER DATA
      // =================================================

      const orderData = {
        user: {
          uid: savedUser.uid,

          name:
            savedUser.name ||
            "User",

          email:
            savedUser.email,
        },

        customer: {
          fullName:
            form.fullName,

          address:
            form.address,

          city:
            form.city,

          postalCode:
            form.postalCode,

          phone:
            form.phone,
        },

        items: orderItems,

        totalPrice:
          Number(cartTotal) || 0,
      };

      console.log(
        "Sending Order:",
        orderData
      );

      // =================================================
      // API REQUEST
      // IMPORTANT:
      // Backend route is /api/orders
      // =================================================

      const response = await fetch(
        `${BASE_URL}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(orderData),
        }
      );

      // =================================================
      // RESPONSE
      // =================================================

      const data =
        await response.json();

      console.log(
        "Order Response:",
        data
      );

      // =================================================
      // API ERROR
      // =================================================

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to place order."
        );

        return;
      }

      // =================================================
      // ORDER SUCCESS
      // =================================================

      console.log(
        "Order saved successfully:",
        data.order
      );

      // =================================================
      // CLEAR CART
      // IMPORTANT
      // Order successful hone ke baad
      // cart empty ho jayega.
      // =================================================

      clearCart();

      // =================================================
      // SHOW SUCCESS PAGE
      // =================================================

      setPlaced(true);

    } catch (error) {
      console.log(
        "Order Error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SUCCESS PAGE
  // =====================================================

  if (placed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cream px-6">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="text-center max-w-md"
        >

          {/* SUCCESS ICON */}

          <div
            className="
              w-16
              h-16
              mx-auto
              mb-5
              rounded-full
              bg-gold
              flex
              items-center
              justify-center
            "
          >
            <span className="text-white text-2xl">
              ✓
            </span>
          </div>

          {/* TITLE */}

          <h1
            className="
              font-display
              text-3xl
              text-charcoal
              mb-3
            "
          >
            Order Confirmed!
          </h1>

          {/* MESSAGE */}

          <p
            className="
              font-elegant
              text-charcoal/60
              text-lg
              mb-8
              leading-7
            "
          >
            Thank you for your order.
            <br />
            We'll contact you soon with
            delivery details.
          </p>

          {/* HOME */}

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              bg-charcoal
              text-cream
              px-8
              py-3
              text-xs
              tracking-widest
              uppercase
              font-sans
              hover:bg-gold
              hover:text-charcoal
              transition-colors
            "
          >
            Back to Home
          </button>

        </motion.div>

      </div>
    );
  }

  // =====================================================
  // CHECKOUT PAGE
  // =====================================================

  return (
    <div
      className="
        bg-cream
        min-h-screen
        px-6
        md:px-10
        py-14
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
          grid
          md:grid-cols-2
          gap-10
        "
      >

        {/* ================================================= */}
        {/* CUSTOMER DETAILS */}
        {/* ================================================= */}

        <div>

          <h1
            className="
              font-display
              text-3xl
              text-charcoal
              mb-2
            "
          >
            Checkout
          </h1>

          <p
            className="
              text-sm
              text-charcoal/60
              mb-7
            "
          >
            Enter your delivery details below.
          </p>

          <form
            onSubmit={handleSubmit}
            className="
              space-y-4
              font-sans
              text-sm
            "
          >

            {/* FULL NAME */}

            <div>

              <label
                className="
                  block
                  mb-2
                  text-charcoal
                "
              >
                Full Name
              </label>

              <input
                required
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="
                  w-full
                  border
                  border-charcoal/20
                  px-4
                  py-3
                  bg-white
                  focus:outline-none
                  focus:border-gold
                "
              />

            </div>

            {/* ADDRESS */}

            <div>

              <label
                className="
                  block
                  mb-2
                  text-charcoal
                "
              >
                Address
              </label>

              <input
                required
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address"
                className="
                  w-full
                  border
                  border-charcoal/20
                  px-4
                  py-3
                  bg-white
                  focus:outline-none
                  focus:border-gold
                "
              />

            </div>

            {/* CITY + POSTAL */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              {/* CITY */}

              <div>

                <label
                  className="
                    block
                    mb-2
                    text-charcoal
                  "
                >
                  City
                </label>

                <input
                  required
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="
                    w-full
                    border
                    border-charcoal/20
                    px-4
                    py-3
                    bg-white
                    focus:outline-none
                    focus:border-gold
                  "
                />

              </div>

              {/* POSTAL CODE */}

              <div>

                <label
                  className="
                    block
                    mb-2
                    text-charcoal
                  "
                >
                  Postal Code
                </label>

                <input
                  required
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className="
                    w-full
                    border
                    border-charcoal/20
                    px-4
                    py-3
                    bg-white
                    focus:outline-none
                    focus:border-gold
                  "
                />

              </div>

            </div>

            {/* PHONE */}

            <div>

              <label
                className="
                  block
                  mb-2
                  text-charcoal
                "
              >
                Phone Number
              </label>

              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                className="
                  w-full
                  border
                  border-charcoal/20
                  px-4
                  py-3
                  bg-white
                  focus:outline-none
                  focus:border-gold
                "
              />

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-charcoal
                text-cream
                py-3.5
                text-xs
                tracking-widest
                uppercase
                font-sans
                hover:bg-gold
                hover:text-charcoal
                transition-colors
                mt-5
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

        </div>

        {/* ================================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================================= */}

        <div
          className="
            bg-white
            p-6
            md:p-8
            h-fit
          "
        >

          <h2
            className="
              font-display
              text-xl
              text-charcoal
              mb-5
            "
          >
            Order Summary
          </h2>

          <div className="space-y-4">

            {items.map((item) => (

              <div
                key={`
                  ${item._id || item.id || item.slug}
                  -
                  ${item.size || ""}
                  -
                  ${item.color || ""}
                `}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  text-sm
                  font-sans
                "
              >

                {/* PRODUCT */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  {(item.images?.[0] ||
                    item.image) && (

                    <img
                      src={
                        item.images?.[0] ||
                        item.image
                      }
                      alt={item.name}
                      className="
                        w-14
                        h-16
                        object-cover
                      "
                    />

                  )}

                  <div>

                    <p className="text-charcoal">
                      {item.name}
                    </p>

                    <p
                      className="
                        text-xs
                        text-charcoal/50
                        mt-1
                      "
                    >
                      Qty: {item.qty}

                      {item.size &&
                        ` • Size: ${item.size}`}
                    </p>

                  </div>

                </div>

                {/* PRICE */}

                <span
                  className="
                    text-charcoal
                    whitespace-nowrap
                  "
                >
                  PKR{" "}
                  {(
                    Number(item.price || 0) *
                    Number(item.qty || 1)
                  ).toLocaleString()}
                </span>

              </div>

            ))}

          </div>

          {/* TOTAL */}

          <div
            className="
              flex
              justify-between
              border-t
              border-charcoal/10
              pt-4
              mt-6
              font-semibold
              text-charcoal
            "
          >

            <span>
              Total
            </span>

            <span className="text-gold">
              PKR{" "}
              {Number(
                cartTotal || 0
              ).toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
