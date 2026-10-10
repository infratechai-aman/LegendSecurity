import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { storageService } from '../services/storageService';

// =====================================================================
// PREMIUM iOS / SF SYMBOLS-STYLE SVG ICONS (Fine 1.5px Stroke)
// =====================================================================

function IconPhone({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconWhatsApp({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconMail({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconBuilding({ className = 'w-4 h-4' }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="2" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M8 18h.01M16 18h.01" />
    </svg>
  );
}

function IconCalendar({ className = 'w-4 h-4' }) {
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
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });
  const [deskRef, deskVisible] = useScrollAnimation({ threshold: 0.1 });

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
      shiftDuration: formData.shiftDuration,
      requirements: formData.requirements || 'Official contact form requisition',
      estValue: '₹ Pending Assessment',
    });
    setInquiryId(created.id);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const resetForm = () => {
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
      requirements: ''
    });
  };

  const branches = [
    {
      region: 'Pune Headquarters',
      title: 'Katraj Head Office',
      address: 'Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Katraj, Pune, MH 411046',
      contact: '+91 88060 78777',
      jurisdiction: 'Katraj, Hinjawadi, Chakan MIDC, Bhosari, Hadapsar, Kharadi & PCMC Belt',
    },
    {
      region: 'Mumbai Region',
      title: 'Malad East Branch Desk',
      address: 'Patel Society, Pathanwadi, Rani Sati Marg, Malad East, Mumbai, MH 400097',
      contact: '+91 88302 65954',
      jurisdiction: 'Malad, Andheri, BKC, Bandra West, Powai, Thane & Greater Mumbai Corridor',
    },
    {
      region: 'Palghar & Industrial Zone',
      title: 'Nalasopara East Branch',
      address: 'Commercial Zone, Nalasopara East, Palghar District, Maharashtra',
      contact: '+91 88060 78777',
      jurisdiction: 'Nalasopara, Vasai-Virar, Boisar MIDC, Palghar & Western Industrial Hub',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#08090d] text-slate-200 min-h-screen">
      
      {/* SECTION 1: CLEAN HERO */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 pt-28">
        <div ref={heroRef} className="max-w-6xl mx-auto">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-400 text-xs mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-medium">Contact &amp; Quotations</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">
              Direct Management Desk • Pune • Mumbai • Maharashtra
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-semibold tracking-tight text-white mb-3">
            Contact &amp; Official Quotation
          </h1>

          <p className="text-xs sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Connect directly with Director <strong>Mr. Mosin Azam Shaikh</strong> and the operations desk for site surveys, manpower deployment, and formal contract pricing across Maharashtra.
          </p>

          {/* Quick Schedule Callout Banner */}
          <div className="w-full mt-6 p-4 rounded-2xl bg-[#0f1016] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] text-brand-red flex items-center justify-center shrink-0">
                <IconCalendar className="w-4 h-4 text-brand-red" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  Need an In-Person On-Site Security Survey?
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Pick an inspection date &amp; slot with Director Mosin Shaikh for your facility in Maharashtra.
                </p>
              </div>
            </div>
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <span>Schedule Site Survey</span>
              <IconArrowRight />
            </Link>
          </div>

          {/* Accreditation Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6 mt-6 border-t border-white/[0.06]">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-semibold text-white block">PSARA Govt. Licensed</span>
              <span className="text-[11px] text-brand-red font-medium mt-0.5 block">PSA/L/50/MH/2026</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-semibold text-white block">Shop &amp; Est. Registered</span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">Reg. 2731000318422972</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-semibold text-white block">Rapid 24-Hr Dispatch</span>
              <span className="text-[11px] text-emerald-400 font-medium mt-0.5 block">Pune, Mumbai &amp; All MH</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-semibold text-white block">Statutory Compliance</span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">100% PF &amp; ESIC Lawful</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: DIRECT DESK & QUOTATION FORM */}
      <section ref={deskRef} className="w-full py-12 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT COLUMN: DIRECT CONTACTS & MANAGEMENT */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold block">
                  Management Channels
                </span>
                <h2 className="text-xl font-semibold text-white tracking-tight mt-0.5">
                  Direct Operations Desk
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Connect directly with leadership for immediate security deployments across Maharashtra.
                </p>
              </div>

              {/* Direct Hotlines */}
              <div className="space-y-2.5">
                {/* Director Mosin Shaikh */}
                <div className="p-3.5 rounded-xl bg-[#0f1016] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-red/15 text-brand-red flex items-center justify-center text-xs shrink-0">
                      <IconPhone className="text-brand-red" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Mr. Mosin Azam Shaikh (Director)</span>
                      <a href="tel:+918806078777" className="text-sm font-semibold text-white hover:text-brand-red transition-colors">
                        +91 88060 78777
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/20">
                    Director
                  </span>
                </div>

                {/* Operations Helpline */}
                <div className="p-3.5 rounded-xl bg-[#0f1016] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center text-xs shrink-0">
                      <IconPhone className="text-slate-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Operations &amp; Control Desk</span>
                      <a href="tel:+917860313601" className="text-sm font-semibold text-white hover:text-brand-red transition-colors">
                        +91 78603 13601
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    24/7 Desk
                  </span>
                </div>

                {/* Mr. Nazim Shaikh */}
                <div className="p-3.5 rounded-xl bg-[#0f1016] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center text-xs shrink-0">
                      <IconPhone className="text-slate-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Mr. Nazim Azam Shaikh</span>
                      <a href="tel:+917058267585" className="text-sm font-semibold text-white hover:text-brand-red transition-colors">
                        +91 70582 67585
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    Operations
                  </span>
                </div>

                {/* WhatsApp Desk */}
                <a
                  href="https://wa.me/918806078777?text=Hello%20The%20Legend%20Security,%20I%20need%20security%20quotation%20information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#0f1016] border border-white/[0.08] hover:border-emerald-500/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs shrink-0">
                      <IconWhatsApp className="text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Official WhatsApp Desk</span>
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        +91 88060 78777
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Instant Chat
                  </span>
                </a>

                {/* Email Inbox */}
                <a
                  href="mailto:thelegendscrt16@gmail.com"
                  className="p-3.5 rounded-xl bg-[#0f1016] border border-white/[0.08] hover:border-white/20 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-slate-300 flex items-center justify-center text-xs shrink-0">
                      <IconMail className="text-slate-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Official Email</span>
                      <span className="text-xs font-semibold text-white group-hover:text-brand-red transition-colors">
                        thelegendscrt16@gmail.com
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: REQUEST QUOTATION FOR SERVICES FORM */}
            <div className="lg:col-span-7 bg-[#0f1016] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold">
                    Official Quotation Desk
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Direct Management Review
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Request Quotation for Services
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Specify your personnel requirement below. Our management will formulate an official proposal as per the prescribed tariff standards.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.04] text-brand-red text-xs font-medium border border-white/[0.08]">
                      Ref: {inquiryId}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-2">
                      Quotation Request Received
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.fullName || 'Sir/Madam'}</strong>. Management will review your particulars for <strong className="text-white">{formData.orgName || 'your facility'}</strong> and contact you at <strong className="text-white">+91 {formData.phoneNum}</strong> shortly.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors"
                    >
                      Submit Another Requirement
                    </button>
                    <a
                      href="tel:+918806078777"
                      className="px-4 py-2 rounded-xl bg-brand-red hover:bg-red-600 text-xs font-medium text-white transition-colors"
                    >
                      Call Director Directly
                    </a>
                  </div>
                </div>
              ) : (
                <form className="mt-5 space-y-3.5" onSubmit={handleSubmit}>
                  {/* Name & Org */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="fullName">
                        Contact Person Name *
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="fullName"
                        placeholder="e.g. Mr. Sharma / Manager"
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="orgName">
                        Company / Factory / Society Name *
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="orgName"
                        placeholder="e.g. Acme Industries Ltd."
                        required
                        type="text"
                        value={formData.orgName}
                        onChange={handleChange}
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="phoneNum"
                        placeholder="+91 98200 12345"
                        required
                        type="tel"
                        value={formData.phoneNum}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="emailAddr">
                        Email Address *
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="emailAddr"
                        placeholder="manager@company.com"
                        required
                        type="email"
                        value={formData.emailAddr}
                        onChange={handleChange}
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors cursor-pointer"
                        id="serviceType"
                        required
                        value={formData.serviceType}
                        onChange={handleChange}
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="siteLocation"
                        placeholder="e.g. Hadapsar / Hinjawadi / BKC Mumbai"
                        required
                        type="text"
                        value={formData.siteLocation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Staff count, Shift, Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="personnelCount">
                        Staff Needed (Count)
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="personnelCount"
                        placeholder="e.g. 4"
                        type="number"
                        min="1"
                        value={formData.personnelCount}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="shiftDuration">
                        Shift Routine
                      </label>
                      <select
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors cursor-pointer"
                        id="shiftDuration"
                        value={formData.shiftDuration}
                        onChange={handleChange}
                      >
                        <option value="8hrs">8-Hour Shift Standard</option>
                        <option value="12hrs">12-Hour Factory Duty</option>
                        <option value="24hrs">24-Hour Continuous Post</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="startDate">
                        Required From Date
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors"
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Requirements / Notes */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="requirements">
                      Specific Scope / Notes
                    </label>
                    <textarea
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-white border border-white/[0.08] focus:border-white/20 focus:outline-none text-xs transition-colors resize-y"
                      id="requirements"
                      placeholder="Mention any gatekeeper requirements, night-patrol routines, specific uniform standards, or temporary event hours..."
                      rows="3"
                      value={formData.requirements}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      className="w-full py-3 rounded-xl bg-brand-red hover:bg-red-600 text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      type="submit"
                    >
                      <span>Submit Quotation Request</span>
                      <IconArrowRight />
                    </button>
                  </div>

                  <p className="text-center pt-1 text-[11px] text-slate-500">
                    * GST extra as applicable • Standard rate contract valid for 12 months • Full PSARA &amp; PF compliance.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: REGIONAL BRANCHES & HUBS */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-red font-semibold block">
                Regional Hubs
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-0.5">
                Regional Branches &amp; Operational Bases
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Permanent offices and operational bases ensuring continuous physical supervision across Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {branches.map((hub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0f1016] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium text-slate-400">
                      {hub.region}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>

                  <h3 className="font-semibold text-sm text-white mb-1.5">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {hub.address}
                  </p>

                  <div className="pt-2.5 border-t border-white/[0.06] text-xs text-slate-400 space-y-1">
                    <span className="text-[11px] font-medium text-slate-300 block">Coverage Area:</span>
                    <p className="leading-relaxed text-[11px] text-slate-400">{hub.jurisdiction}</p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <a
                    className="font-medium text-brand-red hover:underline flex items-center gap-1.5"
                    href={`tel:${hub.contact.replace(/[^0-9+]/g, '')}`}
                  >
                    <IconPhone className="w-3.5 h-3.5 text-brand-red" />
                    <span>Call Branch Desk</span>
                  </a>
                  <span className="text-[11px] text-slate-400">{hub.contact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
