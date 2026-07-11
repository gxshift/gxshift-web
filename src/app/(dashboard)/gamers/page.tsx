'use client';
import { motion } from "framer-motion";
import { Crosshair, Trophy, CheckCircle, ChevronRight } from "lucide-react";

export default function GamersDashboard() {
  return (
    <div className="space-y-8">
      {/* 1. OPERATIVE BANNER */}
      <div className="bg-[#0A100D] border-2 border-blue-500/50 p-8 relative overflow-hidden flex justify-between items-center [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] group hover:border-blue-500 transition-colors duration-500">
        <div className="absolute top-0 left-0 w-3 h-full bg-blue-500 shadow-[0_0_20px_#3b82f6]" />
        <div className="pl-6 relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
            OPERATIVE <span className="text-blue-400 drop-shadow-[0_0_8px_#60a5fa]">TERMINAL</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">Access your assigned missions and update progress.</p>
        </div>
      </div>

      {/* 2. BOOSTER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "ACTIVE MISSIONS", val: "1", icon: Crosshair, color: "text-blue-400", border: "border-blue-400" },
          { label: "MISSIONS COMPLETED", val: "14", icon: Trophy, color: "text-gx-neon", border: "border-gx-neon" },
          { label: "PAYOUT RELEASABLE", val: "Rp 850K", icon: CheckCircle, color: "text-white", border: "border-white/20" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`bg-[#030504] border ${s.border} p-5 flex items-center gap-4 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:shadow-[0_0_15px_currentColor] transition-all ${s.color}`}
          >
            <div className={`p-3 bg-black/50 border ${s.border} [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]`}>
              <s.icon size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-bold tracking-widest uppercase">{s.label}</div>
              <div className="text-2xl font-black mt-1 text-white">{s.val}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. ASSIGNED MISSIONS */}
      <div>
        <h2 className="text-lg font-black tracking-widest text-white mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-500 shadow-[0_0_10px_#3b82f6]" /> CURRENT MISSION
        </h2>
        
        <div className="bg-[#0A100D] border-2 border-blue-500/30 p-8 shadow-2xl relative [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)] group hover:border-blue-500 transition-colors">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white uppercase">Mobile Legends: Legend II → Glory</h3>
              <p className="text-sm text-gray-400 mt-1 font-mono">Mission ID: #GX-8830 | Client Username: User_Alpha</p>
            </div>
            <div className="flex flex-col items-end gap-2">
               <button className="px-6 py-2 bg-blue-500 text-black font-black uppercase tracking-widest text-xs [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white hover:shadow-[0_0_15px_#fff] transition-all flex items-center gap-2">
                 DECRYPT VAULT (GET PASS) <ChevronRight size={14}/>
               </button>
            </div>
          </div>
          
          {/* Progress Updater */}
          <div className="bg-[#030504] border border-white/10 p-6 flex justify-between items-center [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
             <div>
               <div className="text-xs font-mono text-gray-500 mb-2">UPDATE PROGRESS</div>
               <div className="flex gap-4 items-center">
                  <select className="bg-[#0A100D] border border-white/20 text-white p-2 font-mono text-sm outline-none focus:border-blue-500">
                    <option>Legend I</option>
                    <option>Mythic Placement</option>
                    <option>Mythic 10 Stars</option>
                  </select>
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black font-bold text-xs uppercase transition-colors">Submit Update</button>
               </div>
             </div>
             
             <button className="px-6 py-4 bg-transparent border-2 border-gx-neon text-gx-neon font-black uppercase text-sm hover:bg-gx-neon hover:text-black hover:shadow-[0_0_20px_#ccff00] transition-all [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
               MARK TARGET REACHED
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}