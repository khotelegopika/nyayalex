import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';

export default function CaseCard({ caseObj }) {
  const {
    slug,
    title,
    year,
    court,
    subject,
    citation,
    principle,
    summary,
    constitutionalArticles = [],
    legalKeywords = [],
  } = caseObj;

  return (
    <article className="case-card flex flex-col h-full group">
      {/* Subject tag & Year */}
      <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
        <span className="tag-gold text-[11px]">{subject}</span>
        {year && (
          <div className="flex items-center gap-1.5 text-slate font-medium">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span className="font-body text-xs">{year}</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-base sm:text-lg font-semibold text-ivory leading-snug mb-2.5 group-hover:text-gold transition-colors duration-200">
        {title}
      </h3>

      {/* Principle badge if present */}
      {principle && (
        <p className="font-body text-xs font-semibold text-gold mb-2.5">
          Principle: {principle}
        </p>
      )}

      {/* Court & Citation */}
      <p className="font-body text-xs text-slate mb-3 flex items-start gap-1.5 leading-relaxed">
        <BookOpen className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
        <span>
          {court}
          {citation ? <span className="text-slate/85"> · {citation}</span> : null}
        </span>
      </p>

      {/* Summary */}
      {summary && (
        <p className="font-body text-sm text-slate leading-relaxed mb-4 line-clamp-3 flex-1">
          {summary}
        </p>
      )}

      {/* Articles */}
      {constitutionalArticles.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {constitutionalArticles.slice(0, 4).map(a => (
            <span key={a} className="tag-gold text-[11px]">{a}</span>
          ))}
        </div>
      )}

      {/* Keywords */}
      {legalKeywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {legalKeywords.slice(0, 3).map(k => (
            <span
              key={k}
              className="font-body text-[11px] text-slate bg-surface px-2 py-0.5 border border-inkborder/15"
            >
              {k}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto pt-4 border-t border-inkborder/15">
        <Link
          to={`/case/${slug}`}
          className="inline-flex items-center gap-2 font-body text-xs font-semibold text-gold tracking-widest uppercase hover:gap-3 transition-all duration-200"
        >
          Read Full Case <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
