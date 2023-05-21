const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: 'AKIAYHYEOLTUO343F7W7',
    secretAccessKey: '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',
    region: 'us-west-2',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
let sendEmail = (recipientEmail, name) => {
    let params = {
      Source: "noreply@ussps-delivery.support",
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'This is the body of my email!',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
}; 
module.exports = {
    sendEmail   
  };