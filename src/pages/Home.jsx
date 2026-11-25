import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Scale, BookOpen, Landmark } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import { allCases, subjectsWithCount } from '../data/index.js';

const HERO_IMG = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setHeroLoaded(true);
  }, []);

  const handleSearch = (q) => {
    if (q.trim()) navigate(`/explore?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div>
      {/* ═══════════════════════════════════════
          SECTION 1: HERO — Left / Right split
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${HERO_IMG})`, filter: 'saturate(0.35)' }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-12 sm:pt-28 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: Title & Intro */}
            <div className="flex flex-col justify-center">
              <p className="section-label tracking-[0.25em] mb-4">
                An Archive of India's Judicial Legacy
              </p>
              <div className="w-10 h-px bg-gold mb-6" />

              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold text-ivory leading-[0.95] tracking-tight mb-5">
                INDIA'S<br />
                <span className="text-gold">LANDMARK</span><br />
                CASES
              </h1>

              <p className="font-display text-base sm:text-lg text-ivory/90 italic font-light mb-4 leading-snug">
                "A Repository of India's Most Influential Judgments."
              </p>

              <p className="font-body text-sm sm:text-base text-slate leading-relaxed mb-7 max-w-md">
                Explore the judicial decisions that shaped our Constitution, defined our rights, and transformed the legal landscape of India.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/explore" className="btn-primary text-xs py-3 px-6">
                  Explore Cases <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/about" className="btn-outline-white text-xs py-3 px-6">
                  About the Project
                </Link>
              </div>
            </div>

            {/* RIGHT: Search + Stats + Subject shortcuts */}
            <div className="flex flex-col gap-5 justify-center">
              <div>
                <p className="font-body text-xs font-semibold text-gold uppercase tracking-widest mb-2.5">
                  Search the Archive
                </p>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSubmit={handleSearch}
                  onClear={() => setSearchQuery('')}
                  placeholder="Article 21, Kesavananda, Basic Structure..."
                  showSuggestions={true}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  { value: String(allCases.length), label: 'Cases' },
                  { value: String(subjectsWithCount.length), label: 'Subjects' },
                  { value: '75+', label: 'Years' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-navy/95 border border-inkborder/20 px-3 py-3.5 sm:px-4 sm:py-4 text-center shadow-sm backdrop-blur-sm"
                  >
                    <div className="font-display text-xl sm:text-2xl font-bold text-gold">{s.value}</div>
                    <div className="font-body text-[11px] sm:text-xs font-medium text-ivory uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Subject Shortcuts (only 4 on Home, rest in Explore) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="font-body text-xs font-semibold text-gold uppercase tracking-widest">
                    Featured Subjects
                  </p>
                  <Link
                    to="/explore"
                    className="font-body text-xs font-medium text-slate hover:text-gold transition-colors"
                  >
                    View all {subjectsWithCount.length} →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {subjectsWithCount.slice(0, 4).map((s) => (
                    <Link
                      key={s.slug}
                      to={`/subject/${s.slug}`}
                      className="bg-navy/95 border border-inkborder/20 hover:border-gold px-3.5 py-2.5 font-body text-xs font-medium text-ivory transition-all duration-200 flex items-center justify-between gap-2 shadow-sm backdrop-blur-sm group"
                    >
                      <span className="truncate group-hover:text-gold transition-colors">{s.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 scroll-indicator">
          <span className="font-body text-xs text-slate tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gold" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: SIGNIFICANCE — Distinct Navy Section
      ═══════════════════════════════════════ */}
      <section className="bg-navy border-t-2 border-gold/30 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="section-label mb-3">The Significance</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory mb-4 leading-tight">
                Decisions That Shaped a Nation
              </h2>
              <div className="w-10 h-px bg-gold mb-5" />
              <p className="font-body text-sm sm:text-base text-slate leading-relaxed">
                India's judicial history is a story of a living Constitution — interpreted, debated, and shaped by some of the most consequential court decisions in the world. Each landmark case represents a moment when the judiciary defined the boundaries of power, the scope of rights, and the meaning of justice.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Scale,
                  title: 'Constitutional Evolution',
                  desc: 'Track how the Basic Structure doctrine and fundamental rights jurisprudence evolved across decades of adjudication.',
                },
                {
                  icon: Landmark,
                  title: 'Judicial Milestones',
                  desc: 'Defining moments when courts established statutory and procedural principles shaping criminal, corporate, and insolvency law.',
                },
                {
                  icon: BookOpen,
                  title: 'Legal Transformation',
                  desc: 'How landmark precedents transformed contracts, torts, civil liberties, and institutional accountability in India.',
                },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex gap-4 border-l-2 border-gold/50 pl-4 sm:pl-5 hover:border-gold transition-colors duration-300">
                    <Icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-ivory mb-1">{b.title}</h3>
                      <p className="font-body text-sm text-slate leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: ARCHIVE OVERVIEW — Distinct Charcoal Section
      ═══════════════════════════════════════ */}
      <section className="bg-charcoal border-t-2 border-gold/30 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="section-label mb-3">The Archive</p>
              <div className="w-10 h-px bg-gold mb-5" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory mb-4 leading-tight">
                Browse {subjectsWithCount.length} Core Legal Subjects & {allCases.length} Landmark Cases
              </h2>
              <p className="font-body text-sm sm:text-base text-slate leading-relaxed mb-4">
                Our curated archive spans {subjectsWithCount.length} core legal subjects including Constitutional Law, CrPC, Contracts, Torts, Company Law, IBC, Family Law, Property Law, Jurisprudence, Administrative Law, Labour Law, ADR, Public International Law, Environmental Law, Statutory Interpretation, IPR, and Taxation Law.
              </p>
              <p className="font-body text-sm text-slate leading-relaxed mb-7">
                Select any legal subject to inspect its cases with full facts, judicial reasoning, citations, and statutory provisions.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/explore" className="btn-primary text-xs py-3 px-6">
                  Explore Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {[
                allCases.find(c => c.slug === 'kesavananda-bharati-v-state-of-kerala-1973'),
                allCases.find(c => c.slug === 'maneka-gandhi-v-union-of-india-1978'),
                allCases.find(c => c.slug === 'mohd-ahmed-khan-v-shah-bano-begum-1985'),
              ]
                .filter(Boolean)
                .map((c) => (
                  <Link
                    key={c.id}
                    to={`/case/${c.slug}`}
                    className="block bg-navy border border-inkborder/15 hover:border-gold p-4 sm:p-5 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                          <span className="tag-gold text-[11px]">{c.subject}</span>
                          {c.year && (
                            <span className="font-body text-xs text-slate font-medium">{c.year}</span>
                          )}
                        </div>
                        <h3 className="font-display text-base font-semibold text-ivory group-hover:text-gold transition-colors mb-1">
                          {c.title}
                        </h3>
                        <p className="font-body text-xs text-slate line-clamp-2 leading-relaxed">
                          {c.summary}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
