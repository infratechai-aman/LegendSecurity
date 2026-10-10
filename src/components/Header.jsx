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
    { name: 'Our Clients', path: '/clients', icon: 'fa-building-shield' },
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
          <Link to="/" className="flex items-center gap-3 sm:gap-3.5 group shrink-0 mr-4 lg:mr-8 xl:mr-10">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(229,9,20,0.55)] group-hover:drop-shadow-[0_0_24px_rgba(229,9,20,0.85)] transition-all duration-300 group-hover:scale-105 shrink-0">
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
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-widest uppercase text-brand-red leading-none mt-1 font-mono">
                Security & Bouncer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Centered & Spaced to Prevent Overlapping */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 font-heading text-[11px] xl:text-xs font-bold tracking-wider xl:tracking-widest uppercase flex-1 max-w-xl mx-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 whitespace-nowrap transition-all duration-300 group ${
                    isActive
                      ? 'text-brand-red'
                      : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* Underline hover animation */}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-brand-red transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                    {/* Active dot */}
                    {isActive && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-red animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4 lg:ml-8">
            {/* Minimalist Hotlines (xl+ only) */}
            <div className="hidden xl:flex items-center gap-3.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <a
                href="tel:+918806078777"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                title="Director: Mr. Mosin Azam Shaikh"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[11px] font-heading font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                  Director:
                </span>
                <span className="font-heading font-bold text-xs tracking-wider text-white group-hover:text-brand-red transition-colors">
                  +91 88060 78777
                </span>
              </a>

              <span className="text-slate-700 select-none">|</span>

              <a
                href="tel:+917860313601"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                title="24/7 Operations Desk"
              >
                <span className="text-[11px] font-heading font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                  Ops:
                </span>
                <span className="font-heading font-bold text-xs tracking-wider text-white group-hover:text-brand-red transition-colors">
                  +91 78603 13601
                </span>
              </a>
            </div>

            {/* Get Quote CTA */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-brand-red text-white font-heading font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-lg btn-glow-red shadow-lg shadow-red-900/30 hover:bg-brand-crimson transition-all duration-300"
            >
              <span>Get Quote</span>
              <i className="fa-solid fa-arrow-right text-xs" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#18191d] border border-slate-700 flex items-center justify-center text-white hover:text-brand-red hover:border-brand-red transition-all duration-300 focus:outline-none group"
              aria-label="Toggle navigation"
            >
              {/* Animated hamburger lines */}
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
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-xs bg-[#0c0d12] border-l border-[#272930] flex flex-col nav-slide-down shadow-2xl">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(229,9,20,0.5)] shrink-0">
                  <img src="/assets/shield_logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.src = '/assets/real_logo.jpg'; }} />
                </div>
                <div>
                  <p className="font-heading font-black text-xs uppercase text-white tracking-wide">The Legend Security</p>
                  <p className="text-[10px] text-brand-red font-semibold tracking-widest">& Bouncer</p>
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
                {navLinks.map((link, idx) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3.5 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all duration-200 animate-fade-up ${
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
                    <i className="fa-solid fa-chevron-right text-[10px] opacity-40" />
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Mobile CTA Footer */}
            <div className="px-4 pb-8 pt-4 border-t border-slate-800/60 flex flex-col gap-2.5">
              <div className="py-1 px-2.5 rounded-lg bg-brand-red/10 border border-brand-red/20 text-center">
                <p className="font-mono text-[10px] font-bold text-brand-red uppercase tracking-wider">
                  📍 Pune • Mumbai • All Maharashtra
                </p>
              </div>

              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-red-900/30 btn-glow-red transition-all"
              >
                <i className="fa-solid fa-file-invoice text-xs" />
                <span>Request a Quote</span>
              </Link>

              <div className="grid grid-cols-1 gap-2">
                <a
                  href="tel:+918806078777"
                  className="w-full flex items-center justify-between px-3 bg-[#18191d] border border-slate-700 hover:border-brand-red text-slate-200 font-heading font-semibold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-red flex items-center justify-center">
                      <i className="fa-solid fa-phone text-white text-[9px]" />
                    </div>
                    <span>+91 88060 78777</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-brand-red">DIRECTOR</span>
                </a>

                <a
                  href="tel:+917860313601"
                  className="w-full flex items-center justify-between px-3 bg-[#18191d] border border-slate-700 hover:border-brand-red text-slate-200 font-heading font-semibold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-800 flex items-center justify-center">
                      <i className="fa-solid fa-headset text-white text-[9px]" />
                    </div>
                    <span>+91 78603 13601</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400">OPERATIONS</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>PSARA Govt. Licensed Agency</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
