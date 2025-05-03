import ContentContainer from "~/ui/ContentContainer/ContentContainer";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import Slider from "~/ui/Slider/Slider";
import { useI18n } from "~/context/i18nContext";
import properties from "~/constants/mockData";
import { ProductCard } from "~/ui/ProductCard/ProductCard";

export default function OffersSection({ title, description }) {
  const filtered = properties.filter(
    (item) => item.operation === "buy" && item.promotional
  ).splice(0, 8);
  const { t } = useI18n();
  const slides = filtered.map((item) => ({
    title: item.name,
    id: item.id,
    custom: <ProductCard property={item} />
  }));

  return (
    <ContentContainer className="bg-color-secondary u-pb3 overflow-hidden">
      <Heading align="center" level={2} appearance={4} underline>
        {t( title ?? "offersSection.heading")}
      </Heading>
      <div className="u-pt2 u-pr4 u-pb2">
        <Text size="small" align="center" color="primary">
          {t(description ?? "offersSection.subheading")}
        </Text>
      </div>
      <Slider slides={slides} slidesToShow={3} />
    </ContentContainer>
  );
}
