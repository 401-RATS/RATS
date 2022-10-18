'use strict';

const Chance = require('chance');
const chance = new Chance();
const { Producer } = require('sqs-producer');
const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/972392329703/vendorQueue',
  handleMessage: async (message) => {
    const order = JSON.parse(JSON.parse(message.Body).Message);
    console.log('\nImperilled in possession of rescue team: \n', order);
    setTimeout(async () => {
      const producer = Producer.create({
        queueUrl: 'https://sqs.us-west-2.amazonaws.com/972392329703/vendorQueue',
        region: 'us-west-2',
      });
      await producer.send({
        id: chance.guid(),
        body: JSON.stringify(order),
        MessageGroupId: 'first-responder',
      });
      console.log(`\nMessage from First Responder: \n -----> Delivered ${order.orderId}`);
    }, 5000);
  }, pollingWaitTimeMs: 10000,
});

app.start();
