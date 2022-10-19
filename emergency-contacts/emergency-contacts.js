'use strict';

const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const sns = new AWS.SNS();
const distressCall = require(setInterval.distressCall);


setInterval(() => {
  const emergencyContactMessage = {

    Notice: 'This is a message from the RATS Emergency Dispatch System. You have been listed as an emergency contact and requested to be notified in the event of your loved one missing the return window of their planned trip. Please contact the dispatch office immediately to receive more details.',

    name: distressCall.name,

    Emergency: distressCall.Emergency,

    Contact: '555-555-5555, rescueallthestranded@nps.gov',
  };

  const payload = {
    Message: JSON.stringify(emergencyContactMessage),
    TopicArn: 'arn:aws:sns:us-east-2:112727125534:EmergencyContacts',
  };
  sns.publish(payload).promise().then(result => {
    console.log('\nEmergency Contacts notified \n ----->', payload.Message);
  })
    .catch(err => console.error(err.message));
}, 20000);

