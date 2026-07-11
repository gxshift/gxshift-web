'use client';
import { useEffect, useState } from "react";
import BlastDoorOverlay from "@/components/features/landing/BlastDoorOverlay";
import LandingNavbar from "@/components/features/landing/LandingNavbar";
import HeroSection from "@/components/features/landing/HeroSection";
import ServicesSection from "@/components/features/landing/ServicesSection";
import InfoSections from "@/components/features/landing/InfoSections";
import FooterSection from "@/components/features/landing/FooterSection";

export default function EsportsLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false); // Trigger pintu terbuka

  useEffect(() => {
    setMounted(true);
    // Loading 2.5 detik sebelum blast door terbuka
    const timer = setTimeout(() => setIsReady(true), 2500); 
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#06090B] text-white selection:bg-gx-neon selection:text-black font-sans overflow-x-hidden relative">
      {/* 1. Sci-Fi Loading Overlay */}
      <BlastDoorOverlay isReady={isReady} />

      {/* Konten utama disembunyikan / dibuat hitam pekat sampai pintu mulai terbuka */}
      <div 
        className="w-full h-full transition-opacity duration-1000"
        style={{ opacity: isReady ? 1 : 0 }} 
      >
        <LandingNavbar />
        
        <main>
          {/* Hero Section dengan props isReady untuk trigger animasi beruntun */}
          <HeroSection isReady={isReady} />
          
          <ServicesSection />
          <InfoSections />
          <FooterSection />
        </main>
      </div>
    </div>
  );
}