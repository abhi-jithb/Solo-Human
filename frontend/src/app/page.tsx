import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/bg-grid.svg')] bg-cover relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <h1 className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Solo Human
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-full glass hover:bg-white/10 transition text-sm font-bold">Login</button>
          <button className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition text-sm font-bold shadow-lg shadow-purple-500/30">Join the Tribe</button>
        </div>
      </nav>

      <main className="z-10 text-center max-w-4xl px-4 mt-10">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-xs font-bold tracking-widest uppercase">
          Beta Live Now
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-tight">
          WHY COUPLES<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 text-glow">
            HAVE ALL THE FUN?
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
          Turn solo living into a <span className="text-white font-semibold">high-energy adventure</span>.
          Connect with the map, conquer quests, and find your people.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="group relative px-8 py-4 bg-white text-black text-lg font-black uppercase tracking-wider rounded-full hover:scale-105 transition btn-glow flex items-center gap-3">
            Start A Quest
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button className="px-8 py-4 glass text-white text-lg font-bold rounded-full hover:bg-white/10 transition backdrop-blur-md flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Broadcast Signal
          </button>
        </div>
      </main>

      {/* Floating UI Elements Mockup */}
      <div className="absolute bottom-10 right-10 hidden md:block">
        <div className="glass p-4 rounded-xl flex items-center gap-4 animate-bounce-slow">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600"></div>
          <div>
            <p className="text-sm font-bold">Alex just completed</p>
            <p className="text-xs text-blue-300">Quest: Neon Night Walk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
