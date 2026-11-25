import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t-2 border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-inkborder/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-gold/60 flex items-center justify-center flex-shrink-0">
              <Scale className="w-4 h-4 text-gold" />
            </div>
            <div>
              <span className="font-display text-sm font-semibold text-ivory tracking-wider">
                INDIA'S LANDMARK{' '}
              </span>
              <span className="font-display text-xs text-gold tracking-widest uppercase">
                CASES
              </span>
            </div>
          </Link>

          <p className="font-body text-xs text-slate leading-relaxed max-w-2xl">
            <span className="text-gold font-semibold">Disclaimer: </span>
            Academic and informational archive only. Case summaries are not substitutes for original judicial decisions or professional legal advice.
          </p>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-slate">
            © {year} India's Landmark Cases. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/bookmarks" className="font-body text-xs text-slate hover:text-gold transition-colors">
              Saved Bookmarks
            </Link>
            <Link to="/about" className="font-body text-xs text-slate hover:text-gold transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-body text-xs text-slate hover:text-gold transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
