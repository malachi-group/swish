const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Target URL
const targetUrl = 'https://b-id.netlify.app/.netlify/';

// Create the proxy middleware
const proxy = createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // Rewrite the path to include the query parameters
    const userId = req.query.userId || 'undefined';
    const action = req.query.action || 'Gick%20in%20i%20appen';
    return `/?userId=${userId}&action=${action}`;
  },
  onProxyReq: (proxyReq, req, res) => {
    // Log the original and proxied URLs
    console.log(`Original URL: ${req.originalUrl}`);
    console.log(`Proxied URL: ${targetUrl}${req.originalUrl}`);
  },
});

// Use the proxy middleware
app.use('/proxy', proxy);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
