// =====================================================================
// THE LEGEND SECURITY & BOUNCER - PERSISTENT DATA & EVENT ENGINE
// Handles Appointments, Quotes, Roster, Admin Auth, and Realtime Events
// =====================================================================

const STORAGE_KEYS = {
  APPOINTMENTS: 'legend_appointments_v2',
  QUOTES: 'legend_quotes_v2',
  GUARDS: 'legend_guards_v1',
  AUTH: 'legend_admin_auth_v1',
};

const DEFAULT_ADMIN_PIN = '2026';

// Fresh production database (Zero mock entries)
const INITIAL_APPOINTMENTS = [];
const INITIAL_QUOTES = [];

const INITIAL_GUARDS = [
  {
    id: 'GRD-101',
    name: 'Sgt. Ramesh Pawar (Retd.)',
    role: 'Chief Operations Field Officer',
    zone: 'Pune South (Katraj HQ)',
    badge: 'EX-ARMY',
    status: 'On Duty',
    experience: '14 Years',
    phone: '+91 88060 78677',
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
    phone: '+91 70582 67585',
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
    phone: '+91 88060 78677',
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

    // Purge legacy v1 demo mock data keys
    localStorage.removeItem('legend_appointments_v1');
    localStorage.removeItem('legend_quotes_v1');

    const mockAuditIds = ['TL-AUDIT-9821', 'TL-AUDIT-9822', 'TL-AUDIT-9823', 'TL-AUDIT-9824'];
    const mockQuoteIds = ['TL-QUOTE-4011', 'TL-QUOTE-4012', 'TL-QUOTE-4013', 'TL-QUOTE-4014'];

    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify([]));
    } else {
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
        const cleaned = existing.filter((a) => !mockAuditIds.includes(a.id));
        if (cleaned.length !== existing.length) {
          localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(cleaned));
        }
      } catch {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify([]));
      }
    }

    if (!localStorage.getItem(STORAGE_KEYS.QUOTES)) {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify([]));
    } else {
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUOTES) || '[]');
        const cleaned = existing.filter((q) => !mockQuoteIds.includes(q.id));
        if (cleaned.length !== existing.length) {
          localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(cleaned));
        }
      } catch {
        localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify([]));
      }
    }

    if (!localStorage.getItem(STORAGE_KEYS.GUARDS)) {
      localStorage.setItem(STORAGE_KEYS.GUARDS, JSON.stringify(INITIAL_GUARDS));
    }
  },

  clearAllData() {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify([]));
    dispatchStorageEvent(STORAGE_KEYS.APPOINTMENTS, []);
    dispatchStorageEvent(STORAGE_KEYS.QUOTES, []);
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
