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
  async function sendDiscordWebhook(message) {
    try {
      await axios.post(DISCORD_WEBHOOK_URL, { content: message });
      console.log("Webhook sent successfully");
    } catch (error) {
      console.error("Error sending webhook:", error);
    }
  }
  
  // Middleware to send Discord webhook for every request
  app.use((req, res, next) => {
    const message = `Request received: ${req.method} ${req.url} | Payload: ${JSON.stringify(req.body)}`;
    console.log("Sending webhook:", message);
    sendDiscordWebhook(message);
    res.setHeader('Content-Type', 'application/json');
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
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":{"themeId":"sallad1"},"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"}],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/ALL/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":{"themeId":"sallad1"},"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"}],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/OUTGOING/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":{"themeId":"sallad1"},"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"}],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v1/paymentrequest/findByRoleAndState", (req, res) => {
  res.status(200).send('{ "result": "200", "favorites": [{ "alias": "4670000000", "nickname": "John Appleseed" },{ "alias": "4670000001", "nickname": "Kate Bell" },{ "alias": "4670000002", "nickname": "David Taylor" },{ "alias": "4670000003", "nickname": "Anna Haro" },{ "alias": "4670000004", "nickname": "Daniel Higgins Jr." }] }');
});

app.get("/mpc-swish/api/v2/validation/", (req, res) => {
  res.status(200).send('{"result":"200","brandingId":"NDEASE","brandingVersion":"2","timeToLive":300000,"pushMessageCount":0}');
});

app.get("/apputils-swish/api/v1/favorite", (req, res) => {
  res.status(200).send('{"result":"200","favorites":[{"alias":"12312312312","nickname":"RevSwish Support"}]}');
});

// ExecutePayment Endpoint

app.post("/mpc-swish/api/v3/initiateactivation/:param1/:param2", (req, res) => {
  res.status(200).send('{"result":"200","autoStartToken":"9e83a6c0-d8bb-428b-b99b-3a59340c57c7"}');
});

app.post("/mpc-swish/api/v3/executeactivation/", (req, res) => {
  res.status(200).send('{"result":"200","deviceId":"DEADBEEF","brandingId":"NDEASE","brandingVersion":"2","timeToLive":300000}');
});

app.post("/mpc-swish/api/v3/executepayment/:param1/:param2", (req, res) => {
    res.status(200).json('{"result":"200","amount":"1.00","currency":"USD","payeeName":"TEST USER","payeeBusinessName":null}');
});

// Badgecount Endpoints
app.get("/mpc-swish/api/v2/badgecount/", (req, res) => {
  res.status(200).send('{"result":"200","payments":1}');
});

app.get("/mpc-swish/api/v1/paymentrequest/badgecount", (req, res) => {
  res.status(200).send(
    '{"data":{"pprInfo":1,"pprRequiresAction":0},"time":"2024-06-18T12:07:37.587+00:00"}',
  );
});

// Consents Endpoint
app.get("/mpc-swish/consents/v1/detailed-notifications/info", (req, res) => {
  res.status(200).send(
    '{"requestReference":"028C557A57064DBC80810213A6320561","devicePublicKey":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0KzjRPBgtWPFpHYjLE9HK4gfwYXnKpkuL3mNUXgjJvzUTZdBSgV9f2T5cEbiPLQcgifGymtfdjZ4Gt9syoHsqaDIbxjx0bd05T4h26gQtNEfGuhFy6uXMvgKP3PFP5paYzKUJHi+yTFlaSZnKEUrlCu5D2kOqTz6cv5NISUJH0u1H7kesckhdQT7cfEPNdjYnbImrXLZ9P3+3E0UxApEmztwm0lDCHFS0tjgX2Yh4hjxx/tCCk1BMu/HXdYne66DzkOmv63YeAXrR+3VluhgCsj5j576UK6lWgEunsV8/QV0HzjXM/ne2IEsbuceITdSKgcxPfvVW79JafdK0BipWwIDAQAB","version":"2i","optInDate":"2024-06-18T12:07:23.164+00:00","validDays":90}',
  );
});
// PaymentRequest Endpoints
app.get("/mpc-swish/api/v1/paymentrequest/viewSetting", (req, res) => {
  res.status(200).send(
    '{"data":{"privatePaymentRequest":true,"requireParentalConsent":false},"time":"2024-05-23T17:08:25.261+00:00"}',
  );
});
// Endpoint for initiating payment requests
let userID = 0;

// Endpoint for initiating payment requests
app.post("/mpc-swish/api/v1/paymentrequest/initiatePaymentRequest", (req, res) => {
  // Increment the id for each request
  userID++;

  // Prepare the response JSON
  const responseData = {
    data: {
      id: `${userID}`, // Generating an ID with a prefix and the incremented number
      state: "completed",
      senderName: "Test",
      amount: "100.00",
      currency: "USD",
      receiverName: "Test",
      initiatedAt: "2024-06-19T12:00:00Z",
      updatedAt: "2024-06-19T12:05:00Z"
    },
    time: "2024-06-19T12:05:30Z"
  };

  // Send the response with incremented id
  res.status(200).json(responseData);
});

app.get("/mpc-swish/api/v3/paymentrequest/ecom/check/:num", (req, res) => {
  res.status(200).send(
    '{"result":"200","checkInfo":{"status":"NOT_FOUND","mechanism":"longpolling","clientTimeOut":25,"secondsUntilNextRequest":3}}',
  );
});


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); // Passes control to the error handling middleware
});

// Error handling middleware for 404 errors
app.use((err, req, res, next) => {
  if (err.status === 404) {
      res.status(200).send(
    '{"result":"200","message":null}',
  );
  } else {
    next(err); // Passes control to the default error handler for other errors
  }
});

app.listen(3000, () => {
  console.log("ReverseSwish is running on port 3000!");
});
;