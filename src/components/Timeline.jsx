export default function Timeline({ events = [] }) {
  if (!events.length) {
    return (
      <p className="font-body text-sm text-slate/50 italic">Timeline to be added.</p>
    );
  }

  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />

      <div className="space-y-8">
        {events.map((ev, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div className="absolute -left-5 w-3 h-3 border-2 border-gold bg-charcoal rounded-full" />
            {/* Year pill */}
            <div className="inline-flex mb-1">
              <span className="font-body text-xs text-gold border border-gold/30 px-2 py-0.5 tracking-wider">
                {ev.year || ev.date}
              </span>
            </div>
            <h4 className="font-display text-sm font-semibold text-ivory mb-1">{ev.title}</h4>
            {ev.description && (
              <p className="font-body text-sm text-slate leading-relaxed">{ev.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
