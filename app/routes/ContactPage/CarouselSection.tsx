import { useI18n } from "~/context/i18nContext";
import Carousel, { CarouselSlide } from "~/ui/Carousel/Carousel";

export default function CarouselSection() {
  const slides: CarouselSlide[] = [
    {
      title: "contact",
      backgroundImage: "../img/hero-carousel/hero-carousel-3.jpg",
    },
  ];
  const { t } = useI18n();
  return (
    <Carousel
      slides={slides}
      hideArrows
      className="__half"
      breadcrumbs={[
        {
          label: t("home"),
          href: "/",
        },
        {
          label: t("contact"),
        },
      ]}
    />
  );
}
