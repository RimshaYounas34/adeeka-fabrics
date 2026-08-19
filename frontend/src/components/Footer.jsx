import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaTiktok,
  FaChrome,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../assets/images/adeeka-logo.png";


const shop = [
  "New Arrivals",
  "Unstitched",
  "Pret",
  "Luxury",
  "Sale",
];

const care = [
  "Contact Us",
  "FAQs",
  "Shipping",
  "Returns",
];

const about = [
  "Our Story",
  "Careers",
  "Privacy Policy",
  "Terms & Conditions",
];


export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 pt-14 pb-6 px-6 md:px-10">

      {/* ================= MAIN FOOTER ================= */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 pb-10 border-b border-cream/10">


        {/* ================= LOGO ================= */}

        <div>

          <Link to="/">
            <img
              src={logo}
              alt="Adeeka Fabrics"
              className="w-32 h-auto mb-4"
            />
          </Link>

          <p className="text-cream/50 max-w-xs text-sm leading-6">
            Elegant fashion made for the modern woman.
          </p>


          {/* ================= SOCIAL ICONS ================= */}

          <div className="flex gap-4 mt-5">

            {/* Facebook */}

            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-gold transition"
            >
              <Facebook size={18} />
            </a>


            {/* Instagram */}

            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-gold transition"
            >
              <Instagram size={18} />
            </a>


            {/* TikTok */}

            <a
              href="#"
              aria-label="TikTok"
              className="hover:text-gold transition"
            >
              <FaTiktok size={17} />
            </a>


            {/* Website / Chrome */}

            <a
              href="#"
              aria-label="Website"
              className="hover:text-gold transition"
            >
              <FaChrome size={18} />
            </a>

          </div>

        </div>


        {/* ================= SHOP ================= */}

        <FooterCol
          title="Shop"
          items={shop}
        />


        {/* ================= CUSTOMER CARE ================= */}

        <FooterCol
          title="Customer Care"
          items={care}
        />


        {/* ================= ABOUT ================= */}

        <FooterCol
          title="About"
          items={about}
        />

      </div>


      {/* ================= BOTTOM SECTION ================= */}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 pt-6">


        {/* COPYRIGHT */}

        <p className="text-xs text-cream/40 text-center md:text-left">
          © {new Date().getFullYear()} Adeeka Fabrics. All Rights Reserved.
        </p>


        {/* ================= CONTACT INFO ================= */}

        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-cream/50">


          {/* PHONE */}

          <a
            href="tel:03467771009"
            className="flex items-center gap-2 hover:text-gold transition"
          >
            <Phone size={14} />

            <span>
              0346 7771009
            </span>
          </a>


          {/* EMAIL */}

          <a
            href="mailto:info@adeeka.pk"
            className="flex items-center gap-2 hover:text-gold transition"
          >
            <Mail size={14} />

            <span>
              info@adeeka.pk
            </span>
          </a>


          {/* LOCATION */}

          <span className="flex items-center gap-2">
            <MapPin size={14} />

            <span>
              Lahore, Pakistan
            </span>
          </span>

        </div>

      </div>

    </footer>
  );
}


/* ================= FOOTER COLUMN ================= */

function FooterCol({ title, items }) {

  return (
    <div>

      <h4 className="text-cream uppercase tracking-widest text-xs mb-4">
        {title}
      </h4>


      <ul className="space-y-2">

        {items.map((item) => (

          <li key={item}>

            <Link
              to="#"
              className="hover:text-gold transition-colors"
            >
              {item}
            </Link>

          </li>

        ))}

      </ul>

    </div>
  );
}