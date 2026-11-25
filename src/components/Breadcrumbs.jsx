import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 font-body text-xs text-slate" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 hover:text-gold transition-colors" aria-label="Home">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5 text-slate/50 flex-shrink-0" />
          {c.to && i < crumbs.length - 1 ? (
            <Link to={c.to} className="hover:text-gold transition-colors">{c.label}</Link>
          ) : (
            <span className={i === crumbs.length - 1 ? 'text-gold font-medium' : ''}>{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
