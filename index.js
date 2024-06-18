// Import packages
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("ReverseSwish is running! 🚀");
});

// ExecutePayment Endpoint

app.post("/mpc-swish/api/v3/initiateactivation/:param1/:param2", (req, res) => {
  res.send('{"result":"UNKW","message":"Välkommen till RevSwish!"}');
});

app.post("/mpc-swish/api/v3/executepayment/", (req, res) => {
  res.send('{"result":"AM04","message":"ReverseSwish test message!"}');
});

// Badgecount Endpoints
app.get("/mpc-swish/api/v2/badgecount/", (req, res) => {
  res.send('{"result":"200","payments":1337}');
});

app.get("/mpc-swish/api/v1/paymentrequest/badgecount", (req, res) => {
  res.send(
    '{"data":{"pprInfo":1337,"pprRequiresAction":0},"time":"2024-06-18T12:07:37.587+00:00"}',
  );
});

// Consents Endpoint
app.get("/mpc-swish/consents/v1/detailed-notifications/info", (req, res) => {
  res.send(
    '{"requestReference":"028C557A57064DBC80810213A6320561","devicePublicKey":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0KzjRPBgtWPFpHYjLE9HK4gfwYXnKpkuL3mNUXgjJvzUTZdBSgV9f2T5cEbiPLQcgifGymtfdjZ4Gt9syoHsqaDIbxjx0bd05T4h26gQtNEfGuhFy6uXMvgKP3PFP5paYzKUJHi+yTFlaSZnKEUrlCu5D2kOqTz6cv5NISUJH0u1H7kesckhdQT7cfEPNdjYnbImrXLZ9P3+3E0UxApEmztwm0lDCHFS0tjgX2Yh4hjxx/tCCk1BMu/HXdYne66DzkOmv63YeAXrR+3VluhgCsj5j576UK6lWgEunsV8/QV0HzjXM/ne2IEsbuceITdSKgcxPfvVW79JafdK0BipWwIDAQAB","version":"2i","optInDate":"2024-06-18T12:07:23.164+00:00","validDays":90}',
  );
});

// PaymentRequest Endpoints
app.get("/mpc-swish/api/v1/paymentrequest/viewSetting", (req, res) => {
  res.send(
    '{"data":{"privatePaymentRequest":true,"requireParentalConsent":false},"time":"2024-05-23T17:08:25.261+00:00"}',
  );
});

app.get("/mpc-swish/api/v3/paymentrequest/ecom/check/0", (req, res) => {
  res.send(
    '{"result":"200","checkInfo":{"status":"NOT_FOUND","mechanism":"longpolling","clientTimeOut":25,"secondsUntilNextRequest":3}}',
  );
});
app.get("/mpc-swish/api/v3/paymentrequest/ecom/check/1", (req, res) => {
  res.send(
    '{"result":"200","checkInfo":{"status":"NOT_FOUND","mechanism":"longpolling","clientTimeOut":25,"secondsUntilNextRequest":3}}',
  );
});

app.get("/mpc-swish/api/v3/paymentrequest/ecom/check/2", (req, res) => {
  res.send(
    '{"result":"200","checkInfo":{"status":"NOT_FOUND","mechanism":"longpolling","clientTimeOut":25,"secondsUntilNextRequest":3}}',
  );
});

app.get("/mpc-swish/api/v3/paymentrequest/ecom/check/3", (req, res) => {
  res.send(
    '{"result":"200","checkInfo":{"status":"NOT_FOUND","mechanism":"longpolling","clientTimeOut":25,"secondsUntilNextRequest":3}}',
  );
});
app.listen(3000, () => {
  console.log("ReverseSwish is running on port 3000!");
});
;
