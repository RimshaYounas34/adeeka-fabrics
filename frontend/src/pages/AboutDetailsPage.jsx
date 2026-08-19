import { Link } from "react-router-dom";

const AboutDetailsPage = () => {
  return (
    <section className="bg-[#f5eee4] min-h-screen py-16 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-12">

          <p className="text-[#b18442] text-xs uppercase tracking-widest">
            Adeeka Fabrics
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
            Our Story
          </h1>

          <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4"></div>

        </div>


        {/* Content */}

        <div className="bg-white p-8 md:p-12">

          <h2 className="font-serif text-2xl md:text-3xl text-[#17110d] mb-5">
            A Family. A Brand. A Legacy.
          </h2>

          <p className="text-[#75695e] leading-8 mb-5">
            Adeeka Fabrics was created with a passion for beautiful
            fabrics, elegant designs and timeless fashion.
          </p>

          <p className="text-[#75695e] leading-8 mb-5">
            Our collections are carefully selected to bring together
            quality, comfort and modern style. From everyday wear to
            special occasions, we offer designs made for the modern woman.
          </p>

          <p className="text-[#75695e] leading-8 mb-8">
            We believe that every outfit should make you feel confident,
            comfortable and beautiful. That is why we continue to bring
            fresh designs and premium fabrics to our customers.
          </p>


          {/* Back Button */}

          <Link
            to="/about"
            className="
              inline-block
              border
              border-[#17110d]
              px-7
              py-3
              text-xs
              uppercase
              tracking-widest
              text-[#17110d]
              hover:bg-[#17110d]
              hover:text-[#f5eee4]
              transition
            "
          >
            Back to About
          </Link>

        </div>

      </div>

    </section>
  );
};

export default AboutDetailsPage;