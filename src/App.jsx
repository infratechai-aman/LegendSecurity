import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingEmergency from './components/FloatingEmergency';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ClientsPage from './pages/ClientsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AdminPage from './pages/AdminPage';

/* ── Mobile Bottom Nav — 5-tab bar for thumb-friendly navigation ── */
function MobileBottomNav() {
  const tabs = [
    { path: '/',        icon: 'fa-house',        label: 'Home'     },
    { path: '/services',icon: 'fa-user-shield',  label: 'Services' },
    { path: '/gallery', icon: 'fa-images',       label: 'Gallery'  },
    { path: '/contact', icon: 'fa-phone',        label: 'Contact'  },
    { path: '/book-appointment', icon: 'fa-calendar-check', label: 'Book' },
  ];
  return (
    <nav className="lg:hidden mobile-sticky-bar">
      <div className="flex items-center justify-around px-1 py-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px] ${
                isActive
                  ? 'text-brand-red'
                  : 'text-slate-500 hover:text-slate-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive ? 'bg-brand-red/15 scale-110' : ''
                } ${tab.label === 'Book' && !isActive ? 'bg-brand-red text-white scale-110 shadow-lg shadow-red-900/40' : ''}`}>
                  <i className={`fa-solid ${tab.icon} text-xs ${tab.label === 'Book' && !isActive ? 'text-white' : ''}`} />
                </div>
                <span className="text-[9px] font-heading font-bold uppercase tracking-wider">{tab.label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-brand-red" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-slate-100 selection:bg-brand-red selection:text-white">
        {/* Global Tactical Header */}
        <Header />

        {/* Dynamic Route Pages */}
        <main className="flex-1 w-full flex flex-col pb-[68px] lg:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Appointment Booking & Enterprise Operations */}
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/book-consultation" element={<BookAppointmentPage />} />
            
            {/* Restricted Operational Command Center */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Fallback to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Tactical Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav />

        {/* 24/7 Rapid Response Floating Action Widget */}
        <FloatingEmergency />
      </div>
    </Router>
  );
}

