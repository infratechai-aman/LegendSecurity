import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import ImageModal from '../components/ImageModal';

export default function EventsPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAuditType, setSelectedAuditType] = useState('Event Security Command & Crowd Control');
  const [previewImage, setPreviewImage] = useState(null);
  const [activeDetailEvent, setActiveDetailEvent] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDetailEvent(null);
      }
    };
    if (activeDetailEvent) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeDetailEvent]);

  // Filter state for event cards
  const [activeFilter, setActiveFilter] = useState('all');

  const eventCategories = [
    {
      id: 'wedding',
      category: 'wedding',
      title: 'Royal Weddings & Sangeet Receptions',
      marathiTitle: 'भव्य विवाह व संगीत सोहळा सुरक्षा',
      categoryLabel: 'Weddings & Receptions',
      image: '/assets/events/indian_wedding_security.jpg',
      tagline: 'Flawless dignity, grand hospitality & uncompromising VIP safety.',
      summary: 'Every grand Indian celebration deserves hospitality that honors your guests and security that keeps your family entirely at ease. Our suited officers and lady guards blend courteous warmth with quiet vigilance across entry gates, jewelry rooms, and stage cordons.',
      pillars: [
        { title: 'Baraat & Entry Welcome', desc: 'Courteous guest list verification, smooth valet flow, and welcoming entrance escort.' },
        { title: 'Bridal Suite & Stage Cordon', desc: 'Dedicated lady bouncers protecting the bride, family jewelry, and VIP stage access.' },
        { title: 'Safe Evening Dispersal', desc: 'Late-night departure assistance for families and secure transport of gifts and valuables.' },
      ],
      features: [
        'Baraat Procession & Entryway Escort Squad',
        'Bridal Room, Jewelry & Cash Gift Safeguard',
        'Trained Lady Bouncers for Bride & Women Guests',
        'Strict Invitation Card & Guest List Verification',
        'VIP Stage Cordon & Celebrity Guest Escort',
        'Valet Parking & Traffic Congestion Mitigation',
      ],
      turnout: 'Black 2-Piece Suits / Blazers with Earpieces',
      typicalSquad: '6 to 15 Bouncers + Lady Guards + Event Captain',
      locations: 'Pune • Mumbai • Lonavala • Mahabaleshwar • All Maharashtra',
    },
    {
      id: 'birthday',
      category: 'private',
      title: 'Milestone Birthdays & Luxury Celebrations',
      marathiTitle: 'वाढदिवस व खाजगी पार्ट्यांचे संरक्षण',
      categoryLabel: 'Private & Birthdays',
      image: '/assets/events/indian_birthday_security.jpg',
      tagline: 'Warm welcome for your guests, zero entry for uninvited intruders.',
      summary: 'Private family celebrations require attentive safety without a heavy-handed atmosphere. Our bouncers maintain courteous entryway screening, prevent gatecrashers, and ensure a joyful, safe atmosphere for kids and families.',
      pillars: [
        { title: 'Guest List Verification', desc: 'Welcoming entrance checks that keep uninvited party-crashers strictly outside.' },
        { title: 'Family & Poolside Safety', desc: 'Attentive safety marshals around pool, banquet halls, and children play zones.' },
        { title: 'Gift & Valuables Watch', desc: 'Discreet oversight of gift tables and courteous parking departure escort.' },
      ],
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
      categoryLabel: 'Concerts & Festivals',
      image: '/assets/events/indian_concert_dandiya.jpg',
      tagline: 'Mass crowd control, barricade containment & artist stage defense.',
      summary: 'High-energy musical concerts and festive Dandiya nights demand experienced crowd containment. We deploy battle-tested barricade personnel, emergency crowd-surge handlers, backstage green room cordons, and metal detector entry points.',
      pillars: [
        { title: 'Barricade & Surge Control', desc: 'Battle-tested front-stage containment, keeping artists and performers secure.' },
        { title: 'Women Safety Zone', desc: 'Dedicated female bouncers and rapid response teams for family security.' },
        { title: 'Metal Detection Gating', desc: 'Door-frame scanners and gentle frisking for contraband-free entry.' },
      ],
      features: [
        'Heavy-Duty Front Stage & Barricade Defense',
        'Artist & VIP Green Room Close-Protection',
        'DFMD (Door Frame Metal Detectors) & Frisking',
        'Alcohol/Contraband Confiscation at Entry',
        'Dedicated Women Safe Zone & Lady Bouncers',
        'Emergency Evacuation Corridor Management',
      ],
      turnout: 'Executive Black Polos with ID Badges',
      typicalSquad: '15 to 80+ Bouncers + Metal Detectors + Supervisors',
      locations: 'Pune Grounds • Mumbai MMRDA • Navi Mumbai • Nashik',
    },
    {
      id: 'corporate',
      category: 'corporate',
      title: 'Corporate Galas, Awards & Annual Meets',
      marathiTitle: 'कॉर्पोरेट वार्षिक पुरस्कार व संमेलन',
      categoryLabel: 'Corporate Summits',
      image: '/assets/events/indian_corporate_gala.jpg',
      tagline: 'Corporate polish, bilingual officers & board-level discretion.',
      summary: 'High-profile corporate galas and leadership conferences require security that reflects sophistication. Our officers are impeccably groomed, bilingual in English and Hindi, and experienced in board-level protocol.',
      pillars: [
        { title: 'Dignitary & CEO Protection', desc: 'Articulate, suited officers trained in executive protocol and confidential meetings.' },
        { title: 'Badge & Registration Gate', desc: 'Streamlined delegate access, green-room security, and VIP vehicle staging.' },
        { title: 'Auditorium Management', desc: 'Silent communication earpieces and emergency evacuation readiness.' },
      ],
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
      categoryLabel: 'Villa & Farmhouse',
      image: '/assets/events/indian_farmhouse_vip.jpg',
      tagline: 'Total privacy, anti-paparazzi protocols & secluded perimeter security.',
      summary: 'Exclusive private gatherings at luxury villas demand absolute confidentiality. We enforce strict NDAs, manage private vehicle entry, secure poolside parameters, and prevent unauthorized cameras or drones.',
      pillars: [
        { title: 'Total Privacy & NDA', desc: 'Strict non-disclosure discipline, preventing unauthorized photos, paparazzi, or drones.' },
        { title: 'Estate Perimeter Lock', desc: 'Main gate access checkpoint, private car logs, and boundary fence watch.' },
        { title: 'Poolside & Overnight Vigil', desc: 'Late-night pool safety and 24/7 patrol for multi-day luxury villa retreats.' },
      ],
      features: [
        'Perimeter Gatekeeper & Valet Car Checkpoint',
        'Strict NDA Discipline — Complete Client Privacy',
        'Anti-Paparazzi, Drone Watch & Camera Shielding',
        'Infinity Pool Area Safety Marshals',
        'Overnight Vigilance for Multi-Day Villa Rentals',
        '24/7 Motorized Perimeter Patrol Capability',
      ],
      turnout: 'Dark Charcoal Blazers / Executive Suits',
      typicalSquad: '4 to 10 Bodyguards & Suited Bouncers',
      locations: 'Lonavala • Khandala • Alibaug • Mulshi • Mahabaleshwar',
    },
    {
      id: 'utsav',
      category: 'public',
      title: 'Ganesh Utsav, Shobha Yatra & Cultural Fests',
      marathiTitle: 'सार्वजनिक गणेशोत्सव व धार्मिक यात्रा',
      categoryLabel: 'Religious & Cultural',
      image: '/assets/events/indian_festival_utsav.jpg',
      tagline: 'Disciplined devotion, orderly queues & joint police liaison.',
      summary: 'Maharashtra’s world-renowned festivals witness massive devotee attendance. Our squads work in close coordination with local police to regulate peaceful darshan queues, family safety, and ornament protection.',
      pillars: [
        { title: 'Peaceful Queue Flow', desc: 'Disciplined barricade lanes for smooth general and VIP darshan movement.' },
        { title: 'Family & Elder Escort', desc: 'Gentle assistance for elderly devotees and children amidst dense crowds.' },
        { title: 'Prasad & Ornament Watch', desc: '24/7 vigil over temple donation counters and active police liaison.' },
      ],
      features: [
        'Barricaded Queue Flow & VIP Darshan Lines',
        'Child & Senior Citizen Safe Escort Assistance',
        'Joint Operations Coordination with Local Police',
        'Anti-Pickpocketing & Surveillance Spotters',
        'Multi-Day Continuous 24/7 Shift Rotations',
        'Prasad Counter & Gold Ornament Vigilance',
      ],
      turnout: 'Tailored Event Uniforms & High-Vis Vests',
      typicalSquad: '10 to 50+ Bouncers + Supervisors',
      locations: 'Pune • Mumbai • Kolhapur • Solapur • All Maharashtra',
    },
    {
      id: 'stadium',
      category: 'public',
      title: 'Sports Championships & Stadium Tournaments',
      marathiTitle: 'क्रीडा स्पर्धा, क्रिकेट व स्टेडियम बंदोबस्त',
      categoryLabel: 'Sports & Tournaments',
      image: '/assets/guards_event_stadium.jpg',
      tagline: 'Perimeter vigilance, athlete safety & grandstand management.',
      summary: 'High-intensity athletic tournaments require disciplined field perimeter defense. We provide dugout protection, referee escorts, pitch invasion deterrents, and disciplined fan dispersal.',
      pillars: [
        { title: 'Pitch Invasion Deterrent', desc: 'Rapid interception officers along the perimeter protecting players and referees.' },
        { title: 'Grandstand Order', desc: 'Ticket gate management and conflict de-escalation for high-energy fan zones.' },
        { title: 'Team Bus & Dressing Room', desc: 'Sterile access cordons for visiting sports stars and match officials.' },
      ],
      features: [
        'Player Dugout & Match Official Cordon',
        'Anti-Pitch Invasion Rapid Interception Team',
        'Grandstand Segment & Entry Turnstile Security',
        'Medical & First Responder Team Coordination',
      ],
      turnout: 'Athletic Security Uniforms & Badges',
      typicalSquad: '12 to 40+ Guards & Bouncers',
      locations: 'Pune Stadiums • Mumbai Sports Complexes • University Grounds',
    },
    {
      id: 'exhibition',
      category: 'corporate',
      title: 'Expos, Luxury Auto Shows & Jewelry Exhibitions',
      marathiTitle: 'भव्य प्रदर्शने, ऑटो एक्सपो व ज्वेलरी मेळावे',
      categoryLabel: 'Expos & Trade Shows',
      image: '/assets/bouncers_event_lineup.jpg',
      tagline: 'High-value bullion safety, visitor baggage scanning & booth vigil.',
      summary: 'Trade exhibitions and luxury expos house crores of rupees worth of merchandise. We provide armed escort for bullion delivery, baggage frisking, visitor flow control, and overnight hall surveillance.',
      pillars: [
        { title: 'High-Value Asset Vigil', desc: 'Surveillance over luxury automobiles, bullion showcases, and designer booths.' },
        { title: 'Visitor Baggage Frisking', desc: 'Metal detector gates and courteous visitor bag inspection points.' },
        { title: 'Overnight Hall Lockout', desc: 'Tamper-evident sealing and night-shift armed guard cordons.' },
      ],
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
    { src: '/assets/bouncers_event_lineup.jpg', title: 'Event Security Lineup', location: 'Pune Event Ground' },
    { src: '/assets/gallery/photo_6.jpg', title: 'Executive Suited Officers', location: 'Luxury Venue' },
    { src: '/assets/gallery/photo_8.jpg', title: 'Celebration Crowd Flow', location: 'Maharashtra' },
    { src: '/assets/gallery/photo_23.jpg', title: 'VIP Close Protection Detail', location: 'Pune' },
    { src: '/assets/gallery/photo_9.jpg', title: 'Night Venue Concierge Team', location: 'Private Club' },
    { src: '/assets/guards_event_stadium.jpg', title: 'Tournament Perimeter Guard', location: 'Sports Arena' },
  ];

  const handleOpenBooking = (type) => {
    setSelectedAuditType(type || 'Event Security Command & Crowd Control');
    setIsBookingModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#0a0a0c] text-white">

      {/* ══════════════════════════════════════════
          HERO SECTION — Minimal, Smooth & Refined
      ══════════════════════════════════════════ */}
      <section className="relative w-full pt-28 pb-12 sm:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-white/10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[350px] bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider mb-4 sm:mb-6 text-slate-400 font-medium">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Events &amp; Celebrations</span>
          </nav>

          {/* Regional Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs text-slate-300 font-medium tracking-wide">
              Event Security &amp; Concierge • Pune, Mumbai &amp; Maharashtra
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-4xl leading-[1.12] mb-4 text-white">
            Premier Event Security &amp; <span className="text-gradient-red">Celebrations</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
            From royal Indian weddings (<strong className="text-white font-medium">विवाह सोहळा</strong>) and milestone birthdays to concerts and corporate galas — protected by vetted, suited bouncers and lady guards who honor your family’s prestige.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleOpenBooking('Event Security Command & Crowd Control')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-semibold text-xs uppercase tracking-wider shadow-lg shadow-red-900/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Book Event Squad</span>
            </button>

            <a
              href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20need%20event%20bouncers%20and%20security%20for%20an%20upcoming%20celebration."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>WhatsApp Inquiries</span>
            </a>

            <a
              href="tel:+918806078677"
              className="px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone text-brand-red text-xs" />
              <span>+91 88060 78677</span>
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 w-full max-w-3xl pt-8 border-t border-white/10 text-center">
            <div className="p-3 rounded-xl bg-white/[0.02]">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-white">450+</span>
              <p className="text-xs text-slate-400 mt-0.5">Weddings &amp; Galas</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02]">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-brand-red">100%</span>
              <p className="text-xs text-slate-400 mt-0.5">Police Verified</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02]">
              <span className="font-heading font-bold text-lg sm:text-2xl text-white">Lady Guards</span>
              <p className="text-xs text-slate-400 mt-0.5">Available On Request</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02]">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-emerald-400">45 Mins</span>
              <p className="text-xs text-slate-400 mt-0.5">Rapid Reserve</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHITE SECTION: CATEGORY FILTER TABS + EVENT IMAGE CARDS
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#f8f9fa] text-slate-900 border-t-2 border-slate-200">

        {/* ── FILTER TABS — Clean Light Bar ── */}
        <section className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 sticky top-[76px] sm:top-[82px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full sm:w-auto py-1">
              {[
                { id: 'all', label: 'All Celebrations (8)', icon: 'fa-layer-group' },
                { id: 'wedding', label: 'Weddings & Sangeet', icon: 'fa-heart' },
                { id: 'private', label: 'Birthdays & Private', icon: 'fa-cake-candles' },
                { id: 'public', label: 'Concerts & Fests', icon: 'fa-guitar' },
                { id: 'corporate', label: 'Corporate Galas', icon: 'fa-briefcase' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeFilter === tab.id
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} text-[10px]`} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleOpenBooking('Custom Event Security Deployment')}
              className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <i className="fa-solid fa-headset text-xs" />
              <span>Custom Quote</span>
            </button>
          </div>
        </section>

        {/* ── EVENT CARDS GRID — Pristine White Section ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-2 block">
                Tailored Event Coverage
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Select Your Celebration
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
                Tap on any celebration below to view security details and request dedicated suited personnel.
              </p>
            </div>

            {/* Sleek Visual Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredCategories.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setActiveDetailEvent(card)}
                  className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.15)] hover:border-brand-red transition-all duration-300 cursor-pointer flex flex-col justify-between p-5 bg-slate-900"
                >
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/30 transition-all duration-300" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-slate-100 border border-white/15 backdrop-blur-md">
                      {card.categoryLabel}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-black/50 group-hover:bg-brand-red text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                    </span>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-red-300 transition-colors drop-shadow-md leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs text-amber-200/90 font-medium tracking-wide mt-1">
                      {card.marathiTitle}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-1 opacity-90 font-light">
                      {card.tagline}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-slate-300 group-hover:text-white">
                      <span>{card.typicalSquad.split('+')[0]}</span>
                      <span className="text-brand-red font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Details</span>
                        <i className="fa-solid fa-chevron-right text-[10px]" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHITE SUB-SECTION 1: SIZING ESTIMATOR ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-2 block">
                Deployment Guidelines
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Recommended Force Sizing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
                Standard crowd ratios for celebrations across Pune and Maharashtra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Tier 1 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Private Parties</span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">20 - 150 Guests</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Birthdays &amp; Villas</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-light">
                    Ideal for milestone birthdays, private farmhouse dinners, and private terrace gatherings.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 mb-6 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Suited Bouncers:</span>
                      <span className="font-medium text-slate-900">2 to 4 Bouncers</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Gate Screening:</span>
                      <span className="font-medium text-emerald-600">Included</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Lady Guard:</span>
                      <span className="font-medium text-slate-900">1 on request</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Private Event / Birthday Squad (2-4 Bouncers)')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
                >
                  Inquire For Private Party
                </button>
              </div>

              {/* Tier 2 */}
              <div className="p-6 rounded-2xl bg-white border border-brand-red/30 ring-1 ring-brand-red/20 shadow-md relative flex flex-col justify-between">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-red text-white text-[10px] font-medium tracking-wide uppercase shadow-sm">
                  Recommended for Weddings
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">Grand Celebrations</span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-red-50 text-brand-red font-medium">200 - 800 Guests</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">Weddings &amp; Sangeet</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-light">
                    Complete hospitality and security for hotel ballrooms, marriage lawns, and family galas.
                  </p>
                  <div className="bg-red-50/40 p-4 rounded-xl border border-red-100/80 space-y-2 mb-6 text-xs">
                    <div className="flex justify-between text-slate-700">
                      <span>Executive Bouncers:</span>
                      <span className="font-medium text-slate-900">6 to 12 Bouncers</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Lady Guards:</span>
                      <span className="font-medium text-slate-900">2 Lady Guards</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Event Captain:</span>
                      <span className="font-medium text-brand-red">1 Dedicated Officer</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Royal Wedding / Sangeet Squad (6-12 Bouncers)')}
                  className="w-full py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  Inquire For Wedding &amp; Sangeet
                </button>
              </div>

              {/* Tier 3 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Arena &amp; Festivals</span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">1,000+ Attendees</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Concerts &amp; Fests</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-light">
                    High-volume festivals, open university lawns, Dandiya grounds, and multi-day gatherings.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 mb-6 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Security Personnel:</span>
                      <span className="font-medium text-slate-900">20 to 80+ Officers</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Metal Scanners:</span>
                      <span className="font-medium text-emerald-600">Full Equipment</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Police Liaison:</span>
                      <span className="font-medium text-slate-900">Included</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Mega Festival / Concert Security (20+ Bouncers)')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
                >
                  Inquire For Large Event
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHITE SUB-SECTION 2: WHY HOSTS TRUST US ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-2 block">
                The Legend Standard
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Why Hosts Trust Our Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
                Professionalism, impeccable grooming, and polite de-escalation for your guests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: 'fa-shield-halved', title: '100% Police Verified', desc: 'Thorough background checks and clean records ensure complete peace of mind for private homes and venues.' },
                { icon: 'fa-person-dress', title: 'Dedicated Lady Bouncers', desc: 'Specialized female officers for bridal suites, women guests, and respectful female queue management.' },
                { icon: 'fa-user-tie', title: 'Impeccable Grooming', desc: 'Sharp black suits, blazers, and lanyards that enhance the grandeur of your celebration.' },
                { icon: 'fa-handshake-angle', title: 'Polite De-escalation', desc: 'Courteous resolution of heated situations or uninvited intruders without creating scenes or embarrassment.' },
                { icon: 'fa-walkie-talkie', title: 'Discreet Radio Earpieces', desc: 'Quiet, instantaneous communication linking the entrance, stage, and parking areas.' },
                { icon: 'fa-truck-fast', title: '45-Min Standby Reserve', desc: 'On-demand reinforcement squads ready in Pune and Mumbai if guest numbers exceed expectations.' },
              ].map((feat, fIdx) => (
                <div key={fIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center text-sm mb-3">
                    <i className={`fa-solid ${feat.icon}`} />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 mb-1.5">{feat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHITE SUB-SECTION 3: REAL PHOTOS GALLERY ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#f8f9fa]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-xs font-semibold text-brand-red uppercase tracking-wider block">
                  Real Deployments
                </span>
                <h2 className="font-heading font-bold text-2xl text-slate-900 tracking-tight mt-1">
                  On-Ground Squads in Action
                </h2>
              </div>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red hover:text-slate-900 transition-colors"
              >
                <span>View Full Gallery (33+ Photos)</span>
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {realGallery.map((item, gIdx) => (
                <div
                  key={gIdx}
                  className="relative rounded-xl overflow-hidden aspect-square group bg-slate-200 cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  onClick={() => setPreviewImage(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                    <p className="text-[10px] font-semibold text-white leading-tight truncate">{item.title}</p>
                    <p className="text-[9px] text-amber-200">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════
          CALL TO ACTION / EVENT BOOKING BANNER
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#0c0d11] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-white tracking-tight mb-3">
            Planning a Celebration in Maharashtra?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Ensure your wedding, birthday celebration, concert, or corporate meet is remembered for its elegance and seamless safety. Connect directly with Director <strong className="text-white font-medium">Mr. Mosin Azam Shaikh</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={() => handleOpenBooking('Custom Event Security Deployment')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-semibold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Book Event Squad Online</span>
            </button>

            <a
              href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20want%20to%20book%20security%20and%20bouncers%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>WhatsApp Inquiry</span>
            </a>

            <a
              href="tel:+918806078677"
              className="px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone text-brand-red text-xs" />
              <span>+91 88060 78677</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MINIMAL, SMOOTH & LUXURY DETAIL MODAL
          (Replaces robotic jargon with refined luxury copy & cards)
      ══════════════════════════════════════════ */}
      {activeDetailEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-backdrop-fade"
          onClick={() => setActiveDetailEvent(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0e0f14] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto animate-modal-pop flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Banner */}
            <div className="relative w-full h-44 sm:h-56 overflow-hidden shrink-0">
              <img
                src={activeDetailEvent.image}
                alt={activeDetailEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/40 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveDetailEvent(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer border border-white/15"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark text-xs" />
              </button>

              {/* Category Pill */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/40 text-slate-200 border border-white/15 backdrop-blur-md">
                  {activeDetailEvent.categoryLabel}
                </span>
              </div>

              {/* Titles */}
              <div className="absolute bottom-3 left-4 sm:left-6 right-4 sm:right-6 z-10">
                <h3 className="font-heading font-semibold text-lg sm:text-2xl text-white tracking-tight drop-shadow-md">
                  {activeDetailEvent.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 font-normal tracking-wide mt-0.5">
                  {activeDetailEvent.marathiTitle}
                </p>
              </div>
            </div>

            {/* Body — Minimal, Luxurious & Spacious */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
              {/* Tagline & Executive Summary */}
              <div className="space-y-2">
                {activeDetailEvent.tagline && (
                  <p className="text-xs sm:text-sm text-slate-200 italic font-light leading-relaxed border-l-2 border-brand-red pl-3">
                    "{activeDetailEvent.tagline}"
                  </p>
                )}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {activeDetailEvent.summary || activeDetailEvent.desc}
                </p>
              </div>

              {/* 3 Clean Focus Pillars (Minimal cards, zero clutter) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {activeDetailEvent.pillars?.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/15 transition-all text-left"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                      <p className="font-heading font-semibold text-xs text-white tracking-wide">{p.title}</p>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">{p.desc}</p>
                  </div>
                ))}
              </div>

              {/* Clean Inline Specs Row */}
              <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-slate-400 font-light">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-user-tie text-brand-red text-xs" />
                  <span className="text-slate-200">{activeDetailEvent.turnout}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-users text-brand-red text-xs" />
                  <span className="text-slate-200">{activeDetailEvent.typicalSquad.split('+')[0]}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-brand-red text-xs" />
                  <span className="text-slate-200">Pune • Mumbai • All MH</span>
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-3.5 sm:p-4 bg-[#0a0b0e] border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const evTitle = activeDetailEvent.title;
                  setActiveDetailEvent(null);
                  handleOpenBooking(`Booking: ${evTitle}`);
                }}
                className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-brand-red to-red-600 hover:brightness-110 text-white font-heading font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-red-950/40 cursor-pointer"
              >
                <i className="fa-solid fa-calendar-check text-xs" />
                <span>Book This Squad</span>
              </button>

              <a
                href={`https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20want%20to%20book%20bouncers%20for%20${encodeURIComponent(activeDetailEvent.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>WhatsApp Inquiry</span>
              </a>

              <a
                href="tel:+918806078677"
                className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white font-heading font-medium text-xs transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-phone text-brand-red text-xs" />
                <span>+91 88060 78677</span>
              </a>
            </div>

          </div>
        </div>
      )}

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
