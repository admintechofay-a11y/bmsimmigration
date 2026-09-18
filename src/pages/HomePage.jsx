import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import ServicesGrid from '../components/sections/ServicesGrid';
import ScrollStory3D from '../components/3d/ScrollStory3D';
import CountriesSection from '../components/sections/CountriesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Testimonials3D from '../components/sections/Testimonials3D';
import DocumentsSection from '../components/sections/DocumentsSection';
import LeadershipSection from '../components/sections/LeadershipSection';
import FAQAccordion from '../components/sections/FAQAccordion';
import CTASection from '../components/sections/CTASection';
import { siteData } from '../data/site';

export default function HomePage() {
  const { onOpenAssessment } = useOutletContext();

  return (
    <>
      <SEO
        title="Trusted Study Visa & Immigration Consultancy"
        description={siteData.company.subtitle}
        canonicalUrl="/"
      />

      <HeroSection onOpenAssessment={onOpenAssessment} />
      <ServicesGrid />
      <ScrollStory3D onOpenAssessment={onOpenAssessment} />
      <CountriesSection />
      <WhyChooseUs onOpenAssessment={onOpenAssessment} />
      <ProcessTimeline onOpenAssessment={onOpenAssessment} />
      <Testimonials3D />
      <DocumentsSection />
      <LeadershipSection />
      <FAQAccordion />
      <CTASection onOpenAssessment={onOpenAssessment} />
    </>
  );
}
