import { Bot, ChartCandlestick, FileText, LayoutDashboard, Newspaper } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Chat Assistant', icon: Bot },
  { to: '/dashboard', label: 'Market Dashboard', icon: LayoutDashboard },
  { to: '/analytics', label: 'Stock Analytics', icon: ChartCandlestick },
  { to: '/reports', label: 'Financial Reports', icon: FileText },
  { to: '/news', label: 'News & Sentiment', icon: Newspaper },
];

export default function Sidebar() {
  return <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/10 bg-ink/95 p-6 lg:block">
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[.35em] text-accent">SMRA</p>
      <h1 className="mt-2 text-2xl font-black">Stock Market Research Assistant</h1>
    </div>
    <nav className="space-y-2">
      {links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${isActive ? 'bg-accent text-ink' : 'text-slate-300 hover:bg-white/10'}`}>
        <Icon size={20} /> {label}
      </NavLink>)}
    </nav>
    <p className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/5 p-3 text-xs text-slate-400">Educational research only. This is not financial advice.</p>
  </aside>;
}
