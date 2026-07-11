export default function AdminOrdersPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-black uppercase text-[#ccff00] tracking-widest mb-4">
          ADMIN OPERATION LOGS
        </h1>
        <div className="bg-[#0A100D] border border-white/10 p-6 text-gray-400 font-mono">
          <p>Awaiting database connection for order logs...</p>
        </div>
      </div>
    );
  }