// app/components/MapWithLocations.tsx
import "./Map.scss";

import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import CustomMarker from "./CustomMarker";
import { Property } from "~/constants/mockData";
import MapPopup from "./MapPopup";
import { parseQueryParams } from "~/utils/queryParamUtils";
import { useSearchParams } from "@remix-run/react";

interface MapWithLocationsProps {
  locations: Property[];
  initialCoordinates?: {
    lat: string;
    lon: string;
  }
}

const MapWithLocations: React.FC<MapWithLocationsProps> = ({ locations, initialCoordinates }) => {
  const [searchParams] = useSearchParams();
  const queryParams: Record<string, string> = parseQueryParams(searchParams);
  const [position, setPosition] = React.useState<L.LatLng | null>(null);

  const initialPosition = {
    lat: queryParams.lat ? parseFloat(queryParams.lat) : 9.9281,
    lng: queryParams.lon ? parseFloat(queryParams.lon) : -84.0907,
  };
  if (initialCoordinates) {
    initialPosition.lat = parseFloat(initialCoordinates.lat)
    initialPosition.lng = parseFloat(initialCoordinates.lon)
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  };

  if (!initialPosition.lat || !initialPosition.lng) {
    return null;
  }

  return (
    <MapContainer
      center={[
        position?.lat ?? initialPosition?.lat,
        position?.lng ?? initialPosition?.lng,
      ]}
      touchZoom={true}
      scrollWheelZoom={false}
      zoom={7.5}
      minZoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />

      {locations && locations?.map((property) => (
        <CustomMarker
          key={property.id}
          position={[property?.lat ?? 0, property?.lon ?? 0]}
          icon="FaHome" // Example icon, you can customize this per property
          size="large"
          color="primary"
        >
          <MapPopup property={property} />
        </CustomMarker>
      ))}
    </MapContainer>
  );
};

export default MapWithLocations;
