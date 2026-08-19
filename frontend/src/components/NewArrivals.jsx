import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";

import new1 from "../assets/images/new1.jpg";
import new2 from "../assets/images/new2.jpg";
import new3 from "../assets/images/new3.jpg";
import new4 from "../assets/images/new4.jpg";
import new5 from "../assets/images/new5.jpg";


const NewArrivals = () => {

  const products = [
    {
      id: 1,
      name: "Embroidered Lawn Suit",
      price: 3999,
      image: new1,
    },

    {
      id: 2,
      name: "Elegant Cotton Suit",
      price: 3499,
      image: new2,
    },

    {
      id: 3,
      name: "Luxury Embroidered Dress",
      price: 5499,
      image: new3,
    },

    {
      id: 4,
      name: "Printed Lawn Collection",
      price: 2999,
      image: new4,
    },

    {
      id: 5,
      name: "Premium Formal Suit",
      price: 6499,
      image: new5,
    },
  ];


  return (
    <section className="py-16 px-6 md:px-10 bg-[#f5eee4]">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <h2 className="font-serif text-3xl md:text-4xl text-[#17110d]">
            New Arrivals
          </h2>

          <p className="text-sm text-[#75695e] mt-2">
            Freshly woven, just for you
          </p>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-3"></div>

        </div>


        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>


        {/* View All */}
        <div className="text-center mt-10">

          <Link
            to="/new-arrivals"
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


export default NewArrivals;