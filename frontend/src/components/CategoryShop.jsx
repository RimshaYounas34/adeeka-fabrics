import { Link } from "react-router-dom";

import formal from "../assets/images/formal.jpg";
import casual from "../assets/images/casual.jpg";
import unstitched from "../assets/images/unstiched.jpg";
import pret from "../assets/images/pret.jpg";
import luxury from "../assets/images/luxury.jpg";
import sale from "../assets/images/sale.jpg";

const CategoryShop = () => {
  const categories = [
    {
      name: "Formal",
      slug: "formal",
      image: formal,
      link: "/formal",
    },

    {
      name: "Casual",
      slug: "casual",
      image: casual,
      link: "/casual",
    },

    {
      name: "Unstitched",
      slug: "unstitched",
      image: unstitched,
      link: "/shop/unstitched",
    },

    {
      name: "Pret",
      slug: "pret",
      image: pret,
      link: "/pret",
    },

    {
      name: "Luxury",
      slug: "luxury",
      image: luxury,
      link: "/luxury",
    },

    {
      name: "Sale",
      slug: "sale",
      image: sale,
      link: "/sale",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-10 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <h2 className="font-serif text-3xl md:text-4xl text-[#17110d]">
            Shop By Category
          </h2>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-3"></div>

        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">

          {categories.map((category) => (

            <Link
              key={category.slug}
              to={category.link}
              className="flex flex-col items-center gap-3 group"
            >

              {/* Category Image */}
              <div
                className="
                  w-20 h-20
                  md:w-28 md:h-28
                  rounded-full
                  overflow-hidden
                  border
                  border-[#d8c3a5]
                  group-hover:border-[#b18442]
                  transition-all
                  duration-300
                "
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-300
                  "
                />

              </div>

              {/* Category Name */}
              <div className="text-center">

                <p
                  className="
                    font-serif
                    text-sm
                    md:text-base
                    font-semibold
                    text-[#17110d]
                    group-hover:text-[#b18442]
                    transition
                  "
                >
                  {category.name}
                </p>

                <p
                  className="
                    text-[10px]
                    tracking-widest
                    uppercase
                    text-[#b18442]
                  "
                >
                  Shop Now
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
};

export default CategoryShop;