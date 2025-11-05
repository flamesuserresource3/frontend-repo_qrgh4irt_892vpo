import CountdownTimer from './components/CountdownTimer';
import MessageOfTheDay from './components/MessageOfTheDay';
import ThoughtPing from './components/ThoughtPing';
import SharedTodoList from './components/SharedTodoList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Together, From Afar</h1>
            <p className="text-white/70 mt-2">Count down to your next meet, send sweet notes, ping a heart, and plan your day together.</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16 space-y-6">
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
