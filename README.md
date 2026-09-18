# BMS Immigration - 3D Interactive Consultancy Platform

A complete, production-quality, responsive 3D immigration consultancy web application built for **BMS Immigration Services**.

---

## 🌟 Key Features

1. **Real-Time 3D Interactive Globe**:
   - Built with Three.js via `@react-three/fiber` and `@react-three/drei`.
   - Glowing particle continents with warm gold (`#D4A44A`) and electric blue (`#2F80ED`) shaders.
   - Dynamic curved bezier flight arcs connecting India HQ with Canada, the UK, USA, Australia, and Germany.
   - Interactive destination pins with live country tooltips.
   - Procedural 3D golden airplane orbiting along international trajectories.
   - 3D luxury gold-embossed passport.
   - Automatic 2D canvas fallback on mobile devices, low-power mode, or when users request reduced motion.

2. **Authentic Content & Single Source of Truth**:
   - All content lives in `src/data/site.js`.
   - 100% authentic data extracted directly from [bmsimmigration.in](https://www.bmsimmigration.in/):
     - Official Logo (`/src/assets/logo.png`)
     - Official service banners and country photography
     - Exact contact numbers: `+91 72066 58047`, `+91 85708 41652`, `+91 97299 29704`
     - Exact email addresses: `info.bmsimmigrations@gmail.com`, `admissionbmsimmigration@gmail.com`
     - Leadership team profiles for **Supriya Patel** (Managing Director) and **Sidharth** (Director & Co-Founder)
     - Full descriptions for all 6 core services (Study Visa, Tourist Visa, SOP & Documentation, Refusals, Inside Canada, Offer Letters)

3. **MERN Stack Architecture**:
   - **Frontend**: React 18 + Vite, React Router v6, Tailwind CSS, Framer Motion, GSAP, Lenis smooth scroll, Lucide icons.
   - **Backend**: Express API in `/server` providing `POST /api/contact` and `GET /api/health`.
   - **Lead Capture Channels**: Contact form posts to backend, plus direct WhatsApp (`wa.me/919729929704`) and mailto fallbacks.

4. **Multi-Page Experience**:
   - `/` - Immersive 3D landing page
   - `/about` - Company history since 2019, values, and leadership
   - `/services` - Comprehensive service directory & documents required
   - `/services/:slug` - Dedicated deep-dive for each of the 6 services
   - `/countries` - Global study & PR destinations catalog
   - `/countries/:slug` - Dedicated country guides for Canada, UK, USA, Australia, Germany
   - `/process` - 6-step visa roadmap
   - `/testimonials` - Filterable student & visitor reviews
   - `/faq` - Searchable knowledgebase
   - `/contact` - Direct telephone, leadership cards, and contact form
   - `*` - Branded 404 page

5. **SEO & Accessibility**:
   - `react-helmet-async` on every page with meta titles, descriptions, and OpenGraph tags.
   - Schema.org JSON-LD `ProfessionalService` structured data.
   - `robots.txt` and `sitemap.xml`.
   - Desktop-only custom cursor with hover detection, top scroll progress bar, and floating WhatsApp widget.

---

## 🚀 Quick Start & Running Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally (Concurrent Client & Server)
```bash
npm run dev
```
This launches:
- **Express Server**: `http://localhost:5000`
- **Vite Frontend**: `http://localhost:5173`

### 3. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
bmsimmigration/
├── package.json               # Root scripts & dependencies
├── vite.config.js             # Vite configuration with /api proxy
├── tailwind.config.js         # Theme color palette and font settings
├── postcss.config.js          # PostCSS configuration
├── index.html                 # Main HTML template with Google Fonts
├── .env.example               # Environment variables example
├── README.md                  # Documentation and setup instructions
├── public/
│   ├── robots.txt             # Search engine crawling rules
│   └── sitemap.xml            # XML sitemap for SEO
├── server/
│   └── index.js               # Express backend API (POST /api/contact)
└── src/
    ├── assets/
    │   ├── logo.png           # Official BMS Immigration high-res logo
    │   └── images/            # Authentic service & country images
    ├── components/
    │   ├── 3d/
    │   │   ├── GlobeCanvas.jsx        # Three.js 3D Globe with arcs & pins
    │   │   ├── FloatingAirplane.jsx   # 3D jet orbiting globe
    │   │   ├── FloatingPassport.jsx   # 3D luxury passport
    │   │   ├── ScrollStory3D.jsx      # Immigration lifecycle pathway
    │   │   ├── CanvasLoader.jsx       # Branded Three.js loader
    │   │   └── Globe2DFallback.jsx    # Responsive 2D fallback
    │   ├── common/
    │   │   ├── ScrollProgressBar.jsx  # Top progress bar
    │   │   ├── FloatingWhatsApp.jsx   # WhatsApp quick chat launcher
    │   │   ├── StickyBookingCTA.jsx   # Sticky assessment bar
    │   │   ├── TiltCard.jsx           # 3D perspective hover tilt
    │   │   ├── StatCounter.jsx        # Animated stats counter
    │   │   └── SEO.jsx                # React Helmet async + JSON-LD
    │   ├── forms/
    │   │   ├── ContactForm.jsx        # Full contact form with fallbacks
    │   │   └── EligibilityModal.jsx   # Quick 60-second assessment modal
    │   ├── layout/
    │   │   ├── Navbar.jsx             # Sticky glassmorphic navbar + mega-menu
    │   │   ├── Footer.jsx             # Comprehensive footer
    │   │   └── Layout.jsx             # Shell with Lenis smooth scroll
    │   └── sections/
    │       ├── HeroSection.jsx        # 3D Hero section
    │       ├── ServicesGrid.jsx       # 6 services cards
    │       ├── CountriesSection.jsx   # Top destinations showcase
    │       ├── WhyChooseUs.jsx        # 3 pillars + consultation showcase
    │       ├── ProcessTimeline.jsx    # 6-step visa roadmap
    │       ├── Testimonials3D.jsx     # Student reviews carousel
    │       ├── DocumentsSection.jsx   # Academic & financial checklist
    │       ├── LeadershipSection.jsx  # Supriya Patel & Sidharth profiles
    │       ├── FAQAccordion.jsx       # Filterable FAQ accordion
    │       └── CTASection.jsx         # Global journey conversion banner
    ├── data/
    │   └── site.js                    # Single source of truth for all content
    ├── hooks/
    │   └── useReducedMotion.js        # Reduced motion & mobile detection
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── AboutPage.jsx
    │   ├── ServicesPage.jsx
    │   ├── ServiceDetailPage.jsx
    │   ├── CountriesPage.jsx
    │   ├── CountryDetailPage.jsx
    │   ├── ProcessPage.jsx
    │   ├── TestimonialsPage.jsx
    │   ├── FAQPage.jsx
    │   ├── ContactPage.jsx
    │   └── NotFoundPage.jsx
    ├── styles/
    │   └── index.css                  # Custom utilities & Tailwind
    ├── App.jsx                        # Application routes
    └── main.jsx                       # Entry point
```

---

## 📋 Asset & Content Customization Checklist

If you ever wish to replace or update brand materials:

| Item | Location | Notes |
|---|---|---|
| **Logo** | `/src/assets/logo.png` | PNG format with transparent background (currently authentic BMS logo). |
| **Service Images** | `/src/assets/images/` | `study-visa.jpg`, `tourist-visa.avif`, `sop-documentation.avif`, `refusal-cases.avif`, `inside-canada.avif`, `offer-letter.avif`. |
| **Country Images** | `/src/assets/images/` | `country-canada.png`, `country-uk.png`, `country-usa.png`, `country-australia.png`. |
| **Company Info** | `/src/data/site.js` | Update `company.name`, `company.phones`, `company.emails`, `company.whatsappLink`, `company.workingHours`. |
| **Services Content** | `/src/data/site.js` | Modify `services` array items (`title`, `description`, `features`, `deliverables`, `metric`). |
| **Countries Content** | `/src/data/site.js` | Modify `countries` array items (`quickFacts`, `highlights`, `popularInstitutions`). |
| **Leadership Profiles** | `/src/data/site.js` | Update `leadership` array (names, direct phone numbers, email addresses). |
| **Testimonials** | `/src/data/site.js` | Add or update client reviews in `testimonials` array. |
| **FAQs** | `/src/data/site.js` | Add questions & answers in `faqs` array. |
