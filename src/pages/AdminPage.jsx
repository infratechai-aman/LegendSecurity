import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => storageService.isAdminAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'quotes' | 'guards' | 'settings'

  // Data state
  const [appointments, setAppointments] = useState(() => storageService.getAppointments());
  const [quotes, setQuotes] = useState(() => storageService.getQuotes());
  const [guards, setGuards] = useState(() => storageService.getGuards());
  const [stats, setStats] = useState(() => storageService.getStats());

  // Filter state
  const [apptFilter, setApptFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  // Load data & verify session
  const refreshData = () => {
    setAppointments(storageService.getAppointments());
    setQuotes(storageService.getQuotes());
    setGuards(storageService.getGuards());
    setStats(storageService.getStats());
  };

  useEffect(() => {
    const handleDataChange = () => {
      refreshData();
    };

    window.addEventListener('legend_data_change', handleDataChange);
    return () => window.removeEventListener('legend_data_change', handleDataChange);
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e?.preventDefault();
    const res = storageService.loginAdmin(pinInput);
    if (res.success) {
      setIsAuthenticated(true);
      setAuthError('');
      refreshData();
    } else {
      setAuthError(res.error);
    }
  };

  const handleDemoQuickLogin = () => {
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
  const handleUpdateApptStatus = (id, newStatus) => {
    storageService.updateAppointmentStatus(id, newStatus);
    refreshData();
  };

  const handleDeleteAppt = (id) => {
    if (window.confirm(`Delete appointment record ${id}?`)) {
      storageService.deleteAppointment(id);
      refreshData();
      if (selectedItemDetail?.id === id) setSelectedItemDetail(null);
    }
  };

  const handleUpdateQuoteStatus = (id, newStatus) => {
    storageService.updateQuoteStatus(id, newStatus);
    refreshData();
  };

  const handleDeleteQuote = (id) => {
    if (window.confirm(`Delete quote record ${id}?`)) {
      storageService.deleteQuote(id);
      refreshData();
    }
  };

  const handleToggleGuard = (id) => {
    storageService.toggleGuardStatus(id);
    refreshData();
  };

  const handleResetData = () => {
    if (window.confirm('Reset all operational records back to initial realistic enterprise demo dataset?')) {
      storageService.resetToDemoData();
      refreshData();
    }
  };

  // WhatsApp quick trigger
  const sendWhatsAppDirect = (phone, text) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchesFilter = apptFilter === 'ALL' || a.status === apptFilter;
    const matchesSearch =
      searchQuery === '' ||
      a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.orgName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Quotes
  const filteredQuotes = quotes.filter((q) => {
    return (
      searchQuery === '' ||
      q.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.orgName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.serviceType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // -------------------------------------------------------------
  // RENDER AUTHENTICATION GATE (IF NOT LOGGED IN)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center p-4 pt-24 pb-16">
        <div className="w-full max-w-md bg-[#101117] border border-white/10 rounded-3xl p-7 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-red via-red-500 to-amber-500 absolute top-0 left-0 right-0" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-red/15 border border-brand-red/40 mx-auto flex items-center justify-center text-brand-red text-2xl mb-4 shadow-[0_0_30px_rgba(229,9,20,0.3)]">
              <i className="fa-solid fa-lock" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-bold">
              RESTRICTED OPERATIONS CONSOLE
            </span>
            <h1 className="font-heading font-black text-2xl text-white uppercase tracking-tight mt-1">
              Command Center Access
            </h1>
            <p className="text-xs text-slate-400 mt-1.5">
              The Legend Security &amp; Bouncer Operations Hub
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Security Access PIN
              </label>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4-digit PIN (Default: 2026)"
                autoFocus
                className="w-full bg-white/5 border border-white/15 focus:border-brand-red rounded-xl px-4 py-3.5 text-center text-lg text-white font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-xs text-center font-mono">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-crimson text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-shield-halved text-xs" />
              <span>Authenticate &amp; Open Command Deck</span>
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-5 pt-5 border-t border-white/5 text-center">
            <button
              type="button"
              onClick={handleDemoQuickLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>One-Click Demo Access (PIN: 2026)</span>
            </button>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Default access configured for Mr. Mosin Azam Shaikh and Ops Desk
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-white font-mono">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER AUTHENTICATED COMMAND CENTER DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Operational Bar */}
        <div className="bg-[#101117] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/15 border border-brand-red/40 flex items-center justify-center text-brand-red text-xl shrink-0">
              <i className="fa-solid fa-satellite-dish" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-red font-bold">
                  COMMAND CENTER // SYSTEM ONLINE
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h1 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Operations &amp; Appointments Command
              </h1>
              <p className="text-xs text-slate-400">
                Authorized: Director <strong>Mr. Mosin Azam Shaikh</strong> &amp; Maharashtra Ops Control
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/book-appointment"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
              <span>Public Booking Page</span>
            </Link>

            <button
              onClick={() => storageService.exportToCSV('appointments')}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              title="Export all appointments to CSV"
            >
              <i className="fa-solid fa-download text-[10px]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleResetData}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-mono text-amber-400 transition-colors flex items-center gap-1.5"
              title="Reset records to full enterprise demo data"
            >
              <i className="fa-solid fa-rotate text-[10px]" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-900/20 hover:bg-red-900/40 border border-red-500/30 text-xs font-mono text-red-300 transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-right-from-bracket text-[10px]" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 4-KPI Command Deck */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#111218] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>SITE AUDITS &amp; APPOINTMENTS</span>
              <i className="fa-solid fa-calendar-check text-brand-red" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">
              {stats.totalAppointments || appointments.length}
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] font-mono">
              <span className="text-amber-400 font-bold">{stats.pendingAppointments} Pending</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-bold">{stats.confirmedAppointments} Confirmed</span>
            </div>
          </div>

          <div className="bg-[#111218] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>QUOTE LEADS &amp; PIPELINE</span>
              <i className="fa-solid fa-file-invoice text-brand-red" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">
              {stats.totalQuotes || quotes.length}
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] font-mono">
              <span className="text-brand-red font-bold">{stats.newQuotes} New Inquiries</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Maharashtra</span>
            </div>
          </div>

          <div className="bg-[#111218] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>EST. MONTHLY PIPELINE</span>
              <i className="fa-solid fa-chart-line text-emerald-400" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">
              {stats.estimatedPipelineValue || '₹ 13.1 L/mo'}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-2">
              B2B Security Contracts Value
            </div>
          </div>

          <div className="bg-[#111218] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>DEPLOYED FIELD OFFICERS</span>
              <i className="fa-solid fa-user-shield text-brand-red" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">
              {stats.activeGuards || guards.length} / {guards.length}
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active on Maharashtra Posts</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'appointments', label: 'Site Audits & Appointments', icon: 'fa-calendar-days', count: appointments.length },
              { id: 'quotes', label: 'Quotation Leads CRM', icon: 'fa-file-invoice-dollar', count: quotes.length },
              { id: 'guards', label: 'Guard Roster & Deployment', icon: 'fa-shield-halved', count: guards.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                }}
                className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-brand-red text-white shadow-lg shadow-red-900/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className={`fa-solid ${tab.icon} text-xs`} />
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/40">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records, client, city..."
              className="w-full bg-white/5 border border-white/10 focus:border-brand-red rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: APPOINTMENTS & SITE AUDITS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-2">Status Filter:</span>
              {['ALL', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((f) => (
                <button
                  key={f}
                  onClick={() => setApptFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    apptFilter === f
                      ? 'bg-white/20 text-white font-bold border border-white/30'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Appointments Table / Cards */}
            <div className="bg-[#101117] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Ref Code</th>
                      <th className="py-3.5 px-4">Client &amp; Organization</th>
                      <th className="py-3.5 px-4">Audit Category</th>
                      <th className="py-3.5 px-4">Date &amp; Time Slot</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-slate-400 font-mono">
                          No appointment records match the selected query.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono text-brand-red font-bold whitespace-nowrap">
                            {item.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-heading font-bold text-white text-xs">
                              {item.fullName}
                            </div>
                            <div className="text-[11px] text-slate-400">{item.orgName || 'Individual / Site'}</div>
                            <div className="text-[10px] font-mono text-slate-500">{item.phoneNum}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-white font-medium text-xs">{item.auditType}</div>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                              {item.riskLevel}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                            <div className="text-slate-200">{item.date}</div>
                            <div className="text-brand-red text-[11px]">{item.timeSlot}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 text-xs max-w-[180px] truncate">
                            {item.location}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={item.status}
                              onChange={(e) => handleUpdateApptStatus(item.id, e.target.value)}
                              className={`text-[11px] font-mono font-bold px-2 py-1 rounded-lg border focus:outline-none bg-[#13141b] ${
                                item.status === 'Confirmed'
                                  ? 'border-emerald-500/50 text-emerald-400'
                                  : item.status === 'Pending'
                                  ? 'border-amber-500/50 text-amber-400'
                                  : item.status === 'Completed'
                                  ? 'border-blue-500/50 text-blue-400'
                                  : 'border-slate-600 text-slate-400'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* WhatsApp Direct */}
                              <button
                                onClick={() =>
                                  sendWhatsAppDirect(
                                    item.phoneNum,
                                    `Hello ${item.fullName}, this is Mosin Azam Shaikh from The Legend Security. Regarding your appointment ${item.id} scheduled for ${item.date} at ${item.timeSlot} (${item.location})...`
                                  )
                                }
                                className="w-7 h-7 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] flex items-center justify-center transition-colors"
                                title="Open WhatsApp Chat with Client"
                              >
                                <i className="fa-brands fa-whatsapp text-xs" />
                              </button>

                              {/* Phone Direct */}
                              <a
                                href={`tel:${item.phoneNum}`}
                                className="w-7 h-7 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 flex items-center justify-center transition-colors"
                                title="Call Client Phone"
                              >
                                <i className="fa-solid fa-phone text-[10px]" />
                              </a>

                              {/* Details Modal Trigger */}
                              <button
                                onClick={() => setSelectedItemDetail(item)}
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors"
                                title="View Full Inspection Dossier"
                              >
                                <i className="fa-solid fa-eye text-[10px]" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteAppt(item.id)}
                                className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 flex items-center justify-center transition-colors"
                                title="Delete Appointment"
                              >
                                <i className="fa-solid fa-trash-can text-[10px]" />
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
        {/* TAB 2: QUOTATIONS & LEADS CRM */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                All client quote requests submitted from website contact forms and quote estimators.
              </p>
              <button
                onClick={() => storageService.exportToCSV('quotes')}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10"
              >
                <i className="fa-solid fa-download mr-1.5 text-[10px]" />
                Export Leads CSV
              </button>
            </div>

            <div className="bg-[#101117] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Lead ID</th>
                      <th className="py-3.5 px-4">Organization &amp; Contact</th>
                      <th className="py-3.5 px-4">Service &amp; Guards</th>
                      <th className="py-3.5 px-4">Shift &amp; Location</th>
                      <th className="py-3.5 px-4">Est. Pipeline</th>
                      <th className="py-3.5 px-4">Stage</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-slate-400 font-mono">
                          No quotation leads found.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono text-brand-red font-bold whitespace-nowrap">
                            {item.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-heading font-bold text-white text-xs">
                              {item.fullName}
                            </div>
                            <div className="text-[11px] text-slate-300">{item.orgName || 'N/A'}</div>
                            <div className="text-[10px] font-mono text-slate-500">{item.phoneNum}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-white font-medium">{item.serviceType}</div>
                            <span className="font-mono text-[10px] text-brand-red font-bold">
                              {item.personnelCount || 'Custom Roster'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-300 text-xs">{item.siteLocation}</div>
                            <div className="text-[10px] font-mono text-slate-500">{item.shiftDuration}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold whitespace-nowrap">
                            {item.estValue || '₹ Quote Needed'}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={item.status}
                              onChange={(e) => handleUpdateQuoteStatus(item.id, e.target.value)}
                              className="text-[11px] font-mono font-bold px-2 py-1 rounded-lg border border-white/20 bg-[#13141b] text-white focus:outline-none"
                            >
                              <option value="New Lead">New Lead</option>
                              <option value="Audit Scheduled">Audit Scheduled</option>
                              <option value="Proposal Dispatched">Proposal Dispatched</option>
                              <option value="Contract Signed">Contract Signed</option>
                              <option value="Closed / Lost">Closed / Lost</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  sendWhatsAppDirect(
                                    item.phoneNum,
                                    `Hello ${item.fullName}, Mosin Shaikh here from The Legend Security. We received your proposal request for ${item.serviceType} at ${item.siteLocation}...`
                                  )
                                }
                                className="w-7 h-7 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] flex items-center justify-center transition-colors"
                                title="WhatsApp Proposal"
                              >
                                <i className="fa-brands fa-whatsapp text-xs" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuote(item.id)}
                                className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 flex items-center justify-center transition-colors"
                                title="Delete Lead"
                              >
                                <i className="fa-solid fa-trash-can text-[10px]" />
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
        {/* TAB 3: GUARDS ROSTER & DEPLOYMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'guards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Key officers, armed bouncers, and squad leaders stationed across Pune, Mumbai, and Palghar command hubs.
              </p>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                100% Police Verified &amp; PSARA Certified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guards.map((g) => (
                <div
                  key={g.id}
                  className="bg-[#111218] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={g.avatar}
                          alt={g.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white/15"
                        />
                        <div>
                          <h4 className="font-heading font-bold text-sm text-white">{g.name}</h4>
                          <p className="text-[11px] text-slate-400">{g.role}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-brand-red/20 text-brand-red border border-brand-red/30 font-bold">
                        {g.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 font-mono py-2 border-y border-white/5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Zone:</span>
                        <span className="text-white">{g.zone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Experience:</span>
                        <span className="text-white">{g.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hotline:</span>
                        <span className="text-brand-red font-bold">{g.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${
                        g.status === 'On Duty' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          g.status === 'On Duty' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`}
                      />
                      <span>{g.status}</span>
                    </span>

                    <button
                      onClick={() => handleToggleGuard(g.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
                    >
                      Toggle Duty State
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DETAIL MODAL (WHEN VIEWING AN APPOINTMENT) */}
        {/* ------------------------------------------------------------- */}
        {selectedItemDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#121319] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-brand-red font-bold">
                    {selectedItemDetail.id}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-mono">Full Inspection Dossier</span>
                </div>
                <button
                  onClick={() => setSelectedItemDetail(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-500 font-mono text-[10px] uppercase">Client &amp; Org</label>
                  <p className="font-heading font-bold text-white text-base">
                    {selectedItemDetail.fullName}
                  </p>
                  <p className="text-slate-300">{selectedItemDetail.orgName || 'N/A'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-slate-500 font-mono text-[10px] uppercase">Direct Phone</label>
                    <p className="font-mono text-brand-red font-bold">{selectedItemDetail.phoneNum}</p>
                  </div>
                  <div>
                    <label className="text-slate-500 font-mono text-[10px] uppercase">Email</label>
                    <p className="font-mono text-slate-300">{selectedItemDetail.emailAddr || 'None provided'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-slate-500 font-mono text-[10px] uppercase">Survey Date &amp; Slot</label>
                    <p className="text-white font-mono">{selectedItemDetail.date}</p>
                    <p className="text-brand-red font-mono text-[11px]">{selectedItemDetail.timeSlot}</p>
                  </div>
                  <div>
                    <label className="text-slate-500 font-mono text-[10px] uppercase">Risk Tier</label>
                    <p className="text-amber-400 font-bold">{selectedItemDetail.riskLevel}</p>
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 font-mono text-[10px] uppercase">Deployment Area / Location</label>
                  <p className="text-slate-200">{selectedItemDetail.location}</p>
                </div>

                {selectedItemDetail.notes && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <label className="text-slate-400 font-mono text-[10px] uppercase block mb-1">
                      Facility Notes &amp; Scope
                    </label>
                    <p className="text-slate-200 italic">{selectedItemDetail.notes}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() =>
                    sendWhatsAppDirect(
                      selectedItemDetail.phoneNum,
                      `Hello ${selectedItemDetail.fullName}, this is Mosin Azam Shaikh from The Legend Security confirming your site survey on ${selectedItemDetail.date} (${selectedItemDetail.timeSlot}).`
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] text-black font-heading font-bold text-xs uppercase flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>WhatsApp Client</span>
                </button>

                <button
                  onClick={() => setSelectedItemDetail(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-mono"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
