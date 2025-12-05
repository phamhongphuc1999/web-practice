import CarouselItem from './CarouselItem';

export default function CryptoSlice() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#050505] text-white">
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
