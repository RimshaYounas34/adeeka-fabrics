
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase.js";
import logo from "../assets/images/adeeka-logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ================= SUCCESS POPUP =================

  const showSuccessPopup = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  // ================= SAVE USER TO MONGODB =================

  const saveUserToMongoDB = async (userData) => {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "User could not be saved");
    }

    return data;
  };

  // ================= EMAIL SIGNUP =================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // Create Firebase account
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add name to Firebase
      await updateProfile(result.user, {
        displayName: name,
      });

      // Save user in MongoDB
      await saveUserToMongoDB({
        name: name,
        email: email,
        password: password,
      });

      // Save user in localStorage
      const user = {
        uid: result.user.uid,
        name: name,
        email: result.user.email,
        photo: "",
      };

      localStorage.setItem(
        "adeeka_user",
        JSON.stringify(user)
      );

      // Success
      showSuccessPopup(
        `Welcome ${name}! Your account has been created successfully.`
      );

    } catch (error) {
      console.log("Signup Error:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      } else if (error.message === "User already exists") {
        alert("This email already exists in MongoDB.");
      } else {
        alert(error.message || "Signup failed. Please try again.");
      }
    }
  };

  // ================= GOOGLE SIGNUP =================

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      const googleUser = result.user;

      const googleName =
        googleUser.displayName || "Google User";

      const googleEmail = googleUser.email;

      // Save Google user in MongoDB
      try {
        await saveUserToMongoDB({
          name: googleName,
          email: googleEmail,
          password: googleUser.uid,
        });
      } catch (error) {
        // If user already exists, continue
        if (error.message !== "User already exists") {
          throw error;
        }
      }

      // Save user in localStorage
      const user = {
        uid: googleUser.uid,
        name: googleName,
        email: googleEmail,
        photo: googleUser.photoURL || "",
      };

      localStorage.setItem(
        "adeeka_user",
        JSON.stringify(user)
      );

      // Success
      showSuccessPopup(
        `Welcome ${googleName}! Google signup successful.`
      );

    } catch (error) {
      console.log("Google Signup Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        return;
      }

      if (error.code === "auth/popup-blocked") {
        alert(
          "Google popup was blocked. Please allow popups."
        );
        return;
      }

      if (error.code === "auth/cancelled-popup-request") {
        return;
      }

      alert(
        error.message ||
        "Google signup failed. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#f5eee4] flex items-center justify-center px-6 py-12">

      {/* ================= REGISTER CARD ================= */}

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
            Create Account
          </h1>

          <p className="text-sm text-[#75695e] mt-2">
            Join Adeeka Fabrics today
          </p>

        </div>

        {/* GOOGLE SIGNUP */}

        <button
          type="button"
          onClick={handleGoogleSignup}
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

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="block text-sm text-[#17110d] mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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

            <label className="block text-sm text-[#17110d] mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
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

          {/* SIGN UP */}

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
            Sign Up
          </button>

        </form>

        {/* LOGIN */}

        <p className="text-center text-sm text-[#75695e] mt-7">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#b18442] hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

      {/* ================= SUCCESS POPUP ================= */}

      {showSuccess && (

        <div className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/40
          px-5
        ">

          <div className="
            bg-white
            w-full
            max-w-sm
            p-8
            text-center
            shadow-2xl
          ">

            {/* CHECK */}

            <div className="
              mx-auto
              mb-5
              w-14
              h-14
              rounded-full
              bg-[#b18442]
              text-white
              flex
              items-center
              justify-center
              text-2xl
            ">
              ✓
            </div>

            <h2 className="
              font-serif
              text-2xl
              text-[#17110d]
              mb-2
            ">
              Success!
            </h2>

            <p className="
              text-sm
              text-[#75695e]
              leading-6
            ">
              {successMessage}
            </p>

            <p className="
              text-xs
              text-[#b18442]
              mt-5
            ">
              Redirecting to Home...
            </p>

          </div>

        </div>

      )}

    </section>
  );
};

export default RegisterPage;