'use client';
import { motion, AnimatePresence } from "framer-motion";

export default function BlastDoorOverlay({ isReady }: { isReady: boolean }) {
  return (
    <AnimatePresence>
      {!isReady && (
        // Menggunakan z-100 sesuai anjuran linter Tailwind
        <div className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none">
          
          {/* Pintu Kiri */}
          <motion.div 
            initial={{ x: 0 }} 
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.17, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#030504] border-r-2 border-gx-neon shadow-[10px_0_50px_rgba(204,255,0,0.2)] z-10 pointer-events-auto flex items-center justify-end overflow-hidden"
          >
            {/* Ornamen Garis Neon Pintu Kiri */}
            <div className="w-1 h-32 bg-gx-neon mr-2 shadow-[0_0_15px_#ccff00]" />
          </motion.div>

          {/* Pintu Kanan */}
          <motion.div 
            initial={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.17, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#030504] border-l-2 border-gx-neon shadow-[-10px_0_50px_rgba(204,255,0,0.2)] z-10 pointer-events-auto flex items-center justify-start overflow-hidden"
          >
            {/* Ornamen Garis Neon Pintu Kanan */}
            <div className="w-1 h-32 bg-gx-neon ml-2 shadow-[0_0_15px_#ccff00]" />
          </motion.div>

          {/* Center Logo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            // Penulisan transisi exit yang benar secara TypeScript strict typing
            exit={{ 
              scale: 1.5, 
              opacity: 0, 
              filter: "blur(10px)", 
              transition: { duration: 0.4 } 
            }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 flex flex-col items-center justify-center"
          >
            <div className="w-32 h-32 flex items-center justify-center bg-[#06090B] border border-gx-neon/50 shadow-[0_0_30px_rgba(204,255,0,0.3)] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] p-2 animate-pulse">
              <img src="/loading-logo.webp" alt="GXShift Loading" className="w-full h-full object-contain" />
            </div>
            <div className="mt-4 text-gx-neon font-mono text-sm font-bold tracking-[0.3em] animate-pulse">
              SYSTEM INITIATING...
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}