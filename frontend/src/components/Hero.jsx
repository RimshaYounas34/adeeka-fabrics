import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import heroImage from "../assets/images/adeeka-hero.jpg";

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP floating animation
    const animation = gsap.to(imageRef.current, {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#f5eee4] overflow-hidden">

      {/* Background Decoration */}
      <div
        className="
          absolute
          -left-20
          top-20
          w-72
          h-72
          bg-[#d8c3a5]
          rounded-full
          blur-3xl
          opacity-20
        "
      />

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          py-16
          lg:py-20
        "
      >

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="pt-6">

            {/* Small Heading */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >

              <span className="w-10 h-[1px] bg-[#b18442]" />

              <p className="text-xs tracking-[0.3em] uppercase text-[#9c7337]">
                New Collection 2026
              </p>

              <span className="w-10 h-[1px] bg-[#b18442]" />

            </motion.div>


            {/* Main Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                font-serif
                text-[#17110d]
                text-6xl
                md:text-7xl
                lg:text-8xl
                leading-[0.9]
              "
            >

              Elegance

              <br />

              <span className="italic text-[#b18442]">
                Woven
              </span>

              <br />

              For You.

            </motion.h1>


            {/* Decorative Line */}

            <div className="flex items-center gap-3 my-7 max-w-xs">

              <span className="flex-1 h-[1px] bg-[#c89b5a]" />

              <span className="text-[#b18442] text-xl">
                ❁
              </span>

              <span className="flex-1 h-[1px] bg-[#c89b5a]" />

            </div>


            {/* Description */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.4,
              }}
              className="
                max-w-md
                text-[#625950]
                text-sm
                md:text-base
                leading-7
              "
            >
              Discover timeless fabrics and beautifully crafted
              women's collections designed to make every moment
              effortlessly elegant.
            </motion.p>


            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
              className="flex flex-wrap gap-4 mt-8"
            >

              {/* Shop Collection */}

              <Link
                to="/collections"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  bg-[#17110d]
                  text-[#f5eee4]
                  px-7
                  py-4
                  text-xs
                  tracking-wider
                  uppercase
                  hover:bg-[#b18442]
                  transition-all
                  duration-300
                "
              >

                Shop Collection

                <ArrowRight
                  size={16}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                />

              </Link>


              {/* Explore */}

              <Link
                to="/shop"
                className="
                  flex
                  items-center
                  border
                  border-[#b18442]
                  text-[#30251d]
                  px-7
                  py-4
                  text-xs
                  tracking-wider
                  uppercase
                  hover:bg-[#b18442]
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                Explore
              </Link>

            </motion.div>


            {/* Information */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.8,
              }}
              className="
                flex
                flex-wrap
                gap-6
                md:gap-8
                mt-12
              "
            >

              {/* Years */}

              <div>

                <p className="font-serif text-lg text-[#17110d]">
                  10+
                </p>

                <p className="text-[10px] uppercase tracking-widest text-[#75695e]">
                  Years of Style
                </p>

              </div>


              {/* Divider */}

              <div className="w-[1px] h-10 bg-[#c89b5a]/50" />


              {/* Quality */}

              <div>

                <p className="font-serif text-lg text-[#17110d]">
                  Premium
                </p>

                <p className="text-[10px] uppercase tracking-widest text-[#75695e]">
                  Quality Fabrics
                </p>

              </div>


              {/* Divider */}

              <div className="w-[1px] h-10 bg-[#c89b5a]/50" />


              {/* Customers */}

              <div>

                <p className="font-serif text-lg text-[#17110d]">
                  5000+
                </p>

                <p className="text-[10px] uppercase tracking-widest text-[#75695e]">
                  Happy Customers
                </p>

              </div>

            </motion.div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="
              relative
              flex
              justify-center
              items-end
            "
          >

            {/* ================================================= */}
            {/* IMAGE CARD */}
            {/* ================================================= */}

            <motion.div
              className="
                relative
                w-full
                max-w-lg
                h-[560px]
                md:h-[650px]
                overflow-hidden
                shadow-2xl
                bg-[#e9dfd2]
              "
              style={{
                borderRadius: "260px 260px 12px 12px",
              }}
            >

              {/* Transparent Image */}

              <img
                ref={imageRef}
                src={heroImage}
                alt="Adeeka Fabrics"
                className="
                  absolute
                  bottom-0
                  left-1/2
                  -translate-x-1/2
                  w-[90%]
                  h-auto
                  max-w-none
                "
              />


              {/* Soft Image Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/10
                  via-transparent
                  to-transparent
                  pointer-events-none
                "
              />

            </motion.div>


            {/* ================================================= */}
            {/* GOLD DECORATION */}
            {/* ================================================= */}

            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-5
                top-16
                w-16
                h-40
                bg-[#b18442]/20
                rounded-full
                blur-sm
              "
            />

          </motion.div>

        </div>

      </div>


      {/* ================================================= */}
      {/* BOTTOM DOTS */}
      {/* ================================================= */}

      <div className="flex justify-center items-center gap-3 pb-8">

        <motion.span
          animate={{
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-3 h-3 rounded-full bg-[#b18442]"
        />

        <span className="w-2 h-2 rounded-full bg-[#cfc3b5]" />

        <span className="w-2 h-2 rounded-full bg-[#cfc3b5]" />

      </div>

    </section>
  );
};

export default Hero;