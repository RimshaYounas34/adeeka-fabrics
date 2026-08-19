import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartDrawer() {

  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQty,
    cartTotal,
  } = useCart();


  return (
    <AnimatePresence>

      {isCartOpen && (
        <>

          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[70]"
          />


          {/* Cart Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.35,
            }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#f5eee4] z-[80] flex flex-col shadow-2xl"
          >


            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">

              <h2 className="font-serif text-xl text-[#17110d]">
                Your Bag ({items.length})
              </h2>

              <button
                onClick={() => setIsCartOpen(false)}
              >
                <X size={22} />
              </button>

            </div>


            {/* Products */}
            <div className="flex-1 overflow-y-auto px-6 py-4">

              {items.length === 0 ? (

                <p className="text-center text-black/50 text-lg mt-16">
                  Your bag is empty.
                </p>

              ) : (

                <ul className="space-y-5">

                  {items.map((item) => (

                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4"
                    >

                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover rounded"
                      />


                      {/* Product Info */}
                      <div className="flex-1">

                        <p className="font-serif text-base text-[#17110d]">
                          {item.name}
                        </p>


                        <p className="text-[#b18442] text-sm mt-2">
                          PKR {item.price.toLocaleString()}
                        </p>


                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-3">

                          <button
                            onClick={() =>
                              updateQty(item.id, item.qty - 1)
                            }
                            className="w-7 h-7 border border-black/30 flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>


                          <span className="text-sm w-5 text-center">
                            {item.qty}
                          </span>


                          <button
                            onClick={() =>
                              updateQty(item.id, item.qty + 1)
                            }
                            className="w-7 h-7 border border-black/30 flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>


                          {/* Delete */}
                          <button
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="ml-auto text-black/40 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </div>

                    </motion.li>

                  ))}

                </ul>

              )}

            </div>


            {/* Bottom */}
            {items.length > 0 && (

              <div className="px-6 py-5 border-t border-black/10">

                <div className="flex justify-between mb-4 text-[#17110d]">

                  <span>
                    Subtotal
                  </span>

                  <span className="text-[#b18442] font-semibold">
                    PKR {cartTotal.toLocaleString()}
                  </span>

                </div>


                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >

                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center bg-[#17110d] text-[#f5eee4] py-3.5 text-xs tracking-widest uppercase hover:bg-[#b18442] transition"
                  >
                    Checkout
                  </Link>

                </motion.div>

              </div>

            )}

          </motion.aside>

        </>
      )}

    </AnimatePresence>
  );
}