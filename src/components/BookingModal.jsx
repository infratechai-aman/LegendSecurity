import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

export default function BookingModal({ isOpen, onClose, initialType = '' }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const [formData, setFormData] = useState({
    auditType: initialType || 'On-Site Vulnerability & Security Audit',
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), // Default to 2 days ahead
    timeSlot: '11:00 AM - 12:30 PM',
    fullName: '',
    orgName: '',
    phoneNum: '',
    emailAddr: '',
    location: 'Pune (Katraj / Chakan / MIDC)',
    riskLevel: 'Standard Facility Audit',
    notes: '',
  });

  if (!isOpen) return null;

  const AUDIT_TYPES = [
    {
      id: 'On-Site Vulnerability & Security Audit',
      title: 'On-Site Vulnerability & Security Audit',
      desc: 'Physical threat assessment for factories, MIDC plants, IT parks & townships.',
      icon: 'fa-shield-halved',
      badge: 'POPULAR',
    },
    {
      id: 'VIP & Executive Protection Briefing',
      title: 'Executive Protection & Bouncer Deployment',
      desc: 'High-level personal security, escort bouncers & armored logistics.',
      icon: 'fa-user-ninja',
      badge: 'ELITE',
    },
    {
      id: 'Event Security Command & Crowd Control',
      title: 'Event & Mega Gathering Command',
      desc: 'Concerts, celebrity galas, high-profile weddings & corporate expos.',
      icon: 'fa-users-viewfinder',
      badge: 'RAPID DISPATCH',
    },
    {
      id: 'Direct Strategy Consultation (Phone/Video)',
      title: 'Direct Strategic Call with Director Mosin Shaikh',
      desc: 'Confidential 30-min strategy review on threat mitigation & manpower sizing.',
      icon: 'fa-phone-volume',
      badge: 'DIRECT DESK',
    },
  ];

  const TIME_SLOTS = [
    { slot: '09:30 AM - 11:00 AM', label: 'Morning Audit', tag: 'Fast-Track' },
    { slot: '11:00 AM - 12:30 PM', label: 'Prime Inspection', tag: 'Recommended' },
    { slot: '02:30 PM - 04:00 PM', label: 'Afternoon Survey', tag: 'Available' },
    { slot: '04:00 PM - 05:30 PM', label: 'Operations Brief', tag: 'Available' },
    { slot: '07:00 PM - 08:30 PM', label: 'Night Shift Audit', tag: 'Tactical' },
  ];

  const LOCATIONS = [
    'Pune — Katraj & Pune South',
    'Pune — Bhawani Peth & Central Pune',
    'Pune — Chakan & Bhosari MIDC',
    'Pune — Hinjawadi IT Park & PCMC',
    'Mumbai — BKC & South Mumbai',
    'Mumbai — Malad, Andheri & Western Suburbs',
    'Thane & Navi Mumbai Industrial Corridor',
    'Palghar & Nalasopara / Boisar MIDC',
    'Other Location in Maharashtra',
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
          particleCount: 70,
          spread: 60,
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
      `Appointment Ref: ${confirmedBooking.id}\nClient: ${confirmedBooking.fullName} (${confirmedBooking.orgName})\nPhone: ${confirmedBooking.phoneNum}\nDirector Hotline: +91 88060 78677\nThe Legend Security and Bouncer (PSARA Certified)`
    );
    const loc = encodeURIComponent(confirmedBooking.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}`;
  };

  const handleWhatsAppNotify = () => {
    if (!confirmedBooking) return;
    const msg = encodeURIComponent(
      `*NEW SECURITY CONSULTATION BOOKING*\n\n` +
      `*Ref Code:* ${confirmedBooking.id}\n` +
      `*Client:* ${confirmedBooking.fullName}\n` +
      `*Organization:* ${confirmedBooking.orgName || 'N/A'}\n` +
      `*Phone:* ${confirmedBooking.phoneNum}\n` +
      `*Audit Type:* ${confirmedBooking.auditType}\n` +
      `*Date:* ${confirmedBooking.date}\n` +
      `*Time Slot:* ${confirmedBooking.timeSlot}\n` +
      `*Location:* ${confirmedBooking.location}\n` +
      `*Risk Tier:* ${confirmedBooking.riskLevel}\n\n` +
      `*Request to Director Mr. Mosin Azam Shaikh (The Legend Security)*`
    );
    window.open(`https://wa.me/918806078677?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0f1015] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Crimson Highlight Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-red-500 to-amber-500" />

        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-white/5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red text-base sm:text-lg">
              <i className="fa-solid fa-calendar-check" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-wider text-brand-red uppercase">
                  Official Audit Desk
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-emerald-400 font-medium">Available Slots</span>
              </div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                {step === 4 ? 'Appointment Confirmed' : 'Book Security Meeting & Site Audit'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Step Progress Bar (Hidden on Success) */}
        {step < 4 && (
          <div className="px-5 sm:px-7 py-3 bg-[#13141b] border-b border-white/5 flex items-center justify-between">
            {[
              { num: 1, label: 'Audit Category' },
              { num: 2, label: 'Date & Slot' },
              { num: 3, label: 'Security Dossier' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${
                  step === s.num ? 'text-brand-red font-semibold' : step > s.num ? 'text-slate-300' : 'text-slate-500'
                }`}
                onClick={() => (step > s.num ? setStep(s.num) : null)}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === s.num
                      ? 'bg-brand-red text-white shadow-sm'
                      : step > s.num
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-slate-500 border border-white/10'
                  }`}
                >
                  {step > s.num ? <i className="fa-solid fa-check text-[9px]" /> : s.num}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto">
          {/* STEP 1: SELECT CATEGORY */}
          {step === 1 && (
            <div className="space-y-3.5">
              <p className="text-xs sm:text-sm text-slate-300 mb-2">
                Select the security scope required for your facility or organization in Maharashtra:
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {AUDIT_TYPES.map((type) => {
                  const isSelected = formData.auditType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, auditType: type.id }))}
                      className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group ${
                        isSelected
                          ? 'bg-brand-red/10 border-brand-red/60 shadow-[0_0_20px_rgba(229,9,20,0.15)] ring-1 ring-brand-red/50'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-brand-red text-white' : 'bg-white/5 text-slate-400 group-hover:text-white'
                        }`}
                      >
                        <i className={`fa-solid ${type.icon} text-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-white tracking-wide">
                            {type.title}
                          </h4>
                          {type.badge && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/10 text-slate-300">
                              {type.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                          {type.desc}
                        </p>
                      </div>
                      <div className="shrink-0 mt-1">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-brand-red bg-brand-red' : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/40 hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span>Select Date &amp; Time</span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SLOT */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  1. Target Survey / Meeting Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red transition-colors"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-clock text-brand-red text-[10px]" />
                  <span>Inspections conducted 7 days a week across Maharashtra including holidays.</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  2. Preferred Time Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIME_SLOTS.map((t) => {
                    const isSelected = formData.timeSlot === t.slot;
                    return (
                      <button
                        key={t.slot}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, timeSlot: t.slot }))}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-brand-red/15 border-brand-red text-white shadow-sm ring-1 ring-brand-red/60'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
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
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/40 hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span>Continue to Client Details</span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CLIENT DOSSIER & CONFIRMATION */}
          {step === 3 && (
            <form onSubmit={handleBookingSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Company / Property Name
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    placeholder="e.g. Apex Industrial Park / CHS"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mobile Phone (+91) *
                  </label>
                  <input
                    type="tel"
                    name="phoneNum"
                    required
                    placeholder="+91 98220 XXXXX"
                    value={formData.phoneNum}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailAddr"
                    placeholder="name@company.com"
                    value={formData.emailAddr}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Deployment / Facility Location in Maharashtra *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-[#181920] border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#181920] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Security Priority Tier
                  </label>
                  <select
                    name="riskLevel"
                    value={formData.riskLevel}
                    onChange={handleInputChange}
                    className="w-full bg-[#181920] border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  >
                    <option value="Standard Facility Audit">Standard Facility Survey</option>
                    <option value="Urgent Dispatch (<24 Hours)">Urgent Dispatch (&lt;24 Hours)</option>
                    <option value="High Threat Assessment">High Threat / Executive Escort</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Facility Notes / Specific Scope
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. 4 Gates, 12 Guards, Night Patrol"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              {/* Summary Strip */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-check text-brand-red" />
                  <span className="text-slate-300">Appointment:</span>
                  <span className="text-white font-medium">{formData.date}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-brand-red font-medium">{formData.timeSlot}</span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline">PSARA Licensed Agency</span>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-black/40 hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-xs" />
                      <span>Locking In Slot...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-lock text-xs" />
                      <span>Confirm &amp; Lock Audit Slot</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-5 text-center py-2 animate-scale-up">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/15 border border-brand-red/40 mx-auto flex items-center justify-center text-brand-red text-2xl shadow-lg shadow-black/30">
                <i className="fa-solid fa-shield-check" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider mb-2">
                  ✓ Slot Successfully Reserved
                </span>
                <h3 className="font-heading font-black text-2xl text-white tracking-tight">
                  Security Audit Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Your appointment has been registered in The Legend Security dispatch queue. Director <strong>Mr. Mosin Azam Shaikh</strong> and operations supervisors have received your booking.
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-[#14151c] border border-white/10 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-slate-400">Reference ID:</span>
                  <span className="text-brand-red font-semibold font-mono tracking-wider">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Client:</span>
                  <span className="text-white font-medium">{confirmedBooking.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Date &amp; Slot:</span>
                  <span className="text-slate-200">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target Area:</span>
                  <span className="text-slate-200">{confirmedBooking.location}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-semibold">Confirmed - Operations Notified</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppNotify}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/30"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  <span>Send Ticket to WhatsApp Hotline</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all"
                >
                  <i className="fa-regular fa-calendar-plus" />
                  <span>Add To Google Calendar</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-phone text-brand-red" />
                  <span>Immediate Escalation: +91 88060 78677</span>
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-300 hover:text-white font-semibold underline"
                >
                  Done &amp; Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
