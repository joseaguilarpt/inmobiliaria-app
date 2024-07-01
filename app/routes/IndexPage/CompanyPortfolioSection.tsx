import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import ImageWithLinks from "~/ui/ImageWithLinks/ImageWithLinks";
import { COMPANY_PORTFOLIO } from "~/constants/content";
import { useI18n } from "~/context/i18nContext";

export default function CompanyPortfolioSection() {
  const { t } = useI18n();
  return (
    <ContentContainer className="bg-color-secondary">
      <GridContainer
        alignItems="center"
        justifyContent="center"
        className="u-mt6 u-mb3"
      >
        <GridItem xs={12} animation="slide-in-bottom" justifyContent="center">
          <Heading align="center" level={2} appearance={4} underline>
            {t("companyPortfolio.title")}
          </Heading>
          <div className="u-pt2 u-pr4">
            <Text size="small" align="center" color="primary">
              {t("companyPortfolio.description")}
            </Text>
          </div>
        </GridItem>
        <GridContainer className="u-mt4 image-with-link__container">
          {COMPANY_PORTFOLIO.map((item, index) => (
            <GridItem
              animation="slide-in-bottom"
              xs={12}
              md={4}
              key={index}
              className="images-with-link__item"
            >
              <ImageWithLinks key={index} card={item} />
            </GridItem>
          ))}
        </GridContainer>
      </GridContainer>
    </ContentContainer>
  );
}
