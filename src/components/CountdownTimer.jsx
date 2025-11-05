import { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

function formatTime(ms) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const totalSeconds = Math.floor(ms / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { d, h, m, s };
}

export default function CountdownTimer() {
  const [target, setTarget] = useState(() => {
    const saved = localStorage.getItem('ldc_target_datetime');
    return saved ? saved : '';
  });
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (target) localStorage.setItem('ldc_target_datetime', target);
  }, [target]);

  const remaining = useMemo(() => {
    const ts = target ? new Date(target).getTime() : 0;
    return formatTime(ts - now);
  }, [target, now]);

  const eventDateLabel = target ? new Date(target).toLocaleString() : 'Not set yet';

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-5 w-5 text-pink-500" />
        <h2 className="text-lg font-semibold tracking-tight">Next Meet Countdown</h2>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Days', value: remaining.d },
          { label: 'Hours', value: remaining.h },
          { label: 'Minutes', value: remaining.m },
          { label: 'Seconds', value: remaining.s },
        ].map((b) => (
          <div key={b.label} className="rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white tabular-nums">{String(b.value).padStart(2, '0')}</div>
            <div className="text-xs text-white/70">{b.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Clock className="h-4 w-4 text-purple-400" />
          <span>Target: {eventDateLabel}</span>
        </div>
        <div className="sm:ml-auto flex gap-2">
          <input
            type="datetime-local"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full sm:w-auto rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500/50"
          />
          <button
            onClick={() => setTarget('')}
            className="rounded-lg px-3 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
