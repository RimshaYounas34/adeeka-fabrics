import BrandStory from "../components/BrandStory.jsx";
import WhyChoose from "../components/WhyChoose.jsx";


const AboutPage = () => {

  return (
    <div className="bg-[#f5eee4] min-h-screen">

      {/* Page Heading */}

      <div className="text-center py-16 px-6">

        <p className="text-[#b18442] text-xs uppercase tracking-widest">
          Adeeka Fabrics
        </p>

        <h1 className="font-serif text-4xl md:text-5xl text-[#17110d] mt-2">
          About Adeeka
        </h1>

        <p className="text-[#75695e] text-lg max-w-xl mx-auto mt-4">
          Crafted for elegance, designed for the modern woman.
        </p>

        <div className="w-16 h-[2px] bg-[#b18442] mx-auto mt-4"></div>

      </div>


      {/* Brand Story */}

      <BrandStory />


      {/* Why Choose Us */}

      <WhyChoose />

    </div>
  );
};


export default AboutPage;