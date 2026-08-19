import { Link } from "react-router-dom";

import best1 from "../assets/images/best1.jpg";
import best2 from "../assets/images/best2.jpg";
import best3 from "../assets/images/best3.jpg";
import best4 from "../assets/images/best4.jpg";
import best5 from "../assets/images/best5.jpg";

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: "Embroidered Lawn Suit",
      price: 4499,
      image: best1,
    },
    {
      id: 2,
      name: "Elegant Printed Suit",
      price: 3999,
      image: best2,
    },
    {
      id: 3,
      name: "Luxury Embroidered Dress",
      price: 5999,
      image: best3,
    },
    {
      id: 4,
      name: "Premium Pret Suit",
      price: 4999,
      image: best4,
    },
    {
      id: 5,
      name: "Formal Collection",
      price: 6999,
      image: best5,
    },
  ];

  return (
    <section className="py-16 px-6 md:px-10 bg-[#eee5d8]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-[#17110d]">
            Best Sellers
          </h2>

          <p className="text-sm text-[#75695e] mt-2">
            Loved by our customers
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-3" />
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden"
            >
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="font-serif text-lg text-[#17110d]">
                  {product.name}
                </h3>

                <p className="text-sm text-[#75695e] mt-2">
                  Rs. {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            to="/best-sellers"
            className="
              inline-block
              border
              border-[#17110d]
              px-8
              py-3
              text-xs
              tracking-widest
              uppercase
              text-[#17110d]
              hover:bg-[#17110d]
              hover:text-[#f5eee4]
              transition
            "
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BestSellers;