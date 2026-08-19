import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const testimonials = [
  {
    name: "Ayesha Khan",
    text: "The fabric quality is amazing and the design is very elegant.",
    rating: 5,
  },
  {
    name: "Sana Ahmed",
    text: "Beautiful collection and excellent quality. I really loved it.",
    rating: 5,
  },
  {
    name: "Hira Malik",
    text: "The fabric feels premium and the delivery was also very good.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-10 bg-[#eee5d8]">
      
      <div className="max-w-7xl mx-auto">

        <SectionHeading title="What Our Customers Say" />

        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-7 text-center shadow-sm"
            >

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4 text-[#b18442]">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="font-serif text-lg text-[#625950] italic mb-4">
                "{item.text}"
              </p>

              {/* Name */}
              <p className="text-xs uppercase tracking-widest text-[#b18442]">
                — {item.name}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;