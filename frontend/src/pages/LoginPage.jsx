
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase.js";

import logo from "../assets/images/adeeka-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  // ================= SAVE USER TO MONGODB =================

  const saveUserToMongoDB = async (firebaseUser) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("MongoDB error:", data);
        return false;
      }

      console.log("User saved in MongoDB:", data);

      return true;
    } catch (error) {
      console.log("MongoDB connection error:", error);
      return false;
    }
  };

  // ================= SUCCESS POPUP =================

  const showLoginSuccess = (name) => {
    setSuccessName(name || "Welcome to Adeeka Fabrics");
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // ================= EMAIL LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      // Firebase login
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firebase user
      const user = {
        uid: result.user.uid,
        name: result.user.displayName || "User",
        email: result.user.email,
        photo: result.user.photoURL || "",
      };

      // LocalStorage
      localStorage.setItem(
        "adeeka_user",
        JSON.stringify(user)
      );

      // MongoDB mein save
      await saveUserToMongoDB(result.user);

      // Success popup
      showLoginSuccess(
        result.user.displayName || "Welcome to Adeeka Fabrics"
      );

    } catch (error) {
      console.log(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/invalid-login-credentials"
      ) {
        alert("Invalid email or password");
      } else if (error.code === "auth/user-not-found") {
        alert("Account not found. Please signup first.");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  // ================= GOOGLE LOGIN =================

  const handleGoogleLogin = async () => {
    try {
      // Google Firebase login
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      // Firebase user
      const user = {
        uid: result.user.uid,
        name: result.user.displayName || "User",
        email: result.user.email,
        photo: result.user.photoURL || "",
      };

      // LocalStorage
      localStorage.setItem(
        "adeeka_user",
        JSON.stringify(user)
      );

      // MongoDB mein save
      await saveUserToMongoDB(result.user);

      // Success popup
      showLoginSuccess(
        result.user.displayName || "Welcome to Adeeka Fabrics"
      );

    } catch (error) {
      console.log(error);

      if (error.code === "auth/popup-closed-by-user") {
        return;
      }

      if (error.code === "auth/popup-blocked") {
        alert(
          "Google login popup was blocked. Please allow popups."
        );
        return;
      }

      if (error.code === "auth/cancelled-popup-request") {
        return;
      }

      alert("Google login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f5eee4] flex items-center justify-center px-6 py-12">

      {/* ================= SUCCESS POPUP ================= */}

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

            <h2 className="font-serif text-2xl text-[#17110d]">
              Login Successful
            </h2>

            {/* MESSAGE */}

            <p className="text-sm text-[#75695e] mt-2">
              Welcome {successName} ❤️
            </p>

            {/* GOLD LINE */}

            <div className="mt-6 w-full h-[2px] bg-[#d8cec1] overflow-hidden">

              <div
                className="
                  h-full
                  bg-[#b18442]
                  animate-[loading_2s_linear]
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

      {/* ================= LOGIN CARD ================= */}

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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
