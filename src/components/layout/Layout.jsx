import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../common/CustomCursor';
import ScrollProgressBar from '../common/ScrollProgressBar';
import FloatingWhatsApp from '../common/FloatingWhatsApp';
import StickyBookingCTA from '../common/StickyBookingCTA';
import EligibilityModal from '../forms/EligibilityModal';

export default function Layout() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Only on larger screens and when motion is not reduced
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-gold-500/25 selection:text-gold-200">
      <CustomCursor />
      <ScrollProgressBar />

      <Navbar onOpenAssessment={() => setIsAssessmentOpen(true)} />

      <main className="flex-1 w-full pt-20">
        <Outlet context={{ onOpenAssessment: () => setIsAssessmentOpen(true) }} />
      </main>

      <Footer />

      <FloatingWhatsApp />
      <StickyBookingCTA onOpenAssessment={() => setIsAssessmentOpen(true)} />

      <EligibilityModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
}
