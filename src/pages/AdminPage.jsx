import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

// =====================================================================
// PREMIUM iOS / SF SYMBOLS-STYLE MINIMALIST SVG ICONS (Fine 1.5px Stroke)
// =====================================================================

function IconLock({ className = '' }) {
  return (
    <svg className={`w-5 h-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="3" ry="3" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconPhone({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconWhatsApp({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconEye({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconTrash({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconSearch({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconExport({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function IconLogout({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function IconClose({ className = '' }) {
  return (
    <svg className={`w-3.5 h-3.5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => storageService.isAdminAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Primary Data
  const [appointments, setAppointments] = useState(() => storageService.getAppointments());
  const [apptFilter, setApptFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Optional Secondary View for General Contact Inquiries
  const [viewMode, setViewMode] = useState('bookings'); // 'bookings' | 'quotes'
  const [quotes, setQuotes] = useState(() => storageService.getQuotes());

  const refreshData = () => {
    setAppointments(storageService.getAppointments());
    setQuotes(storageService.getQuotes());
  };

  useEffect(() => {
    const handleDataChange = () => refreshData();
    window.addEventListener('legend_data_change', handleDataChange);
    return () => window.removeEventListener('legend_data_change', handleDataChange);
  }, []);

  // Passcode authentication
  const handleLogin = (e) => {
    e?.preventDefault();
    const res = storageService.loginAdmin(pinInput);
    if (res.success) {
      setIsAuthenticated(true);
      setAuthError('');
      refreshData();
    } else {
      setAuthError(res.error || 'Incorrect passcode');
    }
  };

  const handleQuickDemoLogin = () => {
    setPinInput('2026');
    const res = storageService.loginAdmin('2026');
    if (res.success) {
      setIsAuthenticated(true);
      setAuthError('');
      refreshData();
    }
  };

  const handleLogout = () => {
    storageService.logoutAdmin();
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Status updates
  const handleUpdateStatus = (id, newStatus) => {
    storageService.updateAppointmentStatus(id, newStatus);
    refreshData();
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete booking record ${id}?`)) {
      storageService.deleteAppointment(id);
      refreshData();
      if (selectedBooking?.id === id) setSelectedBooking(null);
    }
  };

  // Direct WhatsApp dispatch
  const sendWhatsApp = (phone, booking) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = `Hello ${booking.fullName}, this is Mosin Shaikh from The Legend Security confirming your scheduled site inspection for ${booking.date} (${booking.timeSlot}) at ${booking.location}.`;
    const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchesFilter = apptFilter === 'ALL' || a.status === apptFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.orgName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phoneNum?.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  // -------------------------------------------------------------
  // 1. MINIMALIST APPLE-STYLE PASSCODE GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#121318] border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-slate-200 mb-3.5">
              <IconLock className="w-5 h-5 text-slate-300" />
            </div>
            <h1 className="text-lg font-semibold text-white tracking-tight">Admin Passcode</h1>
            <p className="text-xs text-slate-400 mt-1">The Legend Security • Client Bookings Desk</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 2026)"
                autoFocus
                className="w-full bg-black/40 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-center text-base tracking-widest text-white placeholder:text-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 text-center font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wide hover:bg-slate-200 transition-colors"
            >
              Unlock Bookings
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-white/5 text-center space-y-3">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-xs text-slate-400 hover:text-white transition-colors underline"
            >
              Demo Quick Unlock (2026)
            </button>
            <div>
              <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                ← Return to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. ULTRA-MINIMALIST iOS BOOKINGS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 pt-24 sm:pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Bookings</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-slate-300 font-medium">
              {appointments.length} Total
            </span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-medium">
                {pendingCount} Need Action
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            {/* View switcher between Bookings and Inbound Quotes */}
            <div className="inline-flex rounded-lg bg-white/[0.04] p-0.5 border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setViewMode('bookings')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'bookings' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Site Audits ({appointments.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode('quotes')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'quotes' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Inquiries ({quotes.length})
              </button>
            </div>

            <button
              onClick={() => storageService.exportToCSV('appointments')}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
              title="Export Bookings to CSV"
            >
              <IconExport className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <IconLogout className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: BOOKINGS LIST (PRIMARY) */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'bookings' && (
          <div className="pt-6 space-y-4">
            {/* Search & Segmented Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* iOS Segmented Pill Filter */}
              <div className="inline-flex rounded-xl bg-white/[0.03] p-1 border border-white/[0.08] overflow-x-auto">
                {[
                  { key: 'ALL', label: 'All', count: appointments.length },
                  { key: 'Pending', label: 'Pending', count: pendingCount },
                  { key: 'Confirmed', label: 'Confirmed', count: confirmedCount },
                  { key: 'Completed', label: 'Completed', count: completedCount },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setApptFilter(item.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      apptFilter === item.key
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`ml-1.5 text-[11px] ${apptFilter === item.key ? 'text-black/70' : 'text-slate-500'}`}>
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Minimal Search Bar */}
              <div className="relative w-full md:w-72">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client, property, area..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Bookings Minimalist Table */}
            <div className="bg-[#0f1015] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-xs font-medium text-slate-400">
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4">Requirement</th>
                      <th className="py-3.5 px-4">Inspection Date</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05] text-xs">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          No bookings found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((item) => {
                        const statusDotColor =
                          item.status === 'Confirmed'
                            ? 'bg-emerald-400'
                            : item.status === 'Pending'
                            ? 'bg-amber-400'
                            : item.status === 'Completed'
                            ? 'bg-blue-400'
                            : 'bg-rose-400';

                        return (
                          <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            {/* Client & Organization */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white">{item.fullName}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{item.orgName || 'Private Client'}</div>
                              <div className="text-[11px] text-slate-500">{item.phoneNum}</div>
                            </td>

                            {/* Requirement */}
                            <td className="py-3.5 px-4">
                              <div className="text-slate-200 font-medium">{item.auditType}</div>
                              {item.riskLevel && (
                                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                                  {item.riskLevel}
                                </span>
                              )}
                            </td>

                            {/* Date & Slot */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="text-white font-medium">{item.date}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{item.timeSlot}</div>
                            </td>

                            {/* Location */}
                            <td className="py-3.5 px-4 text-slate-300 max-w-[220px]">
                              <span className="block truncate text-xs" title={item.location}>{item.location}</span>
                            </td>

                            {/* Status Pill with Dropdown */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="relative inline-flex items-center">
                                <span className={`w-2 h-2 rounded-full mr-2 ${statusDotColor}`} />
                                <select
                                  value={item.status}
                                  onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                                  className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-4"
                                >
                                  <option value="Pending" className="bg-[#121318] text-white">Pending</option>
                                  <option value="Confirmed" className="bg-[#121318] text-white">Confirmed</option>
                                  <option value="Completed" className="bg-[#121318] text-white">Completed</option>
                                  <option value="Cancelled" className="bg-[#121318] text-white">Cancelled</option>
                                </select>
                              </div>
                            </td>

                            {/* Minimal iOS Action Icons */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                {/* WhatsApp */}
                                <button
                                  type="button"
                                  onClick={() => sendWhatsApp(item.phoneNum, item)}
                                  className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-colors"
                                  title="WhatsApp Client"
                                >
                                  <IconWhatsApp />
                                </button>

                                {/* Direct Call */}
                                <a
                                  href={`tel:${item.phoneNum}`}
                                  className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 flex items-center justify-center transition-colors"
                                  title="Call Client Phone"
                                >
                                  <IconPhone />
                                </a>

                                {/* View Details */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedBooking(item)}
                                  className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                                  title="Inspect Booking Details"
                                >
                                  <IconEye />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors"
                                  title="Delete Booking"
                                >
                                  <IconTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: QUOTATION INQUIRIES (SUBTLE SECONDARY DESK) */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'quotes' && (
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <p>Inbound price quotation inquiries submitted via website contact form:</p>
              <button
                type="button"
                onClick={() => storageService.exportToCSV('quotes')}
                className="text-slate-300 hover:text-white underline flex items-center gap-1"
              >
                <IconExport className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-[#0f1015] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-xs font-medium text-slate-400">
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Requested Service</th>
                      <th className="py-3.5 px-4">Guards / Shift</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Stage</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05] text-xs">
                    {quotes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-500">
                          No quotation inquiries received yet.
                        </td>
                      </tr>
                    ) : (
                      quotes.map((q) => (
                        <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{q.fullName}</div>
                            <div className="text-[11px] text-slate-400">{q.orgName || 'N/A'}</div>
                            <div className="text-[11px] text-slate-500">{q.phoneNum}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-200">{q.serviceType}</td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {q.manpowerCount} Guards • {q.shiftType}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{q.location}</td>
                          <td className="py-3.5 px-4">
                            <select
                              value={q.status}
                              onChange={(e) => {
                                storageService.updateQuoteStatus(q.id, e.target.value);
                                refreshData();
                              }}
                              className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer"
                            >
                              <option value="New" className="bg-[#121318]">New</option>
                              <option value="Contacted" className="bg-[#121318]">Contacted</option>
                              <option value="Closed" className="bg-[#121318]">Closed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <a
                                href={`tel:${q.phoneNum}`}
                                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 flex items-center justify-center"
                                title="Call"
                              >
                                <IconPhone />
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete quote ${q.id}?`)) {
                                    storageService.deleteQuote(q.id);
                                    refreshData();
                                  }
                                }}
                                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center"
                                title="Delete"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* iOS-STYLE DETAIL SHEET MODAL */}
        {/* ------------------------------------------------------------- */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="bg-[#121318] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-base font-semibold text-white">Booking Details</h3>
                  <p className="text-xs text-slate-400">Ref: {selectedBooking.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <IconClose />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Client Name &amp; Organization</span>
                  <p className="text-white font-medium text-sm mt-0.5">{selectedBooking.fullName}</p>
                  <p className="text-slate-300">{selectedBooking.orgName || 'Private Facility'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Phone Number</span>
                    <a href={`tel:${selectedBooking.phoneNum}`} className="text-white hover:underline font-medium">
                      {selectedBooking.phoneNum}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email Address</span>
                    <p className="text-slate-200">{selectedBooking.emailAddr || 'None provided'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Scheduled Date &amp; Slot</span>
                    <p className="text-white font-medium">{selectedBooking.date}</p>
                    <p className="text-slate-400">{selectedBooking.timeSlot}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Audit Scope</span>
                    <p className="text-slate-200">{selectedBooking.auditType}</p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Facility Location</span>
                  <p className="text-slate-200 mt-0.5">{selectedBooking.location}</p>
                </div>

                {selectedBooking.notes && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[11px]">Client Scope Notes:</span>
                    <p className="text-slate-200 mt-1 italic">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => sendWhatsApp(selectedBooking.phoneNum, selectedBooking)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-medium text-xs flex items-center gap-2 transition-colors"
                >
                  <IconWhatsApp className="w-3.5 h-3.5" />
                  <span>WhatsApp Client</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
