'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight, AlertTriangle } from 'lucide-react';
import { ML_RANKS } from '@/lib/constants'; // Pastikan file ini ada sesuai Step 1

export default function OrderFlowPage() {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({ currentRank: 'Epic V', targetRank: 'Mythic' });
  const [agreed, setAgreed] = useState(false);

  // Ambil hanya rank yang umum untuk demo
  const displayRanks = ML_RANKS.slice(15, 26); // Epic V - Mythic

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          INITIATE <span className="text-[#ccff00] drop-shadow-[0_0_8px_#ccff00]">OPERATION</span>
        </h1>
        <p className="text-gray-400 font-mono text-sm mt-1">Mobile Legends: Bang Bang Ranking Service</p>
      </div>

      {/* STEPPER HUD */}
      <div className="flex gap-4">
        {[
          { num: 1, label: 'RANK CONFIG' },
          { num: 2, label: 'SECURE VAULT' },
          { num: 3, label: 'PAYMENT' }
        ].map((s) => (
          <div key={s.num} className="flex-1">
            <div className={`h-1.5 w-full mb-2 transition-all duration-500 ${
              step >= s.num ? "bg-[#ccff00] shadow-[0_0_10px_#ccff00]" : "bg-white/10"
            }`} />
            <div className={`text-xs font-bold tracking-widest ${
              step >= s.num ? "text-[#ccff00]" : "text-gray-600"
            }`}>
              PHASE 0{s.num}: {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-[#0A100D] border-2 border-white/10 p-8 shadow-2xl relative [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)] transition-all">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            {/* CURRENT RANK SELECTOR */}
            <div>
              <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-3 text-white">
                <div className="w-1.5 h-6 bg-[#ccff00] shadow-[0_0_8px_#ccff00]" /> SELECT CURRENT RANK
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {displayRanks.map((rank) => (
                  <button 
                    key={`cur-${rank}`}
                    onClick={() => setOrderData({...orderData, currentRank: rank})}
                    className={`p-3 border text-xs font-bold transition-all [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] ${
                      orderData.currentRank === rank 
                        ? "border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-105" 
                        : "border-white/10 bg-[#030504] text-gray-500 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {rank}
                  </button>
                ))}
              </div>
            </div>

            {/* TARGET RANK SELECTOR */}
            <div>
              <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-3 text-white">
                <div className="w-1.5 h-6 bg-[#ccff00] shadow-[0_0_8px_#ccff00]" /> SELECT TARGET RANK
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {displayRanks.map((rank) => (
                  <button 
                    key={`tgt-${rank}`}
                    onClick={() => setOrderData({...orderData, targetRank: rank})}
                    className={`p-3 border text-xs font-bold transition-all [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)] ${
                      orderData.targetRank === rank 
                        ? "border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-105" 
                        : "border-white/10 bg-[#030504] text-gray-500 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {rank}
                  </button>
                ))}
              </div>
            </div>

            {/* SUMMARY & NEXT BUTTON */}
            <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-[#030504] border border-[#ccff00]/30 relative [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)]">
              <div className="mb-4 md:mb-0 w-full md:w-auto text-center md:text-left">
                <div className="text-xs text-gray-500 font-bold tracking-widest font-mono">ESTIMATION ENGINE (AI)</div>
                <div className="text-3xl font-black text-[#ccff00] mt-1 drop-shadow-[0_0_5px_rgba(204,255,0,0.5)]">
                  Rp 150.000 <span className="text-sm font-normal text-gray-400">/ ~24 Hours</span>
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full md:w-auto px-8 py-4 bg-[#ccff00] text-black font-black uppercase tracking-widest [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white hover:shadow-[0_0_25px_#ccff00] transition-all flex items-center justify-center gap-2"
              >
                PROCEED TO VAULT <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-black uppercase mb-2 flex items-center gap-3 text-white">
              <div className="w-1.5 h-6 bg-yellow-500 shadow-[0_0_8px_#eab308]" /> CREDENTIAL VAULT
            </h2>
            <div className="flex gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm font-mono [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
              <ShieldCheck className="shrink-0" />
              <p>End-to-End Encrypted. Sistem kami menggunakan algoritma WebCrypto AES-GCM. Operator tidak dapat melihat password mentah Anda.</p>
            </div>

            <form className="space-y-5 mt-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">User ID</label>
                  <input type="text" required className="w-full bg-[#030504] border border-white/20 p-3 text-white focus:border-[#ccff00] outline-none font-mono text-sm transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Server ID</label>
                  <input type="text" required className="w-full bg-[#030504] border border-white/20 p-3 text-white focus:border-[#ccff00] outline-none font-mono text-sm transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Moonton Email / Login ID</label>
                <input type="text" required className="w-full bg-[#030504] border border-white/20 p-3 text-white focus:border-[#ccff00] outline-none font-mono text-sm transition-all" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-yellow-500 uppercase tracking-widest flex justify-between">
                  <span>Passcode</span>
                  <span className="text-[10px] animate-pulse">ENCRYPTION ACTIVE</span>
                </label>
                <input type="password" required className="w-full bg-[#030504] border border-yellow-500/50 p-3 text-white focus:border-yellow-500 focus:shadow-[inset_0_0_15px_rgba(234,179,8,0.1)] outline-none font-mono text-sm transition-all" placeholder="••••••••" />
              </div>

              <div className="flex items-start gap-3 mt-8 p-4 border border-white/10 bg-[#030504]">
                <input type="checkbox" id="tos" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 accent-[#ccff00]" />
                <label htmlFor="tos" className="text-sm text-gray-400">
                  Saya setuju dengan <span className="text-[#ccff00] underline cursor-pointer">T&C</span>. Saya berjanji tidak akan melakukan login paksa (menabrak akun) selama operasi berlangsung untuk menghindari sanksi sistem.
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)} className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white/5 transition-all">
                  ABORT
                </button>
                <button type="submit" className="flex-1 bg-[#ccff00] text-black font-black uppercase tracking-widest [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white hover:shadow-[0_0_25px_#ccff00] transition-all flex items-center justify-center gap-2">
                  ENCRYPT & PAY <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-20 h-20 mx-auto border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#ccff00]" />
            <h2 className="text-2xl font-black uppercase text-[#ccff00] mt-8 tracking-widest">CONNECTING TO XENDIT...</h2>
            <p className="text-gray-400 mt-2 font-mono">Generating secure payment gateway link</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}