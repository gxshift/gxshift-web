'use client';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Activity, Target, Clock, ShieldCheck, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from '@/lib/supabase/client';

export default function UserDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Ambil data profil
        const { data: profData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(profData);

        // Ambil 1 order terakhir yang statusnya belum COMPLETED/CANCELLED
        const { data: orderData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .not('status', 'in', '("COMPLETED", "CANCELLED")')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        setActiveOrder(orderData || null);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center text-[#ccff00] font-mono animate-pulse">SYNCING DATA...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 1. WELCOME BANNER */}
      <div className="bg-[#0A100D] border-2 border-[#ccff00]/30 p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] group hover:border-[#ccff00] transition-colors duration-500 shadow-[0_0_30px_rgba(204,255,0,0.05)]">
        <div className="absolute top-0 left-0 w-3 h-full bg-[#ccff00] shadow-[0_0_20px_#ccff00]" />
        <div className="pl-6 relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">
            Welcome Back, <span className="text-[#ccff00] drop-shadow-[0_0_8px_#ccff00]">{profile?.full_name?.split(' ')[0] || 'Operator'}</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">Monitor active operations or initiate new directives.</p>
        </div>
        <Link href="/user/order" className="relative z-10 bg-[#ccff00] text-black font-black uppercase tracking-widest px-8 py-4 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white hover:shadow-[0_0_25px_#ccff00] transition-all flex items-center gap-2 shrink-0">
          NEW OPERATION <ChevronRight size={18} />
        </Link>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "ACTIVE OPS", val: activeOrder ? "1" : "0", icon: Activity },
          { label: "COMPLETED", val: "0", icon: ShieldCheck },
          { label: "TOTAL SPENT", val: "Rp 0", icon: Target },
          { label: "SYSTEM STATUS", val: "OPTIMAL", icon: Clock },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#030504] border border-white/10 p-5 flex items-center gap-4 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:border-[#ccff00]/50 transition-colors"
          >
            <div className="p-3 bg-[#ccff00]/10 border border-[#ccff00] text-[#ccff00] [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] shadow-[0_0_10px_rgba(204,255,0,0.1)]">
              <s.icon size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-bold tracking-widest uppercase">{s.label}</div>
              <div className="text-xl font-black mt-1 text-white">{s.val}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. ACTIVE ORDER TRACKER OR EMPTY STATE */}
      <div>
        <h2 className="text-lg font-black tracking-widest text-[#ccff00] mb-4 flex items-center gap-2 drop-shadow-[0_0_5px_#ccff00]">
          <div className="w-2 h-6 bg-[#ccff00]" /> CURRENT DIRECTIVE
        </h2>
        
        {activeOrder ? (
          <div className="bg-[#0A100D] border-2 border-[#ccff00] p-8 shadow-[0_0_30px_rgba(204,255,0,0.1)] relative [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)]">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(204,255,0,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-white uppercase">Mobile Legends Boost</h3>
                <p className="text-sm text-gray-400 mt-1 font-mono">Order ID: #{activeOrder.id.split('-')[0]} | ETA: Calculating...</p>
              </div>
              <div className="px-4 py-1.5 bg-[#ccff00] text-black font-black text-sm uppercase tracking-widest [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] shadow-[0_0_15px_#ccff00] animate-pulse">
                {activeOrder.status}
              </div>
            </div>

            <div className="relative pt-8 pb-4 z-10">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-[#06090B] -translate-y-1/2 border-y border-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-[#ccff00] shadow-[0_0_15px_#ccff00] relative">
                  <div className="absolute -right-2 -top-1.5 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff]" />
                </motion.div>
              </div>
              <div className="relative flex justify-between">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#06090B] border-2 border-[#ccff00] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(204,255,0,0.4)] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                    <span className="font-black text-[#ccff00]">C</span>
                  </div>
                  <span className="text-xs font-black text-[#ccff00] tracking-widest uppercase">{activeOrder.current_rank}</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#06090B] border-2 border-white/20 flex items-center justify-center z-10 text-gray-500 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                    <span className="font-black">T</span>
                  </div>
                  <span className="text-xs font-black text-gray-500 tracking-widest uppercase">{activeOrder.target_rank}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#030504] border-2 border-dashed border-white/20 p-12 flex flex-col items-center justify-center text-center [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)]">
            <AlertCircle className="text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-400 mb-2 font-mono uppercase tracking-widest">AWAITING DIRECTIVES</h3>
            <p className="text-gray-500 mb-6 max-w-sm">Anda belum memiliki operasi aktif saat ini. Inisiasi pesanan untuk memulai tracking.</p>
            <Link href="/user/order" className="border border-[#ccff00] text-[#ccff00] font-bold uppercase px-6 py-2 hover:bg-[#ccff00] hover:text-black hover:shadow-[0_0_15px_#ccff00] transition-all [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
              INITIALIZE NOW
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}