'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, History, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: 'COMMAND CENTER', path: '/user', icon: LayoutDashboard },
    { name: 'NEW DIRECTIVE', path: '/user/order', icon: Target },
    { name: 'OPERATION LOG', path: '/user/history', icon: History },
  ];

  return (
    <aside className="w-72 bg-[#030504] border-r-2 border-white/5 flex flex-col relative z-20 shrink-0">
      {/* Branding */}
      <div className="h-24 flex items-center px-8 border-b-2 border-white/5">
        <div className="flex items-center italic font-black text-2xl tracking-tighter transform -skew-x-12">
          <span className="text-white">GX</span>
          <span className="text-gx-neon drop-shadow-[0_0_8px_#ccff00]">SHIFT</span>
        </div>
      </div>
      
      {/* Menu Links */}
      <div className="px-6 py-4 text-xs font-bold text-gx-neon/50 tracking-widest mt-4">USER TERMINAL</div>
      <nav className="flex-1 px-4 space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="relative block group">
              {isActive && (
                <motion.div layoutId="activeNav" className="absolute inset-0 bg-gx-neon/10 border-l-4 border-gx-neon [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] shadow-[inset_10px_0_20px_rgba(204,255,0,0.1)]" />
              )}
              <div className={`relative flex items-center gap-3 px-4 py-4 text-sm font-black tracking-widest transition-colors z-10 ${isActive ? "text-gx-neon drop-shadow-[0_0_5px_#ccff00]" : "text-gray-500 group-hover:text-white"}`}>
                <item.icon size={18} /> {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t-2 border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-black tracking-widest text-red-500 hover:bg-red-500/10 hover:shadow-[inset_0_0_15px_rgba(239,68,68,0.2)] [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] transition-all">
          <LogOut size={18} /> TERMINATE
        </button>
      </div>
    </aside>
  );
}