import Navbar from "~/ui/Navbar/Navbar";
import Footer from "~/ui/Footer/Footer";
import BackToTop from "~/ui/BackToTop/BackToTop";
import { FOOTER } from "~/constants/content";
import image from "../img/hero-carousel/hero-carousel-3.jpg";
import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import Box from "~/ui/Box/Box";
import FormField from "~/ui/FormField/FormField";
import { LOGIN_FORM, RESET_FORM } from "~/constants/login";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "~/ui/Heading/Heading";
import { useI18n } from "~/context/i18nContext";
import Button from "~/ui/Button/Button";
import React from "react";
import { useTheme } from "~/context/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/root";
import { POST_DATA, postDataQuery } from "~/api/queries";
import { useNavigate } from "@remix-run/react";

export default function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const form = isLogin ? LOGIN_FORM : RESET_FORM;
  const resetButton = isLogin ? "login.resetButton" : "login.backToLogin";

  const { showSnackbar } = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return queryClient.fetchQuery(postDataQuery({ formData: data }));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [POST_DATA],
      });
      showSnackbar(t("getInTouch.successDescription"), "success");
      setTimeout(() => {
        navigate('/admin/account')
      }, 1000)
    },
    onError: () => {
      showSnackbar(t("getInTouch.errorDescription"), "error");
    },
  });

  const handleSubmit = (p: any) => {
    mutate(formData);
  };

  const handleChange = (v: any) => {
    setFormData({ ...FormData, ...v })
  }

  const handleReset = () => {
    setIsLogin(!isLogin)
    setFormData({})
  }

  return (
    <>
      <Navbar autoScrolled />
      <ContentContainer>
        <GridContainer
          className="full-screen-height"
          alignItems="center"
          justifyContent="center"
        >
          <GridItem xs={12} md={5}>
            <Heading align="center" level={2} appearance={6}>
              {t("pageName")} {t("login.heading")}:
            </Heading>
            <Box className="bg-color-secondary">
              <FormField {...form} onSubmit={handleSubmit} isLoading={isPending} onChange={handleChange} />
              <GridContainer justifyContent="center">
                <Button onClick={handleReset} appareance="link">
                  {t(resetButton)}
                </Button>
              </GridContainer>
            </Box>
          </GridItem>
        </GridContainer>
      </ContentContainer>

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
