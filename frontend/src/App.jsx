import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

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
import FormalCollection from "./pages/FormalPage.jsx";

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
// CHECK LOGIN
// =====================================================

const isLoggedIn = () => {
  return localStorage.getItem("adeeka_user") !== null;
};

// =====================================================
// PROTECTED ROUTE
// =====================================================

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// =====================================================
// APP
// =====================================================

function App() {
  const location = useLocation();

  // Har page change par top par scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= GLOBAL COMPONENTS ================= */}

      <Preloader />

      <ScrollProgress />

      <Navbar />

      <Marquee />

      {/* ================= MAIN ================= */}

      <main className="flex-1">
        <Routes>
          {/* ================================================= */}
          {/* HOME - NO LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route path="/" element={<Home />} />

          {/* ================================================= */}
          {/* LOGIN - NO LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route path="/login" element={<LoginPage />} />

          {/* ================================================= */}
          {/* REGISTER - NO LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route path="/register" element={<RegisterPage />} />

          {/* ================================================= */}
          {/* NEW ARRIVALS - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/new-arrivals"
            element={
              <ProtectedRoute>
                <NewArrivals />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* PRET - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/pret"
            element={
              <ProtectedRoute>
                <PretPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* LUXURY - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/luxury"
            element={
              <ProtectedRoute>
                <LuxuryPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* SALE - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/sale"
            element={
              <ProtectedRoute>
                <SalePage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* FORMAL - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/formal"
            element={
              <ProtectedRoute>
                <FormalPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* CASUAL - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/casual"
            element={
              <ProtectedRoute>
                <CasualPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* BEST SELLERS - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/best-sellers"
            element={
              <ProtectedRoute>
                <BestSellersPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* SHOP CATEGORY - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/shop/:category"
            element={
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* COLLECTIONS MAIN - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <CollectionsPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* LAWN COLLECTION - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/collections/lawn"
            element={
              <ProtectedRoute>
                <LawnCollection />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* CHIFFON COLLECTION - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/collections/chiffon"
            element={
              <ProtectedRoute>
                <ChiffonCollection />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* SILK COLLECTION - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/collections/silk"
            element={
              <ProtectedRoute>
                <SilkCollection />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* FORMAL COLLECTION - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/collections/formal"
            element={
              <ProtectedRoute>
                <FormalCollection />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* WISHLIST - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* CHECKOUT - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* PROFILE - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ORDERS - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ABOUT - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ABOUT DETAILS - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/about/details"
            element={
              <ProtectedRoute>
                <AboutDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* PRODUCT DETAILS - LOGIN REQUIRED */}
          {/* ================================================= */}

          <Route
            path="/product-details/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* ================================================= */}
          {/* ADMIN LOGIN */}
          {/* ================================================= */}

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================================================= */}
          {/* ADMIN DASHBOARD */}
          {/* ================================================= */}

          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ================================================= */}
          {/* ADMIN ADD PRODUCT */}
          {/* ================================================= */}

          <Route path="/admin/add-product" element={<AddProduct />} />

          {/* ================================================= */}
          {/* ADMIN MANAGE PRODUCTS */}
          {/* ================================================= */}

          <Route path="/admin/products" element={<ManageProducts />} />
          {/* ================================================= */}
          {/* ADMIN USERS / CUSTOMERS */}
          {/* ================================================= */}

          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<ManageOrders />} />

          {/* ================================================= */}
          {/* WRONG URL */}
          {/* ================================================= */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* ================= FOOTER ================= */}

      <Footer />

      {/* ================= CART DRAWER ================= */}

      <CartDrawer />

      {/* ================= TOAST ================= */}

      <Toast />
    </div>
  );
}

export default App;
