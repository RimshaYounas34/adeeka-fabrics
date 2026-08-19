import { motion } from "framer-motion";
import { Gem, Sparkles, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const features = [
  { icon: Gem, title: "Premium Quality", sub: "Fabrics that speak luxury" },
  { icon: Sparkles, title: "Exclusive Designs", sub: "Timeless styles crafted with care" },
  { icon: RefreshCcw, title: "Easy Returns", sub: "Hassle-free returns policy" },
  { icon: ShieldCheck, title: "Secure Payment", sub: "100% safe & secure checkout" },
  { icon: Truck, title: "Fast Delivery", sub: "Quick delivery at your doorstep" },
];

export default function WhyChoose() {
  return (
    <section className="py-16 px-6 md:px-10 bg-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Why Choose Adeeka?" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.08, backgroundColor: "#B08D3E" }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center text-gold hover:text-charcoal"
              >
                <f.icon size={26} strokeWidth={1.5} />
              </motion.div>
              <p className="font-elegant text-base font-semibold text-charcoal">{f.title}</p>
              <p className="text-xs text-charcoal/50 font-sans max-w-[140px]">{f.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
