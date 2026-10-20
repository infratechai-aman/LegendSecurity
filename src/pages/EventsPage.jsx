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
      desc: 'Royal Indian weddings, destination marriages, high-profile Sangeet nights, and Baraat processions demand refined, polite yet formidable security. We manage entryway access, gifts & jewelry room protection, VIP stage cordons, and smooth valet traffic.',
      detailedStory: 'An Indian wedding is the pinnacle of family pride and celebration. Our elite event squads arrive 90 minutes prior to the Baraat procession to conduct complete venue perimeter sweeps, coordinate with the hotel/banquet management, and establish discreet security cordons. Our officers maintain a welcoming, courteous demeanor at the entrance, verifying guest invitations without creating delays, while specialized lady guards remain stationed by the bridal suite, safeguarding bride safety, heavy jewelry, and cash gifts. During high-volume Sangeet dance performances, we maintain stage perimeter discipline, keeping unauthorized individuals from crowding the stage or embarrassing the hosts.',
      timeline: [
        { phase: 'Phase 1: Pre-Baraat Sweep', desc: 'Entry checkpoint activation, bridal suite lockout verification, and valet lane congestion mitigation.' },
        { phase: 'Phase 2: Live Celebration Vigil', desc: 'Baraat procession escort, stage VIP defense, discreet beverage zone monitoring, and gift room 24/7 vigil.' },
        { phase: 'Phase 3: Safe Dispersal & Vaulting', desc: 'Cash & jewelry escort to safe storage, night parking exit assistance, and final venue handover.' },
      ],
      features: [
        'Baraat Procession & Entryway Escort Squad',
        'Bridal Room, Jewelry & Cash Gift Safeguard',
        'Trained Lady Bouncers for Bride & Women Guests',
        'Strict Invitation Card & Guest List Verification',
        'VIP Stage Cordon & Celebrity Guest Escort',
        'Valet Parking & Traffic Congestion Mitigation',
        'Discreet Conflict De-escalation (Zero Embarrassment)',
        'Wireless Earpieces for Instant Coordination',
      ],
      turnout: 'Black 2-Piece Suits / Blazers with Wireless Earpieces',
      typicalSquad: '6 to 15 Bouncers + 2 Lady Guards + 1 Event Commander',
      equipment: 'Wireless Radio Headsets, Door Frame Metal Detectors (on request), Crowd Cordons',
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
      desc: 'From grand 1st birthday bashes to 18th/21st milestones and 50th golden jubilee celebrations at premium banquet halls, hotels, and lawns. Our bouncers maintain courteous entryway screening, prevent gatecrashers, and ensure a joyful, safe atmosphere for kids and families.',
      detailedStory: 'Private celebrations demand high vigilance without a heavy-handed atmosphere. Our bouncers are specifically trained in family hospitality — greeting guests warmly, verifying QR codes or printed invites, and keeping uninvited party-crashers strictly outside. We provide active monitoring around bar areas to defuse arguments or intoxicated behavior before it escalates, keep a vigilant eye on children near swimming pools or busy banquet exits, and maintain direct oversight of the gift and cake tables throughout the evening.',
      timeline: [
        { phase: 'Phase 1: Guest List Gating', desc: 'Strict invitation & QR verification at the gate to prevent uninvited trespassers.' },
        { phase: 'Phase 2: Atmosphere Safeguard', desc: 'Continuous vigil across banquet hall, bar counters, children play zones, and poolside areas.' },
        { phase: 'Phase 3: Exit & Valuables Watch', desc: 'Assisting senior citizens and families to valet parking, monitoring gift transport.' },
      ],
      features: [
        'Courteous Door Entry & QR/Invite Checking',
        'Gatecrasher Prevention & Venue Perimeter Watch',
        'Kids & Elderly Safety Monitoring in Banquet Area',
        'Bar Area & Beverage Zone De-escalation',
        'Gift Table & Valuables Continuous Supervision',
        'Discreet, Polite & Family-Friendly Demeanor',
        'Pool Area Safety Marshals for Farmhouse Bashes',
        'Emergency First-Aid Ready Personnel',
      ],
      turnout: 'Crisp Black Suits or Sleek Safari Suits',
      typicalSquad: '2 to 6 Well-Groomed Bouncers',
      equipment: 'Wireless Walkie-Talkies, High-Intensity Spotlights, First Aid Kits',
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
      desc: 'Large-scale live music concerts, Navratri Dandiya grounds, celebrity DJ nights, and college cultural festivals attracting thousands. We deploy battle-tested barricade personnel, emergency crowd-surge handlers, backstage green room cordons, and metal detector entry points.',
      detailedStory: 'High-footfall music concerts and Dandiya grounds present intense crowd pressures, surge hazards, and artist security challenges. Legend Security deploys specialized riot and crowd-control veterans equipped with Door Frame Metal Detectors (DFMD), handheld frisking wands, and heavy barricade enforcement teams. We create a fortified sterile zone around the artist green room, maintain a dedicated zero-tolerance corridor for female attendees, confiscate contrabands/alcohol at the turnstiles, and maintain active radio liaison with local police inspectors throughout the show.',
      timeline: [
        { phase: 'Phase 1: Barricade & Frisking Setup', desc: 'Deployment of DFMDs, HHMDs, baggage scanners, and gender-segregated frisking booths.' },
        { phase: 'Phase 2: Live Surge Containment', desc: 'Front-stage barricade defense, artist stage perimeter cordon, and ladies safe-zone monitoring.' },
        { phase: 'Phase 3: Controlled Crowd Dispersal', desc: 'Phase-by-phase gate opening, traffic regulation, and emergency medical exit clearing.' },
      ],
      features: [
        'Heavy-Duty Front Stage & Barricade Defense',
        'Artist & VIP Green Room Close-Protection',
        'DFMD (Door Frame Metal Detectors) & Frisking',
        'Alcohol/Contraband Confiscation at Entry',
        'Dedicated Women Safe Zone & Lady Bouncers',
        'Emergency Evacuation Corridor Management',
        'Direct Coordination with Local Police Stations',
        'Crowd Surge & Panic Mitigation Marshals',
      ],
      turnout: 'Black Tactical Security Polos with Lanyards',
      typicalSquad: '15 to 80+ Bouncers + Metal Detectors + Supervisors',
      equipment: 'Door Frame Metal Detectors, Handheld Friskers, Crowd Control Barricades, Megaphones',
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
      desc: 'Annual general meetings, prestigious corporate excellence awards, global tech summits, and leadership dinners at 5-star hotels (JW Marriott, Conrad, Taj, Hyatt). Our personnel are impeccably groomed, articulate in English and Hindi, and experienced in board-level protocol.',
      detailedStory: 'High-level corporate events require security that mirrors corporate sophistication. Our executive protection officers dress in sharp two-piece suits, communicate articulately in English, Marathi, and Hindi, and understand business etiquette. We oversee delegate registration badges, provide discreet close-protection for visiting foreign dignitaries, board members, and CEOs, ensure confidential strategy rooms remain strictly closed to unauthorized personnel, and handle medical and fire evacuation protocols seamlessly.',
      timeline: [
        { phase: 'Phase 1: Executive Cordoning', desc: 'VIP vehicle drop-off staging, speaker green-room lock, and badge registration validation.' },
        { phase: 'Phase 2: Stage & Boardroom Security', desc: 'Discreet stage protection during awards ceremony, boardroom perimeter guarding.' },
        { phase: 'Phase 3: VIP Convoy Departure', desc: 'Executive motorcade escort to airport / hotels and post-event auditorium sweep.' },
      ],
      features: [
        'VIP Aisle & Speaker Stage Access Control',
        'Registration Desk & Visitor Badge Validation',
        'Executive Protection for MDs, CEOs & Dignitaries',
        'Confidential Strategy Session Perimeter Guarding',
        'Emergency First-Aid & Fire Safety Trained Squad',
        'Seamless Coordination with Hotel Banquet Teams',
        'Strict NDA Compliance & Corporate Discretion',
        'Bilingual Officers (English, Hindi, Marathi)',
      ],
      turnout: 'Premium Black Two-Piece Suits & Lapel Badges',
      typicalSquad: '4 to 12 Executive Protection Bouncers',
      equipment: 'Covert Acoustic Earpieces, Visitor ID Scanners, Medical First-Aid Kit',
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
      desc: 'Exclusive private parties at luxury villas and farmhouses across Lonavala, Khandala, Alibaug, and Pune hills. We enforce strict NDAs (Non-Disclosure Agreements), manage private vehicle entry, secure poolside parameters, and prevent unauthorized cameras or drones.',
      detailedStory: 'Secluded hill station villas and coastal farmhouse parties require comprehensive perimeter protection and impenetrable privacy. Our personnel sign strict legal NDAs to preserve client anonymity. We establish an armed/unarmed guard station at the villa estate entrance, monitor perimeter fences for trespassers or unauthorized photographers/drones, supervise poolside areas to prevent accidental drownings during late-night hours, and provide 24/7 motorized patrols for multi-day weekend retreats.',
      timeline: [
        { phase: 'Phase 1: Estate Perimeter Lock', desc: 'Main gate access checkpoint, vehicle registration logging, and boundary fence inspection.' },
        { phase: 'Phase 2: Privacy & Pool Vigil', desc: 'Anti-camera / drone watch, poolside safety marshals, and uninterrupted interior privacy.' },
        { phase: 'Phase 3: Overnight Surveillance', desc: 'Night shift perimeter patrols, vehicle asset protection, and multi-day handover.' },
      ],
      features: [
        'Perimeter Gatekeeper & Valet Car Checkpoint',
        'Strict NDA Discipline — Complete Client Privacy',
        'Anti-Paparazzi, Drone Watch & Camera Shielding',
        'Infinity Pool Area Safety Marshals',
        'Overnight Vigilance for Multi-Day Villa Rentals',
        '24/7 Motorized Perimeter Patrol Capability',
        'Armed / Unarmed Bodyguards on Demand',
        'Emergency Evacuation Vehicle Standby',
      ],
      turnout: 'Dark Charcoal Blazers / Tactical Covert Wear',
      typicalSquad: '4 to 10 Armed / Unarmed Bodyguards & Bouncers',
      equipment: 'Long-Range Flashlights, Perimeter Sensors, Wireless Radios, Rapid Patrol Vehicle',
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
      desc: 'Maharashtra’s world-renowned Ganesh Utsav pandals, festive Shobha Yatras, Navratri celebrations, and religious processions witness massive footfall. Our squads work in close coordination with local police to regulate peaceful darshan queues and family safety.',
      detailedStory: 'Ganesh Utsav and festive processions in Pune, Mumbai, and across Maharashtra attract hundreds of thousands of devotees. Our mission is maintaining respectful, orderly devotee flow without hurting religious sentiments. We erect organized queue barricades, separate VIP and general darshan queues, provide dedicated assistance to senior citizens and families with children, maintain round-the-clock watch over gold ornaments and donation counters, and deploy covert spotters to eliminate pickpockets.',
      timeline: [
        { phase: 'Phase 1: Queue Flow Architecture', desc: 'Barricade lane configuration, VIP gate setup, and police checkpoint integration.' },
        { phase: 'Phase 2: Continuous Devotee Regulation', desc: 'Peaceful queue pacing, anti-pickpocketing surveillance, and donation safe-box watch.' },
        { phase: 'Phase 3: Visarjan Procession Defense', desc: 'Shobha yatra chariot defense, sound system perimeter guard, and peaceful crowd dispersal.' },
      ],
      features: [
        'Barricaded Queue Flow & VIP Darshan Lines',
        'Child & Senior Citizen Safe Escort Assistance',
        'Joint Operations Coordination with Local Police',
        'Anti-Pickpocketing & Surveillance Spotters',
        'Multi-Day Continuous 24/7 Shift Rotations',
        'Prasad Counter & Gold Ornament Vigilance',
        'Procession Chariot Close Escort Ring',
        'Emergency Medical Evacuation Corridor',
      ],
      turnout: 'Tactical Event Security Uniforms / Vests',
      typicalSquad: '10 to 50+ Bouncers + Supervisors',
      equipment: 'High-Vis Tactical Vests, Wireless Radios, Crowd Megaphones, Emergency Stretcher',
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
      desc: 'Cricket tournaments, state-level marathons, football leagues, and university athletics. We provide dugout protection, referee escorts, pitch invasion deterrents, and disciplined fan dispersal.',
      detailedStory: 'High-intensity athletic tournaments and arena events require disciplined field perimeter defense. Our security teams prevent spectator pitch invasions, protect match officials and players during heated moments, maintain ticket turnstiles, and coordinate fast medical stretcher access for injured players. We ensure that fan energy remains celebratory and orderly from opening whistle to trophy presentation.',
      timeline: [
        { phase: 'Phase 1: Turnstile & Dugout Lock', desc: 'Ticket screening, player dressing room lockdown, and pitch boundary barricade setup.' },
        { phase: 'Phase 2: In-Game Pitch Vigil', desc: 'Rapid interception squad ready to tackle pitch invaders, grandstand dispute pacification.' },
        { phase: 'Phase 3: Presentation & Player Exit', desc: 'Trophy ceremony perimeter ring and team bus secure escort to hotel.' },
      ],
      features: [
        'Player Dugout & Match Official Cordon',
        'Anti-Pitch Invasion Rapid Interception Team',
        'Grandstand Segment & Entry Turnstile Security',
        'Medical & First Responder Team Coordination',
        'Press Conference & Media Zone Management',
        'Player Team Bus Armed / Unarmed Escort',
        'Alcohol & Flare Interception at Gates',
        'Sportsmanship & Fan Dispersal Oversight',
      ],
      turnout: 'Sport Tactical Uniforms / High-Vis Security Badges',
      typicalSquad: '12 to 40+ Guards & Bouncers',
      equipment: 'Body Armor Vests, Boundary Cordons, Multi-Channel Radios, First-Aid Units',
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
      desc: 'Jewelry expos, luxury automobile showcases, trade expos, and fashion runways. We provide armed escort for bullion delivery, baggage frisking, visitor flow control, and overnight hall surveillance.',
      detailedStory: 'Trade exhibitions and luxury expos house crores of rupees worth of merchandise, luxury vehicles, and diamond jewelry. Our security architecture integrates armed transit escorts for bullion arrival, Door Frame Metal Detectors for visitor baggage checking, booth-by-booth surveillance spotters, and stringent overnight hall lockouts with tamper-evident seal audits before handover each morning.',
      timeline: [
        { phase: 'Phase 1: Inward Cargo Escort', desc: 'Armed convoy escort for bullion and luxury assets into the exhibition hall.' },
        { phase: 'Phase 2: Live Showcase Vigilance', desc: 'Baggage screening, visitor flow regulation, and anti-theft booth spotters.' },
        { phase: 'Phase 3: Night Lockout & Seal Inspection', desc: 'Complete hall clearance, thermal door sealing, and overnight armed guard ring.' },
      ],
      features: [
        'High-Value Display Showcase Surveillance',
        'Baggage Scanner & Handheld Metal Detector Teams',
        'Overnight Hall Lockout & Seal Inspection',
        'Armed Escort Coordination for Valuables Transit',
        'Buyer Badge & Trade Visitor Verification',
        'VIP Fashion Runway Stage Cordons',
        'CCTV Room Constant Feed Monitoring',
        'Emergency Fire Hazard & Stampede Prevention',
      ],
      turnout: 'Immaculate Black Suits or PSARA Uniformed Guards',
      typicalSquad: '6 to 25 Guards & Armed Personnel',
      equipment: 'Door Frame Scanners, Handheld Metal Detectors, Vault Locks, Radios',
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
          HERO SECTION — Mobile-Optimized & Immediate Load (NO BLANK SPACE)
      ══════════════════════════════════════════ */}
      <section className="relative w-full pt-24 pb-10 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden tactical-grid border-b border-[#272930]/40">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[350px] bg-brand-red/10 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[250px] sm:w-[400px] h-[200px] sm:h-[300px] bg-amber-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-wider mb-4 sm:mb-6 font-mono font-bold">
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red">Events &amp; Celebrations</span>
          </nav>

          {/* Regional Vanguard Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-red font-bold">
              PUNE • MUMBAI • ALL OVER MAHARASHTRA
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight max-w-5xl leading-[1.12] mb-3 sm:mb-5 text-white">
            PREMIER EVENT SECURITY &amp; <span className="text-gradient-red">CELEBRATION MANAGEMENT</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed mb-3">
            From royal Indian weddings (<strong className="text-white font-medium">विवाह सोहळा</strong>) &amp; milestone birthday parties to high-energy Bollywood concerts, Dandiya nights, celebrity farmhouse bashes, and corporate galas.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-sans">
            Deployed with 100% police-verified, impeccably suited bouncers, polite gatekeepers, and dedicated lady guards who uphold your family’s honor and prestige.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
            <button
              type="button"
              onClick={() => handleOpenBooking('Event Security Command & Crowd Control')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(229,9,20,0.45)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check text-xs" />
              <span>Book Event Squad Now</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <a
              href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20need%20event%20bouncers%20and%20security%20for%20an%20upcoming%20celebration."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>WhatsApp Instant Quote</span>
            </a>

            <a
              href="tel:+918806078677"
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 text-slate-200 font-mono text-xs uppercase transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone text-brand-red text-xs" />
              <span>Call: +91 88060 78677</span>
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12 w-full max-w-4xl pt-6 sm:pt-8 border-t border-white/10">
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-heading font-black text-xl sm:text-3xl text-white">450+</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 text-center">Weddings &amp; Galas</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-heading font-black text-xl sm:text-3xl text-brand-red">100%</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 text-center">Police Verified Force</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-heading font-black text-lg sm:text-3xl text-white">Lady Guards</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 text-center">Available On Request</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-heading font-black text-xl sm:text-3xl text-emerald-400">45 Mins</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5 text-center">Emergency Standby</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHITE SECTION: CATEGORY FILTER TABS + EVENT IMAGE CARDS GRID
          (Requested: Background made clean white, tapping opens animated big card with detailed description)
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#f8f9fa] text-slate-900 border-t-4 border-brand-red">

        {/* ── FILTER TABS — Sticky Light Bar ── */}
        <section className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 sticky top-[76px] sm:top-[82px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full sm:w-auto py-1">
              <span className="hidden md:flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-slate-500 mr-2 shrink-0">
                <i className="fa-solid fa-filter text-brand-red" />
                <span>Event:</span>
              </span>
              {[
                { id: 'all', label: 'All Celebrations (8)', icon: 'fa-layer-group' },
                { id: 'wedding', label: 'Weddings & Sangeet', icon: 'fa-heart' },
                { id: 'private', label: 'Birthdays & Parties', icon: 'fa-cake-candles' },
                { id: 'public', label: 'Concerts & Fests', icon: 'fa-guitar' },
                { id: 'corporate', label: 'Corporate Galas', icon: 'fa-briefcase' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeFilter === tab.id
                      ? 'bg-brand-red text-white shadow-md shadow-red-900/25'
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
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <i className="fa-solid fa-headset text-xs" />
              <span>Custom Quote</span>
            </button>
          </div>
        </section>

        {/* ── EVENT CARDS GRID — White Background ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 mb-2.5 text-[10px] sm:text-xs font-mono text-brand-red font-bold uppercase tracking-widest">
                <span>EXPLORE BY OCCASION</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-slate-900 mb-2">
                SELECT YOUR <span className="text-brand-red">CELEBRATION TYPE</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Tap on any event card below to open the complete operational blueprint, protocol deliverables, and direct squad booking.
              </p>
            </div>

            {/* Sleek Visual Cards Grid (3-column on desktop, 1-col on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredCategories.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setActiveDetailEvent(card)}
                  className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(229,9,20,0.22)] hover:border-brand-red transition-all duration-300 cursor-pointer flex flex-col justify-between p-4 sm:p-5 bg-slate-900"
                >
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 group-hover:via-black/30 transition-all duration-300" />

                  {/* Top Bar: Category Tag & Interactive Expand Badge */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-slate-200 border border-white/15 backdrop-blur-md">
                      {card.categoryLabel}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-black/60 group-hover:bg-brand-red text-white flex items-center justify-center transition-all duration-300 shadow-md">
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                    </span>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="relative z-10">
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight group-hover:text-red-400 transition-colors drop-shadow-md leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs text-brand-red font-semibold tracking-wide mt-1">
                      {card.marathiTitle}
                    </p>
                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-1.5 opacity-90">
                      {card.tagline}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-300 group-hover:text-white">
                      <span className="flex items-center gap-1.5">
                        <i className="fa-solid fa-user-shield text-brand-red text-xs" />
                        <span>{card.typicalSquad.split('+')[0]}</span>
                      </span>
                      <span className="text-brand-red font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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

        {/* ── WHITE SUB-SECTION 1: MANPOWER SIZING GUIDE ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="px-3 py-1 rounded-full bg-red-100 text-brand-red border border-red-200 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest inline-block">
                DEPLOYMENT SIZING GUIDELINE
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-slate-900 mt-3 mb-2">
                HOW MANY BOUNCERS DO YOU <span className="text-brand-red">NEED?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Recommended security force sizing based on attendance, venue type, and crowd profile across Pune and Maharashtra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Tier 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-brand-red/40 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500">INTIMATE &amp; PRIVATE</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 font-semibold">20 - 150 GUESTS</span>
                  </div>
                  <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 uppercase mb-2">Private Birthday / Villa Party</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Ideal for milestone birthday parties, private farmhouse poolside gatherings, and executive family dinners.
                  </p>
                  <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Suited Bouncers:</span>
                      <span className="font-bold text-slate-900">2 to 4 Bouncers</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Gate Screening:</span>
                      <span className="font-bold text-emerald-600">Included</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Lady Guard (optional):</span>
                      <span className="font-bold text-slate-900">1 on request</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Private Event / Birthday Squad (2-4 Bouncers)')}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Inquire For Private Party
                </button>
              </div>

              {/* Tier 2 — Highlighted */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-brand-red shadow-[0_8px_30px_rgba(229,9,20,0.15)] relative flex flex-col justify-between">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-red text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  RECOMMENDED FOR WEDDINGS
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4 mt-1">
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-brand-red">GRAND CELEBRATIONS</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-100 text-brand-red font-bold">200 - 800 GUESTS</span>
                  </div>
                  <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 uppercase mb-2">Royal Wedding &amp; Sangeet Gala</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Complete peace of mind for wedding lawns, five-star hotel ballrooms, and large family celebrations.
                  </p>
                  <div className="bg-red-50/50 p-3.5 sm:p-4 rounded-xl border border-red-200/80 space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700">Executive Bouncers:</span>
                      <span className="font-bold text-slate-900">6 to 12 Bouncers</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700">Trained Lady Guards:</span>
                      <span className="font-bold text-slate-900">2 Lady Guards</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700">Event Captain:</span>
                      <span className="font-bold text-brand-red">1 Dedicated Officer</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700">Jewelry / Gift Vigil:</span>
                      <span className="font-bold text-emerald-600">24/7 Monitored</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Royal Wedding / Sangeet Squad (6-12 Bouncers)')}
                  className="w-full py-3 rounded-xl bg-brand-red hover:bg-red-700 text-white text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md shadow-red-900/30 cursor-pointer"
                >
                  Inquire For Wedding &amp; Sangeet
                </button>
              </div>

              {/* Tier 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-brand-red/40 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500">MEGA SCALE</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 font-semibold">1,000+ ATTENDEES</span>
                  </div>
                  <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 uppercase mb-2">Concert / Dandiya / Festival</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    High-energy stadiums, open festival grounds, college youth fests, and multi-day religious gatherings.
                  </p>
                  <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 space-y-2 mb-6">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Tactical Force:</span>
                      <span className="font-bold text-slate-900">20 to 80+ Bouncers</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">DFMD &amp; HHMD Detectors:</span>
                      <span className="font-bold text-emerald-600">Full Equipment</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Police Liaison:</span>
                      <span className="font-bold text-slate-900">Included</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenBooking('Mega Festival / Concert Security (20+ Bouncers)')}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Inquire For Mega Event
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHITE SUB-SECTION 2: WHY HOSTS TRUST THE LEGEND SECURITY ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="px-3 py-1 rounded-full bg-red-100 text-brand-red border border-red-200 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest inline-block">
                UNCOMPROMISING STANDARDS
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-slate-900 mt-3 mb-2">
                WHY HOSTS TRUST <span className="text-brand-red">THE LEGEND SECURITY</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                We never compromise on character, grooming, or discipline. Here is what separates our event security from ordinary guard contractors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  className="p-5 sm:p-6 rounded-2xl bg-[#f8f9fa] border border-slate-200 hover:border-brand-red/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-red border border-red-200 flex items-center justify-center text-lg mb-4">
                      <i className={`fa-solid ${feat.icon}`} />
                    </div>
                    <h4 className="font-heading font-black text-base uppercase text-slate-900 mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHITE SUB-SECTION 3: ON-GROUND REAL SQUAD GALLERY (REQUESTED WHITE BG) ── */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
                  ON-GROUND REAL ACTION
                </span>
                <h2 className="font-heading font-black text-xl sm:text-3xl uppercase tracking-tight text-slate-900 mt-1">
                  OUR EVENT BOUNCERS &amp; SQUADS <span className="text-brand-red">IN ACTION</span>
                </h2>
              </div>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-brand-red hover:text-slate-900 transition-colors"
              >
                <span>View Full Gallery (33+ Photos)</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </div>

            {/* Mobile 3-column / Desktop 6-column Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
              {realGallery.map((item, gIdx) => (
                <div
                  key={gIdx}
                  className="relative rounded-xl overflow-hidden aspect-square group bg-slate-200 cursor-pointer border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-red transition-all"
                  onClick={() => setPreviewImage(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-2.5">
                    <p className="text-[9px] sm:text-[10px] font-heading font-bold text-white leading-tight uppercase truncate">{item.title}</p>
                    <p className="text-[8px] sm:text-[9px] font-mono text-brand-red">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════
          CALL TO ACTION / EVENT BOOKING BANNER (DARK LUXURY)
      ══════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0a0a0c] via-red-950/20 to-[#0a0a0c] border-t border-[#272930] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red mx-auto mb-4 sm:mb-6 shadow-xl shadow-red-900/20">
            <i className="fa-solid fa-champagne-glasses text-xl sm:text-2xl" />
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-3 sm:mb-4">
            PLANNING AN EVENT IN <span className="text-gradient-red">MAHARASHTRA?</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Ensure your wedding, birthday celebration, concert, or corporate meet is remembered for its elegance and seamless safety. Connect directly with Director <strong className="text-white">Mr. Mosin Azam Shaikh</strong> today.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={() => handleOpenBooking('Custom Event Security Deployment')}
              className="px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-calendar-check" />
              <span>Book Event Bouncers Online</span>
            </button>

            <a
              href="https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20want%20to%20book%20security%20and%20bouncers%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              <span>Instant WhatsApp Discussion</span>
            </a>

            <a
              href="tel:+918806078677"
              className="px-6 py-3.5 sm:py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone text-brand-red" />
              <span>+91 88060 78677</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 font-mono text-[11px] sm:text-xs">
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

      {/* ══════════════════════════════════════════
          PROFESSIONAL ANIMATED LARGE CARD DETAIL MODAL
          (Smooth spring scale & backdrop fade with enriched description)
      ══════════════════════════════════════════ */}
      {activeDetailEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-backdrop-fade"
          onClick={() => setActiveDetailEvent(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#13141a] border border-[#272930] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto animate-modal-pop flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Image Header Banner */}
            <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden shrink-0">
              <img
                src={activeDetailEvent.image}
                alt={activeDetailEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13141a] via-[#13141a]/40 to-black/40" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveDetailEvent(null)}
                className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-black/70 hover:bg-brand-red text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>

              {/* Category Pill */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 text-slate-200 border border-white/20 backdrop-blur-md">
                  {activeDetailEvent.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available Across Maharashtra</span>
                </span>
              </div>

              {/* Header Titles */}
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 z-10">
                <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight drop-shadow-md">
                  {activeDetailEvent.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-red font-semibold tracking-wide mt-0.5">
                  {activeDetailEvent.marathiTitle}
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body — Enriched Details */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              
              {/* Tagline Banner */}
              <div className="p-3.5 rounded-xl bg-brand-red/10 border-l-4 border-brand-red text-slate-200 text-xs sm:text-sm italic">
                "{activeDetailEvent.tagline}"
              </div>

              {/* Comprehensive In-Depth Description */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-brand-red" />
                  <span>Complete Operational Overview:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeDetailEvent.detailedStory || activeDetailEvent.desc}
                </p>
              </div>

              {/* 3-Phase Operational Timeline */}
              {activeDetailEvent.timeline && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-timeline text-brand-red" />
                    <span>Standard Tactical Protocol Execution:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeDetailEvent.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="bg-white/[0.03] border border-white/5 rounded-xl p-3.5 flex flex-col justify-between">
                        <span className="font-heading font-bold text-xs uppercase text-brand-red mb-1">
                          {step.phase}
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables Checklist */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-clipboard-check text-brand-red" />
                  <span>Key Protocol Deliverables Checklist:</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeDetailEvent.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                      <i className="fa-solid fa-circle-check text-brand-red text-xs mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment & Tactical Specs */}
              <div className="bg-[#181a22] p-4 sm:p-5 rounded-xl border border-white/10 space-y-3 text-xs font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-vest text-brand-red" />
                    <span>Dress Code / Turnout:</span>
                  </span>
                  <span className="text-slate-200 font-semibold sm:text-right">{activeDetailEvent.turnout}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400 border-t border-white/5 pt-2.5">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-users text-brand-red" />
                    <span>Typical Force Sizing:</span>
                  </span>
                  <span className="text-slate-200 font-semibold sm:text-right">{activeDetailEvent.typicalSquad}</span>
                </div>
                {activeDetailEvent.equipment && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400 border-t border-white/5 pt-2.5">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-toolbox text-brand-red" />
                      <span>Security Equipment:</span>
                    </span>
                    <span className="text-slate-200 font-semibold sm:text-right">{activeDetailEvent.equipment}</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400 border-t border-white/5 pt-2.5">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-brand-red" />
                    <span>Coverage Region:</span>
                  </span>
                  <span className="text-slate-200 font-semibold sm:text-right">{activeDetailEvent.locations}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Fixed CTA Buttons */}
            <div className="p-4 sm:p-5 bg-[#0f1015] border-t border-[#272930] flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const evTitle = activeDetailEvent.title;
                  setActiveDetailEvent(null);
                  handleOpenBooking(`Booking: ${evTitle}`);
                }}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-calendar-check text-xs" />
                <span>Book This Squad Online</span>
              </button>

              <a
                href={`https://wa.me/918806078677?text=Hello%20Legend%20Security,%20I%20want%20to%20book%20bouncers%20for%20${encodeURIComponent(activeDetailEvent.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>WhatsApp Quote</span>
              </a>

              <a
                href="tel:+918806078677"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-mono text-xs uppercase transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-phone text-brand-red" />
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
