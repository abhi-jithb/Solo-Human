"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestCardProps {
    title: string;
    xp: number;
    difficulty: "Easy" | "Medium" | "Hard";
    category: string;
    icon: LucideIcon;
    onClick?: () => void;
}

export default function QuestCard({ title, xp, difficulty, category, icon: Icon, onClick }: QuestCardProps) {
    const difficultyColor = {
        Easy: "text-green-400 border-green-500/30 bg-green-500/10",
        Medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
        Hard: "text-red-500 border-red-500/30 bg-red-500/10",
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 rounded-2xl glass border border-white/10 overflow-hidden group cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                        <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-gray-400 uppercase tracking-wider">
                        {category}
                    </span>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-400">Complete this alone to earn rewards.</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className={cn("text-xs font-bold px-3 py-1 rounded-full border", difficultyColor[difficulty])}>
                        {difficulty}
                    </span>
                    <span className="text-sm font-black text-yellow-400 flex items-center gap-1">
                        +{xp} XP
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
