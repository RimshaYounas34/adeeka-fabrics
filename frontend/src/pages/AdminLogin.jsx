
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";

import logo from "../assets/images/adeeka-logo.png";

// =====================================================
// API URL
// =====================================================
// Agar .env mein:
// VITE_API_URL=http://localhost:5000/api
// hai to /api dobara nahi lagayenge.
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // ADMIN LOGIN
  // =====================================================

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // ADMIN LOGIN API
      // =================================================

      const response = await fetch(
        `${API_URL}/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "ADMIN LOGIN RESPONSE:",
        data
      );

      // =================================================
      // LOGIN FAILED
      // =================================================

      if (!response.ok) {
        alert(
          data.message ||
            "Invalid admin credentials"
        );

        return;
      }

      // =================================================
      // CHECK ADMIN DATA
      // =================================================

      if (!data.admin) {
        alert(
          "Admin information was not received."
        );

        return;
      }

      // =================================================
      // CHECK TOKEN
      // =================================================

      if (!data.token) {
        alert(
          "Admin token was not received."
        );

        return;
      }

      // =================================================
      // SAVE ADMIN DATA
      // IMPORTANT:
      // App.jsx bhi sessionStorage check karta hai
      // =================================================

      sessionStorage.setItem(
        "adeeka_admin",
        JSON.stringify(data.admin)
      );

      // =================================================
      // SAVE ADMIN TOKEN
      // =================================================

      sessionStorage.setItem(
        "adeeka_admin_token",
        data.token
      );

      // =================================================
      // VERIFY STORAGE
      // =================================================

      console.log(
        "Admin saved:",
        sessionStorage.getItem(
          "adeeka_admin"
        )
      );

      console.log(
        "Admin token saved:",
        Boolean(
          sessionStorage.getItem(
            "adeeka_admin_token"
          )
        )
      );

      // =================================================
      // SUCCESS POPUP
      // =================================================

      setShowSuccess(true);

      // =================================================
      // GO TO ADMIN DASHBOARD
      // =================================================

      setTimeout(() => {
        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );
      }, 1800);

    } catch (error) {
      console.error(
        "Admin Login Error:",
        error
      );

      alert(
        "Admin login failed. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="min-h-screen bg-[#f5eee4] flex items-center justify-center px-6 py-12">

      {/* ================================================= */}
      {/* SUCCESS POPUP */}
      {/* ================================================= */}

      {showSuccess && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            px-6
          "
        >
          <div
            className="
              w-full
              max-w-sm
              bg-[#f5eee4]
              p-8
              text-center
              shadow-2xl
              border
              border-[#d8cec1]
            "
          >

            {/* CHECK ICON */}

            <div
              className="
                w-16
                h-16
                mx-auto
                mb-5
                rounded-full
                bg-[#b18442]
                flex
                items-center
                justify-center
              "
            >
              <span className="text-white text-3xl">
                ✓
              </span>
            </div>

            {/* TITLE */}

            <h2
              className="
                font-serif
                text-2xl
                text-[#17110d]
              "
            >
              Admin Login Successful
            </h2>

            {/* MESSAGE */}

            <p
              className="
                text-sm
                text-[#75695e]
                mt-2
              "
            >
              Welcome to Adeeka Admin Panel
            </p>

            {/* LOADING LINE */}

            <div
              className="
                mt-6
                w-full
                h-[2px]
                bg-[#d8cec1]
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  bg-[#b18442]
                "
                style={{
                  width: "100%",
                  animation:
                    "adminLoading 1.8s linear",
                }}
              />
            </div>

            <p
              className="
                text-[11px]
                text-[#75695e]
                mt-4
              "
            >
              Opening Dashboard...
            </p>

          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* ADMIN LOGIN CARD */}
      {/* ================================================= */}

      <div
        className="
          w-full
          max-w-md
          bg-white
          p-8
          md:p-10
          shadow-sm
        "
      >

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <div
          className="
            flex
            justify-center
            mb-6
          "
        >
          <Link to="/">
            <img
              src={logo}
              alt="Adeeka Fabrics"
              className="
                w-32
                h-auto
                object-contain
              "
            />
          </Link>
        </div>

        {/* ================================================= */}
        {/* ADMIN ICON */}
        {/* ================================================= */}

        <div
          className="
            flex
            justify-center
            mb-4
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-full
              bg-[#f5eee4]
              flex
              items-center
              justify-center
            "
          >
            <ShieldCheck
              size={25}
              className="text-[#b18442]"
            />
          </div>
        </div>

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div
          className="
            text-center
            mb-7
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[3px]
              text-[#b18442]
              mb-2
            "
          >
            Administration
          </p>

          <h1
            className="
              font-serif
              text-3xl
              text-[#17110d]
            "
          >
            Admin Login
          </h1>

          <p
            className="
              text-sm
              text-[#75695e]
              mt-2
            "
          >
            Login to manage Adeeka Fabrics
          </p>
        </div>

        {/* ================================================= */}
        {/* LOGIN FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleAdminLogin}
          className="space-y-5"
        >

          {/* ================================================= */}
          {/* EMAIL */}
          {/* ================================================= */}

          <div>

            <label
              className="
                block
                text-sm
                text-[#17110d]
                mb-2
              "
            >
              Admin Email
            </label>

            <div className="relative">

              <Mail
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#9b8d7e]
                "
              />

              <input
                required
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter admin email"
                className="
                  w-full
                  border
                  border-[#d8cec1]
                  pl-11
                  pr-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#b18442]
                "
              />

            </div>
          </div>

          {/* ================================================= */}
          {/* PASSWORD */}
          {/* ================================================= */}

          <div>

            <label
              className="
                block
                text-sm
                text-[#17110d]
                mb-2
              "
            >
              Admin Password
            </label>

            <div className="relative">

              <Lock
                size={17}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#9b8d7e]
                "
              />

              <input
                required
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter admin password"
                className="
                  w-full
                  border
                  border-[#d8cec1]
                  pl-11
                  pr-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#b18442]
                "
              />

            </div>
          </div>

          {/* ================================================= */}
          {/* LOGIN BUTTON */}
          {/* ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#17110d]
              text-[#f5eee4]
              py-3.5
              text-xs
              uppercase
              tracking-widest
              hover:bg-[#b18442]
              transition
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Logging In..."
              : "Admin Login"}
          </button>

        </form>

        {/* ================================================= */}
        {/* BACK TO WEBSITE */}
        {/* ================================================= */}

        <div
          className="
            text-center
            mt-7
          "
        >
          <Link
            to="/"
            className="
              text-sm
              text-[#b18442]
              hover:underline
            "
          >
            ← Back to Adeeka Fabrics
          </Link>
        </div>

      </div>

      {/* ================================================= */}
      {/* LOADING ANIMATION */}
      {/* ================================================= */}

      <style>
        {`
          @keyframes adminLoading {
            from {
              width: 0%;
            }

            to {
              width: 100%;
            }
          }
        `}
      </style>

    </section>
  );
};

export default AdminLogin;
