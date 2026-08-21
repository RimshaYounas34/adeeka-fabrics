import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

// ================= COMPONENTS =================

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Toast from "./components/Toast.jsx";
import Preloader from "./components/Preloader.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Marquee from "./components/Marquee.jsx";

// ================= MAIN PAGES =================

import Home from "./pages/Home.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import CollectionsPage from "./pages/CollectionsPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AboutDetailsPage from "./pages/AboutDetailsPage.jsx";

// ================= CATEGORY PAGES =================

import NewArrivals from "./pages/NewArrivals.jsx";
import PretPage from "./pages/PretPage.jsx";
import LuxuryPage from "./pages/LuxuryPage.jsx";
import SalePage from "./pages/SalePage.jsx";
import FormalPage from "./pages/FormalPage.jsx";
import CasualPage from "./pages/CasualPage.jsx";

// ================= COLLECTION PAGES =================

import LawnCollection from "./pages/LawnCollection.jsx";
import ChiffonCollection from "./pages/ChiffonCollection.jsx";
import SilkCollection from "./pages/SilkCollection.jsx";

// ================= PRODUCT =================

import ProductDetails from "./pages/ProductDetails.jsx";

// ================= AUTH =================

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";

// ================= ADMIN =================

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import ManageOrders from "./pages/admin/ManageOrders.jsx";

// ================= BEST SELLERS =================

import BestSellersPage from "./pages/BestSellersPage.jsx";

// ================= NOT FOUND =================

import NotFoundPage from "./pages/NotFoundPage.jsx";

// =====================================================
// USER LOGIN CHECK
// =====================================================

const isUserLoggedIn = () => {
  const sessionUser =
    sessionStorage.getItem("adeeka_user");

  const localUser =
    localStorage.getItem("adeeka_user");

  return Boolean(
    sessionUser || localUser
  );
};

// =====================================================
// ADMIN LOGIN CHECK
// =====================================================

const isAdminLoggedIn = () => {
  // Check sessionStorage first
  const sessionToken =
    sessionStorage.getItem(
      "adeeka_admin_token"
    );

  const sessionAdmin =
    sessionStorage.getItem(
      "adeeka_admin"
    );

  // Also check localStorage
  // This keeps compatibility with previous setup
  const localToken =
    localStorage.getItem(
      "adeeka_admin_token"
    );

  const localAdmin =
    localStorage.getItem(
      "adeeka_admin"
    );

  const token =
    sessionToken || localToken;

  const admin =
    sessionAdmin || localAdmin;

  return Boolean(
    token &&
    admin
  );
};

// =====================================================
// USER PROTECTED ROUTE
// =====================================================

const ProtectedRoute = ({ children }) => {
  if (!isUserLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

// =====================================================
// ADMIN PROTECTED ROUTE
// =====================================================

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();

  const adminLoggedIn =
    isAdminLoggedIn();

  // ===================================================
  // DEBUG ADMIN AUTH
  // ===================================================

  const sessionToken =
    sessionStorage.getItem(
      "adeeka_admin_token"
    );

  const localToken =
    localStorage.getItem(
      "adeeka_admin_token"
    );

  const sessionAdmin =
    sessionStorage.getItem(
      "adeeka_admin"
    );

  const localAdmin =
    localStorage.getItem(
      "adeeka_admin"
    );

  console.log(
    "================================="
  );

  console.log(
    "ADMIN TOKEN:",
    sessionToken || localToken
  );

  console.log(
    "ADMIN DATA:",
    sessionAdmin || localAdmin
  );

  console.log(
    "ADMIN LOGGED IN:",
    adminLoggedIn
  );

  console.log(
    "================================="
  );

  // ===================================================
  // ADMIN LOGIN NAHI HAI
  // ===================================================

  if (!adminLoggedIn) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ===================================================
  // ADMIN LOGIN HAI
  // ===================================================

  return children;
};

// =====================================================
// APP
// =====================================================

function App() {
  const location =
    useLocation();

  const [
    loggedIn,
    setLoggedIn,
  ] = useState(
    isUserLoggedIn()
  );

  // ===================================================
  // USER AUTH LISTENER
  // ===================================================

  useEffect(() => {
    const checkAuth = () => {
      setLoggedIn(
        isUserLoggedIn()
      );
    };

    window.addEventListener(
      "adeeka-auth-change",
      checkAuth
    );

    window.addEventListener(
      "storage",
      checkAuth
    );

    checkAuth();

    return () => {
      window.removeEventListener(
        "adeeka-auth-change",
        checkAuth
      );

      window.removeEventListener(
        "storage",
        checkAuth
      );
    };
  }, []);

  // ===================================================
  // SCROLL TOP
  // ===================================================

  useEffect(() => {
    window.scrollTo(
      0,
      0
    );
  }, [
    location.pathname,
  ]);

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div className="min-h-screen flex flex-col">

      {/* ================= GLOBAL ================= */}

      <Preloader />

      <ScrollProgress />

      <Navbar />

      <Marquee />

      <main className="flex-1">

        <Routes>

          {/* ================= HOME ================= */}

          <Route
            path="/"
            element={
              <Home />
            }
          />

          {/* ================= USER AUTH ================= */}

          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />

          {/* ================= USER PAGES ================= */}

          <Route
            path="/new-arrivals"
            element={
              <ProtectedRoute>
                <NewArrivals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pret"
            element={
              <ProtectedRoute>
                <PretPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/luxury"
            element={
              <ProtectedRoute>
                <LuxuryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sale"
            element={
              <ProtectedRoute>
                <SalePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/formal"
            element={
              <ProtectedRoute>
                <FormalPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/casual"
            element={
              <ProtectedRoute>
                <CasualPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/best-sellers"
            element={
              <ProtectedRoute>
                <BestSellersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop/:category"
            element={
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <CollectionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/collections/lawn"
            element={
              <ProtectedRoute>
                <LawnCollection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/collections/chiffon"
            element={
              <ProtectedRoute>
                <ChiffonCollection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/collections/silk"
            element={
              <ProtectedRoute>
                <SilkCollection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about/details"
            element={
              <ProtectedRoute>
                <AboutDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product-details/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ADMIN LOGIN - PUBLIC */}
          {/* ================================================= */}

          <Route
            path="/admin/login"
            element={
              <AdminLogin />
            }
          />

          {/* ================================================= */}
          {/* ADMIN DASHBOARD - PROTECTED */}
          {/* ================================================= */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ADMIN ADD PRODUCT - PROTECTED */}
          {/* ================================================= */}

          <Route
            path="/admin/add-product"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ADMIN PRODUCTS - PROTECTED */}
          {/* ================================================= */}

          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute>
                <ManageProducts />
              </AdminProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ADMIN USERS - PROTECTED */}
          {/* ================================================= */}

          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <AdminUsers />
              </AdminProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ADMIN ORDERS - PROTECTED */}
          {/* ================================================= */}

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <ManageOrders />
              </AdminProtectedRoute>
            }
          />

          {/* ================= NOT FOUND ================= */}

          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />

        </Routes>

      </main>

      {/* ================= FOOTER ================= */}

      <Footer />

      <CartDrawer />

      <Toast />

    </div>
  );
}

export default App;