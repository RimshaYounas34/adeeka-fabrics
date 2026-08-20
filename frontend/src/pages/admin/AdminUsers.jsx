import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  RefreshCw,
  ArrowLeft,
  Mail,
  CalendarDays,
  User,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = localStorage.getItem("adeeka_admin_token");

      // IMPORTANT:
      // VITE_API_URL already contains /api
      // Example:
      // http://localhost:5000/api
      //
      // So don't write /api again here.

      const response = await fetch(
        `${API_URL}/admin/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("USERS API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      const userList = Array.isArray(data)
        ? data
        : data.users || [];

      setUsers(userList);
    } catch (error) {
      console.error("Users fetch error:", error);

      setErrorMessage(
        error.message || "Unable to load customers"
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
              Customers
            </h1>

            <p className="text-sm text-[#75695e] mt-2">
              View and manage registered customers.
            </p>

          </div>

          <button
            onClick={fetchUsers}
            disabled={loading}
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
              disabled:opacity-50
            "
          >

            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            Refresh

          </button>

        </div>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {errorMessage && !loading && (
          <div className="
            mb-6
            bg-red-50
            border
            border-red-200
            px-5
            py-4
            text-sm
            text-red-700
          ">
            <p className="font-medium">
              Unable to load customers
            </p>

            <p className="text-xs mt-1">
              {errorMessage}
            </p>
          </div>
        )}

        {/* ================================================= */}
        {/* USER COUNT */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

          {/* TOTAL */}

          <div className="bg-white border border-[#e5ddd2] p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[2px] text-[#75695e]">
                  Total Customers
                </p>

                <h2 className="font-serif text-4xl text-[#17110d] mt-3">
                  {users.length}
                </h2>

              </div>

              <div className="w-12 h-12 bg-[#f5eee4] flex items-center justify-center">

                <Users
                  size={22}
                  className="text-[#b18442]"
                />

              </div>

            </div>

          </div>

          {/* REGISTERED */}

          <div className="bg-white border border-[#e5ddd2] p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[2px] text-[#75695e]">
                  Registered Users
                </p>

                <h2 className="font-serif text-4xl text-[#17110d] mt-3">
                  {users.length}
                </h2>

              </div>

              <div className="w-12 h-12 bg-[#f5eee4] flex items-center justify-center">

                <User
                  size={22}
                  className="text-[#b18442]"
                />

              </div>

            </div>

          </div>

          {/* ACTIVE */}

          <div className="bg-[#17110d] text-white p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[2px] text-white/50">
                  Active Customers
                </p>

                <h2 className="font-serif text-4xl mt-3">
                  {users.length}
                </h2>

              </div>

              <div className="w-12 h-12 bg-[#b18442] flex items-center justify-center">

                <Users size={22} />

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading ? (

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <div className="
              w-10
              h-10
              border-2
              border-[#d8c3a5]
              border-t-[#b18442]
              rounded-full
              animate-spin
              mx-auto
            " />

            <p className="text-sm text-[#75695e] mt-4">
              Loading customers...
            </p>

          </div>

        ) : users.length === 0 ? (

          /* ================================================= */
          /* EMPTY */
          /* ================================================= */

          <div className="bg-white border border-[#e5ddd2] py-20 text-center">

            <Users
              size={40}
              className="mx-auto text-[#b18442]"
            />

            <h2 className="font-serif text-2xl text-[#17110d] mt-5">
              No Customers Found
            </h2>

            <p className="text-sm text-[#75695e] mt-2">
              Registered customers will appear here.
            </p>

            <button
              onClick={fetchUsers}
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

              <RefreshCw size={15} />

              Try Again

            </button>

          </div>

        ) : (

          /* ================================================= */
          /* USERS TABLE */
          /* ================================================= */

          <div className="bg-white border border-[#e5ddd2] overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead>

                  <tr className="border-b border-[#e5ddd2] bg-[#faf8f4]">

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Registered
                    </th>

                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-[#75695e]">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user._id}
                      className="
                        border-b
                        border-[#eee8df]
                        last:border-0
                        hover:bg-[#faf8f4]
                        transition
                      "
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="
                            w-11
                            h-11
                            rounded-full
                            bg-[#f5eee4]
                            flex
                            items-center
                            justify-center
                            text-[#b18442]
                          ">

                            <User size={18} />

                          </div>

                          <div>

                            <p className="text-sm font-medium text-[#17110d]">
                              {user.fullName ||
                                user.name ||
                                "Customer"}
                            </p>

                            <p className="text-[10px] text-[#a0968b] mt-1">
                              ID: {user._id?.slice(-8)}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm text-[#75695e]">

                          <Mail size={15} />

                          {user.email || "-"}

                        </div>

                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-5 text-sm text-[#75695e]">

                        {user.phone ||
                          user.mobile ||
                          "-"}

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm text-[#75695e]">

                          <CalendarDays size={15} />

                          {formatDate(user.createdAt)}

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span className="
                          inline-flex
                          px-3
                          py-1.5
                          bg-green-50
                          text-green-700
                          text-[10px]
                          uppercase
                          tracking-wider
                        ">
                          Active
                        </span>

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

export default AdminUsers;