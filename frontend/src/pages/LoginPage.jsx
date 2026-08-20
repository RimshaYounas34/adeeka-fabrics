
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase.js";

import logo from "../assets/images/adeeka-logo.png";

// =====================================================
// API URL
// =====================================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

// =====================================================
// LOGIN PAGE
// =====================================================

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  // =====================================================
  // SAVE USER TO LOCAL STORAGE
  // =====================================================

  const saveUserToLocalStorage = (user) => {
    const userData = {
      uid: user.uid,
      name: user.displayName || "User",
      email: user.email,
      photo: user.photoURL || "",
      role: "user",
    };

    localStorage.setItem(
      "adeeka_user",
      JSON.stringify(userData)
    );

    console.log(
      "User saved to localStorage:",
      userData
    );
  };

  // =====================================================
  // SAVE / CREATE USER IN MONGODB
  // =====================================================

  const saveUserToMongoDB = async (firebaseUser) => {
    try {
      const userData = {
        firebaseUid: firebaseUser.uid,

        name:
          firebaseUser.displayName ||
          "User",

        email: firebaseUser.email,

        password: "",

        role: "user",
      };

      console.log(
        "================================="
      );

      console.log(
        "SENDING USER TO MONGODB:"
      );

      console.log(userData);

      console.log(
        "API URL:",
        `${API_URL}/api/users`
      );

      console.log(
        "================================="
      );

      const response = await fetch(
        `${API_URL}/api/users`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      console.log(
        "================================="
      );

      console.log(
        "MONGODB USER RESPONSE:"
      );

      console.log(data);

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "================================="
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "User could not be saved in MongoDB"
        );
      }

      return data;

    } catch (error) {
      console.error(
        "MongoDB Save Error:",
        error
      );

      throw error;
    }
  };

  // =====================================================
  // SUCCESS POPUP
  // =====================================================

  const showLoginSuccess = (name) => {
    setSuccessName(
      name ||
        "Welcome to Adeeka Fabrics"
    );

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // =====================================================
  // EMAIL LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(
        "Please enter email and password"
      );

      return;
    }

    try {
      // =================================================
      // FIREBASE LOGIN
      // =================================================

      const result =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const firebaseUser = result.user;

      console.log(
        "Firebase Login Successful:",
        firebaseUser
      );

      // =================================================
      // SAVE / CREATE USER IN MONGODB
      // =================================================

      await saveUserToMongoDB(
        firebaseUser
      );

      // =================================================
      // SAVE USER TO LOCAL STORAGE
      // =================================================

      saveUserToLocalStorage(
        firebaseUser
      );

      // =================================================
      // SUCCESS
      // =================================================

      showLoginSuccess(
        firebaseUser.displayName ||
          "Welcome to Adeeka Fabrics"
      );

    } catch (error) {
      console.error(
        "================================="
      );

      console.error(
        "LOGIN ERROR:",
        error
      );

      console.error(
        "================================="
      );

      // =================================================
      // FIREBASE ERRORS
      // =================================================

      if (
        error.code ===
          "auth/invalid-credential" ||
        error.code ===
          "auth/invalid-login-credentials"
      ) {
        alert(
          "Invalid email or password."
        );

      } else if (
        error.code ===
        "auth/user-not-found"
      ) {
        alert(
          "Account not found. Please signup first."
        );

      } else if (
        error.code ===
        "auth/wrong-password"
      ) {
        alert(
          "Wrong password."
        );

      } else if (
        error.code ===
        "auth/too-many-requests"
      ) {
        alert(
          "Too many login attempts. Please try again later."
        );

      } else if (
        error.message?.includes(
          "Route not found"
        )
      ) {
        alert(
          "MongoDB API route not found. Please check backend server."
        );

      } else if (
        error.message?.includes(
          "MongoDB"
        )
      ) {
        alert(
          "Firebase login successful, but MongoDB could not save the user."
        );

      } else {
        alert(
          error.message ||
            "Login failed. Please try again."
        );
      }
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = async () => {
    try {
      // =================================================
      // GOOGLE FIREBASE LOGIN
      // =================================================

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      const firebaseUser =
        result.user;

      console.log(
        "Google Firebase User:",
        firebaseUser
      );

      // =================================================
      // SAVE / CREATE GOOGLE USER IN MONGODB
      // =================================================

      await saveUserToMongoDB(
        firebaseUser
      );

      // =================================================
      // SAVE USER TO LOCAL STORAGE
      // =================================================

      saveUserToLocalStorage(
        firebaseUser
      );

      // =================================================
      // SUCCESS
      // =================================================

      showLoginSuccess(
        firebaseUser.displayName ||
          "Welcome to Adeeka Fabrics"
      );

    } catch (error) {
      console.error(
        "================================="
      );

      console.error(
        "GOOGLE LOGIN ERROR:",
        error
      );

      console.error(
        "================================="
      );

      // =================================================
      // GOOGLE FIREBASE ERRORS
      // =================================================

      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        return;
      }

      if (
        error.code ===
        "auth/popup-blocked"
      ) {
        alert(
          "Google login popup was blocked. Please allow popups."
        );

        return;
      }

      if (
        error.code ===
        "auth/cancelled-popup-request"
      ) {
        return;
      }

      // =================================================
      // MONGODB ROUTE ERROR
      // =================================================

      if (
        error.message?.includes(
          "Route not found"
        )
      ) {
        alert(
          "Google login successful, but MongoDB API route was not found."
        );

        return;
      }

      // =================================================
      // MONGODB ERROR
      // =================================================

      if (
        error.message?.includes(
          "MongoDB"
        )
      ) {
        alert(
          "Google login successful, but MongoDB could not save the user."
        );

        return;
      }

      alert(
        error.message ||
          "Google login failed. Please try again."
      );
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">

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

            <h2 className="font-serif text-2xl text-[#17110d]">
              Login Successful
            </h2>

            <p className="text-sm text-[#75695e] mt-2">
              Welcome {successName} ❤️
            </p>

            <div className="mt-6 w-full h-[2px] bg-[#d8cec1] overflow-hidden">

              <div
                className="
                  h-full
                  bg-[#b18442]
                "
                style={{
                  width: "100%",
                }}
              />

            </div>

            <p className="text-[11px] text-[#75695e] mt-4">
              Redirecting to Home...
            </p>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* LOGIN CARD */}
      {/* ================================================= */}

      <div className="w-full max-w-md bg-white p-8 md:p-10 shadow-sm">

        {/* LOGO */}

        <div className="flex justify-center mb-6">

          <Link to="/">

            <img
              src={logo}
              alt="Adeeka Fabrics"
              className="w-32 h-auto object-contain"
            />

          </Link>

        </div>

        {/* HEADING */}

        <div className="text-center mb-7">

          <h1 className="font-serif text-3xl text-[#17110d]">
            Welcome Back
          </h1>

          <p className="text-sm text-[#75695e] mt-2">
            Login to your Adeeka account
          </p>

        </div>

        {/* GOOGLE LOGIN */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="
            w-full
            border
            border-[#d8cec1]
            py-3
            flex
            items-center
            justify-center
            gap-3
            text-sm
            text-[#17110d]
            hover:bg-[#f5eee4]
            transition
          "
        >

          <span className="font-bold text-base">
            G
          </span>

          Continue with Google

        </button>

        {/* OR */}

        <div className="flex items-center gap-3 my-6">

          <span className="flex-1 h-[1px] bg-[#d8cec1]" />

          <span className="text-xs text-[#75695e]">
            OR
          </span>

          <span className="flex-1 h-[1px] bg-[#d8cec1]" />

        </div>

        {/* LOGIN FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-sm text-[#17110d] mb-2">
              Email
            </label>

            <input
              required
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="
                w-full
                border
                border-[#d8cec1]
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#b18442]
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <div className="flex justify-between mb-2">

              <label className="text-sm text-[#17110d]">
                Password
              </label>

              <button
                type="button"
                className="
                  text-xs
                  text-[#b18442]
                  hover:underline
                "
              >
                Forgot Password?
              </button>

            </div>

            <input
              required
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full
                border
                border-[#d8cec1]
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#b18442]
              "
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
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
            "
          >
            Login
          </button>

        </form>

        {/* SIGNUP */}

        <p className="text-center text-sm text-[#75695e] mt-7">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-[#b18442] hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </section>
  );
};

export default LoginPage;
