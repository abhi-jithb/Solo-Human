"use client";
import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapView({ signals }: { signals: any[] }) {
    const [viewState, setViewState] = useState({
        latitude: 12.9716, // Default: Bangalore
        longitude: 77.5946,
        zoom: 12
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewState((prev) => ({
                ...prev,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }));
        }, (err) => console.log("Geolocation error:", err));
    }, []);

    if (!MAPBOX_TOKEN) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-gray-900/50 backdrop-blur-md rounded-3xl border border-white/10 text-center p-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Map Unavailable</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        To enable the real-time map, you need a Mapbox API Token.
                    </p>
                    <div className="bg-black/50 p-3 rounded text-xs font-mono text-purple-300">
                        NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-96 rounded-3xl overflow-hidden border border-white/10 relative">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {/* User Location */}
                <Marker longitude={viewState.longitude} latitude={viewState.latitude} anchor="bottom">
                    <div className="relative flex flex-col items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse"></div>
                    </div>
                </Marker>

                {/* Signals */}
                {signals.map((signal, idx) => (
                    <Marker
                        key={idx}
                        // Mock random offset if location missing, for demo
                        longitude={signal.location?.lng || viewState.longitude + (Math.random() * 0.02 - 0.01)}
                        latitude={signal.location?.lat || viewState.latitude + (Math.random() * 0.02 - 0.01)}
                        anchor="bottom"
                    >
                        <div className="group relative cursor-pointer flex flex-col items-center">
                            <MapPin className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-transform group-hover:scale-110" />
                            <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap border border-white/10">
                                {signal.activity} • {signal.username || 'User'}
                            </div>
                        </div>
                    </Marker>
                ))}
            </Map>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-[10px] text-gray-400 px-2 py-1 rounded border border-white/5">
                Solo Map v1.0
            </div>
        </div>
    );
}
