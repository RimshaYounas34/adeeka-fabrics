import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import lawnImg from "../assets/images/lawn.jpg";
import chiffonImg from "../assets/images/chiffon.jpg";
import silkImg from "../assets/images/silk.jpg";
import formalImg from "../assets/images/formal.jpg";

const collections = [
  {
    name: "Lawn Collection",
    slug: "lawn",
    image: lawnImg,
  },
  {
    name: "Chiffon Collection",
    slug: "chiffon",
    image: chiffonImg,
  },
  {
    name: "Silk Collection",
    slug: "silk",
    image: silkImg,
  },
  {
    name: "Formal Collection",
    slug: "formal",
    image: formalImg,
  },
];

const Collections = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-10">

          <h2 className="font-serif text-3xl md:text-4xl text-[#17110d]">
            Our Collections
          </h2>

          <p className="text-sm text-[#75695e] mt-2">
            Explore our beautiful collections
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-3" />

        </div>

        {/* COLLECTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {collections.map((item, index) => (

            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >

              <Link
                to={`/collections/${item.slug}`}
                className="
                  relative
                  block
                  h-64
                  md:h-80
                  overflow-hidden
                  group
                "
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                {/* TEXT */}
                <div className="absolute bottom-5 left-5">

                  <h3 className="text-white text-lg md:text-xl font-serif">
                    {item.name}
                  </h3>

                  <p className="text-[#d4a85c] text-xs uppercase tracking-widest mt-1">
                    Shop Now
                  </p>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Collections;