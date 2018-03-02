const fs = require('fs');
const path = require('path');

const handle = require('./handleError');

function mkdir (dest, cb) {
  const fullPath = path.resolve(dest);

  fs.mkdir(fullPath, err => {
    if (err) {
      switch (err.code) {
        case 'ENOENT':
          mkdir(path.parse(fullPath).dir, () => {
            mkdir(fullPath, cb);
          });
          break;

        case 'EEXIST':
          cb();
          break;

        default:
          handle(err);
      }
    } else cb();
  });
}

module.exports = mkdir;
