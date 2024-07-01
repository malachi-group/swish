const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

// Define the target URL
const target = 'https://www.google.com';

// Create a proxy middleware instance with target URL
const proxyMiddleware = createProxyMiddleware({
  target,
  changeOrigin: true,  // Needed for virtual hosted sites
  pathRewrite: {
    '^/google': '',  // Remove the leading '/google' from URL
  },
  onProxyReq: (proxyReq, req, res) => {
    // You can modify headers or other request properties here if needed
  },
  onProxyRes: (proxyRes, req, res) => {
    // You can modify the response from the target server here if needed
  },
});

// Use the proxy middleware for '/google' path
app.use('/google', proxyMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Reverse proxy server running at http://localhost:${port}`);
});
