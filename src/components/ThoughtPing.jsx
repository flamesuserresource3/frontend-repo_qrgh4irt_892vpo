import { useEffect, useState } from 'react';
import { Heart, Bell } from 'lucide-react';

export default function ThoughtPing() {
  const [permission, setPermission] = useState(Notification?.permission ?? 'default');
  const [lastPing, setLastPing] = useState(() => {
    const saved = localStorage.getItem('ldc_last_ping');
    return saved ? new Date(saved).toISOString() : '';
  });
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    setPermission(Notification?.permission ?? 'default');
  }, []);

  const requestPermission = async () => {
    try {
      const p = await Notification.requestPermission();
      setPermission(p);
    } catch (_) {
      // ignore
    }
  };

  const ping = () => {
    const ts = new Date();
    setLastPing(ts.toISOString());
    localStorage.setItem('ldc_last_ping', ts.toISOString());
    setBurst(true);
    setTimeout(() => setBurst(false), 600);

    if (permission === 'granted') {
      new Notification("Thinking of you ❤️", {
        body: `Just a little ping at ${ts.toLocaleTimeString()}`,
        icon: undefined,
      });
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg relative overflow-hidden">
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${burst ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
      </div>

      <div className="flex items-center gap-3 mb-4 relative">
        <Heart className="h-5 w-5 text-pink-500" />
        <h2 className="text-lg font-semibold tracking-tight">Send a Heart Ping</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {permission !== 'granted' && (
          <button
            onClick={requestPermission}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10"
          >
            <Bell className="h-4 w-4" /> Enable notifications
          </button>
        )}

        <button
          onClick={ping}
          className="sm:ml-auto inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow hover:opacity-90"
        >
          <Heart className="h-4 w-4" /> I'm thinking of you
        </button>
      </div>

      <div className="mt-3 text-xs text-white/70">
        {lastPing ? `Last ping: ${new Date(lastPing).toLocaleString()}` : 'No pings yet.'}
      </div>
    </div>
  );
}
