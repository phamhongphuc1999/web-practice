import { SparklesCore } from 'src/components/aceternity/Sparkles';

export default function SparklesView() {
  return (
    <div className="relative flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-6xl">
        Build great products
      </h1>
    </div>
  );
}
