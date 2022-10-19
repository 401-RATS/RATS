'use strict';

const Chance = require('chance');
const chance = new Chance();
const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const sns = new AWS.SNS();
// const date = new Date();
// const time = date.toTimeString();

setInterval(() => {
  const distressCall = {
    name: chance.name(),
    phoneNumber: chance.phone(),
    Lat: chance.latitude(),
    Lon: chance.longitude(),
    Emergency: chance.pickone(['lost', 'injured', 'trapped', 'threatened', 'missed return window']),
    injurySeverity: chance.integer({ min: 1, max: 3 }),
    partySize: chance.integer({ min: 1, max: 6 }),
  };

  const payload = {
    Message: JSON.stringify(distressCall),
    TopicArn: 'arn:aws:sns:us-east-2:112727125534:Dispatch',
  };
  sns.publish(payload).promise().then(result => {
    console.log('\nDistress signal received \n ----->', payload.Message),
    console.log('\nRescue mission approved \n ----->', distressCall);
  })
    .catch(err => console.error(err.message));
}, 20000);

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/112727125534/responders',
  handleMessage: async(message) => console.log('\nFirst responders have returned safely with: \n ----->', message.Body.slice(1,55)),
  pollingWaitTimeMs: 10000,
});

app.start();
