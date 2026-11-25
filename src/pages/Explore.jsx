import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import CaseCard from '../components/CaseCard.jsx';
import SubjectCard from '../components/SubjectCard.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import { allCases, subjectsWithCount, getCasesBySubject } from '../data/index.js';
import { searchCases } from '../utils/searchCases.js';
import { sortCases, getCourts } from '../utils/filterCases.js';

const DEFAULT_FILTERS = { sortBy: 'newest', yearFrom: '', yearTo: '', court: '' };

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [activeSubject, setActiveSubject] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (initialQ) {
      setQuery(initialQ);
      setSubmitted(initialQ);
      setActiveSubject(null);
    }
  }, [initialQ]);

  const courts = useMemo(() => getCourts(allCases), []);

  const searchResults = useMemo(() => {
    if (!submitted.trim()) return [];
    const res = searchCases(allCases, submitted, {
      yearFrom: filters.yearFrom,
      yearTo: filters.yearTo,
      court: filters.court,
    });
    return filters.sortBy !== 'relevance' ? sortCases(res, filters.sortBy) : res;
  }, [submitted, filters]);

  const subjectCases = useMemo(() => {
    if (!activeSubject) return [];
    const cases = getCasesBySubject(activeSubject);
    return sortCases(cases, filters.sortBy).filter(c =>
      (!filters.yearFrom || (c.year && c.year >= Number(filters.yearFrom))) &&
      (!filters.yearTo || (c.year && c.year <= Number(filters.yearTo))) &&
      (!filters.court || c.court === filters.court)
    );
  }, [activeSubject, filters]);

  const handleSubmit = (q) => {
    setSubmitted(q);
    setActiveSubject(null);
    if (q) setSearchParams({ q });
    else setSearchParams({});
  };

  const handleClear = () => {
    setQuery('');
    setSubmitted('');
    setSearchParams({});
  };

  const handleSubjectClick = (slug) => {
    const next = activeSubject === slug ? null : slug;
    setActiveSubject(next);
    setSubmitted('');
    setQuery('');
    setSearchParams({});
    if (next) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const isSearching = submitted.trim().length > 0;

  return (
    <div className="pt-16 sm:pt-20">
      {/* ═══ HERO / SEARCH ═══ */}
      <section className="bg-navy py-14 sm:py-20 border-b-2 border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="section-label mb-4">The Archive</p>
          <div className="w-10 h-px bg-gold mb-6" />
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ivory mb-4">
            Explore India's Landmark Cases
          </h1>
          <p className="font-body text-base sm:text-lg text-slate max-w-2xl mb-8">
            Select a legal subject below to view its cases, or search across the entire archive.
          </p>

          <div className="max-w-3xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmit}
              onClear={handleClear}
              placeholder="Search cases, Article 14, Basic Structure, CrPC, IBC..."
              showSuggestions={true}
            />
            <div className="flex items-center gap-4 mt-3">
              <span className="font-body text-xs font-medium text-slate">
                {allCases.length} cases · {subjectsWithCount.length} subjects
              </span>
              {isSearching && (
                <button
                  onClick={handleClear}
                  className="font-body text-xs font-semibold text-gold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL SEARCH RESULTS ═══ */}
      {isSearching && (
        <section className="bg-charcoal py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Search className="w-4 h-4 text-gold flex-shrink-0" />
                  <h2 className="font-display text-xl font-semibold text-ivory">
                    Results for "<span className="text-gold">{submitted}</span>"
                  </h2>
                </div>
                <p className="font-body text-sm text-slate">
                  {searchResults.length} {searchResults.length === 1 ? 'case' : 'cases'} found across all subjects
                </p>
              </div>
              <button
                onClick={handleClear}
                className="font-body text-xs font-semibold text-gold hover:underline self-start"
              >
                ← Back to subjects
              </button>
            </div>

            <div className="mb-8">
              <FilterPanel
                courts={courts}
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)}
              />
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {searchResults.map(c => <CaseCard key={c.id} caseObj={c} />)}
              </div>
            ) : (
              <div className="text-center py-20 border border-inkborder/15 bg-navy px-4">
                <Search className="w-10 h-10 text-gold/50 mx-auto mb-4" />
                <h3 className="font-display text-xl text-ivory mb-2">No matching cases found</h3>
                <p className="font-body text-sm text-slate mb-6">
                  Try a different keyword. Examples: "Article 21", "Basic Structure", "Section 154 CrPC"
                </p>
                <button onClick={handleClear} className="btn-outline text-xs">Clear Search</button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ SUBJECT CARDS + INLINE CASE PANEL ═══ */}
      {!isSearching && (
        <section id="subjects" className="bg-charcoal py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="mb-8 sm:mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory mb-2">Legal Subjects</h2>
              <p className="font-body text-sm sm:text-base text-slate">
                Click any subject card below to view all cases in that subject.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subjectsWithCount.map(s => (
                <SubjectCard
                  key={s.id}
                  subject={s}
                  caseCount={s.caseCount}
                  onClick={() => handleSubjectClick(s.slug)}
                  isActive={activeSubject === s.slug}
                />
              ))}
            </div>

            {/* Inline Case Panel */}
            {activeSubject && (
              <div ref={panelRef} className="mt-10 border-2 border-gold/40 bg-navy shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 sm:px-6 py-5 border-b border-inkborder/15 bg-surface/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory">
                        {subjectsWithCount.find(s => s.slug === activeSubject)?.title}
                      </h3>
                      <p className="font-body text-xs font-medium text-gold mt-1">
                        {subjectCases.length} {subjectCases.length === 1 ? 'case' : 'cases'} available
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveSubject(null)}
                      className="md:hidden p-2 text-slate hover:text-gold transition-colors"
                      aria-label="Close panel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <div className="w-full sm:w-auto min-w-[220px]">
                      <FilterPanel
                        courts={getCourts(getCasesBySubject(activeSubject))}
                        filters={filters}
                        onChange={setFilters}
                        onReset={() => setFilters(DEFAULT_FILTERS)}
                      />
                    </div>
                    <button
                      onClick={() => setActiveSubject(null)}
                      className="hidden md:inline-flex p-2 text-slate hover:text-gold transition-colors"
                      aria-label="Close panel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-charcoal/50">
                  {subjectCases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {subjectCases.map(c => <CaseCard key={c.id} caseObj={c} />)}
                    </div>
                  ) : (
                    <div className="text-center py-14">
                      <p className="font-display text-lg text-slate">No matching cases found for these filters.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
