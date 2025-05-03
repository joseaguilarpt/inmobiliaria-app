import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import CarouselSection from "./AboutPage/CarouselSection";
import CompanyGoalSection from "./IndexPage/CompanyGoalSection";
import CompanyServicesSection from "./IndexPage/CompanyServicesSection";
import CompanyMissionSection from "./IndexPage/CompanyMissionSection";
import { FOOTER } from "~/constants/content";
import image from '../img/hero-carousel/hero-carousel-3.jpg';

export default function AboutPage() {
  return (
    <>
      <div>
        <CarouselSection />
        <Navbar />
        <CompanyGoalSection />
        <CompanyServicesSection />
        <CompanyMissionSection />
      </div>
      <BackToTop />
      <Footer
        {...FOOTER}
        backgroundImageUrl={image}
        socialNetworks={[
          { label: "Facebook", icon: "FaFacebook", href: "#" },
          { label: "Twitter", icon: "FaTwitter", href: "#" },
        ]}
      />
    </>
  );
}
