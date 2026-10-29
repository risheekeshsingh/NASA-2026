"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Facility {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  duration: string;
  capability: string;
}

const FACILITIES: Facility[] = [
  {
    id: "grc-zgf",
    name: "NASA Glenn Zero-G Facility (ZGF)",
    location: "Cleveland, Ohio",
    lat: 41.4136,
    lng: -81.8617,
    duration: "5.18 seconds of 10^-5 g microgravity",
    capability: "World's largest drop tower (145 m vacuum drop chamber) for combustion & soot kinetics.",
  },
  {
    id: "grc-dt22",
    name: "NASA 2.2 Second Drop Tower",
    location: "Brook Park, Ohio",
    lat: 41.3995,
    lng: -81.8592,
    duration: "2.16 seconds of microgravity",
    capability: "Rapid-turnaround droplet combustion and solid fuel ignition experiments.",
  },
  {
    id: "jsc-mcc",
    name: "NASA Johnson Space Center (ISS POIC / MCC)",
    location: "Houston, Texas",
    lat: 29.5593,
    lng: -95.0900,
    duration: "Continuous (ISS in LEO)",
    capability: "Real-time CIR / ACME and BASS-II commanding and astronaut fire-drill safety protocols.",
  },
  {
    id: "ws-test",
    name: "White Sands Test Facility (WSTF)",
    location: "Las Cruces, New Mexico",
    lat: 32.5085,
    lng: -106.5878,
    duration: "Hyperbaric / Hypobaric Chamber Testing",
    capability: "Materials flammability testing under enriched oxygen (NASA-STD-6001 Test 1).",
  },
];

// Custom SVG-based Leaflet pin to prevent missing asset errors
function createCustomPin(color: string) {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 0 12px ${color};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 8px; height: 8px; background: #ffffff; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

export default function FacilityMap() {
  useEffect(() => {
    // Leaflet window verification
  }, []);

  const emberIcon = createCustomPin("#f97316");
  const cyanIcon = createCustomPin("#00e5ff");

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-space-800 relative z-0">
      <MapContainer
        center={[36.5, -95.0]}
        zoom={4}
        scrollWheelZoom={false}
        className="w-full h-full bg-space-950"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {FACILITIES.map((facility, index) => (
          <Marker
            key={facility.id}
            position={[facility.lat, facility.lng]}
            icon={index % 2 === 0 ? emberIcon : cyanIcon}
          >
            <Popup className="flame-map-popup">
              <div className="p-1 space-y-1 text-xs">
                <strong className="block text-sm text-space-950 font-bold">{facility.name}</strong>
                <span className="text-slate-600 font-medium block">{facility.location}</span>
                <div className="pt-1 text-slate-700">
                  <p className="font-semibold text-ember-700">Duration: {facility.duration}</p>
                  <p className="text-[11px] text-slate-600 mt-1">{facility.capability}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
