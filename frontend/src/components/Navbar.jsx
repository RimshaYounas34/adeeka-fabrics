
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";

import gsap from "gsap";

import { useCart } from "../context/CartContext.jsx";
import logo from "../assets/images/adeeka-logo.png";

import SearchBar from "./SearchBar.jsx";
import { products } from "../data/products.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    cartCount,
    setIsCartOpen,
    wishlist,
  } = useCart();

  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  const navLinkClass = ({ isActive }) =>
    `
      relative
      py-2
      transition
      hover:text-[#b18442]

      after:absolute
      after:left-0
      after:bottom-0
      after:h-[2px]
      after:bg-[#b18442]
      after:transition-all
      after:duration-300

      ${
        isActive
          ? "after:w-full"
          : "after:w-0 hover:after:w-full"
      }
    `;

  return (
    <>
      <nav className="sticky top-0 z-50">

        {/* ================= TOP BAR ================= */}

        <div
          className="
            bg-[#17110d]
            text-[#f5eee4]
            px-5
            py-1
            text-[10px]
            tracking-widest
            hidden
            md:flex
            justify-between
            overflow-hidden
          "
        >
          <p ref={textRef}>
            FREE SHIPPING ON ORDERS ABOVE PKR 5000 | EASY RETURNS
          </p>

          <div className="flex gap-6">
            <span>Track Order</span>
            <span>Store Locator</span>
            <span>Help & Support</span>
          </div>
        </div>


        {/* ================= MAIN NAVBAR ================= */}

        <div
          className="
            bg-[#17110d]
            text-[#f5eee4]
            px-5
            md:px-10
            py-2.5
            flex
            items-center
            justify-between
          "
        >

          {/* MOBILE MENU */}

          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={18} />
          </button>


          {/* LOGO */}

          <NavLink
            to="/"
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Adeeka Fabrics"
              className="w-24 md:w-30 h-auto object-contain"
            />
          </NavLink>


          {/* ================= DESKTOP LINKS ================= */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-7
              text-[12px]
              uppercase
            "
          >

            {/* Home */}

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>


            {/* New Arrivals */}

            <NavLink
              to="/new-arrivals"
              className={navLinkClass}
            >
              New Arrivals
            </NavLink>


            {/* Unstitched */}

            <NavLink
              to="/shop/unstitched"
              className={navLinkClass}
            >
              Unstitched
            </NavLink>


            {/* Collections */}

            <NavLink
              to="/collections"
              className={navLinkClass}
            >
              Collections
            </NavLink>


            {/* Pret */}

            <NavLink
              to="/pret"
              className={navLinkClass}
            >
              Pret
            </NavLink>


            {/* Luxury */}

            <NavLink
              to="/luxury"
              className={navLinkClass}
            >
              Luxury
            </NavLink>


            {/* SALE */}

            <NavLink
              to="/sale"
              className={navLinkClass}
            >
              Sale
            </NavLink>


            {/* About */}

            <NavLink
              to="/about"
              className={navLinkClass}
            >
              About Us
            </NavLink>

          </div>


          {/* ================= RIGHT ICONS ================= */}

          <div className="flex items-center gap-4">

            {/* SEARCH */}

            <button
              onClick={() => setSearchOpen(true)}
              className="
                hover:text-[#b18442]
                transition
              "
              aria-label="Search"
            >
              <Search size={18} />
            </button>


            {/* WISHLIST */}

            <NavLink
              to="/wishlist"
              className="
                relative
                hover:text-[#b18442]
                transition
              "
              aria-label="Wishlist"
            >
              <Heart size={18} />

              {wishlist.length > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-[#b18442]
                    text-[#17110d]
                    text-[9px]
                    font-bold
                    w-4
                    h-4
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {wishlist.length}
                </span>
              )}
            </NavLink>


            {/* CART */}

            <button
              onClick={() => setIsCartOpen(true)}
              className="
                relative
                hover:text-[#b18442]
                transition
              "
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-[#b18442]
                    text-[#17110d]
                    text-[9px]
                    font-bold
                    w-4
                    h-4
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>


            {/* ================= USER ================= */}

            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
                  hover:text-[#b18442]
                  transition
                "
                aria-label="User Account"
              >
                <User size={18} />
              </button>


              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-8
                    w-40
                    bg-white
                    text-[#17110d]
                    shadow-xl
                    border
                    border-[#e5ddd3]
                    py-2
                    z-50
                  "
                >

                  {/* PROFILE */}

                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      px-5
                      py-3
                      text-sm
                      hover:bg-[#f5eee4]
                      hover:text-[#b18442]
                      transition
                    "
                  >
                    Profile
                  </NavLink>


                  {/* ORDERS */}

                  <NavLink
                    to="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      px-5
                      py-3
                      text-sm
                      hover:bg-[#f5eee4]
                      hover:text-[#b18442]
                      transition
                    "
                  >
                    Orders
                  </NavLink>


                  {/* LINE */}

                  <div className="border-t border-[#e5ddd3] my-1"></div>


                  {/* LOGIN */}

                  <NavLink
                    to="/login"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      px-5
                      py-3
                      text-sm
                      hover:bg-[#f5eee4]
                      hover:text-[#b18442]
                      transition
                    "
                  >
                    Login
                  </NavLink>

                </div>
              )}

            </div>

          </div>

        </div>


        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (
          <div
            className="
              fixed
              inset-0
              bg-[#17110d]
              text-[#f5eee4]
              z-[60]
              p-6
            "
          >

            {/* CLOSE */}

            <button
              onClick={() => setMenuOpen(false)}
              className="mb-10"
              aria-label="Close Menu"
            >
              <X size={28} />
            </button>


            {/* MOBILE LOGO */}

            <img
              src={logo}
              alt="Adeeka Fabrics"
              className="w-32 mb-10"
            />


            {/* MOBILE LINKS */}

            <div
              className="
                flex
                flex-col
                gap-6
                text-2xl
              "
            >

              {/* Home */}

              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Home
              </NavLink>


              {/* New Arrivals */}

              <NavLink
                to="/new-arrivals"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                New Arrivals
              </NavLink>


              {/* Unstitched */}

              <NavLink
                to="/shop/unstitched"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Unstitched
              </NavLink>


              {/* Collections */}

              <NavLink
                to="/collections"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Collections
              </NavLink>


              {/* Pret */}

              <NavLink
                to="/pret"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Pret
              </NavLink>


              {/* Luxury */}

              <NavLink
                to="/luxury"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Luxury
              </NavLink>


              {/* SALE */}

              <NavLink
                to="/sale"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Sale
              </NavLink>


              {/* About */}

              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                About Us
              </NavLink>


              {/* Profile */}

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Profile
              </NavLink>

            </div>

          </div>
        )}

      </nav>


      {/* ================= SEARCH BAR ================= */}

      {searchOpen && (
        <SearchBar
          products={products}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

