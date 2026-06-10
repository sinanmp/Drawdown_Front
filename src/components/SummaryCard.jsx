export default function SummaryCard({
  title,
  value,
}) {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-2xl
      p-4
      "
    >
      <p className="text-slate-500 text-xs uppercase">
        {title}
      </p>

      <h2
        className="
        text-lg
        sm:text-xl
        font-bold
        text-white
        mt-1
        truncate
        "
      >
        {value}
      </h2>
    </div>
  );
}