import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

export default function FilterPanel({ courts = [], filters, onChange, onReset }) {
  const [open, setOpen] = useState(false);

  const hasActive =
    filters.yearFrom ||
    filters.yearTo ||
    filters.court ||
    filters.article ||
    (filters.sortBy && filters.sortBy !== 'newest');

  return (
    <div className="border border-inkborder/20 bg-navy">
      {/* Toggle bar */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 font-body text-sm font-medium text-ivory hover:text-gold transition-colors gap-3"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold flex-shrink-0" />
          <span>Filters & Sorting</span>
          {hasActive && <span className="w-2 h-2 rounded-full bg-gold" />}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-gold" />}
      </button>

      {open && (
        <div className="border-t border-inkborder/15 px-4 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-surface/50">
          {/* Sort */}
          <div>
            <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">
              Sort By
            </label>
            <select
              value={filters.sortBy || 'newest'}
              onChange={e => onChange({ ...filters, sortBy: e.target.value })}
              className="input-field text-xs py-2.5"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">Alphabetical</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>

          {/* Year From */}
          <div>
            <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">
              Year From
            </label>
            <input
              type="number"
              min="1400"
              max="2026"
              placeholder="e.g. 1950"
              value={filters.yearFrom || ''}
              onChange={e => onChange({ ...filters, yearFrom: e.target.value })}
              className="input-field text-xs py-2.5"
            />
          </div>

          {/* Year To */}
          <div>
            <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">
              Year To
            </label>
            <input
              type="number"
              min="1400"
              max="2026"
              placeholder="e.g. 2026"
              value={filters.yearTo || ''}
              onChange={e => onChange({ ...filters, yearTo: e.target.value })}
              className="input-field text-xs py-2.5"
            />
          </div>

          {/* Court */}
          {courts.length > 0 && (
            <div>
              <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">
                Court
              </label>
              <select
                value={filters.court || ''}
                onChange={e => onChange({ ...filters, court: e.target.value })}
                className="input-field text-xs py-2.5"
              >
                <option value="">All Courts</option>
                {courts.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* Reset */}
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-slate hover:text-gold transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
