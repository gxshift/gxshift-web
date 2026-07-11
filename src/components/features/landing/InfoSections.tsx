'use client';
import { motion } from "framer-motion";
import { ShieldAlert, Trophy, Zap, Star } from "lucide-react";

export default function InfoSections() {
  const reviews = [
    { text: "Gila cepet banget! Baru order semalem, besok sorenya udah naik dari Epic ke Legend. Dashboard trackingnya juga mempermudah banget buat pantau.", name: "Budi_Gamer", desc: "Epic to Legend Boost" },
    { text: "Sempet ragu awalnya, tapi ternyata beneran pro player yang main. Win rate hero favorit gue malah naik drastis. Recommended banget buat yang stuck di tier badak!", name: "Alex_MVP", desc: "Legend to Mythic Boost" },
    { text: "Privasi aman banget, sempet takut akun kenapa-kenapa tapi sistem vault mereka emang top tier. Next season pasti order lagi buat push Glory.", name: "Sarah_Carry", desc: "Mythic Glory Placement" }
  ];

  return (
    <>
      {/* 4. ABOUT US */}
      <section id="about" className="py-24 bg-[#06090B]">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="relative">
            <div className="absolute inset-0 bg-gx-neon/30 blur-[120px] rounded-full" />
            <div className="relative aspect-square md:aspect-[4/3] w-full bg-[#0A100D] border-2 border-gx-neon/60 shadow-[0_0_40px_rgba(204,255,0,0.15)] [clip-path:polygon(20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%)] p-2">
              <div className="w-full h-full bg-gray-900 [clip-path:polygon(20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%)] overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-tr from-gx-neon/30 to-transparent" />
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 bg-[#06090B] border-2 border-gx-neon/30 p-6 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
              <div className="w-12 h-12 bg-gx-neon rounded-full flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_#ccff00]">99%</div>
              <div>
                <div className="font-bold text-white uppercase text-sm">Win Rate</div>
                <div className="text-xs text-gx-neon drop-shadow-[0_0_2px_#ccff00]">Guaranteed Progression</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="space-y-8">
            <div>
              <span className="text-gx-neon font-mono text-sm tracking-widest drop-shadow-[0_0_5px_#ccff00]"># About Our Gaming Platform</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 leading-tight">Forging Legends In <br/> The Gaming Universe</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: ShieldAlert, title: "100% Secure Vault", desc: "Kredensial Anda dienkripsi secara end-to-end. Booster tidak pernah melihat password mentah Anda." },
                { icon: Trophy, title: "Verified Pro-Players", desc: "Kami hanya merekrut pemain dengan rank Mythical Glory ke atas dan win rate terjamin." },
                { icon: Zap, title: "Real-time Tracking", desc: "Pantau pergerakan rank dan update status secara live dari Dashboard Terminal Anda." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="shrink-0 w-16 h-16 bg-[#0A100D] border border-white/10 flex items-center justify-center [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] group-hover:border-gx-neon group-hover:bg-gx-neon/10 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all">
                    <feature.icon className="text-gx-neon drop-shadow-[0_0_5px_#ccff00]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonial" className="py-24 bg-[#0A100D] border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gx-neon/5 blur-[100px] pointer-events-none" />
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-black uppercase mb-16">PLAYER <span className="text-gx-neon drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">REVIEWS</span></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((rev, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }}
                  className="bg-[#06090B] p-8 border border-white/10 text-left [clip-path:polygon(15px_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%,0_15px)] hover:border-gx-neon/50 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)] transition-all"
                >
                  <div className="flex text-gx-neon mb-4 drop-shadow-[0_0_5px_rgba(204,255,0,0.8)]">
                    <Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/>
                  </div>
                  <p className="text-gray-300 italic mb-6 leading-relaxed">"{rev.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gx-neon/20 border border-gx-neon text-gx-neon rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{rev.name}</div>
                      <div className="text-xs text-gray-500">{rev.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>
    </>
  );
}