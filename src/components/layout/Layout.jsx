import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgressBar from '../common/ScrollProgressBar';
import FloatingWhatsApp from '../common/FloatingWhatsApp';
import StickyBookingCTA from '../common/StickyBookingCTA';
import EligibilityModal from '../forms/EligibilityModal';
import Background3DEffect from '../common/Background3DEffect';
import LiveSuccessToast from '../common/LiveSuccessToast';

export default function Layout() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [assessmentCountry, setAssessmentCountry] = useState('Canada');
  const location = useLocation();

  const handleOpenAssessment = (country) => {
    if (country) setAssessmentCountry(country);
    setIsAssessmentOpen(true);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize Lenis smooth scroll only on non-touch desktop devices
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 768;
    
    if (prefersReducedMotion || isTouch) {
      return;
    }

    let lenisInstance = null;
    let animId = null;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time) {
        lenisInstance?.raf(time);
        animId = requestAnimationFrame(raf);
      }

      animId = requestAnimationFrame(raf);
    }).catch(() => {});

    return () => {
      if (animId) cancelAnimationFrame(animId);
      lenisInstance?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-page text-ink-900 flex flex-col selection:bg-gold-500/20 selection:text-gold-700">
      <ScrollProgressBar />
      <Background3DEffect />

      <Navbar onOpenAssessment={() => handleOpenAssessment()} />

      <main id="main-content" className="flex-1 w-full pt-20 aurora-grain relative z-10">
        <Outlet context={{ onOpenAssessment: handleOpenAssessment }} />
      </main>

      <Footer />

      <LiveSuccessToast onOpenAssessment={() => handleOpenAssessment()} />
      <FloatingWhatsApp />
      <StickyBookingCTA onOpenAssessment={() => handleOpenAssessment()} />

      <EligibilityModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        initialCountry={assessmentCountry}
      />
    </div>
  );
}

