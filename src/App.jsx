import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Code-split routes via React.lazy for instant initial payload
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const CountriesPage = lazy(() => import('./pages/CountriesPage'));
const CountryDetailPage = lazy(() => import('./pages/CountryDetailPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const QATurntablePage = lazy(() => import('./pages/QATurntablePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-12">
      <div className="w-10 h-10 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="__qa" element={<QATurntablePage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="countries/:slug" element={<CountryDetailPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
