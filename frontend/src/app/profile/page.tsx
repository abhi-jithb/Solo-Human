"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Trophy, MapPin, Calendar, Star, Edit2, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Profile() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) setUser(JSON.parse(userData));
    }, []);

    if (!user) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-purple-500">
            Loading Profile...
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <Navbar />

            {/* Cover Image Mockup */}
            <div className="h-64 bg-gradient-to-r from-purple-900 to-pink-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg-grid.svg')] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <main className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full border-4 border-black bg-gradient-to-tr from-purple-500 to-pink-500 p-[3px] shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-6xl font-black">
                                {user.username?.[0]?.toUpperCase()}
                            </div>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition shadow-lg">
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-grow mb-2">
                        <h1 className="text-4xl font-black flex items-center gap-2">
                            {user.username}
                            <span className="text-sm bg-yellow-500 text-black px-2 py-1 rounded font-bold uppercase tracking-widest align-middle">
                                Lvl {user.level || 5}
                            </span>
                        </h1>
                        <p className="text-gray-400">@{user.username.toLowerCase().replace(/\s/g, '')} • Joined 2024</p>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <Button variant="outline" size="sm">Edit Profile</Button>
                        <Button variant="primary" size="sm" glow>Share Profile</Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: "Level", value: user.level || 5, icon: Star, color: "text-yellow-400" },
                        { label: "XP", value: user.xp || 2400, icon: Zap, color: "text-purple-400" },
                        { label: "Quests", value: user.questsCompleted?.length || 12, icon: MapPin, color: "text-blue-400" },
                        { label: "Streak", value: "3 Days", icon: Calendar, color: "text-green-400" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl glass border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition"
                        >
                            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                            <span className="text-3xl font-black">{stat.value}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Badges Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-500" /> Badges Earned
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {['Early Bird', 'Night Owl', 'Explorer', 'Socialite', 'Connector'].map((badge, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center group hover:bg-white/10 transition cursor-pointer relative overflow-hidden gap-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                <Trophy className="w-8 h-8 text-gray-600 group-hover:text-yellow-400 transition transform group-hover:scale-110" />
                                <span className="text-[10px] text-gray-500 font-bold uppercase text-center px-1">{badge}</span>
                            </motion.div>
                        ))}
                        <div className="aspect-square rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-gray-600 flex-col gap-1">
                            <span className="text-2xl opacity-30">+</span>
                            <span className="text-[10px] uppercase font-bold opacity-50">Locked</span>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
