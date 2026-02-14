"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Zap, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

      {/* Floating 3D-style Elements (Animated) */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 md:left-20 opacity-50 blur-[2px]"
      >
        <MapPin className="w-24 h-24 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-10 md:right-32 opacity-50 blur-[1px]"
      >
        <Coffee className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10 pt-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <Zap className="w-3 h-3 fill-current" /> Beta Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-white drop-shadow-2xl">
            WHY SHOULD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 text-glow">
              COUPLES
            </span> <br />
            HAVE ALL THE FUN?
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Turn solo living into a <span className="text-white font-bold">high-energy adventure</span>.
            Connect with the map, conquer quests, and find your tribe.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/dashboard">
              <Button variant="primary" size="lg" glow className="group">
                Start A Quest
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>

            <Button variant="glass" size="lg" className="group">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Broadcast Signal
            </Button>
          </div>
        </motion.div>

        {/* Feature Teasers */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left p-4">
          {[
            { title: "Geo-Map", desc: "Find nearby singles instantly.", icon: MapPin, color: "text-purple-400" },
            { title: "Solo Quests", desc: "Gamify your independence.", icon: Zap, color: "text-yellow-400" },
            { title: "The Signal", desc: "One-tap meetups. No swiping.", icon: User, color: "text-pink-400" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="glass p-6 rounded-2xl hover:bg-white/5 transition border border-white/5"
            >
              <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
              <h3 className="text-xl font-bold uppercase italic">{feature.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </main>

      {/* Footer Mockup */}
      <footer className="p-6 text-center text-gray-600 text-xs font-mono uppercase tracking-widest">
        Built for the Solo Human Community
      </footer>
    </div>
  );
}
