'use strict';

const Chance = require('chance');
const chance = new Chance();
const { Producer } = require('sqs-producer');
const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/112727125534/responders',
  handleMessage: async (message) => {
    const distressCall = JSON.parse(JSON.parse(message.Body).Message);
    console.log('\nRescue mission received, mission in progress: \n', distressCall);
    setTimeout(async () => {
      const producer = Producer.create({
        queueUrl: 'https://sqs.us-east-2.amazonaws.com/112727125534/responders',
        region: 'us-east-2',
      });
      await producer.send({
        id: chance.guid(),
        body: JSON.stringify(distressCall),
        MessageGroupId: 'first-responders',
      });
      console.log(`\nRescue target transported to safety: \n -----> Delivered ${distressCall.name}`);
    }, 5000);
  }, pollingWaitTimeMs: 10000,
});

app.start();
