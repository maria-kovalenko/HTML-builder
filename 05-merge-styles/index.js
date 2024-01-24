const fs = require('fs');
const path = require('path');

const styles = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(dist);

fs.readdir(styles, { withFileTypes: true }, (err, files) => {
  if (err) return;

  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      const filePath = path.join(styles, files[i].name);
      if (path.extname(filePath).slice(1) !== 'css') return;
      const readableStream = fs.createReadStream(filePath);
      readableStream.on('data', function (chunk) {
        writeStream.write(chunk);
      });
    }
  }
});
