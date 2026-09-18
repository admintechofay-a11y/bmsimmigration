import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteData } from '../../data/site';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
}) {
  const defaultTitle = `${siteData.company.name} | Study Visa & Immigration Solutions`;
  const pageTitle = title ? `${title} | ${siteData.company.shortName}` : defaultTitle;
  const pageDescription = description || siteData.company.subtitle;
  const defaultKeywords = 'BMS Immigration, study visa assistance, tourist visa, visitor visa, SOP documentation, refusal case support, inside Canada application, offer letter assistance, immigration consultancy';
  const pageKeywords = keywords || defaultKeywords;
  const siteUrl = 'https://bmsimmigration.in';
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImage = ogImage || `${siteUrl}/logo.png`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': siteData.company.name,
    'alternateName': siteData.company.shortName,
    'url': siteUrl,
    'logo': `${siteUrl}/logo.png`,
    'image': fullOgImage,
    'description': pageDescription,
    'telephone': siteData.company.phonePrimary,
    'email': siteData.company.emailPrimary,
    'priceRange': '$$',
    'openingHours': 'Mo-Sa 09:00-18:00',
    'sameAs': [
      siteData.company.socials.facebook,
      siteData.company.socials.instagram,
      siteData.company.socials.linkedin
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={fullOgImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
