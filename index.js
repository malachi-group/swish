const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define the target host for the proxy
const TARGET_HOST = 'mpc.getswish.net';

// Create a proxy middleware instance with options
const swishProxy = createProxyMiddleware({
  target: `https://${TARGET_HOST}`,
  changeOrigin: true, // Required for virtual hosted sites
  secure: false, // Disables SSL certificate verification (useful for development)
  pathRewrite: {
    [`^/api`]: '', // Remove /api from the URL path (adjust as needed)
  },
  // Additional options can be added here as needed
});

// Use the proxy middleware with a specific path
app.use('/api', swishProxy);

// Export the Express app as a handler function for Vercel
module.exports = app;
