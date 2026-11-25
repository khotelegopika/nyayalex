import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SignupModal from './components/SignupModal.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Explore from './pages/Explore.jsx';
import SubjectPage from './pages/SubjectPage.jsx';
import CaseDetailPage from './pages/CaseDetailPage.jsx';
import Contact from './pages/Contact.jsx';
import Bookmarks from './pages/Bookmarks.jsx';

const THEME_KEY = 'ilc_theme';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function Layout({ children, theme, onToggleTheme }) {
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Navbar
        onSignupOpen={() => setSignupOpen(true)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      <main className="flex-1">{children}</main>
      <Footer />
      <SignupModal isOpen={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage error
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout theme={theme} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/subject/:subjectSlug" element={<SubjectPage />} />
          <Route path="/case/:caseSlug" element={<CaseDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="*" element={
            <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
              <div className="font-display text-7xl sm:text-8xl font-bold text-gold/30 mb-4">404</div>
              <h1 className="font-display text-3xl text-ivory mb-4">Page Not Found</h1>
              <p className="font-body text-sm text-slate mb-8">The page you're looking for doesn't exist.</p>
              <a href="/" className="btn-primary">Return Home</a>
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
