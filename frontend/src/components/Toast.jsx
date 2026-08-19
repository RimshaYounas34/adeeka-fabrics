import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function Toast() {
  const { toast } = useCart();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex items-center gap-2 bg-charcoal text-cream px-5 py-3 rounded-full shadow-xl text-sm font-sans"
          >
            <CheckCircle2 size={16} className="text-gold" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
