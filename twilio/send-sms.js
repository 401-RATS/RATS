const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

require('dotenv').config();

client.messages
  .create({
    body: 'Are you alive?',
    from: '<phone number>',
    to: '<phone number>',
  })
  .then(message => console.log(message.sid));
