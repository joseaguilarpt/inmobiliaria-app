import { useI18n } from "~/context/i18nContext";
import Carousel, { CarouselSlide } from "~/ui/Carousel/Carousel";

export default function CarouselSection() {
  const slides: CarouselSlide[] = [
    {
      title: "about",
      backgroundImage: "../img/hero-carousel/hero-carousel-2.jpg",
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
          label: t("about"),
        },
      ]}
    />
  );
}
