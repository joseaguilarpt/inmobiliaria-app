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

interface MapPopupProps {
  property: Property;
}

const MapPopup: React.FC<MapPopupProps> = ({ property }) => {
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
        Rooms: {property.rooms}. Area: {property.area}m²
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
          Contact
        </Button>
        <Button
          href={`/${property.operation}/${property.id}`}
          appareance="link"
        >
          View More
        </Button>
      </GridContainer>
    </Popup>
  );
};

export default MapPopup;
