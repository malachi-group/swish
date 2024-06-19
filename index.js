const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Middleware to set JSON content type for all responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Discord webhook URL (replace with your actual webhook URL)
const webhookUrl = "https://discord.com/api/webhooks/1252955031750311946/M9E0m6o7hH7K9TyQhimNOn3HECIw7k_PS6v3bfpnQoGBWHQZU7ZgO1TaWEGATcarOjyo";

// Middleware to send request details to Discord webhook
app.use((req, res, next) => {
  const requestData = {
    content: `New request received:\nMethod: ${req.method}\nURL: ${req.originalUrl}\nTimestamp: ${new Date().toISOString()}`,
    username: "ReverseSwish Bot",
    avatar_url: "https://example.com/avatar.png" // Optional avatar image URL
  };

  // Sending data to Discord webhook
  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('Request data sent to Discord webhook successfully!');
  })
  .catch(error => {
    console.error('Error sending request data to Discord webhook:', error);
  });

  next();
});

// Example endpoint
app.get("/", (req, res) => {
  res.send("ReverseSwish is running! 🚀");
});

// Example endpoint with JSON response
app.get("/example", (req, res) => {
  res.status(200).json({ message: "This is an example endpoint" });
});

// 404 Error handling middleware
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err); // Passes control to the error handling middleware
});

// Error handling middleware for 404 errors
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({ error: "Not Found" });
  } else {
    next(err); // Passes control to the default error handler for other errors
  }
});

// Start server
app.listen(3000, () => {
  console.log("ReverseSwish is running on port 3000!");
});
