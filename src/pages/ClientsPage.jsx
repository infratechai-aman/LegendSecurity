import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Clients (20)', icon: 'fa-list' },
    { id: 'industrial', label: 'Industrial (10)', icon: 'fa-industry' },
    { id: 'automobile', label: 'Automobile (10)', icon: 'fa-car' },
  ];

  const industrialClients = [
    { sr: 1, name: 'V-TECH WABAG PVT. LTD', location: 'Aundh, Pune', category: 'Security', type: 'industrial', icon: 'fa-industry' },
    { sr: 2, name: 'KUNJIR BIO ENERGY (KBIPIL)', location: 'Mirawadi', category: 'Security', type: 'industrial', icon: 'fa-bolt' },
    { sr: 3, name: 'ILFS KURDUWADI', location: 'Solapur', category: 'Security', type: 'industrial', icon: 'fa-building-shield' },
    { sr: 4, name: 'POSHMATRIX HOSPITALITY', location: 'Hadapsar', category: 'Bouncer', type: 'industrial', icon: 'fa-champagne-glasses' },
    { sr: 5, name: 'SP DESIGN', location: 'Kurkumbh, Daund', category: 'Security & Housekeeping', type: 'industrial', icon: 'fa-compass-drafting' },
    { sr: 6, name: 'AURANGABAD DISTILLERY LTD', location: 'Indapur', category: 'Security', type: 'industrial', icon: 'fa-wine-bottle' },
    { sr: 7, name: 'KARGIL UNIT (SHIVAM MARKETING INDIA LTD)', location: 'Handewadi', category: 'Security', type: 'industrial', icon: 'fa-boxes-stacked' },
    { sr: 8, name: 'METACHEM', location: 'Kurkumbh', category: 'Security', type: 'industrial', icon: 'fa-flask' },
    { sr: 9, name: 'ACCORD ENGINEERING', location: 'Hinjawadi', category: 'Security', type: 'industrial', icon: 'fa-gears' },
    { sr: 10, name: 'SYNERGETIC (AUTOMATION)', location: 'Shindewadi', category: 'Security', type: 'industrial', icon: 'fa-robot' },
  ];

  const automobileClients = [
    { sr: 1, name: 'RENAULT (PPS) MOTORS PVT LTD', location: 'Baner, Pune', category: 'Security', type: 'automobile', icon: 'fa-car' },
    { sr: 2, name: 'RENAULT (PPS) MOTORS PVT LTD', location: 'Mharunje', category: 'Security', type: 'automobile', icon: 'fa-car' },
    { sr: 3, name: 'RENAULT (PPS) MOTORS PVT LTD', location: 'Wagholi', category: 'Security', type: 'automobile', icon: 'fa-car' },
    { sr: 4, name: 'RENAULT (AUTOMOTIVE RETAILERS)', location: 'Nighoje', category: 'Security', type: 'automobile', icon: 'fa-car-side' },
    { sr: 5, name: 'FORD (PPS) MOTORS PVT LTD', location: 'Satara Road, Pune', category: 'Security', type: 'automobile', icon: 'fa-car-side' },
    { sr: 6, name: 'FORD (PPS) MOTORS PVT LTD', location: 'Kondhwa, Pune', category: 'Security', type: 'automobile', icon: 'fa-car-side' },
    { sr: 7, name: 'DHONE FORD', location: 'Karvenagar / Warje', category: 'Security', type: 'automobile', icon: 'fa-warehouse' },
    { sr: 8, name: 'VIDYUT MOTORS', location: 'Corporation Rd, Pune', category: 'Security', type: 'automobile', icon: 'fa-bolt' },
    { sr: 9, name: 'MEERA HYUNDAI', location: 'Warje / Shivane / Pirangut', category: 'Security', type: 'automobile', icon: 'fa-car' },
    { sr: 10, name: 'CITROEN PPS MOTORS', location: 'Mumbai', category: 'Security', type: 'automobile', icon: 'fa-car' },
  ];

  const allClients = [...industrialClients, ...automobileClients];
  const displayedClients = activeTab === 'all' ? allClients : activeTab === 'industrial' ? industrialClients : automobileClients;

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useStaggerAnimation(displayedClients.length, { staggerMs: 50 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="flex flex-col w-full">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative w-full bg-[#0a0a0c] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid pt-28">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-red/6 rounded-full blur-[100px] pointer-events-none" />

        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-5 text-slate-400 font-medium transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Our Clients</span>
          </nav>

          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium tracking-wide">Verified Clientele • Pune, Mumbai &amp; All Maharashtra</span>
          </div>

          <h1 className={`font-heading font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-4xl leading-tight mb-5 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            Our Esteemed <span className="text-gradient-red">Clientele</span>
          </h1>

          <p className={`text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8 font-light transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            Providing reliable security guards, bouncers, and facility management across major industrial plants and automotive dealerships in <strong className="text-white font-medium">Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>

          {/* Stats pills */}
          <div className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            {[
              { icon: 'fa-industry', label: '10 Industrial Sites' },
              { icon: 'fa-car', label: '10 Automobile Sites' },
              { icon: 'fa-shield-halved', label: '100% Active Deployments' },
            ].map((pill, i) => (
              <div key={i} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-slate-300 font-medium">
                <i className={`fa-solid ${pill.icon} text-brand-red text-xs`} />
                {pill.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FILTER TABS ══════════════ */}
      <div className="w-full bg-white/95 border-b border-slate-200 sticky top-[72px] z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-heading font-semibold text-xs tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <i className={`fa-solid ${tab.icon} text-[10px]`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ CLIENT CARDS (Mobile) + TABLE (Desktop) ══════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-14 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">Verified Client Network</span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                Active Client Sites ({displayedClients.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-light">Verified physical security and facility deployments across Maharashtra.</p>
          </div>

          {/* Mobile card grid */}
          <div ref={cardsRef} className="block lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {displayedClients.map((client, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 ${cardsVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-brand-red flex items-center justify-center text-sm shrink-0">
                    <i className={`fa-solid ${client.icon}`} />
                  </div>
                  <div>
                    <span className="font-heading font-semibold text-xs text-slate-900 leading-snug">{client.name}</span>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 font-light">
                      <i className="fa-solid fa-location-dot text-brand-red text-[10px]" />
                      {client.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-3 border-t border-slate-100">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">{client.category}</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white font-heading uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-6 w-16">Sr.</th>
                      <th className="py-3.5 px-6">Client Name</th>
                      <th className="py-3.5 px-6">Location</th>
                      <th className="py-3.5 px-6">Service</th>
                      <th className="py-3.5 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {displayedClients.map((client, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50 transition-colors duration-150"
                      >
                        <td className="py-3.5 px-6 font-medium text-brand-red">{client.sr}.</td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-red-50 text-brand-red flex items-center justify-center text-xs">
                              <i className={`fa-solid ${client.icon}`} />
                            </div>
                            <span className="font-heading font-medium text-slate-900 text-xs">{client.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-slate-600 font-light">
                          <span className="flex items-center gap-1.5">
                            <i className="fa-solid fa-location-dot text-brand-red text-[10px]" />
                            {client.location}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                            {client.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section ref={ctaRef} className="w-full bg-[#0d0e12] py-14 sm:py-18 px-4 sm:px-6 lg:px-12 text-center sm:text-left">
        <div className={`max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">Deploy Security For Your Facility</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">Join the leading industrial and automotive hubs safeguarded by The Legend Security.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/book-appointment" className="px-5 py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-950/40 whitespace-nowrap flex items-center gap-2">
              <i className="fa-solid fa-calendar-check" />
              <span>Book On-Site Survey</span>
            </Link>
            <Link to="/contact" className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2">
              <i className="fa-solid fa-file-invoice text-xs" />
              <span>Request Quotation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
