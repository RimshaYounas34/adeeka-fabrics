import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`h-px ${light ? "bg-gold" : "bg-gold"}`}
        />
        <h2
          className={`font-display uppercase tracking-[0.25em] text-sm md:text-base ${
            light ? "text-cream" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-px bg-gold"
        />
      </div>
      {subtitle && (
        <p className={`font-elegant text-lg ${light ? "text-cream/70" : "text-charcoal/60"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
