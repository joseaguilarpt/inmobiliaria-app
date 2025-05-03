import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import { FOOTER } from "~/constants/content";
import Carousel, { CarouselSlide } from "~/ui/Carousel/Carousel";
import { useI18n } from "~/context/i18nContext";
import GridContainer from "~/ui/Grid/Grid";
import Heading from "~/ui/Heading/Heading";
import { useTheme } from "~/context/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { POST_DATA, postDataQuery } from "~/api/queries";
import { queryClient } from "~/root";
import { MAIN_SEARCH } from "../constants/mainSearch";
import Search from "~/ui/Search/Search";
import React from "react";
import GetInTouchSection from "./IndexPage/GetInTouchSection";
import OfferSection from "./IndexPage/OffersSection";
import CompanyBlogSection from "./IndexPage/CompanyBlogSection";
import image from "../img/real-state.jpg";
import { MetaFunction } from "@remix-run/node";

const generateMeta = (data: any) => {
  return [
    {
      name: "title",
      content: `Real Estate Agency - Encuentra tu Propiedad ideal`,
    },
    {
      name: "description",
      content:
        "lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est",
    },
    {
      name: "keywords",
      content: [
        "real estate",
        "costa rica",
        "san jose",
        "casa",
        "apartamento",
        "garage",
        "comprar",
        "alquilar",
      ],
    },
    {
      property: "og:title",
      content: `Real Estate Agency - Encuentra tu Propiedad ideal`,
    },
    {
      property: "og:description",
      content:
        "lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est lorem ispu dolor sitem est",
    },
    { property: "og:type", content: "article" },
    {
      property: "og:url",
      content: `https://cr-real-estate.netlify.app`,
    },
  ];
};

export let meta: MetaFunction = ({ data }) => {
  const { results } = data;
  return generateMeta(results);
};

export default function IndexPage() {
  const { t } = useI18n();

  const slides: CarouselSlide[] = [
    {
      backgroundImage: image,
    },
  ];

  const [isClient, setIsClient] = React.useState(false);

  // @ts-ignore
  const params: GetInTouchForm = MAIN_SEARCH;
  const formId = "get-in-touch-form";

  const { showSnackbar } = useTheme();

  const { mutate } = useMutation({
    mutationFn: (data: any) => {
      return queryClient.fetchQuery(postDataQuery({ formData: data }));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POST_DATA],
      });
      showSnackbar(t("getInTouch.successDescription"), "success");
    },
    onError: () => {
      showSnackbar(t("getInTouch.errorDescription"), "error");
    },
  });

  const handleSubmit = (p: any) => {
    mutate(p);
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div>
        <Navbar />
        <Carousel slides={slides} hideArrows className="__half">
          <div>
            <GridContainer justifyContent="center" className="u-mb4 u-mt4">
              <Heading
                align="center"
                color="white"
                underline
                appearance={4}
                level={1}
              >
                {t("heading")}
              </Heading>
            </GridContainer>
            <Search params={MAIN_SEARCH} />
          </div>
        </Carousel>
        <OfferSection />
        <CompanyBlogSection />
        <GetInTouchSection />
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
