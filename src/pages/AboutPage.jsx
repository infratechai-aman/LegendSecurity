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
      name: 'Mr. Shahid Shaikh',
      role: 'Operations & Management',
      phone: '+91 89758 66597',
      initial: 'S',
      desc: 'Oversees day-to-day deployment logistics, guard supervisor rosters, client coordination, and rapid replacement readiness across Western India.',
    },
  ];

  const branches = [
    {
      badge: 'MAIN BRANCH',
      city: 'Bhawani Peth (Main Branch)',
      icon: 'fa-building',
      address: '857, Bhawani Peth, Near Bharat Talkies, Pune 411042',
      contact: '+91 88060 78677 / 89758 66597',
      email: 'thelegendscrt16@gmail.com',
      accent: true,
    },
    {
      badge: 'KATRAJ BRANCH',
      city: 'Katraj Branch',
      icon: 'fa-building-shield',
      address: 'Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Near Mahadev Mandir, Katraj, Pune 411046',
      contact: '+91 78603 13601',
      email: 'thelegendscrt16@gmail.com',
    },
    {
      badge: 'MUMBAI BRANCH',
      city: 'Malad East (Mumbai Branch)',
      icon: 'fa-city',
      address: 'Patel Society, Indira Nagar, Pathanwadi, Rani Sati Marg, Malad East, Mumbai 97',
      contact: '+91 88060 78677 / 89758 66597',
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
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-5 text-slate-400 font-medium transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">About Us</span>
          </nav>

          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs text-slate-300 font-medium tracking-wide">Established 2018 • Pune, Mumbai &amp; All Maharashtra</span>
          </div>

          <h1 className={`font-heading font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-4xl leading-tight transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            The Legend <span className="text-gradient-red">Security &amp; Bouncers</span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mt-4 mb-9 font-light leading-relaxed transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            A professionally managed security and allied manpower organization incorporated in 2018 to execute dependable Security, Firefighting, Investigation, Bouncers, and Housekeeping solutions across <strong className="text-white font-medium">Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>

          {/* Quick Metrics */}
          <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 w-full max-w-3xl">
            {[
              { val: '2018', label: 'Year of Incorporation', sub: 'Est. Pune, Maharashtra' },
              { val: '500+', label: 'Trained Personnel', sub: 'Police & Background Verified', accent: true },
              { val: 'Statewide', label: 'Service Coverage', sub: 'Pune · Mumbai · All Maharashtra' },
            ].map((m, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all duration-600 flex flex-col items-center text-center ${metricsContainerVisible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${m.accent ? 'bg-brand-red/10 border-brand-red/30 shadow-lg shadow-red-950/20' : 'bg-white/[0.03] border-white/10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className={`font-heading font-bold text-3xl sm:text-4xl ${m.accent ? 'text-brand-red' : 'text-white'}`}>{m.val}</span>
                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-slate-300 mt-1">{m.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-light">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ COMPANY INTRODUCTION ══════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
        <div ref={introRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Photo collage */}
          <div className={`lg:col-span-5 relative space-y-4 transition-all duration-800 ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 img-zoom-wrap">
              <img src="/assets/squad_formation_ground.jpg" alt="Security Squad" className="w-full h-72 sm:h-96 object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 img-zoom-wrap">
                <img src="/assets/guard_uniform_back.jpg" alt="Guard Uniform" className="w-full h-40 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 img-zoom-wrap">
                <img src="/assets/bouncers_event_lineup.jpg" alt="Bouncer Lineup" className="w-full h-40 object-cover" />
              </div>
            </div>
          </div>

          {/* Letter from management */}
          <div className={`lg:col-span-7 flex flex-col justify-center space-y-5 transition-all duration-800 ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '150ms' }}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-brand-red inline-block" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">Official Introduction</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
              Letter from Management
            </h2>

            <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-600 text-sm leading-relaxed overflow-hidden font-light">
              <p><strong className="text-slate-900 font-semibold">Dear Sir / Madam,</strong><br />
                We introduce ourselves as one of the leading and professionally managed security services organizations in the manpower and executive protection sector.
              </p>
              <p>
                <strong className="text-slate-900 font-semibold">The Legend Security and Bouncer</strong> was established in 2018 with a dedication to discipline, integrity, and proactive on-ground vigilance. Promoted by Founder &amp; Director <strong className="text-slate-900 font-semibold">Mr. Mosin Azam Shaikh</strong>, who maintains direct oversight across all client deployments.
              </p>
              <p>
                Our company provides end-to-end security, VIP bouncer protection, corporate event cordons, industrial guarding, firefighting readiness, and facility housekeeping across commercial and residential premises.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-normal">
                <span>Direct Contact: +91 88060 78677</span>
                <span className="text-brand-red font-medium">thelegendscrt16@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PSARA LICENSE ══════════════ */}
      <section className="w-full bg-[#0a0a0d] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-white/10">
        <div ref={licenseRef} className="max-w-7xl mx-auto">
          <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${licenseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">Government of Maharashtra</span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight mt-1">
              PSARA License &amp; Accreditation
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-light">
              Fully verified and licensed under the Private Security Agencies (Regulation) Act, 2005.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* License image */}
            <div className={`lg:col-span-4 flex justify-center transition-all duration-800 ${licenseVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '150ms' }}>
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-xl max-w-xs w-full group img-zoom-wrap">
                <img
                  src="/assets/psara_license_certificate.jpg"
                  alt="Official PSARA License Certificate"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-3.5 bg-black/85 backdrop-blur-sm border-t border-white/10 text-center">
                  <p className="text-xs text-white font-semibold">PSA/L/50/MH/2026/JULI/6495</p>
                  <p className="text-[10px] text-amber-200/90 font-medium uppercase mt-0.5">Controlling Authority Maharashtra</p>
                </div>
              </div>
            </div>

            {/* License points */}
            <div className="lg:col-span-8 space-y-4">
              {psaraPoints.map((pt, i) => (
                <div
                  key={i}
                  className={`p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-600 ${licenseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/15 text-brand-red flex items-center justify-center text-base shrink-0">
                      {pt.customIcon ? pt.customIcon : <i className={`fa-solid ${pt.icon}`} />}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-white">{pt.title}</h3>
                      <p className="text-xs text-amber-200/80 mt-0.5 mb-1.5 font-light">{pt.sub}</p>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">{pt.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ LEADERSHIP ══════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">Management &amp; Leadership</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">Leadership Team</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">Dedicated founders driving field supervision and personalized client support.</p>
          </div>

          <div ref={leaderRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 max-w-4xl mx-auto">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md flex flex-col justify-between transition-all duration-700 ${leaderVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Avatar with initial */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-brand-red flex items-center justify-center text-xl font-heading font-bold">
                        {leader.initial}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <i className="fa-solid fa-check text-white text-[7px]" />
                      </div>
                    </div>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                      Executive
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 mb-0.5">{leader.name}</h3>
                  <p className="text-xs font-medium text-brand-red uppercase tracking-wider mb-3">{leader.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{leader.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
                  <a href={`tel:${leader.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-medium text-slate-800 hover:text-brand-red transition-colors flex items-center gap-2 group">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-brand-red transition-colors">
                      <i className="fa-solid fa-phone text-brand-red text-[9px] group-hover:text-white transition-colors" />
                    </div>
                    {leader.phone}
                  </a>
                  <a href={`https://wa.me/${leader.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
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
      <section className="w-full bg-[#0a0a0d] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
            <div>
              <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">Statewide Presence</span>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight mt-1">Regional Branch Network</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md font-light">
              Permanent offices across key Maharashtra districts ensuring fast on-site guard deployment.
            </p>
          </div>

          <div ref={branchRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {branches.map((b, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-700 flex flex-col justify-between ${branchVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${b.accent ? 'bg-white/[0.04] border-brand-red/40 shadow-lg' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold text-brand-red uppercase tracking-wider">{b.badge}</span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-brand-red/15 text-brand-red flex items-center justify-center mb-3">
                    <i className={`fa-solid ${b.icon} text-sm`} />
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-white mb-2">{b.city}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5 font-light">{b.address}</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <p className="text-slate-400"><strong className="text-white font-medium">Phone:</strong> {b.contact}</p>
                  <p className="text-slate-400"><strong className="text-white font-medium">Email:</strong> {b.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section ref={ctaRef} className="w-full bg-[#0d0e12] py-14 sm:py-18 px-4 sm:px-6 lg:px-12 text-center sm:text-left">
        <div className={`max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">Connect With Management</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">Contact Director Mosin Shaikh directly for site inspection and guard deployment.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/book-appointment"
              className="px-5 py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-950/40 whitespace-nowrap flex items-center gap-2"
            >
              <i className="fa-solid fa-calendar-check" />
              <span>Schedule Site Survey</span>
            </Link>
            <a
              href="tel:+918806078677"
              className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-heading font-semibold text-xs tracking-wider transition-all whitespace-nowrap flex items-center gap-2"
              title="Director Mosin Shaikh"
            >
              <i className="fa-solid fa-phone text-brand-red text-xs" />
              <span>+91 88060 78677</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
