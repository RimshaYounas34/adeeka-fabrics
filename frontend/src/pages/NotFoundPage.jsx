import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-cream text-center px-6">
      <h1 className="font-display text-6xl text-gold mb-4">404</h1>
      <p className="font-elegant text-charcoal/60 text-lg mb-8">
        This page doesn't exist — perhaps it's out of stock.
      </p>
      <Link to="/" className="bg-charcoal text-cream px-8 py-3 text-xs tracking-widest uppercase font-sans">
        Back to Home
      </Link>
    </div>
  );
}
