import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Scale, Gavel, FileText, AlertCircle, Building2, Landmark } from 'lucide-react';

const iconMap = {
  Scale,
  Gavel,
  FileText,
  AlertCircle,
  Building2,
  Landmark,
};

export default function SubjectCard({ subject, caseCount, onClick, isActive }) {
  const IconComp = iconMap[subject.icon] || Scale;
  const count = caseCount ?? subject.caseCount ?? 0;

  const inner = (
    <div
      className={`subject-card h-full flex flex-col transition-all duration-300 ${
        isActive
          ? 'border-gold ring-1 ring-gold/40 bg-gold/10 shadow-xl'
          : 'hover:border-gold/60'
      }`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 border flex items-center justify-center mb-4 transition-all duration-300 ${
          isActive
            ? 'border-gold bg-gold/15'
            : 'border-gold/50 group-hover:border-gold group-hover:bg-gold/10'
        }`}
      >
        <IconComp className="w-5 h-5 text-gold" />
      </div>

      {/* Title */}
      <h3
        className={`font-display text-lg font-semibold mb-2.5 transition-colors duration-200 leading-snug ${
          isActive ? 'text-gold' : 'text-ivory group-hover:text-gold'
        }`}
      >
        {subject.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-slate leading-relaxed mb-5 flex-1">
        {subject.description}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-inkborder/15 flex items-center justify-between">
        <span className="font-body text-xs font-semibold text-gold">
          {count} {count === 1 ? 'Case' : 'Cases'}
        </span>
        <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-ivory group-hover:text-gold tracking-widest uppercase transition-colors">
          {isActive ? 'Viewing' : 'Explore'} <ArrowRight className="w-3.5 h-3.5 text-gold" />
        </span>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block w-full text-left group h-full">
        {inner}
      </button>
    );
  }

  return (
    <Link to={`/subject/${subject.slug}`} className="block group h-full">
      {inner}
    </Link>
  );
}
