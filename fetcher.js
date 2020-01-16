const request = require('request');
const fs = require('fs');
let arg = process.argv;
let info = arg.slice(2);
const webAddress = info[0];
const fileToWrite = info[1]

const fetcher = function (address, file, callback) {
  request(address, (error, response, body) => {
    if (!!error) console.log('error:', error);
    else if (!fs.existsSync(file)) console.log('ERROR: Invalid file path');
    else fs.writeFile(file, body, callback);
  });
}

const callback = function() {
  const stats = fs.statSync(fileToWrite);
  const sizeInBytes = stats.size;

  console.log(`Downloaded and saved ${sizeInBytes} Bytes to ${fileToWrite}`);
}

fetcher(webAddress, fileToWrite, callback);