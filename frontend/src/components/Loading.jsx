export default function Loading({ label = 'Loading intelligence...' }) {
  return <div className="flex items-center gap-3 text-slate-400"><span className="h-3 w-3 animate-ping rounded-full bg-accent" />{label}</div>;
}
