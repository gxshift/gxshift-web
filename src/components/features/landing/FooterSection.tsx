'use client';
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function FooterSection() {
  const WA_NUMBER = "6285815999953"; // Menggunakan kode negara 62

  return (
    <footer id="contact" className="bg-[#06090B] border-t border-gx-neon/50 pt-16 pb-8 relative overflow-hidden shadow-[0_-10px_50px_rgba(204,255,0,0.1)]">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gx-neon/10 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mb-16 relative z-10">
        
        {/* Left Side: Call to Action */}
        <div>
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            READY TO <br/><span className="text-gx-neon drop-shadow-[0_0_20px_rgba(204,255,0,0.4)]">LEVEL UP?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Jangan biarkan toxic player menahan potensimu. Pesan sekarang dan rasakan pengalaman gaming di tier tertinggi.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/user/order" 
              className="bg-gx-neon text-black font-black uppercase px-8 py-3 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white hover:shadow-[0_0_20px_#ccff00] transition-all"
            >
              ORDER NOW
            </Link>
            {/* WHATSAPP LINK UPDATED */}
            <a 
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gx-neon text-gx-neon font-bold uppercase px-8 py-3 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] flex items-center gap-2 hover:bg-gx-neon hover:text-black hover:shadow-[0_0_20px_#ccff00] transition-all"
            >
              <MessageSquare size={18}/> 0858-1599-9953
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#0A100D] p-8 border border-white/10 [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] shadow-[0_0_40px_rgba(204,255,0,0.05)]">
          <h3 className="font-bold uppercase text-lg mb-6 border-b border-white/10 pb-4 text-gx-neon">
            Contact Gateway
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-[#06090B] border border-white/10 p-4 text-white focus:border-gx-neon focus:shadow-[0_0_10px_rgba(204,255,0,0.2)] outline-none font-mono text-sm transition-all" 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-[#06090B] border border-white/10 p-4 text-white focus:border-gx-neon focus:shadow-[0_0_10px_rgba(204,255,0,0.2)] outline-none font-mono text-sm transition-all" 
            />
            <textarea 
              placeholder="Message" 
              rows={3} 
              className="w-full bg-[#06090B] border border-white/10 p-4 text-white focus:border-gx-neon focus:shadow-[0_0_10px_rgba(204,255,0,0.2)] outline-none font-mono text-sm resize-none transition-all" 
            />
            <button className="w-full bg-white text-black font-black uppercase py-4 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-gx-neon hover:shadow-[0_0_20px_#ccff00] transition-all">
              SEND TRANSMISSION
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer Bottom Links */}
      <div className="container mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 relative z-10">
        <p>GXSHIFT © {new Date().getFullYear()}. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-gx-neon hover:drop-shadow-[0_0_5px_#ccff00] transition-all">TERMS</Link>
          <Link href="/privacy" className="hover:text-gx-neon hover:drop-shadow-[0_0_5px_#ccff00] transition-all">PRIVACY</Link>
          <Link href="/refund" className="hover:text-gx-neon hover:drop-shadow-[0_0_5px_#ccff00] transition-all">REFUND POLICY</Link>
        </div>
      </div>
    </footer>
  );
}