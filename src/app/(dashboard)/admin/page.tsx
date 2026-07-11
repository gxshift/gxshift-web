'use client';
import { motion } from "framer-motion";
import { Activity, Users, DollarSign, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* 1. OMNI-CONTROL BANNER */}
      <div className="bg-[#0A100D] border-2 border-red-500/50 p-8 relative overflow-hidden flex justify-between items-center [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] group hover:border-red-500 transition-colors duration-500">
        <div className="absolute top-0 left-0 w-3 h-full bg-red-500 shadow-[0_0_20px_#ef4444]" />
        <div className="pl-6 relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
            OMNI-CONTROL <span className="text-red-500 drop-shadow-[0_0_8px_#ef4444]">NEXUS</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">System administration and global ledger overview.</p>
        </div>
      </div>

      {/* 2. GLOBAL STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "TOTAL REVENUE", val: "Rp 12.4M", icon: DollarSign, color: "text-gx-neon", border: "border-gx-neon" },
          { label: "ACTIVE ORDERS", val: "24", icon: Activity, color: "text-blue-400", border: "border-blue-400" },
          { label: "REGISTERED USERS", val: "1,204", icon: Users, color: "text-white", border: "border-white/20" },
          { label: "DISPUTES / ISSUES", val: "0", icon: AlertTriangle, color: "text-red-500", border: "border-red-500" },
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

      {/* 3. ORDER MANAGEMENT TERMINAL */}
      <div>
        <h2 className="text-lg font-black tracking-widest text-white mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-red-500 shadow-[0_0_10px_#ef4444]" /> LIVE ORDER STREAM
        </h2>
        
        <div className="bg-[#0A100D] border-2 border-white/10 p-1 shadow-2xl relative [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]">
          <table className="w-full text-left text-sm font-mono border-collapse">
            <thead>
              <tr className="bg-black/50 text-gray-400 border-b-2 border-white/10">
                <th className="p-4 font-bold tracking-widest">ORDER ID</th>
                <th className="p-4 font-bold tracking-widest">TARGET</th>
                <th className="p-4 font-bold tracking-widest">OPERATOR</th>
                <th className="p-4 font-bold tracking-widest">STATUS</th>
                <th className="p-4 font-bold tracking-widest text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Data for Step 1 Layout */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-4 text-white font-bold group-hover:text-gx-neon transition-colors">#GX-8829</td>
                <td className="p-4"><span className="text-gray-500 text-xs">Epic V → </span><span className="text-gx-neon font-bold">Mythic</span></td>
                <td className="p-4 text-gray-400">Unassigned</td>
                <td className="p-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 text-xs font-bold tracking-widest">PAID_HELD</span></td>
                <td className="p-4 text-right">
                  <button className="px-4 py-2 bg-transparent border border-gx-neon text-gx-neon hover:bg-gx-neon hover:text-black font-bold uppercase text-xs [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] transition-all">ASSIGN</button>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-4 text-white font-bold group-hover:text-gx-neon transition-colors">#GX-8830</td>
                <td className="p-4"><span className="text-gray-500 text-xs">Legend II → </span><span className="text-gx-neon font-bold">Glory</span></td>
                <td className="p-4 text-blue-400">Booster-Alpha</td>
                <td className="p-4"><span className="px-2 py-1 bg-gx-neon/20 text-gx-neon border border-gx-neon/50 text-xs font-bold tracking-widest animate-pulse">IN_PROGRESS</span></td>
                <td className="p-4 text-right">
                  <button className="px-4 py-2 bg-transparent border border-white/20 text-white hover:border-white font-bold uppercase text-xs [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] transition-all">INSPECT</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}