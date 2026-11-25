import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Project', to: '/about' },
  { label: 'Explore Cases', to: '/explore' },
  { label: 'Our Team', to: '/about#team' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar({ onSignupOpen, theme = 'dark', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHomeHero = pathname === '/' && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHashLink = (e, to) => {
    if (to.includes('#')) {
      e.preventDefault();
      const [path, hash] = to.split('#');
      navigate(path || '/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 220);
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomeHero
          ? 'bg-transparent'
          : 'bg-navy/95 backdrop-blur-md shadow-md border-b border-inkborder/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 border border-gold/70 group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300">
              <Scale className="w-4 h-4 text-gold" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xs sm:text-sm font-semibold text-ivory leading-tight tracking-wider truncate">
                INDIA'S LANDMARK
              </div>
              <div className="font-display text-[10px] sm:text-xs text-gold tracking-widest uppercase">
                CASES
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={e => handleHashLink(e, link.to)}
                className={({ isActive }) => {
                  const active = isActive && !link.to.includes('#');
                  return `font-body text-xs tracking-widest uppercase font-medium transition-colors duration-200 pb-0.5 border-b ${
                    active
                      ? 'text-gold border-gold'
                      : 'text-ivory/85 border-transparent hover:text-gold hover:border-gold/40'
                  }`;
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions: Theme Toggle + Sign Up + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-8 h-8 flex items-center justify-center border border-inkborder/25 text-ivory hover:border-gold hover:text-gold transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onSignupOpen}
              className="btn-primary text-[11px] py-2 px-4 sm:px-5 hidden sm:inline-flex"
            >
              Sign Up
            </button>

            <button
              type="button"
              className="lg:hidden p-2 text-ivory hover:text-gold transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-inkborder/10 bg-navy shadow-xl">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={e => handleHashLink(e, link.to)}
                className={({ isActive }) =>
                  `block font-body text-xs tracking-widest uppercase font-medium py-3 border-b border-inkborder/10 transition-colors ${
                    isActive && !link.to.includes('#')
                      ? 'text-gold font-semibold'
                      : 'text-ivory/85 hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 pb-1">
              <button
                type="button"
                onClick={() => { onSignupOpen(); setMenuOpen(false); }}
                className="btn-primary w-full justify-center py-3"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
