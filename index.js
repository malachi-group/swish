const http = require('http');
const https = require('https');
const { createServer, IncomingMessage, ServerResponse } = http;

const TARGET_HOST = 'mpc.getswish.net';
const TARGET_PORT = 443; // Swish API typically uses HTTPS on port 443

// Create an HTTP server to handle incoming requests
const server = createServer((req, res) => {
  // Prepare options for the proxy request
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  // Make a proxy request to the target server
  const proxyReq = https.request(options, (proxyRes) => {
    // Set the response headers from the target server
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    // Pipe the response from the target server back to the original client
    proxyRes.pipe(res, { end: true });
  });

  // Handle errors from the proxy request
  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.statusCode = 500;
    res.end('Proxy request failed');
  });

  // Pipe the request body (if any) to the proxy request
  req.pipe(proxyReq, { end: true });
});

// Start the server listening on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Reverse proxy server listening on port ${PORT}`);
});
