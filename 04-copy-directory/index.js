const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'files');
const pathToFile = path.join(__dirname, 'files-copy');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      fs.stat(pathToFile, function (err) {
        if (!err) {
          console.log('Директория есть');
          fs.rm(pathToFile, { recursive: true }, (err) => {
            if (err) throw err; // не удалось удалить папку
            console.log('Папка успешно удалена');
          });
          fs.mkdir(pathToFile, (err) => {
            if (err) {
              return console.error(err);
            }
            console.log('Directory created successfully!');
          });
          fs.copyFile(
            pathToFolder + '\\' + file.name,
            pathToFile + '\\' + file.name,
            fs.constants.COPYFILE_EXCL,
            (err) => {
              if (err) {
                console.log('Error Found:', err);
              }
            },
          );
        } else if (err.code === 'ENOENT') {
          console.log('директории нет');
          fs.mkdir(pathToFile, (err) => {
            if (err) {
              return console.error(err);
            }
            console.log('Directory created successfully!');
          });

          fs.copyFile(
            pathToFolder + '\\' + file.name,
            pathToFile + '\\' + file.name,
            fs.constants.COPYFILE_EXCL,
            (err) => {
              if (err) {
                console.log('Error Found:', err);
              } else {
                console.log('ok');
              }
            },
          );
        }
      });
    });
  }
});
