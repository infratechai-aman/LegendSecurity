import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingEmergency() {
  const [expanded, setExpanded] = useState(false);

  const contacts = [
    {
      href: 'tel:+918806078677',
      icon: 'fa-phone',
      iconBg: 'bg-brand-red',
      name: 'Director Mosin Shaikh',
      sub: '+91 88060 78677',
      badge: 'DIRECTOR',
      hoverClass: 'hover:border-brand-red/60',
    },
    {
      href: 'tel:+917860313601',
      icon: 'fa-headset',
      iconBg: 'bg-red-800',
      name: 'Operations Hotline',
      sub: '+91 78603 13601',
      badge: '24/7 HELPLINE',
      hoverClass: 'hover:border-red-500',
    },
    {
      href: 'tel:+917058267585',
      icon: 'fa-phone',
      iconBg: 'bg-slate-700',
      name: 'Mr. Nazim Shaikh',
      sub: '+91 70582 67585',
      badge: 'MANAGER',
      hoverClass: 'hover:border-slate-500',
    },
    {
      href: 'https://wa.me/918806078677',
      icon: 'fa-whatsapp',
      iconBg: 'bg-emerald-600',
      name: 'WhatsApp Dispatch',
      sub: '+91 88060 78677',
      badge: 'INSTANT CHAT',
      hoverClass: 'hover:border-emerald-500',
      external: true,
      isBrand: true,
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded contacts panel */}
      {expanded && (
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-[#0e0f14]/98 border border-brand-red/40 shadow-[0_8px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl text-xs animate-slide-up w-72 sm:w-80">
          {/* Header */}
          <div className="px-2 py-1.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-xs text-white">
                Pune • Mumbai • All Maharashtra
              </span>
              <span className="text-[11px] text-slate-400 font-light">Immediate Guard &amp; Bouncer Deployment</span>
            </div>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Direct Online Booking Action */}
          <Link
            to="/book-appointment"
            onClick={() => setExpanded(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-brand-red to-red-600 text-white transition-all duration-200 group shadow-md hover:brightness-110"
          >
            <div className="w-9 h-9 rounded-xl bg-black/20 text-white flex items-center justify-center shrink-0">
              <i className="fa-solid fa-calendar-check text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="font-heading font-semibold text-xs leading-tight truncate">
                  Book Security Audit
                </p>
                <span className="text-[10px] font-medium bg-white/20 text-white px-2 py-0.5 rounded-full uppercase">
                  Free
                </span>
              </div>
              <p className="text-xs text-white/80 font-light mt-0.5">On-Site Inspection Slot</p>
            </div>
          </Link>

          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 ${c.hoverClass} text-white transition-all duration-200 group`}
            >
              <div className={`w-9 h-9 rounded-xl ${c.iconBg} text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                <i className={`fa-${c.isBrand ? 'brands' : 'solid'} ${c.icon} text-sm`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-heading font-semibold text-xs leading-tight group-hover:text-brand-red transition-colors truncate">
                    {c.name}
                  </p>
                  {c.badge && (
                    <span className="text-[10px] font-medium text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full border border-brand-red/20 uppercase shrink-0">
                      {c.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 font-light mt-0.5">{c.sub}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* FAB Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`relative flex items-center gap-2.5 text-white px-4 py-3.5 rounded-full shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] transition-all duration-300 font-heading font-bold text-xs uppercase tracking-wider focus:outline-none cursor-pointer ${
          expanded
            ? 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600'
            : 'bg-gradient-to-r from-brand-red to-red-700 hover:from-red-600 hover:to-brand-red hover:scale-105'
        }`}
        title="24/7 Deployment Hotline"
      >
        {/* Live pulse indicator */}
        {!expanded && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
        )}

        <i className={`fa-solid ${expanded ? 'fa-xmark' : 'fa-phone'} text-sm transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
        <span className="hidden sm:inline">{expanded ? 'Close' : 'Call Hotline'}</span>
      </button>
    </div>
  );
}
