const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define proxy middleware options
const proxyOptions = {
  target: 'https://mpc.getswish.net',  // target host
  changeOrigin: true,  // needed for virtual hosted sites
  pathRewrite: {
    '^/api/swish': '',  // remove base path
  },
};

// Create the proxy
const proxy = createProxyMiddleware('/api/swish', proxyOptions);

// Use the proxy middleware
app.use('/api/swish', proxy);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reverse proxy server listening on port ${PORT}`);
});
