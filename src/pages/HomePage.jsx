import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

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

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const [servicesRef, servicesVisible] = useStaggerAnimation(8, { staggerMs: 90 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.1 });
  const [clientsContainerRef, clientsVisible] = useStaggerAnimation(8, { staggerMs: 80 });
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
        className="relative min-h-screen flex items-center pt-[72px] overflow-hidden bg-[#0a0a0c] tactical-grid"
        id="home"
      >
        {/* ── Real Squad Event Atmosphere (Peak Blur & Left Blend into Original BG) ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Panoramic Squad Event Image with Peak Blur — Zero Faces Recognizable, Rich Ambient Design */}
          <img
            src="/assets/hero_squad_panorama.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] filter blur-[32px] sm:blur-[38px] lg:blur-[42px] brightness-[0.72] contrast-110 opacity-35 sm:opacity-45"
            style={{ transform: 'scale(1.2)' }}
          />

          {/* Left Side Blend into Original #0a0a0c Background (Protects Text Column with Pure Background) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/95 via-[48%] to-transparent z-[1]" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#0a0a0c] to-[#0a0a0c]/60 z-[1]" />

          {/* Mobile Blend into Original #0a0a0c Background (Protects Top Mobile Text) */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/90 via-[52%] to-[#0a0a0c]/40 z-[1]" />

          {/* Top & Bottom Seamless Edge Bleed into Page Background */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0a0a0c] to-transparent z-[1]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-transparent z-[1]" />

          {/* Subtle Multiply Tint to Maintain Tactical Dark Aesthetic */}
          <div className="absolute inset-0 bg-[#0a0a0c]/30 mix-blend-multiply z-[1]" />
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* ── Left Content Column ── */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 z-10">

              {/* Minimalist Editorial Eyebrow */}
              <div
                className={`flex items-center justify-center lg:justify-start gap-2.5 text-xs transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-[2px] bg-brand-red inline-block" />
                  <span className="font-heading font-black tracking-[0.2em] uppercase text-brand-red text-[11px] sm:text-xs">
                    Govt. PSARA Licensed
                  </span>
                </div>
                <span className="text-slate-600 font-bold">•</span>
                <span className="font-heading font-semibold tracking-wider text-slate-400 text-[11px] sm:text-xs uppercase">
                  <span className="sm:hidden">Pune • Mumbai • All MH</span>
                  <span className="hidden sm:inline">Pune • Mumbai • All Maharashtra</span>
                </span>
              </div>

              {/* Main Headline — Massive, High-Impact & Dominant on Mobile */}
              <h1
                className={`font-heading font-black text-[2.85rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.94] uppercase transition-all duration-800 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '300ms' }}
              >
                The Legend
                <br />
                <span className="text-gradient-red">Security</span>
                <br />
                And Bouncer
              </h1>

              {/* Description — Refined, Readable & Distinctly Secondary */}
              <p
                className={`text-slate-400 text-xs sm:text-sm md:text-base max-w-lg font-normal leading-relaxed transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '450ms' }}
              >
                Incorporated in <span className="text-slate-200 font-medium">2018</span> under Director{' '}
                <span className="text-slate-200 font-medium">Mr. Mosin Azam Shaikh</span> — delivering licensed manned guarding,
                executive bouncers, facility management, and manpower solutions across{' '}
                <span className="text-slate-200 font-medium">Pune, Mumbai, and All Over Maharashtra</span>.
              </p>

              {/* Trust & Credibility Strip — Minimalist, Unboxed & Sleek Replacement */}
              <div
                className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-3.5 sm:gap-x-4 gap-y-2 text-xs sm:text-[13px] text-slate-300 font-medium py-1 transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '550ms' }}
              >
                <div className="inline-flex items-center gap-1.5 text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                  <span className="tracking-wide">PSARA Licensed</span>
                </div>
                <span className="text-slate-700 select-none">•</span>
                <div className="inline-flex items-center gap-1.5 text-slate-200">
                  <i className="fa-solid fa-shield-halved text-emerald-400 text-xs" />
                  <span className="tracking-wide">Police Verified</span>
                </div>
                <span className="text-slate-700 select-none">•</span>
                <div className="inline-flex items-center gap-1.5 text-slate-200">
                  <i className="fa-solid fa-clock text-brand-red text-xs" />
                  <span className="tracking-wide">24/7 Field Supervision</span>
                </div>
                <span className="text-slate-700 hidden sm:inline select-none">•</span>
                <div className="inline-flex items-center gap-1.5 text-slate-200">
                  <i className="fa-solid fa-location-dot text-brand-red text-xs" />
                  <span className="tracking-wide">Pune • Mumbai • All MH</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '650ms' }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-red-700/30 btn-glow-red transition-all duration-300 group"
                >
                  <span>Explore Services</span>
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/5 border border-slate-600/80 hover:border-brand-red text-white font-heading font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all duration-300 hover:bg-white/10 group"
                >
                  <i className="fa-solid fa-file-invoice text-brand-red" />
                  <span>Request A Quote</span>
                </Link>
              </div>

              {/* Stats Row */}
              <div
                ref={statsRef}
                className={`pt-6 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-md mx-auto lg:mx-0 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {[
                  { val: '2018', label: 'Established', suffix: '' },
                  { val: '500', label: 'Trained Staff', suffix: '+', color: 'text-brand-red' },
                  { val: '20', label: 'Major Clients', suffix: '+' },
                ].map((s, i) => (
                  <div key={i} className={`text-center lg:text-left ${i > 0 ? 'border-l border-white/10 pl-4 sm:pl-8' : ''}`}>
                    <div className={`font-heading font-black text-2xl sm:text-3xl text-white ${s.color || ''}`}>
                      {i === 0 ? s.val : (
                        <><AnimatedCounter target={s.val} suffix={s.suffix} /></>
                      )}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Visual Column — Cinematic & Seamlessly Blended ── */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end w-full">
              {/* Ambient radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[460px] sm:h-[460px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

              {/* Seamless Hero Squad Showcase */}
              <div
                className={`relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl transition-all duration-1000 ${
                  heroReady ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Blended Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                  <img
                    src="/assets/squad_formation_ground.jpg"
                    alt="The Legend Security & Bouncer Squad Formation"
                    className="w-full h-[420px] sm:h-[500px] lg:h-[540px] object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-102"
                  />

                  {/* Seamless edge blend into deep dark background (#0a0a0c) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/20 pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#0a0a0c]/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#0a0a0c]/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/85 to-transparent pointer-events-none" />

                  {/* Clean, Non-AI Floating Identity Plate */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-2xl bg-[#0e0f14]/85 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-brand-red/60 bg-black p-0.5 shrink-0 shadow-md">
                        <img src="/assets/real_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-black text-sm uppercase text-white tracking-wider leading-tight truncate">
                          The Legend Security Squad
                        </h3>
                        <p className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
                          Director Mr. Mosin Azam Shaikh • Est. 2018
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end shrink-0 pl-3 border-l border-white/10">
                      <span className="text-[10px] font-heading font-black uppercase text-brand-red tracking-wider">
                        Govt. Licensed
                      </span>
                      <span className="text-[10px] font-mono text-slate-300">
                        PSA/L/50/MH/2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Govt. PSARA Licensed Agency',
                  '100% Background Verified Guards',
                  '24/7 Field Supervisory Audits',
                  '3 Regional Branches in MH',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold">
                    <div className="w-5 h-5 rounded-full bg-brand-red/15 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-check text-brand-red text-[10px]" />
                    </div>
                    {feat}
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
          CLIENTS SECTION
      ══════════════════════════════════════════ */}
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
                <a href="tel:+918806078777" className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 border border-slate-600 hover:border-brand-red/60 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-xs">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Director Mosin Shaikh</p>
                    <p className="font-heading font-bold text-xs text-white group-hover:text-brand-red transition-colors">+91 88060 78777</p>
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
                <a href="https://wa.me/918806078777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 hover:border-emerald-500 transition-all group">
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
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-brand-red p-0.5 shrink-0">
                    <img src="/assets/real_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white uppercase text-xs">The Legend Security</h4>
                    <p className="text-[10px] text-brand-red font-semibold">Incorporated in 2018</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-slate-300">
                  {[
                    { label: '🏢 Pune HQ', value: 'Gujarwadi Rd, Bharat Nagar, Katraj, Pune 411046' },
                    { label: '🏙 Mumbai', value: 'Patel Society, Malad East, Mumbai 400097' },
                    { label: '🌐 Palghar', value: 'Nalasopara East, Palghar Dist.' },
                  ].map((b, i) => (
                    <p key={i} className="leading-snug">
                      <strong className="text-white text-[11px]">{b.label}:</strong> <span className="text-slate-400">{b.value}</span>
                    </p>
                  ))}
                  <p className="font-mono text-emerald-400 text-[11px] pt-1">thelegendscrt16@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    { icon: 'fa-location-dot', val: 3, label: 'MH Branches', suffix: '', prefix: '', note: 'Pune · Mumbai · Palghar' },
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
