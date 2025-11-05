import { useEffect, useState } from 'react';
import { Send, MessageSquareHeart } from 'lucide-react';

export default function MessageOfTheDay() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ldc_motd_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ldc_motd_history', JSON.stringify(history.slice(0, 20)));
  }, [history]);

  const send = () => {
    if (!message.trim()) return;
    const entry = { id: crypto.randomUUID(), text: message.trim(), at: new Date().toISOString() };
    setHistory([entry, ...history].slice(0, 20));
    setMessage('');
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquareHeart className="h-5 w-5 text-pink-500" />
        <h2 className="text-lg font-semibold tracking-tight">Message of the Day</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write something sweet..."
          className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500/50 placeholder-white/60"
        />
        <button
          onClick={send}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow hover:opacity-90"
        >
          <Send className="h-4 w-4" /> Send
        </button>
      </div>

      <div className="space-y-3 max-h-60 overflow-auto pr-1">
        {history.length === 0 && (
          <p className="text-sm text-white/70">No messages yet. Send the first one!</p>
        )}
        {history.map((item) => (
          <div key={item.id} className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-sm leading-relaxed">{item.text}</div>
            <div className="text-xs text-white/60 mt-1">
              {new Date(item.at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
