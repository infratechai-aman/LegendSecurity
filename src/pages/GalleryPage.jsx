import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageModal from '../components/ImageModal';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Photos', icon: 'fa-grid-2' },
    { id: 'squad', label: 'Security Squad', icon: 'fa-users' },
    { id: 'bouncers', label: 'Bouncers & Events', icon: 'fa-person-military-pointing' },
    { id: 'compliance', label: 'Govt. License', icon: 'fa-stamp' },
    { id: 'brochure', label: 'PDF Brochure', icon: 'fa-file-pdf' },
  ];

  const galleryItems = [
    { id: 1, tag: 'ON-GROUND FORMATION', category: ['squad'], categoryLabel: 'SECURITY SQUAD', location: 'Pune Grounds', title: 'Squad Morning Turnout & Briefing', desc: 'Supervised squad inspection and turnout review before daily deployment.', shift: 'DAILY SHIFT PROTOCOL', src: '/assets/squad_formation_ground.jpg' },
    { id: 2, tag: 'BOUNCER FORCE', category: ['bouncers'], categoryLabel: 'BOUNCERS & EVENTS', location: 'Event Venue', title: 'Executive Bouncers Event Squad Lineup', desc: 'Formidable event protection personnel for VIP safety and access control.', shift: 'EVENT CROWD MANAGEMENT', src: '/assets/bouncers_event_lineup.jpg' },
    { id: 3, tag: 'OFFICIAL UNIFORM', category: ['squad'], categoryLabel: 'SECURITY SQUAD', location: 'Katraj HQ', title: 'The Legend Security Official Uniform', desc: 'High-visibility security personnel with official uniform and chest badges.', shift: 'STANDARD TURNOUT', src: '/assets/guard_uniform_back.jpg' },
    { id: 4, tag: 'VIP DETAIL', category: ['bouncers'], categoryLabel: 'BOUNCERS & EVENTS', location: 'Executive', title: 'Specialized Close Protection Bouncer', desc: 'Trained executive bouncer for private VIP escorting and club security.', shift: 'CLOSE PROTECTION', src: '/assets/bouncer_arms_crossed.jpg' },
    { id: 5, tag: 'STADIUM & ARENA', category: ['squad', 'bouncers'], categoryLabel: 'EVENTS & STADIUMS', location: 'Sports Event', title: 'Perimeter Security at Premier League Event', desc: 'Squad deployment at large-scale sports tournament barricades.', shift: 'ARENA PERIMETER SENTRY', src: '/assets/guards_event_stadium.jpg' },
    { id: 6, tag: 'AUTHORITY LIAISON', category: ['squad'], categoryLabel: 'SECURITY SQUAD', location: 'Maharashtra', title: 'Coordination with Police & Administration', desc: 'Directors liaising with local law enforcement for synchronized safety.', shift: 'JOINT COORDINATION', src: '/assets/police_security_coordination.jpg' },
    { id: 7, tag: 'DRILL & INSPECTION', category: ['squad'], categoryLabel: 'SECURITY SQUAD', location: 'Training Ground', title: 'Guard Drill Practice & Marching', desc: 'Physical conditioning, flag salutes, and ceremonial drill training.', shift: 'DISCIPLINE DRILLS', src: '/assets/guards_marching_drill.png' },
    { id: 8, tag: 'LEGAL ACCREDITATION', category: ['compliance'], categoryLabel: 'GOVT. LICENSE', location: 'Maharashtra Govt.', title: 'Official PSARA State License', desc: 'License No. PSA/L/50/MH/2026/JULI/6495 — Controlling Authority Maharashtra.', shift: 'STATUTORY COMPLIANCE', src: '/assets/psara_license_certificate.jpg' },
    { id: 9, tag: 'CATALOGUE COVER', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 1 of 8', title: 'Official Brochure Cover', desc: 'Original brochure title page with logo and field photos.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_1.png' },
    { id: 10, tag: 'COMPANY PROFILE', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 2 of 8', title: 'Letter from Management', desc: 'Official introduction by Director Mr. Mosin Azam Shaikh.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_2.png' },
    { id: 11, tag: 'SERVICE SUITE', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 3 of 8', title: 'Core Security Offerings', desc: 'Security guards, lady guards, supervisors, and gunmen breakdown.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_3.png' },
    { id: 12, tag: 'VERIFIED CLIENTS', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 4 of 8', title: 'Valued Client Portfolio', desc: 'Official client roll: Flash Viven, JBM Group, Ford PPS, Dhone Ford.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_4.png' },
    { id: 13, tag: 'STATUTORY LICENSE', category: ['compliance', 'brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 5 of 8', title: 'PSARA License Certificate', desc: 'Full-page official certificate with state seal — MH Home Department.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_5.png' },
    { id: 14, tag: 'FACILITY SERVICES', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 6 of 8', title: 'Housekeeping & Facility Mgmt.', desc: 'Housekeeping, pest control, pantry, carpet cleaning breakdown.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_6.png' },
    { id: 15, tag: 'OFFICIAL TARIFF', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 7 of 8', title: 'Commercial Quotation Tariff', desc: 'Monthly billing for Security Guards, Supervisors, Gunmen (8 & 12 Hrs).', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_7.png' },
    { id: 16, tag: 'BRANCH DIRECTORY', category: ['brochure'], categoryLabel: 'PDF BROCHURE', location: 'Page 8 of 8', title: 'Contact & Branch Addresses', desc: 'Back cover: squad photos, Katraj HQ, Mumbai Malad branch, Director hotlines.', shift: 'PDF BROCHURE', src: '/assets/real/pdf_page_8.png' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category.includes(activeCategory));

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [gridRef, gridVisible] = useStaggerAnimation(filteredItems.length, { staggerMs: 60 });

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };
  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <ImageModal
          image={filteredItems[selectedImageIndex]}
          isOpen={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative w-full bg-[#0a0a0c] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid pt-28">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-red/6 rounded-full blur-[100px] pointer-events-none" />

        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-6 font-mono font-bold transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Gallery</span>
          </nav>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/25 mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">PUNE • MUMBAI • ALL OVER MAHARASHTRA | REAL FIELD PHOTOGRAPHS</span>
          </div>

          <h1 className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-4xl leading-tight mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            OUR SQUADS <span className="text-gradient-red">IN ACTION</span>
          </h1>

          <p className={`text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            Authentic operational photographs of The Legend Security personnel during on-ground duties, ceremonial drills, VIP assignments, and real client deployments across <strong className="text-white">Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>
        </div>
      </section>

      {/* ══════════════ FILTER + GRID ══════════════ */}
      <section className="w-full bg-[#f8fafc] px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pb-10 border-b border-slate-200 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSelectedImageIndex(null); }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-lg shadow-red-900/25 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-brand-red/30'
                }`}
              >
                <i className={`fa-solid ${cat.icon} text-[10px]`} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Count indicator */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
              Showing <span className="text-brand-red">{filteredItems.length}</span> photo{filteredItems.length !== 1 ? 's' : ''}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <i className="fa-solid fa-hand-pointer text-brand-red text-[10px]" />
              Click any photo to enlarge
            </p>
          </div>

          {/* Responsive grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 hover:border-brand-red/30 cursor-pointer card-premium-light transition-all duration-500 ${gridVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Image */}
                <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-900">
                  <img
                    className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600 ease-out"
                    alt={item.title}
                    src={item.src}
                    style={{ transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
                  />
                  {/* Tag badge */}
                  <div className="absolute top-3 left-3 glass-panel px-2.5 py-1 rounded-lg">
                    <span className="font-mono text-[10px] text-white uppercase font-bold tracking-wider">{item.tag}</span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <i className="fa-solid fa-magnifying-glass-plus text-sm" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 sm:p-6 gap-2 flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-mono text-[11px] text-brand-red font-bold uppercase">{item.categoryLabel}</span>
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
                        <i className="fa-solid fa-location-dot text-brand-red text-[9px]" />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-sm text-slate-950 uppercase tracking-wide group-hover:text-brand-red transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">{item.shift}</span>
                    <span className="inline-flex items-center gap-1.5 text-brand-red font-heading font-bold uppercase text-[11px] group-hover:translate-x-1 transition-transform duration-200">
                      <span>Enlarge</span>
                      <i className="fa-solid fa-arrow-right text-[10px]" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="w-full bg-gradient-to-r from-brand-red via-red-700 to-brand-red py-16 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 diagonal-stripes opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10">
          <div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white">Require Trained Manpower?</h3>
            <p className="text-sm text-white/85 mt-1">Contact Director Mosin Azam Shaikh (+91 88060 78777) for rapid deployment.</p>
          </div>
          <Link to="/contact" className="px-8 py-4 rounded-xl bg-white text-brand-red font-heading font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-2xl whitespace-nowrap flex items-center gap-2">
            <i className="fa-solid fa-file-invoice" />
            Request Quotation
          </Link>
        </div>
      </section>
    </div>
  );
}
