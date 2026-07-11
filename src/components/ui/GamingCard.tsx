'use client';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const GamingCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative bg-gx-surface border border-gx-border rounded-xl p-6 overflow-hidden group",
        "hover:border-gx-neon/50 transition-colors duration-500",
        className
      )}
    >
      {/* Animated background glow on hover */}
      <div className="absolute inset-0 bg-gx-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};