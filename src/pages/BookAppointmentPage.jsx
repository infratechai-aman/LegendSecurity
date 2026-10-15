import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

// =====================================================================
// PREMIUM iOS / SF SYMBOLS-STYLE SVG ICONS (Fine 1.5px Stroke, Hardcoded Sizing)
// =====================================================================

function IconShield({ className = '' }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconUserShield({ className = '' }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 11l-3-3-3 3" />
    </svg>
  );
}

function IconUsers({ className = '' }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBriefcase({ className = '' }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconPhone({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconBadgeCheck({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconBolt({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconFileText({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconScale({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function IconArrowRight({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const [formData, setFormData] = useState({
    auditType: 'On-Site Vulnerability & Security Audit',
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    timeSlot: '11:00 AM - 12:30 PM',
    fullName: '',
    orgName: '',
    phoneNum: '',
    emailAddr: '',
    location: 'Pune — Katraj & Pune South',
    riskLevel: 'Standard Facility Audit',
    notes: '',
  });

  const AUDIT_TYPES = [
    {
      id: 'On-Site Vulnerability & Security Audit',
      title: 'Facility Vulnerability & Survey',
      shortDesc: 'Threat mapping for plants, factories & IT parks',
      desc: 'Comprehensive threat mapping for manufacturing units, MIDC plants, IT parks & commercial towers.',
      badge: 'Factories, MIDC Units, Gated Townships',
      icon: <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'VIP & Executive Protection Briefing',
      title: 'Executive Protection & VIP Bouncers',
      shortDesc: 'Close protection bodyguards & escort convoys',
      desc: 'Armed transit protocols, close protection bodyguards, escort convoys, and private security.',
      badge: 'Celebrities, Executives, High-Net-Worth',
      icon: <IconUserShield className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'Event Security Command & Crowd Control',
      title: 'Event Security & Crowd Control',
      shortDesc: 'Screening, barricades & VIP lounge security',
      desc: 'Barricade management, metal detector entry screening, VIP lounge protection & emergency exits.',
      badge: 'Weddings, Concerts, Corporate Summits',
      icon: <IconUsers className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'Direct Strategy Consultation (Phone/Video)',
      title: 'Strategic Consultation with Director',
      shortDesc: 'Direct advisory on tariffs & PSARA compliance',
      desc: 'Direct advisory brief on security manpower design, regulatory PSARA compliance & official tariffs.',
      badge: 'Corporate HR, Facility Directors, Society Chairmen',
      icon: <IconBriefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  const TIME_SLOTS = [
    { slot: '09:30 AM - 11:00 AM', label: 'Morning Slot', tag: 'Available' },
    { slot: '11:00 AM - 12:30 PM', label: 'Prime Inspection', tag: 'Recommended' },
    { slot: '02:30 PM - 04:00 PM', label: 'Afternoon Survey', tag: 'Available' },
    { slot: '04:00 PM - 05:30 PM', label: 'Evening Operations', tag: 'Available' },
    { slot: '07:00 PM - 08:30 PM', label: 'Night Threat Audit', tag: 'Night Post' },
  ];

  const LOCATIONS = [
    'Pune — Katraj & Pune South',
    'Pune — Bhawani Peth & Central Pune',
    'Pune — Chakan & Bhosari MIDC',
    'Pune — Hinjawadi IT Park & PCMC',
    'Pune — Hadapsar, Kharadi & Magarpatta',
    'Mumbai — Bandra-Kurla Complex (BKC) & South Mumbai',
    'Mumbai — Malad, Andheri, Goregaon & Western Belt',
    'Thane & Navi Mumbai Industrial Corridor',
    'Palghar — Nalasopara, Vasai & Boisar MIDC',
    'Other Region in Maharashtra',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = storageService.addAppointment(formData);
      setConfirmedBooking(created);
      setIsSubmitting(false);
      setStep(4);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#e50914', '#1e293b', '#10b981'],
        });
      } catch {
        // ignore
      }
    }, 450);
  };

  const generateGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Security Consultation: ${confirmedBooking.auditType} - The Legend Security`);
    const details = encodeURIComponent(
      `Appointment Ref: ${confirmedBooking.id}\nClient: ${confirmedBooking.fullName} (${confirmedBooking.orgName})\nPhone: ${confirmedBooking.phoneNum}\nDirector Mosin Shaikh: +91 88060 78677\nThe Legend Security and Bouncer`
    );
    const loc = encodeURIComponent(confirmedBooking.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}`;
  };

  const handleWhatsAppNotify = () => {
    if (!confirmedBooking) return;
    const msg = encodeURIComponent(
      `*OFFICIAL SECURITY AUDIT BOOKING*\n\n` +
      `*Ref Code:* ${confirmedBooking.id}\n` +
      `*Client:* ${confirmedBooking.fullName}\n` +
      `*Organization:* ${confirmedBooking.orgName || 'N/A'}\n` +
      `*Phone:* ${confirmedBooking.phoneNum}\n` +
      `*Audit Type:* ${confirmedBooking.auditType}\n` +
      `*Date:* ${confirmedBooking.date}\n` +
      `*Time Slot:* ${confirmedBooking.timeSlot}\n` +
      `*Location:* ${confirmedBooking.location}\n` +
      `*Risk Tier:* ${confirmedBooking.riskLevel}\n\n` +
      `*Direct Dispatch Request to Mr. Mosin Azam Shaikh (The Legend Security)*`
    );
    window.open(`https://wa.me/918806078677?text=${msg}`, '_blank');
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setStep(1);
    setFormData({
      auditType: 'On-Site Vulnerability & Security Audit',
      date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      timeSlot: '11:00 AM - 12:30 PM',
      fullName: '',
      orgName: '',
      phoneNum: '',
      emailAddr: '',
      location: 'Pune — Katraj & Pune South',
      riskLevel: 'Standard Facility Audit',
      notes: '',
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* ══════════════════════════════════════════
          HERO SECTION (COMPACT ON MOBILE, RICH ON DESKTOP)
      ══════════════════════════════════════════ */}
      <section className="w-full bg-[#0a0a0c] text-white pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#1d1e24] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-slate-400 text-xs mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 font-medium">Book Consultation</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-brand-red/15 border border-brand-red/30 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand-red uppercase tracking-wider">
                  Free On-Site Survey Across Maharashtra
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                Schedule a Security Consultation
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Facility threat inspections and VIP briefings across Pune, Mumbai, Thane &amp; Palghar. Coordinated directly by Director <strong>Mr. Mosin Azam Shaikh</strong>.
              </p>
            </div>

            <div className="hidden sm:block shrink-0">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Director Coordinated • Free Survey
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN CONTENT (MOBILE APP-STYLE + DESKTOP 2-COLUMN)
      ══════════════════════════════════════════ */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-6 sm:py-12 px-3.5 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* INTERACTIVE BOOKING ENGINE (MOBILE-FIRST) */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200/90 shadow-sm">
            
            {/* Step Progress Indicator (Clean Mobile + Desktop) */}
            {step < 4 && (
              <div className="flex items-center justify-between pb-3 sm:pb-5 mb-4 sm:mb-6 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-red block">
                    Step {step} of 3
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {step === 1 ? 'Select Security Scope' : step === 2 ? 'Date & Time Window' : 'Facility & Contact Details'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className={`h-1.5 rounded-full transition-all ${
                        step === num
                          ? 'w-6 bg-brand-red'
                          : step > num
                          ? 'w-3 bg-emerald-500'
                          : 'w-3 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: AUDIT SCOPE (COMPACT TAP CARDS FOR MOBILE) */}
            {step === 1 && (
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs text-slate-500 hidden sm:block">
                  Choose the primary requirement for your facility or event:
                </p>

                <div className="space-y-2 sm:space-y-2.5">
                  {AUDIT_TYPES.map((type) => {
                    const isSelected = formData.auditType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setFormData((p) => ({ ...p, auditType: type.id }))}
                        className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-red-50/40 border-2 border-brand-red shadow-sm ring-1 ring-brand-red/10'
                            : 'bg-slate-50/70 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-brand-red text-white' : 'bg-slate-200/80 text-slate-700'
                          }`}
                        >
                          {type.icon}
                        </div>

                        {/* Title & Short text */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">
                            {type.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 truncate sm:whitespace-normal mt-0.5">
                            {type.shortDesc}
                          </p>
                        </div>

                        {/* Radio Selection Dot */}
                        <div className="shrink-0">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-brand-red bg-brand-red' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 sm:pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto sm:ml-auto py-3 px-6 rounded-xl bg-brand-red hover:bg-red-600 text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-700/20 cursor-pointer"
                  >
                    <span>Continue to Schedule</span>
                    <IconArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME WINDOW */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Inspection Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {TIME_SLOTS.map((t) => {
                      const isSelected = formData.timeSlot === t.slot;
                      return (
                        <div
                          key={t.slot}
                          onClick={() => setFormData((p) => ({ ...p, timeSlot: t.slot }))}
                          className={`p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-red-50/50 border-2 border-brand-red text-slate-900 shadow-sm'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-xs text-slate-900">
                              {t.label}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                              {t.tag}
                            </span>
                          </div>
                          <div className="text-xs text-brand-red font-semibold">{t.slot}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-3 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 sm:flex-initial py-3 px-6 rounded-xl bg-brand-red hover:bg-red-600 text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-700/20 cursor-pointer"
                  >
                    <span>Continue to Details</span>
                    <IconArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CLIENT & FACILITY DETAILS */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Rajesh Singhania"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Property Title
                    </label>
                    <input
                      type="text"
                      name="orgName"
                      placeholder="e.g. Apex Industrial Hub"
                      value={formData.orgName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Phone Number (+91) *
                    </label>
                    <input
                      type="tel"
                      name="phoneNum"
                      required
                      placeholder="+91 98220 12345"
                      value={formData.phoneNum}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddr"
                      placeholder="name@company.com"
                      value={formData.emailAddr}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Facility Region in Maharashtra *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Priority Level
                    </label>
                    <select
                      name="riskLevel"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Standard Facility Audit">Standard Facility Survey</option>
                      <option value="Urgent Dispatch (<24 Hours)">Urgent Dispatch (&lt;24 Hours)</option>
                      <option value="High Threat Assessment">High Threat Assessment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Facility Scope Notes
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. 3 Entry Gates, Night Patrol"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Summary Strip */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Slot:</span>
                    <span className="text-slate-900 font-semibold">{formData.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-brand-red font-semibold">{formData.timeSlot}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                    100% Free Survey
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2.5 px-3 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial py-3 px-6 rounded-xl bg-brand-red hover:bg-red-600 text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-700/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Audit Booking'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION RECEIPT */}
            {step === 4 && confirmedBooking && (
              <div className="py-3 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                  <IconShield className="w-6 h-6 text-emerald-600" />
                </div>

                <div>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-1">
                    Appointment Confirmed
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                    Security Survey Scheduled
                  </h3>
                  <p className="text-slate-600 text-xs max-w-md mx-auto mt-0.5 leading-relaxed">
                    Your appointment has been registered in the operations queue. Director <strong>Mr. Mosin Shaikh</strong> and field supervisors have received your booking.
                  </p>
                </div>

                {/* Reference Receipt */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left max-w-md mx-auto space-y-1.5 text-xs">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-200/80">
                    <span className="text-slate-500">Reference:</span>
                    <span className="text-slate-900 font-semibold">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Client:</span>
                    <span className="text-slate-900 font-medium">{confirmedBooking.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Date &amp; Slot:</span>
                    <span className="text-slate-800 font-medium">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Location:</span>
                    <span className="text-slate-800">{confirmedBooking.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppNotify}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Send Ticket to WhatsApp</span>
                  </button>

                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <span>Add to Google Calendar</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 max-w-md mx-auto">
                  <Link to="/admin" className="text-brand-red hover:underline font-semibold">
                    → Admin Command
                  </Link>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-slate-600 hover:text-slate-900 underline cursor-pointer"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE DIRECT CALL PILL (VISIBLE ONLY ON MOBILE) */}
          <div className="block lg:hidden w-full space-y-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-700">
                <IconPhone className="text-brand-red w-3.5 h-3.5" />
                <span>Prefer to book over call?</span>
                <a href="tel:+918806078677" className="text-brand-red font-semibold hover:underline">
                  +91 88060 78677
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1.5 mt-1.5 border-t border-slate-100">
                <span>PSARA Licensed</span>
                <span>•</span>
                <span>24/7 Dispatch</span>
                <span>•</span>
                <span>100% Free Survey</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: EXECUTIVE CREDENTIALS & TRUST (DESKTOP ONLY) */}
          <div className="hidden lg:block lg:col-span-5 space-y-5">
            
            {/* Director's Personal Signature Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red font-bold text-sm tracking-wider shrink-0">
                  MS
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold">
                    Director's Direct Desk
                  </span>
                  <h3 className="font-semibold text-base text-slate-900">
                    Mr. Mosin Azam Shaikh
                  </h3>
                  <p className="text-xs text-slate-500">
                    Managing Director • Founded 2018
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-brand-red pl-3.5 my-3.5">
                "Every facility survey is handled with strict confidentiality and tactical precision. Whether a 50-acre MIDC manufacturing hub or executive VIP escort, our certified supervisors ensure zero vulnerability."
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href="tel:+918806078677"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-red-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-brand-red flex items-center justify-center shrink-0">
                      <IconPhone className="text-brand-red" />
                    </div>
                    <span className="text-xs text-slate-600 group-hover:text-slate-900">Director Direct Line:</span>
                  </div>
                  <span className="text-xs font-semibold text-brand-red">
                    +91 88060 78677
                  </span>
                </a>

                <a
                  href="tel:+917860313601"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <IconPhone className="text-slate-700" />
                    </div>
                    <span className="text-xs text-slate-600 group-hover:text-slate-900">24/7 Operations Desk:</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-900 group-hover:text-brand-red">
                    +91 78603 13601
                  </span>
                </a>
              </div>
            </div>

            {/* 4 Pillars of the Legend Audit Guarantee */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                The Legend Security Standards
              </h4>

              {[
                {
                  title: 'Govt. PSARA Licensed & Verified',
                  desc: 'Every guard and bouncer is 100% background checked with local Maharashtra police verification.',
                  icon: <IconBadgeCheck className="text-brand-red" />,
                },
                {
                  title: 'Turnkey 24-Hour Dispatch',
                  desc: 'Emergency standby units stationed across Katraj, Chakan MIDC, Malad & BKC for rapid deployment.',
                  icon: <IconBolt className="text-brand-red" />,
                },
                {
                  title: 'Comprehensive Threat Report',
                  desc: 'Following our site audit, receive a detailed entry/exit vulnerability assessment free of charge.',
                  icon: <IconFileText className="text-brand-red" />,
                },
                {
                  title: 'Strict Regulatory Compliance',
                  desc: 'Full ESIC, PF, minimum wage compliance, and certified fire & safety evacuation trained staff.',
                  icon: <IconScale className="text-brand-red" />,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pt-1">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-brand-red border border-red-100 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-slate-900 mb-0.5">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Branch Access Strip */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs text-slate-600 space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-900 tracking-wide">
                Regional Command Hubs
              </div>
              <p className="text-slate-600">📍 <strong className="text-slate-900">Pune HQ:</strong> Katraj, Gujarwadi Road, Pune 411046</p>
              <p className="text-slate-600">📍 <strong className="text-slate-900">Bhawani Peth:</strong> 857, Bhawani Peth, Near Bharat Talkies, Pune</p>
              <p className="text-slate-600">📍 <strong className="text-slate-900">Palghar:</strong> Commercial Zone, Nalasopara East, Palghar</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
