import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const suggestions = [
  'Article 14',
  'Article 21',
  'Basic Structure',
  'Section 154 CrPC',
  'Section 56',
  'Strict Liability',
  'Separate Legal Personality',
  'IBC',
  'Kesavananda Bharati',
  'D.K. Basu',
];

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search cases, articles, keywords, provisions...',
  className = '',
  autoFocus = false,
  showSuggestions = true,
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      onSubmit && onSubmit(value);
      setFocused(false);
    }
    if (e.key === 'Escape') {
      onClear && onClear();
      setFocused(false);
    }
  };

  const handleSuggestion = (s) => {
    onChange(s);
    onSubmit && onSubmit(s);
    setFocused(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input row */}
      <div
        className={`relative flex items-center transition-all duration-200 ${
          focused
            ? 'border border-gold bg-navy shadow-lg shadow-black/15'
            : 'border border-inkborder/30 bg-navy'
        }`}
      >
        <Search className="absolute left-3.5 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gold" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="w-full bg-transparent font-body text-sm pl-10 sm:pl-12 pr-10 sm:pr-12 py-3.5 sm:py-4 focus:outline-none text-ivory placeholder-slate/70"
        />
        {value && (
          <button
            type="button"
            onMouseDown={e => {
              e.preventDefault();
              onClear && onClear();
            }}
            className="absolute right-3.5 p-1 text-slate hover:text-gold transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown — fully theme-aware, opaque surface */}
      {showSuggestions && focused && !value && (
        <div className="absolute top-full left-0 right-0 z-50 border border-t-0 border-gold/40 bg-navy shadow-2xl max-h-72 overflow-y-auto">
          <div className="px-4 py-2.5 border-b border-inkborder/15 bg-surface">
            <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-gold">
              Popular Searches
            </span>
          </div>
          <ul>
            {suggestions.map(s => (
              <li key={s}>
                <button
                  type="button"
                  onMouseDown={() => handleSuggestion(s)}
                  className="w-full text-left px-4 py-2.5 font-body text-sm font-medium flex items-center gap-3 transition-colors border-b border-inkborder/10 last:border-b-0 text-ivory hover:bg-surface hover:text-gold"
                >
                  <Search className="w-3.5 h-3.5 flex-shrink-0 text-gold" />
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
