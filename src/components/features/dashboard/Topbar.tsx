'use client';
import { useEffect, useState } from 'react';
import { Bell, Activity } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Topbar() {
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Ambil profil lengkap dari tabel profiles
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
    }
    fetchUser();
  }, []);

  // Fungsi untuk mengambil inisial (misal: "Yohanes Vianey" -> "YV")
  const getInitials = (name: string) => {
    if (!name) return 'OP';
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-24 border-b-2 border-white/5 bg-[#06090B]/80 backdrop-blur-md flex items-center justify-between px-8 z-20 shrink-0">
      <div className="flex items-center gap-3">
        <Activity className="text-gx-neon animate-pulse drop-shadow-[0_0_5px_#ccff00]" size={20} />
        <div className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">
          SYSTEM <span className="text-gx-neon">ONLINE</span> // STATUS: OPTIMAL
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-gx-neon transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gx-neon rounded-full shadow-[0_0_8px_#ccff00] animate-pulse" />
        </button>
        
        <div className="flex items-center gap-4 border-l-2 border-white/10 pl-6">
          <div className="text-right">
            <div className="text-sm font-black text-white uppercase tracking-widest">
              {profile?.full_name || 'Loading...'}
            </div>
            <div className={`text-xs font-bold drop-shadow-[0_0_5px_currentColor] ${
              profile?.role === 'ADMIN' ? 'text-red-500' : 
              profile?.role === 'GAMERS' ? 'text-blue-400' : 'text-gx-neon'
            }`}>
              CLEARANCE: {profile?.role || 'SYSTEM'}
            </div>
          </div>
          <div className={`w-12 h-12 bg-[#0A100D] border-2 flex items-center justify-center [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] ${
              profile?.role === 'ADMIN' ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 
              profile?.role === 'GAMERS' ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.2)]' : 'border-gx-neon shadow-[0_0_15px_rgba(204,255,0,0.2)]'
            }`}>
            <span className={`font-black ${
              profile?.role === 'ADMIN' ? 'text-red-500' : 
              profile?.role === 'GAMERS' ? 'text-blue-400' : 'text-gx-neon'
            }`}>
              {getInitials(profile?.full_name)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}