import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import { PsaraShieldIcon, PoliceVerifiedIcon } from '../components/TrustIcons';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Mr. Mosin Azam Shaikh',
      role: 'Director & Founder',
      phone: '+91 88060 78677',
      initial: 'M',
      desc: 'Founded The Legend Security and Bouncer in 2018 with a commitment to quality, discipline, and uncompromising on-ground vigilance across Maharashtra.',
    },
    {
      name: 'Mr. Nazim Azam Shaikh',
      role: 'Operations & Management',
      phone: '+91 70582 67585',
      initial: 'N',
      desc: 'Oversees day-to-day deployment logistics, guard supervisor rosters, client coordination, and rapid replacement readiness across Western India.',
    },
  ];

  const branches = [
    {
      badge: 'HEAD OFFICE',
      city: 'Pune Head Office',
      icon: 'fa-building',
      address: 'Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Near Mahadev Mandir, Katraj, Pune 411046',
      contact: '+91 88060 78677 / 70582 67585',
      email: 'thelegendscrt16@gmail.com',
      accent: true,
    },
    {
      badge: '2ND BRANCH',
      city: 'Bhawani Peth Branch',
      icon: 'fa-building-shield',
      address: '857, Bhawani Peth, Near Bharat Talkies, Pune',
      contact: '+91 78603 13601',
      email: 'thelegendscrt16@gmail.com',
    },
    {
      badge: '3RD BRANCH',
      city: 'Palghar Branch',
      icon: 'fa-map-marker-alt',
      address: 'Station Road Commercial Node, Nalasopara East, Palghar District, Maharashtra',
      contact: '+91 88060 78677',
      email: 'thelegendscrt16@gmail.com',
    },
  ];

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [metricsRef, metricsContainerVisible] = useStaggerAnimation(3, { staggerMs: 150 });
  const [introRef, introVisible] = useScrollAnimation({ threshold: 0.1 });
  const [licenseRef, licenseVisible] = useScrollAnimation({ threshold: 0.1 });
  const [leaderRef, leaderVisible] = useStaggerAnimation(2, { staggerMs: 150 });
  const [branchRef, branchVisible] = useStaggerAnimation(3, { staggerMs: 120 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });

  const psaraPoints = [
    { customIcon: <PsaraShieldIcon className="w-6 h-6" />, title: 'PSARA 2005 State License', sub: 'Serial No.: PSA/L/50/MH/2026/JULI/6495', desc: 'Granted by the Controlling Authority of the Government of Maharashtra to engage in Private Security across the entire State.' },
    { icon: 'fa-file-shield', title: 'Shop & Establishment Registration', sub: 'Receipt No.: 2731000318422972', desc: 'Registered under the Maharashtra Shops and Commercial Establishments Act for full business transparency and labor compliance.' },
    { customIcon: <PoliceVerifiedIcon className="w-6 h-6" />, title: '100% Labor Law Compliance', sub: 'Zero Liability for Clients', desc: 'Complete PF, ESIC, Minimum Wages compliance and verified criminal background screening for every deployed personnel.' },
  ];

  return (
    <div className="flex flex-col w-full">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative w-full bg-[#0a0a0c] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid">
        {/* Ambient glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-red/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-900/8 rounded-full blur-[80px] pointer-events-none" />

        <div ref={heroRef} className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-6 font-mono font-bold transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">About Us</span>
          </nav>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/25 mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">ESTABLISHED IN 2018 | PUNE • MUMBAI • ALL OVER MAHARASHTRA</span>
          </div>

          <h1 className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-wide max-w-4xl leading-tight transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            THE LEGEND <span className="text-gradient-red">SECURITY AND BOUNCER</span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mt-5 mb-10 leading-relaxed transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            A professionally managed security and allied manpower company incorporated in 2018 to execute dependable Security, Firefighting, Investigation, Bouncers, and Housekeeping solutions across <strong>Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>

          {/* Quick Metrics */}
          <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl">
            {[
              { val: '2018', label: 'Year of Incorporation', sub: 'Est. Pune, MH' },
              { val: '500+', label: 'Trained & Vetted Personnel', sub: 'Police Verified', accent: true },
              { val: 'Pune · Mumbai · All MH', label: 'Statewide Service Coverage', sub: 'Permanent Hubs & Desks' },
            ].map((m, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border shadow-xl flex flex-col items-center text-center transition-all duration-600 ${metricsContainerVisible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${m.accent ? 'bg-brand-red/10 border-brand-red/30' : 'bg-[#1a1b21] border-[#2a2b32]'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className={`font-heading font-black text-3xl sm:text-4xl ${m.accent ? 'text-brand-red' : 'text-white'}`}>{m.val}</span>
                <p className="text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mt-1.5">{m.label}</p>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ COMPANY INTRODUCTION ══════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-12">
        <div ref={introRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Photo collage */}
          <div className={`lg:col-span-5 relative space-y-4 transition-all duration-800 ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 img-zoom-wrap">
              <img src="/assets/squad_formation_ground.jpg" alt="Security Squad" className="w-full h-72 sm:h-96 object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 img-zoom-wrap">
                <img src="/assets/guard_uniform_back.jpg" alt="Guard Uniform" className="w-full h-40 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 img-zoom-wrap">
                <img src="/assets/bouncers_event_lineup.jpg" alt="Bouncer Lineup" className="w-full h-40 object-cover" />
              </div>
            </div>
          </div>

          {/* Letter from management */}
          <div className={`lg:col-span-7 flex flex-col justify-center space-y-5 transition-all duration-800 ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '150ms' }}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-[3px] bg-brand-red inline-block" />
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Official Introduction</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight leading-tight">
              Letter from Management
            </h2>

            <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4 text-slate-700 text-sm leading-relaxed overflow-hidden">
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-6 font-serif text-8xl text-brand-red/8 select-none leading-none">"</div>

              <p><strong>Dear Sir / Madam,</strong><br />
                We introduce ourselves as one of the upcoming and professionally managed security Services Company in the field of manpower supply and service Industry.
              </p>
              <p>
                <strong>THE LEGEND SECURITY AND BOUNCER</strong> was incorporated in the year <strong>2018</strong> to provide high quality Security and other allied services. Director himself <strong>Mr. MOSIN AZAM SHAIKH</strong> who believe in quality and hard work, promoted this company.
              </p>
              <p>
                The Company is committed to provide high quality services developed through own Research and study the most satisfactory services to customers. Company continues to undertake and execute Security, Firefighting, Investigation, Bouncer and Housekeeping Services to Factories, Establishments and Institutes by engaging trained and qualified personnel.
              </p>
              <p className="font-mono text-xs text-brand-red font-bold pt-2 border-t border-slate-100">
                📧 thelegendscrt16@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PSARA LICENSE ══════════════ */}
      <section className="w-full bg-[#0f1014] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#272930]">
        <div ref={licenseRef} className="max-w-7xl mx-auto">
          <div className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${licenseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">GOVERNMENT OF MAHARASHTRA</span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-white mt-2">
              PSARA License & Statutory Accreditation
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Fully verified and licensed under the Private Security Agencies (Regulation) Act, 2005.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* License image */}
            <div className={`lg:col-span-4 flex justify-center transition-all duration-800 ${licenseVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '150ms' }}>
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-red/40 shadow-[0_0_50px_rgba(229,9,20,0.15)] max-w-xs w-full group img-zoom-wrap">
                <img
                  src="/assets/psara_license_certificate.jpg"
                  alt="Official PSARA License Certificate"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-black/90 backdrop-blur-sm border-t border-brand-red/30 text-center">
                  <p className="font-mono text-xs text-white font-bold">PSA/L/50/MH/2026/JULI/6495</p>
                  <p className="text-[10px] text-brand-red font-semibold uppercase mt-0.5">Controlling Authority Maharashtra</p>
                </div>
              </div>
            </div>

            {/* License points */}
            <div className="lg:col-span-8 space-y-5">
              {psaraPoints.map((pt, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl bg-[#1a1b21] border border-[#2a2b32] hover:border-brand-red/30 transition-all duration-600 card-premium ${licenseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-red/15 text-brand-red flex items-center justify-center text-lg shrink-0">
                      {pt.customIcon ? pt.customIcon : <i className={`fa-solid ${pt.icon}`} />}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-base uppercase text-white">{pt.title}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5 mb-2">{pt.sub}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ LEADERSHIP ══════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">MANAGEMENT & PROMOTERS</span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-slate-950 mt-1">Leadership Team</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Dedicated founders driving field supervision and personalized client support.</p>
          </div>

          <div ref={leaderRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className={`card-premium-light p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col justify-between transition-all duration-700 ${leaderVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Avatar with initial */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-[#1a1b21] text-brand-red flex items-center justify-center text-2xl font-heading font-black border border-slate-800">
                        {leader.initial}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <i className="fa-solid fa-check text-white text-[8px]" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-red-50 text-brand-red font-bold uppercase border border-red-100">
                      Executive
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-slate-950 uppercase mb-1">{leader.name}</h3>
                  <p className="text-xs font-heading font-bold text-brand-red uppercase tracking-wider mb-4">{leader.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{leader.desc}</p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
                  <a href={`tel:${leader.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-heading font-bold text-slate-800 hover:text-brand-red transition-colors flex items-center gap-2 group">
                    <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red transition-colors">
                      <i className="fa-solid fa-phone text-brand-red text-[9px] group-hover:text-white transition-colors" />
                    </div>
                    {leader.phone}
                  </a>
                  <a href={`https://wa.me/${leader.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                    <i className="fa-brands fa-whatsapp text-sm" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BRANCHES ══════════════ */}
      <section className="w-full bg-[#0f1014] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#272930]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">STATEWIDE REACH</span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-white mt-1">Regional Branch Network</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              Permanent offices across key Maharashtra districts ensuring fast on-site guard deployment.
            </p>
          </div>

          <div ref={branchRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {branches.map((b, idx) => (
              <div
                key={idx}
                className={`card-premium relative p-7 sm:p-8 rounded-3xl border shadow-2xl flex flex-col justify-between transition-all duration-700 ${branchVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${b.accent ? 'bg-gradient-to-b from-[#1e1f25] to-[#16171d] border-brand-red/30' : 'bg-[#1a1b21] border-[#2a2b32] hover:border-brand-red/20'}`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                {b.accent && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent rounded-t-3xl" />}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] font-bold text-brand-red uppercase tracking-wider">{b.badge}</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      ACTIVE
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-brand-red/15 text-brand-red flex items-center justify-center mb-4">
                    <i className={`fa-solid ${b.icon}`} />
                  </div>

                  <h3 className="font-heading font-black text-xl uppercase text-white mb-3">{b.city}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{b.address}</p>
                </div>

                <div className="pt-4 border-t border-white/8 space-y-2 text-xs">
                  <p className="text-slate-400"><strong className="text-white">Phone:</strong> {b.contact}</p>
                  <p className="text-slate-400 font-mono text-[11px]"><strong className="text-white">Email:</strong> {b.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section ref={ctaRef} className="w-full bg-gradient-to-r from-brand-red via-red-700 to-brand-red py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 diagonal-stripes opacity-20 pointer-events-none" />
        <div className={`max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white">Connect With Management</h3>
            <p className="text-sm text-white/85 mt-1">Contact Director Mosin Shaikh directly for site inspection and guard deployment.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/book-appointment"
              className="px-6 py-3.5 rounded-xl bg-white text-brand-red font-heading font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-2xl whitespace-nowrap flex items-center gap-2"
            >
              <i className="fa-solid fa-calendar-check" />
              <span>Schedule Site Survey</span>
            </Link>
            <a
              href="tel:+918806078677"
              className="px-6 py-3.5 rounded-xl bg-black/40 border border-white/30 text-white font-heading font-black text-xs uppercase tracking-wider hover:bg-black/60 transition-all shadow-2xl whitespace-nowrap flex items-center gap-2"
              title="Director Mosin Shaikh"
            >
              <i className="fa-solid fa-phone" />
              <span>+91 88060 78677</span>
            </a>
            <a
              href="tel:+917860313601"
              className="px-6 py-3.5 rounded-xl bg-black/40 border border-white/30 text-white font-heading font-black text-xs uppercase tracking-wider hover:bg-black/60 transition-all shadow-2xl whitespace-nowrap flex items-center gap-2"
              title="Operations 24/7"
            >
              <i className="fa-solid fa-headset" />
              <span>+91 78603 13601</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
