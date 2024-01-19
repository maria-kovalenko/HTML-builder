const path = require('path');
const fs = require('fs');
const pathToTxt = path.join(__dirname, 'text.txt');

const stream = fs.ReadStream(pathToTxt, 'utf8');

stream.on('data', (data) => process.stdout.write(data));
