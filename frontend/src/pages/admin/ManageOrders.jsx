
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  RefreshCw,
  ArrowLeft,
  Eye,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem(
        "adeeka_admin_token"
      );

      // IMPORTANT:
      // VITE_API_URL already contains /api
      // So /api dobara nahi lagana

      const response = await fetch(
        `${API_URL}/admin/orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("=================================");
      console.log("FETCHING ADMIN ORDERS");
      console.log(
        "URL:",
        `${API_URL}/admin/orders`
      );
      console.log("STATUS:", response.status);
      console.log("DATA:", data);
      console.log("=================================");

      if (!response.ok) {
        console.log("Orders error:", data);
        return;
      }

      /*
        Backend response normally:

        {
          success: true,
          orders: [...]
        }

        Agar direct array aaye to woh bhi handle hoga.
      */

      const orderData = Array.isArray(data)
        ? data
        : data.orders || [];

      setOrders(orderData);
      setFilteredOrders(orderData);
    } catch (error) {
      console.log(
        "Orders connection error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  useEffect(() => {
    let result = [...orders];

    // SEARCH
    if (search.trim() !== "") {
      const text = search.toLowerCase();

      result = result.filter((order) => {
        const name =
          order.customer?.fullName ||
          order.user?.fullName ||
          order.user?.name ||
          order.shippingAddress?.fullName ||
          "";

        const email =
          order.customer?.email ||
          order.user?.email ||
          order.shippingAddress?.email ||
          "";

        const id = order._id || "";

        return (
          name.toLowerCase().includes(text) ||
          email.toLowerCase().includes(text) ||
          id.toLowerCase().includes(text)
        );
      });
    }

    // STATUS
    if (statusFilter !== "All") {
      result = result.filter(
        (order) =>
          order.status === statusFilter
      );
    }

    setFilteredOrders(result);
  }, [search, statusFilter, orders]);

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-700";
    }

    if (status === "Shipped") {
      return "bg-blue-50 text-blue-700";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-700";
    }

    if (status === "Processing") {
      return "bg-purple-50 text-purple-700";
    }

    return "bg-yellow-50 text-yellow-700";
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-PK",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // ORDER ID
  // =====================================================

  const shortOrderId = (id) => {
    if (!id) return "-";

    return `#${id.slice(-6).toUpperCase()}`;
  };

  // =====================================================
  // CUSTOMER
  // =====================================================

  const getCustomerName = (order) => {
    return (
      order.customer?.fullName ||
      order.user?.fullName ||
      order.user?.name ||
      order.shippingAddress?.fullName ||
      "Customer"
    );
  };

  const getCustomerEmail = (order) => {
    return (
      order.customer?.email ||
      order.user?.email ||
      order.shippingAddress?.email ||
      "-"
    );
  };

  // =====================================================
  // TOTAL
  // =====================================================

  const getOrderTotal = (order) => {
    return Number(
      order.totalPrice ||
        order.total ||
        order.amount ||
        order.grandTotal ||
        0
    );
  };

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const token = localStorage.getItem(
        "adeeka_admin_token"
      );

      const response = await fetch(
        `${API_URL}/admin/orders/${orderId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "STATUS UPDATE RESPONSE:",
        data
      );

      if (!response.ok) {
        console.log(
          "Status update error:",
          data
        );
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      if (
        selectedOrder &&
        selectedOrder._id === orderId
      ) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
        });
      }
    } catch (error) {
      console.log(
        "Update status error:",
        error
      );
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f3ed]">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="bg-white border-b border-[#e5ddd2]">
        <div className="px-5 md:px-8 lg:px-10 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2 mb-2">

                <span className="w-7 h-[1px] bg-[#b18442]" />

                <p className="text-[10px] uppercase tracking-[3px] text-[#b18442]">
                  Adeeka Fabrics
                </p>

              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-[#17110d]">
                Manage Orders
              </h1>

              <p className="text-sm text-[#75695e] mt-2">
                View and manage customer orders.
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={fetchOrders}
                className="
                  inline-flex
                  items-center
                  gap-2
                  border
                  border-[#e5ddd2]
                  bg-white
                  px-4
                  py-3
                  text-xs
                  uppercase
                  tracking-widest
                  hover:border-[#b18442]
                  transition
                "
              >

                <RefreshCw size={16} />

                Refresh

              </button>

              <Link
                to="/admin/dashboard"
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-[#17110d]
                  text-white
                  px-4
                  py-3
                  text-xs
                  uppercase
                  tracking-widest
                  hover:bg-[#b18442]
                  transition
                "
              >

                <ArrowLeft size={16} />

                Dashboard

              </Link>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="px-5 md:px-8 lg:px-10 py-8">

        {/* FILTERS */}

        <div className="bg-white border border-[#e5ddd2] p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#a0968b]
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search customer, email or order ID..."
                className="
                  w-full
                  border
                  border-[#e5ddd2]
                  bg-[#faf8f4]
                  py-3
                  pl-11
                  pr-10
                  text-sm
                  outline-none
                  focus:border-[#b18442]
                "
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#75695e]
                  "
                >
                  <X size={17} />
                </button>
              )}

            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                lg:w-52
                border
                border-[#e5ddd2]
                bg-[#faf8f4]
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#b18442]
              "
            >

              <option value="All">
                All Orders
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>

        {/* COUNT */}

        <p className="text-sm text-[#75695e] mb-4">

          Showing{" "}

          <span className="font-medium text-[#17110d]">
            {filteredOrders.length}
          </span>{" "}

          orders

        </p>

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
              Loading orders...
            </p>

          </div>

        ) : filteredOrders.length === 0 ? (

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <div
              className="
                w-16
                h-16
                mx-auto
                bg-[#f5eee4]
                flex
                items-center
                justify-center
              "
            >

              <ShoppingBag
                size={26}
                className="text-[#b18442]"
              />

            </div>

            <h2 className="font-serif text-2xl text-[#17110d] mt-5">
              No Orders Found
            </h2>

            <p className="text-sm text-[#75695e] mt-2">
              No orders match your search.
            </p>

          </div>

        ) : (

          /* ================================================= */
          /* TABLE */
          /* ================================================= */

          <div className="bg-white border border-[#e5ddd2] overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead>

                  <tr className="bg-[#faf8f4] border-b border-[#e5ddd2]">

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Order
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Items
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Amount
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Date
                    </th>

                    <th className="text-right px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.map(
                    (order) => (

                      <tr
                        key={order._id}
                        className="
                          border-b
                          border-[#eee8df]
                          last:border-0
                          hover:bg-[#faf8f4]
                        "
                      >

                        <td className="px-6 py-5">

                          <span className="text-sm font-medium text-[#17110d]">
                            {shortOrderId(
                              order._id
                            )}
                          </span>

                        </td>

                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-[#17110d]">
                            {getCustomerName(
                              order
                            )}
                          </p>

                          <p className="text-[11px] text-[#75695e] mt-1">
                            {getCustomerEmail(
                              order
                            )}
                          </p>

                        </td>

                        <td className="px-6 py-5">

                          <span className="text-sm text-[#75695e]">
                            {order.items?.length || 0} items
                          </span>

                        </td>

                        <td className="px-6 py-5">

                          <span className="text-sm font-medium text-[#17110d]">

                            Rs.{" "}

                            {getOrderTotal(
                              order
                            ).toLocaleString()}

                          </span>

                        </td>

                        <td className="px-6 py-5">

                          <select
                            value={
                              order.status ||
                              "Pending"
                            }
                            onChange={(e) =>
                              updateOrderStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            className={`
                              border-0
                              px-3
                              py-1.5
                              text-[10px]
                              uppercase
                              outline-none
                              cursor-pointer
                              ${getStatusStyle(
                                order.status
                              )}
                            `}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Shipped">
                              Shipped
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                        </td>

                        <td className="px-6 py-5 text-xs text-[#75695e]">

                          {formatDate(
                            order.createdAt
                          )}

                        </td>

                        <td className="px-6 py-5 text-right">

                          <button
                            onClick={() =>
                              setSelectedOrder(
                                order
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              border
                              border-[#e5ddd2]
                              px-3
                              py-2
                              text-xs
                              hover:border-[#b18442]
                              hover:text-[#b18442]
                            "
                          >

                            <Eye size={15} />

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </main>

      {/* ================================================= */}
      {/* ORDER DETAILS MODAL */}
      {/* ================================================= */}

      {selectedOrder && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="
              bg-white
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-[#e5ddd2]">

              <div>

                <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                  Order Details
                </p>

                <h2 className="font-serif text-2xl text-[#17110d] mt-1">
                  {shortOrderId(
                    selectedOrder._id
                  )}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="
                  w-9
                  h-9
                  border
                  border-[#e5ddd2]
                  flex
                  items-center
                  justify-center
                "
              >

                <X size={18} />

              </button>

            </div>

            <div className="p-6">

              {/* CUSTOMER */}

              <div className="bg-[#faf8f4] p-5">

                <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                  Customer
                </p>

                <h3 className="text-lg font-medium text-[#17110d] mt-2">
                  {getCustomerName(
                    selectedOrder
                  )}
                </h3>

                <p className="text-sm text-[#75695e] mt-1">
                  {getCustomerEmail(
                    selectedOrder
                  )}
                </p>

              </div>

              {/* ITEMS */}

              <div className="mt-6">

                <p className="text-[10px] uppercase tracking-[2px] text-[#b18442] mb-4">
                  Order Items
                </p>

                <div className="space-y-3">

                  {selectedOrder.items?.map(
                    (item, index) => (

                      <div
                        key={
                          item._id ||
                          item.id ||
                          index
                        }
                        className="
                          flex
                          items-center
                          gap-4
                          border
                          border-[#e5ddd2]
                          p-3
                        "
                      >

                        {item.image ||
                        item.images?.[0] ? (

                          <img
                            src={
                              item.image ||
                              item.images?.[0]
                            }
                            alt={
                              item.name ||
                              "Product"
                            }
                            className="
                              w-16
                              h-20
                              object-cover
                            "
                          />

                        ) : (

                          <div
                            className="
                              w-16
                              h-20
                              bg-[#f5eee4]
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <ShoppingBag
                              size={20}
                              className="text-[#b18442]"
                            />

                          </div>

                        )}

                        <div className="flex-1">

                          <h4 className="text-sm font-medium text-[#17110d]">
                            {item.name ||
                              "Product"}
                          </h4>

                          <p className="text-xs text-[#75695e] mt-1">

                            Qty:{" "}

                            {item.qty ||
                              item.quantity ||
                              1}

                          </p>

                        </div>

                        <p className="text-sm font-medium text-[#17110d]">

                          Rs.{" "}

                          {(
                            Number(
                              item.price || 0
                            ) *
                            Number(
                              item.qty ||
                                item.quantity ||
                                1
                            )
                          ).toLocaleString()}

                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* TOTAL */}

              <div className="flex items-center justify-between border-t border-[#e5ddd2] mt-6 pt-5">

                <span className="text-sm text-[#75695e]">
                  Total
                </span>

                <span className="font-serif text-2xl text-[#17110d]">

                  Rs.{" "}

                  {getOrderTotal(
                    selectedOrder
                  ).toLocaleString()}

                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ManageOrders;
