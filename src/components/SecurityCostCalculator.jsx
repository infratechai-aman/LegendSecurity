import React, { useState } from 'react';
import { storageService } from '../services/storageService';

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
    manned: { name: 'Manned Security Guard', desc: 'PSARA licensed, uniform, gate register & patrol' },
    armed: { name: 'Licensed Armed Guard', desc: '12-Bore firearm licensed, cash transit & perimeter defense' },
    bouncer: { name: 'Executive VIP Bouncer', desc: 'Physique trained, crowd control, VIP escort & nightclub security' },
    warden: { name: 'Female Facility Officer', desc: 'Corporate tech park, hospital & female screening protocol' },
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
        requirements: `Calculated Estimate: ₹ ${monthlyTotal.toLocaleString('en-IN')} / mo. Facility Type: ${facilityType}`,
        estValue: `₹ ${(monthlyTotal / 100000).toFixed(2)} Lakhs / mo`,
      });
      setIsSubmittingQuote(false);
      setQuoteSubmitted(true);
    }, 400);
  };

  return (
    <div className="bg-[#111218] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 mb-3">
            <i className="fa-solid fa-calculator text-brand-red text-xs" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-bold">
              TRANSPARENT ENTERPRISE ESTIMATOR
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Instant Manpower &amp; Security Cost Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Estimate monthly deployment investment with statutory PSARA, ESIC, and PF coverage.
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <span className="font-mono text-[11px] text-slate-400 uppercase block">Estimated Monthly Budget</span>
          <div className="font-heading font-black text-3xl sm:text-4xl text-white text-gradient-red">
            ₹ {monthlyTotal.toLocaleString('en-IN')}
            <span className="text-xs text-slate-400 font-normal"> / mo</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">
            ✓ Inclusive of Uniforms &amp; Field Supervision
          </span>
        </div>
      </div>

      {/* Facility Type Selector Bar */}
      <div className="py-4 border-b border-white/5 flex flex-wrap items-center gap-2 relative z-10 text-xs">
        <span className="font-mono text-slate-400 uppercase text-[11px] mr-2">Facility Type:</span>
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
            className={`px-3 py-1.5 rounded-lg font-mono transition-all ${
              facilityType === f.id
                ? 'bg-white/20 text-white font-bold border border-white/30'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 border-b border-white/10 relative z-10">
        {/* Control 1: Guard Tier */}
        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2.5">
            1. Security Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'manned', label: 'Manned Guard', icon: 'fa-shield-halved' },
              { id: 'bouncer', label: 'VIP Bouncer', icon: 'fa-user-ninja' },
              { id: 'armed', label: 'Armed Escort', icon: 'fa-crosshairs' },
              { id: 'warden', label: 'Female Warden', icon: 'fa-user-nurse' },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGuardType(g.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  guardType === g.id
                    ? 'bg-brand-red/15 border-brand-red text-white shadow-sm ring-1 ring-brand-red/50'
                    : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <i className={`fa-solid ${g.icon} text-brand-red text-xs block mb-1`} />
                <span className="font-heading font-bold text-xs uppercase block text-white">
                  {g.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {GUARD_INFO[guardType].desc}
          </p>
        </div>

        {/* Control 2: Shift Hours */}
        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2.5">
            2. Shift Duration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '8', label: '8 Hours', sub: 'Standard' },
              { id: '12', label: '12 Hours', sub: 'Factory Shift' },
              { id: '24', label: '24 Hours', sub: 'Round-the-Clock' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShiftHours(s.id)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  shiftHours === s.id
                    ? 'bg-brand-red/15 border-brand-red text-white ring-1 ring-brand-red/50'
                    : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <span className="font-heading font-black text-xs uppercase block text-white">
                  {s.label}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                  {s.sub}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Rate: ₹ {perGuardRate.toLocaleString('en-IN')} / personnel / month
          </p>
        </div>

        {/* Control 3: Personnel Slider */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              3. Number of Personnel
            </label>
            <span className="font-heading font-black text-lg text-brand-red">
              {personnelCount} <span className="text-xs text-slate-400 font-normal">Guards</span>
            </span>
          </div>

          <input
            type="range"
            min="2"
            max="30"
            step="1"
            value={personnelCount}
            onChange={(e) => setPersonnelCount(parseInt(e.target.value))}
            className="w-full accent-brand-red cursor-pointer h-2 bg-white/10 rounded-lg"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>2 Guards</span>
            <span>15 Guards</span>
            <span>30+ Turnkey</span>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Supervisor Ratio:</span>
            <span className="text-white font-mono font-bold">
              {personnelCount >= 10 ? '1 Dedicated Field Officer Included' : 'Shared Roving Patrol'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {!quoteSubmitted ? (
          <form onSubmit={handleQuickLeadSubmit} className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <input
              type="text"
              placeholder="Your Name / Company"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none w-full sm:w-44"
            />
            <input
              type="tel"
              required
              placeholder="Mobile Phone (+91) *"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none w-full sm:w-44"
            />
            <button
              type="submit"
              disabled={isSubmittingQuote}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/30 hover:brightness-110 transition-all flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              {isSubmittingQuote ? (
                <span>Locking Proposal...</span>
              ) : (
                <>
                  <i className="fa-solid fa-file-invoice text-xs" />
                  <span>Lock In This Quote</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <i className="fa-solid fa-check-circle" />
            <span>Estimate dispatched to Admin Desk. Director Mosin Shaikh will contact you shortly.</span>
          </div>
        )}

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => onBookAudit && onBookAudit(GUARD_INFO[guardType].name)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-calendar-check text-brand-red" />
            <span>Book On-Site Survey for This Roster</span>
          </button>
        </div>
      </div>
    </div>
  );
}
