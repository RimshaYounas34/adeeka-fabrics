import Hero from "../components/Hero.jsx";
import CategoryShop from "../components/CategoryShop.jsx";
import NewArrivals from "../components/NewArrivals.jsx";
import LuxuryBanner from "../components/LuxuryBanner.jsx";
import Collections from "../components/Collections.jsx";
import BestSellers from "../components/BestSellers.jsx";
import BrandStory from "../components/BrandStory.jsx";
import WhyChoose from "../components/WhyChoose.jsx";
import Lookbook from "../components/Lookbook.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Newsletter from "../components/Newsletter.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShop />
      <NewArrivals />
      <LuxuryBanner />
      <Collections />
      <BestSellers />
      <BrandStory />
      <WhyChoose />
      <Lookbook />
      <Testimonials />
      <Newsletter />
    </>
  );
}
