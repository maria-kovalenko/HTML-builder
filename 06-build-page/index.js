const fs = require('fs');
const path = require('path');

const styles = path.join(__dirname, 'styles');
const assets = path.join(__dirname, 'assets');
// const templateHtml = path.join(__filename, 'template.html');
const dist = path.join(__dirname, 'project-dist');
const distStyles = path.join(__dirname, 'project-dist', 'styles');
const distAssets = path.join(__dirname, 'project-dist', 'assets');
// const writeStream = fs.createWriteStream(dist);

fs.mkdir(dist, (err) => {
  if (err) console.error(err);
  console.log('Directory created successfully!');
});

fs.readdir(styles, { withFileTypes: true }, (err, files) => {
  if (err) return;

  fs.mkdir(distStyles, (err) => {
    if (err) console.error(err);
    console.log('Directory created successfully!');
  });
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile()) {
      //   const filePath = path.join(styles, files[i].name);
      //   if (path.extname(filePath).slice(1) !== 'css') return;

      fs.copyFile(
        styles + '\\' + files[i].name,
        distStyles + '\\' + files[i].name,
        fs.constants.COPYFILE_EXCL,
        (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
        },
      );

      //   const readableStream = fs.createReadStream(filePath);
      //   readableStream.on('data', function (chunk) {
      //     writeStream.write(chunk);
      //   });
    }
  }
});

fs.readdir(assets, { withFileTypes: true }, (err, files) => {
  if (err) return;

  fs.mkdir(distAssets, { recursive: true }, (err) => {
    if (err) console.error(err);
    console.log('Directory created successfully!');
  });
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(styles, files[i].name);
    if (path.extname(filePath).slice(1) !== 'css') return;

    fs.copyFile(
      styles + '\\' + files[i].name,
      distAssets + '\\' + files[i].name,
      fs.constants.COPYFILE_EXCL,
      (err) => {
        if (err) {
          console.log('Error Found:', err);
        }
      },
    );

    //   const readableStream = fs.createReadStream(filePath);
    //   readableStream.on('data', function (chunk) {
    //     writeStream.write(chunk);
    //   });
  }
});
