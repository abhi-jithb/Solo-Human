"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Next.js
let icon: any;
if (typeof window !== "undefined") {
    icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
}

// Component to recenter map when coords change
function RecenterMap({ lat, lng }: { lat: number, lng: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lng], map.getZoom());
    }, [lat, lng, map]);
    return null;
}


interface Signal {
    id?: string;
    activity: string;
    username?: string;
    location?: { lat: number; lng: number };
    visual?: { top: string; left: string };
}


export default function MapView({ signals }: { signals: Signal[] }) {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                },
                (err) => {
                    console.error("Error getting location: ", err);
                    // Fallback to a default location (e.g., London) if permission denied

                    setPosition({ lat: 51.505, lng: -0.09 });
                }
            );
        } else {

            setPosition({ lat: 51.505, lng: -0.09 });
        }
    }, []);

    if (!position) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-gray-900/50 backdrop-blur-md rounded-3xl border border-white/10 text-center p-6">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Locating you...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-96 rounded-3xl overflow-hidden border border-white/10 relative z-0">
            <MapContainer
                center={[position.lat, position.lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                {/* Dark Mode Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <RecenterMap lat={position.lat} lng={position.lng} />

                {/* User Location */}
                <Marker position={[position.lat, position.lng]} icon={icon}>
                    <Popup className="text-black">You are here</Popup>
                </Marker>

                {/* Signals */}
                {signals.map((signal, idx) => (
                    <Marker
                        key={idx}
                        position={[
                            signal.location?.lat || position.lat + ((idx * 0.01) % 0.05),
                            signal.location?.lng || position.lng + ((idx * 0.01) % 0.05)
                        ]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="text-black text-center">
                                <strong className="uppercase text-purple-600">{signal.activity}</strong>
                                <br />
                                <span className="text-xs text-gray-600">by {signal.username || 'User'}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="absolute bottom-4 left-4 z-[1000] bg-black/60 backdrop-blur-md text-[10px] text-gray-400 px-2 py-1 rounded border border-white/5 pointer-events-none">
                Solo Map (OpenStreetMap)
            </div>
        </div>
    );
}
