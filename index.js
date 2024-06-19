// Import packages
const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send("ReverseSwish is running! 🚀");
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Endpoints

app.post("/mpc-swish/api/v4/initiatepayment", (req, res) => {
  res.status(200).send('{"autoStartToken":"0336631d-8a76-46a1-8b3a-f7b0f69aa257","result":"200","paymentID":"FBB1C98ACE8948AB82A21FCEEEAB02CF"}');
});

app.get("/mpc-swish/api/v1/blocks/", (req, res) => {
  res.status(200).send('{"time":"2024-06-19T13:38:01.122+00:00","block":[]}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/INCOMING/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":false,"item":[{"paymentDirection":"INCOMING","bankPaymentReference":"487C473DD65E4B3DAE82CB4676F56ED7","paymentChannel":"MPC","dateTime":"2024-06-07T14:50:25","amount":"1337.00","currency":"SEK","payerPayee":{"name":"REVSWISH SUPPORT","alias":"1337","businessName":null},"message":"","orderId":null,"paymentType":"P2P","birPaymentId":"1758997979994092","gift":null}],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/ALL/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":false,"item":[{"paymentDirection":"INCOMING","bankPaymentReference":"487C473DD65E4B3DAE82CB4676F56ED7","paymentChannel":"MPC","dateTime":"2024-06-07T14:50:25","amount":"1337.00","currency":"SEK","payerPayee":{"name":"REVSWISH SUPPORT","alias":"1337","businessName":null},"message":"","orderId":null,"paymentType":"P2P","birPaymentId":"1758997979994092","gift":null}],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v4/paymenthistory/100/OUTGOING/0/100/", (req, res) => {
  res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":false,"item":[{"paymentDirection":"OUTGOING","bankPaymentReference":"487C473DD65E4B3DAE82CB4676F56ED7","paymentChannel":"MPC","dateTime":"2024-06-07T14:50:25","amount":"1337.00","currency":"SEK","payerPayee":{"name":"REVSWISH SUPPORT","alias":"1337","businessName":null},"message":"","orderId":null,"paymentType":"P2P","birPaymentId":"1758997979994092","gift":null}],"autoStartToken":null}');
});

app.get("/mpc-swish/api/v1/paymentrequest/findByRoleAndState", (req, res) => {
  res.status(200).send('{"data":[{"id":"725aa193-3fe4-4594-8ae8-c977fd8b2ac6","state":"CONFIRMED","amount":"1.00","currency":"SEK","senderName":"LUNDELL EKLUND,OLIVER","senderAlias":"46706505038","receiverName":"EDVIN BLANK","receiverAlias":"46727131434","message":"","deniedMessage":null,"viewed":false,"initiatedAt":"2024-05-25T20:47:53.817Z","confirmedAt":"2024-05-25T20:47:53.862Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2024-05-25T20:47:53.862Z","expiredAt":"2024-07-24T20:47:53.862Z"},{"id":"a164e597-18c7-4ccf-921c-1fa86cf6ca1e","state":"CONFIRMED","amount":"1.00","currency":"SEK","senderName":"LUNDELL EKLUND,OLIVER","senderAlias":"46706505038","receiverName":"EDVIN BLANK","receiverAlias":"46727131434","message":"","deniedMessage":null,"viewed":false,"initiatedAt":"2024-05-25T20:47:53.708Z","confirmedAt":"2024-05-25T20:47:53.752Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2024-05-25T20:47:53.752Z","expiredAt":"2024-07-24T20:47:53.752Z"},{"id":"99bbf70b-e64d-49da-a131-b88dbe915138","state":"CONFIRMED","amount":"1.00","currency":"SEK","senderName":"LUNDELL EKLUND,OLIVER","senderAlias":"46706505038","receiverName":"EDVIN BLANK","receiverAlias":"46727131434","message":"","deniedMessage":null,"viewed":false,"initiatedAt":"2024-05-25T20:47:53.623Z","confirmedAt":"2024-05-25T20:47:53.673Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2024-05-25T20:47:53.673Z","expiredAt":"2024-07-24T20:47:53.673Z"},{"id":"7d37077a-c0a9-442c-9b3e-f7ec50a5b53a","state":"CONFIRMED","amount":"1.00","currency":"SEK","senderName":"LUNDELL EKLUND,OLIVER","senderAlias":"46706505038","receiverName":"EDVIN BLANK","receiverAlias":"46727131434","message":"","deniedMessage":null,"viewed":false,"initiatedAt":"2024-05-25T20:41:54.899Z","confirmedAt":"2024-05-25T20:42:00.183Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2024-05-25T20:42:00.183Z","expiredAt":"2024-07-24T20:42:00.183Z"}],"time":"2024-06-18T17:11:38.949+00:00"}');
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
  res.status(200).send('{"result":"200","deviceId":"9961741E269E4C149C3DEF394DDE8513","brandingId":"NDEASE","brandingVersion":"2","timeToLive":300000}');
});

app.post("/mpc-swish/api/v3/executepayment/:param1/:param2", (req, res) => {
  res.status(200).send('{"result":"200","amount":"1337.00","currency":"USD","message":"","timestamp":null,"bankPaymentReference":null,"payeeName":"Lunar","payeeBusinessName":null,"payeeAlias":"46727131434"}');
    
});

// Badgecount Endpoints
app.get("/mpc-swish/api/v2/badgecount/", (req, res) => {
  res.status(200).send('{"result":"200","payments":1337}');
});

app.get("/mpc-swish/api/v1/paymentrequest/badgecount", (req, res) => {
  res.status(200).send(
    '{"data":{"pprInfo":1337,"pprRequiresAction":0},"time":"2024-06-18T12:07:37.587+00:00"}',
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
      senderName: "John Doe",
      amount: "100.00",
      currency: "USD",
      receiverName: "Jane Smith",
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
