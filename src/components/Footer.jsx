import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Footer() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'All Services', path: '/services' },
    { name: 'Events & Celebrations', path: '/events' },
    { name: 'Book Site Audit', path: '/book-appointment' },
    { name: 'Client Sites (20)', path: '/clients' },
    { name: 'Squad Gallery', path: '/gallery' },
    { name: 'Contact & Quote', path: '/contact' },
    { name: 'Admin Command Deck', path: '/admin' },
  ];

  const services = [
    'Industrial Security Guards',
    'Royal Wedding & Event Bouncers',
    'Milestone Birthday & Party Security',
    'Elite Event & Club Bouncers',
    'Commercial Housekeeping',
    'CIT (Cash-In-Transit) Services',
    'Labour Supply & Manpower',
    'Personal Body Guard (PSO)',
  ];

  return (
    <footer className="bg-[#060607] border-t border-[#1d1e24] text-slate-400 text-sm relative overflow-hidden" id="footer">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-60" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-red/4 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-[#1d1e24]">

          {/* Brand Column */}
          <div className={`lg:col-span-4 space-y-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 filter drop-shadow-[0_0_12px_rgba(229,9,20,0.45)] group-hover:drop-shadow-[0_0_20px_rgba(229,9,20,0.75)] group-hover:scale-105 transition-all duration-300">
                <img src="/assets/shield_logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.src = '/assets/real_logo.jpg'; }} />
              </div>
              <div>
                <h4 className="font-heading font-black text-white text-base tracking-wider uppercase leading-tight group-hover:text-brand-red transition-colors">
                  The Legend Security
                </h4>
                <p className="text-xs text-brand-red font-semibold uppercase tracking-widest mt-0.5">& Bouncer Services</p>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Incorporated in <strong className="text-slate-300">2018</strong> by Director <strong className="text-slate-300">Mr. Mosin Azam Shaikh</strong>. Providing professionally managed Security Guards, Bouncers, Housekeeping, CIT Services, and Labour Supply across <strong className="text-white">Pune, Mumbai, and All Over Maharashtra</strong>.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 font-medium text-[11px]">
                PSARA: PSA/L/50/MH/2026/JULI/6495
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-brand-red/10 border border-brand-red/25 text-brand-red font-medium text-[11px]">
                Pune • Mumbai • All Maharashtra
              </span>
            </div>

            {/* Social/contact quick row */}
            <div className="flex items-center gap-2.5 pt-1">
              <a href="tel:+918806078677"
                title="Director: +91 88060 78677"
                className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white hover:bg-red-700 transition-colors shadow-md">
                <i className="fa-solid fa-phone text-xs" />
              </a>
              <a href="tel:+917860313601"
                title="Operations: +91 78603 13601"
                className="w-9 h-9 rounded-xl bg-red-800 flex items-center justify-center text-white hover:bg-red-700 transition-colors shadow-md">
                <i className="fa-solid fa-headset text-xs" />
              </a>
              <a href="https://wa.me/918806078677" target="_blank" rel="noopener noreferrer"
                title="WhatsApp Dispatch"
                className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors shadow-md">
                <i className="fa-brands fa-whatsapp text-sm" />
              </a>
              <a href="mailto:thelegendscrt16@gmail.com"
                title="Email Support"
                className="w-9 h-9 rounded-xl bg-[#18191d] border border-slate-700 flex items-center justify-center text-slate-300 hover:text-brand-red hover:border-brand-red transition-all">
                <i className="fa-solid fa-envelope text-xs" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`lg:col-span-2 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-white border-l-2 border-brand-red pl-2.5">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs font-medium">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-slate-400 hover:text-brand-red transition-colors flex items-center gap-2 group">
                    <i className="fa-solid fa-chevron-right text-[9px] text-brand-red/70 group-hover:translate-x-0.5 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={`lg:col-span-3 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-white border-l-2 border-brand-red pl-2.5">
              Service Offerings
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              {services.map((s, i) => (
                <li key={i} className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={`lg:col-span-3 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-white border-l-2 border-brand-red pl-2.5">
              Direct Contact
            </h5>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 group">
                <i className="fa-solid fa-location-dot text-brand-red mt-0.5 shrink-0" />
                <p className="text-slate-400 leading-snug">
                  <strong className="text-white text-[11px] block mb-0.5">Main Branch (Pune):</strong>
                  857, Bhawani Peth, Near Bharat Talkies, Pune 411042
                </p>
              </div>

              <a href="tel:+918806078677" className="flex items-center gap-2.5 group">
                <i className="fa-solid fa-phone text-brand-red" />
                <span className="text-white font-semibold hover:text-brand-red transition-colors">+91 88060 78677 (Director)</span>
              </a>

              <a href="tel:+917860313601" className="flex items-center gap-2.5 group">
                <i className="fa-solid fa-headset text-brand-red" />
                <span className="text-white font-semibold hover:text-brand-red transition-colors">+91 78603 13601 (Operations Desk)</span>
              </a>

              <a href="tel:+918975866597" className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-slate-500" />
                <span className="text-slate-300 hover:text-brand-red transition-colors">+91 89758 66597 (Mr. Shahid Shaikh)</span>
              </a>

              <a href="https://wa.me/918806078677" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
                <i className="fa-brands fa-whatsapp text-emerald-500" />
                <span className="text-emerald-400 hover:underline">+91 88060 78677 (WhatsApp)</span>
              </a>

              <a href="mailto:thelegendscrt16@gmail.com" className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-slate-400" />
                <span className="text-slate-300 hover:text-brand-red transition-colors text-xs">thelegendscrt16@gmail.com</span>
              </a>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-400">
                <p><strong className="text-slate-300">Katraj Branch:</strong> Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Katraj, Pune 411046</p>
                <p><strong className="text-slate-300">Mumbai Branch:</strong> Patel Society, Indira Nagar, Pathanwadi, Rani Sati Marg, Malad East, Mumbai 97</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <p>© {new Date().getFullYear()} The Legend Security and Bouncer. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Govt. PSARA Licensed
            </span>
            <span className="text-slate-700">•</span>
            <span>Gumasta Reg. 2731000318422972</span>
            <span className="text-slate-700">•</span>
            <span>MH Controlling Authority</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
