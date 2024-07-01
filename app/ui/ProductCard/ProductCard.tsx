import "./ProductCard.scss";
import Heading from "~/ui/Heading/Heading";
import Text from "~/ui/Text/Text";

import { Property } from "~/constants/mockData";
import ImageSlider from "~/ui/ImageSlider/ImageSlider";
import Button from "~/ui/Button/Button";
import GridContainer from "~/ui/Grid/Grid";
import Card from "~/ui/Card/Card";
import GridItem from "../Grid/GridItem";
import classNames from "classnames";

export const ProductCard = ({
  property,
  layout = "vertical",
}: {
  property: Property;
  layout: "vertical" | "horizontal";
}) => {
  const handleClick = (phoneNumber: string) => {
    const callUrl = `tel:${phoneNumber}`;
    window.open(callUrl, "_self");
  };
  return (
    <Card shadow className={classNames("product-card", layout)}>
      <div className="__slider">
        <ImageSlider images={property.pictures} />
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
          Rooms: {property.rooms}. Area: {property.area}m²
        </Text>
        <Text className="u-pt1 u-pb1" size="large" textWeight="bold">
          ${property.price.toLocaleString()}
        </Text>
        <GridContainer
          className="u-pt1 __card-contact"
          justifyContent="space-between"
        >
          <Button
            onClick={() => handleClick(property.phone)}
            leftIcon="FaWhatsapp"
            appareance="link"
          >
            Contact
          </Button>
          <Button
            href={`/${property.operation}/${property.id}`}
            appareance="link"
          >
            View More
          </Button>
        </GridContainer>
      </div>
    </Card>
  );
};
