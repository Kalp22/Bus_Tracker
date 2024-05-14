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

interface BusLocation {
  dateandtime: Date;
  id: number;
  latitude: number;
  longitude: number;
}

interface Props {
  location: CurrentLocation;
  busLocation: BusLocation;
}

export default function Map({ location, busLocation }: Props) {
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
    [21.1388, 79.1276], // Nandanwan
    [21.1298, 79.1201], // Gurudev Nagar
    [21.1235, 79.1172], // Bhande Plot
    [21.123289, 79.104774], // Tukduji Putla
    [21.1042, 79.0875], // Shatabdi Chowk
    [21.1041, 79.0773], // Narendra Nagar
    [21.10362, 79.067222], // Jaiprakash Chowk
    [21.0959, 79.068], // Ujwal Nagar
    [21.087308, 79.064131], // Airport
    [21.080355, 79.061565], // South Airport
    [21.067448, 79.058422], // Chinch Bhawan
    [21.044807, 79.052304], // Khapri
    [21.01853, 79.047951], // Bridge Crossing
    [21.008664, 79.043106], // Sure Tech
    [21.00884, 79.047233], // Ashok Wan
    [21.006048, 79.046751], // Jamtha
  ];

  const busStopNames = [
    "Agrasen Square",
    "Gandhi Putla Square",
    "Azamshah Square",
    "Telephone Exchange Square",
    "Gangabai Ghat Square",
    "Jagnade Square",
    "Nandanwan",
    "Gurudev Nagar",
    "Bhande Plot",
    "Tukduji Putla",
    "Shatabdi Chowk",
    "Narendra Nagar",
    "Jaiprakash Chowk",
    "Ujwal Nagar",
    "Airport",
    "South Airport",
    "Chinch Bhawan",
    "Khapri",
    "Bridge Crossing",
    "Sure Tech",
    "Ashok Wan",
    "Jamtha",
  ];

  useEffect(() => {
    setIsMounted(true);
    setBusRoute(busRouteCoordinates);
    setStopNames(busStopNames);
  }, []);

  const busStop = new Icon({
    iconUrl: "/bus-icon.avif",
    iconSize: [35, 35],
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

        <Marker
          icon={busStop}
          position={[busLocation.latitude, busLocation.longitude]}
        >
          <Popup></Popup>
        </Marker>

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
