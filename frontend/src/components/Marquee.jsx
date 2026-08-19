const items = [
  "NEW COLLECTION 2026",
  "FREE SHIPPING ABOVE PKR 5000",
  "CRAFTED FOR ELEGANCE",
  "PREMIUM FABRICS",
  "EASY RETURNS",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="bg-gold text-charcoal overflow-hidden py-2.5 border-y border-charcoal/10">
      <div className="marquee-track">
        {[...row, ...row].map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-xs tracking-[0.25em] uppercase font-sans font-medium shrink-0"
          >
            {text}
            <span className="text-charcoal/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
