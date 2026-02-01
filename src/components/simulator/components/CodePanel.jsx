function CodeLine({ text, active }) {
  return (
    <div className={`px-3 py-1 font-mono text-xs whitespace-pre ${active ? "bg-indigo-600/20 border-l-4 border-indigo-500" : "border-l-4 border-transparent"}`}>
      {text}
    </div>
  );
}

export default function CodePanel({ code, activeLine }) {
  const lines = code.split("\n");
  return (
    <div className="h-full bg-white dark:bg-zinc-950 p-4">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Code (selected language)</div>
      <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="max-h-[360px] overflow-auto">
          {lines.map((ln, i) => (
            <CodeLine key={i} text={ln} active={i === activeLine} />
          ))}
        </div>
      </div>
    </div>
  );
}
