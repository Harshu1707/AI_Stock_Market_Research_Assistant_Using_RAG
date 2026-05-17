import { useState } from 'react';
import Loading from '../components/Loading';
import { api } from '../services/api';

export default function NewsSentiment() {
  const [symbol, setSymbol] = useState('NVDA'); const [query, setQuery] = useState('earnings analyst rating'); const [data, setData] = useState(null); const [loading, setLoading] = useState(false);
  async function search() { setLoading(true); try { const res = await api.post('/news', { symbol, query }); setData(res.data); } finally { setLoading(false); } }
  return <section className="space-y-6"><div><p className="text-accent">News & Sentiment</p><h2 className="text-4xl font-black">Live market news intelligence</h2></div>
    <div className="card grid gap-3 md:grid-cols-[.5fr_1fr_auto]"><input className="input" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} /><input className="input" value={query} onChange={e => setQuery(e.target.value)} /><button className="btn" onClick={search}>Search</button></div>{loading && <Loading />}
    {data?.summary && <div className="card whitespace-pre-wrap"><h3 className="mb-3 text-xl font-bold">AI summary</h3>{data.summary}</div>}
    <div className="grid gap-4 md:grid-cols-2">{data?.articles?.map((a, i) => <a key={i} href={a.url} target="_blank" className="card block transition hover:-translate-y-1"><span className={`rounded-full px-3 py-1 text-xs ${a.sentiment === 'positive' ? 'bg-gain/20 text-gain' : a.sentiment === 'negative' ? 'bg-loss/20 text-loss' : 'bg-white/10 text-slate-300'}`}>{a.sentiment}</span><h3 className="mt-3 text-lg font-bold">{a.headline}</h3><p className="mt-2 text-sm text-slate-400">{a.summary}</p><p className="mt-4 text-xs text-accent">{a.source || 'source'} • {a.datetime}</p></a>)}</div>
  </section>;
}
