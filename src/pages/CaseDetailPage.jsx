import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Bookmark, BookmarkCheck, Share2, Printer,
  Calendar, Building2, Hash, Scale, Info,
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { getCaseBySlug } from '../data/index.js';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks.js';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 bg-gold flex-shrink-0" />
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-ivory">{title}</h2>
    </div>
    {children}
  </div>
);

const ListBlock = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
        <p className="font-body text-sm sm:text-base text-slate leading-relaxed">{item}</p>
      </li>
    ))}
  </ul>
);

export default function CaseDetailPage() {
  const { caseSlug } = useParams();
  const caseObj = getCaseBySlug(caseSlug);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (caseObj) setBookmarked(isBookmarked(caseObj.id));
  }, [caseObj]);

  if (!caseObj) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-3xl text-ivory mb-4">Case Not Found</h1>
        <Link to="/explore" className="btn-outline text-xs">Back to Explore</Link>
      </div>
    );
  }

  const {
    id,
    title,
    year,
    court,
    citation,
    subject,
    subjectSlug,
    principle,
    facts = [],
    decision = [],
    mainProvisions = [],
    constitutionalArticles = [],
    legalKeywords = [],
    notes = [],
    relatedCasesText = [],
  } = caseObj;

  const handleBookmark = () => {
    toggleBookmark(id);
    setBookmarked(v => !v);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  return (
    <div className="pt-16 sm:pt-20">
      {/* ═══ HEADER ═══ */}
      <section className="bg-navy py-12 sm:py-16 border-b-2 border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-5">
            <Breadcrumbs crumbs={[
              { label: 'Explore Cases', to: '/explore' },
              { label: subject, to: `/subject/${subjectSlug}` },
              { label: title },
            ]} />
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight mb-5 max-w-5xl">
            {title}
          </h1>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6">
            {year && (
              <div className="flex items-center gap-2 bg-surface border border-inkborder/15 px-3 py-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span className="font-body text-xs font-medium text-ivory">{year}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-surface border border-inkborder/15 px-3 py-1.5">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              <span className="font-body text-xs font-medium text-ivory">{court}</span>
            </div>
            {citation && (
              <div className="flex items-center gap-2 bg-surface border border-inkborder/15 px-3 py-1.5">
                <Hash className="w-3.5 h-3.5 text-gold" />
                <span className="font-body text-xs font-medium text-ivory">{citation}</span>
              </div>
            )}
            <Link
              to={`/subject/${subjectSlug}`}
              className="flex items-center gap-2 bg-gold/15 border border-gold/40 px-3 py-1.5 hover:bg-gold/25 transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-gold" />
              <span className="font-body text-xs font-semibold text-gold">{subject}</span>
            </Link>
          </div>

          {principle && (
            <div className="bg-gold/10 border-l-2 border-gold px-4 py-3 mb-6 max-w-3xl">
              <span className="font-body text-xs font-semibold text-gold uppercase tracking-wider mr-2">
                Core Principle:
              </span>
              <span className="font-body text-sm font-medium text-ivory">{principle}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 border font-body text-xs font-semibold tracking-wider uppercase transition-all ${
                bookmarked
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-inkborder/25 text-ivory hover:border-gold hover:text-gold'
              }`}
            >
              {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 border border-inkborder/25 text-ivory hover:border-gold hover:text-gold font-body text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-inkborder/25 text-ivory hover:border-gold hover:text-gold font-body text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="bg-charcoal py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Main column */}
            <div className="lg:col-span-2">
              {facts.length > 0 && (
                <Section title="Facts of the Case">
                  <ListBlock items={facts} />
                </Section>
              )}

              {decision.length > 0 && (
                <Section title="Decision & Judicial Holding">
                  <ListBlock items={decision} />
                </Section>
              )}

              {notes.length > 0 && (
                <Section title="Important Notes & Distinctions">
                  <div className="space-y-4">
                    {notes.map((n, i) => (
                      <div key={i} className="bg-navy border border-gold/40 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-gold flex-shrink-0" />
                          <h3 className="font-display text-sm font-semibold text-gold uppercase tracking-wider">
                            {n.label}
                          </h3>
                        </div>
                        <p className="font-body text-sm text-slate leading-relaxed">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {relatedCasesText.length > 0 && (
                <Section title="Related Cases & Developments">
                  <div className="space-y-3">
                    {relatedCasesText.map((r, i) => (
                      <div key={i} className="bg-navy border border-inkborder/15 p-4 sm:p-5">
                        <p className="font-body text-sm text-slate leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-navy border border-inkborder/15 p-5 sm:p-6 lg:sticky lg:top-24 space-y-6">
                {constitutionalArticles.length > 0 && (
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ivory mb-3 uppercase tracking-wider">
                      Constitutional Articles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {constitutionalArticles.map(a => (
                        <Link
                          key={a}
                          to={`/explore?q=${encodeURIComponent(a)}`}
                          className="tag-gold text-xs hover:bg-gold/25 transition-colors"
                        >
                          {a}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {mainProvisions.length > 0 && (
                  <div className={constitutionalArticles.length > 0 ? 'border-t border-inkborder/15 pt-5' : ''}>
                    <h3 className="font-display text-sm font-semibold text-ivory mb-3 uppercase tracking-wider">
                      Main Provisions Involved
                    </h3>
                    <ul className="space-y-2">
                      {mainProvisions.map((p, i) => (
                        <li key={i} className="font-body text-xs sm:text-sm text-slate pl-3 border-l-2 border-gold/40 leading-relaxed">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {legalKeywords.length > 0 && (
                  <div className="border-t border-inkborder/15 pt-5">
                    <h3 className="font-display text-sm font-semibold text-ivory mb-3 uppercase tracking-wider">
                      Legal Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {legalKeywords.map(k => (
                        <Link
                          key={k}
                          to={`/explore?q=${encodeURIComponent(k)}`}
                          className="font-body text-xs text-slate bg-surface border border-inkborder/15 px-2.5 py-1 hover:border-gold hover:text-gold transition-colors"
                        >
                          {k}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-inkborder/15 pt-5 space-y-2.5">
                  <Link
                    to={`/subject/${subjectSlug}`}
                    className="flex items-center gap-2 font-body text-xs font-semibold text-ivory hover:text-gold transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-gold" /> Back to {subject}
                  </Link>
                  <Link
                    to="/explore"
                    className="flex items-center gap-2 font-body text-xs font-medium text-slate hover:text-gold transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-gold" /> All Legal Subjects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
