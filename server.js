const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Glad you are safe.');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

  // res.type('text/xml').send(twiml.toString());
});

// app.listen(3000, () => {
//   console.log('Express server listening on port 3000');
// });

http.createServer(app).listen(3000, () => {
  console.log('listening on port 3000');
});