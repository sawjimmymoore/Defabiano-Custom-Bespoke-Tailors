interface Stat {
  value: string;
  label: string;
}

export default function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center md:text-left">
          <div className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {s.value}
          </div>
          <div className="mt-1 font-mono text-xs uppercase tracking-widest text-gray">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
