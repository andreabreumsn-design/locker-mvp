const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'ui')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// FIDO2 endpoint
app.post('/api/fido2/register', (req, res) => {
  res.json({ success: true, message: 'FIDO2 registration initiated' });
});

app.post('/api/fido2/authenticate', (req, res) => {
  res.json({ success: true, message: 'FIDO2 authentication completed' });
});

// OSINT endpoint
app.post('/api/osint/search', (req, res) => {
  const { query } = req.body;
  res.json({ success: true, results: [], query });
});

// CNPJ validation endpoint
app.post('/api/cnpj/validate', (req, res) => {
  const { cnpj } = req.body;
  res.json({ success: true, valid: true, cnpj });
});

// Default route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Locker MVP server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
