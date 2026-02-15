"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Clapperboard, Monitor, Bike, User } from "lucide-react";
import { Button } from "./ui/Button";
import api from "@/lib/api";
import io from "socket.io-client";

const ACTIVITIES = [
    { id: "Coffee", icon: Coffee, label: "Coffee Break" },
    { id: "Movie", icon: Clapperboard, label: "Watch Movie" },
    { id: "Work", icon: Monitor, label: "Co-Working" },
    { id: "Adventure", icon: Bike, label: "Adventure" },
    { id: "Chill", icon: User, label: "Just Chilling" },
];

interface CreateSignalModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

export default function CreateSignalModal({ isOpen, onClose, user }: CreateSignalModalProps) {
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleBroadcast = async () => {
        if (!selectedActivity || !user) return;
        setLoading(true);

        const broadcast = (lat: number, lng: number) => {
            // 1. Save to DB
            api.post('/api/signals', {
                activity: selectedActivity,
                location: { lat, lng }
            }).then(() => {
                // 2. Emit Socket Event (Optional: consider using a global socket instance)
                const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
                socket.emit('send-signal', {
                    username: user.username,
                    activity: selectedActivity,
                    location: { lat, lng }
                });
                onClose();
            }).catch(err => {
                console.error("Failed to broadcast signal", err);
            }).finally(() => {
                setLoading(false);
            });
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    broadcast(pos.coords.latitude, pos.coords.longitude);
                },
                (err) => {
                    console.error("Geo error:", err);
                    // Fallback to London if denied
                    broadcast(51.505, -0.09);
                }
            );
        } else {
            broadcast(51.505, -0.09);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed inset-0 m-auto w-full max-w-md h-fit p-6 rounded-3xl bg-[#111] border border-white/10 shadow-2xl z-50"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                Broadcast Signal
                            </h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <p className="text-gray-400 mb-6 text-sm">
                            Select an activity to find other Solo Humans nearby.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {ACTIVITIES.map((act) => (
                                <button
                                    key={act.id}
                                    onClick={() => setSelectedActivity(act.id)}
                                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition border ${selectedActivity === act.id
                                        ? "bg-purple-600/20 border-purple-500 text-white"
                                        : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
                                        }`}
                                >
                                    <act.icon className={`w-6 h-6 ${selectedActivity === act.id ? 'text-purple-400' : ''}`} />
                                    <span className="text-xs font-bold uppercase">{act.id}</span>
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="primary"
                            glow
                            className="w-full py-4 text-lg"
                            disabled={!selectedActivity || loading}
                            onClick={handleBroadcast}
                        >
                            {loading ? "Broadcasting..." : "Send Signal 🚀"}
                        </Button>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
