import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';

// =====================================================================
// PREMIUM iOS / SF SYMBOLS-STYLE SVG ICONS (Fine 1.5px Stroke, Hardcoded Sizing)
// =====================================================================

function IconPhone({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconWhatsApp({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconMail({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconBuilding({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="2" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M8 18h.01M16 18h.01" />
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

function IconCheckCircle({ className = '' }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    orgName: '',
    phoneNum: '',
    emailAddr: '',
    serviceType: '',
    siteLocation: '',
    personnelCount: '',
    shiftDuration: '12hrs',
    startDate: '',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = storageService.addQuote({
      fullName: formData.fullName,
      orgName: formData.orgName,
      phoneNum: formData.phoneNum,
      emailAddr: formData.emailAddr,
      serviceType: formData.serviceType || 'Complete Security Solution',
      siteLocation: formData.siteLocation || 'Maharashtra',
      personnelCount: formData.personnelCount ? `${formData.personnelCount} Personnel` : 'Turnkey Roster',
      shiftDuration: formData.shiftDuration === '8hrs' ? '8 Hours' : formData.shiftDuration === '24hrs' ? '24 Hours' : '12 Hours',
      requirements: `${formData.requirements ? formData.requirements + ' | ' : ''}Start Date: ${formData.startDate || 'Immediate'}`,
      estValue: 'Official Proposal Requisition',
    });

    setInquiryId(created.id);
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e50914', '#ffffff', '#10b981'],
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      orgName: '',
      phoneNum: '',
      emailAddr: '',
      serviceType: '',
      siteLocation: '',
      personnelCount: '',
      shiftDuration: '12hrs',
      startDate: '',
      requirements: '',
    });
  };

  const branches = [
    {
      region: 'Pune Headquarters',
      title: 'Katraj Head Office',
      address: 'Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Katraj, Pune 411046',
      contact: '+91 88060 78777',
      jurisdiction: 'Katraj, Hinjawadi, Chakan MIDC, Bhosari, Hadapsar & PCMC',
    },
    {
      region: 'Mumbai Region',
      title: 'Malad East Branch',
      address: 'Patel Society, Pathanwadi, Rani Sati Marg, Malad East, Mumbai 400097',
      contact: '+91 88302 65954',
      jurisdiction: 'Malad, Andheri, BKC, Bandra West, Powai & Thane Corridor',
    },
    {
      region: 'Palghar & Industrial Zone',
      title: 'Nalasopara East Branch',
      address: 'Commercial Zone, Nalasopara East, Palghar District, Maharashtra',
      contact: '+91 88060 78777',
      jurisdiction: 'Nalasopara, Vasai-Virar, Boisar MIDC & Palghar Belt',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#08090d] text-slate-200 min-h-screen">

      {/* CLEAN, BREATHABLE HEADER */}
      <section className="w-full pt-28 pb-8 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-400 text-xs mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium">Contact &amp; Quotations</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold block mb-1">
                Direct Management Desk
              </span>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                Contact &amp; Official Quotation
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Connect directly with Director <strong>Mr. Mosin Azam Shaikh</strong> and operations leadership for facility security, bouncer deployments, and formal tariff proposals across Maharashtra.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                24/7 Operations Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN WORKSPACE: DESK & FORM */}
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT COLUMN: DIRECT CONTACTS & REGIONAL HUBS */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Hotlines Card */}
            <div className="bg-[#0f1016] border border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-3.5">
              <div className="border-b border-white/[0.06] pb-3">
                <span className="text-[10px] uppercase tracking-wider text-brand-red font-semibold block">
                  Management Hotlines
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight mt-0.5">
                  Direct Operations Desk
                </h3>
              </div>

              {/* Director Mosin Shaikh */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <IconPhone className="text-brand-red" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Mr. Mosin Azam Shaikh</span>
                    <a href="tel:+918806078777" className="text-xs font-semibold text-white hover:text-brand-red transition-colors">
                      +91 88060 78777
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20">
                  Director
                </span>
              </div>

              {/* 24/7 Operations Desk */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                    <IconPhone className="text-slate-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Operations &amp; Control Desk</span>
                    <a href="tel:+917860313601" className="text-xs font-semibold text-white hover:text-brand-red transition-colors">
                      +91 78603 13601
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  24/7 Desk
                </span>
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/918806078777?text=Hello%20The%20Legend%20Security,%20I%20need%20security%20quotation%20information."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <IconWhatsApp className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Official WhatsApp Desk</span>
                    <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      +91 88060 78777
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Chat Now
                </span>
              </a>

              {/* Email Desk */}
              <a
                href="mailto:thelegendscrt16@gmail.com"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center shrink-0">
                    <IconMail className="text-slate-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Official Management Email</span>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-red transition-colors">
                      thelegendscrt16@gmail.com
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Regional Branches Card */}
            <div className="bg-[#0f1016] border border-white/[0.08] rounded-2xl p-5 shadow-lg space-y-3.5">
              <div className="border-b border-white/[0.06] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-red font-semibold block">
                    Maharashtra Network
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight mt-0.5">
                    Regional Operational Hubs
                  </h3>
                </div>
                <IconBuilding className="text-slate-500" />
              </div>

              <div className="space-y-3 text-xs">
                {branches.map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{b.title}</span>
                      <span className="text-[10px] text-emerald-400 font-medium">{b.region}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{b.address}</p>
                    <div className="pt-1.5 flex items-center justify-between text-[11px] border-t border-white/[0.04]">
                      <span className="text-slate-500">{b.jurisdiction}</span>
                      <a href={`tel:${b.contact.replace(/[^0-9+]/g, '')}`} className="text-brand-red hover:underline font-medium">
                        {b.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle On-site Survey Link */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Planning an on-site physical survey?</span>
              <Link to="/book-appointment" className="text-brand-red hover:underline font-medium inline-flex items-center gap-1">
                <span>Book Slot</span>
                <IconArrowRight className="w-3 h-3 text-brand-red" />
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: REQUEST QUOTATION FORM */}
          <div className="lg:col-span-7 bg-[#0f1016] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold">
                  Official Quotation Desk
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Direct Channel
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Request Quotation for Services
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Specify your personnel requirement below. Our management will formulate an official proposal as per prescribed tariff standards.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <IconCheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quotation Request Logged</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your requisition has been dispatched to Director Mosin Shaikh. Ref #{inquiryId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-white transition-colors cursor-pointer"
                >
                  Submit Another Requisition
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="fullName">
                      Contact Person Name *
                    </label>
                    <input
                      id="fullName"
                      required
                      type="text"
                      placeholder="e.g. Mr. Sharma / Manager"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="orgName">
                      Company / Factory / Society Name *
                    </label>
                    <input
                      id="orgName"
                      required
                      type="text"
                      placeholder="e.g. Acme Industries Ltd."
                      value={formData.orgName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="phoneNum">
                      Phone Number (+91) *
                    </label>
                    <input
                      id="phoneNum"
                      required
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.phoneNum}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="emailAddr">
                      Email Address *
                    </label>
                    <input
                      id="emailAddr"
                      required
                      type="email"
                      placeholder="manager@company.com"
                      value={formData.emailAddr}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Service & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="serviceType">
                      Particular Service Required *
                    </label>
                    <select
                      id="serviceType"
                      required
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors cursor-pointer"
                    >
                      <option value="" disabled>Select Particular</option>
                      <option value="Security Guard (Industrial/Commercial)">Security Guard (Industrial / Commercial)</option>
                      <option value="Security Supervisor">Security Supervisor</option>
                      <option value="Bouncer (Event/Club/VIP)">Bouncer (Event / Club / VIP / Wedding)</option>
                      <option value="Personal Armed Escort (PSO)">Personal Body Guard (PSO) Service</option>
                      <option value="Housekeeping & Facility Staff">Housekeeping &amp; Facility Staff</option>
                      <option value="Office Boy / Corporate Support">Office Boy / Corporate Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="siteLocation">
                      Deployment Site / City Location *
                    </label>
                    <input
                      id="siteLocation"
                      required
                      type="text"
                      placeholder="e.g. Hadapsar / Hinjawadi / Mumbai"
                      value={formData.siteLocation}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Count, Shift, Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="personnelCount">
                      Staff Needed (Count)
                    </label>
                    <input
                      id="personnelCount"
                      type="number"
                      min="1"
                      placeholder="e.g. 4"
                      value={formData.personnelCount}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="shiftDuration">
                      Shift Routine
                    </label>
                    <select
                      id="shiftDuration"
                      value={formData.shiftDuration}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors cursor-pointer"
                    >
                      <option value="8hrs">8 Hours Duty</option>
                      <option value="12hrs">12 Hours Duty</option>
                      <option value="24hrs">24 Hours Round-the-Clock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="startDate">
                      Required From Date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="requirements">
                    Specific Scope / Notes
                  </label>
                  <textarea
                    id="requirements"
                    rows="3"
                    placeholder="Mention any gatekeeper requirements, night-patrol routines, specific uniform standards, or temporary event hours..."
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Transmit Quotation Requisition</span>
                    <IconArrowRight />
                  </button>
                </div>

                <p className="text-center pt-1 text-[11px] text-slate-500">
                  * GST will be extra on rates • Rate different for temporary services • Valid for one year.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
