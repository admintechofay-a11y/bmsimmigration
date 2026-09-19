export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

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
    website,
    hp_field,
  } = req.body || {};

  // Bot Trap
  if (website || hp_field) {
    return res.status(200).json({ success: true, message: 'Inquiry processed.' });
  }

  const fullName = (name || [firstName, lastName].filter(Boolean).join(' ')).trim();

  if (!fullName) {
    return res.status(400).json({ success: false, error: 'Please provide your full name.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+\-()]{7,20}$/;

  if (email && !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  if (phone && !phoneRegex.test(phone.trim())) {
    return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
  }

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out to BMS Immigration. Our senior counselors will contact you within 24 hours.',
  });
}
