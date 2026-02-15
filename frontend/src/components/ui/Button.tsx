"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {

    const variants = {
      primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 border-none",
      secondary: "bg-yellow-400 text-black hover:bg-yellow-300 border-none",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
      outline: "bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg font-black uppercase tracking-widest",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          glow && "shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
