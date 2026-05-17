import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function PriceChart({ data = [], lines = ['close'], height = 340 }) {
  return <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data} margin={{ left: 0, right: 16, top: 10, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
      <XAxis dataKey="date" stroke="#94a3b8" minTickGap={28} />
      <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
      <Tooltip contentStyle={{ background: '#0d1b2e', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12 }} />
      <Legend />
      {lines.map((line, i) => <Line key={line} type="monotone" dataKey={line} dot={false} stroke={["#38bdf8", "#22c55e", "#f59e0b", "#ef4444"][i % 4]} strokeWidth={2} />)}
    </LineChart>
  </ResponsiveContainer>;
}
