const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

async function readMailist(file) {
  return new Promise((resolve, reject) => {
    let inputStream = Fs.createReadStream(file, 'utf8');
    let mails = [];

    inputStream
      .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
      .on('data', function (row) {
        mails.push(row);
      })
      .on('end', function () { 
        resolve(mails); // Resolve the promise with the mails array
      })
      .on('error', function (error) {
        reject(error); // Reject the promise with the error
      });
  });
}

module.exports = { readMailist };
