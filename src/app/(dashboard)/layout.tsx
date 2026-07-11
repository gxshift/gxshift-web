import Sidebar from '@/components/features/dashboard/Sidebar';
import Topbar from '@/components/features/dashboard/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#06090B] text-white font-sans overflow-hidden">
      {/* Kiri: Sidebar */}
      <Sidebar />

      {/* Kanan: Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Atas: Topbar */}
        <Topbar />

        {/* Bawah: Dynamic Page Content (Canvas) */}
        <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
          {/* Ambient Glow di pojok kanan atas Dashboard */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gx-neon/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}