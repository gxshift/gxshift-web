'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldAlert, Terminal, ChevronLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function GamingLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Logika Email biasa (Opsional, tapi sudah disiapkan)
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else window.location.href = '/user'; // Redirect ke dashboard user
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Registrasi berhasil! Silakan cek email / langsung login.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030504] text-white flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.1)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccff000a_1px,transparent_1px),linear-gradient(to_bottom,#ccff000a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-gx-neon font-bold flex items-center gap-2 hover:text-white transition-colors z-20">
        <ChevronLeft size={20} /> ABORT / BACK TO HOME
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="absolute inset-0 bg-gx-neon/20 blur-2xl rounded-full" />
        
        <div className="relative bg-[#06090B] border-2 border-gx-neon [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)] p-8 shadow-[0_0_50px_rgba(204,255,0,0.15)]">
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#0A100D] border-2 border-gx-neon text-gx-neon flex items-center justify-center [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] shadow-[0_0_15px_rgba(204,255,0,0.3)]">
              <Terminal size={28} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase text-gx-neon drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]">
              {isLogin ? 'ACCESS TERMINAL' : 'INITIALIZE PROTOCOL'}
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-mono">
              Authentication Gateway Level 1
            </p>
          </div>

          {/* GOOGLE OAUTH BUTTON - GAMING STYLE */}
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className="w-full mb-6 bg-[#0A100D] border-2 border-gx-neon text-gx-neon font-black uppercase tracking-widest py-3 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-gx-neon hover:text-black hover:shadow-[0_0_25px_#ccff00] transition-all flex justify-center items-center gap-3 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            AUTHORIZE WITH GOOGLE
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gx-neon/20 flex-1" />
            <span className="text-xs font-mono text-gray-500">OR DIRECT OVERRIDE</span>
            <div className="h-px bg-gx-neon/20 flex-1" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A100D] border border-gx-neon/30 p-3 text-white focus:border-gx-neon focus:shadow-[inset_0_0_15px_rgba(204,255,0,0.1)] outline-none font-mono text-sm transition-all" 
              placeholder="Email Address"
            />
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A100D] border border-gx-neon/30 p-3 text-white focus:border-gx-neon focus:shadow-[inset_0_0_15px_rgba(204,255,0,0.1)] outline-none font-mono text-sm transition-all" 
              placeholder="Passcode"
            />
            <button 
              type="submit" disabled={loading}
              className="w-full bg-gx-neon text-black font-black uppercase tracking-widest py-3 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)] hover:bg-white hover:shadow-[0_0_25px_#ccff00] transition-all mt-4"
            >
              {loading ? 'PROCESSING...' : (isLogin ? 'EXECUTE LOGIN' : 'CREATE PROFILE')}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gx-neon/20 text-center">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm font-mono text-gray-400 hover:text-gx-neon transition-colors">
              {isLogin ? "> Request new clearance (Sign Up)" : "> Already have clearance? (Sign In)"}
            </button>
          </div>
          
          <div className="mt-6 bg-[#030504] border border-white/5 p-3 flex items-start gap-3 text-xs text-gray-500 font-mono">
            <ShieldAlert size={14} className="text-gx-neon shrink-0 mt-0.5" />
            <p>Koneksi diamankan. Data terenkripsi.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}