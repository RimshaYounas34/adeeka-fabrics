import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function WishlistPage() {
  const { wishlist } = useCart();

  return (
    <div className="bg-cream min-h-screen px-6 md:px-10 py-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-10">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-center text-charcoal/50 font-elegant text-lg py-20">
            Your wishlist is empty. Tap the heart icon on any product to save it here.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
