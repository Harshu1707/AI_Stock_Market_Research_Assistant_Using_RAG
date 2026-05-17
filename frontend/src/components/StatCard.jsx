export default function StatCard({ label, value, tone = 'text-slate-100' }) {
  return <div className="card">
    <p className="text-sm text-slate-400">{label}</p>
    <p className={`mt-2 text-3xl font-black ${tone}`}>{value}</p>
  </div>;
}
