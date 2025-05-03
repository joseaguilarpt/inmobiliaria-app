// app/components/MapWithLocations.tsx
import "./Map.scss";

import React from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import CustomMarker from "./CustomMarker";
import { Property } from "~/constants/mockData";
import MapPopup from "./MapPopup";
import { useSearchParams } from "@remix-run/react";

interface MapWithLocationsProps {
  locations: Property[];
  initialCoordinates?: {
    lat: string;
    lng: string;
  };
}

const MapContent = ({
  locations,
  queryLat,
  queryLng,
}: {
  locations: Property[];
  queryLat: any;
  queryLng: any;
}) => {
  const map = useMap();

  React.useEffect(() => {
    if (queryLat && queryLng) {
      map.setView([queryLat, queryLng], map.getZoom());
    }
  }, [queryLat, queryLng]);
  return (
    <>
      {locations &&
        locations?.map((property) => (
          <CustomMarker
            key={property.id}
            position={[property?.lat ?? 0, property?.lng ?? 0]}
            icon="FaHome" // Example icon, you can customize this per property
            size="large"
            color="primary"
          >
            <MapPopup property={property} />
          </CustomMarker>
        ))}
    </>
  );
};

const MapWithLocations: React.FC<MapWithLocationsProps> = ({
  locations,
  initialCoordinates,
}) => {
  console.log(initialCoordinates ,'initialCoordinates')
  const [position, setPosition] = React.useState<any>({
    lat: initialCoordinates?.lat ?? 9.9281,
    lng: initialCoordinates?.lng ?? -84.0907,
  });
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  };

  const [searchParams] = useSearchParams();

  const queryLat = searchParams.get("lat")
    ? parseFloat(searchParams.get("lat") ?? "")
    : null;
  const queryLng = searchParams.get("lng")
    ? parseFloat(searchParams.get("lng") ?? "")
    : null;

  React.useEffect(() => {
    if (
      queryLat &&
      queryLng &&
      queryLat !== position?.lat &&
      queryLng !== position?.lng
    ) {
      setPosition({ lat: queryLat, lng: queryLng });
    }
  }, [queryLat, queryLng]);

  if (!position?.lat || !position?.lng) {
    return null;
  }

  return (
    <MapContainer
      className="map-container"
      center={[position?.lat, position?.lng]}
      touchZoom={true}
      scrollWheelZoom={false}
      zoom={11}
      minZoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      <MapContent
        queryLat={queryLat}
        queryLng={queryLng}
        locations={locations}
      />
    </MapContainer>
  );
};

export default MapWithLocations;
