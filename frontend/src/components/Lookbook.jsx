import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

// Lookbook images
import look1 from "../assets/images/look1.jpg";
import look2 from "../assets/images/look2.jpg";
import look3 from "../assets/images/look3.jpg";
import look4 from "../assets/images/look4.jpg";
import look5 from "../assets/images/look5.jpg";

const Lookbook = () => {

  const images = [
    look1,
    look2,
    look3,
    look4,
    look5,
  ];

  return (
    <section className="py-16 px-6 md:px-10 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <h2 className="font-serif text-3xl md:text-4xl text-[#17110d]">
            Lookbook
          </h2>

          <p className="text-sm text-[#75695e] mt-2">
            Explore our latest styles
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-3"></div>

        </div>


        {/* Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">

          {images.map((image, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="aspect-square overflow-hidden group"
            >

              <img
                src={image}
                alt={`Lookbook ${index + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

            </motion.div>

          ))}


          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="
              aspect-square
              bg-[#17110d]
              text-[#f5eee4]
              flex
              flex-col
              items-center
              justify-center
              gap-2
            "
          >

            <Instagram size={22} />

            <p className="text-[11px] text-center px-2">
              Follow us on Instagram
            </p>

            <p className="text-[10px] text-[#b18442]">
              @adeeka.fabrics
            </p>

          </a>

        </div>

      </div>

    </section>
  );
};

export default Lookbook;