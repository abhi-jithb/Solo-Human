"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '@/lib/constants';

let socket: Socket;

interface Signal {
  activity: string;
  username?: string;
  location?: { lat: number; lng: number };
  visual: {
    top: string;
    left: string;
  };
}

export default function SignalRadar() {
  const [activeSignals, setActiveSignals] = useState<Signal[]>([]);
  const [isScanning] = useState(true);

  useEffect(() => {
    // Initialize Socket
    socket = io(API_URL);

    socket.on('connect', () => {
      // console.log('Connected to Signal Network');
    });

    socket.on('signal-received', (data: Omit<Signal, 'visual'>) => {
      // console.log('New Signal:', data);
      const newSignal: Signal = {
        ...data,
        visual: {
          // Random position for mock visualization calculated ONCE upon receipt
          // In prod, map exact relative coordinates
          top: `${50 + (Math.random() * 60 - 30)}%`,
          left: `${50 + (Math.random() * 60 - 30)}%`
        }
      };
      setActiveSignals((prev) => [...prev, newSignal]);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

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
      {isScanning && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-1/2 h-1/2 top-0 right-0 bg-gradient-to-t from-transparent to-purple-500/20 origin-bottom-left rounded-tr-full"
        />
      )}

      {/* Center User */}
      <div className="relative z-10 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.5)]">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
      </div>

      {/* Real Signals from Socket */}
      {activeSignals.map((signal, idx) => (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={idx}
          className="absolute z-20 cursor-pointer group"
          style={{
            top: signal.visual.top,
            left: signal.visual.left
          }}
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center hover:scale-110 transition shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-bounce-slow">
            <MapPin className="w-4 h-4 text-black" />
          </div>
          {/* Tooltip */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-black/90 px-3 py-1 rounded-full text-xs font-bold text-yellow-500 pointer-events-none border border-yellow-500/30 shadow-xl z-30">
            {signal.activity || 'Signal'}
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-6 py-1 px-4 glass rounded-full text-[10px] text-purple-300 font-mono tracking-widest uppercase animate-pulse">
        {activeSignals.length > 0 ? `${activeSignals.length} Signals Detected` : "Scanning Frequency..."}
      </div>
    </div>
  );
}
