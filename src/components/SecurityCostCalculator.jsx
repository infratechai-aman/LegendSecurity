import React, { useState } from 'react';
import { storageService } from '../services/storageService';

// =====================================================================
// PREMIUM iOS / SF SYMBOLS-STYLE SVG ICONS (Fine 1.5px Stroke)
// =====================================================================

function IconShield({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconBouncer({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function IconArmed({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  );
}

function IconWarden({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconCheck({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconCalendar({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconArrowRight({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function SecurityCostCalculator({ onBookAudit }) {
  const [personnelCount, setPersonnelCount] = useState(6);
  const [guardType, setGuardType] = useState('manned'); // 'manned' | 'armed' | 'bouncer' | 'warden'
  const [shiftHours, setShiftHours] = useState('12'); // '8' | '12' | '24'
  const [facilityType, setFacilityType] = useState('industrial'); // 'industrial' | 'corporate' | 'residential' | 'event'
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Base monthly rate calculation based on Maharashtra PSARA & industry standards
  const RATES = {
    manned: { '8': 16500, '12': 22500, '24': 45000 },
    armed: { '8': 28000, '12': 38000, '24': 76000 },
    bouncer: { '8': 24000, '12': 32000, '24': 64000 },
    warden: { '8': 17500, '12': 23500, '24': 47000 },
  };

  const GUARD_INFO = {
    manned: {
      name: 'Manned Security Guard',
      desc: 'PSARA licensed, uniform, visitor register, and routine perimeter patrol.',
      icon: IconShield,
    },
    bouncer: {
      name: 'Executive VIP Bouncer',
      desc: 'Physique trained, crowd control, VIP escort, and venue defense.',
      icon: IconBouncer,
    },
    armed: {
      name: 'Licensed Armed Guard',
      desc: '12-Bore firearm licensed, cash transit, and high-security perimeter defense.',
      icon: IconArmed,
    },
    warden: {
      name: 'Female Facility Officer',
      desc: 'Corporate tech parks, healthcare, and female frisking/screening protocols.',
      icon: IconWarden,
    },
  };

  const perGuardRate = RATES[guardType][shiftHours];
  const monthlyTotal = perGuardRate * personnelCount;

  const handleQuickLeadSubmit = (e) => {
    e.preventDefault();
    if (!contactPhone) return;

    setIsSubmittingQuote(true);
    setTimeout(() => {
      storageService.addQuote({
        fullName: contactName || 'Estimator Visitor',
        orgName: `${facilityType.toUpperCase()} Facility`,
        phoneNum: contactPhone,
        serviceType: GUARD_INFO[guardType].name,
        siteLocation: 'Maharashtra (Estimator Request)',
        personnelCount: `${personnelCount} Personnel (${shiftHours}hrs)`,
        shiftDuration: `${shiftHours} Hours`,
        requirements: `Calculated Estimate: ₹ ${monthlyTotal.toLocaleString('en-IN')} / mo. Facility: ${facilityType}`,
        estValue: `₹ ${(monthlyTotal / 100000).toFixed(2)} Lakhs / mo`,
      });
      setIsSubmittingQuote(false);
      setQuoteSubmitted(true);
    }, 350);
  };

  return (
    <div className="bg-[#0f1016] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold block mb-1">
            Cost Estimator
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Security &amp; Manpower Cost Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Estimate monthly deployment investment with statutory PSARA, ESIC, and PF coverage.
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <span className="text-[11px] text-slate-400 block">
            Estimated Monthly Budget
          </span>
          <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-0.5">
            ₹ {monthlyTotal.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-slate-400"> / mo</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center md:justify-end gap-1.5 mt-1">
            <IconCheck className="text-emerald-400" />
            <span>Inclusive of Uniforms &amp; Field Supervision</span>
          </span>
        </div>
      </div>

      {/* Facility Type Selector Bar */}
      <div className="py-4 border-b border-white/[0.06] flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[11px] text-slate-400 font-medium mr-2">
          Facility Environment:
        </span>
        {[
          { id: 'industrial', label: 'MIDC / Factory' },
          { id: 'corporate', label: 'Corporate & IT Park' },
          { id: 'residential', label: 'Township / CHS' },
          { id: 'event', label: 'VIP Event / Banquet' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFacilityType(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              facilityType === f.id
                ? 'bg-white/[0.1] text-white font-medium border border-white/[0.18]'
                : 'bg-white/[0.03] text-slate-400 border border-white/[0.05] hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-b border-white/[0.06]">
        {/* Control 1: Guard Tier */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2.5">
            1. Security Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'manned', label: 'Manned Guard', icon: IconShield },
              { id: 'bouncer', label: 'VIP Bouncer', icon: IconBouncer },
              { id: 'armed', label: 'Armed Escort', icon: IconArmed },
              { id: 'warden', label: 'Female Warden', icon: IconWarden },
            ].map((g) => {
              const IconComp = g.icon;
              const isSelected = guardType === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGuardType(g.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-brand-red/60 text-white shadow-sm ring-1 ring-brand-red/30'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                    isSelected ? 'bg-brand-red/15 text-brand-red' : 'bg-white/[0.04] text-slate-400'
                  }`}>
                    <IconComp className={isSelected ? 'text-brand-red' : 'text-slate-400'} />
                  </div>
                  <span className="text-xs font-medium text-white block">
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5">
            {GUARD_INFO[guardType].desc}
          </p>
        </div>

        {/* Control 2: Shift Hours */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2.5">
            2. Shift Duration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '8', label: '8 Hours', sub: 'Standard' },
              { id: '12', label: '12 Hours', sub: 'Factory Shift' },
              { id: '24', label: '24 Hours', sub: 'Continuous' },
            ].map((s) => {
              const isSelected = shiftHours === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShiftHours(s.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-brand-red/60 text-white shadow-sm ring-1 ring-brand-red/30'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-medium text-white block">
                    {s.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {s.sub}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 mt-2.5">
            Standard Rate: <span className="text-white font-medium">₹ {perGuardRate.toLocaleString('en-IN')}</span> / guard / month
          </p>
        </div>

        {/* Control 3: Personnel Slider */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-xs font-medium text-slate-300">
              3. Deployment Headcount
            </label>
            <span className="text-sm font-semibold text-white">
              {personnelCount} <span className="text-xs text-slate-400 font-normal">Personnel</span>
            </span>
          </div>

          <input
            type="range"
            min="2"
            max="30"
            step="1"
            value={personnelCount}
            onChange={(e) => setPersonnelCount(parseInt(e.target.value))}
            className="w-full accent-brand-red cursor-pointer h-1.5 bg-white/10 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>2 Staff</span>
            <span>15 Staff</span>
            <span>30+ Turnkey</span>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Supervisor Ratio:</span>
            <span className="text-white font-medium">
              {personnelCount >= 10 ? '1 Dedicated Field Officer Included' : 'Shared Roving Patrol'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {!quoteSubmitted ? (
          <form onSubmit={handleQuickLeadSubmit} className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <input
              type="text"
              placeholder="Your Name / Company"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors w-full sm:w-44"
            />
            <input
              type="tel"
              required
              placeholder="Mobile Phone (+91) *"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors w-full sm:w-44"
            />
            <button
              type="submit"
              disabled={isSubmittingQuote}
              className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-sm"
            >
              {isSubmittingQuote ? (
                <span>Generating Proposal...</span>
              ) : (
                <>
                  <span>Lock In This Quote</span>
                  <IconArrowRight />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <IconCheck className="text-emerald-400" />
            <span>Estimate dispatched to Admin Desk. Director Mosin Shaikh will contact you shortly.</span>
          </div>
        )}

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => onBookAudit && onBookAudit(GUARD_INFO[guardType].name)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <IconCalendar className="text-slate-300" />
            <span>Book Site Survey for This Roster</span>
          </button>
        </div>
      </div>
    </div>
  );
}
