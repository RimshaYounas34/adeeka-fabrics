
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  DollarSign,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";

import logo from "../assets/images/adeeka-logo.png";

// =====================================================
// BACKEND API
// =====================================================

const API_URL = "http://localhost:5000";

// =====================================================
// ADMIN DASHBOARD
// =====================================================

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  // =====================================================
  // DASHBOARD DATA
  // =====================================================

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalSales: 0,
  });

  const [monthlySales, setMonthlySales] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK ADMIN LOGIN
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("adeeka_admin_token");
    const adminData = localStorage.getItem("adeeka_admin");

    console.log("=================================");
    console.log("ADMIN LOGIN CHECK");
    console.log("Token:", token);
    console.log("Admin:", adminData);
    console.log("=================================");

    if (!token || !adminData) {
      navigate("/admin/login");
      return;
    }

    try {
      setAdmin(JSON.parse(adminData));
    } catch (error) {
      console.log("Admin data parse error:", error);

      localStorage.removeItem("adeeka_admin");
      localStorage.removeItem("adeeka_admin_token");

      navigate("/admin/login");
      return;
    }

    fetchDashboardData(token);
  }, [navigate]);

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  const fetchDashboardData = async (token) => {
    try {
      setLoading(true);

      const dashboardURL =
        `${API_URL}/api/admin/dashboard`;

      console.log("=================================");
      console.log("FETCHING ADMIN DASHBOARD");
      console.log("URL:", dashboardURL);
      console.log("=================================");

      const response = await fetch(
        dashboardURL,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("=================================");
      console.log("DASHBOARD RESPONSE");
      console.log("Status:", response.status);
      console.log("Data:", data);
      console.log("=================================");

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {
        console.log(
          "Dashboard API Error:",
          data
        );

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem(
            "adeeka_admin_token"
          );

          localStorage.removeItem(
            "adeeka_admin"
          );

          navigate("/admin/login");
        }

        return;
      }

      // =================================================
      // STATS
      // =================================================

      setStats({
        totalProducts: Number(
          data?.stats?.totalProducts || 0
        ),

        totalOrders: Number(
          data?.stats?.totalOrders || 0
        ),

        totalCustomers: Number(
          data?.stats?.totalCustomers || 0
        ),

        totalSales: Number(
          data?.stats?.totalSales || 0
        ),
      });

      // =================================================
      // MONTHLY SALES
      // =================================================

      setMonthlySales(
        Array.isArray(data?.monthlySales)
          ? data.monthlySales
          : []
      );

      // =================================================
      // RECENT ORDERS
      // =================================================

      setRecentOrders(
        Array.isArray(data?.recentOrders)
          ? data.recentOrders
          : []
      );

    } catch (error) {
      console.log(
        "================================="
      );

      console.log(
        "DASHBOARD CONNECTION ERROR"
      );

      console.log(error);

      console.log(
        "================================="
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "adeeka_admin_token"
    );

    localStorage.removeItem(
      "adeeka_admin"
    );

    navigate("/admin/login");
  };

  // =====================================================
  // SIDEBAR MENU
  // =====================================================

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/admin/dashboard",
    },

    {
      name: "Products",
      icon: Package,
      link: "/admin/products",
    },

    {
      name: "Add Product",
      icon: PlusCircle,
      link: "/admin/add-product",
    },

    {
      name: "Orders",
      icon: ShoppingBag,
      link: "/admin/orders",
    },

    {
      name: "Customers",
      icon: Users,
      link: "/admin/users",
    },
  ];

  // =====================================================
  // CHART
  // =====================================================

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map(
    (month, index) => {
      const found =
        monthlySales.find(
          (item) =>
            Number(
              item?._id?.month
            ) === index + 1
        );

      return {
        month,
        sales: Number(
          found?.sales || 0
        ),
      };
    }
  );

  const maxSales = Math.max(
    ...chartData.map(
      (item) => item.sales
    ),
    1
  );

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      date
    ).toLocaleDateString(
      "en-PK",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (
    status
  ) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-700";
    }

    if (status === "Shipped") {
      return "bg-blue-50 text-blue-700";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-700";
    }

    return "bg-yellow-50 text-yellow-700";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f3ed]">

      {/* ================================================= */}
      {/* MOBILE HEADER */}
      {/* ================================================= */}

      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white px-5 py-4 border-b border-[#e5ddd2]">

        <Link to="/admin/dashboard">

          <img
            src={logo}
            alt="Adeeka Fabrics"
            className="w-28 h-auto object-contain"
          />

        </Link>

        <button
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          className="w-10 h-10 flex items-center justify-center border border-[#e5ddd2] text-[#17110d]"
        >

          {sidebarOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}

        </button>

      </header>

      {/* ================================================= */}
      {/* MAIN LAYOUT */}
      {/* ================================================= */}

      <div className="flex min-h-screen">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <aside
          className={`
            fixed
            lg:sticky
            top-0
            left-0
            z-50
            h-screen
            w-[260px]
            bg-[#17110d]
            text-white
            flex
            flex-col
            transition-transform
            duration-300

            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >

          {/* LOGO */}

          <div className="px-7 py-7 border-b border-white/10">

            <Link to="/admin/dashboard">

              <img
                src={logo}
                alt="Adeeka Fabrics"
                className="w-32 brightness-0 invert"
              />

            </Link>

            <p className="mt-2 text-[10px] uppercase tracking-[3px] text-[#c49a55]">
              Admin Panel
            </p>

          </div>

          {/* MENU */}

          <nav className="flex-1 px-4 py-6 space-y-1">

            {menuItems.map(
              (item) => {

                const Icon =
                  item.icon;

                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() =>
                      setSidebarOpen(
                        false
                      )
                    }
                    className="
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3.5
                      text-sm
                      text-white/65
                      hover:text-white
                      hover:bg-white/[0.06]
                      transition
                      group
                    "
                  >

                    <div className="flex items-center gap-3">

                      <Icon
                        size={18}
                        strokeWidth={1.7}
                      />

                      <span>
                        {item.name}
                      </span>

                    </div>

                    <ChevronRight
                      size={15}
                      className="
                        opacity-0
                        -translate-x-1
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition
                      "
                    />

                  </Link>
                );
              }
            )}

          </nav>

          {/* LOGOUT */}

          <div className="p-5 border-t border-white/10">

            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-white/65
                hover:text-white
                hover:bg-white/[0.06]
                transition
              "
            >

              <LogOut size={18} />

              <span>
                Logout
              </span>

            </button>

          </div>

        </aside>

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <main className="flex-1 min-w-0 px-5 py-7 md:px-8 lg:px-10 lg:py-10">

          {/* TOP HEADER */}

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">

            <div>

              <div className="flex items-center gap-2 mb-2">

                <span className="w-7 h-[1px] bg-[#b18442]" />

                <p className="text-[10px] uppercase tracking-[3px] text-[#b18442]">
                  Adeeka Fabrics
                </p>

              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#17110d]">
                Dashboard
              </h1>

              <p className="text-sm text-[#75695e] mt-2">
                Manage your store, products and orders from one place.
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
                w-fit
              "
            >

              <PlusCircle size={17} />

              Add Product

            </Link>

          </div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading ? (

            <div className="py-20 text-center">

              <div className="w-10 h-10 border-2 border-[#d8c3a5] border-t-[#b18442] rounded-full animate-spin mx-auto" />

              <p className="text-sm text-[#75695e] mt-4">
                Loading dashboard...
              </p>

            </div>

          ) : (

            <>

              {/* ================================================= */}
              {/* STAT CARDS */}
              {/* ================================================= */}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {/* PRODUCTS */}

                <div className="bg-white border border-[#e5ddd2] p-6 group hover:border-[#b18442] transition">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[10px] uppercase tracking-[2px] text-[#75695e]">
                        Products
                      </p>

                      <h2 className="font-serif text-4xl text-[#17110d] mt-3">
                        {stats.totalProducts}
                      </h2>

                      <div className="flex items-center gap-1 mt-3 text-xs text-[#638267]">

                        <TrendingUp size={14} />

                        <span>
                          Active Products
                        </span>

                      </div>

                    </div>

                    <div className="w-12 h-12 bg-[#f5eee4] flex items-center justify-center">

                      <Package
                        size={22}
                        className="text-[#b18442]"
                      />

                    </div>

                  </div>

                  <Link
                    to="/admin/products"
                    className="inline-flex items-center gap-1 mt-5 text-xs text-[#b18442] hover:underline"
                  >
                    View Products
                    <ArrowUpRight size={13} />
                  </Link>

                </div>

                {/* ORDERS */}

                <div className="bg-white border border-[#e5ddd2] p-6 group hover:border-[#b18442] transition">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[10px] uppercase tracking-[2px] text-[#75695e]">
                        Orders
                      </p>

                      <h2 className="font-serif text-4xl text-[#17110d] mt-3">
                        {stats.totalOrders}
                      </h2>

                      <div className="flex items-center gap-1 mt-3 text-xs text-[#75695e]">

                        <ShoppingBag size={14} />

                        <span>
                          Total Orders
                        </span>

                      </div>

                    </div>

                    <div className="w-12 h-12 bg-[#f5eee4] flex items-center justify-center">

                      <ShoppingBag
                        size={22}
                        className="text-[#b18442]"
                      />

                    </div>

                  </div>

                  <Link
                    to="/admin/orders"
                    className="inline-flex items-center gap-1 mt-5 text-xs text-[#b18442] hover:underline"
                  >
                    View Orders
                    <ArrowUpRight size={13} />
                  </Link>

                </div>

                {/* CUSTOMERS */}

                <div className="bg-white border border-[#e5ddd2] p-6 group hover:border-[#b18442] transition">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[10px] uppercase tracking-[2px] text-[#75695e]">
                        Customers
                      </p>

                      <h2 className="font-serif text-4xl text-[#17110d] mt-3">
                        {stats.totalCustomers}
                      </h2>

                      <div className="flex items-center gap-1 mt-3 text-xs text-[#75695e]">

                        <UserPlus size={14} />

                        <span>
                          Registered Users
                        </span>

                      </div>

                    </div>

                    <div className="w-12 h-12 bg-[#f5eee4] flex items-center justify-center">

                      <Users
                        size={22}
                        className="text-[#b18442]"
                      />

                    </div>

                  </div>

                  <Link
                    to="/admin/users"
                    className="inline-flex items-center gap-1 mt-5 text-xs text-[#b18442] hover:underline"
                  >
                    View Customers
                    <ArrowUpRight size={13} />
                  </Link>

                </div>

                {/* SALES */}

                <div className="bg-[#17110d] text-white p-6">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-[10px] uppercase tracking-[2px] text-white/50">
                        Revenue
                      </p>

                      <h2 className="font-serif text-3xl mt-3">
                        Rs.{" "}
                        {Number(
                          stats.totalSales || 0
                        ).toLocaleString()}
                      </h2>

                      <div className="flex items-center gap-1 mt-3 text-xs text-white/50">

                        <DollarSign size={14} />

                        <span>
                          Total Sales
                        </span>

                      </div>

                    </div>

                    <div className="w-12 h-12 bg-[#b18442] flex items-center justify-center">

                      <DollarSign size={22} />

                    </div>

                  </div>

                  <Link
                    to="/admin/orders"
                    className="inline-flex items-center gap-1 mt-5 text-xs text-[#d4a85c] hover:underline"
                  >
                    View Sales
                    <ArrowUpRight size={13} />
                  </Link>

                </div>

              </div>

              {/* ================================================= */}
              {/* OVERVIEW + QUICK ACTIONS */}
              {/* ================================================= */}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                {/* CHART */}

                <div className="xl:col-span-2 bg-white border border-[#e5ddd2] p-6 md:p-7">

                  <div className="flex items-start justify-between mb-8">

                    <div>

                      <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                        Store Overview
                      </p>

                      <h2 className="font-serif text-2xl text-[#17110d] mt-1">
                        Sales Overview
                      </h2>

                    </div>

                    <span className="text-xs text-[#75695e]">
                      Current Year
                    </span>

                  </div>

                  <div className="h-64 flex items-end gap-2 md:gap-4 border-b border-l border-[#e5ddd2] px-3">

                    {chartData.map(
                      (item) => {

                        const height =
                          item.sales === 0
                            ? 3
                            : Math.max(
                                (item.sales /
                                  maxSales) *
                                  100,
                                5
                              );

                        return (
                          <div
                            key={item.month}
                            className="flex-1 h-full flex items-end"
                          >

                            <div
                              className="
                                w-full
                                bg-[#b18442]
                                hover:bg-[#17110d]
                                transition
                                relative
                                group
                                cursor-pointer
                              "
                              style={{
                                height: `${height}%`,
                              }}
                            >

                              <span
                                className="
                                  absolute
                                  -top-8
                                  left-1/2
                                  -translate-x-1/2
                                  whitespace-nowrap
                                  text-[9px]
                                  text-[#75695e]
                                  opacity-0
                                  group-hover:opacity-100
                                  transition
                                "
                              >
                                Rs.{" "}
                                {item.sales.toLocaleString()}
                              </span>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                  <div className="flex justify-between mt-3 px-1">

                    {months.map(
                      (month) => (

                        <span
                          key={month}
                          className="text-[9px] text-[#a0968b]"
                        >
                          {month}
                        </span>

                      )
                    )}

                  </div>

                </div>

                {/* QUICK ACTIONS */}

                <div className="bg-white border border-[#e5ddd2] p-6 md:p-7">

                  <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                    Management
                  </p>

                  <h2 className="font-serif text-2xl text-[#17110d] mt-1 mb-6">
                    Quick Actions
                  </h2>

                  <div className="space-y-3">

                    {/* ADD PRODUCT */}

                    <Link
                      to="/admin/add-product"
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        border-[#e5ddd2]
                        p-4
                        hover:border-[#b18442]
                        hover:bg-[#faf8f4]
                        transition
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 bg-[#f5eee4] flex items-center justify-center">

                          <PlusCircle
                            size={19}
                            className="text-[#b18442]"
                          />

                        </div>

                        <div>

                          <h3 className="text-sm font-medium text-[#17110d]">
                            Add Product
                          </h3>

                          <p className="text-[11px] text-[#75695e] mt-1">
                            Add a new suit
                          </p>

                        </div>

                      </div>

                      <ChevronRight
                        size={16}
                        className="text-[#b18442]"
                      />

                    </Link>

                    {/* MANAGE PRODUCTS */}

                    <Link
                      to="/admin/products"
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        border-[#e5ddd2]
                        p-4
                        hover:border-[#b18442]
                        hover:bg-[#faf8f4]
                        transition
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 bg-[#f5eee4] flex items-center justify-center">

                          <Package
                            size={19}
                            className="text-[#b18442]"
                          />

                        </div>

                        <div>

                          <h3 className="text-sm font-medium text-[#17110d]">
                            Manage Products
                          </h3>

                          <p className="text-[11px] text-[#75695e] mt-1">
                            Edit your products
                          </p>

                        </div>

                      </div>

                      <ChevronRight
                        size={16}
                        className="text-[#b18442]"
                      />

                    </Link>

                    {/* ORDERS */}

                    <Link
                      to="/admin/orders"
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        border-[#e5ddd2]
                        p-4
                        hover:border-[#b18442]
                        hover:bg-[#faf8f4]
                        transition
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 bg-[#f5eee4] flex items-center justify-center">

                          <ShoppingBag
                            size={19}
                            className="text-[#b18442]"
                          />

                        </div>

                        <div>

                          <h3 className="text-sm font-medium text-[#17110d]">
                            Manage Orders
                          </h3>

                          <p className="text-[11px] text-[#75695e] mt-1">
                            Check customer orders
                          </p>

                        </div>

                      </div>

                      <ChevronRight
                        size={16}
                        className="text-[#b18442]"
                      />

                    </Link>

                    {/* CUSTOMERS */}

                    <Link
                      to="/admin/users"
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        border-[#e5ddd2]
                        p-4
                        hover:border-[#b18442]
                        hover:bg-[#faf8f4]
                        transition
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 bg-[#f5eee4] flex items-center justify-center">

                          <Users
                            size={19}
                            className="text-[#b18442]"
                          />

                        </div>

                        <div>

                          <h3 className="text-sm font-medium text-[#17110d]">
                            Customers
                          </h3>

                          <p className="text-[11px] text-[#75695e] mt-1">
                            View registered users
                          </p>

                        </div>

                      </div>

                      <ChevronRight
                        size={16}
                        className="text-[#b18442]"
                      />

                    </Link>

                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* RECENT ORDERS */}
              {/* ================================================= */}

              <section className="mt-8 bg-white border border-[#e5ddd2]">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-[#e5ddd2]">

                  <div>

                    <p className="text-[10px] uppercase tracking-[2px] text-[#b18442]">
                      Store Activity
                    </p>

                    <h2 className="font-serif text-2xl text-[#17110d] mt-1">
                      Recent Orders
                    </h2>

                  </div>

                  <Link
                    to="/admin/orders"
                    className="text-xs text-[#b18442] hover:underline"
                  >
                    View All Orders →
                  </Link>

                </div>

                {recentOrders.length ===
                0 ? (

                  <div className="py-16 text-center">

                    <div className="w-14 h-14 mx-auto bg-[#f5eee4] flex items-center justify-center">

                      <ShoppingBag
                        size={23}
                        className="text-[#b18442]"
                      />

                    </div>

                    <h3 className="font-serif text-xl text-[#17110d] mt-5">
                      No Orders Yet
                    </h3>

                    <p className="text-sm text-[#75695e] mt-2">
                      Customer orders will appear here.
                    </p>

                  </div>

                ) : (

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                      <thead>

                        <tr className="border-b border-[#e5ddd2] bg-[#faf8f4]">

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

                        </tr>

                      </thead>

                      <tbody>

                        {recentOrders.map(
                          (order) => (

                            <tr
                              key={
                                order._id
                              }
                              className="border-b border-[#eee8df] last:border-0 hover:bg-[#faf8f4] transition"
                            >

                              <td className="px-6 py-5">

                                <p className="text-sm font-medium text-[#17110d]">

                                  {order.customer
                                    ?.fullName ||
                                    order.user
                                      ?.name ||
                                    "Customer"}

                                </p>

                                <p className="text-[11px] text-[#75695e] mt-1">

                                  {order.user
                                    ?.email ||
                                    "-"}

                                </p>

                              </td>

                              <td className="px-6 py-5 text-sm text-[#75695e]">

                                {order.items
                                  ?.length ||
                                  0}

                              </td>

                              <td className="px-6 py-5">

                                <span className="text-sm font-medium text-[#17110d]">

                                  Rs.{" "}

                                  {Number(
                                    order.totalPrice ||
                                      0
                                  ).toLocaleString()}

                                </span>

                              </td>

                              <td className="px-6 py-5">

                                <span
                                  className={`
                                    inline-flex
                                    px-3
                                    py-1.5
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    ${getStatusStyle(
                                      order.status
                                    )}
                                  `}
                                >

                                  {order.status ||
                                    "Pending"}

                                </span>

                              </td>

                              <td className="px-6 py-5 text-xs text-[#75695e]">

                                {formatDate(
                                  order.createdAt
                                )}

                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                )}

              </section>

            </>

          )}

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div className="mt-8 pb-4 text-center">

            <p className="text-[10px] uppercase tracking-[2px] text-[#a0968b]">
              ©{" "}
              {new Date().getFullYear()}{" "}
              Adeeka Fabrics — Admin Panel
            </p>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;