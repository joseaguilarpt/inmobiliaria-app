import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import Card from "~/ui/Card/Card";
import { COMPANY_SERVICES } from "~/constants/content";
import { useI18n } from "~/context/i18nContext";

export default function CompanyServicesSection() {
  const { t } = useI18n();
  return (
    <ContentContainer className="bg-color-secondary">
    <GridContainer
      alignItems="center"
      justifyContent="center"
      className="u-mt6 u-mb3"
    >
      <GridItem
        xs={12}
        animation="slide-in-bottom"
        justifyContent="center"
      >
        <Heading align="center" level={2} appearance={4} underline>
          {t('companyServices.title')}
        </Heading>
        <div className="u-pt2 u-pr4">
          <Text size="small" align="center" color="primary">
            {t('companyServices.description')}
          </Text>
        </div>
      </GridItem>
      <GridContainer className="u-mt4">
        {COMPANY_SERVICES.map((item, index) => (
          <GridItem
            animation="slide-in-bottom"
            xs={12}
            md={4}
            key={index}
            className="u-mt1 u-mb1"
          >
            <Card
              shadow
              {...item}
              imagePosition="top"
              imageUrl={undefined}
              url={item.href}
              underline
            />
          </GridItem>
        ))}
      </GridContainer>
    </GridContainer>
  </ContentContainer>
  );
}
