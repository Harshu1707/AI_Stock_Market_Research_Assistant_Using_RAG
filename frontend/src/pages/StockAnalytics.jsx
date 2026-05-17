import { useState } from 'react';
import PriceChart from '../components/PriceChart';
import Loading from '../components/Loading';
import { api } from '../services/api';
import { money } from '../utils/format';

export default function StockAnalytics() {
  const [symbol, setSymbol] = useState('AAPL'); const [data, setData] = useState([]); const [quote, setQuote] = useState(null); const [file, setFile] = useState(null); const [loading, setLoading] = useState(false); const [notice, setNotice] = useState('');
  async function load() { setLoading(true); setNotice(''); try { const [hist, q] = await Promise.all([api.get(`/stocks/${symbol}/indicators`), api.get(`/stocks/${symbol}/quote`)]); setData(hist.data.rows); setQuote(q.data); } catch (e) { setNotice(e.response?.data?.detail || e.message); } finally { setLoading(false); } }
  async function upload() { if (!file) return; const form = new FormData(); form.append('file', file); setLoading(true); try { const { data } = await api.post('/dataset/upload', form); setNotice(`Uploaded ${data.filename}; inserted ${data.inserted_rows} new rows.`); } catch (e) { setNotice(e.response?.data?.detail || e.message); } finally { setLoading(false); } }
  const latest = data.at(-1);
  return <section className="space-y-6"><div><p className="text-accent">Stock Analytics</p><h2 className="text-4xl font-black">OHLCV, SMA, EMA, RSI & volatility</h2></div>
    <div className="card grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]"><input className="input" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} /><input className="input" type="file" accept=".csv,.xlsx,.xls" onChange={e => setFile(e.target.files[0])} /><button className="btn" onClick={upload}>Upload dataset</button><button className="btn" onClick={load}>Analyze</button></div>
    {notice && <p className="rounded-xl bg-white/10 p-3 text-slate-200">{notice}</p>}{loading && <Loading />}
    <div className="grid gap-4 md:grid-cols-4"><div className="card"><p className="text-slate-400">Live price</p><p className="text-3xl font-black">{quote ? money(quote.last_price) : '--'}</p></div><div className="card"><p className="text-slate-400">Close</p><p className="text-3xl font-black">{latest ? money(latest.close) : '--'}</p></div><div className="card"><p className="text-slate-400">RSI-14</p><p className="text-3xl font-black">{latest?.rsi_14 ? money(latest.rsi_14) : '--'}</p></div><div className="card"><p className="text-slate-400">Volatility</p><p className="text-3xl font-black">{latest?.rolling_volatility ? money(latest.rolling_volatility) + '%' : '--'}</p></div></div>
    <div className="card"><h3 className="mb-4 text-xl font-bold">Price with SMA overlays</h3><PriceChart data={data} lines={['close', 'sma_20', 'sma_50', 'ema_20']} /></div>
    <div className="card"><h3 className="mb-4 text-xl font-bold">RSI chart</h3><PriceChart data={data} lines={['rsi_14']} height={240} /></div>
    <div className="card overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-slate-400">{['date','open','high','low','close','volume','sma_20','rsi_14'].map(h => <th className="p-2" key={h}>{h}</th>)}</tr></thead><tbody>{data.slice(-20).reverse().map((r, i) => <tr key={i} className="border-t border-white/5">{['date','open','high','low','close','volume','sma_20','rsi_14'].map(h => <td className="p-2" key={h}>{typeof r[h] === 'number' ? money(r[h]) : r[h]}</td>)}</tr>)}</tbody></table></div>
  </section>;
}
