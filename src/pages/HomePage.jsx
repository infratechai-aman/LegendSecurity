import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import HeroTrustStrip, { PsaraShieldIcon, PoliceVerifiedIcon, Supervision247Icon, LocationPinIcon } from '../components/TrustIcons';
import BookingModal from '../components/BookingModal';
import SecurityCostCalculator from '../components/SecurityCostCalculator';

/* ───────────────────────────────────────────────────────
   Animated Counter Component
─────────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', duration = 1400 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();
    const numTarget = parseInt(String(target).replace(/\D/g, ''), 10);
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

/* ───────────────────────────────────────────────────────
   Floating Particle Component
─────────────────────────────────────────────────────── */
function HeroParticles() {
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-brand-red"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animation: `heroFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAuditType, setSelectedAuditType] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const [servicesRef, servicesVisible] = useStaggerAnimation(8, { staggerMs: 90 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.1 });
  const [clientsContainerRef, clientsVisible] = useStaggerAnimation(8, { staggerMs: 80 });
  const [eventsRef, eventsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.15 });

  const services = [
    { icon: 'fa-user-shield', title: 'Security Guards', desc: 'Disciplined, vetted personnel for factories, corporate parks and compound security.', link: '/services' },
    { icon: 'fa-person-military-pointing', title: 'Bouncer Services', desc: 'Conflict-defusing specialists for clubs, VIP escorting and high-profile events.', link: '/services' },
    { icon: 'fa-users-gear', title: 'Corporate Services', desc: 'Executive front-desk security, visitor management, and corporate premise vigilance.', link: '/services' },
    { icon: 'fa-city', title: 'Society Maintenance', desc: 'Full-spectrum township protection, parking control, and boom barrier management.', link: '/services' },
    { icon: 'fa-broom', title: 'Housekeeping & Facility', desc: 'Professional housekeeping, premise hygiene, and turnkey facility management.', link: '/services' },
    { icon: 'fa-hotel', title: 'Hotel & Hospitalities', desc: 'Guest escorting, luggage surveillance, valet coordination for hotels & hospitals.', link: '/services' },
    { icon: 'fa-shield-dog', title: 'Manned Guards & Dog Squad', desc: 'Canine tracking squads paired with expert handlers for perimeter patrol.', link: '/services' },
    { icon: 'fa-fire-extinguisher', title: 'Fire Fighting & Safety', desc: 'Certified fire safety personnel, emergency drills, and active hazard monitoring.', link: '/services' },
  ];

  const clientHighlights = [
    { name: 'V-TECH WABAG PVT. LTD', location: 'Aundh, Pune', icon: 'fa-industry', badge: 'Industrial' },
    { name: 'KUNJIR BIO ENERGY', location: 'Mirawadi', icon: 'fa-bolt', badge: 'Renewable' },
    { name: 'ILFS KURDUWADI', location: 'Solapur', icon: 'fa-building-shield', badge: 'Infrastructure' },
    { name: 'POSHMATRIX HOSPITALITY', location: 'Hadapsar', icon: 'fa-champagne-glasses', badge: 'Hospitality' },
    { name: 'RENAULT (PPS) MOTORS', location: 'Baner & Wagholi', icon: 'fa-car', badge: 'Automobile' },
    { name: 'FORD (PPS) MOTORS', location: 'Satara Road & Kondhwa', icon: 'fa-car-side', badge: 'Automobile' },
    { name: 'DHONE FORD', location: 'Karvenagar / Warje', icon: 'fa-warehouse', badge: 'Automobile' },
    { name: 'SP DESIGN', location: 'Kurkumbh, Daund', icon: 'fa-compass-drafting', badge: 'Design Hub' },
  ];


  return (
    <div className="flex flex-col w-full">

      {/* ══════════════════════════════════════════
          HERO SECTION — Ultra Premium
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center pt-[78px] sm:pt-[84px] overflow-hidden bg-[#0a0a0c] tactical-grid"
        id="home"
      >
        {/* ─── Mobile Hero Background (Portrait, subtly softened) ─── */}
        <div className="lg:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/hero_bg_mobile.jpg"
            alt=""
            className="w-full h-full object-cover object-top filter blur-[0.5px] brightness-[0.45] contrast-[1.05]"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c]/55 to-[#0a0a0c]" />
          <div className="absolute inset-0 bg-[#0a0a0c]/20" />
        </div>

        {/* ─── Desktop Hero Background (16:9 Landscape Executive Security Guard) ─── */}
        <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/hero_bg_desktop.jpg"
            alt=""
            className="w-full h-full object-cover object-right-top filter brightness-[0.45] contrast-[1.1]"
          />
          {/* Horizontal gradient: deep black on text left, revealing guard on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent" />
          {/* Vertical smooth blends */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0c]/90 to-transparent" />
        </div>
        {/* Animated ambient blobs */}
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-brand-red/8 rounded-full blur-[120px] pointer-events-none animate-hero-float z-[2]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none z-[2]" style={{ animation: 'heroFloat 8s ease-in-out 2s infinite' }} />
        <div className="absolute top-1/2 -left-20 w-[300px] h-[300px] bg-red-800/5 rounded-full blur-[80px] pointer-events-none z-[2]" />

        {/* Floating particles */}
        <HeroParticles />

        {/* Scan line accent */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent pointer-events-none z-[2]"
          style={{ top: '60%', animation: 'scanLine 6s ease-in-out 1s infinite' }}
        />


        {/* Central spotlight aura behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24 lg:py-28 w-full flex flex-col items-center text-center space-y-7 sm:space-y-8">

          {/* Dynamic Live Status Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-brand-red/40 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-500 hover:scale-[1.02] cursor-default ${
              heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            <span className="font-heading font-bold tracking-wider uppercase text-brand-red text-[11px] sm:text-xs">
              Govt. PSARA Licensed
            </span>
            <span className="text-slate-600 font-bold select-none">•</span>
            <span className="font-medium tracking-wide text-slate-300 text-[11px] sm:text-xs">
              <span className="sm:hidden">Pune • Mumbai • All MH</span>
              <span className="hidden sm:inline">Pune • Mumbai • All Maharashtra</span>
            </span>
          </div>

          {/* Monumental Centered Headline with Dynamic Ambient Glow */}
          <div className="relative w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-32 sm:h-44 bg-brand-red/25 rounded-full blur-[70px] pointer-events-none" />
            <h1
              className={`relative font-heading font-black text-[clamp(2.85rem,12vw,3.75rem)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-white tracking-tight leading-[0.92] uppercase transition-all duration-800 ${
                heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              The Legend
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-500 drop-shadow-[0_0_35px_rgba(220,38,38,0.45)]">
                Security
              </span>
              <br />
              And Bouncer
            </h1>
          </div>

          {/* Shortened, Impactful Minimal Description */}
          <p
            className={`text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed transition-all duration-700 ${
              heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Government-licensed manned guarding &amp; executive bouncers across{' '}
            <span className="text-white font-medium">Pune, Mumbai &amp; All Maharashtra</span>.
          </p>

          {/* Trust & Credibility Strip */}
          <div
            className={`w-full flex justify-center transition-all duration-700 ${
              heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <HeroTrustStrip />
          </div>

          {/* Executive Action Row */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto transition-all duration-700 ${
              heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {/* Primary Action Button with Dynamic Glow */}
            <button
              type="button"
              onClick={() => {
                setSelectedAuditType('On-Site Vulnerability & Security Audit');
                setIsBookingModalOpen(true);
              }}
              className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-red via-red-600 to-brand-red bg-[length:200%_auto] hover:bg-right text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_4px_25px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_35px_rgba(220,38,38,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Schedule Security Audit</span>
              <i className="fa-solid fa-arrow-right text-[11px] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action Button with Frosted Glass */}
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/40 text-slate-100 font-heading font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-sm"
            >
              <i className="fa-solid fa-file-invoice text-brand-red text-xs" />
              <span>Request a Quote</span>
            </Link>
          </div>

          {/* Clean Executive Assurances */}
          <div
            className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-sans transition-all duration-700 ${
              heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '650ms' }}
          >
            <span className="flex items-center gap-2 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
              <span className="text-slate-300 group-hover:text-white transition-colors">Free On-Site Survey</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-2 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
              <span className="text-slate-300 group-hover:text-white transition-colors">PSARA Certified Officers</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-2 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red group-hover:scale-125 transition-transform" />
              <span className="text-slate-300 group-hover:text-white transition-colors">Rapid 24-Hour Deployment</span>
            </span>
          </div>

          {/* Dynamic Stats Row with Frosted Micro-Cards */}
          <div
            ref={statsRef}
            className={`pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl mx-auto transition-all duration-700 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            {[
              { val: '2018', label: 'Established', suffix: '' },
              { val: '500', label: 'Trained Force', suffix: '+', color: 'text-brand-red' },
              { val: '20', label: 'Enterprise Clients', suffix: '+' },
            ].map((s, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/30 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div
                  className={`font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white group-hover:scale-105 transition-transform duration-300 ${
                    s.color || ''
                  }`}
                >
                  {i === 0 ? s.val : (
                    <AnimatedCounter target={s.val} suffix={s.suffix} />
                  )}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mt-1 group-hover:text-slate-200 transition-colors">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full">
            <path d="M0 64L1440 64L1440 20C1200 60 960 0 720 0C480 0 240 60 0 20L0 64Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#f8fafc] text-slate-900 relative" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <ServiceSectionHeader />
            <div className="max-w-sm">
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
                From factories and commercial hubs to celebrity protection and residential townships.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-brand-red hover:text-brand-crimson font-heading font-bold text-xs uppercase tracking-wider transition-colors group">
                <span>View Full Catalog</span>
                <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Cards Grid with stagger */}
          <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {services.map((item, idx) => (
              <div
                key={idx}
                className={`card-premium-light bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:border-brand-red/30 flex flex-col justify-between transition-all duration-500 ${servicesVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <div>
                  <div className="w-13 h-13 w-14 h-14 rounded-xl bg-red-50 text-brand-red flex items-center justify-center text-2xl mb-5 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-brand-red transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <Link to={item.link} className="mt-5 inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-brand-red hover:translate-x-1 transition-transform duration-200 group">
                  <span>Details</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT SECTION
      ══════════════════════════════════════════ */}
      <section className="relative bg-white text-slate-900 overflow-hidden py-20 sm:py-28" id="about">
        {/* Decorative side accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-brand-red to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">

            {/* Image column — Editorial Showcase */}
            <div className={`lg:col-span-6 transition-all duration-800 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Primary Feature Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-slate-200/90 group">
                <img
                  src="/assets/squad_formation_ground.jpg"
                  alt="The Legend Security Squad"
                  className="w-full h-72 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-103"
                />
                {/* Subtle soft bottom shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Elegant White Floating Accreditation Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center text-sm font-bold shrink-0 border border-red-100 shadow-sm">
                      <i className="fa-solid fa-shield-halved" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-black text-xs uppercase tracking-wider text-slate-900 truncate">
                        Director: Mr. Mosin Azam Shaikh
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                        Govt. PSARA Licensed Agency • Est. 2018
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-200 shrink-0">
                    Verified Force
                  </span>
                </div>
              </div>

              {/* Supporting Curated Photos */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                  <img
                    src="/assets/guard_uniform_back.jpg"
                    alt="Official Uniform"
                    className="w-full h-36 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] font-heading font-bold text-white uppercase tracking-wider border border-white/10">
                      Uniform Standards
                    </span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                  <img
                    src="/assets/bouncers_event_lineup.jpg"
                    alt="Bouncer Lineup"
                    className="w-full h-36 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] font-heading font-bold text-white uppercase tracking-wider border border-white/10">
                      Bouncer Squad
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text column */}
            <div className={`lg:col-span-6 flex flex-col justify-center space-y-5 transition-all duration-800 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transitionDelay: '150ms' }}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[3px] bg-brand-red inline-block" />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">About The Company</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-slate-950 uppercase tracking-tight leading-tight">
                Quality Manpower &amp; <span className="text-brand-red">Allied Services Since 2018</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>THE LEGEND SECURITY AND BOUNCER</strong> was incorporated in <strong>2018</strong> to provide
                high quality security, executive bouncers, housekeeping, and allied manpower services
                across Maharashtra factories, establishments, and institutes.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Promoted by Director <strong>Mr. Mosin Azam Shaikh</strong>, who believes in quality, dedication,
                and hard work — the company engages trained and police-verified personnel deployed on
                8-hour and 12-hour shift schedules.
              </p>

              {/* Checklist with Trust Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { text: 'Govt. PSARA Licensed Agency', icon: <PsaraShieldIcon className="w-5 h-5" /> },
                  { text: '100% Background Verified Guards', icon: <PoliceVerifiedIcon className="w-5 h-5" /> },
                  { text: '24/7 Field Supervisory Audits', icon: <Supervision247Icon className="w-5 h-5" /> },
                  { text: 'Pune, Mumbai & All MH Network', icon: <LocationPinIcon className="w-5 h-5" /> },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold">
                    {feat.icon}
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-md shadow-red-600/25 btn-glow-red transition-all group"
                >
                  <span>Read Company Profile</span>
                  <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BANNER
      ══════════════════════════════════════════ */}
      <section className="py-14 bg-[#0a0a0c] border-y border-[#272930] relative overflow-hidden tactical-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-brand-red/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsBanner />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENTS & CELEBRATIONS SHOWCASE SECTION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#0c0d12] text-white relative overflow-hidden border-b border-[#272930]">
        {/* Ambient glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div ref={eventsRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[11px] font-mono text-brand-red font-bold uppercase tracking-wider">
                  WEDDINGS • BIRTHDAYS • CONCERTS • PRIVATE PARTIES
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
                SPECIAL EVENT BOUNCERS &amp; <span className="text-gradient-red">CELEBRATIONS</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                Hosting a royal Indian wedding (<strong className="text-slate-200">विवाह सोहळा</strong>), landmark birthday party, Dandiya night, or farmhouse soirée? We deploy vetted, suited bouncers, polite gatekeepers, and lady security guards across Maharashtra.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <Link
                to="/events"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-red-700 hover:brightness-110 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/40 transition-all"
              >
                <span>View All 8 Event Categories</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </div>
          </div>

          {/* 4 Feature Event Cards with Real Samsung S23 Indian Aesthetic Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Royal Weddings & Sangeet',
                marathi: 'भव्य विवाह व संगीत',
                desc: 'Mandap entry security, gift room vigil, baraat escort, and trained lady bouncers for bridal safety.',
                image: '/assets/events/indian_wedding_security.jpg',
                badge: 'WEDDINGS',
                squad: '6 to 15 Bouncers',
              },
              {
                title: 'Milestone Birthday Bashes',
                marathi: 'वाढदिवस व पार्टी संरक्षण',
                desc: 'Gatecrasher prevention, polite invitation checking, children safety, and family peace of mind.',
                image: '/assets/events/indian_birthday_security.jpg',
                badge: 'BIRTHDAYS',
                squad: '2 to 6 Bouncers',
              },
              {
                title: 'Concerts & Dandiya Utsav',
                marathi: 'महोत्सव व दांडिया',
                desc: 'Heavy-duty front barricade defense, backstage artist cordon, and metal detector entry portals.',
                image: '/assets/events/indian_concert_dandiya.jpg',
                badge: 'CONCERTS',
                squad: '15 to 80+ Bouncers',
              },
              {
                title: 'Celebrity Villa & Farmhouses',
                marathi: 'फार्महाऊस पार्ट्या',
                desc: 'Strict NDA privacy, anti-paparazzi protection, and pool parameter guards in Lonavala & Alibaug.',
                image: '/assets/events/indian_farmhouse_vip.jpg',
                badge: 'VIP FARMHOUSE',
                squad: '4 to 10 Bouncers',
              },
            ].map((ev, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-[#14151c] border border-[#272930] hover:border-brand-red/60 overflow-hidden shadow-xl hover:shadow-[0_12px_35px_rgba(229,9,20,0.18)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 overflow-hidden bg-black/40">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14151c] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-brand-red text-white uppercase tracking-wider">
                        {ev.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <p className="font-heading font-black text-sm text-white uppercase tracking-wide leading-tight">
                        {ev.title}
                      </p>
                      <p className="text-[10px] text-brand-red font-medium mt-0.5">
                        {ev.marathi}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ev.desc}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                      <span className="text-slate-500">Typical Squad:</span>
                      <span className="font-bold text-white">{ev.squad}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    to="/events"
                    className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-brand-red text-slate-200 hover:text-white font-heading font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Event Details &amp; Booking</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Callout Bottom Bar */}
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#161720] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0">
                <i className="fa-solid fa-user-shield text-base" />
              </div>
              <div>
                <p className="font-heading font-bold text-white uppercase">Need Bouncers for This Weekend?</p>
                <p className="text-xs text-slate-400">Emergency &amp; rapid dispatch available across Pune, PCMC, Mumbai &amp; Thane.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:+918806078677"
                className="px-4 py-2 rounded-xl bg-brand-red hover:bg-red-700 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-phone text-xs" />
                <span>+91 88060 78677</span>
              </a>
              <a
                href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20need%20event%20bouncers."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#f5f6f8] relative" id="clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[3px] bg-brand-red inline-block" />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Active Deployments</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight">
                Trusted Across Leading <span className="text-brand-red">Industrial & Auto Sites</span>
              </h2>
            </div>
            <Link to="/clients" className="text-brand-red font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:text-brand-crimson transition-colors group shrink-0">
              <span>View All 20 Clients</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div ref={clientsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {clientHighlights.map((c, idx) => (
              <div
                key={idx}
                className={`card-premium-light bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-red/30 flex flex-col justify-between transition-all duration-500 ${clientsVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 65}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-red-50 text-brand-red font-bold uppercase border border-red-100">
                      {c.badge}
                    </span>
                    <i className={`fa-solid ${c.icon} text-brand-red`} />
                  </div>
                  <h4 className="font-heading font-black text-xs uppercase text-slate-900 leading-snug">
                    {c.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-brand-red text-[10px]" />
                    {c.location}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ACTIVE DEPLOYMENT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MANPOWER & COST ESTIMATOR (ENTERPRISE TOOL)
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#08090c] text-white relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SecurityCostCalculator
            onBookAudit={(type) => {
              setSelectedAuditType(type);
              setIsBookingModalOpen(true);
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-[#0a0a0c] overflow-hidden border-t border-[#272930]" id="quote">
        {/* Dramatic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c] to-brand-red/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 diagonal-stripes pointer-events-none opacity-40" />

        <div ref={ctaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            <div className={`lg:col-span-8 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start transition-all duration-800 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[3px] bg-brand-red inline-block" />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Official Requisition</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
                Need Security, Bouncers or <span className="text-brand-red">Housekeeping?</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Direct quotation from management. We deploy certified supervisors, guards, bouncers,
                and facility staff on 8-hour and 12-hour shift routines across Maharashtra.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg shadow-red-700/30 btn-glow-red transition-all group"
                >
                  <span>Request Quotation</span>
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+918806078677" className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 border border-slate-600 hover:border-brand-red/60 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-xs">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Director Mosin Shaikh</p>
                    <p className="font-heading font-bold text-xs text-white group-hover:text-brand-red transition-colors">+91 88060 78677</p>
                  </div>
                </a>
                <a href="tel:+917860313601" className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 border border-slate-600 hover:border-brand-red/60 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">
                    <i className="fa-solid fa-headset" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Operations Helpline</p>
                    <p className="font-heading font-bold text-xs text-white group-hover:text-brand-red transition-colors">+91 78603 13601</p>
                  </div>
                </a>
                <a href="https://wa.me/918806078677" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 hover:border-emerald-500 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <i className="fa-brands fa-whatsapp text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">WhatsApp</p>
                    <p className="font-heading font-bold text-xs text-white group-hover:text-emerald-400 transition-colors">Chat With Director</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Branch Card */}
            <div className={`lg:col-span-4 flex justify-center lg:justify-end w-full transition-all duration-800 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}>
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl bg-[#121316] border border-brand-red/25 p-6 flex flex-col gap-3.5 shadow-2xl text-xs">
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl" />

                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(229,9,20,0.45)] shrink-0">
                    <img src="/assets/shield_logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.src = '/assets/real_logo.jpg'; }} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white uppercase text-xs">The Legend Security</h4>
                    <p className="text-[10px] text-brand-red font-semibold">Incorporated in 2018</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-slate-300">
                  {[
                    { label: '🏢 Main Branch', value: '857, Bhawani Peth, Near Bharat Talkies, Pune 411042' },
                    { label: '📍 Katraj Branch', value: 'Gujarwadi Rd, Bharat Nagar, Katraj, Pune 411046' },
                    { label: '🏙️ Mumbai Branch', value: 'Patel Society, Indira Nagar, Pathanwadi, Rani Sati Marg, Malad East, Mumbai 97' },
                  ].map((b, i) => (
                    <p key={i} className="leading-snug">
                      <strong className="text-white text-[11px]">{b.label}:</strong> <span className="text-slate-400">{b.value}</span>
                    </p>
                  ))}
                  <p className="text-emerald-400 text-[11px] pt-1">thelegendscrt16@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialType={selectedAuditType}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────── */

function ServiceSectionHeader() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-[3px] bg-brand-red inline-block" />
        <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Our Specialized Services</span>
      </div>
      <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight">
        Complete Protection & <span className="text-brand-red">Allied Solutions</span>
      </h2>
    </div>
  );
}

function StatsBanner() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

  const stats = [
    { icon: 'fa-stamp', val: 1, label: 'PSARA Govt License', suffix: '', prefix: '', note: 'Controlling Authority MH' },
    { icon: 'fa-users', val: 500, label: 'Trained Personnel', suffix: '+', prefix: '', note: 'Police Verified Staff' },
    { icon: 'fa-building', val: 20, label: 'Active Client Sites', suffix: '+', prefix: '', note: 'Industrial & Automobile' },
    { icon: 'fa-location-dot', val: 3, label: 'MH Branches', suffix: '', prefix: '', note: 'Bhawani Peth · Katraj · Malad (Mumbai)' },
    { icon: 'fa-calendar', val: 6, label: 'Years of Service', suffix: '+', prefix: '', note: 'Est. 2018' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`text-center transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <div className="w-10 h-10 rounded-xl bg-brand-red/15 text-brand-red flex items-center justify-center mx-auto mb-3">
            <i className={`fa-solid ${s.icon} text-sm`} />
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-white">
            {isVisible ? <AnimatedCounter target={s.val} suffix={s.suffix} /> : '0'}
          </div>
          <p className="font-heading font-bold text-[11px] uppercase tracking-wider text-slate-300 mt-1">{s.label}</p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{s.note}</p>
        </div>
      ))}
    </div>
  );
}
