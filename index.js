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
    [`^/swish-proxy`]: '', // Remove /swish-proxy from the URL path
  },
  // Additional options can be added here as needed
});

// Use the proxy middleware with a specific path
app.use('/swish-proxy', swishProxy);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reverse proxy server running on port ${PORT}`);
});
