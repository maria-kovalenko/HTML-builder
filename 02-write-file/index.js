const { stdin, stdout } = process;
const fs = require('fs');
const output = fs.createWriteStream('02-write-file/02-write-file.txt');

stdout.write('Hello! Enter any text...\n');
stdin.on('data', (data) => {
  let dataString = data.toString();
  if (dataString.includes('exit')) {
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', function () {
  stdout.write('Goodbye!');
  process.exit();
});
process.on('exit', () => stdout.write('Goodbye!'));
