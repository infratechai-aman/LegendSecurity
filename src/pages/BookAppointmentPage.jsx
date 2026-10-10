import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

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
      title: 'On-Site Vulnerability & Security Survey',
      desc: 'Comprehensive threat mapping for manufacturing plants, MIDCs, IT parks & commercial towers.',
      icon: 'fa-shield-halved',
      recommendedFor: 'Factories, MIDC Units, Gated Townships',
    },
    {
      id: 'VIP & Executive Protection Briefing',
      title: 'Executive Protection & VIP Bouncer Squad',
      desc: 'Physical escort, covert surveillance, armored transit protocol & personal bodyguards.',
      icon: 'fa-user-ninja',
      recommendedFor: 'Celebrities, High-Net-Worth Individuals, Executives',
    },
    {
      id: 'Event Security Command & Crowd Control',
      title: 'Event Security Command & Crowd Control',
      desc: 'Perimeter barricading, metal detector screening, VIP green room safety & emergency exits.',
      icon: 'fa-users-viewfinder',
      recommendedFor: 'Weddings, Concerts, Corporate Summits',
    },
    {
      id: 'Direct Strategy Consultation (Phone/Video)',
      title: 'Strategic Consultation with Director Mosin Shaikh',
      desc: 'Direct strategy brief with founder on manpower requirements, regulatory PSARA compliance & rates.',
      icon: 'fa-phone-volume',
      recommendedFor: 'Corporate HR, Facility Directors, Society Chairmen',
    },
  ];

  const TIME_SLOTS = [
    { slot: '09:30 AM - 11:00 AM', label: 'Morning Slot', tag: 'High Availability' },
    { slot: '11:00 AM - 12:30 PM', label: 'Prime Inspection', tag: 'Recommended' },
    { slot: '02:30 PM - 04:00 PM', label: 'Afternoon Survey', tag: 'Open' },
    { slot: '04:00 PM - 05:30 PM', label: 'Evening Operations', tag: 'Open' },
    { slot: '07:00 PM - 08:30 PM', label: 'Night Threat Audit', tag: 'Tactical' },
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
    <div className="flex flex-col w-full bg-[#0a0a0c] min-h-screen pt-24 sm:pt-28 pb-20">
      {/* Background Ambience */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-red/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-slate-400 text-xs mb-6">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red font-medium">Book Consultation</span>
          </nav>

          {/* Page Headline */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-200 font-semibold tracking-wide">
                7 Days a Week • On-Site Surveys Across Maharashtra
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-4 leading-[1.05]">
              SCHEDULE AN OFFICIAL <br />
              <span className="text-gradient-red">SECURITY CONSULTATION.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book a certified threat assessment survey or private security briefing directly with Director{' '}
              <strong className="text-white">Mr. Mosin Azam Shaikh</strong> and operations field supervisors across{' '}
              <strong>Pune, Mumbai, Thane, and Palghar</strong>.
            </p>
          </div>

          {/* Main 2-Column Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: INTERACTIVE BOOKING ENGINE (7 cols) */}
            <div className="lg:col-span-7 bg-[#101117] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-red-500 to-amber-500 absolute top-0 left-0 right-0" />

              {/* Step Navigation Bar */}
              {step < 4 && (
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  {[
                    { num: 1, label: 'Audit Scope' },
                    { num: 2, label: 'Date & Time' },
                    { num: 3, label: 'Facility Profile' },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className={`flex items-center gap-2 cursor-pointer transition-colors ${
                        step === s.num ? 'text-brand-red font-bold' : step > s.num ? 'text-slate-200' : 'text-slate-500'
                      }`}
                      onClick={() => (step > s.num ? setStep(s.num) : null)}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                          step === s.num
                            ? 'bg-brand-red text-white shadow-md'
                            : step > s.num
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-slate-500 border border-white/10'
                        }`}
                      >
                        {step > s.num ? <i className="fa-solid fa-check text-[10px]" /> : s.num}
                      </div>
                      <span className="font-heading text-xs uppercase tracking-wider hidden sm:inline">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 1: AUDIT SCOPE */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                      Step 1: Choose Security &amp; Audit Scope
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Select the primary requirement for your industrial, commercial, or residential asset:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {AUDIT_TYPES.map((type) => {
                      const isSelected = formData.auditType === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setFormData((p) => ({ ...p, auditType: type.id }))}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                            isSelected
                              ? 'bg-brand-red/10 border-brand-red shadow-md ring-1 ring-brand-red'
                              : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? 'bg-brand-red text-white' : 'bg-white/5 text-slate-400'
                            }`}
                          >
                            <i className={`fa-solid ${type.icon} text-base`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-sm text-white tracking-wide mb-1">
                              {type.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed mb-2">
                              {type.desc}
                            </p>
                            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                              Best For: {type.recommendedFor}
                            </span>
                          </div>

                          <div className="shrink-0 mt-1">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-brand-red bg-brand-red' : 'border-slate-600'
                              }`}
                            >
                              {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/40 hover:brightness-110 transition-all flex items-center gap-2"
                    >
                      <span>Proceed to Date &amp; Tactical Slot</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TACTICAL SLOT */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-1">
                      Step 2: Select Date &amp; Tactical Time Slot
                    </h3>
                    <p className="text-xs text-slate-400">
                      Our senior inspection officers arrive equipped with full facility audit checklists.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Inspection Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Preferred Time Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TIME_SLOTS.map((t) => {
                        const isSelected = formData.timeSlot === t.slot;
                        return (
                          <div
                            key={t.slot}
                            onClick={() => setFormData((p) => ({ ...p, timeSlot: t.slot }))}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-red/15 border-brand-red text-white shadow-sm ring-1 ring-brand-red/60'
                                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/[0.05]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-heading font-bold text-xs uppercase text-white">
                                {t.label}
                              </span>
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/10 text-slate-300">
                                {t.tag}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-brand-red">{t.slot}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
                    >
                      ← Back to Scope
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/40 hover:brightness-110 transition-all flex items-center gap-2"
                    >
                      <span>Proceed to Client Details</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CLIENT & FACILITY DOSSIER */}
              {step === 3 && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-1">
                      Step 3: Facility Specifications &amp; Contact
                    </h3>
                    <p className="text-xs text-slate-400">
                      Provide authorized facility details for dispatching supervisor security clearance:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Client Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Rajesh Singhania"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Company / Society / Event Title
                      </label>
                      <input
                        type="text"
                        name="orgName"
                        placeholder="e.g. Apex Industrial Hub / Oberoi Splendor"
                        value={formData.orgName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Mobile Phone Number (+91) *
                      </label>
                      <input
                        type="tel"
                        name="phoneNum"
                        required
                        placeholder="+91 98220 XXXXX"
                        value={formData.phoneNum}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        name="emailAddr"
                        placeholder="name@company.com"
                        value={formData.emailAddr}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Facility / Deployment Zone in Maharashtra *
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-[#181920] border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#181920] text-white">
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Risk Priority Level
                      </label>
                      <select
                        name="riskLevel"
                        value={formData.riskLevel}
                        onChange={handleInputChange}
                        className="w-full bg-[#181920] border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                      >
                        <option value="Standard Facility Audit">Standard Facility Survey</option>
                        <option value="Urgent Dispatch (<24 Hours)">Urgent Dispatch (&lt;24 Hours)</option>
                        <option value="High Threat Assessment">High Threat / Armed Escort</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Facility Notes / Gate Count
                      </label>
                      <input
                        type="text"
                        name="notes"
                        placeholder="e.g. 3 Entry Gates, 24/7 CCTV desk"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  {/* Summary Strip */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar-check text-brand-red" />
                      <span className="text-slate-300">Locked Slot:</span>
                      <span className="text-white font-medium">{formData.date}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-brand-red font-medium">{formData.timeSlot}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">100% Free Survey</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                    >
                      ← Back to Slot
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/40 hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin text-xs" />
                          <span>Dispatching Booking...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-shield-check text-xs" />
                          <span>Confirm &amp; Book Consultation</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: SUCCESS CONFIRMATION */}
              {step === 4 && confirmedBooking && (
                <div className="py-6 text-center space-y-6 animate-scale-up">
                  <div className="w-20 h-20 rounded-2xl bg-brand-red/15 border border-brand-red/40 mx-auto flex items-center justify-center text-brand-red text-3xl shadow-lg shadow-black/40">
                    <i className="fa-solid fa-shield-check" />
                  </div>

                  <div>
                    <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider mb-2">
                      ✓ Consultation Confirmed in System
                    </span>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                      Security Survey Scheduled
                    </h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                      Your request has been routed to <strong>Director Mr. Mosin Azam Shaikh</strong> and operations control. A field supervisor will contact you prior to arrival.
                    </p>
                  </div>

                  {/* Reference Dossier Box */}
                  <div className="bg-[#14151e] border border-white/10 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-2.5 text-xs">
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                      <span className="text-slate-400">Booking Reference:</span>
                      <span className="text-brand-red font-bold font-mono text-sm tracking-wider">{confirmedBooking.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Authorized Client:</span>
                      <span className="text-white font-medium">{confirmedBooking.fullName}</span>
                    </div>
                    {confirmedBooking.orgName && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Organization / Site:</span>
                        <span className="text-slate-200">{confirmedBooking.orgName}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Scheduled Date:</span>
                      <span className="text-slate-200">{confirmedBooking.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Time Window:</span>
                      <span className="text-brand-red font-medium">{confirmedBooking.timeSlot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Jurisdiction / Zone:</span>
                      <span className="text-slate-200">{confirmedBooking.location}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-slate-400">Dispatch Status:</span>
                      <span className="text-emerald-400 font-semibold">Confirmed - Operations Assigned</span>
                    </div>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppNotify}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/30"
                    >
                      <i className="fa-brands fa-whatsapp text-lg" />
                      <span>Send Ticket via WhatsApp (+91 88060 78777)</span>
                    </button>

                    <a
                      href={generateGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
                    >
                      <i className="fa-regular fa-calendar-plus text-base" />
                      <span>Add To Google Calendar</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 max-w-lg mx-auto">
                    <Link to="/admin" className="text-brand-red hover:underline font-semibold">
                      → Open in Admin Command Center
                    </Link>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-slate-300 hover:text-white font-semibold underline"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: EXECUTIVE CREDENTIALS & TRUST DOSSIER (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Director's Personal Guarantee Card */}
              <div className="bg-[#121319] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-red/15 border border-brand-red/40 flex items-center justify-center text-brand-red text-2xl shrink-0">
                    <i className="fa-solid fa-user-shield" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold">
                      Director's Commitment
                    </span>
                    <h3 className="font-heading font-black text-lg text-white">
                      Mr. Mosin Azam Shaikh
                    </h3>
                    <p className="text-xs text-slate-400">
                      Founder &amp; Managing Director • Since 2018
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-brand-red pl-3.5 my-4">
                  "Every facility survey is handled with strict confidentiality and tactical precision. Whether it is a 50-acre MIDC manufacturing hub or private executive bouncer protection, our certified supervisors ensure zero vulnerability."
                </p>

                <div className="space-y-2.5 pt-2">
                  <a
                    href="tel:+918806078777"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-red/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <i className="fa-solid fa-phone text-brand-red text-xs" />
                      <span className="text-xs text-slate-300 group-hover:text-white">Director Direct Line:</span>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-red">
                      +91 88060 78777
                    </span>
                  </a>

                  <a
                    href="tel:+917860313601"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-red/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <i className="fa-solid fa-headset text-brand-red text-xs" />
                      <span className="text-xs text-slate-300 group-hover:text-white">24/7 Rapid Response Desk:</span>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-red">
                      +91 78603 13601
                    </span>
                  </a>
                </div>
              </div>

              {/* 4 Pillars of the Legend Audit Guarantee */}
              <div className="bg-[#121319] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4">
                <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-400">
                  The Legend Security Protocol
                </h4>

                {[
                  {
                    title: 'Govt. PSARA Licensed & Verified',
                    desc: 'Every guard and bouncer is 100% background checked with local Maharashtra police verification.',
                    icon: 'fa-certificate',
                  },
                  {
                    title: 'Turnkey 24-Hour Dispatch',
                    desc: 'Emergency standby units stationed across Katraj, Chakan MIDC, Malad & BKC for rapid deployment.',
                    icon: 'fa-bolt-lightning',
                  },
                  {
                    title: 'Comprehensive Threat Report',
                    desc: 'Following our site audit, receive a detailed entry/exit vulnerability assessment free of charge.',
                    icon: 'fa-file-shield',
                  },
                  {
                    title: 'Strict Regulatory Compliance',
                    desc: 'Full ESIC, PF, minimum wage compliance, and certified fire & safety evacuation trained staff.',
                    icon: 'fa-scale-balanced',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pt-1">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-red shrink-0 text-xs">
                      <i className={`fa-solid ${item.icon}`} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-xs text-white mb-0.5">
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
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 space-y-1">
                <div className="text-[11px] uppercase text-brand-red font-semibold tracking-wider">
                  Regional Command Hubs
                </div>
                <p>📍 <strong>Pune HQ:</strong> Katraj, Gujarwadi Road, Pune 411046</p>
                <p>📍 <strong>Mumbai:</strong> Rani Sati Marg, Malad East, Mumbai 400097</p>
                <p>📍 <strong>Palghar:</strong> Commercial Zone, Nalasopara East, Palghar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
