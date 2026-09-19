import React, { lazy, Suspense } from 'react';
import { useOutletContext } from 'react-router-dom';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import { siteData } from '../data/site';

// Code-split below-the-fold sections for instant First Contentful Paint
const ServicesGrid = lazy(() => import('../components/sections/ServicesGrid'));
const ScrollStory3D = lazy(() => import('../components/3d/ScrollStory3D'));
const CountriesSection = lazy(() => import('../components/sections/CountriesSection'));
const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs'));
const ProcessTimeline = lazy(() => import('../components/sections/ProcessTimeline'));
const Testimonials3D = lazy(() => import('../components/sections/Testimonials3D'));
const DocumentsSection = lazy(() => import('../components/sections/DocumentsSection'));
const LeadershipSection = lazy(() => import('../components/sections/LeadershipSection'));
const FAQAccordion = lazy(() => import('../components/sections/FAQAccordion'));
const CTASection = lazy(() => import('../components/sections/CTASection'));

function SectionSkeleton() {
  return <div className="w-full min-h-[360px] bg-navy-950" />;
}

export default function HomePage() {
  const { onOpenAssessment } = useOutletContext();

  return (
    <>
      <SEO
        title="Trusted Study Visa & Immigration Consultancy"
        description={siteData.company.subtitle}
        canonicalUrl="/"
      />

      {/* Critical Above-the-Fold Path */}
      <HeroSection onOpenAssessment={onOpenAssessment} />

      {/* Below-the-fold lazily loaded sections */}
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesGrid />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ScrollStory3D onOpenAssessment={onOpenAssessment} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CountriesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs onOpenAssessment={onOpenAssessment} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProcessTimeline onOpenAssessment={onOpenAssessment} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials3D />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DocumentsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <LeadershipSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQAccordion />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CTASection onOpenAssessment={onOpenAssessment} />
      </Suspense>
    </>
  );
}
