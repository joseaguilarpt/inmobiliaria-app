// app/components/MapWithLocations.tsx

import "./Map.scss";
import React from "react";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "~/constants/mockData";
import ImageSlider from "../ImageSlider/ImageSlider";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";
import GridContainer from "../Grid/Grid";
import Button from "../Button/Button";
import { useI18n } from "~/context/i18nContext"; // Assuming you have an i18nContext for translation

interface MapPopupProps {
  property: Property;
}

const MapPopup: React.FC<MapPopupProps> = ({ property }) => {
  const { t } = useI18n(); // Hook for accessing translations

  const handleClick = (phoneNumber: string) => {
    const callUrl = `tel:${phoneNumber}`;
    window.open(callUrl, "_self");
  };

  return (
    <Popup className="map__popup-wrapper">
      <ImageSlider images={property.pictures} />
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
        {t("mapPopup.rooms")}: {property.rooms}. {t("mapPopup.area")}: {property.area}m²
      </Text>
      <Text className="u-pt1 u-pb1" size="large" textWeight="bold">
        ${property.price?.toLocaleString()}
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
          {t("mapPopup.contact")}
        </Button>
        <Button
          href={`/${property.operation}/${property.id}`}
          appareance="link"
        >
          {t("mapPopup.viewMore")}
        </Button>
      </GridContainer>
    </Popup>
  );
};

export default MapPopup;
