'use client';
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    { rank: "EPIC TO LEGEND", price: "Rp 150K", time: "1-2 Days", popular: false },
    { rank: "LEGEND TO MYTHIC", price: "Rp 250K", time: "2-3 Days", popular: true },
    { rank: "MYTHIC GLORY", price: "Custom", time: "Dynamic", popular: false }
  ];

  return (
    <section id="services" className="py-24 relative bg-[#0A100D] overflow-hidden">
      {/* Background ambient neon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ccff00]/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="text-[#ccff00] font-mono text-sm tracking-widest drop-shadow-[0_0_5px_#ccff00]"># Operations Catalog</span>
        <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 mb-16 text-white">CHOOSE YOUR <span className="text-[#ccff00] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">BOOST</span></h2>
        
        {/* MOBILE LEGENDS BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto mb-16 relative group"
        >
           <div className="absolute inset-0 bg-[#ccff00]/30 blur-2xl group-hover:bg-[#ccff00]/60 transition-all duration-500" />
           <div className="relative bg-[#06090B] border-2 border-[#ccff00] p-2 [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)]">
             <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070" alt="Mobile Legends" className="w-full h-[250px] md:h-[350px] object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
             <div className="absolute bottom-6 left-8 text-left">
                <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(0,0,0,1)] uppercase">Mobile Legends: Bang Bang</h3>
                <div className="text-black bg-[#ccff00] font-bold mt-2 tracking-widest inline-block px-4 py-1 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] drop-shadow-[0_0_5px_#ccff00]">OFFICIAL RANKING SERVICES</div>
             </div>
           </div>
        </motion.div>

        {/* PRODUCTS GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((srv, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative bg-[#06090B] border-2 ${srv.popular ? 'border-[#ccff00] shadow-[0_0_30px_rgba(204,255,0,0.2)]' : 'border-[#ccff00]/50 hover:border-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]'} p-8 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] group transition-all duration-300 text-left flex flex-col`}
            >
              {srv.popular && <div className="absolute top-0 right-0 bg-[#ccff00] text-black text-xs font-black px-5 py-2 [clip-path:polygon(0_0,100%_0,100%_100%,15px_100%)] shadow-[0_0_15px_#ccff00]">MOST POPULAR</div>}
              
              {/* Judul Rank selalu warna Hijau Neon */}
              <h3 className="text-2xl font-black uppercase mb-6 mt-4 text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]">{srv.rank}</h3>
              
              <div className="flex-1 space-y-4 mb-8">
                <div className="flex justify-between border-b border-[#ccff00]/30 pb-3"><span className="text-sm text-gray-300">Estimasi Waktu</span><span className="font-bold text-white">{srv.time}</span></div>
                <div className="flex justify-between border-b border-[#ccff00]/30 pb-3"><span className="text-sm text-gray-300">Starting Price</span><span className="font-black text-xl text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.4)]">{srv.price}</span></div>
              </div>
              
              {/* TOMBOL SELALU SOLID NEON AGAR TIDAK HITAM */}
              <button className="w-full py-4 font-black uppercase tracking-widest [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] bg-[#ccff00] text-black hover:bg-white hover:shadow-[0_0_30px_#ccff00] transition-all duration-300">
                SELECT PACKAGE
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}