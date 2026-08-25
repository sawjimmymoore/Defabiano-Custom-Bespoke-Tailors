export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-gray">
      <span className="h-1.5 w-1.5 rounded-full bg-brass" />
      {children}
    </div>
  );
}
