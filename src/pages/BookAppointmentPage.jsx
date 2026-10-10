import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

// =====================================================================
// PREMIUM iOS / SF SYMBOLS-STYLE SVG ICONS (Fine 1.5px Stroke)
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
      title: 'Facility Vulnerability & Security Survey',
      desc: 'Comprehensive threat mapping for manufacturing units, MIDC plants, IT parks & commercial towers.',
      badge: 'Factories, MIDC Units, Gated Townships',
      icon: <IconShield className="w-5 h-5" />,
    },
    {
      id: 'VIP & Executive Protection Briefing',
      title: 'Executive Protection & VIP Bouncer Squad',
      desc: 'Armed transit protocols, close protection bodyguards, escort convoys, and private security.',
      badge: 'Celebrities, Executives, High-Net-Worth',
      icon: <IconUserShield className="w-5 h-5" />,
    },
    {
      id: 'Event Security Command & Crowd Control',
      title: 'Event Security Command & Crowd Control',
      desc: 'Barricade management, metal detector entry screening, VIP lounge protection & emergency exits.',
      badge: 'Weddings, Concerts, Corporate Summits',
      icon: <IconUsers className="w-5 h-5" />,
    },
    {
      id: 'Direct Strategy Consultation (Phone/Video)',
      title: 'Strategic Consultation with Director Mosin Shaikh',
      desc: 'Direct advisory brief on security manpower design, regulatory PSARA compliance & official tariffs.',
      badge: 'Corporate HR, Facility Directors, Society Chairmen',
      icon: <IconBriefcase className="w-5 h-5" />,
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
          colors: ['#e50914', '#ffffff', '#ffd700'],
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
      `Appointment Ref: ${confirmedBooking.id}\nClient: ${confirmedBooking.fullName} (${confirmedBooking.orgName})\nPhone: ${confirmedBooking.phoneNum}\nDirector Mosin Shaikh: +91 88060 78777\nThe Legend Security and Bouncer`
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
    window.open(`https://wa.me/918806078777?text=${msg}`, '_blank');
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
    <div className="flex flex-col w-full bg-[#08090d] min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-slate-400 text-xs mb-5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-medium">Book Consultation</span>
        </nav>

        {/* Page Headline */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">
              Free On-Site Surveys Across Maharashtra
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-2.5">
            Schedule a Security Consultation
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Certified vulnerability inspections and private security briefings across{' '}
            <strong className="text-white">Pune, Mumbai, Thane, and Palghar</strong>. Coordinated directly by Director{' '}
            <strong>Mr. Mosin Azam Shaikh</strong> and operations field supervisors.
          </p>
        </div>

        {/* Main 2-Column Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE BOOKING ENGINE (7 cols) */}
          <div className="lg:col-span-7 bg-[#0f1016] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* Step Progress Indicator (Apple/Linear Style) */}
            {step < 4 && (
              <div className="flex items-center gap-2 pb-6 mb-6 border-b border-white/[0.06]">
                {[
                  { num: 1, label: 'Scope' },
                  { num: 2, label: 'Schedule' },
                  { num: 3, label: 'Details' },
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center gap-2 flex-1">
                    <button
                      type="button"
                      onClick={() => (step > s.num ? setStep(s.num) : null)}
                      className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                        step === s.num
                          ? 'text-white'
                          : step > s.num
                          ? 'text-slate-300 cursor-pointer hover:text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                          step === s.num
                            ? 'bg-brand-red text-white'
                            : step > s.num
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/[0.04] text-slate-500 border border-white/[0.06]'
                        }`}
                      >
                        {step > s.num ? '✓' : s.num}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                    {idx < 2 && (
                      <div className={`flex-1 h-[1px] transition-colors ${step > idx + 1 ? 'bg-emerald-500/40' : 'bg-white/[0.06]'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* STEP 1: AUDIT SCOPE */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight">Select Security Scope</h2>
                  <p className="text-xs text-slate-400 mt-1">Choose the primary requirement for your facility or event:</p>
                </div>

                <div className="space-y-2.5">
                  {AUDIT_TYPES.map((type) => {
                    const isSelected = formData.auditType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setFormData((p) => ({ ...p, auditType: type.id }))}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-brand-red/[0.05] border-brand-red/60 shadow-md ring-1 ring-brand-red/30'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected ? 'bg-brand-red text-white' : 'bg-white/[0.04] text-slate-400'
                          }`}
                        >
                          {type.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-white mb-0.5">
                            {type.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-2">
                            {type.desc}
                          </p>
                          <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.03] text-slate-300 border border-white/[0.06]">
                            Best for: {type.badge}
                          </span>
                        </div>

                        <div className="shrink-0 mt-1">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-brand-red bg-brand-red' : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Continue to Schedule</span>
                    <IconArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME WINDOW */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight">Select Date &amp; Time Window</h2>
                  <p className="text-xs text-slate-400 mt-1">Our certified supervisor team arrives with full facility inspection checklists.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Inspection Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TIME_SLOTS.map((t) => {
                      const isSelected = formData.timeSlot === t.slot;
                      return (
                        <div
                          key={t.slot}
                          onClick={() => setFormData((p) => ({ ...p, timeSlot: t.slot }))}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-red/[0.06] border-brand-red/60 text-white shadow-sm ring-1 ring-brand-red/30'
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs text-white">
                              {t.label}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                              {t.tag}
                            </span>
                          </div>
                          <div className="text-xs text-brand-red font-medium">{t.slot}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
                  >
                    ← Back to Scope
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Continue to Contact</span>
                    <IconArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CLIENT & FACILITY DETAILS */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight">Facility Details &amp; Contact</h2>
                  <p className="text-xs text-slate-400 mt-1">Authorized contact details for supervisor entry clearance:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Rajesh Singhania"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company / Property Title
                    </label>
                    <input
                      type="text"
                      name="orgName"
                      placeholder="e.g. Apex Industrial Hub / Oberoi Splendor"
                      value={formData.orgName}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Mobile Phone Number (+91) *
                    </label>
                    <input
                      type="tel"
                      name="phoneNum"
                      required
                      placeholder="+91 98220 XXXXX"
                      value={formData.phoneNum}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddr"
                      placeholder="name@company.com"
                      value={formData.emailAddr}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Facility Region in Maharashtra *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-[#121318] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#121318] text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Priority Level
                    </label>
                    <select
                      name="riskLevel"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                      className="w-full bg-[#121318] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="Standard Facility Audit">Standard Facility Survey</option>
                      <option value="Urgent Dispatch (<24 Hours)">Urgent Dispatch (&lt;24 Hours)</option>
                      <option value="High Threat Assessment">High Threat / Armed Escort</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Facility Scope Notes
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. 3 Entry Gates, Night Patrol"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Summary Strip */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Scheduled:</span>
                    <span className="text-white font-medium">{formData.date}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-brand-red font-medium">{formData.timeSlot}</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">100% Free On-Site Survey</span>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
                  >
                    ← Back to Schedule
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm & Book Consultation'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION RECEIPT */}
            {step === 4 && confirmedBooking && (
              <div className="py-4 text-center space-y-5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <IconShield className="w-6 h-6" />
                </div>

                <div>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-1.5">
                    Appointment Confirmed
                  </span>
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    Security Survey Scheduled
                  </h3>
                  <p className="text-slate-400 text-xs max-w-md mx-auto mt-1 leading-relaxed">
                    Your appointment has been registered in the operations queue. Director <strong>Mr. Mosin Shaikh</strong> and field supervisors have received your booking.
                  </p>
                </div>

                {/* Reference Receipt */}
                <div className="bg-[#121318] border border-white/[0.08] rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                    <span className="text-slate-400">Reference:</span>
                    <span className="text-white font-medium">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Client:</span>
                    <span className="text-white font-medium">{confirmedBooking.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Date &amp; Slot:</span>
                    <span className="text-slate-300">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300">{confirmedBooking.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppNotify}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <span>Send Ticket to WhatsApp</span>
                  </button>

                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <span>Add to Google Calendar</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 max-w-md mx-auto">
                  <Link to="/admin" className="text-brand-red hover:underline font-medium">
                    → Admin Command Center
                  </Link>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-slate-400 hover:text-white underline"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: EXECUTIVE CREDENTIALS & TRUST (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Director's Personal Signature Card */}
            <div className="bg-[#0f1016] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-red/20 to-red-950/40 border border-brand-red/30 flex items-center justify-center text-white font-bold text-sm tracking-wider shrink-0">
                  MS
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold">
                    Director's Direct Desk
                  </span>
                  <h3 className="font-semibold text-base text-white">
                    Mr. Mosin Azam Shaikh
                  </h3>
                  <p className="text-xs text-slate-400">
                    Managing Director • Founded 2018
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-brand-red/60 pl-3.5 my-3.5">
                "Every facility survey is handled with strict confidentiality and tactical precision. Whether a 50-acre MIDC manufacturing hub or executive VIP escort, our certified supervisors ensure zero vulnerability."
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href="tel:+918806078777"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                      <IconPhone className="w-3.5 h-3.5 text-brand-red" />
                    </div>
                    <span className="text-xs text-slate-300 group-hover:text-white">Director Direct Line:</span>
                  </div>
                  <span className="text-xs font-medium text-white group-hover:text-brand-red">
                    +91 88060 78777
                  </span>
                </a>

                <a
                  href="tel:+917860313601"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center shrink-0">
                      <IconPhone className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                    <span className="text-xs text-slate-300 group-hover:text-white">24/7 Operations Desk:</span>
                  </div>
                  <span className="text-xs font-medium text-white group-hover:text-brand-red">
                    +91 78603 13601
                  </span>
                </a>
              </div>
            </div>

            {/* 4 Pillars of the Legend Audit Guarantee */}
            <div className="bg-[#0f1016] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                The Legend Security Standards
              </h4>

              {[
                {
                  title: 'Govt. PSARA Licensed & Verified',
                  desc: 'Every guard and bouncer is 100% background checked with local Maharashtra police verification.',
                  icon: <IconBadgeCheck className="w-4 h-4 text-brand-red" />,
                },
                {
                  title: 'Turnkey 24-Hour Dispatch',
                  desc: 'Emergency standby units stationed across Katraj, Chakan MIDC, Malad & BKC for rapid deployment.',
                  icon: <IconBolt className="w-4 h-4 text-brand-red" />,
                },
                {
                  title: 'Comprehensive Threat Report',
                  desc: 'Following our site audit, receive a detailed entry/exit vulnerability assessment free of charge.',
                  icon: <IconFileText className="w-4 h-4 text-brand-red" />,
                },
                {
                  title: 'Strict Regulatory Compliance',
                  desc: 'Full ESIC, PF, minimum wage compliance, and certified fire & safety evacuation trained staff.',
                  icon: <IconScale className="w-4 h-4 text-brand-red" />,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pt-1">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-white mb-0.5">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Branch Access Strip */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-1.5">
              <div className="text-[11px] font-semibold text-white tracking-wide">
                Regional Command Hubs
              </div>
              <p className="text-slate-300">📍 <strong>Pune HQ:</strong> Katraj, Gujarwadi Road, Pune 411046</p>
              <p className="text-slate-300">📍 <strong>Mumbai:</strong> Rani Sati Marg, Malad East, Mumbai 400097</p>
              <p className="text-slate-300">📍 <strong>Palghar:</strong> Commercial Zone, Nalasopara East, Palghar</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
