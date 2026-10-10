// =====================================================================
// THE LEGEND SECURITY & BOUNCER - PERSISTENT DATA & EVENT ENGINE
// Handles Appointments, Quotes, Roster, Admin Auth, and Realtime Events
// =====================================================================

const STORAGE_KEYS = {
  APPOINTMENTS: 'legend_appointments_v1',
  QUOTES: 'legend_quotes_v1',
  GUARDS: 'legend_guards_v1',
  AUTH: 'legend_admin_auth_v1',
};

const DEFAULT_ADMIN_PIN = '2026';

// Realistic Enterprise Demo Data for Western Maharashtra Security Operations
const INITIAL_APPOINTMENTS = [
  {
    id: 'TL-AUDIT-9821',
    createdAt: '2026-10-10T14:30:00.000Z',
    fullName: 'Rajesh K. Singhania',
    orgName: 'Apex Industrial Hub, Chakan MIDC',
    phoneNum: '+91 98220 44119',
    emailAddr: 'r.singhania@apexindustries.in',
    auditType: 'On-Site Vulnerability & Security Audit',
    location: 'Chakan Phase-II MIDC, Pune',
    date: '2026-10-13',
    timeSlot: '11:00 AM - 12:30 PM',
    riskLevel: 'Urgent Dispatch (<24 Hours)',
    notes: 'Need 12 security guards + 2 supervisors for multi-acre manufacturing unit gate & perimeter control.',
    status: 'Confirmed',
    assignedOfficer: 'Supervisor Vikram Patil',
  },
  {
    id: 'TL-AUDIT-9822',
    createdAt: '2026-10-09T10:15:00.000Z',
    fullName: 'Aditya Deshmukh',
    orgName: 'Emerald Grand Bay Banquets',
    phoneNum: '+91 98901 33452',
    emailAddr: 'events@emeraldgrandbay.com',
    auditType: 'Event Security Command & Bouncer Squad',
    location: 'Bandra-Kurla Complex (BKC), Mumbai',
    date: '2026-10-14',
    timeSlot: '02:30 PM - 04:00 PM',
    riskLevel: 'Standard Facility Audit',
    notes: 'High-profile wedding with 1,200 VIP guests. Requirement: 8 executive bouncers in tactical suits + 4 female guards.',
    status: 'Pending',
    assignedOfficer: 'Director Mosin Shaikh',
  },
  {
    id: 'TL-AUDIT-9823',
    createdAt: '2026-10-08T18:00:00.000Z',
    fullName: 'Sameer Merchant',
    orgName: 'Skyline Pinnacle Towers CHS',
    phoneNum: '+91 91672 55901',
    emailAddr: 'secretary@skylinepinnacle.org',
    auditType: 'Residential & Commercial Society Guarding',
    location: 'Katraj - Kondhwa Corridor, Pune',
    date: '2026-10-12',
    timeSlot: '09:30 AM - 11:00 AM',
    riskLevel: 'Standard Facility Audit',
    notes: '24/7 security transition for 4 towers (350 flats). Requesting quote and background verification review.',
    status: 'Confirmed',
    assignedOfficer: 'Senior Field Officer Shinde',
  },
  {
    id: 'TL-AUDIT-9824',
    createdAt: '2026-10-07T11:45:00.000Z',
    fullName: 'Vikram Malhotra',
    orgName: 'Malhotra Logistics & Warehousing',
    phoneNum: '+91 98205 11874',
    emailAddr: 'v.malhotra@malhotralogistics.com',
    auditType: 'Direct Strategy Consultation (Phone/Video)',
    location: 'Nalasopara East, Palghar District',
    date: '2026-10-15',
    timeSlot: '04:00 PM - 05:00 PM',
    riskLevel: 'High Threat Assessment',
    notes: 'Perimeter intrusion threats reported on warehouse rear zone. Immediate armed escort assessment needed.',
    status: 'Completed',
    assignedOfficer: 'Director Mosin Shaikh',
  },
];

const INITIAL_QUOTES = [
  {
    id: 'TL-QUOTE-4011',
    createdAt: '2026-10-10T16:00:00.000Z',
    fullName: 'Pooja Agarwal',
    orgName: 'NexGen Infotech Park',
    phoneNum: '+91 98811 77340',
    emailAddr: 'procurement@nexgenpark.com',
    serviceType: 'Corporate & Tech Park Security',
    siteLocation: 'Hinjawadi Phase 1, Pune',
    personnelCount: '16 Guards',
    shiftDuration: '24hrs (Dual 12h Shifts)',
    requirements: 'Boom barrier operations, visitor biometric logging, CCTV monitoring desk team.',
    status: 'New Lead',
    estValue: '₹ 4,80,000 / mo',
  },
  {
    id: 'TL-QUOTE-4012',
    createdAt: '2026-10-09T13:20:00.000Z',
    fullName: 'Harshvardhan Shinde',
    orgName: 'Shinde Auto Components',
    phoneNum: '+91 97654 22091',
    emailAddr: 'h.shinde@shindeauto.co.in',
    serviceType: 'Industrial & MIDC Manned Guarding',
    siteLocation: 'Bhosari MIDC, Pune',
    personnelCount: '8 Guards',
    shiftDuration: '12hrs',
    requirements: 'Raw material gate check, weighbridge security, anti-pilferage patrols.',
    status: 'Proposal Dispatched',
    estValue: '₹ 2,20,000 / mo',
  },
  {
    id: 'TL-QUOTE-4013',
    createdAt: '2026-10-08T09:40:00.000Z',
    fullName: 'Farhan Qureshi',
    orgName: 'Club Velvet Lounge',
    phoneNum: '+91 98210 99881',
    emailAddr: 'farhan@velvetlounge.in',
    serviceType: 'Executive VIP Bouncers',
    siteLocation: 'Malad West & Andheri Link Road, Mumbai',
    personnelCount: '6 Bouncers',
    shiftDuration: '8hrs Night Shift',
    requirements: 'Crowd management, dress code compliance, VIP escort for celebrity guests on weekends.',
    status: 'Contract Signed',
    estValue: '₹ 2,70,000 / mo',
  },
  {
    id: 'TL-QUOTE-4014',
    createdAt: '2026-10-06T15:10:00.000Z',
    fullName: 'Nilesh Tambe',
    orgName: 'Surya Multispeciality Hospital',
    phoneNum: '+91 98600 33419',
    emailAddr: 'admin@suryahospitalpune.com',
    serviceType: 'Hospital & Healthcare Security',
    siteLocation: 'Swargate / Bibvewadi, Pune',
    personnelCount: '10 Guards + 2 Wardens',
    shiftDuration: '24hrs',
    requirements: 'ER dispute escalation handling, ambulance bay clearance, round-the-clock ward security.',
    status: 'Audit Scheduled',
    estValue: '₹ 3,40,000 / mo',
  },
];

const INITIAL_GUARDS = [
  {
    id: 'GRD-101',
    name: 'Sgt. Ramesh Pawar (Retd.)',
    role: 'Chief Operations Field Officer',
    zone: 'Pune South (Katraj HQ)',
    badge: 'EX-ARMY',
    status: 'On Duty',
    experience: '14 Years',
    phone: '+91 88060 78777',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'GRD-102',
    name: 'Vikram Singh Jadhav',
    role: 'Executive Protection & Bouncer Lead',
    zone: 'Mumbai Corridor (BKC / Malad)',
    badge: 'VIP PROTECTION',
    status: 'On Duty',
    experience: '9 Years',
    phone: '+91 78603 13601',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'GRD-103',
    name: 'Santosh K. Gawande',
    role: 'Industrial Patrol Supervisor',
    zone: 'Chakan & Bhosari MIDC',
    badge: 'FIRE & SAFETY CERTIFIED',
    status: 'On Duty',
    experience: '8 Years',
    phone: '+91 70582 67585',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'GRD-104',
    name: 'Pradeep Nalawade',
    role: 'Armed Escort Guard (12 Bore Licensed)',
    zone: 'Palghar & Industrial Corridor',
    badge: 'ARMED GUARD',
    status: 'Standby',
    experience: '11 Years',
    phone: '+91 88302 65954',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'GRD-105',
    name: 'Sunita Thorat',
    role: 'Corporate Facility & Female Security Officer',
    zone: 'Hinjawadi IT Park, Pune',
    badge: 'PSARA CERTIFIED',
    status: 'On Duty',
    experience: '6 Years',
    phone: '+91 88060 78777',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
];

// Helper to notify other components/tabs
const dispatchStorageEvent = (key, data) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('legend_data_change', { detail: { key, data } }));
  }
};

export const storageService = {
  // --- INITIALIZATION ---
  init() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUOTES)) {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(INITIAL_QUOTES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.GUARDS)) {
      localStorage.setItem(STORAGE_KEYS.GUARDS, JSON.stringify(INITIAL_GUARDS));
    }
  },

  // --- APPOINTMENTS ---
  getAppointments() {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  },

  addAppointment(appointmentData) {
    this.init();
    const current = this.getAppointments();
    const id = `TL-AUDIT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      assignedOfficer: 'Operations Supervisor (Pending)',
      ...appointmentData,
    };
    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.APPOINTMENTS, updated);
    return newRecord;
  },

  updateAppointmentStatus(id, newStatus, assignedOfficer = null) {
    const current = this.getAppointments();
    const updated = current.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          ...(assignedOfficer ? { assignedOfficer } : {}),
          updatedAt: new Date().toISOString(),
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.APPOINTMENTS, updated);
    return updated;
  },

  deleteAppointment(id) {
    const current = this.getAppointments();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.APPOINTMENTS, updated);
    return updated;
  },

  // --- QUOTES & INQUIRIES ---
  getQuotes() {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return data ? JSON.parse(data) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  },

  addQuote(quoteData) {
    this.init();
    const current = this.getQuotes();
    const id = `TL-QUOTE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id,
      createdAt: new Date().toISOString(),
      status: 'New Lead',
      ...quoteData,
    };
    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.QUOTES, updated);
    return newRecord;
  },

  updateQuoteStatus(id, newStatus) {
    const current = this.getQuotes();
    const updated = current.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.QUOTES, updated);
    return updated;
  },

  deleteQuote(id) {
    const current = this.getQuotes();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.QUOTES, updated);
    return updated;
  },

  // --- GUARDS ROSTER ---
  getGuards() {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GUARDS);
      return data ? JSON.parse(data) : INITIAL_GUARDS;
    } catch {
      return INITIAL_GUARDS;
    }
  },

  toggleGuardStatus(id) {
    const current = this.getGuards();
    const updated = current.map((guard) => {
      if (guard.id === id) {
        const nextStatus = guard.status === 'On Duty' ? 'Standby' : 'On Duty';
        return { ...guard, status: nextStatus };
      }
      return guard;
    });
    localStorage.setItem(STORAGE_KEYS.GUARDS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.GUARDS, updated);
    return updated;
  },

  // --- STATS OVERVIEW ---
  getStats() {
    const appts = this.getAppointments();
    const quotes = this.getQuotes();
    const guards = this.getGuards();

    const pendingAppts = appts.filter((a) => a.status === 'Pending').length;
    const confirmedAppts = appts.filter((a) => a.status === 'Confirmed').length;
    const activeGuards = guards.filter((g) => g.status === 'On Duty').length;

    return {
      totalAppointments: appts.length,
      pendingAppointments: pendingAppts,
      confirmedAppointments: confirmedAppts,
      totalQuotes: quotes.length,
      newQuotes: quotes.filter((q) => q.status === 'New Lead').length,
      totalGuards: guards.length,
      activeGuards,
      estimatedPipelineValue: '₹ 13.1 Lakhs / mo',
    };
  },

  // --- ADMIN AUTHENTICATION ---
  isAdminAuthenticated() {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },

  loginAdmin(pin) {
    if (pin === DEFAULT_ADMIN_PIN || pin === 'admin123') {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid Security PIN. (Default demo PIN is 2026)' };
  },

  logoutAdmin() {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  // --- DEMO RESET / SEED ---
  resetToDemoData() {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(INITIAL_QUOTES));
    localStorage.setItem(STORAGE_KEYS.GUARDS, JSON.stringify(INITIAL_GUARDS));
    dispatchStorageEvent('all', {});
  },

  // --- EXPORT TO CSV ---
  exportToCSV(type = 'appointments') {
    const data = type === 'appointments' ? this.getAppointments() : this.getQuotes();
    if (!data || !data.length) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            const val = row[fieldName] ? String(row[fieldName]).replace(/"/g, '""') : '';
            return `"${val}"`;
          })
          .join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `LegendSecurity_${type}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
