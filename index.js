const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define the target host for the proxy
const TARGET_HOST = 'mpc.getswish.net';

// Create a proxy middleware instance with options
const swishProxy = createProxyMiddleware({
  target: `https://${TARGET_HOST}`,
  changeOrigin: true, // Required for virtual hosted sites
  secure: true, // Ensure SSL certificate verification (recommended for production)
  headers: {
    // Add any headers you need to pass to the target server
    // Example: 'Authorization': 'Bearer <your_token>'
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  },
});

// Use the proxy middleware with a specific path
app.use('/', swishProxy);

// Export the Express app as a serverless function
module.exports = app;
