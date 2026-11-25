import { useState, useEffect, useRef } from 'react';
import { X, User, Phone, Mail, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'ilc_registrations';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  if (!form.mobile.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  }
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export default function SignupModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setForm({ name: '', mobile: '', email: '' });
      setErrors({});
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    setSubmitted(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-navy border border-inkborder/20 shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate hover:text-gold transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 border border-gold/60 flex items-center justify-center">
              <User className="w-4 h-4 text-gold" />
            </div>
            <div className="w-12 h-px bg-gold/50" />
          </div>

          {!submitted ? (
            <>
              <h2 className="font-display text-2xl font-semibold text-ivory mb-1">Join the Legal Archive</h2>
              <p className="font-body text-sm text-slate mb-1">Register your details to be part of our legal knowledge community.</p>
              <p className="font-body text-xs text-gold mb-6 italic">— Demonstration registration form. No account will be created.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/70" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`input-field pl-9 ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/70" />
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="10-digit Indian mobile number"
                      maxLength={10}
                      className={`input-field pl-9 ${errors.mobile ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.mobile && <p className="font-body text-xs text-red-500 mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/70" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`input-field pl-9 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-primary w-full justify-center py-3.5">
                    Submit Details
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-gold mx-auto mb-5" />
              <h3 className="font-display text-xl font-semibold text-ivory mb-2">Registration Recorded</h3>
              <p className="font-body text-sm text-slate mb-1">
                Thank you, <span className="text-ivory font-medium">{form.name}</span>. Your details have been saved locally.
              </p>
              <p className="font-body text-xs text-gold italic mb-6">This is a demonstration form. No actual account has been created.</p>
              <button onClick={onClose} className="btn-outline text-xs">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
