import { Target, Eye } from 'lucide-react';
import TeamCard from '../components/TeamCard.jsx';

// Row 1 (3 members — Shreya Khotele in the middle)
const row1 = [
  { name: 'Aastha Chauhan', image: '/pics/Aastha Chauhan.png' },
  { name: 'Shreya Khotele', image: '/pics/Shreya Khotele.png' },
  { name: 'Khushi Gupta',   image: '/pics/Khushi Gupta.png' },
];

// Row 2 (2 members — staggered cleanly in between Row 1)
const row2 = [
  { name: 'Aastha Shrivastava', image: '/pics/Aastha Shrivastava.png' },
  { name: 'Sanjana Parihar',    image: '/pics/Sanjana Parihar.png' },
];

const missions = [
  'Document important judicial precedents in a structured and accessible format.',
  'Explain complex judgments in clear and understandable language.',
  'Highlight the evolution of constitutional and statutory principles across decades.',
  'Help students and researchers explore India\'s rich legal history.',
  'Connect judicial decisions with their broader social and constitutional impact.',
];

export default function About() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* ══ HERO ══ */}
      <section className="bg-navy py-16 sm:py-24 border-b-2 border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="section-label mb-4">About the Project</p>
          <div className="w-10 h-px bg-gold mb-6" />
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory leading-tight max-w-4xl mb-5">
            Preserving India's Judicial Legacy
          </h1>
          <p className="font-display text-base sm:text-xl text-slate italic font-light max-w-2xl">
            A platform dedicated to documenting the cases that changed the course of Indian law.
          </p>
        </div>
      </section>

      {/* ══ INITIATIVE ══ */}
      <section className="bg-charcoal py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="section-label mb-4">About the Initiative</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory mb-5 leading-tight">
                Making Legal History Accessible
              </h2>
              <div className="w-10 h-px bg-gold mb-6" />
              <div className="space-y-4 font-body text-sm sm:text-base text-slate leading-relaxed">
                <p>
                  India's Landmark Cases is an academic initiative that brings together significant judicial decisions across 17 core domains of Indian and international law — from Constitutional Law, CrPC, Contracts, Torts, Company Law, and IBC to Family Law, Property Law, Jurisprudence, Administrative Law, Labour Law, ADR, Environmental Law, IPR, Statutory Interpretation, Taxation, and Public International Law.
                </p>
                <p>
                  The platform is designed to make legal history accessible to law students, academic researchers, legal practitioners, and anyone interested in understanding how law has evolved through the courts.
                </p>
                <p>
                  Each case in our archive is documented with structured facts, judicial decisions, verified citations, and statutory provisions — making this a focused resource for legal research and education.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy border border-inkborder/15 p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-gold/50 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ivory">Our Vision</h3>
                </div>
                <p className="font-body text-sm text-slate leading-relaxed italic">
                  "To create an accessible and structured digital archive of India's most influential judicial decisions — preserving the constitutional and legal heritage of the nation."
                </p>
              </div>

              <div className="bg-navy border border-inkborder/15 p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 border border-gold/50 flex items-center justify-center">
                    <Target className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ivory">Our Mission</h3>
                </div>
                <ul className="space-y-3">
                  {missions.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <p className="font-body text-sm text-slate leading-relaxed">{m}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM — 3 over 2 descending pyramid ══ */}
      <section id="team" className="bg-navy py-16 sm:py-24 border-t-2 border-gold/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12 sm:mb-16">
            <p className="section-label mb-3">The People</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory mb-4">
              Meet Our Founding Team
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 max-w-[290px] mx-auto sm:max-w-none sm:grid-cols-6 gap-6 sm:gap-8">
            {/* Layer 1: 3 cards (Shreya Khotele in center) */}
            {row1.map((m) => (
              <div key={m.name} className="sm:col-span-2">
                <TeamCard member={m} />
              </div>
            ))}

            {/* Layer 2: 2 cards centered between the 3 above */}
            {row2.map((m, idx) => (
              <div
                key={m.name}
                className={idx === 0 ? 'sm:col-start-2 sm:col-span-2' : 'sm:col-start-4 sm:col-span-2'}
              >
                <TeamCard member={m} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
