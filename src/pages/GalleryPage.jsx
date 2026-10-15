import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStartX = React.useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? onSwipeLeft() : onSwipeRight(); }
    touchStartX.current = null;
  };
  return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd };
}

function MobileLightbox({ image, total, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const swipe = useSwipe(onNext, onPrev);
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onPrev, onNext]);
  if (!isOpen || !image) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col" {...swipe}>
      <div className="flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-xl border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-red text-white uppercase tracking-wider shrink-0">{image.tag}</span>
          <span className="font-heading font-black text-xs text-white uppercase tracking-wide truncate">{image.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="text-[11px] font-mono text-slate-400">{currentIndex + 1} / {total}</span>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-red text-white flex items-center justify-center transition-colors">
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#050507]">
        <img src={image.src} alt={image.title} className="max-h-full max-w-full object-contain select-none" draggable={false} />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm pointer-events-none">
          <i className="fa-solid fa-left-right text-white/60 text-[10px]" />
          <span className="text-[10px] text-white/60 font-mono">Swipe to navigate</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-brand-red text-white flex items-center justify-center transition-all shadow-xl">
          <i className="fa-solid fa-chevron-left text-sm" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-brand-red text-white flex items-center justify-center transition-all shadow-xl">
          <i className="fa-solid fa-chevron-right text-sm" />
        </button>
      </div>
      <div className="shrink-0 px-4 py-4 bg-[#0a0a0d]/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="text-[11px] font-mono text-brand-red font-bold uppercase tracking-wider mb-0.5">{image.categoryLabel}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{image.desc}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-slate-400 text-[11px]">
            <i className="fa-solid fa-location-dot text-brand-red text-[10px]" />
            <span>{image.location}</span>
          </div>
        </div>
        <a href="tel:+918806078677" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-red-700 text-white font-heading font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-red-900/30">
          <i className="fa-solid fa-phone text-xs" />
          <span>Deploy Similar Squad — +91 88060 78677</span>
        </a>
      </div>
    </div>
  );
}

const galleryItems = [
  { id: 1,  tag: 'FIELD OPS',       category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Security Squad — Field Operation 01',  desc: 'Legend Security personnel on active duty during on-ground field operation.',        shift: 'ACTIVE DEPLOYMENT',    src: '/assets/gallery/photo_1.jpg' },
  { id: 2,  tag: 'SQUAD FORMATION', category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Guard Formation and Briefing',         desc: 'Supervised formation and pre-shift briefing before daily deployment.',              shift: 'DAILY SHIFT PROTOCOL', src: '/assets/gallery/photo_2.jpg' },
  { id: 3,  tag: 'ON-DUTY',         category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Maharashtra',  title: 'On-Duty Security Personnel',           desc: 'Uniformed security guard maintaining vigil at assigned post.',                      shift: 'STANDARD TURNOUT',     src: '/assets/gallery/photo_3.jpg' },
  { id: 4,  tag: 'TEAM LINEUP',     category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Team Lineup and Attendance',           desc: 'Full squad attendance and uniform inspection prior to client site deployment.',     shift: 'SHIFT ROLLCALL',       src: '/assets/gallery/photo_4.jpg' },
  { id: 5,  tag: 'DEPLOYMENT',      category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Guard Deployment — Client Site',       desc: 'Security personnel deployed at client premises for round-the-clock surveillance.', shift: 'CLIENT DEPLOYMENT',    src: '/assets/gallery/photo_5.jpg' },
  { id: 6,  tag: 'BOUNCER FORCE',   category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Event Venue',  title: 'Executive Bouncers Event Squad',       desc: 'Formidable event bouncers ensuring VIP safety and access control.',                shift: 'EVENT SECURITY',       src: '/assets/gallery/photo_6.jpg' },
  { id: 7,  tag: 'VIP DETAIL',      category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Executive',    title: 'Close Protection Bouncer',             desc: 'Trained bouncer for private VIP escorting and executive protection.',              shift: 'CLOSE PROTECTION',     src: '/assets/gallery/photo_7.jpg' },
  { id: 8,  tag: 'EVENT CROWD',     category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Event Venue',  title: 'Crowd Management at Premium Event',    desc: 'Bouncers managing crowd flow and access control at high-footfall event.',          shift: 'CROWD CONTROL',        src: '/assets/gallery/photo_8.jpg' },
  { id: 9,  tag: 'NIGHT DETAIL',    category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Club Venue',   title: 'Night Venue Security Team',            desc: 'Elite bouncer team securing nightclub premises and entry checkpoint.',             shift: 'NIGHT OPERATIONS',     src: '/assets/gallery/photo_9.jpg' },
  { id: 10, tag: 'STADIUM EVENT',   category: ['bouncers','squad'],  categoryLabel: 'EVENTS AND STADIUMS',location: 'Sports Arena', title: 'Perimeter Security at Sports Event',   desc: 'Squad deployment at large-scale sports tournament barricades.',                    shift: 'ARENA PERIMETER',      src: '/assets/gallery/photo_10.jpg' },
  { id: 11, tag: 'SQUAD PATROL',    category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Patrol Duty — Industrial Zone',        desc: 'Guards on patrol at industrial client site, monitoring perimeter round-the-clock.',shift: 'PERIMETER PATROL',     src: '/assets/gallery/photo_11.jpg' },
  { id: 12, tag: 'INSPECTION',      category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Maharashtra',  title: 'Senior Supervisor Inspection',         desc: 'Senior supervisor conducting spot inspection and quality audit of deployed guards.',shift: 'QUALITY AUDIT',        src: '/assets/gallery/photo_12.jpg' },
  { id: 13, tag: 'CORPORATE',       category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Corporate Security Post',              desc: 'Front-desk security and visitor management at corporate facility.',                shift: 'CORPORATE GUARD',      src: '/assets/gallery/photo_13.jpg' },
  { id: 14, tag: 'FIELD OPS',       category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Ground Security Operations',           desc: 'Guards during active ground security operations at assigned client location.',     shift: 'GROUND OPS',           src: '/assets/gallery/photo_14.jpg' },
  { id: 15, tag: 'TEAM STRENGTH',   category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Maharashtra',  title: 'Full Squad Strength Display',          desc: 'Complete guard force assembled showcasing manpower depth and readiness.',          shift: 'FORCE DISPLAY',        src: '/assets/gallery/photo_15.jpg' },
  { id: 16, tag: 'LADY GUARDS',     category: ['squad'],             categoryLabel: 'LADY SECURITY',      location: 'Pune',         title: 'Lady Security Guards on Duty',         desc: 'Trained lady guards deployed at residential complexes and corporate premises.',    shift: 'LADY GUARD DUTY',      src: '/assets/gallery/photo_16.jpg' },
  { id: 17, tag: 'DRILL PRACTICE',  category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Training Ground', title: 'Guard Drill and Marching Practice',  desc: 'Physical conditioning, flag salutes, and ceremonial drill training.',             shift: 'DISCIPLINE DRILLS',    src: '/assets/gallery/photo_17.jpg' },
  { id: 18, tag: 'TURNOUT CHECK',   category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Katraj HQ',    title: 'Uniform and Equipment Turnout',        desc: 'Supervisor-led uniform and equipment check before deployment.',                    shift: 'PRE-SHIFT TURNOUT',    src: '/assets/gallery/photo_18.jpg' },
  { id: 19, tag: 'POLICE LIAISON',  category: ['squad'],             categoryLabel: 'JOINT OPERATIONS',   location: 'Maharashtra',  title: 'Coordination with Police',             desc: 'Directors liaising with local law enforcement for synchronized safety operations.',shift: 'JOINT COORDINATION',   src: '/assets/gallery/photo_19.jpg' },
  { id: 20, tag: 'HIGH ALERT',      category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'High Alert Security Deployment',       desc: 'Guards on heightened alert during special occasion security assignments.',        shift: 'HIGH ALERT DUTY',      src: '/assets/gallery/photo_20.jpg' },
  { id: 21, tag: 'SITE SECURITY',   category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Mumbai',       title: 'Construction Site Security',           desc: 'Dedicated security at construction and project sites — theft and access prevention.',shift: 'SITE GUARD',          src: '/assets/gallery/photo_21.jpg' },
  { id: 22, tag: 'SOCIETY GUARD',   category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Residential Society Security',         desc: 'Guards at gated community ensuring resident safety and visitor verification.',     shift: 'SOCIETY DUTY',         src: '/assets/gallery/photo_22.jpg' },
  { id: 23, tag: 'VIP PROTECTION',  category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Pune',         title: 'VIP Escort and Protection Detail',     desc: 'Close protection team escorting VIP clients at high-profile events.',             shift: 'VIP ESCORT',           src: '/assets/gallery/photo_23.jpg' },
  { id: 24, tag: 'EVENT SQUAD',     category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Event Venue',  title: 'Full Event Security Formation',        desc: 'Complete event security team in formation before major venue assignment.',        shift: 'EVENT FORMATION',      src: '/assets/gallery/photo_24.jpg' },
  { id: 25, tag: 'NIGHT WATCH',     category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Maharashtra',  title: 'Night Watch — Industrial Complex',     desc: 'Guards maintaining night watch at industrial premises ensuring zero breach.',      shift: 'NIGHT WATCH',          src: '/assets/gallery/photo_25.jpg' },
  { id: 26, tag: 'TEAM BRIEFING',   category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Operational Briefing Session',         desc: 'Team leader conducting pre-deployment briefing on site safety protocols.',        shift: 'BRIEFING SESSION',     src: '/assets/gallery/photo_26.jpg' },
  { id: 27, tag: 'MULTI-POST',      category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Multi-Post Deployment Strategy',       desc: 'Multiple-point guard deployment at large commercial establishment.',              shift: 'MULTI-POST COVER',     src: '/assets/gallery/photo_27.jpg' },
  { id: 28, tag: 'EMERGENCY DRILL', category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Training HQ',  title: 'Emergency Response Drill',             desc: 'Guards undertaking emergency response and evacuation drill training.',            shift: 'EMERGENCY DRILL',      src: '/assets/gallery/photo_28.jpg' },
  { id: 29, tag: 'MASS SQUAD',      category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Maharashtra',  title: 'Large-Scale Squad Assembly',           desc: 'Massive squad assembly showcasing Legend Security full manpower capability.',      shift: 'FORCE PARADE',         src: '/assets/gallery/photo_29.jpg' },
  { id: 30, tag: 'CLIENT SITE',     category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Active Client Site Coverage',          desc: 'Personnel actively covering client site with disciplined formation and vigilance.',shift: 'CLIENT COVERAGE',      src: '/assets/gallery/photo_30.jpg' },
  { id: 31, tag: 'SUPERVISOR',      category: ['squad'],             categoryLabel: 'SECURITY SQUAD',     location: 'Pune',         title: 'Field Supervisor on Duty',             desc: 'Field supervisor monitoring guard posts and ensuring SOP compliance.',            shift: 'SUPERVISOR ROUND',     src: '/assets/gallery/photo_31.jpg' },
  { id: 32, tag: 'SPECIAL EVENT',   category: ['bouncers'],          categoryLabel: 'BOUNCERS AND EVENTS',location: 'Event Venue',  title: 'Special Event Security Cover',         desc: 'Dedicated event security team ensuring complete safety at high-profile event.',   shift: 'SPECIAL ASSIGNMENT',   src: '/assets/gallery/photo_32.jpg' },
  { id: 33, tag: 'FULL FORCE',      category: ['squad','bouncers'],  categoryLabel: 'FULL FORCE DISPLAY', location: 'Maharashtra',  title: 'The Legend Security — Full Force',     desc: 'Combined squad and bouncer force on parade — showcasing total operational strength.',shift: 'FORCE PARADE',       src: '/assets/gallery/photo_33.jpg' },
];

const categories = [
  { id: 'all',      label: 'All Photos',        icon: 'fa-border-all',               count: galleryItems.length },
  { id: 'squad',    label: 'Security Squad',    icon: 'fa-users',                    count: galleryItems.filter(i => i.category.includes('squad')).length },
  { id: 'bouncers', label: 'Bouncers and Events', icon: 'fa-person-military-pointing', count: galleryItems.filter(i => i.category.includes('bouncers')).length },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category.includes(activeCategory));

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [filteredItems.length]);

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [gridRef, gridVisible] = useStaggerAnimation(filteredItems.length, { staggerMs: 40 });

  return (
    <div className="flex flex-col w-full">

      <MobileLightbox
        image={selectedIndex !== null ? filteredItems[selectedIndex] : null}
        total={filteredItems.length}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* HERO */}
      <section className="relative w-full bg-[#0a0a0c] text-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid pt-24 sm:pt-28">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-red/6 rounded-full blur-[100px] pointer-events-none" />
        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-5 font-mono font-bold transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Gallery</span>
          </nav>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/25 mb-5 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-red font-bold">PUNE • MUMBAI • ALL OVER MAHARASHTRA</span>
          </div>
          <h1 className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-4xl leading-tight mb-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            OUR SQUADS <span className="text-gradient-red">IN ACTION</span>
          </h1>
          <p className={`text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            Authentic operational photographs of The Legend Security personnel during on-ground duties, ceremonial drills, VIP assignments, and real client deployments across <strong className="text-white">Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>
          <div className={`flex items-center gap-6 sm:gap-12 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            {[{ num: '33', label: 'Real Photos' }, { num: '500+', label: 'Guards Deployed' }, { num: '10+', label: 'Yrs Experience' }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading font-black text-2xl sm:text-4xl text-brand-red">{s.num}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="w-full bg-[#f8fafc] px-3 sm:px-6 lg:px-12 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto">

          {/* Scrollable filter chips */}
          <div className="mb-5 sm:mb-10">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center" style={{ scrollbarWidth: 'none' }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSelectedIndex(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-brand-red text-white shadow-lg shadow-red-900/30 scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-brand-red/30'
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} text-[10px]`} />
                  {cat.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-black ${activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Count + hint */}
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <p className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
              Showing <span className="text-brand-red text-sm">{filteredItems.length}</span> photo{filteredItems.length !== 1 ? 's' : ''}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <i className="fa-solid fa-hand-pointer text-brand-red text-[10px]" />
              <span className="hidden sm:inline">Click to enlarge</span>
              <span className="sm:hidden">Tap to enlarge</span>
            </p>
          </div>

          {/* Grid — 2 cols mobile, 3 cols desktop */}
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                className={`group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200 hover:border-brand-red/30 cursor-pointer transition-all duration-500 ${
                  gridVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${Math.min(idx * 35, 600)}ms` }}
              >
                <div className="relative w-full overflow-hidden bg-slate-900" style={{ aspectRatio: '4/3' }}>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt={item.title}
                    src={item.src}
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 glass-panel px-2 py-0.5 rounded-lg">
                    <span className="font-mono text-[9px] sm:text-[10px] text-white uppercase font-bold tracking-wider">{item.tag}</span>
                  </div>
                  <div className="sm:hidden absolute bottom-2 right-2 w-7 h-7 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-magnifying-glass-plus text-[10px]" />
                  </div>
                  <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <i className="fa-solid fa-magnifying-glass-plus text-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-2.5 sm:p-5 gap-1 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[9px] sm:text-[11px] text-brand-red font-bold uppercase truncate">{item.categoryLabel}</span>
                    <span className="flex items-center gap-1 text-slate-400 font-medium text-[9px] sm:text-[10px] shrink-0">
                      <i className="fa-solid fa-location-dot text-brand-red text-[8px]" />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-[11px] sm:text-sm text-slate-900 uppercase tracking-wide group-hover:text-brand-red transition-colors leading-snug line-clamp-2">{item.title}</h3>
                  <p className="hidden sm:block text-slate-500 text-xs leading-relaxed line-clamp-2 mt-0.5">{item.desc}</p>
                  <div className="pt-2 mt-auto border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-slate-400 font-semibold hidden sm:block">{item.shift}</span>
                    <span className="font-mono text-[9px] sm:hidden text-slate-400 font-semibold">#{item.id}</span>
                    <span className="inline-flex items-center gap-1 text-brand-red font-heading font-bold uppercase text-[10px] group-hover:translate-x-0.5 transition-transform duration-200">
                      <span className="hidden sm:inline">Enlarge</span>
                      <span className="sm:hidden">View</span>
                      <i className="fa-solid fa-arrow-right text-[9px]" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">All {filteredItems.length} photos loaded</p>
          </div>
        </div>
      </section>

      {/* MOBILE CTA STRIP */}
      <section className="sm:hidden w-full bg-[#0a0a0c] px-4 py-6 border-t border-brand-red/20">
        <p className="text-center text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">Need a security squad like this?</p>
        <div className="grid grid-cols-2 gap-2">
          <a href="tel:+918806078677" className="flex items-center justify-center gap-2 bg-brand-red text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-900/30">
            <i className="fa-solid fa-phone text-xs" />
            <span>Call Now</span>
          </a>
          <a href="https://wa.me/918806078677" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl">
            <i className="fa-brands fa-whatsapp text-sm" />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="w-full bg-gradient-to-r from-brand-red via-red-700 to-brand-red py-12 sm:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 diagonal-stripes opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left relative z-10">
          <div>
            <h3 className="font-heading font-black text-xl sm:text-3xl uppercase text-white">Require Trained Manpower?</h3>
            <p className="text-xs sm:text-sm text-white/85 mt-1">Contact Director Mosin Azam Shaikh (+91 88060 78677) for rapid deployment.</p>
          </div>
          <Link to="/contact" className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white text-brand-red font-heading font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-2xl whitespace-nowrap flex items-center gap-2">
            <i className="fa-solid fa-file-invoice" />
            Request Quotation
          </Link>
        </div>
      </section>
    </div>
  );
}
