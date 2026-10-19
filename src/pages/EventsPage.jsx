import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';
import BookingModal from '../components/BookingModal';
import ImageModal from '../components/ImageModal';

export default function EventsPage() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [cardsRef, cardsVisible] = useStaggerAnimation(8, { staggerMs: 80 });
  const [featuresRef, featuresVisible] = useStaggerAnimation(6, { staggerMs: 60 });
  const [calculatorRef, calculatorVisible] = useScrollAnimation({ threshold: 0.15 });
  const [galleryRef, galleryVisible] = useStaggerAnimation(6, { staggerMs: 60 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.15 });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAuditType, setSelectedAuditType] = useState('Event Security Command & Crowd Control');
  const [previewImage, setPreviewImage] = useState(null);

  // Filter state for event cards
  const [activeFilter, setActiveFilter] = useState('all');

  const eventCategories = [
    {
      id: 'wedding',
      category: 'wedding',
      title: 'Royal Weddings & Sangeet Receptions',
      marathiTitle: 'भव्य विवाह व संगीत सोहळा सुरक्षा',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      image: '/assets/events/indian_wedding_security.jpg',
      tagline: 'Flawless dignity, grand hospitality & uncompromising VIP safety.',
      desc: 'Royal Indian weddings, destination marriages, high-profile Sangeet nights, and Baraat processions demand refined, polite yet formidable security. We manage entryway access, gifts & jewelry room protection, VIP stage cordons, and smooth valet traffic.',
      features: [
        'Baraat Procession & Entryway Escort Squad',
        'Bridal Room, Jewelry & Cash Gift Safeguard',
        'Trained Lady Bouncers for Bride & Women Guests',
        'Strict Invitation Card & Guest List Verification',
        'VIP Stage Cordon & Celebrity Guest Escort',
        'Valet Parking & Traffic Congestion Mitigation',
      ],
      turnout: 'Black 2-Piece Suits / Blazers with Earpieces',
      typicalSquad: '6 to 15 Bouncers + 2 Lady Guards + 1 Event Captain',
      locations: 'Pune • Mumbai • Lonavala • Mahabaleshwar • All Maharashtra',
    },
    {
      id: 'birthday',
      category: 'private',
      title: 'Milestone Birthdays & Luxury Celebrations',
      marathiTitle: 'वाढदिवस व खाजगी पार्ट्यांचे संरक्षण',
      badge: 'FAMILY & PRIVATE',
      badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      image: '/assets/events/indian_birthday_security.jpg',
      tagline: 'Warm welcome for your guests, zero entry for uninvited intruders.',
      desc: 'From grand 1st birthday bashes to 18th/21st milestones and 50th golden jubilee celebrations at premium banquet halls, hotels, and lawns. Our bouncers maintain courteous entryway screening, prevent gatecrashers, and ensure a joyful, safe atmosphere for kids and families.',
      features: [
        'Courteous Door Entry & QR/Invite Checking',
        'Gatecrasher Prevention & Venue Perimeter Watch',
        'Kids & Elderly Safety Monitoring in Banquet Area',
        'Bar Area & Beverage Zone De-escalation',
        'Gift Table & Valuables Continuous Supervision',
        'Discreet, Polite & Family-Friendly Demeanor',
      ],
      turnout: 'Crisp Black Suits or Sleek Safari Suits',
      typicalSquad: '2 to 6 Well-Groomed Bouncers',
      locations: 'Pune • Mumbai • Thane • PCMC • Rest of Maharashtra',
    },
    {
      id: 'concert',
      category: 'public',
      title: 'Concerts, Bollywood DJ & Dandiya Nights',
      marathiTitle: 'संगीत महोत्सव, गरबा-दांडिया व डीजे नाईट्स',
      badge: 'HIGH-VOLTAGE FOOTFALL',
      badgeColor: 'bg-red-500/15 text-red-400 border-red-500/30',
      image: '/assets/events/indian_concert_dandiya.jpg',
      tagline: 'Mass crowd control, barricade containment & artist stage defense.',
      desc: 'Large-scale live music concerts, Navratri Dandiya grounds, celebrity DJ nights, and college cultural festivals attracting thousands. We deploy battle-tested barricade personnel, emergency crowd-surge handlers, backstage green room cordons, and metal detector entry points.',
      features: [
        'Heavy-Duty Front Stage & Barricade Defense',
        'Artist & VIP Green Room Close-Protection',
        'DFMD (Door Frame Metal Detectors) & Frisking',
        'Alcohol/Contraband Confiscation at Entry',
        'Dedicated Women Safe Zone & Lady Bouncers',
        'Emergency Evacuation Corridor Management',
      ],
      turnout: 'Black Tactical Security Polos with Lanyards',
      typicalSquad: '15 to 80+ Bouncers + Metal Detectors + Supervisors',
      locations: 'Pune Grounds • Mumbai MMRDA • Navi Mumbai • Nashik',
    },
    {
      id: 'corporate',
      category: 'corporate',
      title: 'Corporate Galas, Awards & Annual Meets',
      marathiTitle: 'कॉर्पोरेट वार्षिक पुरस्कार व संमेलन',
      badge: 'EXECUTIVE TIER',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      image: '/assets/events/indian_corporate_gala.jpg',
      tagline: 'Corporate polish, bilingual officers & board-level discretion.',
      desc: 'Annual general meetings, prestigious corporate excellence awards, global tech summits, and leadership dinners at 5-star hotels (JW Marriott, Conrad, Taj, Hyatt). Our personnel are impeccably groomed, articulate in English and Hindi, and experienced in board-level protocol.',
      features: [
        'VIP Aisle & Speaker Stage Access Control',
        'Registration Desk & Visitor Badge Validation',
        'Executive Protection for MDs, CEOs & Dignitaries',
        'Confidential Strategy Session Perimeter Guarding',
        'Emergency First-Aid & Fire Safety Trained Squad',
        'Seamless Coordination with Hotel Banquet Teams',
      ],
      turnout: 'Premium Black Two-Piece Suits & Lapel Badges',
      typicalSquad: '4 to 12 Executive Protection Bouncers',
      locations: 'Pune IT Parks • BKC Mumbai • Aerocity • Hinjawadi',
    },
    {
      id: 'farmhouse',
      category: 'private',
      title: 'Celebrity Villa & Farmhouse VIP Soirees',
      marathiTitle: 'सेलिब्रिटी व खाजगी फार्महाऊस पार्ट्या',
      badge: 'STRICTLY CONFIDENTIAL',
      badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      image: '/assets/events/indian_farmhouse_vip.jpg',
      tagline: 'Total privacy, anti-paparazzi protocols & secluded perimeter security.',
      desc: 'Exclusive private parties at luxury villas and farmhouses across Lonavala, Khandala, Alibaug, and Pune hills. We enforce strict NDAs (Non-Disclosure Agreements), manage private vehicle entry, secure poolside parameters, and prevent unauthorized cameras or drones.',
      features: [
        'Perimeter Gatekeeper & Valet Car Checkpoint',
        'Strict NDA Discipline — Complete Client Privacy',
        'Anti-Paparazzi, Drone Watch & Camera Shielding',
        'Infinity Pool Area Safety Marshals',
        'Overnight Vigilance for Multi-Day Villa Rentals',
        '24/7 Motorized Perimeter Patrol Capability',
      ],
      turnout: 'Dark Charcoal Blazers / Tactical Covert Wear',
      typicalSquad: '4 to 10 Armed / Unarmed Bodyguards & Bouncers',
      locations: 'Lonavala • Khandala • Alibaug • Mulshi • Mahabaleshwar',
    },
    {
      id: 'utsav',
      category: 'public',
      title: 'Ganesh Utsav, Shobha Yatra & Cultural Fests',
      marathiTitle: 'सार्वजनिक गणेशोत्सव व धार्मिक यात्रा',
      badge: 'PUBLIC CROWD VANGUARD',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      image: '/assets/events/indian_festival_utsav.jpg',
      tagline: 'Disciplined devotion, orderly queues & joint police liaison.',
      desc: 'Maharashtra’s world-renowned Ganesh Utsav pandals, festive Shobha Yatras, Navratri celebrations, and religious processions witness massive footfall. Our squads work in close coordination with local police to regulate peaceful darshan queues and family safety.',
      features: [
        'Barricaded Queue Flow & VIP Darshan Lines',
        'Child & Senior Citizen Safe Escort Assistance',
        'Joint Operations Coordination with Local Police',
        'Anti-Pickpocketing & Surveillance Spotters',
        'Multi-Day Continuous 24/7 Shift Rotations',
        'Prasad Counter & Gold Ornament Vigilance',
      ],
      turnout: 'Tactical Event Security Uniforms / Vests',
      typicalSquad: '10 to 50+ Bouncers + Supervisors',
      locations: 'Pune • Mumbai • Kolhapur • Solapur • All Maharashtra',
    },
    {
      id: 'stadium',
      category: 'public',
      title: 'Sports Championships & Stadium Tournaments',
      marathiTitle: 'क्रीडा स्पर्धा, क्रिकेट व स्टेडियम बंदोबस्त',
      badge: 'ARENA SCALE',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      image: '/assets/guards_event_stadium.jpg',
      tagline: 'Perimeter vigilance, athlete safety & grandstand management.',
      desc: 'Cricket tournaments, state-level marathons, football leagues, and university athletics. We provide dugout protection, referee escorts, pitch invasion deterrents, and disciplined fan dispersal.',
      features: [
        'Player Dugout & Match Official Cordon',
        'Anti-Pitch Invasion Rapid Interception Team',
        'Grandstand Segment & Entry Turnstile Security',
        'Medical & First Responder Team Coordination',
      ],
      turnout: 'Sport Tactical Uniforms / High-Vis Security Badges',
      typicalSquad: '12 to 40+ Guards & Bouncers',
      locations: 'Pune Stadiums • Mumbai Sports Complexes • University Grounds',
    },
    {
      id: 'exhibition',
      category: 'corporate',
      title: 'Expos, Luxury Auto Shows & Jewelry Exhibitions',
      marathiTitle: 'भव्य प्रदर्शने, ऑटो एक्सपो व ज्वेलरी मेळावे',
      badge: 'HIGH ASSET VALUE',
      badgeColor: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
      image: '/assets/bouncers_event_lineup.jpg',
      tagline: 'High-value bullion safety, visitor baggage scanning & booth vigil.',
      desc: 'Jewelry expos, luxury automobile showcases, trade expos, and fashion runways. We provide armed escort for bullion delivery, baggage frisking, visitor flow control, and overnight hall surveillance.',
      features: [
        'High-Value Display Showcase Surveillance',
        'Baggage Scanner & Handheld Metal Detector Teams',
        'Overnight Hall Lockout & Seal Inspection',
        'Armed Escort Coordination for Valuables Transit',
      ],
      turnout: 'Immaculate Black Suits or PSARA Uniformed Guards',
      typicalSquad: '6 to 25 Guards & Armed Personnel',
      locations: 'Pune Exhibition Center • Bombay Exhibition Center (NESCO) • Auto Cluster Chinchwad',
    },
  ];

  const filteredCategories = activeFilter === 'all'
    ? eventCategories
    : eventCategories.filter(cat => cat.category === activeFilter);

  const realGallery = [
    { src: '/assets/bouncers_event_lineup.jpg', title: 'Tactical Event Bouncer Lineup', location: 'Pune Event Ground' },
    { src: '/assets/gallery/photo_6.jpg', title: 'Executive Bouncers Event Squad', location: 'Luxury Venue' },
    { src: '/assets/gallery/photo_8.jpg', title: 'High-Footfall Crowd Management', location: 'Maharashtra' },
    { src: '/assets/gallery/photo_23.jpg', title: 'VIP Close Escort Detail', location: 'Pune' },
    { src: '/assets/gallery/photo_9.jpg', title: 'Night Venue Security Team', location: 'Nightclub & Lounge' },
    { src: '/assets/guards_event_stadium.jpg', title: 'Stadium & Arena Perimeter', location: 'Sports Tournament' },
  ];

  const handleOpenBooking = (type) => {
    setSelectedAuditType(type || 'Event Security Command & Crowd Control');
    setIsBookingModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#0a0a0c] text-white">

      {/* ══════════════════════════════════════════
          HERO SECTION — Premium Indian Aesthetics
      ══════════════════════════════════════════ */}
      <section className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid pt-28 border-b border-[#272930]/40">
        {/* Ambient atmospheric red & gold glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-6 font-mono font-bold transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Events &amp; Celebrations</span>
          </nav>

          {/* Regional Vanguard Badge */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold">
              PUNE • MUMBAI • ALL OVER MAHARASHTRA | CELEBRATION SECURITY
            </span>
          </div>

          {/* Main Title */}
          <h1 className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight max-w-5xl leading-[1.08] mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            PREMIER EVENT SECURITY &amp; <span className="text-gradient-red">CELEBRATION MANAGEMENT</span>
          </h1>

          {/* Subtitle with Marathi / Hindi touch */}
          <p className={`text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            From royal Indian weddings (<strong className="text-white font-medium">विवाह सोहळा</strong>) &amp; milestone birthday parties to high-energy Bollywood concerts, Dandiya nights, celebrity farmhouse bashes, and corporate galas.
          </p>

          <p className={`text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed mb-10 transition-all duration-700 font-sans ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '350ms' }}>
            Deployed with 100% police-verified, impeccably suited bouncers, polite gatekeepers, and dedicated lady guards who uphold your family’s honor and prestige.
          </p>

          {/* Action Row */}
          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            <button
              type="button"
              onClick={() => handleOpenBooking('Event Security Command & Crowd Control')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(229,9,20,0.45)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Book Event Squad Now</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <a
              href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20need%20event%20bouncers%20and%20security%20for%20an%20upcoming%20celebration."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>WhatsApp Instant Quote</span>
            </a>

            <a
              href="tel:+918806078677"
              className="px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 hover:border-brand-red/60 text-slate-200 hover:text-white font-mono text-xs uppercase transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-phone text-brand-red text-xs" />
              <span>Director Hotline: +91 88060 78677</span>
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl pt-8 border-t border-white/10">
            <div className="flex flex-col items-center">
              <span className="font-heading font-black text-2xl sm:text-3xl text-white">450+</span>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Weddings &amp; Galas Secured</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading font-black text-2xl sm:text-3xl text-brand-red">100%</span>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Police &amp; Crime Verified</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading font-black text-2xl sm:text-3xl text-white">Lady Bouncers</span>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Available On Request</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">45 Mins</span>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Emergency Standby Force</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FILTER TABS
      ══════════════════════════════════════════ */}
      <section className="bg-[#121318] border-b border-[#272930] py-4 sticky top-[76px] sm:top-[82px] z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5 mr-2">
              <i className="fa-solid fa-filter text-brand-red" />
              <span>Event Type:</span>
            </span>
            {[
              { id: 'all', label: 'All Celebrations (8)' },
              { id: 'wedding', label: 'Weddings & Sangeet' },
              { id: 'private', label: 'Birthdays & Private Parties' },
              { id: 'public', label: 'Concerts & Festivals' },
              { id: 'corporate', label: 'Corporate Galas' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-brand-red text-white shadow-md shadow-red-900/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleOpenBooking('Custom Event Security Deployment')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-headset text-xs" />
            <span>Custom Manpower Quote</span>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENT CARDS GRID — Authentic Samsung S23 Indian Aesthetics
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0c0d11]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 mb-3 text-xs font-mono text-brand-red font-bold uppercase tracking-widest">
              <span>AUTHENTIC FIELD-TESTED SQUADS</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mb-3">
              TAILORED EVENT SECURITY <span className="text-gradient-red">SOLUTIONS</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Every celebration is unique. Our bouncers, security officers, and lady personnel blend courteous warmth with vigilant authority to guarantee peace of mind.
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredCategories.map((card, idx) => (
              <div
                key={card.id}
                className={`group rounded-2xl bg-[#14151c] border border-[#272930] hover:border-brand-red/60 overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(229,9,20,0.15)] transition-all duration-300 flex flex-col ${
                  cardsVisible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Image Container with S23 Camera Badge */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black/40 cursor-pointer" onClick={() => setPreviewImage({ src: card.image, title: card.title, desc: card.desc })}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151c] via-[#14151c]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border backdrop-blur-md ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-slate-200 border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                      <i className="fa-solid fa-camera text-brand-red text-[9px]" />
                      <span>S23 Field Photo</span>
                    </span>
                  </div>

                  {/* Zoom hint on hover */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-brand-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                    <i className="fa-solid fa-expand text-xs" />
                  </div>

                  {/* Bottom Image Overlay Tagline */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <p className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight drop-shadow-md">
                      {card.title}
                    </p>
                    <p className="text-xs text-brand-red font-medium tracking-wide mt-0.5">
                      {card.marathiTitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {card.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="mb-5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                        Key Protocol Deliverables:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {card.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <i className="fa-solid fa-circle-check text-brand-red text-[11px] mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specs Pills */}
                    <div className="space-y-2 pt-3 border-t border-white/5 text-[11px] font-mono">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <i className="fa-solid fa-vest text-brand-red text-xs" />
                          <span>Turnout:</span>
                        </span>
                        <span className="text-slate-200 font-semibold">{card.turnout}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <i className="fa-solid fa-users text-brand-red text-xs" />
                          <span>Typical Squad:</span>
                        </span>
                        <span className="text-slate-200 font-semibold">{card.typicalSquad}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <i className="fa-solid fa-location-dot text-brand-red text-xs" />
                          <span>Coverage:</span>
                        </span>
                        <span className="text-slate-200 font-semibold">{card.locations}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Buttons */}
                  <div className="flex items-center gap-2 pt-5 mt-5 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(`Booking: ${card.title}`)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-brand-red hover:bg-red-700 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-red-950/40 cursor-pointer"
                    >
                      <i className="fa-solid fa-calendar-check text-[11px]" />
                      <span>Book This Squad</span>
                    </button>
                    <a
                      href={`https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20am%20inquiring%20about%20bouncers%20for%20${encodeURIComponent(card.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      title="Direct WhatsApp"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                    <a
                      href="tel:+918806078677"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                      title="Direct Call"
                    >
                      <i className="fa-solid fa-phone text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MANPOWER SIZING GUIDE / QUICK ESTIMATOR
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#121318] border-y border-[#272930]">
        <div ref={calculatorRef} className={`max-w-7xl mx-auto transition-all duration-700 ${calculatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 text-xs font-mono text-brand-red font-bold uppercase tracking-widest">
              DEPLOYMENT SIZING GUIDELINE
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-3 mb-2">
              HOW MANY BOUNCERS DO YOU <span className="text-gradient-red">NEED?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Recommended security force sizing based on attendance, venue type, and crowd profile across Pune and Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="p-6 rounded-2xl bg-[#181920] border border-[#272930] hover:border-brand-red/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">INTIMATE &amp; PRIVATE</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300">20 - 150 GUESTS</span>
                </div>
                <h3 className="font-heading font-black text-xl text-white uppercase mb-2">Private Birthday / Villa Party</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Ideal for milestone birthday parties, private farmhouse poolside gatherings, and executive family dinners.
                </p>
                <div className="bg-[#121318] p-4 rounded-xl border border-white/5 space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Suited Bouncers:</span>
                    <span className="font-bold text-white">2 to 4 Bouncers</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Gate Screening:</span>
                    <span className="font-bold text-emerald-400">Included</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Lady Guard (optional):</span>
                    <span className="font-bold text-white">1 on request</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenBooking('Private Event / Birthday Squad (2-4 Bouncers)')}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Inquire For Private Party
              </button>
            </div>

            {/* Tier 2 */}
            <div className="p-6 rounded-2xl bg-[#1e2029] border-2 border-brand-red shadow-xl shadow-red-950/20 relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-red text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                MOST POPULAR
              </div>
              <div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-red">GRAND CELEBRATIONS</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-red/20 text-brand-red">200 - 800 GUESTS</span>
                </div>
                <h3 className="font-heading font-black text-xl text-white uppercase mb-2">Royal Wedding &amp; Sangeet Gala</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Complete peace of mind for wedding lawns, five-star hotel ballrooms, and large family celebrations.
                </p>
                <div className="bg-[#14151c] p-4 rounded-xl border border-brand-red/20 space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Executive Bouncers:</span>
                    <span className="font-bold text-white">6 to 12 Bouncers</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Trained Lady Guards:</span>
                    <span className="font-bold text-white">2 Lady Guards</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Event Captain:</span>
                    <span className="font-bold text-brand-red">1 Dedicated Officer</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Jewelry / Gift Vigil:</span>
                    <span className="font-bold text-emerald-400">24/7 Monitored</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenBooking('Royal Wedding / Sangeet Squad (6-12 Bouncers)')}
                className="w-full py-2.5 rounded-xl bg-brand-red hover:bg-red-700 text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md shadow-red-900/40 cursor-pointer"
              >
                Inquire For Wedding &amp; Sangeet
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-6 rounded-2xl bg-[#181920] border border-[#272930] hover:border-brand-red/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">MEGA SCALE</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300">1,000+ ATTENDEES</span>
                </div>
                <h3 className="font-heading font-black text-xl text-white uppercase mb-2">Concert / Dandiya / Festival</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  High-energy stadiums, open festival grounds, college youth fests, and multi-day religious gatherings.
                </p>
                <div className="bg-[#121318] p-4 rounded-xl border border-white/5 space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tactical Force:</span>
                    <span className="font-bold text-white">20 to 80+ Bouncers</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">DFMD &amp; HHMD Detectors:</span>
                    <span className="font-bold text-emerald-400">Full Equipment</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Police Liaison:</span>
                    <span className="font-bold text-white">Included</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenBooking('Mega Festival / Concert Security (20+ Bouncers)')}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Inquire For Mega Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY LEGEND SECURITY FOR EVENTS?
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 text-xs font-mono text-brand-red font-bold uppercase tracking-widest">
              UNCOMPROMISING STANDARDS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-3 mb-2">
              WHY HOSTS TRUST <span className="text-gradient-red">THE LEGEND SECURITY</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We never compromise on character, grooming, or discipline. Here is what separates our event security from ordinary guard contractors.
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'fa-shield-halved',
                title: '100% Police Verified Bouncers',
                desc: 'Strict background checks with police verification and zero criminal history. You can welcome our team into your home, wedding mandap, and family gatherings with complete trust.',
              },
              {
                icon: 'fa-person-dress',
                title: 'Specialized Lady Bouncers',
                desc: 'Trained female security personnel to safeguard the bride, assist women guests, monitor ladies washrooms, and manage female queue frisking respectfully.',
              },
              {
                icon: 'fa-user-tie',
                title: 'Impeccable Grooming & Uniforms',
                desc: 'Well-fitted black two-piece suits, formal blazers, or crisp black tactical security polos. Our team enhances your event’s grandeur rather than looking out of place.',
              },
              {
                icon: 'fa-handshake-angle',
                title: 'Courteous Conflict De-escalation',
                desc: 'Trained to defuse heated situations, intoxicated guests, or uninvited intruders politely and firmly without creating a scene or embarrassing the hosts.',
              },
              {
                icon: 'fa-walkie-talkie',
                title: 'Wireless Earpieces & Comms',
                desc: 'All key bouncers and gate captains are linked via discrete wireless radio headsets for silent, instantaneous coordination between the entrance, stage, and parking.',
              },
              {
                icon: 'fa-truck-fast',
                title: 'Emergency Standby Reserve',
                desc: 'Stationed reserves in Pune & Mumbai ready to dispatch additional manpower within 45 minutes should your crowd footfall exceed expectations.',
              },
            ].map((feat, fIdx) => (
              <div
                key={fIdx}
                className={`p-6 rounded-2xl bg-[#14151c] border border-[#272930] hover:border-brand-red/60 transition-all ${
                  featuresVisible[fIdx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red mb-4">
                  <i className={`fa-solid ${feat.icon} text-lg`} />
                </div>
                <h4 className="font-heading font-black text-base uppercase text-white mb-2">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ON-GROUND REAL SQUAD GALLERY STRIP
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#0e0f14] border-t border-[#272930]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
                ON-GROUND REAL ACTION
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
                OUR EVENT BOUNCERS &amp; SQUADS <span className="text-gradient-red">IN ACTION</span>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-brand-red hover:text-white transition-colors"
            >
              <span>View Full Gallery (33+ Real Photos)</span>
              <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </div>

          <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {realGallery.map((item, gIdx) => (
              <div
                key={gIdx}
                className={`relative rounded-xl overflow-hidden aspect-square group bg-black/40 cursor-pointer border border-white/5 hover:border-brand-red transition-all ${
                  galleryVisible[gIdx] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onClick={() => setPreviewImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                  <p className="text-[10px] font-heading font-bold text-white leading-tight uppercase truncate">{item.title}</p>
                  <p className="text-[9px] font-mono text-brand-red">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CALL TO ACTION / EVENT BOOKING BANNER
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0a0a0c] via-red-950/20 to-[#0a0a0c] border-t border-[#272930] relative overflow-hidden">
        <div ref={ctaRef} className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-16 h-16 rounded-2xl bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red mx-auto mb-6 shadow-xl shadow-red-900/20">
            <i className="fa-solid fa-champagne-glasses text-2xl" />
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
            PLANNING AN EVENT IN <span className="text-gradient-red">MAHARASHTRA?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Ensure your wedding, birthday celebration, concert, or corporate meet is remembered for its elegance and seamless safety. Connect directly with Director <strong className="text-white">Mr. Mosin Azam Shaikh</strong> today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => handleOpenBooking('Custom Event Security Deployment')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check" />
              <span>Book Event Bouncers Online</span>
            </button>

            <a
              href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20want%20to%20book%20security%20and%20bouncers%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>Instant WhatsApp Discussion</span>
            </a>

            <a
              href="tel:+918806078677"
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-phone text-brand-red" />
              <span>+91 88060 78677</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-slate-400 font-mono text-xs">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-check text-emerald-400" />
              <span>PSARA License Verified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-check text-emerald-400" />
              <span>Fast 2-Hour Confirmation</span>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-check text-emerald-400" />
              <span>Direct Director Desk</span>
            </span>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialType={selectedAuditType}
      />

      {/* Image Preview Lightbox */}
      <ImageModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        image={previewImage}
      />
    </div>
  );
}
