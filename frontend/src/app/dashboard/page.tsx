"use client";

import { motion } from "framer-motion";
import { MapPin, Coffee, BookOpen, Utensils } from "lucide-react";
import QuestCard from "@/components/QuestCard";
import SignalRadar from "@/components/SignalRadar";

const MOCK_QUESTS = [
    {
        id: 1,
        title: "The Silent Reader",
        category: "Culture",
        xp: 150,
        difficulty: "Easy" as const,
        icon: BookOpen,
    },
    {
        id: 2,
        title: "Urban Explorer",
        category: "Adventure",
        xp: 300,
        difficulty: "Medium" as const,
        icon: MapPin,
    },
    {
        id: 3,
        title: "Dining Solo",
        category: "Social",
        xp: 500,
        difficulty: "Hard" as const,
        icon: Utensils,
    },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass border-b border-white/5 p-4 flex justify-between items-center">
                <h1 className="text-xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    SOLO HUMAN
                </h1>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-gray-400 uppercase font-bold">Level 5</p>
                        <div className="w-24 h-2 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-purple-500 w-2/3"></div>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-white/20"></div>
                </div>
            </header>

            <main className="pt-24 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Col: High Level Stats & Signal */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <section className="p-6 rounded-3xl glass border border-white/10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Live Radar</h2>
                        <div className="flex justify-center mb-6">
                            <SignalRadar />
                        </div>
                        <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider transition shadow-lg shadow-purple-500/20 active:scale-95">
                            Broadcast Signal
                        </button>
                        <p className="text-xs text-gray-500 mt-4">3 Solo Humans nearby</p>
                    </section>

                    <section className="p-6 rounded-3xl glass border border-white/10">
                        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Your Impact</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 text-center">
                                <p className="text-2xl font-black text-white">12</p>
                                <p className="text-xs text-gray-500 uppercase">Quests</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 text-center">
                                <p className="text-2xl font-black text-yellow-400">2.4k</p>
                                <p className="text-xs text-gray-500 uppercase">XP</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Col: Active Quests */}
                <div className="md:col-span-2">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-3xl font-black uppercase italic">Active Quests</h2>
                            <p className="text-gray-400 text-sm">Challenge yourself. Level up.</p>
                        </div>
                        <button className="text-purple-400 text-sm font-bold hover:text-purple-300">View All →</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {MOCK_QUESTS.map((quest) => (
                            <QuestCard
                                key={quest.id}
                                {...quest}
                                onClick={() => console.log("Quest clicked:", quest.title)}
                            />
                        ))}
                    </div>

                    {/* Daily Challenge Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                    >
                        <div className="bg-black rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
                                    <Coffee className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Daily Drop: Coffee Run</h3>
                                    <p className="text-sm text-gray-400">Visit a new cafe and stay for 30 mins.</p>
                                </div>
                            </div>
                            <button className="px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition">
                                Accept (+100 XP)
                            </button>
                        </div>
                    </motion.div>
                </div>

            </main>
        </div>
    );
}
