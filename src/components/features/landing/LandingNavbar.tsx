'use client';
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#06090B]/90 backdrop-blur-xl border-b border-[#ccff00]/30 shadow-[0_4px_30px_rgba(204,255,0,0.05)] transition-all">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 group">
          <div className="flex items-center italic font-black text-3xl tracking-tighter transform -skew-x-12 relative">
            <div className="absolute inset-0 bg-[#ccff00] blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity" />
            <span className="text-white transition-colors relative z-10">GX</span>
            <span className="text-[#ccff00] relative z-10 drop-shadow-[0_0_10px_#ccff00]">SHIFT</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
          {['Home', 'Services', 'About', 'Testimonial', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#ccff00] hover:drop-shadow-[0_0_8px_#ccff00] transition-all duration-300">
              {item}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm font-bold hover:text-[#ccff00] transition-colors">CLIENT LOGIN</Link>
          <Link href="/user/order" className="relative group">
            <div className="absolute inset-0 bg-[#ccff00] translate-y-1 translate-x-1 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] transition-transform group-hover:translate-y-0 group-hover:translate-x-0 shadow-[0_0_15px_#ccff00]" />
            <div className="relative bg-[#06090B] border border-[#ccff00] text-[#ccff00] font-bold px-6 py-2.5 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] flex items-center gap-2 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
              <Gamepad2 size={18} /> ORDER NOW
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}