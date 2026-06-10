export default function SummaryCard({
  title,
  value,
}) {
  return (
    <div
      className="
      relative overflow-hidden
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      rounded-3xl
      p-6
      shadow-xl
      hover:border-cyan-500/40
      hover:-translate-y-1
      transition-all duration-300
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />

      <div className="relative">
        <p className="text-slate-400 uppercase tracking-wider text-xs">
          {title}
        </p>

        <h2 className="text-4xl font-black text-white mt-3">
          {value}
        </h2>
      </div>
    </div>
  );
}