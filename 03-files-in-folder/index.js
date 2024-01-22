let fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      const extname = path.extname(file.name);
      const pathToFile = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(pathToFile, (err, stats) => {
        if (err) {
          console.error(err);
        }
        console.log(
          `${file.name.split('.')[0]} - ${extname.slice(1)} - ${stats.size}`,
        );
      });
    });
  }
});
