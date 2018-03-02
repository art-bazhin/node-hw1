const fs = require('fs');
const path = require('path');

const handle = require('./handleError');

function removeSource (dir, cb) {
  fs.rmdir(dir, err => {
    if (err) {
      switch (err.code) {
        case 'ENOTEMPTY':
          fs.readdir(dir, (err, files) => {
            handle(err);

            let counter = 0;
            let total = files.length;

            files.forEach(str => {
              let fullPath = path.resolve(dir, str);
              fs.stat(fullPath, (err, stat) => {
                handle(err);

                if (stat.isFile()) {
                  fs.unlink(fullPath, err => {
                    handle(err);
                    counter++;
                    if (counter === total) removeSource(dir, cb);
                  });
                } else if (stat.isDirectory()) {
                  removeSource(fullPath, () => {
                    counter++;
                    if (counter === total) removeSource(dir, cb);
                  });
                }
              });
            });
          });
          break;

        default:
          handle(err);
      }
    } else cb();
  });
}

module.exports = removeSource;
