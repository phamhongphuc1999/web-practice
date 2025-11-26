import { Activity, ShieldCheck } from 'lucide-react';
import CarouselItem from './CarouselItem';

export default function CryptoSlice() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#050505] text-white">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-800 bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-green-600">
              <ShieldCheck className="text-black" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              SECURE<span className="text-green-500">FLOW</span>
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span>SYSTEM: ONLINE</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Activity size={14} />
              <span>TRAFFIC: NORMAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex grow flex-col items-center justify-center pt-16">
        <div className="absolute top-32 z-10 space-y-2 px-4 text-center">
          <h1 className="bg-linear-to-b from-white to-gray-500 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Real-time Data Encryption
          </h1>
          <p className="mx-auto max-w-xl text-gray-400">
            Visualizing the secure passage of sensitive entities through our quantum encryption
            gateway.
          </p>
        </div>

        <div className="my-auto w-full py-12">
          <CarouselItem />
        </div>

        {/* Footer/Legend */}
        <div className="flex gap-8 pb-12 font-mono text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-gray-600 bg-gray-900"></div>
            <span>PLAINTEXT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-green-500/50 bg-black shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
            <span>ENCRYPTED</span>
          </div>
        </div>
      </main>
    </div>
  );
}
