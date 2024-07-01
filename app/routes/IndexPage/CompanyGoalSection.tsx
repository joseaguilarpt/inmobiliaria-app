import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import Card from "~/ui/Card/Card";
import { COMPANY_OBJECTIVES } from "~/constants/content";
import { useI18n } from "~/context/i18nContext";

export default function CompanyGoalSection() {
  const { t } = useI18n();
  return (
    <ContentContainer>
      <GridContainer
        alignItems="center"
        justifyContent="center"
        className="u-mt6 u-mb3"
      >
        <GridItem xs={12} animation="slide-in-bottom" justifyContent="center">
          <Heading align="center" level={2} appearance={4} underline>
            {t('companyObjectives.title')}
          </Heading>
          <div className="u-pt2 u-pr4">
            <Text size="small" align="center" color="primary">
              {t('companyObjectives.description')}
            </Text>
          </div>
        </GridItem>
        <GridContainer className="u-mt4">
          {COMPANY_OBJECTIVES.map((item, index) => (
            <GridItem
              animation="slide-in-bottom"
              xs={12}
              md={6}
              key={index}
              className="u-mt1 u-mb1"
            >
              <Card {...item} icon={undefined} />
            </GridItem>
          ))}
        </GridContainer>
      </GridContainer>
    </ContentContainer>
  );
}
