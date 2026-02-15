"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { LogOut } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const [user, setUser] = useState<{ username?: string } | null>(null);

    useEffect(() => {
        // Check auth status on mount
        const userData = localStorage.getItem("user");
        // eslint-disable-next-line
        if (userData) setUser(JSON.parse(userData));
    }, [pathname]);

    if (isAuthPage) return null;

    const handleLogout = async () => {
        try {
            await api.post("/api/auth/logout");
            localStorage.removeItem("user");
            window.location.href = "/";
        } catch (err) {
            console.error("Logout failed:", err);
            // Fallback: still clear local data
            localStorage.removeItem("user");
            window.location.href = "/";
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5 supports-[backdrop-filter]:bg-black/20"
        >
            <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                    <img src="/logo.jpeg" alt="Solo Human Logo" className="w-10 h-10 rounded-full border-2 border-purple-500" />
                    <h1 className="text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hidden sm:block">
                        SOLO HUMAN
                    </h1>
                </div>
            </Link>

            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <Link href="/dashboard" className={`text-sm font-bold hover:text-purple-400 transition ${pathname === '/dashboard' ? 'text-purple-400' : 'text-gray-400'}`}>
                            Dashboard
                        </Link>
                        <Link href="/profile">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition border border-white/10 cursor-pointer group">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                    {user.username?.[0]?.toUpperCase()}
                                </div>
                                <span className="text-sm font-bold group-hover:text-white text-gray-300 hidden sm:inline-block">{user.username}</span>
                            </div>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="glass" size="sm">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="primary" size="sm" glow>Join the Tribe</Button>
                        </Link>
                    </>
                )}
            </div>
        </motion.nav>
    );
}
