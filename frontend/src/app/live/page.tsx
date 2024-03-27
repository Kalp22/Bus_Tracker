"use client";
import { useState, useEffect } from "react";

import Map from "@/components/map/map";

import { Toaster, toast } from "sonner";

export default function Live() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (window !== undefined) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          toast.error("Please enable location services");
        }
      );
    }
  }, []);

  return (
    <>
      <Map location={location} />
      <Toaster position="bottom-right" />
    </>
  );
}
