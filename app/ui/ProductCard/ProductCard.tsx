import "./ProductCard.scss";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";
import { Property } from "~/constants/mockData";
import ImageSlider from "~/ui/ImageSlider/ImageSlider";
import Button from "~/ui/Button/Button";
import GridContainer from "~/ui/Grid/Grid";
import Card from "~/ui/Card/Card";
import classNames from "classnames";
import { useI18n } from "~/context/i18nContext";
import { ReactNode } from "react";

export const ProductCard = ({
  property,
  layout = "vertical",
  hideButtons = false,
  customActions,
}: {
  property: Property;
  hideButtons?: boolean;
  customActions?: ReactNode;
  layout: "vertical" | "horizontal";
}) => {
  const { t } = useI18n();

  const handleClick = (phoneNumber: string) => {
    const callUrl = `tel:${phoneNumber}`;
    window.open(callUrl, "_self");
  };

  return (
    <Card shadow className={classNames("product-card", layout)}>
      <div className="__slider">
        <ImageSlider showTotal images={property.pictures} />
      </div>
      <div className="__details">
        <Button
          href={`/${property.operation}/${property.id}`}
          className="__heading"
          appareance="link"
        >
          <Heading align="left" color="accent-dark" level={5} appearance={6}>
            {property.name}
          </Heading>
        </Button>
        <Text size="small">
          {property.city}, {property.state}
        </Text>
        <Text size="small">
          {t("productCard.rooms")}: {property.rooms}. {t("productCard.area")}:{" "}
          {property.area}m²
        </Text>
        <Text className="u-pt1 u-pb1" size="large" textWeight="bold">
          ${property.price.toLocaleString()}
        </Text>
        {!hideButtons && (
          <GridContainer
            className="u-pt1 __card-contact"
            justifyContent="space-between"
          >
            <Button
              onClick={() => handleClick(property.phone)}
              leftIcon="FaWhatsapp"
              appareance="link"
            >
              {t("productCard.contactButton")}
            </Button>
            <Button
              href={`/${property.operation}/${property.id}`}
              appareance="link"
            >
              {t("productCard.viewMoreButton")}
            </Button>
          </GridContainer>
        )}
        {customActions && customActions}
      </div>
    </Card>
  );
};
