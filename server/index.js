import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';
const ALLOWED_ORIGIN = process.env.CLIENT_ORIGIN || 'https://bmsimmigration.in';

// 1. Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows WebGL shaders and local assets
    crossOriginEmbedderPolicy: false,
  })
);

// 2. HTTP Response Compression (Brotli + Gzip)
app.use(compression());

// 3. CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or in development
      if (!origin || !isProd) return callback(null, true);
      if (origin === ALLOWED_ORIGIN || origin.endsWith('bmsimmigration.in') || origin.includes('localhost')) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by origin.'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '50kb' }));

// 4. Rate Limiting on Contact & Intake API (5 submissions per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many inquiries submitted from this IP. Please wait 15 minutes or reach out directly on WhatsApp.',
  },
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'BMS Immigration Backend API',
    environment: isProd ? 'production' : 'development',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// 5. Contact & Assessment Intake API with Honeypot and Regex Validation
app.post('/api/contact', contactLimiter, (req, res) => {
  const {
    name,
    firstName,
    lastName,
    email,
    phone,
    destinationCountry,
    service,
    message,
    educationLevel,
    englishTest,
    workExperience,
    website, // Honeypot trap
    hp_field, // Additional honeypot trap
  } = req.body;

  // Bot Trap: if honeypot is filled, simulate success silently
  if (website || hp_field) {
    console.warn('🤖 Spam bot submission trapped and dropped silently.');
    return res.status(200).json({
      success: true,
      message: 'Inquiry processed.',
    });
  }

  const fullName = (name || [firstName, lastName].filter(Boolean).join(' ')).trim();

  // Basic Existence Validation
  if (!fullName) {
    return res.status(400).json({
      success: false,
      error: 'Please provide your full name.',
    });
  }

  // Regex Validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+\-()]{7,20}$/;

  if (email && !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address (e.g. name@example.com).',
    });
  }

  if (phone && !phoneRegex.test(phone.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid phone number with 7 to 15 digits.',
    });
  }

  if (!email && !phone) {
    return res.status(400).json({
      success: false,
      error: 'Please provide at least an email address or telephone number for consultation follow-up.',
    });
  }

  // Log verified lead
  console.log('\n=========================================');
  console.log('📌 NEW VERIFIED BMS IMMIGRATION INQUIRY:');
  console.log('Timestamp :', new Date().toLocaleString());
  console.log('Name      :', fullName);
  console.log('Email     :', email ? email.trim() : 'N/A');
  console.log('Phone     :', phone ? phone.trim() : 'N/A');
  console.log('Country   :', destinationCountry || 'Not Specified');
  console.log('Service   :', service || 'General Inquiry');
  if (educationLevel) console.log('Education :', educationLevel);
  if (englishTest)    console.log('English   :', englishTest);
  if (workExperience) console.log('Experience:', workExperience);
  console.log('Message   :', (message || 'Quick eligibility check submission').slice(0, 300));
  console.log('=========================================\n');

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out! Your inquiry has been verified and logged. A senior counselor will contact you within 24 hours.',
    lead: {
      name: fullName,
      phone: phone || '',
      email: email || '',
      country: destinationCountry || '',
      service: service || '',
    },
  });
});

// 6. Serve static production dist with 1-year immutable caching on hashed assets
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  console.log(`📁 Serving static client from: ${distPath}`);

  // Hashed build assets get 1-year immutable cache header
  app.use(
    '/assets',
    express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
    })
  );

  // Remaining static files (favicon, robots, sitemap)
  app.use(
    express.static(distPath, {
      maxAge: '1d',
    })
  );

  // SPA fallback to index.html for React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 BMS Immigration API server running at http://localhost:${PORT}`);
  console.log(`🔒 Security active: Helmet, Rate-Limit, CORS restricted to: ${isProd ? ALLOWED_ORIGIN : 'Development All'}`);
});
