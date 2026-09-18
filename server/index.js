import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'BMS Immigration Backend API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Contact & Assessment Intake
app.post('/api/contact', (req, res) => {
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
    workExperience
  } = req.body;

  const fullName = name || [firstName, lastName].filter(Boolean).join(' ');

  // Validation
  if (!fullName || (!email && !phone)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide your full name and at least an email or phone number.'
    });
  }

  // Log to server console
  console.log('\n=========================================');
  console.log('📌 NEW BMS IMMIGRATION INQUIRY RECEIVED:');
  console.log('Timestamp :', new Date().toLocaleString());
  console.log('Name      :', fullName);
  console.log('Email     :', email || 'N/A');
  console.log('Phone     :', phone || 'N/A');
  console.log('Country   :', destinationCountry || 'Not Specified');
  console.log('Service   :', service || 'General Inquiry');
  if (educationLevel) console.log('Education :', educationLevel);
  if (englishTest)    console.log('English   :', englishTest);
  if (workExperience) console.log('Experience:', workExperience);
  console.log('Message   :', message || 'Quick eligibility check submission');
  console.log('=========================================\n');

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out! Your inquiry has been logged. A senior counselor will contact you within 24 hours.',
    lead: {
      name: fullName,
      phone: phone || '',
      email: email || '',
      country: destinationCountry || '',
      service: service || ''
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BMS Immigration API server running at http://localhost:${PORT}`);
});
