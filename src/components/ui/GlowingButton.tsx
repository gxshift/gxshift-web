'use client';
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

// Kita gunakan Omit untuk membuang 'children' bawaan framer-motion, 
// lalu mendefinisikannya kembali sebagai ReactNode standar.
interface Props extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'outline' | 'ghost';
  children?: React.ReactNode;
}

export const GlowingButton = ({ className, variant = 'primary', children, ...props }: Props) => {
  const base = "relative overflow-hidden px-8 py-3 rounded-lg font-bold tracking-wide transition-all duration-300";
  const variants = {
    primary: "bg-gx-neon text-black shadow-neon hover:shadow-neon-strong hover:-translate-y-1",
    outline: "border border-gx-neon text-gx-neon hover:bg-gx-neon/10",
    ghost: "text-gx-muted hover:text-gx-neon hover:bg-white/5"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className={cn(base, variants[variant], className)} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};