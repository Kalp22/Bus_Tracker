"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Spinner from "@/components/loading/spinner";

const Map = dynamic(() => import("@/components/map/map"), { ssr: false });

import "leaflet/dist/leaflet.css";

import { Toaster, toast } from "sonner";

export default function Live() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [toggle, setToggle] = useState(false);

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
      <Map location={location} />
      <div className="fixed bottom-10 left-8 rounded-lg bg-white shadow-black shadow-md p-3 z-10">
        <section className="text-xl">
          {location.latitude && location.longitude ? (
            `${location.latitude.toFixed(2)}°N,${location.longitude.toFixed(
              2
            )}°E`
          ) : (
            <section className="flex flex-row gap-2">
              <Spinner size={6} />
              <p>Loading...</p>
            </section>
          )}
        </section>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
