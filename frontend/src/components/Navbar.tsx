"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (isAuthPage) return null;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/5"
        >
            <Link href="/">
                <h1 className="text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer">
                    SOLO HUMAN
                </h1>
            </Link>

            <div className="flex gap-4">
                <Link href="/login">
                    <Button variant="glass" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                    <Button variant="primary" size="sm" glow>Join the Tribe</Button>
                </Link>
            </div>
        </motion.nav>
    );
}
