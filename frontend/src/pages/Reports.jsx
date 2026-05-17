import { useState } from 'react';
import Loading from '../components/Loading';
import { api } from '../services/api';

export default function Reports() {
  const [file, setFile] = useState(null); const [question, setQuestion] = useState('What are the main revenue and risk trends?'); const [answer, setAnswer] = useState(null); const [loading, setLoading] = useState(false); const [notice, setNotice] = useState('');
  async function upload() { if (!file) return; const form = new FormData(); form.append('file', file); setLoading(true); try { const { data } = await api.post('/reports/upload', form); setNotice(`Indexed ${data.chunks_indexed} chunks from ${data.document}.`); } catch (e) { setNotice(e.response?.data?.detail || e.message); } finally { setLoading(false); } }
  async function ask() { setLoading(true); try { const { data } = await api.post('/reports/query', { question, top_k: 5 }); setAnswer(data); } finally { setLoading(false); } }
  return <section className="space-y-6"><div><p className="text-accent">Financial Reports</p><h2 className="text-4xl font-black">RAG analysis with page citations</h2></div>
    <div className="card grid gap-3 md:grid-cols-[1fr_auto]"><input className="input" type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} /><button className="btn" onClick={upload}>Upload PDF</button></div>{notice && <p className="rounded-xl bg-white/10 p-3">{notice}</p>}
    <div className="card space-y-3"><textarea className="input" rows="3" value={question} onChange={e => setQuestion(e.target.value)} /><button className="btn" onClick={ask}>Ask report</button>{loading && <Loading />}{answer && <div className="space-y-4"><div className="rounded-2xl bg-white/10 p-4 whitespace-pre-wrap">{answer.answer}</div><h3 className="font-bold">Citations</h3>{answer.citations?.map((c, i) => <div key={i} className="rounded-xl border border-white/10 p-3 text-sm"><p className="text-accent">{c.document} — page {c.page}</p><p className="text-slate-400">{c.snippet}</p></div>)}</div>}</div>
  </section>;
}
