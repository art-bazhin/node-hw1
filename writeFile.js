const fs = require('fs');
const path = require('path');

const mkdir = require('./mkdir');
const handle = require('./handleError');

module.exports = function (src, dest, cb) {
  mkdir(path.dirname(dest), () => {
    let rs = fs.createReadStream(src);
    let ws = fs.createWriteStream(dest);

    rs.on('error', handle)
      .pipe(ws)
      .on('error', handle)
      .on('finish', cb);
  });
};
