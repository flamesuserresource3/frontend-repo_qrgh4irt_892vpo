import Spline from '@splinetool/react-spline';
import CountdownTimer from './components/CountdownTimer';
import MessageOfTheDay from './components/MessageOfTheDay';
import ThoughtPing from './components/ThoughtPing';
import SharedTodoList from './components/SharedTodoList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero with Spline */}
      <div className="relative">
        <div className="h-[420px] w-full">
          <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Soft gradient overlays that don't block interaction */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-48 w-48 bg-pink-500/20 blur-3xl rounded-full" />
          <div className="absolute right-0 bottom-0 h-56 w-56 bg-purple-500/20 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/20 to-slate-950/60" />
        </div>
        <header className="absolute inset-x-0 bottom-6 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight drop-shadow-md">Together, From Afar</h1>
            <p className="text-white/80 mt-2 max-w-2xl drop-shadow">Count down to your next meet, send sweet notes, ping a heart, and plan your day together.</p>
          </div>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CountdownTimer />
          <ThoughtPing />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MessageOfTheDay />
          <SharedTodoList />
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 pb-10 text-xs text-white/60">
        Built with love for long-distance hearts.
      </footer>
    </div>
  );
}
