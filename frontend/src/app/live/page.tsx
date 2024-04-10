"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/map"), { ssr: false });

import Spinner from "@/components/loading/spinner";

import "leaflet/dist/leaflet.css";

import { Toaster, toast } from "sonner";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface BusLocation {
  dateandtime: Date;
  id: number;
  latitude: number;
  longitude: number;
}

export default function Live() {
  const [location, setLocation] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [toggle, setToggle] = useState<boolean>(false);
  const [busLocation, setBusLocation] = useState<BusLocation>({
    dateandtime: new Date(), // Initial date and time
    id: 0,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
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
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/database");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        // Set busLocation to the last element of the array
        if (data.length > 0) {
          const lastBusLocation = data[data.length - 1];
          console.log(lastBusLocation);
          const dateAndTime = new Date(lastBusLocation.dateandtime);
          setBusLocation({ ...lastBusLocation, dateandtime: dateAndTime });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const toggleBuses = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div
        className={`fixed flex flex-col items-center gap-2 top-3 ${
          location.latitude && location.longitude
            ? "translate-x-0 left-16"
            : "-translate-x-96 -left-10"
        }  rounded-2xl bg-white shadow-black shadow-sm p-3 z-10 cursor-pointer transition-all`}
        onClick={toggleBuses}
      >
        <h2 className="text-xl font-bold">
          Your Bus will reach the Stop in 5 minutes
        </h2>
        <p className="font-semibold">Your Bus is 10km away</p>
        {toggle && (
          <div className="flex flex-col w-full items-start mt-2 gap-1">
            <h2 className="text-lg font-semibold">Other Buses</h2>
            <div className="w-full p-2 hover:bg-slate-100">
              Bus Number 2 is 5km away
            </div>
            <div className="w-full p-2 hover:bg-slate-100">
              Bus Number 3 is 10km away
            </div>
          </div>
        )}
      </div>
      <Map location={location} busLocation={busLocation} />
      <div className="fixed bottom-10 left-8 rounded-lg bg-white shadow-black shadow-md p-3 z-10">
        <section className="text-xl">
          {busLocation.latitude && busLocation.longitude ? (
            `Bus Location: ${busLocation.latitude.toFixed(2)}°N,${busLocation.longitude.toFixed(
              2
            )}°E`
          ) : (
            <div className="flex flex-row gap-3">
              <Spinner size={6} color={"blue-500"} border={4} />
              <p>Loading...</p>
            </div>
          )}
        </section>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
