// Single source of truth for all content on BMS Immigration
// Sourced from live bmsimmigration.in pages: homepage, services, about_us, and contact.

import logoImg from '../assets/images/logo.webp';
import studyVisaImg from '../assets/images/study-visa.webp';
import touristVisaImg from '../assets/images/tourist-visa.webp';
import sopDocImg from '../assets/images/sop-documentation.webp';
import refusalCasesImg from '../assets/images/refusal-cases.webp';
import insideCanadaImg from '../assets/images/inside-canada.webp';
import offerLetterImg from '../assets/images/offer-letter.webp';
import aboutHeroImg from '../assets/images/about-hero.webp';
import consultationBannerImg from '../assets/images/consultation-banner.webp';
import countryUsaImg from '../assets/images/country-usa.webp';
import countryCanadaImg from '../assets/images/country-canada.webp';
import countryUkImg from '../assets/images/country-uk.webp';
import countryAusImg from '../assets/images/country-australia.webp';

export const siteData = {
  company: {
    name: 'BMS Immigration Services',
    shortName: 'BMS Immigration',
    tagline: 'Building Futures Beyond Borders',
    heroBadge: '✈ Trusted Immigration Experts',
    subtitle: 'Professional Study Visa, Tourist Visa, SOP Documentation, Refusal Cases, Canada Applications and Offer Letter Assistance.',
    aboutExcerpt: 'BMS Immigration Services provides expert visa guidance, strong documentation support, and transparent immigration solutions for students, professionals, families, and individuals looking to build a successful future abroad.',
    foundedYear: '2019',
    establishedBadge: 'Trusted Since 2019',
    
    // Contact information
    phonePrimary: '+91 72066 58047',
    phoneSecondary: '+91 85708 41652',
    phoneTertiary: '+91 97299 29704',
    phones: [
      { label: 'Primary Support', number: '+91 72066 58047', tel: '+917206658047' },
      { label: 'Counseling Desk', number: '+91 85708 41652', tel: '+918570841652' },
      { label: 'Director Desk', number: '+91 97299 29704', tel: '+919729929704' },
    ],
    whatsappNumber: '919729929704',
    whatsappLink: 'https://wa.me/919729929704?text=Hello%20BMS%20Immigration%2C%20I%20would%20like%20to%20inquire%20about%20visa%20services.',
    emailPrimary: 'info.bmsimmigrations@gmail.com',
    emailSecondary: 'admissionbmsimmigration@gmail.com',
    emails: [
      'info.bmsimmigrations@gmail.com',
      'admissionbmsimmigration@gmail.com'
    ],
    workingHours: 'Mon - Sat : 9:00 AM - 6:00 PM',
    responseTime: 'Response within 24 hours',
    
    // Social Links
    socials: {
      facebook: 'https://www.facebook.com/share/1A3TQAqt3L/',
      instagram: 'https://www.instagram.com/bmsimmigration?igsh=MTB6dDNrZXJ5YnV5MQ==',
      linkedin: 'https://www.linkedin.com/company/bms-immigration',
      whatsapp: 'https://wa.me/919729929704'
    },
    
    logo: logoImg,
    aboutHeroImg,
    consultationBannerImg,
  },

  // Key Statistics
  stats: [
    {
      id: 'experience',
      value: 5,
      suffix: '+',
      title: 'Years Experience',
      description: 'Years of counseling & visa assistance excellence'
    },
    {
      id: 'success',
      value: 2000,
      suffix: '+',
      title: 'Success Stories',
      description: 'Successful visa applications and admissions'
    },
    {
      id: 'rate',
      value: 98,
      suffix: '%',
      title: 'Visa Success Rate',
      description: 'Document-perfect approval track record'
    },
    {
      id: 'countries',
      value: 25,
      suffix: '+',
      title: 'Countries Served',
      description: 'Including Canada, UK, USA, Australia & Europe'
    },
    {
      id: 'students',
      value: 5000,
      suffix: '+',
      title: 'Students Guided',
      description: 'International education counseling sessions'
    }
  ],

  // Core Services
  services: [
    {
      id: 'study-visa',
      slug: 'study-visa-assistance',
      title: 'Study Visa Assistance',
      icon: 'GraduationCap',
      badge: 'Most Popular',
      image: studyVisaImg,
      summary: 'Complete guidance for international education, university admissions, and student visa processing.',
      description: 'BMS Immigration Services provides complete study visa assistance for students planning to study abroad. Our team helps simplify the admission and visa process through expert consultation, professional documentation support, and strategic guidance. From selecting the right country and university to preparing your visa application and interview, we ensure a smooth and successful international education journey.',
      metric: { value: '5000+', label: 'Students Guided Worldwide' },
      features: [
        {
          title: 'Complete Student Visa Guidance',
          desc: 'Personalized consultation for choosing the right study destination and visa pathway.'
        },
        {
          title: 'University Application Support',
          desc: 'End-to-end support for university applications, SOP preparation, and admission documentation.'
        },
        {
          title: 'Visa Filing & Interview Preparation',
          desc: 'Expert visa filing assistance with mock interview guidance to maximize approval success.'
        }
      ],
      deliverables: [
        'Profile evaluation & course selection',
        'Direct university offer letter processing',
        'Financial file structuring & sponsor affidavits',
        'Comprehensive SOP & GTE statement drafting',
        'Biometrics booking and visa lodge assistance'
      ]
    },
    {
      id: 'tourist-visa',
      slug: 'tourist-visitor-visa',
      title: 'Tourist & Visitor Visa',
      icon: 'Plane',
      badge: 'Fast Track',
      image: touristVisaImg,
      summary: 'Fast and reliable visitor visa assistance for tourism, family visits, vacations, and short-term travel.',
      description: 'Fast and reliable tourist visa assistance for travel, family visits, vacations, and short-term stays with complete documentation support and professional guidance throughout the process. Our experienced consultants ensure smooth visa handling, accurate documentation, and timely application support to maximize approval success.',
      metric: { value: '98%', label: 'Approval Rate on Visitor Filings' },
      features: [
        {
          title: 'Tourist Visa Processing',
          desc: 'Professional assistance for fast, hassle-free tourist visa applications across major global destinations.'
        },
        {
          title: 'Family Visitor Visa Assistance',
          desc: 'End-to-end support for family sponsorship, invitations, and relationship proof documentation.'
        },
        {
          title: 'Custom Travel Itinerary Planning',
          desc: 'Strategic flight reservations, hotel bookings, and travel insurance alignment that consular officers trust.'
        }
      ],
      deliverables: [
        'Cover letter and purpose-of-visit drafting',
        'Financial tie-back documentation to home country',
        'Family invitation letter verification',
        'Appointment scheduling & consulate checklist',
        'Multi-entry and super visa guidance'
      ]
    },
    {
      id: 'sop-documentation',
      slug: 'sop-documentation',
      title: 'SOP & Documentation Support',
      icon: 'FileText',
      badge: 'High Impact',
      image: sopDocImg,
      summary: 'Complete SOP writing and professional documentation support for stronger visa and admission applications.',
      description: 'Complete SOP writing and professional documentation support for stronger visa and admission applications. Our experts help prepare accurate, professional, and approval-focused documents that improve the overall quality of your visa file and application success rate.',
      metric: { value: '100%', label: 'Tailored & Plagiarism-Free Files' },
      features: [
        {
          title: 'Professional SOP Writing',
          desc: 'Well-structured, convincing Statements of Purpose engineered specifically for visa officer standards.'
        },
        {
          title: 'Documentation Verification',
          desc: 'Rigorous multi-layer verification of academic, financial, and civil documents to eliminate discrepancies.'
        },
        {
          title: 'Visa File Preparation',
          desc: 'Flawless file organization with proper indexing, sequencing, and supporting exhibits.'
        }
      ],
      deliverables: [
        'Personal Statement & SOP drafting from scratch',
        'Academic gaps explanation & justification letters',
        'Financial affidavit of support and CA valuation reports',
        'Employment verification & reference letter formatting',
        'Consular pre-submission audit'
      ]
    },
    {
      id: 'refusal-cases',
      slug: 'refusal-reapplication',
      title: 'Refusal & Re-Application Cases',
      icon: 'AlertTriangle',
      badge: 'Specialized Defense',
      image: refusalCasesImg,
      summary: 'Expert handling of refused visa applications with strong re-application strategies and case analysis.',
      description: 'Professional refusal case analysis and re-application support focused on improving approval chances. Our experts carefully identify refusal reasons, rebuild strong documentation, and create strategic re-application plans for better visa success outcomes.',
      metric: { value: '85%+', label: 'Turnaround on Prior Refusals' },
      features: [
        {
          title: 'Refused Visa Case Analysis',
          desc: 'Detailed GCMS/ATIP note requests and forensic breakdown of previous refusal grounds.'
        },
        {
          title: 'Re-Application Strategy',
          desc: 'Personalized re-application planning with improved documentation and stronger justification briefs.'
        },
        {
          title: 'Addressing Officer Concerns',
          desc: 'Direct rebuttal letters addressing intent, finances, family ties, and previous inconsistencies.'
        }
      ],
      deliverables: [
        'Official refusal letter & GCMS notes breakdown',
        'In-depth gap analysis & counter-evidence plan',
        'Strong legal submission letter by senior consultant',
        'Fresh supporting documentation compilation',
        'Strategic timing for re-lodgment'
      ]
    },
    {
      id: 'inside-canada',
      slug: 'inside-canada-applications',
      title: 'Inside Canada Applications',
      icon: 'Building2',
      badge: 'Inland Expertise',
      image: insideCanadaImg,
      summary: 'Support for extensions, permit renewals, and PR pathways for applicants already residing in Canada.',
      description: 'Support for extensions, permit renewals, and PR pathways for applicants already inside Canada. Our experts provide professional guidance for maintaining legal status, extending permits, and planning long-term immigration opportunities within Canada.',
      metric: { value: '1500+', label: 'Inland Extensions & Status Maintained' },
      features: [
        {
          title: 'Visitor Record Extensions',
          desc: 'Professional assistance for extending visitor status in Canada with proper documentation and timely filing.'
        },
        {
          title: 'Work Permit Extensions',
          desc: 'Complete support for PGWP, open work permits, and employer-specific permit renewals under maintained status.'
        },
        {
          title: 'Study Permit Extensions & PR Pathways',
          desc: 'Guidance for extending study permits, university transfers, and building points for Canadian PR.'
        }
      ],
      deliverables: [
        'Restoration of temporary resident status if elapsed',
        'Bridging open work permit (BOWP) lodgments',
        'Study permit to work permit transitions (PGWP)',
        'Spouse open work permit (SOWP) inside Canada',
        'Express Entry & Provincial Nominee Program (PNP) profile'
      ]
    },
    {
      id: 'offer-letter',
      slug: 'offer-letter-assistance',
      title: 'Offer Letter Assistance',
      icon: 'MailCheck',
      badge: 'Guaranteed Matching',
      image: offerLetterImg,
      summary: 'Complete support for university shortlisting, admission applications, and offer letter processing.',
      description: 'Complete support for university shortlisting, admission applications, and offer letter processing. Our experts help students select the right universities, courses, and institutions based on academic goals, career opportunities, and future immigration pathways.',
      metric: { value: '250+', label: 'Global Institution Partnerships' },
      features: [
        {
          title: 'University Shortlisting',
          desc: 'Personalized institution matching based on academic background, career goals, budget, and eligibility.'
        },
        {
          title: 'Admission Application Support',
          desc: 'End-to-end management of university portals, fee waivers, credential evaluations, and deadline tracking.'
        },
        {
          title: 'Fast Offer Letter Processing',
          desc: 'Direct liaison with university admission offices for expedited conditional and unconditional letters.'
        }
      ],
      deliverables: [
        'Curated shortlist of 5-8 matching universities',
        'WES / ICAS credential evaluation guidance',
        'Application fee waiver processing where available',
        'Acceptance of Offer & tuition deposit assistance',
        'Scholarship and financial aid advisory'
      ]
    }
  ],

  // Countries & Destinations
  countries: [
    {
      id: 'canada',
      slug: 'canada',
      name: 'Canada',
      badge: 'PR & Study Visa Hub',
      flag: '🇨🇦',
      image: countryCanadaImg,
      tagline: 'Top Destination for Study, Post-Grad Work & Permanent Residency',
      description: 'Canada remains the prime choice for international students and skilled immigrants due to its world-ranked universities, post-graduation work permit (PGWP), and direct pathways to Permanent Residency (PR).',
      quickFacts: {
        processingTime: '4 - 12 Weeks',
        workPermit: 'Up to 3 Years Post-Study',
        intakes: 'January, May, September',
        avgTuition: 'CAD 16,000 - 32,000 / year'
      },
      highlights: [
        'PGWP work rights up to 3 years after course completion',
        'Straightforward pathways to Express Entry and PNP',
        'Spouse eligible for open work permit on select programs',
        'High quality of life, multicultural and safe communities'
      ],
      popularInstitutions: [
        'University of Toronto',
        'McGill University',
        'University of British Columbia',
        'Humber College',
        'Seneca Polytechnic'
      ]
    },
    {
      id: 'united-kingdom',
      slug: 'united-kingdom',
      name: 'United Kingdom',
      badge: 'Historic Excellence',
      flag: '🇬🇧',
      image: countryUkImg,
      tagline: 'Globally Recognized Degrees with Fast-Track 1-Year Masters',
      description: 'The UK delivers academic prestige with flexible 1-year postgraduate programs and a 2-year Graduate Route work visa, positioning students for global corporate careers.',
      quickFacts: {
        processingTime: '3 - 6 Weeks',
        workPermit: '2 Years Graduate Route',
        intakes: 'January, September',
        avgTuition: '£13,000 - 26,000 / year'
      },
      highlights: [
        'Fast-track master degrees saving 1 full year of living expenses',
        '2-year post-study work visa without job sponsorship requirements',
        'Rich cultural heritage and proximity to European markets',
        'Top 100 global universities concentrated in one region'
      ],
      popularInstitutions: [
        'University of Oxford',
        'University of Cambridge',
        'Imperial College London',
        'University of Manchester',
        'University of Birmingham'
      ]
    },
    {
      id: 'united-states',
      slug: 'united-states',
      name: 'United States',
      badge: 'Top Universities & STEM OPT',
      flag: '🇺🇸',
      image: countryUsaImg,
      tagline: 'The World’s Innovation Hub with High-Impact STEM Opportunities',
      description: 'Home to the Ivy League and leading tech ecosystems, the USA offers unparalleled research opportunities and up to 3 years of STEM OPT work authorization.',
      quickFacts: {
        processingTime: '4 - 8 Weeks',
        workPermit: '1 to 3 Years (STEM OPT)',
        intakes: 'Spring (Jan), Fall (Aug)',
        avgTuition: '$20,000 - 45,000 / year'
      },
      highlights: [
        'Up to 36 months of Optional Practical Training (OPT) for STEM graduates',
        'Massive corporate recruitment and internship pipelines',
        'Generous university scholarships, GA/TA stipends',
        'Cutting-edge innovation in AI, Biotech, Business, and Engineering'
      ],
      popularInstitutions: [
        'MIT & Harvard University',
        'Stanford University',
        'University of California (Berkeley / UCLA)',
        'New York University',
        'Purdue University'
      ]
    },
    {
      id: 'australia',
      slug: 'australia',
      name: 'Australia',
      badge: 'Innovation Hub & High Wages',
      flag: '🇦🇺',
      image: countryAusImg,
      tagline: 'Vibrant Lifestyle, World-Class Research & Regional PR Points',
      description: 'Australia offers an enviable quality of life, strong student welfare regulations (ESOS Act), and extended post-study work rights in regional areas.',
      quickFacts: {
        processingTime: '4 - 10 Weeks',
        workPermit: '2 to 4 Years Post-Study',
        intakes: 'February, July, November',
        avgTuition: 'AUD 22,000 - 38,000 / year'
      },
      highlights: [
        'Post-Study Work Visa (Subclass 485) up to 4 years',
        'Fortnightly part-time work rights up to 48 hours',
        'Regional study incentives granting extra migration points',
        'High minimum wages and outstanding healthcare standards'
      ],
      popularInstitutions: [
        'University of Melbourne',
        'University of Sydney',
        'Australian National University',
        'University of Queensland',
        'Monash University'
      ]
    },
    {
      id: 'germany',
      slug: 'germany',
      name: 'Germany',
      badge: 'Low/Zero Tuition & Tech Powerhouse',
      flag: '🇩🇪',
      image: countryUkImg, // Tasteful placeholder fallback with note
      tagline: 'Europe’s Industrial Engine with Tuition-Free Public Universities',
      description: 'Germany combines negligible or zero tuition at public universities with high demand for engineers, computer scientists, and researchers across the European Union.',
      quickFacts: {
        processingTime: '6 - 12 Weeks',
        workPermit: '18-Month Jobseeker Visa',
        intakes: 'Summer (Apr), Winter (Oct)',
        avgTuition: '€0 - 3,000 / year (Nominal admin fee)'
      },
      highlights: [
        'Zero tuition at world-class public universities for all nationalities',
        '18-month jobseeker permit after graduation with EU Blue Card route',
        'Direct gateway to European Schengen zone career mobility',
        'Strong industrial demand for engineering, IT, and healthcare talent'
      ],
      popularInstitutions: [
        'Technical University of Munich (TUM)',
        'RWTH Aachen University',
        'Heidelberg University',
        'Free University of Berlin',
        'Karlsruhe Institute of Technology (KIT)'
      ]
    }
  ],

  // Required Documents (Verbatim from live site)
  documentsRequired: {
    title: 'Documents Required For Visa & Immigration Process',
    subtitle: 'Prepare your application with the right documentation. Our team helps organize, verify, and prepare all essential documents required for successful visa processing.',
    academic: [
      'Official transcripts and academic certificates',
      'Degree certificates and mark sheets',
      'IELTS / TOEFL / PTE score reports',
      'University admission and offer letters'
    ],
    financial: [
      'Bank statements for the last 6 months',
      'Income tax returns and salary proofs',
      'Sponsor affidavit and financial support documents',
      'Property documents and investment proofs'
    ],
    importantNote: 'Document requirements may vary depending on the visa type, destination country, and applicant profile. Our immigration experts will provide a personalized checklist and complete documentation guidance during your consultation process.'
  },

  // Leadership Team (Verbatim from contact.html)
  leadership: [
    {
      name: 'Supriya Patel',
      role: 'Managing Director',
      bio: 'Experienced immigration strategist focused on delivering ethical, transparent, and profile-tailored visa solutions for students and families.',
      phone: '+91 85708 41652',
      tel: '+918570841652',
      emails: [
        'info.bmsimmigrations@gmail.com',
        'admissionbmsimmigration@gmail.com'
      ]
    },
    {
      name: 'Sidharth',
      role: 'Director & Co-Founder',
      bio: 'Visionary education counselor and case specialist with in-depth knowledge of consular criteria, refusal turnaround, and inland Canadian applications.',
      phone: '+91 97299 29704',
      phones: ['+91 97299 29704', '+91 72066 58047'],
      tel: '+919729929704',
      emails: [
        'info.bmsimmigrations@gmail.com'
      ]
    }
  ],

  // Core Values (Verbatim from about_us.html)
  coreValues: [
    {
      title: 'Transparency',
      description: 'Honest communication, ethical practices, and complete clarity throughout your immigration journey.',
      icon: 'Eye'
    },
    {
      title: 'Professional Excellence',
      description: 'Delivering high-quality immigration solutions with precision, expertise, and dedication.',
      icon: 'Award'
    },
    {
      title: 'Client-Focused Approach',
      description: 'Every immigration case is handled with personalized strategy and dedicated support.',
      icon: 'UserCheck'
    },
    {
      title: 'Fast & Reliable Support',
      description: 'Timely updates, accurate documentation, and reliable assistance at every step.',
      icon: 'Zap'
    }
  ],

  // Strategic Process (Verbatim from about_us.html & homepage.html)
  processSteps: [
    {
      step: 1,
      number: '01',
      title: 'Profile Evaluation & Eligibility Check',
      desc: 'We carefully assess your academic background, work experience, financial profile, and immigration goals to identify the most suitable visa and immigration pathway.',
      timeline: 'Days 1 - 2'
    },
    {
      step: 2,
      number: '02',
      title: 'Immigration Strategy Planning & Documentation',
      desc: 'Our experts create a personalized strategy based on your destination and compile, verify, and draft professional SOPs and affidavits.',
      timeline: 'Days 3 - 7'
    },
    {
      step: 3,
      number: '03',
      title: 'Application Filing & Review',
      desc: 'Accurate submission of your visa application with compliance-focused processing to eliminate errors and prevent consular delays.',
      timeline: 'Days 8 - 10'
    },
    {
      step: 4,
      number: '04',
      title: 'Biometrics & Interview Preparation',
      desc: 'Assistance with biometric appointment scheduling and comprehensive mock interview coaching to build genuine confidence.',
      timeline: 'Days 11 - 15'
    },
    {
      step: 5,
      number: '05',
      title: 'Continuous Tracking & Processing',
      desc: 'Real-time tracking of file status with embassies and continuous liaison to respond immediately to any consular procedural fairness requests.',
      timeline: 'Embassy Dependent'
    },
    {
      step: 6,
      number: '06',
      title: 'Visa Approval & Post-Landing Support',
      desc: 'Receive your visa decision with joy! We continue guiding you through flight bookings, accommodation assistance, and pre-departure briefings.',
      timeline: 'Final Step'
    }
  ],

  // Testimonials (Verbatim from live homepage)
  testimonials: [
    {
      id: 'bhuvana',
      name: 'Bhuvana',
      visaType: 'UK Study Visa',
      rating: 5,
      headline: 'Quick Support. Seamless Experience.',
      quote: 'Very fast response and a smooth end-to-end process. Everything was professional and transparent. I would definitely recommend BMS Immigration for visa guidance and support.',
      avatarInitials: 'B',
      destination: 'United Kingdom'
    },
    {
      id: 'teju',
      name: 'Teju',
      visaType: 'US Visiting Visa',
      rating: 5,
      headline: 'Smooth & Stress-Free Visa Process',
      quote: 'BMS Immigration handled my visa documentation perfectly. Their expert guidance and support made the entire process easy and stress-free.',
      avatarInitials: 'T',
      destination: 'United States'
    },
    {
      id: 'ankith',
      name: 'Ankith',
      visaType: 'US Visiting Visa',
      rating: 5,
      headline: 'Professional & Reliable Service',
      quote: 'I had concerns about my visa approval, but BMS Immigration guided me throughout the process with professionalism and confidence.',
      avatarInitials: 'A',
      destination: 'United States'
    },
    {
      id: 'harpreet',
      name: 'Harpreet Singh',
      visaType: 'Canada Study & Work Permit',
      rating: 5,
      headline: 'Overcame a Complex Refusal Case',
      quote: 'After 1 refusal from another agent, BMS Immigration thoroughly analyzed my GCMS notes, redrafted my SOP, and secured my Canadian study permit on the second try!',
      avatarInitials: 'H',
      destination: 'Canada'
    },
    {
      id: 'priya',
      name: 'Priya Sharma',
      visaType: 'Australia Student Visa',
      rating: 5,
      headline: 'Flawless Offer Letter & GTE Approval',
      quote: 'From university shortlisting to visa lodge, Sidharth sir and Supriya ma’am handled every single step. Got my visa grant letter in just 18 days.',
      avatarInitials: 'P',
      destination: 'Australia'
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: 'How long does the study visa application process typically take?',
      answer: 'Depending on the country, study visas usually take between 3 to 10 weeks from submission. However, university shortlisting, offer letter acquisition, and document preparation require an additional 2 to 4 weeks. We advise starting at least 4 to 6 months before your intended course intake.',
      category: 'Study Visa'
    },
    {
      question: 'Can BMS Immigration help me if my visa application has already been refused?',
      answer: 'Yes! Refusal cases are one of our core specialties. We order and analyze official consular GCMS/ATIP notes, identify the exact refusal reasons (such as lack of home ties or financial doubts), draft a persuasive legal explanation letter, and rebuild your file with fresh supporting evidence.',
      category: 'Refusal Cases'
    },
    {
      question: 'What is a Statement of Purpose (SOP) and why is it so critical?',
      answer: 'An SOP is your personal narrative submitted to the visa officer explaining your academic background, career goals, why you selected that specific university and destination country, and how your studies tie back to your future in your home country. A weak SOP is the #1 cause of visa refusals. We craft tailored, 100% human-drafted SOPs aligned with visa officer criteria.',
      category: 'Documentation'
    },
    {
      question: 'What services do you provide for applicants already inside Canada?',
      answer: 'We assist with Visitor Record extensions, Study Permit extensions, Post-Graduation Work Permits (PGWP), Spousal Open Work Permits (SOWP), status restoration if your visa expired within 90 days, and Express Entry / PNP consultation.',
      category: 'Inside Canada'
    },
    {
      question: 'How much funds do I need to show for an international study visa?',
      answer: 'This varies significantly by country. Generally, Canada requires 1 year of tuition plus the updated cost-of-living funds (CAD 20,635+). Australia and the UK require 1 year tuition plus living expenses in a liquid bank account for at least 28 days. Our counselors provide a personalized fund calculation and affidavit template.',
      category: 'Financials'
    },
    {
      question: 'Are initial consultations free?',
      answer: 'Yes! We offer a 100% free initial profile assessment where our senior counselors review your academic scores, language proficiency test (IELTS, PTE, TOEFL, Duolingo), and immigration goals to recommend the best countries and visa pathways.',
      category: 'General'
    }
  ],

  // Navigation Links
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { 
      label: 'Services', 
      path: '/services',
      hasMegaMenu: true,
    },
    { label: 'Countries', path: '/countries' },
    { label: 'Process', path: '/process' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Us', path: '/contact' }
  ],

  // Quick Action CTAs
  cta: {
    title: 'Ready to Start Your Global Journey?',
    subtitle: 'Connect with our expert immigration consultants and take the first step towards your international education and career goals with confidence.',
    primaryBtn: 'Schedule Free Counseling',
    secondaryBtn: 'Explore Our Services',
    callNow: 'Call Us Directly: +91 72066 58047',
    whatsappText: 'Instant WhatsApp Assessment'
  }
};
