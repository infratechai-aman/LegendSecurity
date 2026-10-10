import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-slate-100 selection:bg-brand-red selection:text-white">
        {/* Global Tactical Header */}
        <Header />

        {/* Dynamic Route Pages */}
        <main className="flex-1 w-full flex flex-col">
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

        {/* 24/7 Rapid Response Floating Action Widget */}
        <FloatingEmergency />
      </div>
    </Router>
  );
}
