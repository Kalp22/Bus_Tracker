import { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet-routing-machine";

import { Icon, LatLngExpression } from "leaflet";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
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
  const [busRoute, setBusRoute] = useState<LatLngExpression[]>([]);
  const [stopNames, setStopNames] = useState<string[]>([]);
  const busRouteCoordinates: LatLngExpression[] = [
    [21.1509, 79.10293], // Agrasen Square
    [21.1496, 79.1093], // Gandhi Putla Square
    [21.149, 79.1144], // Azamshah Square
    [21.14865, 79.12], // Telephone Exchange Square
    [21.14261, 79.119707], // Gangabai Ghat Square
    [21.13836, 79.119657], // Jagnade Square
  ];

  const busStopNames = [
    "Agrasen Square",
    "Gandhi Putla Square",
    "Azamshah Square",
    "Telephone Exchange Square",
    "Gangabai Ghat Square",
    "Jagnade Square",
  ];

  useEffect(() => {
    setIsMounted(true);
    setBusRoute(busRouteCoordinates);
    setStopNames(busStopNames);
  }, []);

  const busStop = new Icon({
    iconUrl: "/Blue_circle.png",
    iconSize: [17, 17],
    iconAnchor: [12, 41],
    popupAnchor: [1, -32],
    shadowSize: [31, 31],
  });

  const icon = new Icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -32],
    shadowSize: [51, 51],
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
        {busRouteCoordinates.map((bStop, i) => (
          <Marker key={i} icon={busStop} position={bStop}>
            <Popup>{stopNames[i]}</Popup>
          </Marker>
        ))}
        <Polyline
          className="opacity-70"
          positions={busRoute}
          color="blue"
          pathOptions={{ weight: 5 }}
        />
      </MapContainer>
    )
  );
}
