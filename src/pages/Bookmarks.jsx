import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { getBookmarks, clearBookmarks } from '../utils/bookmarks.js';
import { getCaseById } from '../data/index.js';
import CaseCard from '../components/CaseCard.jsx';

export default function Bookmarks() {
  const [bookmarkIds, setBookmarkIds] = useState([]);

  useEffect(() => {
    setBookmarkIds(getBookmarks());
  }, []);

  const bookmarkedCases = bookmarkIds.map(id => getCaseById(id)).filter(Boolean);

  const handleClear = () => {
    clearBookmarks();
    setBookmarkIds([]);
  };

  return (
    <div className="pt-16 sm:pt-20">
      <section className="bg-navy py-14 sm:py-20 border-b-2 border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="section-label mb-4">Your Reading List</p>
          <div className="w-10 h-px bg-gold mb-6" />
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-ivory mb-3">Bookmarked Cases</h1>
              <p className="font-body text-base text-slate">
                {bookmarkedCases.length} saved {bookmarkedCases.length === 1 ? 'case' : 'cases'}
              </p>
            </div>
            {bookmarkedCases.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 font-body text-xs font-semibold text-slate hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {bookmarkedCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {bookmarkedCases.map(c => <CaseCard key={c.id} caseObj={c} />)}
            </div>
          ) : (
            <div className="text-center py-20 border border-inkborder/15 bg-navy px-4">
              <Bookmark className="w-12 h-12 text-gold/50 mx-auto mb-4" />
              <h3 className="font-display text-xl text-ivory mb-2">No bookmarks yet</h3>
              <p className="font-body text-sm text-slate mb-6">
                Open any case and click "Bookmark" to save it here.
              </p>
              <Link to="/explore" className="btn-outline text-xs">
                Explore Cases <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
