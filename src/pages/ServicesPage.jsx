import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import BookingModal from '../components/BookingModal';

export default function ServicesPage() {
  const serviceCategories = [
    { icon: 'fa-user-shield', title: 'Manned Guarding / Security Guards', desc: 'Disciplined, vetted personnel for factories, industrial premises, corporate tech parks, hospitals, and educational institutes.', tag: 'INDUSTRIAL & COMMERCIAL' },
    { icon: 'fa-person-military-pointing', title: 'Bouncer Services & VIP Protection', desc: 'Trained bouncers for luxury events, private parties, concerts, nightlife clubs, weddings, and celebrity personal escorts.', tag: 'EVENTS & CELEBRITIES' },
    { icon: 'fa-user-tie', title: 'Executive Protection / PSO', desc: 'Armed and unarmed Personal Security Officers for VIPs, corporate executives, and high-net-worth individuals.', tag: 'VIP CLOSE ESCORT' },
    { icon: 'fa-users-gear', title: 'Corporate Services & Office Boy', desc: 'Front desk security, visitor validation, badge issuance, turnstile coordination, and office boy manpower supply.', tag: 'OFFICE & IT PARKS' },
    { icon: 'fa-broom', title: 'Housekeeping Services', desc: 'Commercial housekeeping, premises sanitation, deep cleaning, and pantry support with trained janitorial teams.', tag: 'FACILITY HYGIENE' },
    { icon: 'fa-money-bill-transfer', title: 'CIT Services (Cash-In-Transit)', desc: 'Secured cash management and bullion escort for banks, ATMs, and high-value transit with armed personnel.', tag: 'VALUABLES TRANSIT' },
    { icon: 'fa-person-digging', title: 'Labour Supply & Manpower', desc: 'Contract manpower and general labour supply for industrial factories, warehouses, and event grounds.', tag: 'INDUSTRIAL MANPOWER' },
    { icon: 'fa-city', title: 'Society Maintenance & Gated Living', desc: 'Round-the-clock township protection, parking control, boom barrier management, and visitor logbooks.', tag: 'RESIDENTIAL TOWNSHIPS' },
    { icon: 'fa-hotel', title: 'Hotel, Hospital & Hospitality', desc: 'Guest safety, valet logistics, hospital crowd control, and luxury venue night surveillance audits.', tag: 'HOSPITALS & RESORTS' },
    { icon: 'fa-shield-dog', title: 'Manned Guards & Dog Squad', desc: 'Canine tracking squads paired with expert handlers for explosive detection and perimeter night patrol.', tag: 'CANINE PATROL' },
    { icon: 'fa-fire-extinguisher', title: 'Fire Fighting Services', desc: 'Certified fire marshals, building evacuation drill training, and hazardous materials inspection.', tag: 'FIRE SAFETY' },
    { icon: 'fa-car-burst', title: 'Traffic Warden Support', desc: 'Internal traffic mitigation, driveway clearance, valet dispatch, and vehicle security at commercial entries.', tag: 'TRAFFIC MANAGEMENT' },
    { icon: 'fa-car-side', title: 'Mobile Patrolling', desc: 'Patrol units conducting periodic night-shift perimeter sweeps, clocking inspection checkpoints.', tag: 'NIGHT PATROLS' },
    { icon: 'fa-handshake-angle', title: 'Security Solutions & Consultation', desc: 'Site vulnerability analysis, CCTV layout consultation, risk audits, and SOP planning.', tag: 'ADVISORY & AUDITS' },
  ];

  const quotationItems = [
    { no: '1', role: 'Security Supervisor' },
    { no: '2', role: 'Security Guard' },
    { no: '3', role: 'Bouncer' },
    { no: '4', role: 'Office Boy' },
    { no: '5', role: 'Housekeeping' },
    { no: '6', role: 'Personal Body Guard (PSO)' },
  ];

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useStaggerAnimation(14, { staggerMs: 60 });
  const [tableRef, tableVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAuditType, setSelectedAuditType] = useState('');

  return (
    <div className="flex flex-col w-full">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative w-full bg-[#0a0a0c] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid pt-28">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-red/6 rounded-full blur-[100px] pointer-events-none" />

        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-6 font-mono font-bold transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Services</span>
          </nav>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/25 mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">PUNE • MUMBAI • ALL OVER MAHARASHTRA | 14 CAPABILITIES</span>
          </div>

          <h1 className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-4xl leading-tight mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            PROFESSIONAL SERVICES <span className="text-gradient-red">SPECTRUM</span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            Comprehensive security guards, executive bouncers, facility housekeeping, and labour supply solutions deployed across <strong className="text-white">Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>

          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            <button
              type="button"
              onClick={() => {
                setSelectedAuditType('On-Site Vulnerability & Security Audit');
                setIsBookingModalOpen(true);
              }}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_25px_rgba(229,9,20,0.4)] hover:brightness-110 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Schedule Security Audit</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 hover:border-brand-red/60 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-file-invoice text-brand-red text-xs" />
              <span>Request Quote</span>
            </Link>
            <a
              href="tel:+918806078777"
              className="px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-red text-slate-300 hover:text-white font-mono text-xs uppercase transition-all flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <span>+91 88060 78777</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES GRID ══════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-14 border-b border-slate-200">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">OPERATIONAL OFFERINGS</span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-slate-950 mt-1">Full Services Directory</h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md">
              Deployable across Maharashtra on short notice. All personnel vetted with police verification and rigorous on-ground training.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {serviceCategories.map((card, idx) => (
              <div
                key={idx}
                className={`card-premium-light group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-500 ${cardsVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center text-xl group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-sm">
                      <i className={`fa-solid ${card.icon}`} />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-sm uppercase text-slate-950 mb-2.5 group-hover:text-brand-red transition-colors leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-5">{card.desc}</p>
                </div>
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600 flex items-center gap-1.5">
                    <i className="fa-solid fa-clock text-brand-red text-[10px]" />
                    8 &amp; 12 Hr Shifts
                  </span>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAuditType(card.title);
                        setIsBookingModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-brand-red/10 hover:bg-brand-red hover:text-white text-brand-red font-heading font-bold text-[10px] uppercase tracking-wider transition-all"
                    >
                      Audit
                    </button>
                    <Link to="/contact" className="inline-flex items-center gap-1 font-heading font-bold text-xs uppercase text-slate-700 hover:text-brand-red transition-colors">
                      <span>Quote</span>
                      <i className="fa-solid fa-arrow-right text-[9px]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ QUOTATION TABLE ══════════════ */}
      <section className="w-full bg-[#0f1014] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#272930]">
        <div ref={tableRef} className="max-w-5xl mx-auto">
          <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-mono text-xs uppercase text-brand-red font-bold tracking-widest">OFFICIAL TARIFF FRAMEWORK</span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-white mt-2">Quotation Structure</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">Standard shift duty schedules for commercial, industrial, and personal protection assignments.</p>
          </div>

          <div className={`bg-[#1a1b21] rounded-3xl overflow-hidden border border-[#2a2b32] shadow-2xl transition-all duration-800 ${tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
            <div className="p-6 sm:p-7 bg-[#1e1f26] border-b border-[#2a2b32] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading font-black text-base uppercase text-white">The Legend Security & Bouncer</h3>
                <p className="text-xs text-slate-400 mt-0.5">Gujarwadi Road, Bharat Nagar, Katraj, Pune 411046</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-brand-red/20 text-brand-red font-mono text-xs font-bold border border-brand-red/30">
                OFFICIAL SLAB
              </span>
            </div>

            {/* Mobile-friendly card view on small screens */}
            <div className="block sm:hidden divide-y divide-[#2a2b32]">
              {quotationItems.map((row) => (
                <div key={row.no} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-brand-red text-sm w-6 shrink-0">{row.no}.</span>
                    <span className="font-heading font-bold text-white uppercase text-xs">{row.role}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 whitespace-nowrap">Contact Mgmt.</span>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#13141a] text-slate-400 font-heading uppercase tracking-wider border-b border-[#2a2b32]">
                    <th className="py-4 px-6 w-16">No.</th>
                    <th className="py-4 px-6">Particular</th>
                    <th className="py-4 px-6 text-center">08 Hrs.</th>
                    <th className="py-4 px-6 text-center">12 Hrs.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2b32] text-slate-200">
                  {quotationItems.map((row) => (
                    <tr key={row.no} className="hover:bg-white/3 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-brand-red">{row.no}.</td>
                      <td className="py-4 px-6 font-heading font-bold text-white uppercase">{row.role}</td>
                      <td className="py-4 px-6 text-center text-slate-400">Contact Management</td>
                      <td className="py-4 px-6 text-center text-slate-400">Contact Management</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 sm:p-6 bg-[#0e0f13] border-t border-[#2a2b32] space-y-1.5 text-xs text-slate-400">
              <p className="font-heading font-bold uppercase text-slate-300 mb-3 text-[11px]">Terms & Conditions (As per Document):</p>
              {['GST will be extra on above charges.', 'The rate will be different for temporary / event-basis services.', 'Rates are valid for one year from contract signing date.'].map((t, i) => (
                <p key={i} className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-dot text-brand-red text-[9px] mt-0.5 shrink-0" />
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section ref={ctaRef} className="w-full bg-gradient-to-r from-[#111218] via-[#161720] to-[#111218] border-t border-white/10 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />
        <div className={`max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-bold">ZERO OBLIGATION CONSULTATION</span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white mt-1">Get Official Price Quote &amp; Site Survey</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Speak directly with Director Mosin Azam Shaikh for your site survey and estimate across Maharashtra.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedAuditType('On-Site Vulnerability & Security Audit');
                setIsBookingModalOpen(true);
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Schedule Audit</span>
            </button>
            <Link to="/contact" className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2">
              <i className="fa-solid fa-file-invoice text-xs" />
              <span>Submit Requisition</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialType={selectedAuditType}
      />
    </div>
  );
}
