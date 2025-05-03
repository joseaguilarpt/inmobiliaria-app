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

export default function MapPage() {
  const { t } = useI18n();

  const slides: CarouselSlide[] = [
    {
      backgroundImage: t("carouselSlide1.backgroundImage"),
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
            <GridContainer justifyContent="center" className="u-mt4">
              <Heading align="center" color="white" appearance={4} level={1}>
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
        backgroundImageUrl={t("footer.backgroundImageUrl")}
        socialNetworks={[
          { label: "Facebook", icon: "FaFacebook", href: "#" },
          { label: "Twitter", icon: "FaTwitter", href: "#" },
        ]}
      />
    </>
  );
}
