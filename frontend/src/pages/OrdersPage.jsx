
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BASE_URL from "../api.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET USER =================

  const user = JSON.parse(
    localStorage.getItem("adeeka_user")
  );

  // ================= GET ORDERS =================

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/orders/user/${user.uid}`
        );

        const data = await response.json();

        console.log("My Orders:", data);

        if (!response.ok) {
          console.log(
            "Orders Error:",
            data.message
          );
          return;
        }

        setOrders(data.orders || []);

      } catch (error) {
        console.log(
          "Fetch Orders Error:",
          error
        );

      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.uid]);

  // ================= LOADING =================

  if (loading) {
    return (
      <section className="
        min-h-screen
        bg-[#f5eee4]
        flex
        items-center
        justify-center
      ">
        <p className="text-[#75695e]">
          Loading your orders...
        </p>
      </section>
    );
  }

  // ================= NOT LOGIN =================

  if (!user) {
    return (
      <section className="
        min-h-screen
        bg-[#f5eee4]
        flex
        items-center
        justify-center
        px-6
      ">
        <div className="text-center">

          <h1 className="
            font-serif
            text-3xl
            text-[#17110d]
            mb-3
          ">
            Please Login
          </h1>

          <p className="
            text-sm
            text-[#75695e]
            mb-6
          ">
            Login to view your orders.
          </p>

          <Link
            to="/login"
            className="
              inline-block
              bg-[#17110d]
              text-[#f5eee4]
              px-7
              py-3
              text-xs
              uppercase
              tracking-widest
              hover:bg-[#b18442]
              transition
            "
          >
            Login
          </Link>

        </div>
      </section>
    );
  }

  // ================= PAGE =================

  return (
    <section className="
      min-h-screen
      bg-[#f5eee4]
      py-16
      px-6
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* ================= HEADING ================= */}

        <div className="
          text-center
          mb-10
        ">

          <p className="
            text-[#b18442]
            text-xs
            uppercase
            tracking-[0.3em]
          ">
            Adeeka Fabrics
          </p>

          <h1 className="
            font-serif
            text-4xl
            text-[#17110d]
            mt-2
          ">
            My Orders
          </h1>

          <p className="
            text-sm
            text-[#75695e]
            mt-2
          ">
            View your previous orders
          </p>

          <div className="
            w-16
            h-[2px]
            bg-[#b18442]
            mx-auto
            mt-4
          " />

        </div>

        {/* ================= NO ORDERS ================= */}

        {orders.length === 0 ? (

          <div className="
            bg-white
            text-center
            p-10
            shadow-sm
          ">

            <h2 className="
              font-serif
              text-2xl
              text-[#17110d]
            ">
              No Orders Yet
            </h2>

            <p className="
              text-sm
              text-[#75695e]
              mt-2
            ">
              You haven't placed any order yet.
            </p>

            <Link
              to="/shop"
              className="
                inline-block
                mt-6
                bg-[#17110d]
                text-[#f5eee4]
                px-7
                py-3
                text-xs
                uppercase
                tracking-widest
                hover:bg-[#b18442]
                transition
              "
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          /* ================= ORDERS ================= */

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="
                  bg-white
                  p-6
                  shadow-sm
                "
              >

                {/* ORDER HEADER */}

                <div className="
                  flex
                  flex-wrap
                  justify-between
                  gap-4
                  border-b
                  border-[#e2d8cc]
                  pb-4
                  mb-5
                ">

                  <div>

                    <p className="
                      text-xs
                      text-[#75695e]
                      uppercase
                    ">
                      Order ID
                    </p>

                    <p className="
                      text-sm
                      text-[#17110d]
                      mt-1
                    ">
                      {order._id}
                    </p>

                  </div>

                  {/* STATUS */}

                  <div className="text-right">

                    <p className="
                      text-xs
                      text-[#75695e]
                      uppercase
                    ">
                      Status
                    </p>

                    <span className="
                      inline-block
                      mt-1
                      px-3
                      py-1
                      text-xs
                      bg-[#f5eee4]
                      text-[#b18442]
                    ">
                      {order.status || "Processing"}
                    </span>

                  </div>

                </div>

                {/* ================= PRODUCTS ================= */}

                <div className="space-y-5">

                  {order.items?.map(
                    (item, index) => (

                      <div
                        key={
                          `${item.product}-${index}`
                        }
                        className="
                          flex
                          gap-4
                          items-start
                        "
                      >

                        {/* IMAGE */}

                        <img
                          src={
                            item.image ||
                            "/placeholder.jpg"
                          }
                          alt={item.name}
                          className="
                            w-20
                            h-24
                            object-cover
                          "
                        />

                        {/* DETAILS */}

                        <div className="flex-1">

                          <h3 className="
                            font-serif
                            text-lg
                            text-[#17110d]
                          ">
                            {item.name}
                          </h3>

                          <p className="
                            text-xs
                            text-[#75695e]
                            mt-1
                          ">
                            Quantity: {item.qty}
                          </p>

                          {item.size && (
                            <p className="
                              text-xs
                              text-[#75695e]
                              mt-1
                            ">
                              Size: {item.size}
                            </p>
                          )}

                          <p className="
                            text-sm
                            text-[#b18442]
                            mt-2
                          ">
                            PKR{" "}
                            {(
                              Number(item.price || 0) *
                              Number(item.qty || 1)
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

                {/* ================= TOTAL ================= */}

                <div className="
                  border-t
                  border-[#e2d8cc]
                  mt-5
                  pt-5
                  flex
                  justify-between
                  items-center
                ">

                  <span className="
                    text-sm
                    text-[#75695e]
                  ">
                    Total
                  </span>

                  <span className="
                    text-lg
                    text-[#b18442]
                    font-semibold
                  ">
                    PKR{" "}
                    {Number(
                      order.totalPrice || 0
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default OrdersPage;
