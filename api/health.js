export default function handler(req, res) {
  res.status(200).json({
    status: 'online',
    service: 'BMS Immigration Serverless API',
    timestamp: new Date().toISOString(),
  });
}
