import { useState } from 'react';
import Loading from '../components/Loading';
import { api, disclaimer } from '../services/api';

export default function ChatAssistant() {
  const [message, setMessage] = useState('Compare AAPL and MSFT performance and recent news.');
  const [symbol, setSymbol] = useState('AAPL');
  const [history, setHistory] = useState([{ role: 'assistant', content: 'Hi, I am SMRA. Ask about prices, filings, technicals, news, or comparisons.' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function send() {
    if (!message.trim()) return;
    const next = [...history, { role: 'user', content: message }];
    setHistory(next); setMessage(''); setLoading(true); setError('');
    try {
      const { data } = await api.post('/chat', { message, symbol, history: next });
      setHistory([...next, { role: 'assistant', content: data.answer, meta: data.intent }]);
    } catch (e) { setError(e.response?.data?.detail || e.message); }
    finally { setLoading(false); }
  }

  return <section className="mx-auto max-w-5xl space-y-6">
    <div><p className="text-accent">AI Assistant</p><h2 className="text-4xl font-black">Conversational financial research</h2><p className="text-slate-400">Routes questions to SQL analytics, RAG filings, and live news.</p></div>
    <div className="card min-h-[520px] space-y-4">
      <div className="flex gap-3"><input className="input max-w-40" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} placeholder="Symbol" /><span className="rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{disclaimer}</span></div>
      <div className="h-[360px] overflow-y-auto rounded-2xl bg-black/20 p-4">
        {history.map((item, idx) => <div key={idx} className={`mb-4 max-w-[85%] rounded-2xl p-4 ${item.role === 'user' ? 'ml-auto bg-accent text-ink' : 'bg-white/10 text-slate-100'}`}><p className="whitespace-pre-wrap">{item.content}</p>{item.meta && <p className="mt-2 text-xs opacity-70">Intent: {item.meta.intent}</p>}</div>)}
        {loading && <Loading label="SMRA is thinking across tools..." />}
      </div>
      {error && <p className="rounded-xl bg-loss/10 p-3 text-loss">{error}</p>}
      <div className="flex gap-3"><textarea className="input" value={message} onChange={(e) => setMessage(e.target.value)} rows={2} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? (e.preventDefault(), send()) : null} /><button className="btn" onClick={send} disabled={loading}>Send</button></div>
    </div>
  </section>;
}
