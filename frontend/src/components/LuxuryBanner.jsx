import { Link } from "react-router-dom";
import luxuryImage from "../assets/images/luxury.png";

export default function LuxuryBanner() {
  return (
    <section className="bg-[#17110d] text-[#f5eee4] overflow-hidden">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">

        {/* Left Side */}
        <div className="px-8 md:px-14 py-16">

          <p className="text-[#b18442] text-xs uppercase tracking-widest mb-3">
            Luxury Collection
          </p>

          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
            Premium Fabrics,
            <br />
            <span className="italic text-[#b18442]">
              Exquisite
            </span>{" "}
            Designs
          </h2>

          <p className="text-[#f5eee4]/60 text-base mb-8 max-w-sm">
            Summer '26 Collection is now available — timeless pieces
            crafted for the modern woman.
          </p>

          <Link
            to="/shop/luxury"
            className="inline-block bg-[#b18442] text-[#17110d] px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-[#c89b5a] transition"
          >
            Explore Now
          </Link>

        </div>

        {/* Right Side */}
        <div className="h-72 md:h-[420px]">

          <img
            src={luxuryImage}
            alt="Luxury Collection"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

    </section>
  );
}