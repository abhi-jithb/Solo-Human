"use client";

import { motion } from "framer-motion";
import { User, MapPin } from "lucide-react";

export default function SignalRadar() {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-square glass rounded-full flex items-center justify-center overflow-hidden border border-white/5">
            {/* Radar Rings */}
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="absolute border border-purple-500/20 rounded-full"
                    style={{ width: `${i * 33}%`, height: `${i * 33}%` }}
                />
            ))}

            {/* Scanning Line */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-1/2 h-1/2 top-0 right-0 bg-gradient-to-t from-transparent to-purple-500/20 origin-bottom-left rounded-tr-full"
            />

            {/* Center User */}
            <div className="relative z-10 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                <User className="text-white w-6 h-6" />
            </div>

            {/* Mock Nearby Signals */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-1/4 right-1/4"
            >
                <div className="relative group">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-pulse cursor-pointer hover:scale-110 transition">
                        <MapPin className="w-4 h-4 text-black" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-black/80 px-2 py-1 rounded text-xs text-yellow-400 pointer-events-none">
                        Coffee • 200m
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-10 py-2 px-4 glass rounded-full text-xs text-gray-400 font-mono tracking-widest uppercase">
                Scanning Area...
            </div>
        </div>
    );
}
