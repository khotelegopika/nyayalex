import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div className="pt-16 sm:pt-20">
      {/* ══ HERO ══ */}
      <section className="bg-navy py-14 sm:py-20 border-b-2 border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="section-label mb-4">Get in Touch</p>
          <div className="w-10 h-px bg-gold mb-6" />
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ivory mb-4">Get in Touch</h1>
          <p className="font-body text-base sm:text-lg text-slate max-w-2xl">
            Questions, suggestions, or academic contributions? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ══ CONTENT ══ */}
      <section className="bg-charcoal py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

            {/* Info panel */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-ivory mb-3">Contact Information</h2>
                <div className="w-8 h-px bg-gold" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-gold/50 flex items-center justify-center flex-shrink-0 bg-navy">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:Landmarkcases@upes.com"
                    className="font-body text-sm text-ivory hover:text-gold transition-colors break-all"
                  >
                    Landmarkcases@upes.com
                  </a>
                </div>
              </div>

              <div className="border-t border-inkborder/15 pt-6">
                <p className="font-body text-xs text-slate leading-relaxed italic">
                  This contact form is for academic and project inquiries only. No actual message delivery system is active in this demonstration version.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 bg-navy border border-inkborder/15 p-5 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Full Name *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="Your full name"
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Email Address *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Subject *</label>
                    <input
                      type="text" name="subject" value={form.subject} onChange={handleChange}
                      placeholder="Subject of your message"
                      className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
                    />
                    {errors.subject && <p className="font-body text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="font-body text-xs font-semibold text-slate uppercase tracking-wider mb-1.5 block">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={5} placeholder="Write your message here..."
                      className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-inkborder/15 bg-navy">
                  <CheckCircle className="w-14 h-14 text-gold mb-5" />
                  <h3 className="font-display text-2xl font-semibold text-ivory mb-2">Message Received</h3>
                  <p className="font-body text-sm text-slate mb-1">
                    Thank you, <span className="text-ivory font-medium">{form.name}</span>. Your message has been recorded.
                  </p>
                  <p className="font-body text-xs text-gold italic mb-6">
                    This is a demonstration form. No actual message was delivered.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="btn-outline text-xs"
                  >
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
