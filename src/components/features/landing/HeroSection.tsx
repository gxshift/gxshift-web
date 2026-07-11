'use client';
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function HeroSection({ isReady }: { isReady: boolean }) {
  const { scrollYProgress } = useScroll();
  const yHeroChars = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(15px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative pt-40 pb-20 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#06090B]">
      <motion.div initial={{ opacity: 0 }} animate={isReady ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2 }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.2)_0%,transparent_50%)] pointer-events-none" />
      <motion.div initial={{ opacity: 0 }} animate={isReady ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2, delay: 0.5 }} className="absolute inset-0 bg-[linear-gradient(to_right,#ccff000a_1px,transparent_1px),linear-gradient(to_bottom,#ccff000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate={isReady ? "show" : "hidden"} className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <motion.div variants={itemVariants} className="text-gx-neon font-mono text-sm tracking-widest mb-4 flex items-center gap-2 drop-shadow-[0_0_8px_#ccff00]">
          <span className="w-2 h-2 rounded-full bg-gx-neon animate-pulse" /> # WORLD CLASS GAMING SERVICES
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-gx-neon drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">
          SHAPING THE FUTURE OF <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gx-neon to-[#aacc00] filter drop-shadow-[0_0_40px_rgba(204,255,0,0.6)]">
            MOBILE LEGENDS RANK
          </span>
        </motion.h1>

        {/* TOMBOL HERO: Garis Neon Transparan -> Solid Neon di Hover */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mt-4">
          <button className="bg-transparent border-2 border-gx-neon text-gx-neon font-black uppercase tracking-widest px-10 py-4 [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] hover:scale-105 hover:bg-gx-neon hover:text-black hover:shadow-[0_0_40px_#ccff00] transition-all duration-300 flex items-center gap-2">
            EXPLORE MORE <ChevronRight size={20} />
          </button>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: yHeroChars }} initial={{ opacity: 0, y: 100, filter: "blur(20px)" }} animate={isReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }} className="relative w-full max-w-6xl mx-auto mt-16 px-6 z-10">
        <div className="relative w-full h-[350px] md:h-[400px] bg-[#0A100D] border-2 border-gx-neon [clip-path:polygon(40px_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%,0_40px)] flex flex-col justify-center items-center text-center p-8 shadow-[0_0_50px_rgba(204,255,0,0.15)]">
          <div className="absolute inset-0 bg-linear-to-b from-gx-neon/15 to-transparent pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black uppercase text-gx-neon mb-4 relative z-10 drop-shadow-[0_0_10px_#ccff00]">REACH MYTHICAL GLORY</h2>
          <p className="text-gray-300 max-w-xl mx-auto relative z-10">Layanan boosting tercepat, dikerjakan roster pro-player tanpa cheat.</p>
          <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/swords.svg" alt="Hero Left" className="absolute -left-10 md:left-10 -bottom-10 h-[120%] md:h-[140%] object-contain drop-shadow-[0_0_30px_rgba(204,255,0,0.5)] opacity-30 md:opacity-100" />
          <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/crosshair.svg" alt="Hero Right" className="absolute -right-10 md:right-10 -bottom-10 h-[120%] md:h-[130%] object-contain drop-shadow-[0_0_30px_rgba(204,255,0,0.5)] opacity-30 md:opacity-100" />
        </div>
      </motion.div>
    </section>
  );
}