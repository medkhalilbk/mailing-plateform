const fs = require('fs');
const path = require('path');

function readSingleFile(filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join("uploads", filename);
    fs.readFile(filePath+".csv", 'utf8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}
function getEmailArray(emailString) {
  const emailArray = emailString.split('\n').map(email => email.trim().replace(',',"") );
  return emailArray;
}

module.exports = { readSingleFile, getEmailArray };
