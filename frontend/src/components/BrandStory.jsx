import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import brandImage from "../assets/images/brand-story.png";


const BrandStory = () => {
  return (
    <section className="bg-[#17110d] text-[#f5eee4]">

      <div className="w-full grid md:grid-cols-[1.1fr_0.9fr] items-center">

        {/* Image */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="h-72 md:h-[500px] w-full"
        >

          <img
            src={brandImage}
            alt="Adeeka Fabrics"
            className="w-full h-full object-cover"
          />

        </motion.div>


        {/* Content */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="px-8 md:px-14 py-12 md:py-16"
        >

          <p className="text-[#b18442] text-xs uppercase tracking-widest mb-3">
            The Adeeka Story
          </p>


          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            A Family. A Brand.
            <span className="text-[#b18442] italic">
              {" "}A Legacy.
            </span>
          </h2>


          <p className="text-[#f5eee4]/60 text-base leading-7 mb-8 max-w-md">
            Founded with a passion for timeless beauty and quality,
            Adeeka Fabrics brings elegant designs and beautiful fabrics
            made for every special moment.
          </p>


          {/* Read More */}

          <Link
            to="/about/details"
            className="
              inline-block
              border border-[#b18442]
              text-[#b18442]
              px-7 py-3
              text-xs
              uppercase
              tracking-widest
              hover:bg-[#b18442]
              hover:text-[#17110d]
              transition
            "
          >
            Read More
          </Link>

        </motion.div>

      </div>

    </section>
  );
};


export default BrandStory;