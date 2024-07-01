import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import GridContainer from "~/ui/Grid/Grid";
import GridItem from "~/ui/Grid/GridItem";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import Card from "~/ui/Card/Card";
import Image from "~/ui/Image/Image";
import { COMPANY_MISSION } from "~/constants/content";
import { useI18n } from "~/context/i18nContext";

export default function CompanyMissionSection() {
  const { t } = useI18n();
  return (
    <ContentContainer>
      <GridContainer spacing={4} alignItems="center" className="u-mt3 u-mb6">
        <GridItem xs={12} lg={6}>
          <Image
            src={t("companyMission.image")}
            alt={t("companyMission.altText")}
          />
        </GridItem>
        <GridItem xs={12} lg={5} animation="slide-in-bottom">
          <Heading align="left" level={2} appearance={4} underline>
            {t("companyMission.title")}
          </Heading>
          <div className="u-pt2 u-pb2 u-pr4">
            <Text size="small" color="primary">
              {t("companyMission.description")}
            </Text>
          </div>
          <div>
            {COMPANY_MISSION.map((item, index) => (
              <GridItem
                animation="slide-in-bottom"
                xs={12}
                key={index}
                className="u-mt1 u-mb1"
              >
                <Card
                  unstyled
                  {...item}
                  imageUrl={undefined}
                  imagePosition="left"
                  iconType="square"
                  underline
                />
              </GridItem>
            ))}
          </div>
        </GridItem>
      </GridContainer>
    </ContentContainer>
  );
}
