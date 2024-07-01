// app/components/CustomMarker.tsx

import React, { ReactNode, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, MarkerProps } from "react-leaflet";
import { divIcon } from "leaflet";
import Icon, { IconType } from "../Icon/Icon";
import "./CustomMarker.css";

interface CustomMarkerProps extends MarkerProps {
  children: ReactNode;
  icon: IconType;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "white";
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  icon,
  size = "medium",
  color = "primary",
  children,
  ...props
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const customIcon = divIcon({
    className: "custom-div-icon",
    html: "<div class='marker-pin'></div><i class='material-icons'>weekend</i>",
    iconSize: [30, 42],
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    iconAnchor: [15, 42],
  });

  return (
    <Marker icon={customIcon} {...props}>
      {children}
    </Marker>
  );
};

export default CustomMarker;
