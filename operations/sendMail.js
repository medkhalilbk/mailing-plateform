const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId:  process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-north-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
let sendEmail = (recipientEmail, name) => {
    return console.log(name)
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