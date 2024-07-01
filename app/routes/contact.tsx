import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import GetInTouchSection from "./IndexPage/GetInTouchSection";
import CarouselSection from "./ContactPage/CarouselSection";
import CompanyBlogSection from "./IndexPage/CompanyBlogSection";
import { FOOTER } from "~/constants/content";

export default function ContactPage() {
  return (
    <>
      <div>
        <CarouselSection />
        <Navbar />
        <GetInTouchSection />
        <CompanyBlogSection />
      </div>
      <BackToTop />
      <Footer
        {...FOOTER}
        backgroundImageUrl="../../img/hero-carousel/hero-carousel-3.jpg"
        socialNetworks={[
          { label: "Facebook", icon: "FaFacebook", href: "#" },
          { label: "Twitter", icon: "FaTwitter", href: "#" },
        ]}
      />
    </>
  );
}
