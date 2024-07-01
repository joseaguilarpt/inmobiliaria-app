import Carousel, { CarouselSlide } from "~/ui/Carousel/Carousel";

export default function CarouselSection() {
  const slides: CarouselSlide[] = [
    {
      title: 'carousel.slide1.title',
      description: 'carousel.slide1.description',
      buttonText: 'carousel.slide1.buttonText',
      buttonLink: '/about',
      href: '/',
      backgroundImage: '../../img/hero-carousel/hero-carousel-1.jpg',
    },
    {
      title: 'carousel.slide2.title',
      description: 'carousel.slide2.description',
      buttonText: 'carousel.slide2.buttonText',
      buttonLink: '/services',
      href: '/',
      backgroundImage: '../../img/hero-carousel/hero-carousel-2.jpg',
    },
    {
      title: 'carousel.slide3.title',
      description: 'carousel.slide3.description',
      buttonText: 'carousel.slide3.buttonText',
      buttonLink: '/join',
      href: '/',
      backgroundImage: '../../img/hero-carousel/hero-carousel-3.jpg',
    },
  ];
  return (
    <Carousel slides={slides} />

  );
}
