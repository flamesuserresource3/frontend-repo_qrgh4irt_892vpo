import { useEffect, useMemo, useState } from 'react';
import { Plus, CheckCircle, Trash2, List } from 'lucide-react';

export default function SharedTodoList() {
  const [text, setText] = useState('');
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('ldc_shared_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('ldc_shared_todos', JSON.stringify(items));
  }, [items]);

  const add = () => {
    if (!text.trim()) return;
    setItems([{ id: crypto.randomUUID(), text: text.trim(), done: false, createdAt: Date.now() }, ...items]);
    setText('');
  };

  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id) => setItems(items.filter(i => i.id !== id));

  const shown = useMemo(() => {
    if (filter === 'active') return items.filter(i => !i.done);
    if (filter === 'done') return items.filter(i => i.done);
    return items;
  }, [items, filter]);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <List className="h-5 w-5 text-pink-500" />
        <h2 className="text-lg font-semibold tracking-tight">Shared To‑Do for Our Day</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Plan an activity..."
          className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500/50 placeholder-white/60"
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button onClick={add} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <span className={`px-2 py-1 rounded-full border ${filter === 'all' ? 'bg-white/15' : 'bg-transparent'} border-white/10 cursor-pointer`} onClick={() => setFilter('all')}>All</span>
        <span className={`px-2 py-1 rounded-full border ${filter === 'active' ? 'bg-white/15' : 'bg-transparent'} border-white/10 cursor-pointer`} onClick={() => setFilter('active')}>Active</span>
        <span className={`px-2 py-1 rounded-full border ${filter === 'done' ? 'bg-white/15' : 'bg-transparent'} border-white/10 cursor-pointer`} onClick={() => setFilter('done')}>Done</span>
        <div className="ml-auto text-white/70">{items.filter(i => !i.done).length} left</div>
      </div>

      <ul className="space-y-2 max-h-72 overflow-auto pr-1">
        {shown.length === 0 && (
          <li className="text-sm text-white/70">Nothing here yet — add your first plan!</li>
        )}
        {shown.map((i) => (
          <li key={i.id} className="group flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3">
            <button onClick={() => toggle(i.id)} className={`h-6 w-6 rounded-full border flex items-center justify-center ${i.done ? 'bg-green-500/20 border-green-400/50' : 'border-white/20 hover:border-white/40'}`}>
              {i.done && <CheckCircle className="h-4 w-4 text-green-400" />}
            </button>
            <span className={`flex-1 text-sm ${i.done ? 'line-through text-white/60' : ''}`}>{i.text}</span>
            <button onClick={() => remove(i.id)} className="opacity-70 hover:opacity-100">
              <Trash2 className="h-4 w-4 text-white/70" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
