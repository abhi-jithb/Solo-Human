"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { MapPin, Coffee, BookOpen, Utensils, Star, AlertCircle, Trophy, Zap } from "lucide-react";
import QuestCard from "@/components/QuestCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
    ssr: false,
    loading: () => <div className="w-full h-96 bg-gray-900 animate-pulse rounded-3xl" />
});

const SignalRadar = dynamic(() => import("@/components/SignalRadar"), {
    ssr: false,
    loading: () => <div className="w-full h-96 bg-gray-900 animate-pulse rounded-3xl" />
});

interface Quest {
    _id: string;
    title: string;
    category: string;
    xpReward: number;
    difficulty: "Easy" | "Medium" | "Hard";
}

const CATEGORY_ICONS: any = {
    Culture: BookOpen,
    Adventure: MapPin,
    Social: Utensils,
    Chill: Coffee,
};

export default function Dashboard() {
    const router = useRouter();
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'Radar' | 'Map'>('Map');

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            try {
                // Verify session
                const userRes = await api.get('/api/auth/me');
                setUser(userRes.data);
                localStorage.setItem('user', JSON.stringify(userRes.data));

                // Fetch Quests
                const questsRes = await api.get(`/api/quests`);
                setQuests(questsRes.data);
            } catch (err) {
                console.error("Auth failed or fetch error:", err);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchData();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-purple-400 font-bold tracking-widest animate-pulse">Jacking into Solo Net...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden">
            <Navbar />

            {/* Decorative Background */}
            <div className="fixed inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
            <div className="fixed top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <main className="pt-28 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* Left Sidebar: Profile & Stats (Col Span 3) */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <motion.section
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="p-6 rounded-3xl glass border border-white/10 text-center relative overflow-hidden"
                    >
                        <div className="relative inline-block mb-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-black">
                                    {user?.username?.[0]?.toUpperCase()}
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full border border-black">
                                Lvl {user?.level || 1}
                            </div>
                        </div>

                        <h2 className="text-xl font-bold">{user?.username || 'Solo Explorer'}</h2>
                        <p className="text-gray-400 text-sm mb-6">{user?.bio || 'Ready for adventure.'}</p>

                        <div className="grid grid-cols-2 gap-2 text-center bg-white/5 rounded-xl p-3">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Quests</p>
                                <p className="text-lg font-black text-white">{user?.questsCompleted?.length || 0}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">XP</p>
                                <p className="text-lg font-black text-yellow-400">{user?.xp || 0}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Leaderboard Snippet */}
                    <motion.section
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-3xl glass border border-white/10"
                    >
                        <div className="flex items-center gap-2 mb-4 text-yellow-400">
                            <Trophy className="w-5 h-5" />
                            <h3 className="font-bold uppercase tracking-wider text-sm">Top Solo Humans</h3>
                        </div>
                        <ul className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-bold w-4 ${i === 1 ? 'text-yellow-400' : 'text-gray-500'}`}>{i}</span>
                                        <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                        <span className="text-gray-300">User_{i * 99}</span>
                                    </div>
                                    <span className="text-xs font-mono text-purple-400">{5000 - i * 200} XP</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                </div>

                {/* Center: Radar & Map (Col Span 5) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <motion.section
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-1 rounded-3xl bg-gradient-to-b from-purple-500/20 to-pink-500/10 border border-white/10"
                    >
                        <div className="bg-black/40 backdrop-blur-xl rounded-[22px] p-8 text-center">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-left">
                                    <h2 className="text-white font-black uppercase text-lg flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-500" /> Live {viewMode === 'Radar' ? 'Radar' : 'Map'}
                                    </h2>
                                    <p className="text-xs text-gray-500">Scanning for signals in 5km radius</p>
                                </div>
                                <div className="flex items-center gap-2 bg-black/50 p-1 rounded-full border border-white/10">
                                    <button
                                        onClick={() => setViewMode('Radar')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${viewMode === 'Radar' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Radar
                                    </button>
                                    <button
                                        onClick={() => setViewMode('Map')}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${viewMode === 'Map' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Map
                                    </button>
                                </div>
                            </div>

                            <div className="py-4 min-h-[400px] flex items-center justify-center">
                                {viewMode === 'Radar' ? <SignalRadar /> : <MapView signals={[]} />}
                                {/* Note: Pass real signals prop once available in state */}
                            </div>

                            <Button variant="primary" glow className="w-full mt-6 py-4 rounded-xl group" onClick={() => setIsSignalModalOpen(true)}>
                                Broadcast Signal
                            </Button>
                        </div>
                    </motion.section>
                </div>

                {/* Right: Active Quests (Col Span 4) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                        <h2 className="text-2xl font-black uppercase italic">Available Quests</h2>
                        <button className="text-xs font-bold text-purple-400 hover:text-white transition uppercase">View All</button>
                    </div>

                    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {quests.length === 0 ? (
                            <div className="p-8 rounded-2xl border border-dashed border-gray-700 text-center text-gray-500">
                                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                No quests nearby.
                            </div>
                        ) : (
                            quests.map((quest, idx) => (
                                <motion.div
                                    key={quest._id}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <QuestCard
                                        title={quest.title}
                                        category={quest.category}
                                        xp={quest.xpReward}
                                        difficulty={quest.difficulty}
                                        icon={CATEGORY_ICONS[quest.category] || Star}
                                    />
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <h4 className="font-bold text-yellow-100 text-sm">Daily Streak</h4>
                                <p className="text-xs text-yellow-500/80">Log in tomorrow to keep it going!</p>
                            </div>
                            <div className="ml-auto text-2xl font-black text-white italic">
                                3 <span className="text-xs font-normal text-gray-400 not-italic">DAYS</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
