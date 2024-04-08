import { useState, useEffect, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface CurrentLocation {
  latitude: number;
  longitude: number;
}

interface Props {
  location: CurrentLocation;
}

export default function Map({ location }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const icon = new Icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -32],
    shadowSize: [31, 31],
  });

  return (
    isMounted && (
      <MapContainer
        center={{ lat: 21.1, lng: 79.1 }}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100dvh", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.latitude && location.longitude && (
          <Marker
            icon={icon}
            position={[location.latitude, location.longitude]}
          >
            <Popup>You</Popup>
          </Marker>
        )}
        <Marker icon={icon} position={[-23.6345, -102.5528]}>
          <Popup>Bus 1</Popup>
        </Marker>
      </MapContainer>
    )
  );
}
