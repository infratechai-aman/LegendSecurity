import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation';

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
  const [branchesRef, branchesVisible] = useStaggerAnimation(3, { staggerMs: 120 });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqId = `#TL-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(reqId);
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
      code: 'HEADQUARTERS // PUNE',
      title: 'Katraj Head Office',
      address: 'Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Near Mahadev Mandir, Katraj, Pune, Maharashtra 411046',
      contact: '+91 88060 78777 / 70582 67585',
      jurisdiction: 'Katraj, Hinjawadi, Chakan MIDC, Bhosari, Hadapsar, Aundh & Pune PCMC',
    },
    {
      code: 'BRANCH 02 // MUMBAI',
      title: 'Malad East Branch',
      address: 'Patel Society, Indira Nagar, Pathanwadi, Rani Sati Marg, Malad East, Mumbai, Maharashtra 400097',
      contact: '+91 88302 65954 / 78603 13601',
      jurisdiction: 'Malad, Andheri, BKC, Bandra West, Powai, Thane & Greater Mumbai Corridor',
    },
    {
      code: 'BRANCH 03 // PALGHAR',
      title: 'Nalasopara East Branch',
      address: 'Commercial Zone, Nalasopara East, Palghar District, Maharashtra',
      contact: '+91 88060 78777',
      jurisdiction: 'Nalasopara, Vasai-Virar, Boisar MIDC, Palghar & Industrial Belt',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section className="relative w-full bg-[#0a0a0c] text-on-surface py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden pt-28 tactical-grid">
        {/* Ambient background glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-brand-red/6 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-900/10 rounded-full blur-[90px] pointer-events-none" />

        <div ref={heroRef} className="relative w-full flex flex-col items-center lg:items-start text-center lg:text-left max-w-7xl mx-auto">
          
          <nav className={`flex items-center gap-2 text-on-surface-variant font-mono text-xs uppercase tracking-wider mb-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link to="/" className="text-slate-400 hover:text-brand-red transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-brand-red font-semibold">Contact &amp; Quotation</span>
          </nav>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-[#181920] rounded-full shadow-sm mb-6 border border-brand-red/30 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            <span className="font-mono text-xs text-slate-200 uppercase tracking-widest font-bold">
              PUNE • MUMBAI • ALL OVER MAHARASHTRA
            </span>
          </div>

          <h1 className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            LET'S <span className="text-gradient-red">SECURE WHAT MATTERS.</span>
          </h1>

          <p className={`text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            Connect directly with Director <strong>Mr. Mosin Azam Shaikh</strong> and operations desk for site surveys, guard deployment, and official service quotations across <strong>Pune, Mumbai, and All Over Maharashtra</strong>.
          </p>

          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full pt-8 mt-6 border-t border-slate-800/80 max-w-5xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex flex-col p-4 rounded-xl bg-[#121318] border border-slate-800">
              <span className="font-heading font-black text-xs sm:text-sm uppercase text-white tracking-wide">PSARA GOVT. LICENSED</span>
              <span className="text-[11px] text-brand-red font-mono mt-1 font-bold">PSA/L/50/MH/2026</span>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-[#121318] border border-slate-800">
              <span className="font-heading font-black text-xs sm:text-sm uppercase text-white tracking-wide">SHOP &amp; EST. REG.</span>
              <span className="text-[11px] text-slate-400 font-mono mt-1">2731000318422972</span>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-[#121318] border border-slate-800">
              <span className="font-heading font-black text-xs sm:text-sm uppercase text-white tracking-wide">FAST DISPATCH</span>
              <span className="text-[11px] text-emerald-400 font-bold mt-1">Pune, Mumbai &amp; All MH</span>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-[#121318] border border-slate-800">
              <span className="font-heading font-black text-xs sm:text-sm uppercase text-white tracking-wide">ZERO LIABILITY</span>
              <span className="text-[11px] text-slate-400 mt-1">100% PF &amp; ESIC Lawful</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT INFORMATION & QUOTATION FORM */}
      <section ref={deskRef} className={`w-full bg-[#121318] py-20 text-on-surface px-4 sm:px-6 lg:px-12 border-t border-brand-border transition-all duration-700 ${deskVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: REAL PROMOTERS & DIRECT HOTLINES */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <i className="fa-solid fa-address-book text-brand-red"></i>
                  <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-bold">
                    MANAGEMENT CONTACT
                  </span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white tracking-tight">
                  Direct Operations Desk
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Connect directly with management for immediate requirement quotes across Maharashtra.
                </p>
              </div>

              {/* Direct Hotlines */}
              <div className="flex flex-col gap-3">
                {/* Director Mosin Shaikh */}
                <div className="p-4 rounded-xl bg-[#181920] border border-brand-red/30 shadow-md hover:border-brand-red/60 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-brand-red text-white flex items-center justify-center text-sm font-bold shadow-md shadow-red-900/40 group-hover:scale-105 transition-transform">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Mr. Mosin Azam Shaikh (Director)</span>
                      <a className="font-heading font-black text-sm sm:text-base text-white hover:text-brand-red transition-colors tracking-wide" href="tel:+918806078777">
                        +91 88060 78777
                      </a>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-brand-red/20 text-brand-red font-mono text-[10px] uppercase font-bold">
                    DIRECTOR
                  </span>
                </div>

                {/* Operations Helpline: 78603 13601 */}
                <div className="p-4 rounded-xl bg-[#181920] border border-red-900/40 shadow-md hover:border-brand-red/60 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-red-800 text-white flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                      <i className="fa-solid fa-headset"></i>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Operations &amp; Deployment Desk</span>
                      <a className="font-heading font-black text-sm sm:text-base text-white hover:text-brand-red transition-colors tracking-wide" href="tel:+917860313601">
                        +91 78603 13601
                      </a>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-red-950 text-emerald-400 font-mono text-[10px] uppercase font-bold">
                    24/7 HELPLINE
                  </span>
                </div>

                {/* Mr. Nazim Shaikh */}
                <div className="p-4 rounded-xl bg-[#181920] border border-slate-800 shadow-md hover:border-slate-700 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-800 text-white flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Mr. Nazim Azam Shaikh</span>
                      <a className="font-heading font-black text-sm sm:text-base text-white hover:text-brand-red transition-colors tracking-wide" href="tel:+917058267585">
                        +91 70582 67585
                      </a>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#202128] text-slate-300 font-mono text-[10px] uppercase font-bold">
                    MANAGER
                  </span>
                </div>

                {/* Support Line */}
                <div className="p-4 rounded-xl bg-[#181920] border border-slate-800 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-800 text-white flex items-center justify-center text-sm">
                      <i className="fa-solid fa-phone-volume"></i>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Additional Support</span>
                      <a href="tel:+918830265954" className="font-mono text-xs sm:text-sm text-slate-200 hover:text-brand-red">
                        +91 88302 65954
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-4 rounded-xl bg-[#181920] border border-emerald-900/50 shadow-md hover:border-emerald-600/60 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-md shadow-emerald-950 group-hover:scale-105 transition-transform">
                      <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Official WhatsApp</span>
                      <a className="font-heading font-black text-sm text-emerald-400 hover:underline tracking-wide" href="https://wa.me/918806078777" target="_blank" rel="noopener noreferrer">
                        +91 88060 78777
                      </a>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
                  </span>
                </div>
              </div>

              {/* Official Email */}
              <div className="p-5 rounded-xl bg-[#181920] border border-slate-800 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#202128] flex items-center justify-center text-brand-red text-lg shrink-0">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block font-bold">Official Email Inbox</span>
                  <a href="mailto:thelegendscrt16@gmail.com" className="text-xs sm:text-sm font-mono text-white hover:text-brand-red transition-colors underline">
                    thelegendscrt16@gmail.com
                  </a>
                </div>
              </div>

              {/* Head Office Address Box */}
              <div className="p-5 rounded-xl bg-[#181920] border border-brand-red/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-brand-red font-heading font-bold uppercase">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>Registered Head Office</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Sr. No. 1/74, Gujarwadi Road, Bharat Nagar, Near Mahadev Mandir, Katraj, Pune, Maharashtra 411046
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: REQUISITION / QUOTE FORM (Matching PDF Page 7) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-2xl bg-surface-container-lowest text-on-surface shadow-2xl border border-surface-container-highest">
                <div className="flex flex-col gap-1 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="font-label-tactical text-xs uppercase tracking-wider text-primary font-bold">
                      QUOTATION REQUEST
                    </span>
                    <span className="font-label-tactical text-[11px] text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> DIRECT MANAGEMENT CHANNEL
                    </span>
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                    Request Quotation for Services
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Specify your personnel requirement below. Our management will formulate an official proposal as per the prescribed tariff standards.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-surface-container border border-brand-red/40 text-on-surface flex flex-col items-center text-center gap-4 shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center text-3xl">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>

                    <div>
                      <span className="font-mono text-xs px-3 py-1 rounded bg-brand-red/20 text-brand-red border border-brand-red/40 font-bold">
                        {inquiryId}
                      </span>
                      <h3 className="font-heading font-black text-xl text-white uppercase mt-3">
                        Quotation Requisition Transmitted!
                      </h3>
                      <p className="text-xs text-slate-300 max-w-md mt-2 leading-relaxed">
                        Thank you, <strong className="text-white">{formData.fullName || 'Sir/Madam'}</strong>. Management will review your particulars for <strong className="text-white">{formData.orgName || 'your facility'}</strong> and contact you at <strong className="text-white">+91 {formData.phoneNum}</strong> shortly.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={resetForm}
                        className="px-6 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-xs font-heading font-bold uppercase text-white transition-colors"
                      >
                        Submit Another Requirement
                      </button>
                      <a
                        href="tel:+918806078777"
                        className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-crimson text-xs font-heading font-bold uppercase text-white transition-colors flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-phone text-xs"></i>
                        <span>Call Director Now</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form className="flex flex-col gap-5" id="contactForm" onSubmit={handleSubmit}>
                    
                    {/* Name & Org */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="fullName">
                          Contact Person Name *
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all"
                          id="fullName"
                          placeholder="e.g. Mr. Sharma / Manager"
                          required
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="orgName">
                          Company / Factory / Society Name *
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="phoneNum">
                          Phone Number (+91) *
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-slate-400 font-mono text-xs">+91</span>
                          <input
                            className="w-full pl-14 pr-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs font-mono transition-all"
                            id="phoneNum"
                            placeholder="98200 12345"
                            required
                            type="tel"
                            value={formData.phoneNum}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="emailAddr">
                          Email Address *
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all"
                          id="emailAddr"
                          placeholder="manager@company.com"
                          required
                          type="email"
                          value={formData.emailAddr}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Service Type & Site Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="serviceType">
                          Particular Service Required *
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all cursor-pointer"
                            id="serviceType"
                            required
                            value={formData.serviceType}
                            onChange={handleChange}
                          >
                            <option value="" disabled>Select Particular</option>
                            <option value="security-guard">Security Guard (Industrial / Commercial)</option>
                            <option value="security-supervisor">Security Supervisor</option>
                            <option value="bouncer">Bouncer (Event / Club / VIP / Wedding)</option>
                            <option value="pso">Personal Body Guard (PSO) Service</option>
                            <option value="housekeeping">Housekeeping &amp; Facility Staff</option>
                            <option value="office-boy">Office Boy / Corporate Support</option>
                            <option value="cit-service">CIT Services (Cash-In-Transit)</option>
                            <option value="labour-supply">Labour Supply &amp; Manpower</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 pointer-events-none text-slate-400 text-xs"></i>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="siteLocation">
                          Deployment Site / City Location *
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all"
                          id="siteLocation"
                          placeholder="e.g. Hadapsar / Hinjawadi / Mumbai"
                          required
                          type="text"
                          value={formData.siteLocation}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Personnel Count, Shift, & Mobilization */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="personnelCount">
                          Staff Needed (Count)
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs font-mono transition-all"
                          id="personnelCount"
                          min="1"
                          placeholder="e.g. 4"
                          type="number"
                          value={formData.personnelCount}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="shiftDuration">
                          Shift Routine
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all cursor-pointer"
                            id="shiftDuration"
                            value={formData.shiftDuration}
                            onChange={handleChange}
                          >
                            <option value="12hrs">Rates for 12 Hours Duty</option>
                            <option value="8hrs">Rates for 08 Hours Duty</option>
                            <option value="temporary">Temporary / Event Basis</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-4 top-3.5 pointer-events-none text-slate-400 text-xs"></i>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="startDate">
                          Required From Date
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all"
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Additional Brief */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-xs text-white uppercase font-bold" htmlFor="requirements">
                        Specific Scope / Notes
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-white border border-surface-container-highest focus:border-brand-red focus:outline-none text-xs transition-all resize-y"
                        id="requirements"
                        placeholder="Mention any gatekeeper requirements, night-patrol routines, specific uniform standards, or temporary event hours..."
                        rows="3"
                        value={formData.requirements}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        className="w-full py-4 px-6 rounded-xl bg-brand-red text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:bg-brand-crimson transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01]"
                        type="submit"
                      >
                        <span>TRANSMIT QUOTATION REQUISITION</span>
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                      </button>
                    </div>

                    <div className="text-center pt-2 text-[11px] text-slate-400 font-mono">
                      * GST will be extra on rates • Rate different for temporary services • Valid for one year.
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: REAL BRANCH COORDINATES (From Page 8 of PDF) */}
      <section className="w-full bg-[#0a0a0c] py-20 text-on-surface px-4 sm:px-6 lg:px-12 border-t border-brand-border tactical-grid">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-bold">
                BRANCH NETWORK
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
                Regional Branches &amp; Hubs
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Permanent offices and operational bases ensuring continuous physical oversight across Maharashtra.
            </p>
          </div>

          <div ref={branchesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {branches.map((hub, idx) => (
              <div
                key={idx}
                className={`p-7 rounded-2xl bg-[#14151a] shadow-xl border border-slate-800 flex flex-col justify-between hover:border-brand-red/50 hover:shadow-brand-red/10 hover:shadow-2xl transition-all duration-700 group ${
                  branchesVisible.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#1e1f26] text-brand-red border border-slate-800 uppercase font-bold">
                      {hub.code}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-white uppercase mb-2 group-hover:text-brand-red transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {hub.address}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                    <p className="font-semibold text-slate-200">Coverage Jurisdiction:</p>
                    <p className="mt-1 leading-relaxed text-slate-400">{hub.jurisdiction}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <a
                    className="font-heading font-bold text-xs uppercase text-brand-red hover:underline flex items-center gap-1.5"
                    href="tel:+918806078777"
                  >
                    <i className="fa-solid fa-phone text-xs"></i>
                    <span>Call Base</span>
                  </a>
                  <span className="font-mono text-[11px] text-slate-400">{hub.contact.split('/')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
