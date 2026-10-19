import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-house' },
    { name: 'About Us', path: '/about', icon: 'fa-shield-halved' },
    { name: 'Services', path: '/services', icon: 'fa-user-shield' },
    { name: 'Events & Parties', path: '/events', icon: 'fa-champagne-glasses', badge: 'POPULAR' },
    { name: 'Book Audit', path: '/book-appointment', icon: 'fa-calendar-check' },
    { name: 'Clients', path: '/clients', icon: 'fa-building-shield' },
    { name: 'Gallery', path: '/gallery', icon: 'fa-images' },
    { name: 'Contact', path: '/contact', icon: 'fa-phone' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0c]/98 backdrop-blur-xl border-b border-[#272930] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-0'
            : 'bg-[#0a0a0c]/80 backdrop-blur-md border-b border-[#272930]/40 py-0'
        }`}
      >
        {/* Red accent top line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[82px] flex items-center justify-between">
          {/* Brand Logo — Custom Shield Badge Outline */}
          <Link to="/" className="flex items-center gap-3 sm:gap-3.5 group shrink-0 mr-3 lg:mr-6">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 lg:w-[50px] lg:h-[50px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
              <img
                src="/assets/shield_logo.png"
                alt="The Legend Security and Bouncer Logo"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = '/assets/real_logo.jpg'; }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-sm sm:text-base lg:text-lg tracking-wider uppercase text-white group-hover:text-brand-red transition-colors duration-300">
                The Legend
              </span>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-wider uppercase text-brand-red leading-none mt-1">
                Security &amp; Bouncer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-5 font-heading text-[11px] xl:text-xs font-bold tracking-wider uppercase flex-1 max-w-2xl mx-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 px-1 whitespace-nowrap transition-all duration-300 group flex items-center gap-1.5 ${
                    isActive
                      ? 'text-brand-red font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-sans bg-brand-red text-white font-bold">
                        {link.badge}
                      </span>
                    )}
                    {/* Underline hover animation */}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-brand-red transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-3 lg:ml-6">
            {/* Minimalist Hotlines (xl+ only) */}
            <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <a
                href="tel:+918806078677"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors duration-200 group"
                title="Director: Mr. Mosin Azam Shaikh"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[11px] font-heading font-medium text-slate-400">
                  Director:
                </span>
                <span className="font-heading font-bold text-xs tracking-wider text-white group-hover:text-brand-red transition-colors">
                  +91 88060 78677
                </span>
              </a>
            </div>

            {/* Book Audit Fast Action */}
            <Link
              to="/book-appointment"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_rgba(229,9,20,0.35)] hover:brightness-110 transition-all duration-300"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Book Audit</span>
            </Link>

            {/* Admin Command Deck Shortcut */}
            <Link
              to="/admin"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-brand-red/50 text-slate-300 hover:text-brand-red transition-all"
              title="Restricted Operations Admin Panel (PIN: 2026)"
            >
              <i className="fa-solid fa-lock text-xs" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden relative w-10 h-10 rounded-xl bg-[#18191d] border border-slate-700 flex items-center justify-center text-white hover:text-brand-red hover:border-brand-red transition-all duration-300 focus:outline-none group"
              aria-label="Toggle navigation"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#0c0d12] border-l border-[#272930] flex flex-col nav-slide-right shadow-2xl">

            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(229,9,20,0.5)] shrink-0">
                  <img src="/assets/shield_logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.src = '/assets/real_logo.jpg'; }} />
                </div>
                <div>
                  <p className="font-heading font-black text-xs uppercase text-white tracking-wide">The Legend Security</p>
                  <p className="text-[10px] text-brand-red font-semibold tracking-widest">&amp; Bouncer</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-brand-red transition-all"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-red/15 text-brand-red border border-brand-red/25'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent'
                      }`
                    }
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${link.icon} text-xs text-brand-red`} />
                    </div>
                    <span className="flex-1">{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-brand-red text-white font-bold">
                        {link.badge}
                      </span>
                    )}
                    <i className="fa-solid fa-chevron-right text-[10px] opacity-40" />
                  </NavLink>
                ))}

                {/* Admin shortcut in mobile */}
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all duration-200 mt-2 ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                        : 'text-amber-400/80 hover:bg-slate-800/70 hover:text-amber-300 border border-white/5 bg-white/[0.02]'
                    }`
                  }
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-lock text-xs text-amber-400" />
                  </div>
                  <span className="flex-1">Admin Command Center</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    PIN: 2026
                  </span>
                </NavLink>
              </div>
            </nav>

            {/* Mobile CTA Footer */}
            <div className="px-4 pb-8 pt-4 border-t border-slate-800/60 flex flex-col gap-2.5">
              <Link
                to="/book-appointment"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-red-900/30 transition-all"
              >
                <i className="fa-solid fa-calendar-check text-xs" />
                <span>Book Security Audit</span>
              </Link>

              <div className="grid grid-cols-1 gap-2">
                <a
                  href="tel:+918806078677"
                  className="w-full flex items-center justify-between px-3 bg-[#18191d] border border-slate-700 hover:border-brand-red text-slate-200 font-heading font-semibold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                      <i className="fa-solid fa-phone text-white text-[9px]" />
                    </div>
                    <span>+91 88060 78677</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-brand-red">DIRECTOR</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
