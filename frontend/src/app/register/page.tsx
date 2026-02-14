"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black">
            {/* Right: Form (Order swapped for visual balance if desired, but sticking to pattern) */}
            <div className="flex flex-col justify-center items-center p-8 order-2 md:order-1">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-white mb-2">Join the Tribe</h2>
                    <p className="text-gray-500 mb-8">Start your solo adventure today.</p>

                    {error && <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded text-sm">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition"
                                placeholder="SoloExplorer"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black uppercase tracking-wider shadow-lg shadow-purple-500/20"
                        >
                            Create Account
                        </motion.button>
                    </form>

                    <p className="mt-8 text-center text-gray-500">
                        Already a member? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold">Login</Link>
                    </p>
                </div>
            </div>

            {/* Left: Visuals */}
            <div className="hidden md:flex flex-col justify-center items-center relative overflow-hidden bg-pink-900/20 p-12 order-1 md:order-2">
                <div className="absolute inset-0 bg-[url('/bg-grid.svg')] opacity-20"></div>
                <div className="w-96 h-96 bg-pink-600 rounded-full blur-[100px] opacity-30 absolute"></div>

                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600 z-10 mb-6 text-center">
                    YOUR <br /> JOURNEY
                </h1>
                <p className="text-xl text-gray-400 z-10 text-center max-w-sm">
                    Discover a world built for you, not for couples.
                </p>
            </div>
        </div>
    );
}
