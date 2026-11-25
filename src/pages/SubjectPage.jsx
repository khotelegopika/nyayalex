import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CaseCard from '../components/CaseCard.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import subjects from '../data/subjects.js';
import { getCasesBySubject } from '../data/index.js';
import { searchCases } from '../utils/searchCases.js';
import { sortCases, getCourts } from '../utils/filterCases.js';

const DEFAULT_FILTERS = { sortBy: 'newest', yearFrom: '', yearTo: '', court: '' };

export default function SubjectPage() {
  const { subjectSlug } = useParams();
  const subject = subjects.find(s => s.slug === subjectSlug);
  const subjectCases = useMemo(() => getCasesBySubject(subjectSlug), [subjectSlug]);
  const courts = useMemo(() => getCourts(subjectCases), [subjectCases]);

  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const results = useMemo(() => {
    const searched = searchCases(subjectCases, submitted, {
      yearFrom: filters.yearFrom,
      yearTo: filters.yearTo,
      court: filters.court,
    });
    return filters.sortBy !== 'relevance' ? sortCases(searched, filters.sortBy) : searched;
  }, [submitted, filters, subjectCases]);

  const displayCases = useMemo(() => {
    if (submitted.trim()) return results;
    return sortCases(
      subjectCases.filter(c =>
        (!filters.yearFrom || (c.year && c.year >= Number(filters.yearFrom))) &&
        (!filters.yearTo || (c.year && c.year <= Number(filters.yearTo))) &&
        (!filters.court || c.court === filters.court)
      ),
      filters.sortBy
    );
  }, [submitted, results, subjectCases, filters]);

  const handleSubmit = (q) => setSubmitted(q);
  const handleClear = () => { setQuery(''); setSubmitted(''); };

  if (!subject) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-3xl text-ivory mb-4">Subject Not Found</h1>
        <Link to="/explore" className="btn-outline text-xs">Back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20">
      {/* ═══ HEADER ═══ */}
      <section className="bg-navy py-14 sm:py-20 border-b-2 border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Breadcrumbs crumbs={[
            { label: 'Explore Cases', to: '/explore' },
            { label: subject.title },
          ]} />

          <div className="mt-6 sm:mt-8 mb-8 sm:mb-10">
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-ivory mb-4">
              {subject.title}
            </h1>
            <div className="w-10 h-px bg-gold mb-4" />
            <p className="font-body text-base text-slate max-w-2xl mb-2 leading-relaxed">
              {subject.description}
            </p>
            <p className="font-body text-xs font-semibold text-gold">
              {subjectCases.length} {subjectCases.length === 1 ? 'case' : 'cases'} available
            </p>
          </div>

          <div className="max-w-3xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmit}
              onClear={handleClear}
              placeholder={`Search within ${subject.title}…`}
              showSuggestions={false}
            />
          </div>
        </div>
      </section>

      {/* ═══ CASES ═══ */}
      <section className="bg-charcoal py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-8">
            <FilterPanel
              courts={courts}
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </div>

          {submitted && (
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-gold" />
                <span className="font-body text-sm text-slate">
                  <span className="text-ivory font-semibold">{displayCases.length}</span> results for "
                  <span className="text-gold">{submitted}</span>" in {subject.title}
                </span>
              </div>
              <button onClick={handleClear} className="font-body text-xs font-semibold text-gold hover:underline">
                Clear
              </button>
            </div>
          )}

          {displayCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayCases.map(c => <CaseCard key={c.id} caseObj={c} />)}
            </div>
          ) : (
            <div className="text-center py-20 border border-inkborder/15 bg-navy px-4">
              <Search className="w-10 h-10 text-gold/50 mx-auto mb-4" />
              <h3 className="font-display text-xl text-ivory mb-2">No matching cases found</h3>
              <p className="font-body text-sm text-slate mb-6">
                Try searching with a different keyword or legal provision.
              </p>
              <button onClick={handleClear} className="btn-outline text-xs">Clear Search</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
