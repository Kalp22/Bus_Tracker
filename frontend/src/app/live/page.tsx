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
  const [busData, setBusData] = useState<BusLocation[]>([
    {
      dateandtime: new Date(),
      id: 0,
      latitude: 0,
      longitude: 0,
    },
    {
      dateandtime: new Date(),
      id: 0,
      latitude: 0,
      longitude: 0,
    },
  ]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [busLocation, setBusLocation] = useState<BusLocation>({
    dateandtime: new Date(), // Initial date and time
    id: 0,
    latitude: 0,
    longitude: 0,
  });
  const [busSpeed, setBusSpeed] = useState<number>(0);
  const [busDistance, setBusDistance] = useState<number>(0);
  const [busTime, setBusTime] = useState<number>(0);

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
          const lastBusLocation = data[1];
          setBusData(data);
          console.log(data);
          const dateAndTime = new Date(lastBusLocation.Timedate);
          setBusLocation({ ...lastBusLocation, dateandtime: dateAndTime });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  function calculateDistanceAndSpeed(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    myLatitude: number,
    myLongitude: number,
    timeDifferenceInSeconds: number
  ): { distance1: number; speed: number } {
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const earthRadiusKm = 6371;

    const dLat1 = deg2rad(lat2 - myLatitude);
    const dLon1 = deg2rad(lon2 - myLongitude);

    const a1 =
      Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) +
      Math.cos(deg2rad(myLatitude)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon1 / 2) *
        Math.sin(dLon1 / 2);

    const c1 = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1 - a1));
    const distance1 = earthRadiusKm * c1;

    const dLat2 = deg2rad(lat2 - lat1);
    const dLon2 = deg2rad(lon2 - lon1);
    const a2 =
      Math.sin(dLat2 / 2) * Math.sin(dLat2 / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon2 / 2) *
        Math.sin(dLon2 / 2);
    const c2 = 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
    const distance2 = earthRadiusKm * c2; // Distance in kilometers

    console.log("distances: " + distance1, distance2);

    // Convert time difference from seconds to hours
    const timeDifferenceHours = timeDifferenceInSeconds / 3600;
    console.log("timeDifferenceHours: " + timeDifferenceHours);

    // Calculate speed in kilometers per hour
    const speed = distance2 / timeDifferenceHours;
    console.log("speed: " + speed);

    return { distance1, speed };
  }

  // Usage
  useEffect(() => {
    const { distance1, speed } = calculateDistanceAndSpeed(
      busData[0].latitude,
      busData[0].longitude,
      busData[1].latitude,
      busData[1].longitude,
      location.latitude,
      location.longitude,
      2
    );

    setBusSpeed(speed);
    setBusDistance(distance1);
    console.log(distance1, speed);
    setBusTime(() => {
      const timeinHours = distance1 / speed;
      return timeinHours * 60;
    });
  }, [busData, location.latitude, location.longitude]);

  const toggleBuses = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="fixed bottom-10 right-8 rounded-lg bg-white shadow-black shadow-md p-3 z-10">
        <section className="text-xl">
          {location.latitude && location.longitude ? (
            `Your Location: ${location.latitude.toFixed(
              2
            )}°N,${location.longitude.toFixed(2)}°E`
          ) : (
            <div className="flex flex-row gap-3">
              <Spinner size={6} color={"blue-600"} border={4} />
              <p>Loading...</p>
            </div>
          )}
        </section>
      </div>
      <div
        className={`fixed flex flex-col items-center gap-2 top-3 ${
          location.latitude && location.longitude
            ? "translate-x-0 left-16"
            : "-translate-x-96 -left-16"
        }  rounded-2xl bg-white shadow-black shadow-sm p-3 z-10 cursor-pointer transition-all`}
        onClick={toggleBuses}
      >
        <h2 className="text-xl font-bold">
          Your Bus will reach the Stop in{" "}
          {busTime < 1 ? "Soon" : busTime.toPrecision(1) + " minutes"}{" "}
        </h2>
        <p className="font-semibold">
          Your Bus is {busDistance.toFixed(2)} km away
        </p>
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
            `Bus Location: ${busLocation.latitude.toFixed(
              2
            )}°N,${busLocation.longitude.toFixed(2)}°E`
          ) : (
            <div className="flex flex-row gap-3">
              <Spinner size={6} color={"blue-600"} border={4} />
              <p>Loading...</p>
            </div>
          )}
        </section>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
