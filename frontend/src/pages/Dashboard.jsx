import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loading from '../components/Loading';
import StatCard from '../components/StatCard';
import { api } from '../services/api';
import { money } from '../utils/format';

export default function Dashboard() {
  const [sectors, setSectors] = useState([]); const [perf, setPerf] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([api.get('/analytics/sectors'), api.get('/analytics/performers')]).then(([s, p]) => { setSectors(s.data); setPerf(p.data); }).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading />;
  return <section className="space-y-6"><div><p className="text-accent">Market Dashboard</p><h2 className="text-4xl font-black">Portfolio-grade analytics overview</h2></div>
    <div className="grid gap-4 md:grid-cols-3"><StatCard label="Sectors tracked" value={sectors.length} /><StatCard label="Top performer" value={perf?.best?.[0]?.symbol || 'Upload data'} tone="text-gain" /><StatCard label="Worst performer" value={perf?.worst?.[0]?.symbol || 'Upload data'} tone="text-loss" /></div>
    <div className="card"><h3 className="mb-4 text-xl font-bold">Sector average close</h3><ResponsiveContainer width="100%" height={360}><BarChart data={sectors}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)"/><XAxis dataKey="sector" stroke="#94a3b8"/><YAxis stroke="#94a3b8"/><Tooltip contentStyle={{ background: '#0d1b2e', border: '1px solid rgba(255,255,255,.12)' }}/><Bar dataKey="avg_close" fill="#38bdf8" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer></div>
    <div className="grid gap-4 md:grid-cols-2"><div className="card"><h3 className="font-bold">Best performers</h3>{perf?.best?.map(x => <p key={x.symbol} className="flex justify-between border-b border-white/5 py-2"><span>{x.symbol}</span><span className="text-gain">{x.performance_pct}%</span></p>)}</div><div className="card"><h3 className="font-bold">Worst performers</h3>{perf?.worst?.map(x => <p key={x.symbol} className="flex justify-between border-b border-white/5 py-2"><span>{x.symbol}</span><span className="text-loss">{x.performance_pct}%</span></p>)}</div></div>
  </section>;
}
